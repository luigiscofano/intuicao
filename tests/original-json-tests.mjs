import assert from 'node:assert/strict';
import {parseLevelJSON,customIdentity} from '../dist/level-json-common.mjs';
import {validateOriginalLevel,originalLevelState,originalLevelAnswer,originalJSONExample,exportOriginalLevel,originalLevelIdentity,validOriginalSnapshot} from '../dist/original-json.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {traceLightWorld} from '../dist/light-world.mjs';
import {curvedCut,shapePolygon} from '../dist/curves.mjs';
import {isFaunaShape} from '../dist/cut-fauna-geometry.mjs';
import {cutSuccess} from '../dist/math.mjs';
const clone=structuredClone;
let checks=0;const rejects=(game,change,pattern)=>{const value=originalJSONExample(game);change(value);assert.throws(()=>validateOriginalLevel(parseLevelJSON(JSON.stringify(value),game),game),pattern);checks++;};
for(const game of ['light','cut']){
 const input=originalJSONExample(game),before=JSON.stringify(input),level=validateOriginalLevel(input,game);
 assert.equal(JSON.stringify(input),before,'Validation is pure');
 assert.deepEqual(validateOriginalLevel(JSON.parse(JSON.stringify(exportOriginalLevel(level))),game),level);
 assert.equal(originalLevelIdentity({...level,name:'New name',id:'campaign-id'}),originalLevelIdentity(level));
 const changed=clone(input);if(game==='light')changed.objects[0].angle=-70;else changed.initialTravel=70;
 assert.notEqual(originalLevelIdentity(validateOriginalLevel(changed,game)),originalLevelIdentity(level));
 assert.ok(validOriginalSnapshot(level,originalLevelState(level)));
 const invalid=originalLevelState(level);if(game==='light')invalid.objects[0].x++;else invalid.target++;
 assert.equal(validOriginalSnapshot(level,invalid),false);
 assert.equal(validOriginalSnapshot(level,null),false);
 const answer=originalLevelAnswer(level);
 assert.ok(game==='light'?traceLightWorld(answer).status==='target':cutSuccess(curvedCut(shapePolygon(answer.shape),answer).ratio*100,answer.target));
 checks+=8;
}
for(const [game,levels] of Object.entries({light:lightLevels,cut:cutLevels})){
 const before=JSON.stringify(levels);
 for(const level of levels){if(game==='cut'&&isFaunaShape(level.shape)){assert.throws(()=>validateOriginalLevel({...clone(level),game},game),/shape:/);checks++;continue;}const normalized=validateOriginalLevel({...clone(level),game},game);const again=validateOriginalLevel(exportOriginalLevel(normalized),game);assert.deepEqual(again,normalized);checks++;}
 assert.equal(JSON.stringify(levels),before);
}
for(const [game,field] of [['light','objects'],['cut','holes']]){rejects(game,v=>{v[field]={};});rejects(game,v=>{v[field]=null;});}
rejects('light',v=>{v.solution=undefined;},/inclua solution/);
rejects('light',v=>{v.solution=[0];},/não leva/);
rejects('light',v=>{v.solution=[-45,-45];});
rejects('light',v=>{v.objects[0].angle=91;});
rejects('light',v=>{v.objects[0].length=0;});
rejects('light',v=>{v.objects[0].x=Infinity;});
rejects('light',v=>{v.objects=[];});
rejects('light',v=>{v.objects[0].type='wall';});
rejects('light',v=>{v.objects=Array.from({length:65},()=>v.objects[0]);});
rejects('light',v=>{v.sources[0].color='"/><script>alert(1)</script>';});
rejects('light',v=>{v.targets[0].color='blue';});
rejects('light',v=>{v.sources.push({...v.sources[0]});});
rejects('light',v=>{v.portals=[{id:'a',pairId:'missing',x:20,y:20}];},/par/);
rejects('light',v=>{v.portals=[{id:'a',pairId:'a',x:20,y:20}];});
rejects('light',v=>{v.portals=[{id:'a',pairId:'b',label:'<svg onload=x>',x:20,y:20},{id:'b',pairId:'a',x:30,y:30}];});
rejects('cut',v=>{v.shape='unknown';});
rejects('cut',v=>{v.family='unknown';});
rejects('cut',v=>{v.target=101;});
rejects('cut',v=>{v.amplitude=100000;});
rejects('cut',v=>{v.frequency=0;});
rejects('cut',v=>{v.initialTravel=500;});
rejects('cut',v=>{v.solutionTravel=100;},/solutionTravel/);
rejects('cut',v=>{v.basicDirection=90;});
rejects('cut',v=>{v.permissions={amplitude:'false'};});
rejects('cut',v=>{v.holes=[[{x:300,y:100},{x:500,y:300},{x:300,y:300},{x:500,y:100}]];},/simples/);
rejects('cut',v=>{v.holes=[[{x:300,y:100},{x:300,y:100},{x:500,y:300}]];});
rejects('cut',v=>{v.holes=[[{x:0,y:0},{x:800,y:0},{x:800,y:460},{x:0,y:460}]];});
const withoutAnswer=originalJSONExample('cut');delete withoutAnswer.solutionTravel;
assert.ok(Number.isFinite(validateOriginalLevel(withoutAnswer,'cut').solutionTravel));checks++;
for(const raw of ['null','[]','{"game":"light","x":1e309}','{"game":"light","__proto__":{"x":1}}','{"game":"light","constructor":{}}']){assert.throws(()=>parseLevelJSON(raw,'light'));checks++;}
assert.throws(()=>parseLevelJSON(JSON.stringify(originalJSONExample('cut')),'light'));checks++;
assert.throws(()=>parseLevelJSON(' '.repeat(200001),'light'));checks++;
assert.throws(()=>validateOriginalLevel({...originalJSONExample('light'),solution:()=>[-45]},'light'));checks++;
assert.throws(()=>customIdentity('light',{x:NaN}));checks++;
console.log(JSON.stringify({passed:true,checks,campaignsRoundTripped:lightLevels.length+cutLevels.filter(l=>!isFaunaShape(l.shape)).length,campaignOnlyFauna:cutLevels.filter(l=>isFaunaShape(l.shape)).length}));
