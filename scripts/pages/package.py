"""Prepara os arquivos públicos do Intuição sem escrever em dist/."""
from argparse import ArgumentParser
from pathlib import Path
from shutil import copyfile
import hashlib

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "dist"
PUBLIC_TYPES = {".html", ".mjs", ".css", ".png", ".svg", ".woff", ".woff2"}
# As licenças acompanham as fontes. Os exemplos de importação permanecem disponíveis.
def is_public(path):
    if path.parts[0] == "development" or any(p.startswith(".") for p in path.parts):
        return False
    return (path.suffix in PUBLIC_TYPES
            or (path.parent == Path("json-examples") and path.suffix == ".json")
            or (path.parent == Path("assets/fonts") and path.name.endswith("-OFL.txt")))

def package(output):
    output = output.resolve()
    if output == ROOT or ROOT in output.parents or output.exists():
        raise ValueError("Use um diretório novo fora do repositório.")
    output.mkdir(parents=True)
    count = 0
    for source in sorted(SOURCE.rglob("*")):
        relative = source.relative_to(SOURCE)
        if source.is_symlink():
            raise ValueError(f"Link simbólico inesperado: {relative}")
        if source.is_file() and is_public(relative):
            target = output / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            copyfile(source, target)
            if hashlib.sha256(target.read_bytes()).digest() != hashlib.sha256(source.read_bytes()).digest():
                raise ValueError(f"Falha na cópia: {relative}")
            count += 1
    if not (output / "index.html").is_file():
        raise ValueError("index.html ausente")
    # Sites atendia estes caminhos antigos com seu fallback de HTML.
    # No Pages, cada caminho leva ao roteador existente pela query equivalente.
    for game in ("trama", "vertice", "divisa", "orbita", "lastro", "vazante", "enlace", "dobra"):
        directory = output / game
        directory.mkdir(exist_ok=True)
        entry = directory / "index.html"
        if entry.exists():
            raise ValueError(f"Entrada existente: {entry}")
        url = f"../?game={game}"
        entry.write_text(f'<!doctype html><html lang="pt-BR"><meta charset="utf-8">'
                         f'<title>Intuição</title><meta http-equiv="refresh" content="0;url={url}">'
                         f'<a href="{url}">Voltar à biblioteca do Intuição</a></html>\n', encoding="utf-8")
    print(f"{count} arquivos públicos conferidos por SHA-256 e 8 entradas de compatibilidade.")

if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    package(parser.parse_args().output)
