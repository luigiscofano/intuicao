import test from 'node:test';
import assert from 'node:assert/strict';
import { readApprovedAttempts, recordApprovedAttemptWin, APPROVED_ATTEMPTS_STORAGE_ID as KEY } from '../dist/achievements/approved-store.mjs';
import { readMissionLedger, recordMissionUnlocks } from '../dist/achievements/mission-store.mjs';
import { readAchievements } from '../dist/achievements.mjs';
import { filterAchievements } from '../dist/achievements/view.mjs';
import { createProgressBackup, parseProgressBackup, previewProgressRestore, applyProgressRestore } from '../dist/progress-backup.mjs';
const storage = () => { const m = new Map(); return { getItem: k=>m.get(k)??null, setItem:(k,v)=>m.set(k,v), removeItem:k=>m.delete(k) }; };
const win = (s,gameId,levelId,firstConfirmation=true) => recordApprovedAttemptWin({gameId,levelId,firstConfirmation},s);
test('primeira confirmação é por fase distinta; replay não soma e três jogos podem compor',()=>{
 const s=storage(); recordMissionUnlocks(['broto-double-harvest'],s);
 assert.deepEqual(win(s,'elo','a'),['precision-first-try']);
 assert.deepEqual(win(s,'elo','a'),[]); win(s,'prumo','a');
 let view=readAchievements(s); assert.equal(view.missions.find(m=>m.id==='precision-three-first-tries').current,2);
 assert.deepEqual(win(s,'cut','b'),['precision-three-first-tries']);
 for(let i=0;i<20;i++)win(s,'elo',`level${i}`);
 assert.equal(readApprovedAttempts(s).firstWins.length,3);
 assert(readMissionLedger(s).unlocked['broto-double-harvest']);
 assert.equal(readAchievements(s).missions.find(m=>m.id==='precision-three-first-tries').current,3);
});
test('evidência não confirmada, jogo inválido e identidade inválida não contam',()=>{
 const s=storage(); win(s,'elo','a',false); win(s,'light','a'); win(s,'cut',null); win(s,'cut','a:b');
 assert.equal(s.getItem(KEY),null); assert.deepEqual(readMissionLedger(s).unlocked,{});
});
test('registro incompatível fica intacto e falha de storage não interrompe jogo',()=>{
 const s=storage(); for(const raw of ['{bad','{"version":2,"firstWins":[]}','{"version":1,"firstWins":["bad"]}']) {
 s.setItem(KEY,raw); assert.deepEqual(win(s,'elo','a'),[]); assert.equal(s.getItem(KEY),raw);
 }
 assert.deepEqual(win({getItem:()=>null,setItem:()=>{throw Error('quota');}},'elo','a'),[]);
 assert.deepEqual(win(null,'elo','a'),[]);
});
test('primeiras confirmações e conquistas anteriores sobrevivem ao backup',()=>{
 const s=storage();win(s,'prumo','one');win(s,'cut','two');recordMissionUnlocks(['cerco-isolate'],s);
 const backup=parseProgressBackup(JSON.stringify(createProgressBackup(s)));
 const t=storage();applyProgressRestore(backup,previewProgressRestore(backup,t),t);
 assert.deepEqual(readApprovedAttempts(t),readApprovedAttempts(s));
 assert.deepEqual(win(t,'elo','three'),['precision-three-first-tries']);
 assert(readMissionLedger(t).unlocked['cerco-isolate']);
});
test('missões compartilhadas aparecem em cada jogo elegível e nunca criam rota inexistente',()=>{
 const data=readAchievements(storage());
 for(const gameId of ['elo','prumo','cut'])assert(filterAchievements(data,{kind:'missions',gameId,status:'all'}).some(m=>m.id==='precision-first-try'));
 for(const gameId of ['sintonia'])assert(filterAchievements(data,{kind:'missions',gameId,status:'all'}).some(m=>m.id==='efficiency-clean-plan'));
 for (const retired of ['orbita','divisa']) {
  assert.deepEqual(filterAchievements(data,{kind:'missions',gameId:retired,status:'all'}),[]);
  assert(!data.missionGames.some(game=>game.id===retired));
 }
 assert.equal(data.missionGames.length,23);
 assert.equal(data.missions.length,59);assert.equal(data.achievements.length,10);
 assert.equal(new Set(data.missions.map(m=>m.name)).size,59);
});

