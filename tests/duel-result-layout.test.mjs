import test from 'node:test';
import assert from 'node:assert/strict';
import {createDuelResultLayout} from '../dist/duel-result-layout.mjs';
function fixture(){
 let terminal=false,left=500,width=620,present=false,animations=[],reveals=[];
 const col={getBoundingClientRect:()=>({left}),animate:(frames,options)=>{const a={frames,options,cancelled:false,cancel(){this.cancelled=true}};animations.push(a);return a;}};
 const result={animate:(frames,options)=>{const a={frames,options,cancelled:false,cancel(){this.cancelled=true}};reveals.push(a);return a;}};
 const board={getBoundingClientRect:()=>({left:left+(width-374)/2})};
 const group={classList:{contains:()=>terminal,toggle:(name,value)=>{terminal=value;left=value?453:500;width=value?390:620;}}};
 const host={hidden:false,querySelector:s=>present?(s.includes('-result')?result:s.includes('board-wrap')?board:s.includes('play-column')?col:group):null};
 return {host,animations,reveals,show(){present=true;terminal=false;left=500;width=620},get terminal(){return terminal},set reduced(v){globalThis.matchMedia=()=>({matches:v})}};
}
test('restauração terminal é estática e reinício retorna ao centro',()=>{
 const f=fixture(),layout=createDuelResultLayout(f.host,'b');f.reduced=false;layout.beforeReplace();f.show();layout.update(true);assert.equal(f.animations.length,0);assert.equal(f.terminal,true);
 layout.cancel();layout.beforeReplace();f.show();layout.update(false);assert.equal(f.animations.length,1);assert.equal(f.animations[0].frames[0].transform,'translateX(-162px)');assert.equal(f.terminal,false);
});
test('nova vitória desloca, desfazer retorna, animação anterior é cancelada',()=>{
 const f=fixture(),layout=createDuelResultLayout(f.host,'ce');f.reduced=false;layout.beforeReplace();f.show();layout.update(false);layout.update(true);assert.equal(f.animations.length,1);assert.equal(f.animations[0].frames[0].transform,'translateX(162px)');layout.update(false);assert.equal(f.animations[0].cancelled,true);assert.equal(f.animations.length,2);layout.cancel();assert.equal(f.animations[1].cancelled,true);
});
test('reduced motion e rerender sem transição não animam',()=>{
 const f=fixture(),layout=createDuelResultLayout(f.host,'b');f.reduced=true;f.show();layout.update(true);assert.equal(f.animations.length,0);f.reduced=false;layout.update(true);assert.equal(f.animations.length,0);
});

test('painel espera o tabuleiro liberar espaço e cancela a revelação junto',()=>{
 const f=fixture(),layout=createDuelResultLayout(f.host,'ce');f.reduced=false;layout.beforeReplace();f.show();layout.update(false);layout.update(true);assert.equal(f.reveals.length,1);assert.deepEqual(f.reveals[0].frames.map(k=>k.opacity),[0,0,1]);assert.equal(f.reveals[0].frames[1].offset,.55);layout.cancel();assert.equal(f.reveals[0].cancelled,true);
});
