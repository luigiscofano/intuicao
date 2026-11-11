import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { ACHIEVEMENT_ICON_IDS, renderAchievementIcon } from "../dist/achievements/icons.mjs";

// Este retrato registra os 74 pictogramas anteriores à mudança visual aprovada.
const ORIGINAL_PICTOGRAM_HASH = "fc9a1fbf26d2f2b8eb0d5ef711a654920b0f90b017383a9f0576576a0ed7ccc8";

test("a roseta preserva integralmente os 74 pictogramas e seus identificadores", () => {
  const pictograms = ACHIEVEMENT_ICON_IDS.map((id) => {
    const svg = renderAchievementIcon(id);
    const match = svg.match(/<g class="ai-pictogram"[^>]*>([\s\S]*?)<\/g>/);
    assert.ok(match, id);
    return [id, match[1]];
  });
  assert.equal(pictograms.length, 74);
  const hash = createHash("sha256").update(JSON.stringify(pictograms)).digest("hex");
  assert.equal(hash, ORIGINAL_PICTOGRAM_HASH);
});

test("a mesma moldura vetorial mantém tamanho, acessibilidade e alternativa padrão", () => {
  for (const id of ACHIEVEMENT_ICON_IDS) {
    const svg = renderAchievementIcon(id);
    assert.match(svg, /viewBox="0 0 64 64"/);
    assert.match(svg, /class="ai-rosette"/);
    assert.match(svg, /transform="scale\(0.5\)"/);
    assert.match(svg, /transform="translate\(40 27\) scale\(0.75\)"/);
    assert.match(svg, /aria-hidden="true" focusable="false"/);
    assert.doesNotMatch(svg, /<image|<script|<text|id=|https?:/);
  }
  assert.equal(renderAchievementIcon("desconhecida"), renderAchievementIcon("first"));
});

test("somente os ícones recebem as paletas de descoberta e de aviso", () => {
  const css = readFileSync(new URL("../dist/achievements.css", import.meta.url), "utf8");
  const locked = css.match(/\.achievement-icon \{([^}]+)\}/)[1];
  const unlocked = css.match(/\.is-unlocked \.achievement-icon,\s*\.mission-notice-icon \.achievement-icon \{([^}]+)\}/)[1];
  assert.match(locked, /--medal-gold: #bdc5ad/);
  assert.match(unlocked, /--medal-gold: #dbb651/);
  assert.match(locked, /width: 64px/);
  assert.match(locked, /height: 64px/);
  assert.doesNotMatch(unlocked, /width:|height:|padding:|margin:|border:/);
  const source = readFileSync(new URL("../dist/achievements/icons.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /localStorage|sessionStorage|fetch\(|addEventListener|setItem/);
});
