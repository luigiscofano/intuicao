import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {initSintonia} from '../dist/sintonia/ui.mjs';
import {serializeSintoniaSession,restoreSintoniaSession,persistableSintoniaLevel} from '../dist/sintonia/service.mjs';
import {ANIMAL_NAMES,ANIMAL_SPRITES} from '../dist/sintonia/animal-roster.mjs';

host.id='sintonia';globalThis.addEventListener=()=>{};
globalThis.Worker=class{
  terminate(){}
  postMessage(message){if(message.type==='hint')queueMicrotask(()=>this.onmessage?.({data:{id:message.id,ok:true,result:{status:'solved',solution:message.level.solution}}}));}
};
const key='intuicao.sintonia.v1',level=CAMPAIGN[0],roster=['quati','arara'];
const session={...serializeSintoniaSession(restoreSintoniaSession(level,null)),animalRoster:roster};
const read=()=>JSON.parse(store.get(key));
const checkRendered=expected=>{
  const html=$('s-boards').innerHTML;
  for(const id of expected){assert.ok(html.includes(ANIMAL_NAMES[id]));assert.ok(html.includes(ANIMAL_SPRITES[id].url));}
  assert.equal((html.match(/class="s-animal-sprite"/g)||[]).length,expected.length);
};
store.set(key,JSON.stringify({version:1,prefs:{autoAdvance:false},campaign:{lastId:level.id,sessions:{[level.id]:session},completed:{}},lastView:{active:true,screen:'play',mode:'campaign'}}));
let app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);checkRendered(roster);
const saved=()=>read().campaign.sessions[level.id];
assert.deepEqual(saved().level,persistableSintoniaLevel(level));
// Named hint follows the rendered identity, including filtered moving boards.
$('s-hint').click();await Promise.resolve();await Promise.resolve();$('s-hint').click();
assert.match($('s-hint-text').textContent,/Quati/);assert.match($('s-hint-text').textContent,/Arara-azul/);
host.querySelector(`[data-s-direction="${level.solution[0]}"]`).click();assert.equal(saved().cursor,1);
$('s-undo').click();assert.equal(saved().cursor,0);checkRendered(roster);
$('s-redo').click();assert.equal(saved().cursor,1);assert.deepEqual(saved().animalRoster,roster);
$('s-reset').click();$('restart-sintonia-confirm').click();assert.equal(saved().cursor,0);assert.deepEqual(saved().animalRoster,roster);checkRendered(roster);
$('s-level-next').click();const next=read().campaign.sessions[CAMPAIGN[1].id];assert.equal(new Set(next.animalRoster).size,next.level.boards.length);
$('s-level-prev').click();checkRendered(roster);
app.hide();const data=read();data.lastView={active:true,screen:'play',mode:'campaign'};store.set(key,JSON.stringify(data));
app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);checkRendered(roster);app.hide();
// Cosmetic migration does not discard an old saved move history.
const old=serializeSintoniaSession(restoreSintoniaSession(level,null));
for(const mode of ['endless','custom']){
  const data={version:1,prefs:{autoAdvance:false},lastView:{active:true,screen:'play',mode}};
  if(mode==='endless')data.endless={version:1,baseSeed:1,number:7,solved:3,startDifficulty:0,current:{level,seed:2,session:old}};
  else data.custom={level,session:old};
  store.set(key,JSON.stringify(data));app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);
  const current=()=>mode==='endless'?read().endless.current:read().custom;
  const cast=current().session.animalRoster;
  assert.equal(new Set(cast).size,level.boards.length);checkRendered(cast);
  host.querySelector(`[data-s-direction="${level.solution[0]}"]`).click();
  $('s-reset').click();$('restart-sintonia-confirm').click();
  assert.deepEqual(current().session.animalRoster,cast);assert.deepEqual(current().level,level);
  if(mode==='endless'){assert.equal(read().endless.number,7);assert.equal(read().endless.solved,4);}
  app.hide();
}
console.log('PASS roster, names, hints, undo/redo, restart, phase navigation, reload, legacy saves, Endless and custom maps');
