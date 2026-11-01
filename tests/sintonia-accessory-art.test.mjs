import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {accessoryIcon,accessoryEdgeIcon,wallOverlay} from '../dist/sintonia/accessory-art.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {replay,validateLevel} from '../dist/sintonia/engine.mjs';
// Hashes vigentes: 17 artes aprovadas + 4 refinamentos autorizados de interruptor/cancela.
const APPROVED = {
  "box-0.png": "b322b15d372c8166c7a262201e36daeb6ae08a0250b0d92ab58f026e91f721dc",
  "box-1.png": "6d3b2d2dede58a9f1b8bea50d21d84f6923b857640a9a8e9a92a085dbd14dea0",
  "bridge-0.png": "910b84998fbd2d2e2d2dccf745054b258a4a63b0a71ed2c0839f7bcb4d33e805",
  "bridge-1.png": "576809aa455028cb1467c962bd5390e4d7c1d58f31feeebbee636af7b1c3e905",
  "delivery-0.png": "e0ebf1420ced5c73e91c3fd7a3eb940f7734683da417d474fa65f2fb774f5d11",
  "delivery-1.png": "87f0e6b44e356e1c49049fdd3e569e991982063465c2b946ee916b8809a56b35",
  "gate-0.png": "6cd00debb9486d32dd74bbe282bf7bacee2b6a4608e8a18969fc9cee77be43a8",
  "gate-1.png": "037cf3d09296ae61fa9ba89541c4339b2340cd82bf74bfa6343a2a6b890d8974",
  "goal-0.png": "6f8a877e56b8e97ce7e25a15dbad7da3ed142247ad4e88b3e67731fef7ed18cc",
  "goal-1.png": "3c4a37af54446813a9030b59f24cc1cc918717bbe52504ed9f8f2bf6014915ed",
  "ice-0.png": "79b2ae0fe8203cd2ee34a15a480a540a05b5cb2ab501cee6bdeed87711252cfb",
  "key-0.png": "4b6d6cc0feb89eb844519ec24b44e561aad4dc90be8ead76398854a234efa036",
  "key-1.png": "ece0651c71b04cb8ef705589d0b2860b37865ab79b6023a60d659f64ac025cc7",
  "oneway-0.png": "bb06fbf5f9d790bcbbebe6f6dd99770326b4680dbe02920ff4ca3f5d8ccd4f39",
  "plate-0.png": "a4340ce491f179b3d78cf124be226fb79dc4ce82a4adc6dee815fb4931d680c6",
  "plate-1.png": "d57dee139f17aca2790809580c3c17e8a84478978800226c9d8ac7bb842a80e2",
  "portal-0.png": "0ca630d398965d0627f7d38588009bf585e81e4ef57b3b88c8cc4109262d949d",
  "selector-0.png": "e2d50f46493d5f2e3822bc1481e10db06db32aa567ecaa219b9d5b252f600c5b",
  "selector-1.png": "33d2f17f9cd3dc1e301522288e589e1f887b5f8a13c57bb826c4a986f952e47b",
  "switch-0.png": "eb791a2f8b1114550cc92c3937d91ef20363f20d66812615aeaa275bf04a961e",
  "switch-1.png": "76be05325ce9fdf0a0028147587ee80132c4d4b85a5487153f1bca015bd8dda9"
};
function coverage(svg){
 const pixels=new Set();
 for(const m of svg.matchAll(/<path fill="(#[a-f0-9]+)" d="([^"]+)"/g))
  for(const r of m[2].matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g))
   for(let x=+r[1];x<+r[1]+ +r[3];x++)pixels.add(`${x},${r[2]}`);
 return pixels;
}
function assertCoverage(board){
 const snapshot=JSON.stringify(board),svg=wallOverlay(board),walk=new Set(board.walkable);
 assert.ok(svg.includes(`viewBox="0 0 ${board.cols*32} ${board.rows*32}"`));
 assert.ok(svg.includes('aria-hidden="true"'));
 const pixels=coverage(svg);
 for(let y=0;y<board.rows*32;y++)for(let x=0;x<board.cols*32;x++){
  const blocked=!walk.has(Math.floor(y/32)*board.cols+Math.floor(x/32));
  assert.equal(pixels.has(`${x},${y}`),blocked,`cobertura em ${x},${y}`);
 }
 assert.equal(JSON.stringify(board),snapshot,'render não altera tabuleiro');
 assert.equal(wallOverlay(board),svg,'render determinístico');
}
test('21 sprites vigentes permanecem verificados e 32×32',()=>{
 const base=new URL('../dist/sintonia/assets/accessories/',import.meta.url);
 assert.equal(readdirSync(base).filter(n=>n.endsWith('.png')).length,21);
 for(const [name,hash] of Object.entries(APPROVED)){
  const bytes=readFileSync(new URL(name,base));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,name);
  assert.equal(bytes.readUInt32BE(16),32);assert.equal(bytes.readUInt32BE(20),32);
 }
});
test('16 vizinhanças, bordas, cantos, T e cruz cobrem somente parede sem fresta',()=>{
 for(let bits=0;bits<16;bits++){
  const wall=new Set([4]);for(const [i,n] of [1,5,7,3].entries())if(bits&(1<<i))wall.add(n);
  assertCoverage({rows:3,cols:3,walkable:Array.from({length:9},(_,i)=>i).filter(i=>!wall.has(i))});
 }
 for(const walkable of [[],[0],[0,1,2,3]])assertCoverage({rows:2,cols:2,walkable});
});
test('estados e cancelas conservam marcação decorativa e orientação',()=>{
 for(const name of ['key','gate','plate','switch','box','portal','oneway','selector','delivery','bridge','ice','goal'])for(const state of [0,1]){
  const markup=accessoryIcon(name,state);assert.match(markup,/class="s-accessory-icon s-accessory-art"/);assert.match(markup,/alt="" aria-hidden="true"/);assert.match(markup,/width="32" height="32"/);
 }
 assert.throws(()=>accessoryIcon('inexistente'));
 assert.equal(accessoryIcon('switchOn'),accessoryIcon('switch',1));
 assert.equal(accessoryIcon('deliveryIn'),accessoryIcon('delivery',0));
 assert.equal(accessoryIcon('deliveryOut'),accessoryIcon('delivery',1));
 for(const open of [true,false])for(const vertical of [true,false]){
  const svg=accessoryEdgeIcon({open,vertical});assert.match(svg,/s-gate-art/);assert.ok(svg.includes(`viewBox="0 0 ${vertical?'12 32':'32 12'}"`));
 }
 for(const direction of ['up','right','down','left'])assert.equal(accessoryEdgeIcon({oneway:true,direction}),accessoryIcon(direction));
});
test('80 fases preservam soluções e render de paredes não muda estado ou mapas',()=>{
 assert.equal(CAMPAIGN.length,80);
 for(const level of CAMPAIGN){
  const snapshot=JSON.stringify(level);assert.equal(validateLevel(level).valid,true,level.id);
  for(const board of level.boards)assertCoverage(board);
  const result=replay(level,level.solution);assert.equal(result.valid,true,level.id);assert.equal(result.won,true,level.id);
  assert.equal(JSON.stringify(level),snapshot,level.id);
 }
});
