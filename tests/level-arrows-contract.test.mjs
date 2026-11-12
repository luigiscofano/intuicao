import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { GAME_PRESENTATION } from "../dist/approved-game-shell.mjs";
test("exatamente quatorze jogos do catálogo possuem navegação de níveis", () => {
  const games = Object.entries(GAME_PRESENTATION)
    .filter(([, g]) => g.category !== "Versus")
    .map(([id]) => id);
  assert.equal(games.length, 14);
  assert.equal(Object.keys(GAME_PRESENTATION).length - games.length, 11);
});
test("setas lógicas ficam fora do tabuleiro nas faixas responsivas comuns", () => {
  const s = readFileSync("dist/logica/ui.mjs", "utf8");
  assert.match(
    s,
    /<div class="stage-tools"><button type="button" id="lg-levels"/,
  );
  assert.match(
    s,
    /<div class="board-navigation logic-board-navigation"[^>]*><button[^>]*id="lg-prev"[^>]*class="level-arrow logic-level-arrow"/,
  );
  assert.match(s, /<div id="lg-board"[^>]*><\/div><button[^>]*id="lg-next"/);
});
test("layout compacto fica restrito às campanhas e dá uma linha aos controles de ÓRBITA", () => {
  const s = readFileSync("dist/game-viewport.css", "utf8");
  assert.match(s, /@media \(max-width:650px\) and \(max-height:500px\)/);
  assert.match(
    s,
    /body\.approved-game-view\.approved-campaign-actions #main \.viewport-game \.approved-workspace \{ grid-template-columns:minmax\(0,1fr\)/,
  );
  assert.match(
    s,
    /\.o-orbit-controls \{ grid-template-columns:minmax\(0,1fr\); \}/,
  );
});
