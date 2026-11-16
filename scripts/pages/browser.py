"""Verifica uma publicação pelo navegador em perfis descartáveis, sem conta."""
import argparse
import json
import os
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import urljoin, urlsplit

from playwright.sync_api import sync_playwright

# Controles reais de seleção e tabuleiro. O catálogo de produção define os casos.
SCREENS = {}
for games, start, board in [
    ("light cut", ".level-tile", "#scene"),
    ("elo prumo pacto", "[data-new-level]", "#c-board"),
    ("sintonia", "[data-s-level]", "#s-boards"),
    ("repasse", ".level-tile", "#r-board"),
    ("pulso foz refugio mirante renovo", ".logic-level", "#lg-board"),
    ("desvio", "#c-start-duel", "#c-board"),
    ("broto", "#b-start", "#b-board"), ("cerco", "#ce-start", "#ce-board"),
    ("mosaico quinhao estalo acorde", "#nv-start", "#nv-board"),
]:
    SCREENS.update({game: (start, board) for game in games.split()})

def capture(page, path):
    page.evaluate("document.fonts.ready")
    page.evaluate("Promise.all([...document.images].filter(i=>i.currentSrc).map(i=>i.decode().catch(()=>{})))")
    page.screenshot(path=path, animations="disabled")

def new_context(browser, width, height):
    context = browser.new_context(viewport={"width": width, "height": height},
                                  device_scale_factor=1, reduced_motion="reduce",
                                  locale="pt-BR", timezone_id="America/Sao_Paulo",
                                  has_touch=width < 500, is_mobile=width < 500)
    # Semente e data controladas somente no perfil de teste.
    context.add_init_script("let seed=421; Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);")
    return context

def check_site(browser, base, out, label):
    origin = urlsplit(base).netloc
    errors = []
    for width, height in [(1280, 900), (390, 844)]:
        path = out / label / str(width)
        path.mkdir(parents=True, exist_ok=True)
        with new_context(browser, width, height) as context:
            page = context.new_page()
            page.set_default_timeout(12000)
            page.clock.set_fixed_time("2026-11-16T12:00:00Z")
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            def response(r):
                if urlsplit(r.url).netloc == origin and r.status >= 400:
                    errors.append(f"{r.status} {r.url}")
            page.on("response", response)
            page.on("requestfailed", lambda req: errors.append(f"{req.failure} {req.url}")
                    if req.failure != "net::ERR_ABORTED" else None)
            if label == "pages" and "chatgpt.site" not in origin:
                context.route("**/*.chatgpt.site/**", lambda route: route.abort())
            page.goto(base)
            page.locator("#preferences-open").wait_for()
            ids = page.evaluate("""async () => (await import(new URL('game-catalog.mjs', document.baseURI))).ACTIVE_GAME_IDS""")
            assert set(ids) == set(SCREENS), f"Atualize a matriz de jogos: {ids}"
            capture(page, path / "biblioteca.png")
            for game in ids:
                print(f"{label} {width} {game}", flush=True)
                page.goto(urljoin(base, "?game=" + game))
                start, board = SCREENS[game]
                button = page.locator(start + ":visible").first
                button.wait_for()
                capture(page, path / f"{game}-selecao.png")
                button.click()
                page.locator(board).wait_for()
                capture(page, path / f"{game}-jogo.png")
                if game == "broto":
                    assert page.locator("#b-confirm").is_disabled()
                    page.locator("[data-b-cell]:enabled").first.click()
                    page.locator("#b-confirm").click()
                    page.reload()
                    page.locator("#b-resume").click()
                    page.locator("#b-board").wait_for()
                page.locator("#category-back").click()
                page.locator("#favorites-edit").wait_for()
            page.goto(urljoin(base, "?screen=achievements"))
            page.locator("#achievements").wait_for()
            capture(page, path / "conquistas.png")
    if errors:
        raise AssertionError("\n".join(sorted(set(errors))))

def backup_panel(page):
    page.locator("#preferences-open").click()
    page.locator(".progress-backup > summary").click()

def check_backup(browser, source, target):
    with TemporaryDirectory() as tmp, new_context(browser, 1280, 900) as before, new_context(browser, 1280, 900) as after:
        old = before.new_page()
        new = after.new_page()
        old.goto(urljoin(source, "?game=broto"))
        old.locator("#b-start").click()
        old.locator("[data-b-cell]:enabled").first.click()
        old.locator("#b-confirm").click()
        old.evaluate("""async () => {
          const { lightLevels } = await import(new URL('light-levels.mjs',document.baseURI));
          const { ACTION_MISSION_IDS } = await import(new URL('achievements/catalog.mjs',document.baseURI));
          const id = lightLevels[0].id;
          if (!id) throw Error('Fase sem identidade');
          localStorage.setItem('intuicao.campaign.light.progress.v1',JSON.stringify({version:1,completedIds:[id],lastLevelId:id}));
          localStorage.setItem('intuicao.missions.v1',JSON.stringify({version:1,unlocked:{[[...ACTION_MISSION_IDS][0]]:'2026-11-16T12:00:00Z'}}));
          localStorage.setItem('intuicao.advanced-hidden','true');
        }""")
        backup_panel(old)
        file = Path(tmp) / "controlado.json"
        with old.expect_download() as download:
            old.locator("[data-backup-export]").click()
        download.value.save_as(file)
        records = {row["key"]: row["raw"] for row in json.loads(file.read_text())["records"]}
        new.goto(target)
        backup_panel(new)
        new.locator("[data-backup-file]").set_input_files(file)
        new.locator("[data-backup-preview] li").first.wait_for()
        assert new.locator("[data-backup-apply]").is_disabled()
        with new.expect_download() as recovery:
            new.locator("[data-backup-recovery]").click()
        recovery.value.save_as(Path(tmp) / "recuperacao.json")
        new.locator("[data-backup-confirm]").check()
        with new.expect_navigation():
            new.locator("[data-backup-apply]").click()
        for key, raw in records.items():
            assert new.evaluate("key => localStorage.getItem(key)", key) == raw, key
        assert "1 / 80" in new.locator('[data-game="light"]').inner_text()
        new.goto(urljoin(target, "?game=broto"))
        new.locator("#b-resume").click()
        new.locator("#b-board").wait_for()
        assert new.evaluate("""async () => {
          const {readMissionLedger}=await import(new URL('achievements/mission-store.mjs', document.baseURI));
          return Object.keys(readMissionLedger().unlocked).length > 0;
        }""")
        print(f"Backup: {len(records)} registros conferidos após recarga; campanha, missão e duelo reconhecidos.", flush=True)

def compare(out):
    from PIL import Image, ImageChops
    metrics = {}
    for ref in sorted((out / "referencia").rglob("*.png")):
        name = ref.relative_to(out / "referencia")
        with Image.open(ref) as a, Image.open(out / "pages" / name) as b:
            diff = ImageChops.difference(a.convert("RGB"), b.convert("RGB"))
            mask = diff.convert("L", matrix=(0.299, 0.587, 0.114, 0))
            histogram = mask.histogram()
            metrics[str(name)] = {"total": a.width*a.height, "acima_de_8": sum(histogram[9:]),
                                  "caixa": diff.getbbox()}
    (out / "diferencas.json").write_text(json.dumps(metrics, indent=2))
    print("Comparação visual disponível em diferencas.json; diferenças exigem inspeção.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site")
    parser.add_argument("evidencias", type=Path)
    parser.add_argument("--reference")
    args = parser.parse_args()
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=os.environ.get("CHROME_BIN", "/usr/bin/google-chrome"))
        if args.reference:
            check_site(browser, args.reference, args.evidencias, "referencia")
        check_site(browser, args.site, args.evidencias, "pages")
        check_backup(browser, args.reference or args.site, args.site)
        if args.reference:
            compare(args.evidencias)
        browser.close()
