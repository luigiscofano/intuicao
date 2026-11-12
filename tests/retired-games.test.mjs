import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { RETIRED_GAME_IDS, retiredGameFromLocation } from '../dist/retired-games.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
import { createOrbitaRoute } from '../dist/orbita/route.mjs';
import { normalizeLogicData } from '../dist/logica/storage.mjs';
import { readAchievements } from '../dist/achievements.mjs';
import { PROGRESS_KEYS } from '../dist/progress-backup.mjs';

test('catálogo oferece 23 jogos e nenhum retirado', () => {
  const ids=Object.values(CATEGORY_GAMES).flat();
  assert.equal(ids.length,23);
  for (const id of RETIRED_GAME_IDS) assert.ok(!ids.includes(id));
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/data-(?:logic|orbita)="(?:divisa|orbita)"/);
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
  assert.ok(data.available > 0); // A retirada não fixa o tamanho das campanhas ativas.
  for (const id of RETIRED_GAME_IDS) {
    assert.ok(!data.games.some(g=>g.id===id));
    assert.ok(!data.missions.some(m=>m.gameIds.includes(id)));
    assert.ok(!data.missionGames.some(g=>g.id===id));
  }
});
