import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {renderVersusVictory} from '../dist/versus-victory.mjs';
const base='cc58f12a0103ff7459535a699e43bb423ac2e8cd';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
test('somente apresentações dos dois duelos e helper novo podem mudar',()=>{
 const allowed=new Set(['dist/broto/ui.mjs','dist/broto/ui.css','dist/cerco/ui.mjs','dist/cerco/ui.css']);
 for(const line of git('ls-tree','-r',base,'--','dist').split('\n')){
  const [meta,path]=line.split('\t');if(allowed.has(path))continue;
  assert.equal(git('hash-object',path),meta.split(' ')[2],path);
 }
});
test('cenas únicas e sem falsa vitória em empate/perda continuam intactas',()=>{
 const host={innerHTML:''}, prior=globalThis.matchMedia;
 try{globalThis.matchMedia=()=>({matches:false});
 for(const game of ['broto','cerco']){
  renderVersusVictory(host,{game,winnerName:'Time correto',animate:true});
  assert(host.innerHTML.includes(`vv-game-${game}`));assert(host.innerHTML.includes('vv-animate'));assert(host.innerHTML.includes('Time correto'));
  assert(host.innerHTML.includes(game==='broto'?'vv-harvest':'vv-wall-a'));
  renderVersusVictory(host,{game,draw:true,animate:true});assert(!host.innerHTML.includes('PARABÉNS!'));assert(host.innerHTML.includes('vv-static'));
  renderVersusVictory(host,{game,lost:true,winnerName:'Adversário',animate:true});assert(!host.innerHTML.includes('PARABÉNS!'));assert(host.innerHTML.includes('Adversário'));
 }
 globalThis.matchMedia=()=>({matches:true});renderVersusVictory(host,{game:'broto',animate:true});assert(host.innerHTML.includes('vv-static'));
 }finally{globalThis.matchMedia=prior;}
});
