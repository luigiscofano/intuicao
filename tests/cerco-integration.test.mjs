import test from 'node:test';import assert from 'node:assert/strict';
import {createCerco,legalCercoMoves,applyCercoMove,previewCercoMove,restoreCerco,undoCerco,redoCerco} from '../dist/cerco/engine.mjs';
import {chooseCercoMove,chooseCercoMoveAsync} from '../dist/cerco/bot.mjs';
const key=m=>m.from+':'+m.to;
function oracleLegal(s,p=s.player){const out=[];for(let from=0;from<25;from++)if(s.board[from]===p)for(let to=0;to<25;to++)if(s.board[to]===null&&Math.abs(Math.floor(from/5)-Math.floor(to/5))+Math.abs(from%5-to%5)===1)out.push({from,to});return out;}
function oracleApply(s,m){const board=[...s.board];board[m.from]='barrier';board[m.to]=s.player;const n={...s,board,player:1-s.player,turn:s.turn+1};n.over=!oracleLegal(n).length;n.winner=n.over?s.player:null;return n;}
let random=631;function rand(n){random=(Math.imul(random,1664525)+1013904223)>>>0;return random%n;}
const samples=[];
test('independent Manhattan oracle verifies 500 complete games, both starters, conservation and winner',()=>{
 for(let trial=0;trial<500;trial++){let s=createCerco(trial%2);while(!s.over){const legal=oracleLegal(s);assert.deepEqual(legalCercoMoves(s).map(key).sort(),legal.map(key).sort());assert(legal.length);if(samples.length<250&&s.turn>=6)samples.push(s);const move=legal[rand(legal.length)],before=JSON.stringify(s),expected=oracleApply(s,move),r=applyCercoMove(s,move);assert.deepEqual(r.state.board,expected.board);assert.equal(r.state.over,expected.over);assert.equal(r.state.winner,expected.winner);assert.equal(r.state.player,expected.player);assert.deepEqual(previewCercoMove(s,move),r);assert.equal(JSON.stringify(s),before);s=r.state;assert.equal(s.board.filter(x=>x===0||x===1).length,6);assert.equal(s.board.filter(x=>x==='barrier').length,s.turn);assert.equal(s.board.filter(x=>x===null).length,19-s.turn);assert(s.turn<=19);assert(restoreCerco(s));}assert.equal(oracleLegal(s).length,0);assert.equal(s.winner,1-s.player);}
});
test('intermediate bot takes immediate wins and avoids immediate defeat when safe alternative exists',()=>{
 let wins=0,defenses=0;
 for(const s of samples){const choices=oracleLegal(s),winners=choices.filter(m=>oracleApply(s,m).over);const safe=choices.filter(m=>{const n=oracleApply(s,m);return n.over||!oracleLegal(n).some(r=>oracleApply(n,r).over);});if(!winners.length&&(!safe.length||safe.length===choices.length))continue;const r=chooseCercoMove(s,{difficulty:'intermediate',nodeBudget:512});assert(choices.some(m=>key(m)===key(r.move)));assert(r.nodes<=r.nodeBudget);if(winners.length){assert(winners.some(m=>key(m)===key(r.move)));wins++;}else{assert(safe.some(m=>key(m)===key(r.move)));defenses++;}}
 assert(wins>0,'sample includes immediate victories');assert(defenses>0,'sample includes avoidable immediate defeats');
});
test('save replay rejects forged terminal state and restores undo branch exactly',()=>{
 let s=createCerco();for(let i=0;i<6&&!s.over;i++)s=applyCercoMove(s,legalCercoMoves(s)[0]).state;const end=s,u=undoCerco(s);assert.deepEqual(redoCerco(restoreCerco(JSON.stringify(u))),end);for(const field of ['winner','turn','player','over']){const bad=structuredClone(s);bad[field]=field==='over'?!s.over:99;assert.equal(restoreCerco(bad),null);}const bad=structuredClone(u);bad.future[0]={from:0,to:24};assert.equal(restoreCerco(bad),null);
});
test('cooperative strong search supports cancellation and explicit node limit',async()=>{
 const abort=new AbortController();const task=chooseCercoMoveAsync(createCerco(),{difficulty:'strong',nodeBudget:12000,signal:abort.signal});abort.abort();await assert.rejects(task,{name:'AbortError'});const result=await chooseCercoMoveAsync(createCerco(),{difficulty:'strong',nodeBudget:512});assert(result.nodes<=512);assert(result.limited);assert(legalCercoMoves(createCerco()).some(m=>key(m)===key(result.move)));
});

import {createHash} from 'node:crypto';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
const previousGames=['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','desvio','broto'];
test('all ten prior information objects, diagrams and icons stay byte-equivalent',()=>{
 for(const [o,hash] of [[GAME_INFO,'8778a923968d65550509562df7048575f59cfa85ee808bb0963980f48ff98241'],[RULE_EXAMPLES,'5b45af6724aefe34ed25e218496318b2b425519759cf556e0f010a4087e308ec'],[GAME_NAV_ICONS,'365f0f5aeee1d7a00b68ab118ec3420b95e3bf8c2530c26d8e96c4de1f94a667']]){
  const prior=Object.fromEntries(Object.entries(o).filter(([key])=>previousGames.includes(key)));assert.equal(createHash('sha256').update(JSON.stringify(prior)).digest('hex'),hash);assert(o.cerco);
 }
 assert.deepEqual(CATEGORY_GAMES.intuicao,['light','cut']);assert.deepEqual(CATEGORY_GAMES.logica,['elo','prumo','pacto','sintonia','repasse','orbita']);assert.deepEqual(CATEGORY_GAMES.versus.slice(0,3),['desvio','broto','cerco']);
 assert.equal(GAME_INFO.cerco.description,'Mova suas peças, feche caminhos e deixe o adversário sem saída.');
});

import {createCercoSearch} from '../dist/cerco/service.mjs';
import {readFileSync} from 'node:fs';
test('stale worker error cannot terminate or resolve a newer search',async()=>{
 const original=globalThis.Worker,workers=[];
 class FakeWorker{constructor(){this.terminated=false;workers.push(this);}postMessage(m){this.request=m;}terminate(){this.terminated=true;}}
 globalThis.Worker=FakeWorker;
 try{const service=createCercoSearch();const first=service.search(createCerco());const aborted=assert.rejects(first,{name:'AbortError'});const second=service.search(createCerco(1));await aborted;assert(workers[0].terminated);workers[0].onerror();assert.equal(workers[1].terminated,false);const answer={move:{from:20,to:15}};workers[1].onmessage({data:{id:workers[1].request.id,result:answer}});assert.deepEqual(await second,answer);service.cancel();}
 finally{globalThis.Worker=original;}
});
test('CERCO UI scopes official front icons, no resume button and safeguards modes/storage',()=>{
 const ui=readFileSync(new URL('../dist/cerco/ui.mjs',import.meta.url),'utf8'),css=readFileSync(new URL('../dist/cerco/ui.css',import.meta.url),'utf8');
 assert(ui.includes('FAUNA_ASSETS.front'));assert(ui.includes('FAUNA_ART.map'));assert(!ui.includes('ANIMAL_SPRITES'));
 assert(ui.includes("CERCO_STORAGE_KEY='intuicao.cerco.v1'"));assert(ui.includes('if(!state||invalidSave)return'));assert(!/localStorage\.(clear|removeItem)/.test(ui));
 assert(!/Continuar partida|Opções avançadas|Tutorial PDF|Ver gabarito|Checar resposta/.test(ui));
 assert(ui.includes("config.mode==='competitive'&&!state.over"));assert(ui.includes("while(state.player!==0&&!state.over"));assert(ui.includes('token!==revision||id!==matchId||state!==origin'));
 assert(ui.includes('rulesOpen=true'));assert(ui.includes("restart=createRestartConfirmation('restart-cerco')"));assert(ui.includes('bindMiddleConfirm'));
 assert(css.includes('#cerco .ce-workspace'));assert(css.includes('@media(prefers-reduced-motion:reduce)'));assert(!/\n(?:body|button|\.collection|\.rules|\.stage)/.test(css));
});
