import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createLevelFeedback, LEVEL_FEEDBACK_GAMES, LEVEL_FEEDBACK_DURATION, levelFeedbackBoard } from '../dist/level-feedback.mjs';

function fixture() {
  const nodes = [], timers = new Map(), frames = new Map(); let serial = 0;
  const media = { matches: false, addEventListener(_, cb) { this.listener = cb; }, removeEventListener() { this.listener = null; } };
  const root = { getAttribute: () => root.reduced ? 'true' : 'false' };
  const win = { matchMedia: () => media, requestAnimationFrame(cb) { frames.set(++serial, cb); return serial; }, cancelAnimationFrame(id) { frames.delete(id); }, MutationObserver: class { constructor(cb) { root.callback = cb; } observe() {} disconnect() {} } };
  const doc = { defaultView: win, documentElement: root, body: { append(node) { nodes.push(node); } }, createElement() { const classes = new Set(); return { style: {}, attrs: {}, classList: { toggle(name, active) { active ? classes.add(name) : classes.delete(name); }, contains: name => classes.has(name) }, setAttribute(k,v) { this.attrs[k] = v; }, remove() { this.removed = true; } }; } };
  const board = { ownerDocument: doc, isConnected: true, animations: [], getBoundingClientRect: () => ({ left: 100, top: 50, width: 400, height: 300 }), animate(keys, options) { const a = { keys, options, cancel() { this.cancelled = true; } }; board.animations.push(a); return a; } };
  const surface = { ownerDocument: doc, querySelector: () => board };
  const clock = { setTimeout(cb, ms) { timers.set(++serial, { cb, ms }); return serial; }, clearTimeout(id) { timers.delete(id); } };
  return { nodes, timers, frames, media, root, board, surface, clock };
}
for (const game of LEVEL_FEEDBACK_GAMES) {
  test(`${game}: vitória e erro usam a camada sem mudar medidas ou foco`, () => {
    const f = fixture(), feedback = createLevelFeedback(f.surface, f.clock);
    feedback.show(game, true);
    assert.equal(f.nodes.length, 1); assert.match(f.nodes[0].innerHTML, /Vitória!/);
    assert.equal(f.nodes[0].attrs.role, 'status'); assert.equal(f.nodes[0].style.width, '400px');
    assert.equal(f.board.animations.length, 0);
    feedback.show(game, false);
    assert.ok(f.nodes[0].removed); assert.match(f.nodes[1].className, /error/);
    assert.equal(f.board.animations[0].options.duration, 320);
    assert.ok(f.board.animations[0].keys.every(k => !k.transform && !k.width && !k.height));
    feedback.clear(); assert.ok(f.nodes[1].removed); assert.equal(f.timers.size, 0); assert.equal(f.frames.size, 0);
  });
}
test('versus, arquivados e restauração silenciosa não animam', () => {
  const f=fixture(), feedback=createLevelFeedback(f.surface,f.clock);
  for (const game of ['desvio','cerco','broto','quinhao','mosaico','acorde','estalo','orbita','divisa']) { feedback.show(game,true); feedback.show(game,false); }
  feedback.show('pulso',true,{animate:false}); assert.equal(f.nodes.length,0);
});
test('confirmações repetidas cancelam o ciclo anterior', () => {
  const f=fixture(), feedback=createLevelFeedback(f.surface,f.clock);
  feedback.show('pulso',false); feedback.show('pulso',false);
  assert.ok(f.nodes[0].removed); assert.ok(f.board.animations[0].cancelled); assert.equal(f.timers.size,1);
  [...f.timers.values()][0].cb(); assert.ok(f.nodes[1].removed);
});
test('redução de movimento inicial e mudança de preferência preservam estado estático', () => {
  const f=fixture(), feedback=createLevelFeedback(f.surface,f.clock);
  f.media.matches=true;feedback.show('mirante',false);assert.equal(f.board.animations.length,0);
  assert.ok(f.nodes[0].classList.contains('level-feedback-static'));
  f.media.matches=false;feedback.show('mirante',false);f.root.reduced=true;f.root.callback();
  assert.ok(f.board.animations[0].cancelled);assert.ok(f.nodes[1].classList.contains('level-feedback-static'));
});
test('navegação ou tabuleiro oculto remove a sobreposição', () => {
  const f=fixture(), feedback=createLevelFeedback(f.surface,f.clock);feedback.show('renovo',true);
  f.board.isConnected=false;[...f.frames.values()][0]();assert.ok(f.nodes[0].removed);assert.equal(f.timers.size,0);
});
test('seletores isolam o tabuleiro dos controles em cada família', () => {
  for(const [game,expected] of [['light','#scene'],['cut','#scene'],['pulso','#lg-board'],['sintonia','#s-play-area'],['repasse','#r-board'],['elo','#c-board']]) {
    let selector;levelFeedbackBoard({querySelector(s){selector=s;return {}; }},game);assert.equal(selector,expected);
  }
});
test('CSS não altera tamanho/layout; integração é única e mantém motivos existentes', () => {
  const css=readFileSync(new URL('../dist/level-feedback.css',import.meta.url),'utf8');
  assert.match(css,/position: fixed/);assert.match(css,/pointer-events: none/);assert.match(css,/prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css,/infinite/);
  const main=readFileSync(new URL('../dist/result-motion.mjs',import.meta.url),'utf8');
  assert.match(main,/levelFeedback.show\(game, success, options\)/);assert.match(main,/levelFeedback.clear\(\)/);
  assert.deepEqual(LEVEL_FEEDBACK_DURATION,{victory:3400,error:1700,shake:320});
});

test('próximo nível surge junto à vitória, permanece após animação e limpa ao navegar', () => {
 const f=fixture(),buttons=[];
 const panel={append(b){buttons.push(b);},classList:{add(){},remove(){}}};
 const next={isConnected:true,hidden:false,disabled:false,closest(){return null;},click(){}};
 f.surface.closest=()=>({querySelector:()=>panel});
 f.surface.ownerDocument.getElementById=()=>next;
 const feedback=createLevelFeedback(f.surface,f.clock);
 feedback.show('pulso',true);
 assert.equal(buttons.length,1,'botão não espera timeout');
 assert.equal(buttons[0].removed,undefined);
 [...f.timers.values()][0].cb();
 assert.ok(f.nodes[0].removed,'camada encerra normalmente');
 assert.equal(buttons[0].removed,undefined,'ação continua disponível');
 feedback.clear();assert.equal(buttons[0].removed,true);
});
