import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {analyzeBoard,createTrama,applyTramaMove,previewTramaMove,legalTramaMoves,restoreTrama,undoTramaToHuman,redoTramaToHuman} from '../dist/trama/engine.mjs';
import {createTramaSearch} from '../dist/trama/service.mjs';
function oracle(board){return [0,1].map(owner=>{const nodes=board.flatMap((v,i)=>v===owner?[i]:[]),parent=new Map(nodes.map(n=>[n,n])),root=n=>{while(parent.get(n)!==n)n=parent.get(n);return n;},edges=[];for(let ai=0;ai<nodes.length;ai++)for(let bi=ai+1;bi<nodes.length;bi++){const a=nodes[ai],b=nodes[bi],dr=Math.abs(Math.floor(a/6)-Math.floor(b/6)),dc=Math.abs(a%6-b%6);if(dr&&dc)continue;const d=dr+dc;if(d===1||(d===2&&board[(a+b)/2]===null)){edges.push([a,b]);parent.set(root(b),root(a));}}const groups=new Map;for(const n of nodes){const r=root(n);groups.set(r,[...(groups.get(r)||[]),n]);}return{edges,components:[...groups.values()].map(c=>c.sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]),maxSize:Math.max(0,...[...groups.values()].map(c=>c.length))};});}
let seed=20261031;const rand=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
test('independent pairwise/union oracle matches 1000 arbitrary boards including cycles and splits',()=>{
 for(let n=0;n<1000;n++){const board=Array.from({length:36},()=>[null,0,1][rand(3)]),o=oracle(board),a=analyzeBoard(board);for(let p=0;p<2;p++){assert.deepEqual(a.graphs[p].edges.map(e=>[e.from,e.to]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),o[p].edges);assert.deepEqual(a.components[p],o[p].components);assert.equal(a.maxSizes[p],o[p].maxSize);}}
});
test('200 full legal games recalculate BOTH graphs after every placement and never mutate preview',()=>{
 for(let g=0;g<200;g++){let s=createTrama(g%2);while(!s.over){const moves=legalTramaMoves(s),c=moves[rand(moves.length)],raw=JSON.stringify(s),r=previewTramaMove(s,c);assert.equal(JSON.stringify(s),raw);assert.deepEqual(r,applyTramaMove(s,c));const o=oracle(r.state.board);assert.deepEqual(r.state.maxSizes,o.map(v=>v.maxSize));assert.equal(r.state.winner,o[s.player].maxSize>=6?s.player:r.state.turn===36?'draw':null);assert(r.state.turn<=36);s=r.state;}assert(restoreTrama(s));}
});
test('empty crossing is two networks; sixth center joins, opponent center splits both bridges',()=>{
 const board=Array(36).fill(null);for(const c of [8,20,13,15])board[c]=0;assert.deepEqual(analyzeBoard(board).components[0],[[8,20],[13,15]]);board[2]=0;assert.deepEqual(analyzeBoard(board).components[0],[[2,8,20],[13,15]]);const s={...createTrama(),board,...analyzeBoard(board)};const r=applyTramaMove(s,14);assert.equal(r.state.winner,0);assert.equal(r.state.maxSizes[0],6);assert.equal(r.events.winningComponent.length,6);const block=applyTramaMove({...s,player:1},14);assert.equal(block.events.removedEdges.filter(e=>e.owner===0).length,2);assert.equal(block.state.maxSizes[0],2);assert.equal(block.state.maxSizes[1],1);
});
test('36-cell checkerboard ties without secret tie-break; saved derived graph forgery rejected',()=>{
 const sets=[[],[]];for(let i=0;i<36;i++)sets[(Math.floor(i/6)+i%6)%2].push(i);let s=createTrama();for(let i=0;i<18;i++)for(let p=0;p<2;p++)s=applyTramaMove(s,sets[p][i]).state;assert.equal(s.turn,36);assert.equal(s.winner,'draw');assert.deepEqual(s.maxSizes,[1,1]);const bad=structuredClone(s);bad.maxSizes[0]=6;assert.equal(restoreTrama(bad),null);
});
test('bot undo/redo returns human decision for either initial player',()=>{
 for(const starter of [0,1]){let s=createTrama(starter);for(let i=0;i<(starter?3:2);i++)s=applyTramaMove(s,[0,35,2][i]).state;const original=s;const undo=undoTramaToHuman(s);assert.equal(undo.player,0);assert.equal(undo.turn,starter?1:0);assert.deepEqual(redoTramaToHuman(undo),original);}
});
test('stale worker callback cannot terminate newer TRAMA search',async()=>{
 const original=globalThis.Worker,workers=[];globalThis.Worker=class{constructor(){this.terminated=false;workers.push(this);}terminate(){this.terminated=true;}postMessage(m){this.request=m;}};
 try{const service=createTramaSearch(),old=service.search(createTrama()),aborted=assert.rejects(old,{name:'AbortError'}),next=service.search(createTrama(1));await aborted;workers[0].onerror();assert(!workers[1].terminated);workers[1].onmessage({data:{id:workers[1].request.id,result:{move:0}}});assert.deepEqual(await next,{move:0});service.cancel();}finally{globalThis.Worker=original;}
});
const ui=readFileSync(new URL('../dist/trama/ui.mjs',import.meta.url),'utf8');
test('UI keeps actual scores during preview, separate inspection and team identities',()=>{
 assert(ui.includes('state.maxSizes[p]'));assert(ui.includes('preview?.state||state'));assert(ui.includes('inspectTramaComponent(state,cell)'));assert(ui.includes('onfocusin'));
 assert(!/ANIMAL_SPRITES|Time Verde|Time Amarelo/.test(ui));assert(ui.includes('undoTramaToHuman(state)'));assert(ui.includes('token!==revision||id!==matchId||state!==origin'));assert(ui.includes('if(!state||invalidSave)return'));assert(ui.includes('celebrate&&!draw&&!reduced'));assert(ui.includes("config.mode==='training'"));
});
test('SVG crossings receive a gap without adding a node',async()=>{
 const extracted=ui.slice(ui.indexOf('export function tramaEdgesMarkup'),ui.indexOf('export function initTrama'));const {tramaEdgesMarkup}=await import('data:text/javascript;base64,'+Buffer.from('const key=e=>`${e.owner}:${e.from}:${e.to}`;'+extracted).toString('base64'));
 const board=Array(36).fill(null);for(const c of [8,20,13,15])board[c]=0;const markup=tramaEdgesMarkup(analyzeBoard(board).graphs);assert.equal((markup.match(/<path/g)||[]).length,2);assert.equal((markup.match(/M/g)||[]).length,4);assert(!markup.includes('<circle'));assert(markup.includes('aria-hidden="true"'));
});
