import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildOriginalHint} from '../dist/original-hints.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {curvedCut,shapePolygon,basicCutState} from '../dist/curves.mjs';
import {traceLightWorld,traceLightAttempt} from '../dist/light-world.mjs';
import {generateOriginalEndless} from '../dist/endless-original.mjs';
import {isFaunaShape} from '../dist/cut-fauna-geometry.mjs';
import {cutSuccess} from '../dist/math.mjs';
let checks=0,maxMilliseconds=0;
const freeze=value=>{if(value&&typeof value==='object'){Object.freeze(value);Object.values(value).forEach(freeze);}return value;};
function hidden(level){const copy={...level};for(const key of ['solution','solutionTravel','basicSolution','answer','reference','hint'])Object.defineProperty(copy,key,{get(){throw Error(`Hint read hidden/static field ${key}`);}});return copy;}
function hint(game,level,state,context={}){
 const before=JSON.stringify([state,context]),start=performance.now(),h=buildOriginalHint(game,hidden(level),freeze(state),freeze(context));
 maxMilliseconds=Math.max(maxMilliseconds,performance.now()-start);
 assert.equal(JSON.stringify([state,context]),before,'Hints must not change the game or current trace');
 assert.deepEqual(Object.keys(h).sort(),['explanation','focusText','nextStep']);
 for(const text of Object.values(h)){assert.equal(typeof text,'string');assert.ok(text.length>15);assert.doesNotMatch(text,/undefined|NaN|\b(?:1|2|3)\/3\b/);}
 assert.deepEqual(h,buildOriginalHint(game,hidden(level),state,context),'Hints must be deterministic');checks++;return h;
}
const lightState=l=>({objects:structuredClone(l.objects),sources:structuredClone(l.sources),targets:structuredClone(l.targets),portals:structuredClone(l.portals??[])});
const signatures=new Set();
for(const l of lightLevels){const s=lightState(l),before=traceLightWorld(s);const h=hint('light',l,s,{phase:'editing',selected:0});signatures.add(JSON.stringify(h));assert.deepEqual(traceLightWorld(s),before);assert.match(h.explanation,/ainda precisa ser observado/);assert.doesNotMatch(JSON.stringify(h),/termina na|se cruzam|último que|atingiu o limite/);}
assert.ok(signatures.size>30,'The campaign must not receive one generic light hint');
for(const l of cutLevels){const s=basicCutState(l),r=curvedCut(shapePolygon(s.shape),s),h=hint('cut',l,s,{cutMode:'basic'});assert.match(h.focusText,new RegExp(String(s.target)));assert.ok(h.focusText.includes(isFaunaShape(s.shape)?l.name:s.shape));assert.ok(h.focusText.includes(s.family==='Reta'?'reta':s.family));assert.match(h.nextStep,r.ratio*100<s.target?/Aumente/:/Diminua/);if(s.holes.length)assert.match(h.explanation,/vazio/);assert.deepEqual(curvedCut(shapePolygon(s.shape),s),r);}
const source=(x,y,angle,color='gold')=>({x,y,angle,color});
const target=(x,y,color='gold')=>({x,y,color,radius:22});
const collision={objects:[],sources:[source(100,200,0),source(400,50,90,'blue')],targets:[target(700,200),target(400,400,'blue')],portals:[]};
const observed=s=>({phase:'result',ray:traceLightWorld(s)});
let h=hint('light',{},collision,observed(collision));assert.match(h.explanation,/dourado e azul.*cruzam/);assert.doesNotMatch(h.nextStep,/ângulo.*\d/);
const blocked={objects:[],sources:[source(20,100,0)],targets:[target(700,100)],portals:[{id:'a',pairId:'b',label:'A',x:150,y:100,colors:['blue']},{id:'b',pairId:'a',label:'A',x:500,y:100,colors:['blue']}]};
h=hint('light',{},blocked,observed(blocked));assert.match(h.focusText,/portal A/);assert.match(h.explanation,/entrada.*saída/);assert.match(h.nextStep,/não vira/);
const wall={objects:[{type:'wall',x:100,y:100,length:80,width:12,angle:90}],sources:[source(20,100,0)],targets:[target(700,100)],portals:[]};
h=hint('light',{},wall,observed(wall));assert.match(h.focusText,/parede/);assert.match(h.explanation,/antes de refletir/);
const reflected={objects:[{type:'mirror',x:300,y:200,length:100,angle:45}],sources:[source(100,200,0)],targets:[target(600,400)],portals:[]};
h=hint('light',{},reflected,observed(reflected));assert.match(h.focusText,/borda/);assert.match(h.nextStep,/espelho 1/);assert.match(h.explanation,/1 reflexão/);
h=hint('light',{},reflected,{phase:'result',ray:traceLightWorld(reflected,{maxBounces:0})});assert.match(h.explanation,/limite seguro/);
const separate={objects:[],sources:[source(100,100,0),source(100,300,0,'blue')],targets:[target(700,100),target(700,300,'blue')],portals:[]};
const partial=traceLightAttempt(separate,[0]);h=hint('light',{},separate,{phase:'partial',ray:partial});assert.match(h.focusText,/falta.*azul/);assert.match(h.explanation,/parcial/);
h=hint('light',{},separate,{phase:'editing'});assert.match(h.nextStep,/Confirmar todos/);assert.doesNotMatch(JSON.stringify(h),/Vitória|venc|concluído/);
for(const s of [collision,blocked,wall,reflected,separate]){const editing=hint('light',{},s,{phase:'editing'});assert.match(editing.explanation,/ainda precisa ser observado/);assert.doesNotMatch(JSON.stringify(editing),/termina na|se cruzam|último que|atingiu o limite/);assert.deepEqual(hint('light',{},s,{phase:'editing',ray:traceLightWorld(s)}),editing,'A stale ray must not reveal a predicted trajectory during editing');}
h=hint('light',{},separate,{phase:'animating'});assert.match(h.explanation,/Espere o disparo/);
const many={...separate,sources:Array.from({length:9},(_,i)=>source(50,40+i*40,0))};h=hint('light',{},many);assert.match(h.explanation,/limite/);
const cutLevel=cutLevels[0],center=basicCutState(cutLevel,0),percent=curvedCut(shapePolygon(center.shape),center).ratio*100;
for(const delta of [-3,0,3]){const s={...center,target:percent+delta};assert.ok(cutSuccess(percent,s.target));h=hint('cut',cutLevel,s,{cutMode:'basic'});assert.match(h.nextStep,/confirme a configuração atual/);assert.doesNotMatch(h.nextStep,/Aumente|Diminua/);}
for(const offset of [-100,100]){const s={...center,offset},h=hint('cut',cutLevel,s,{cutMode:'advanced'});assert.match(h.nextStep,/Deslizar curva/);assert.match(h.nextStep,offset<0?/aumentar/:/diminuir/);}
const nonparallel={...cutLevel,basicDirection:90};h=hint('cut',nonparallel,basicCutState(cutLevel));assert.match(h.nextStep,/inverta o sentido/);
for(const game of ['light','cut'])for(const seed of [1,9,32,197,2026])for(const dense of [false,true]){
 const generated=generateOriginalEndless(game,seed,game==='light'?{sources:dense?3:1,mirrors:dense?3:1,portals:dense,selective:dense,walls:dense}:{holes:dense,curves:dense});
 h=hint(game,generated.level,generated.initial,{free:true,cutMode:'advanced',phase:'editing'});
 assert.doesNotMatch(h.focusText,/undefined|Mova a linha até/);if(game==='cut')assert.match(h.nextStep,/Deslizar curva/);
}
const src=readFileSync(new URL('../dist/original-hints.mjs',import.meta.url),'utf8');
assert.doesNotMatch(src,/original-answers|solve|\.solution\b|\.solutionTravel\b|\.basicSolution\b|\.hint\b|ANSWERS|requestAnimationFrame|localStorage|traceLightWorld|traceLightAttempt/);
assert.match(src,/\['partial','result'\]\.includes\(context.phase\)/);
console.log(JSON.stringify({passed:true,checks,distinctInitialLightHints:signatures.size,maxMilliseconds:Math.round(maxMilliseconds*100)/100}));
