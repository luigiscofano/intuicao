import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createDesvio, applyDesvioMove, legalDesvioMoves, chooseDesvioBotMove} from '../dist/desvio.mjs';
import {desvioSelectionText} from '../dist/desvio-presentation.mjs';
const map={id:'visual',rows:4,cols:4,arrows:[...'HVHVVHHVHVVHVHVH']};
test('prévia descreve a seleção aprovada sem mutar a partida',()=>{
 const state=applyDesvioMove(map,createDesvio(map),5), before=JSON.stringify(state);
 assert.deepEqual(legalDesvioMoves(map,state),[4,6,7]);
 assert.match(desvioSelectionText(map,state,6),/linha 2.*Restarão 2 opções/);
 assert.match(desvioSelectionText(map,state,-1),/3 opções disponíveis/);
 assert.equal(JSON.stringify(state),before);
});
test('descrição não confunde destino vertical nem terminal',()=>{
 const s=createDesvio(map);
 assert.match(desvioSelectionText(map,s,1),/coluna 2/);
 const tiny={id:'tiny',rows:1,cols:1,arrows:['H']};
 assert.match(desvioSelectionText(tiny,createDesvio(tiny),0),/esta jogada vence/);
});
test('bot continua dando jogadas legais até vitória sem empate',()=>{
 for(const difficulty of ['easy','medium','perfect']){
  let s=createDesvio(map);
  while(s.winner===null){const cell=chooseDesvioBotMove(map,s,difficulty);assert.ok(legalDesvioMoves(map,s).includes(cell));s=applyDesvioMove(map,s,cell);assert.ok(s.turn<=16);}
  assert.match(desvioSelectionText(map,s,-1),/venceu/);
 }
});
test('visual restrito ao Desvio, acessível e sem blocos superiores restaurados',()=>{
 const ui=readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');
 const css=readFileSync(new URL('../dist/desvio-presentation.css',import.meta.url),'utf8');
 assert.match(ui,/aria-pressed="\$\{duelPreview === i\}"/);
 assert.match(css,/prefers-reduced-motion/);assert.match(css,/:focus-visible/);
 assert.match(css,/\.desvio-lab \.board-desvio/);
 assert.match(ui,/assets\/desvio-aiij.svg/);
});
