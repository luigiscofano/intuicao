"""Compara todos os bytes publicados com o artefato reconstruído do mesmo SHA."""
from argparse import ArgumentParser
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
from tempfile import TemporaryDirectory
from time import sleep
from urllib.parse import quote, urljoin
from urllib.request import Request, urlopen

from package import package


def verify(root, base):
    def check(file):
        name = file.relative_to(root).as_posix()
        expected = sha256(file.read_bytes()).digest()
        url = urljoin(base, quote(name))
        for attempt in range(4):
            try:
                with urlopen(Request(url, headers={"Cache-Control": "no-cache"}), timeout=30) as res:
                    if sha256(res.read()).digest() == expected:
                        return
                error = "SHA-256 divergente"
            except OSError as exc:
                error = str(exc)
            if attempt < 3:
                sleep(3 * (attempt + 1))
        raise RuntimeError(f"{name}: {error}")

    files = sorted(p for p in root.rglob("*") if p.is_file())
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(check, files))
    print(f"{len(files)} arquivos verificados no endereço público por SHA-256.")


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("url")
    args = parser.parse_args()
    with TemporaryDirectory() as directory:
        root = Path(directory) / "intuicao"
        package(root)
        verify(root, args.url)
