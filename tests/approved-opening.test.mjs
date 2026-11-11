import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FEATURED_FAUNA, faunaVisibility, initApprovedOpening } from '../dist/approved-opening.mjs';
import { FAUNA_ART } from '../dist/fauna-art.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dist/approved-opening.css', import.meta.url), 'utf8');
function harness() {
  const node = () => ({ dataset: {}, attrs: {}, children: [], events: {}, classList: { toggle() {} }, setAttribute(k,v) { this.attrs[k]=v; }, removeAttribute(k) { delete this.attrs[k]; }, append(n) { this.children.push(n); }, addEventListener(k,fn) { this.events[k]=fn; } });
  const animals = FAUNA_ART.map(a=>Object.assign(node(),{dataset:{fauna:a.id},hidden:false}));
  const hint = { remove() { this.removed = true; } };
  const gallery = Object.assign(node(), { querySelectorAll:()=>animals, querySelector:()=>hint });
  const intro = Object.assign(node(), { querySelector:()=>gallery });
  const headings = Object.fromEntries(Object.keys(CATEGORY_GAMES).map(id=>[`games-${id}`,node()]));
  const doc = { querySelector:s=>s==='.hero-fauna'?gallery:intro, getElementById:id=>id==='fauna-dialog'?{}:headings[id], createElement:node };
  return {doc,intro,gallery,animals,hint,headings};
}
test('os seis destaques coincidem com a composição aprovada e pertencem à coleção',()=>{
  assert.deepEqual(FEATURED_FAUNA,['capivara','bemtevi','onca','lobo','arara','tucano']);
  assert.equal(FAUNA_ART.length,15);
  assert.equal(faunaVisibility(FAUNA_ART.map(a=>a.id)).filter(Boolean).length,6);
});
test('expandir revela todos os 15 animais e recolher restaura os mesmos seis',()=>{
  const h=harness(); initApprovedOpening(h.doc);
  const button=h.intro.children[0];
  assert.equal(button.attrs['aria-expanded'],'false');
  assert.equal(h.animals.filter(a=>!a.hidden).length,6);
  button.events.click();
  assert.equal(button.attrs['aria-expanded'],'true');
  assert.equal(h.animals.filter(a=>!a.hidden).length,15);
  button.events.click();
  assert.equal(button.attrs['aria-expanded'],'false');
  assert.equal(h.animals.filter(a=>!a.hidden).length,6);
});
test('inicialização é idempotente e reutiliza os botões informativos existentes',()=>{
  const h=harness(), original=[...h.animals]; initApprovedOpening(h.doc); initApprovedOpening(h.doc);
  assert.equal(h.intro.children.length,1);
  assert.deepEqual(h.animals,original);
  assert.equal(h.hint.removed,true);
});
test('as três categorias e todos os 17 jogos permanecem contados pelo catálogo',()=>{
  const h=harness(); initApprovedOpening(h.doc);
  assert.deepEqual(Object.values(h.headings).map(h=>h.children[0].textContent),['2 jogos','12 jogos','3 jogos']);
  assert.equal(Object.values(CATEGORY_GAMES).flat().length,17);
});
test('controles compartilham a linha e se montam antes da casca dos jogos',()=>{
  assert.match(html,/<div id="library-controls"><nav id="library-navigation"/);
  assert.match(html,/<\/nav><\/div><div class="category-heading">/);
  assert.ok(html.indexOf('src="approved-opening.mjs"')<html.indexOf('src="approved-game-shell.mjs"'));
  assert.match(html,/>Jogos <span>17<\/span>/);
});
test('fundo da fauna é removido por composição CSS, sem alterar recursos originais',()=>{
  assert.match(css,/isolation: auto/);
  assert.match(css,/mix-blend-mode: multiply/);
  assert.match(css,/background-color: transparent/);
  assert.match(css,/@media\(max-width:480px\)/);
  assert.match(css,/\.hero-fauna-cell\[hidden\].*display: none !important/);
});
