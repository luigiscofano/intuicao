import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { RETIRED_GAME_IDS, retiredGameFromLocation } from '../dist/retired-games.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
import { createOrbitaRoute } from '../dist/orbita/route.mjs';
import { normalizeLogicData } from '../dist/logica/storage.mjs';
import { readAchievements } from '../dist/achievements.mjs';
import { PROGRESS_KEYS } from '../dist/progress-backup.mjs';

test('catálogo oferece 19 jogos e nenhum retirado', () => {
  const ids=Object.values(CATEGORY_GAMES).flat();
  assert.equal(ids.length,19);
  for (const id of RETIRED_GAME_IDS) assert.ok(!ids.includes(id));
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/data-(?:logic|orbita|versus)="(?:divisa|orbita|lastro|vazante|enlace|dobra)"/);
});
test('links antigos são reconhecidos sem afetar jogos ativos', () => {
  for (const id of RETIRED_GAME_IDS) {
    for (const suffix of [`?game=${id}`,`/${id}`,`#game=${id}`]) {
      const url=new URL(suffix,'https://example.org');
      assert.equal(retiredGameFromLocation(url),id);
    }
  }
  assert.equal(retiredGameFromLocation(new URL('https://example.org/?game=pulso')),null);
});
test('Órbita não abre nem lê ou regrava o armazenamento', () => {
  const route=createOrbitaRoute({hideOthers(){throw Error('não deve abrir');}});
  route.open();route.hide();
  assert.equal(route.restoreOnLoad(),false);
  assert.equal(route.isOpen(),false);
});
test('Divisa mantém save normalizado e Órbita continua no backup', () => {
  const save={version:1,games:{divisa:{completed:{'divisa-exemplo':{version:1,assisted:false,completedAt:'2026-11-12'}},sessions:{},lastLevelId:'divisa-exemplo'}}};
  assert.deepEqual(normalizeLogicData(save).games.divisa.completed,save.games.divisa.completed);
  assert.ok(PROGRESS_KEYS.includes('intuicao.orbita.v1'));
});
test('conquistas não oferecem links para jogos retirados nem escrevem saves', () => {
  const data=readAchievements({getItem:()=>null,setItem(){throw Error('escrita indevida');}});
  assert.equal(data.games.length,12);
  assert.equal(data.available,960);
  assert.equal(data.missions.length,51);
  for (const id of RETIRED_GAME_IDS) {
    assert.ok(!data.games.some(g=>g.id===id));
    assert.ok(!data.missions.some(m=>m.gameIds.includes(id)));
    assert.ok(!data.missionGames.some(g=>g.id===id));
  }
});

import { retiredGameCategory } from '../dist/retired-games.mjs';
import { VERSUS_GAME_IDS, STORED_VERSUS_GAME_IDS } from '../dist/versus/metadata.mjs';
import { createVersusStorage, VERSUS_STORAGE_ID } from '../dist/versus/storage.mjs';
import { createVersusRoute } from '../dist/versus/route.mjs';

test('duelos retirados continuam recuperáveis no armazenamento compartilhado', () => {
 const record={version:1,games:{lastro:{turn:2},vazante:{turn:3},enlace:{turn:4},dobra:{turn:5}}};
 let raw=JSON.stringify(record);
 const storage={getItem:()=>raw,setItem:(key,value)=>{assert.equal(key,VERSUS_STORAGE_ID);raw=value;}};
 const api=createVersusStorage(storage);
 assert.deepEqual(api.read('lastro'),record.games.lastro);
 assert.ok(api.save('quinhao',{turn:1}));
 assert.deepEqual(JSON.parse(raw).games.lastro,record.games.lastro);
 assert.deepEqual(JSON.parse(raw).games.vazante,record.games.vazante);
 assert.deepEqual(JSON.parse(raw).games.enlace,record.games.enlace);
 assert.deepEqual(JSON.parse(raw).games.dobra,record.games.dobra);
 for(const id of ['lastro','vazante','enlace','dobra']){
   assert.ok(!VERSUS_GAME_IDS.includes(id));
   assert.ok(STORED_VERSUS_GAME_IDS.includes(id));
   assert.equal(retiredGameCategory(id),'versus');
 }
 assert.ok(PROGRESS_KEYS.includes(VERSUS_STORAGE_ID));
});
test('rotas diretas dos duelos retirados não carregam jogos nem gravam partidas',async()=>{
 const old=globalThis.document;
 globalThis.document={getElementById:()=>({}),querySelectorAll:()=>[]};
 try {
   const route=createVersusRoute({hideOthers(){throw Error('não deve abrir');}});
   await route.open('lastro');await route.open('vazante');await route.open('enlace');await route.open('dobra');
   assert.equal(route.isOpen(),false);
 } finally {globalThis.document=old;}
});
