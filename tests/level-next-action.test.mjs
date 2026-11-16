import test from 'node:test';
import assert from 'node:assert/strict';
import { nextLevelControlId, showNextLevelAction } from '../dist/level-next-action.mjs';
const games=['light','cut','elo','prumo','pacto','sintonia','repasse','pulso','foz','refugio','mirante','renovo'];
function fixture() {
 const children=[],classes=new Set();let clicks=0;
 const next={isConnected:true,hidden:false,disabled:false,closest:()=>null,click(){clicks++;}};
 const panel={append(n){children.push(n);},classList:{add(n){classes.add(n);},remove(n){classes.delete(n);}}};
 const doc={getElementById(){return next;},createElement(){return {setAttribute(){},remove(){this.removed=true;}};}};
 const surface={ownerDocument:doc,closest:()=>({querySelector:()=>panel})};
 return {next,panel,surface,children,classes,clicks:()=>clicks};
}
for(const game of games) test(`${game}: ação usa navegação nativa uma vez sem mover foco`,()=>{
 const f=fixture();const clean=showNextLevelAction(f.surface,game);
 assert.ok(nextLevelControlId(game));assert.equal(f.children[0].textContent,'Próximo nível →');
 assert.equal(f.clicks(),0);f.children[0].onclick();f.children[0].onclick();assert.equal(f.clicks(),1);
 clean();assert.ok(f.children[0].removed);
});
test('última fase, livre, customizado, tabuleiro removido e Versus não avançam',()=>{
 for(const state of [{disabled:true},{hidden:true},{isConnected:false}]) {
  const f=fixture();Object.assign(f.next,state);showNextLevelAction(f.surface,'pulso');assert.equal(f.children.length,0);
 }
 for(const game of ['desvio','cerco','broto','mosaico','acorde','estalo','quinhao']) {
  const f=fixture();showNextLevelAction(f.surface,game);assert.equal(f.children.length,0);
 }
 const f=fixture();f.surface.ownerDocument.getElementById=()=>null;showNextLevelAction(f.surface,'elo');assert.equal(f.children.length,0);
});
test('revalida controle no clique e limpa em reinício/navegação',()=>{
 const f=fixture(),clean=showNextLevelAction(f.surface,'foz');f.next.disabled=true;f.children[0].onclick();assert.equal(f.clicks(),0);clean();assert.ok(f.children[0].removed);
});
