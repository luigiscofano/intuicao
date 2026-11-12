import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPAIGN } from '../../dist/logica/games/pulso/campaign.mjs';
import { initialState, applyAction, checkState, solutionState } from '../../dist/logica/games/pulso/engine.mjs';
import { renderBoard, rowSummary } from '../../dist/logica/games/pulso/view.mjs';
import { renderBoard as renderNormal } from '../../dist/logica/games/pulso/view-normal.mjs';
import { readPulsoSkin, writePulsoSkin, PULSO_SKIN_KEY } from '../../dist/logica/games/pulso/skin.mjs';

test('a skin normal reutiliza exatamente o renderizador anterior',()=>{
 const level=CAMPAIGN[0],state=initialState(level);
 assert.ok(renderBoard(level,state,{skin:'normal'}).endsWith(renderNormal(level,state)));
});
test('todas as fases preservam pistas, alvos e soluções nas duas skins',()=>{
 for(const level of CAMPAIGN){
  const state=initialState(level),before=JSON.stringify(state);
  for(const skin of ['normal','identity']){
   const markup=renderBoard(level,state,{skin});
   assert.equal((markup.match(/data-cell=/g)||[]).length,level.rows*level.cols-Object.keys(level.givens).length);
   assert.equal(JSON.stringify(state),before);
  }
  assert.equal(checkState(level,solutionState(level)).valid,true);
 }
});
test('contagem e intervalos não confundem três marcas com solução',()=>{
 const level={rows:1,cols:7,givens:{},quotas:[1,1,1,0,0,0,0]};
 assert.deepEqual(rowSummary(level,{cells:[1,null,1,null,1,null,null]},0),{count:3,gaps:[2,2],equal:true});
 assert.deepEqual(rowSummary(level,{cells:[1,1,null,1,null,null,null]},0),{count:3,gaps:[1,2],equal:false});
 assert.equal(rowSummary(level,{cells:[1,1,1,1,null,null,null]},0).count,4);
 assert.equal(checkState(level,{cells:[1,1,1,null,null,null,null]}).valid,false);
});
test('preferência usa armazenamento próprio, não progresso',()=>{
 const writes=[],storage={getItem:()=>null,setItem:(...args)=>writes.push(args)};
 assert.equal(writePulsoSkin('normal',storage),true);assert.equal(readPulsoSkin(storage),'normal');
 assert.deepEqual(writes,[[PULSO_SKIN_KEY,'normal']]);
 assert.equal(writePulsoSkin('invalid',storage),false);
 assert.equal(writePulsoSkin('identity',{setItem(){throw Error('bloqueado');}}),true);
});
test('troca visual não chama edição, reinício, vitória ou gravação de sessão',()=>{
 const ui=readFileSync(new URL('../../dist/logica/ui.mjs',import.meta.url),'utf8');
 const handler=ui.slice(ui.indexOf('const skinButton'),ui.indexOf("const target = event.target.closest('[data-level-id]"));
 assert.match(handler,/renderBoard\(\)/);assert.doesNotMatch(handler,/edit\(|start\(|save\(|complete\(/);
});

test('escrita bloqueada não restaura uma preferência antiga',()=>{
 const storage={getItem:()=> 'normal',setItem(){throw Error('quota');}};
 writePulsoSkin('identity',storage);
 assert.equal(readPulsoSkin(storage),'identity');
});
test('estilo não alcança outros jogos quando o host está escondido',()=>{
 const css=readFileSync(new URL('../../dist/logica/games/pulso/view.css',import.meta.url),'utf8');
 assert.ok(css.includes('#logic-games:not([hidden])[data-pulso-skin="identity"]'));
 const ui=readFileSync(new URL('../../dist/logica/ui.mjs',import.meta.url),'utf8');
 assert.ok(ui.includes("event.target.closest('button[data-pulso-skin]')"));
 assert.ok(ui.includes('delete host.dataset.pulsoSkin'));
});
