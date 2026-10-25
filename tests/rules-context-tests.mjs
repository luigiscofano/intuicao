import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getRulesContext,rulesMechanics} from '../dist/rules-context.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {TUTORIALS} from '../dist/collection-tutorials.mjs';
import {DESVIO_MAPS,DESVIO_CHALLENGE_MAP} from '../dist/desvio.mjs';
import {generateOriginalEndless} from '../dist/endless-original.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
let checks=0;const test=(name,fn)=>{fn();checks++;console.log('PASS',name);};
const catalogues={light:lightLevels,cut:cutLevels,...GEOMETRY_LEVELS,...SYMBOL_LEVELS,desvio:DESVIO_MAPS};
const context=(game,index,options={})=>getRulesContext(game,catalogues[game][index],{catalogue:catalogues[game],index,...options});

test('Campaign introductions follow real mechanics, not stages or difficulty',()=>{
 const expected={light:[1,4,7,16,18,25],cut:[1,6,11,21,31,61,91],elo:[1,21,22,41,61,81,101,121,141,161,181],prumo:[1],pacto:[1],desvio:[1]};
 for(const [game,levels]of Object.entries(catalogues))assert.deepEqual(levels.flatMap((_,i)=>context(game,i).autoOpen?[i+1]:[]),expected[game],game);
});
test('Reflexos describes universal and selective portals from actual fields',()=>{
 const portal=context('light',15),selective=context('light',17);
 assert.deepEqual(portal.introduced,['portals']);assert.match(portal.text,/mesma letra/);assert.match(portal.text,/mantendo a direção/);assert.match(portal.text,/não é um trecho físico/);
 assert.deepEqual(selective.introduced,['selectivePortals']);assert.match(selective.text,/incompatível é bloqueada/);
 assert.equal(context('light',16).autoOpen,false);assert.equal(context('light',18).autoOpen,false);
 assert.equal(context('light',15).autoOpen,true,'Re-entering an introduction is deterministic');
});
test('ELO distinguishes curve/straight debut and explains diamond choice without answers',()=>{
 assert.deepEqual(context('elo',20).introduced,['shape-turn']);
 assert.deepEqual(context('elo',21).introduced,['shape-straight']);
 const diamonds=context('elo',180);assert.deepEqual(diamonds.introduced,['exclusivePassages']);assert.match(diamonds.text,/Exatamente uma casa de cada grupo/);assert.match(diamonds.text,/Nenhuma dessas casas recebe ponto/);
 assert.equal(context('elo',181).autoOpen,false);assert.equal(context('elo',39).autoOpen,false);
});
test('Daily uses actual catalogue identity even with stale index',()=>{
 const catalogue=catalogues.elo;
 assert.equal(getRulesContext('elo',catalogue[180],{catalogue,index:0,mode:'daily'}).autoOpen,true);
 assert.deepEqual(getRulesContext('elo',catalogue[180],{catalogue,index:0,mode:'daily'}).introduced,['exclusivePassages']);
 assert.equal(getRulesContext('elo',catalogue[181],{catalogue,index:180,mode:'daily'}).autoOpen,false);
});
test('Corte detects families and useful holes, not silhouette or direction changes',()=>{
 assert.deepEqual(context('cut',5).introduced,['holes']);assert.match(context('cut',5).text,/não pertencem à área/);
 assert.equal(context('cut',1).autoOpen,false);assert.equal(context('cut',8).autoOpen,false);
 assert.equal(context('cut',21).autoOpen,false,'Advanced amplitude permission is not a new basic rule');
 assert.equal(context('cut',25).autoOpen,false,'Advanced frequency permission is not a new basic rule');
 for(const [game,indices]of [['prumo',[40,80,120,160]],['pacto',[50,100,150]]])for(const index of indices)assert.equal(context(game,index).autoOpen,false,`${game} ${index+1}`);
});
test('Tutorial is explicit and independent of campaign position',()=>{
 for(const [game,level]of Object.entries(TUTORIALS)){
  const result=getRulesContext(game,level,{catalogue:catalogues[game],index:199});
  assert.equal(result.autoOpen,true);assert.equal(result.title,'Regras do tutorial');assert.ok(result.mechanics.includes('base'));assert.ok(result.text.length>80);
 }
});
test('Endless inspects initial scene, not option wishes or secret constructed answer',()=>{
 const generated=generateOriginalEndless('light',42,{sources:3,portals:true,selective:true});
 const scene={...generated.level,...generated.initial};
 Object.defineProperty(scene,'solution',{get(){throw Error('Answer read');}});
 const result=getRulesContext('light',scene,{mode:'endless'});
 assert.equal(result.autoOpen,true);assert.equal(result.title,'Regras desta configuração');assert.ok(result.mechanics.includes('selectivePortals'));assert.ok(result.mechanics.includes('threeSources'));
 const noPortal=generateOriginalEndless('light',42,{portals:false,selective:true});
 assert.equal(rulesMechanics('light',noPortal.initial).includes('selectivePortals'),false);
 for(const game of ['elo','prumo','pacto','desvio']){
  const {level}=generateCollectionEndless(game,42);const current=getRulesContext(game,level,{mode:'endless'});
  assert.equal(current.autoOpen,true);assert.equal(current.title,'Regras desta configuração');assert.ok(current.mechanics.includes('base'));
 }
});
test('Custom metadata cannot inherit campaign introduction from an index or title',()=>{
 const level={...catalogues.elo[180],id:'custom-diamonds',stage:1};
 const result=getRulesContext('elo',level,{catalogue:catalogues.elo,index:0,mode:'custom'});
 assert.equal(result.title,'Regras desta configuração');assert.equal(result.autoOpen,true);assert.deepEqual(result.introduced,[]);assert.ok(result.mechanics.includes('exclusivePassages'));
 assert.deepEqual(rulesMechanics('elo',{constraints:{},stage:10,difficulty:'losangos',name:'◇'}),['base']);
});
test('DESVIO tactical setup is explained without choosing a move',()=>{
 const result=getRulesContext('desvio',DESVIO_CHALLENGE_MAP,{mode:'custom'});
 assert.ok(result.mechanics.includes('restrictedStart'));assert.ok(result.mechanics.includes('consumedStart'));
 assert.match(result.text,/destino já definido/);assert.match(result.text,/casas consumidas/);assert.doesNotMatch(result.text,/linha 3|L\d+C\d+|única escolha vence/);
});
test('Detector never reads solution, profile, hint, current moves, or progression labels',()=>{
 for(const [game,levels]of Object.entries(catalogues)){
  const source=levels[Math.min(20,levels.length-1)],guarded={...source};
  for(const key of ['solution','answer','profile','hint','positions','values','assignments','stage','difficulty','completed'])Object.defineProperty(guarded,key,{get(){throw Error(`Forbidden read: ${game}.${key}`);}});
  assert.deepEqual(rulesMechanics(game,guarded),rulesMechanics(game,source));
  assert.doesNotThrow(()=>getRulesContext(game,guarded,{catalogue:levels}));
 }
 const source=readFileSync(new URL('../dist/rules-context.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(source,/localStorage|sessionStorage|document\.|window\./);
 assert.deepEqual(getRulesContext('unknown',{}),{autoOpen:false,title:'',text:'',mechanics:[],introduced:[]});
});
console.log(`PASS ${checks} contextual-rules checks across six games`);
