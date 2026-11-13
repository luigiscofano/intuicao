import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { renderVersusVictory, stopVersusVictory } from '../dist/versus-victory.mjs';
import { VERSUS_VICTORY_IDS, versusVictoryMotif } from '../dist/versus-victory-art.mjs';
import { loadVersusGame } from '../dist/versus/metadata.mjs';
import { createBroto, applyBrotoMove, legalBrotoMoves, nextBrotoRound } from '../dist/broto/engine.mjs';
import { createCerco, applyCercoMove, legalCercoMoves } from '../dist/cerco/engine.mjs';
import { createDesvio, applyDesvioMove, legalDesvioMoves, DESVIO_REFERENCE_MAP } from '../dist/desvio.mjs';
const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
function rig(){
  let html='',id=0,clock=0,rootAttr=null;const frames=new Map();
  const win={performance:{now:()=>clock},matchMedia:()=>({matches:win.reduced}),requestAnimationFrame(fn){const n=++id;frames.set(n,fn);return n;},cancelAnimationFrame(n){frames.delete(n);},reduced:false};
  const doc={defaultView:win,hidden:false,documentElement:{getAttribute:()=>rootAttr}};
  const host={ownerDocument:doc,hidden:false,closest(){return this.hidden?{}:null;},get innerHTML(){return html;},set innerHTML(v){html=v;const classes=new Set(v.match(/section class="([^"]*)"/)?.[1].split(' ')||[]);this.section={parentNode:this,classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)}};this.emblem={innerHTML:v.match(/<div class="vv-emblem"[^>]*>([\s\S]*)<\/div>\s*<div class="vv-copy"/)?.[1]||'',isConnected:true};},querySelector(q){return q==='.vv-emblem'?this.emblem:q==='.versus-victory'?this.section:null;}};
  return {host,win,doc,frames,setManual:v=>rootAttr=v?'true':null,tick(ms){clock=ms;const list=[...frames.values()];frames.clear();for(const fn of list)fn(ms);}};
}
for(const game of VERSUS_VICTORY_IDS)test(`${game}: arte finita, vencedores e texto acessível sem nível`,()=>{
  for(const owner of [0,1]){
    const host={innerHTML:''};renderVersusVictory(host,{game,owner,winnerName:owner?'Âmbar':'Verde'});
    assert.match(host.innerHTML,new RegExp(`vv-game-${game}`));assert.match(host.innerHTML,/venceu/);
    assert.match(host.innerHTML,/VENCEDOR DO DUELO/);assert.doesNotMatch(host.innerHTML,/PARABÉNS|nível|NaN|undefined/);
    assert.equal(versusVictoryMotif(game,2,owner),versusVictoryMotif(game,4,owner));
    assert.equal(versusVictoryMotif(game,.1,owner,true),versusVictoryMotif(game,4,owner,true));
  }
});
test('gesto novo acontece uma vez, até 1,2 s; restauração e redraw permanecem estáticos',()=>{
  const r=rig(),key={};renderVersusVictory(r.host,{game:'mosaico',winnerName:'Verde',animate:true,resultKey:key});
  assert.equal(r.frames.size,1);const start=r.host.emblem.innerHTML;r.tick(400);assert.notEqual(r.host.emblem.innerHTML,start);
  r.tick(1200);assert.equal(r.frames.size,0);assert(r.host.section.classList.contains('vv-static'));
  assert.equal(r.host.emblem.innerHTML,versusVictoryMotif('mosaico',2));
  renderVersusVictory(r.host,{game:'mosaico',winnerName:'Verde',animate:true,resultKey:key});assert.equal(r.frames.size,0);
  renderVersusVictory(r.host,{game:'mosaico',winnerName:'Verde',animate:false,resultKey:{}});assert.equal(r.frames.size,0);
});
test('empate e computador usam os estados aprovados; treino não celebra',()=>{
  const r=rig();renderVersusVictory(r.host,{game:'mosaico',draw:true,animate:true,resultKey:{}});
  assert.match(r.host.innerHTML,/Empate/);assert.doesNotMatch(r.host.innerHTML,/venceu/);assert.equal(r.frames.size,1);
  stopVersusVictory(r.host);assert.equal(r.frames.size,0);
  renderVersusVictory(r.host,{game:'mosaico',winnerName:'Âmbar',owner:1,mode:'bot',lost:true,animate:true,resultKey:{}});
  assert.match(r.host.innerHTML,/Âmbar venceu/);assert.match(r.host.innerHTML,/Computador · adversário/);assert.equal(r.frames.size,1);
  renderVersusVictory(r.host,{game:'mosaico',winnerName:'Verde',mode:'training',animate:true,resultKey:{}});assert.equal(r.frames.size,0);
});
test('preferência local/sistema, mudança durante gesto, ocultação e remoção encerram quadros',()=>{
  for(const trigger of ['manual','system','hidden','removed','document']){
    const r=rig();renderVersusVictory(r.host,{animate:true,winnerName:'Jogador 1',resultKey:{}});
    if(trigger==='manual')r.setManual(true);if(trigger==='system')r.win.reduced=true;if(trigger==='hidden')r.host.hidden=true;
    if(trigger==='removed')r.host.emblem.isConnected=false;if(trigger==='document')r.doc.hidden=true;
    r.tick(100);assert.equal(r.frames.size,0,trigger);
  }
  for(const kind of ['manual','system']){const r=rig(),key={};kind==='manual'?r.setManual(true):r.win.reduced=true;
    renderVersusVictory(r.host,{animate:true,winnerName:'Verde',resultKey:key});assert.equal(r.frames.size,0);
    r.setManual(false);r.win.reduced=false;renderVersusVictory(r.host,{animate:true,winnerName:'Verde',resultKey:key});assert.equal(r.frames.size,0);
  }
});
test('mascote selecionado é preservado, nomes e motivo são escapados',()=>{
  const host={innerHTML:''};renderVersusVictory(host,{game:'cerco',winnerName:'<script>',reason:'<img onerror=x>',mascot:'tucano'});
  assert.doesNotMatch(host.innerHTML,/<script>|onerror=x>/);assert.match(host.innerHTML,/&lt;script&gt; venceu/);
  assert.match(host.innerHTML,/413 1219 239 218/);assert.doesNotMatch(host.innerHTML,/undefined|NaN/);
});
for(const id of VERSUS_VICTORY_IDS.slice(3))test(`${id}: finais alcançados pelo motor mantêm vencedor, motivo e estado`,async()=>{
  const {engine}=await loadVersusGame(id);let state=engine.createState();let steps=0;
  while(!state.result&&steps++<180){const legal=engine.getLegalMoves(state);assert.ok(legal.length);state=engine.applyMove(state,legal[(steps*13)%legal.length]);}
  assert.ok(state.result);const before=JSON.stringify(state),host={innerHTML:''};
  renderVersusVictory(host,{game:id,winnerName:state.result.winner===0?'Verde':'Âmbar',owner:state.result.winner,draw:state.result.winner===null,reason:state.result.reason,resultKey:state});
  assert.match(host.innerHTML,new RegExp(state.result.winner===null?'Empate':`${state.result.winner===0?'Verde':'Âmbar'} venceu`));assert.equal(JSON.stringify(state),before);
});
test('BROTO só tem duelo após duas rodadas, CERCO/DESVIO só têm vencedor real',()=>{
  let b=createBroto();while(!b.roundOver)b=applyBrotoMove(b,legalBrotoMoves(b)[0]).state;assert.equal(b.duelOver,false);b=nextBrotoRound(b);while(!b.duelOver)b=applyBrotoMove(b,legalBrotoMoves(b)[0]).state;assert.equal(b.round,2);
  let c=createCerco();while(!c.over)c=applyCercoMove(c,legalCercoMoves(c)[0]).state;assert.ok([0,1].includes(c.winner));
  let d=createDesvio(DESVIO_REFERENCE_MAP);while(d.winner===null)d=applyDesvioMove(DESVIO_REFERENCE_MAP,d,legalDesvioMoves(DESVIO_REFERENCE_MAP,d)[0]);assert.ok([0,1].includes(d.winner));
});
test('integrações consomem apenas resultado novo; história, modos, motores e persistência intactos',()=>{
  const ui=read('dist/versus/ui.mjs');assert.match(ui,/freshResult = !before.result \? state\(\).result : null/);assert.match(ui,/renderedResult === result && resultHost.firstElementChild/);assert.match(ui,/mode: playConfig.mode/);
  for(const game of ['broto','cerco'])assert.match(read(`dist/${game}/ui.mjs`),/resultKey: state/);
  assert.match(read('dist/broto/ui.mjs'),/if \(state.duelOver\) \{[\s\S]*?renderVersusVictory/);
  const root=new URL('../',import.meta.url),base='cdc5c756a340c7613c62cded00650ef98d267ec7';
  const paths=['dist/broto/engine.mjs','dist/cerco/engine.mjs','dist/desvio.mjs','dist/versus/session.mjs','dist/versus/storage.mjs',...VERSUS_VICTORY_IDS.slice(3).map(id=>`dist/versus/games/${id}/engine.mjs`)];
  // Mapas Estalo aprovados posteriormente: o contrato de vitória permanece histórico
  // nestes dois arquivos; regras, replay e saves atuais são cobertos em estalo-maps.test.mjs.
  const beforeMaps = '2774d672aca1e03768ec4433a8cd98f1da825077';
  for (const p of paths) {
    const changedForMaps = ['dist/versus/session.mjs', 'dist/versus/games/estalo/engine.mjs'].includes(p);
    const actual = changedForMaps
      ? execFileSync('git', ['show', `${beforeMaps}:${p}`], { cwd: root, encoding: 'utf8' })
      : read(p);
    assert.equal(actual.replaceAll('STORED_VERSUS_GAME_IDS', 'VERSUS_GAME_IDS'), execFileSync('git', ['show', `${base}:${p}`], { cwd: root, encoding: 'utf8' }), p);
  }
  assert.doesNotMatch(read('dist/versus-victory.mjs'),/localStorage|sessionStorage|setTimeout|setInterval|apply\w*Move/);
  assert.match(read('dist/versus-victory.css'),/max-width:420px/);assert.match(read('dist/versus-victory.css'),/data-ui-reduced-motion/);
});

test('108 quadros preservam as composições aprovadas, com os frutos revisados do Quinhão',async()=>{
  const {createHash}=await import('node:crypto');const refs=JSON.parse(read('tests/fixtures/versus-victory-approved-frames.json'));
  for(const {game,owner,t,sha256} of refs){const actual=versusVictoryMotif(game,t,owner).replaceAll('vva-','').replaceAll('var(--acorde-ivory)','#fffaf0').replace(/^<svg class="vv-art"[^>]*>/,'').replace(/<\/svg>$/,'');
    assert.equal(createHash('sha256').update(actual).digest('hex'),sha256,`${game}/${owner}/${t}`);}
});
