import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderMapSelection, mapGroupKey, selectMapInGroup, terrainMapPreview } from '../../dist/versus/map-selection.mjs';
import { BROTO_MAPS } from '../../dist/broto/maps.mjs';
import { CERCO_MAPS } from '../../dist/cerco/maps.mjs';
import { DESVIO_MAPS } from '../../dist/desvio.mjs';
import { game as estalo } from '../../dist/versus/games/estalo/index.mjs';
import { game as acorde } from '../../dist/versus/games/acorde/index.mjs';
import { game as mosaico } from '../../dist/versus/games/mosaico/index.mjs';
import { game as quinhao } from '../../dist/versus/games/quinhao/index.mjs';
import { estaloMapPreview } from '../../dist/versus/games/estalo/map-selection.mjs';
const catalogs = [
 {id:'broto',maps:BROTO_MAPS,preview:terrainMapPreview},
 {id:'cerco',maps:CERCO_MAPS,preview:terrainMapPreview},
 {id:'desvio',maps:DESVIO_MAPS,preview:map=>map.arrows.join(' ')},
 ...[acorde,mosaico,quinhao].map(game=>({id:game.id,maps:game.maps,preview:game.mapPreview})),
 {id:'estalo',maps:estalo.maps,preview:estaloMapPreview},
];
for (const catalog of catalogs) test(`${catalog.id}: seleção comum cobre cada mapa sem alterar catálogo`,()=>{
 const before=JSON.stringify(catalog.maps);
 for(const selected of catalog.maps){
  const html=renderMapSelection({...catalog,selectedId:selected.id});
  const visible=catalog.maps.filter(map=>mapGroupKey(map)===mapGroupKey(selected));
  assert.equal((html.match(/data-vs-map=/g)||[]).length,visible.length);
  assert.equal((html.match(/data-vs-group=/g)||[]).length,new Set(catalog.maps.map(mapGroupKey)).size);
  assert(html.includes(`data-vs-map="${selected.id}" aria-pressed="true"`));
  assert(html.includes('aria-live="polite"'));
  assert(!html.includes('undefined'),'metadados completos na apresentação');
  assert.doesNotMatch(html,/vs-map-hint|Escolher um mapa não inicia nem substitui a partida salva/);
  for(const group of new Set(catalog.maps.map(mapGroupKey))) assert.equal(mapGroupKey(selectMapInGroup(catalog.maps,selected.id,group)),group);
 }
 assert.equal(JSON.stringify(catalog.maps),before);
 assert(catalog.maps.length>=39&&catalog.maps.length<=48);
});
test('seletor escapa rótulos e mantém estado escolhido por símbolo, não somente cor',()=>{
 const html=renderMapSelection({id:'qa',maps:[{id:'a',name:'<img>',description:'<script>',rows:2,cols:2}],preview:()=>'',selectedId:'a'});
 assert(html.includes('&lt;img&gt;'));assert(!html.includes('<script>'));assert(html.includes('✓ Selecionado'));
});
test('todos os controladores usam seletor único; Desvio exige iniciar explicitamente',()=>{
 for(const path of ['dist/broto/ui.mjs','dist/cerco/ui.mjs','dist/versus/ui.mjs','dist/collection-ui.mjs']){
  const text=readFileSync(new URL('../../'+path,import.meta.url),'utf8');assert(text.includes('renderMapSelection'));assert(text.includes('bindMapSelection'));
 }
 const text=readFileSync(new URL('../../dist/collection-ui.mjs',import.meta.url),'utf8');assert(text.includes('id="c-start-duel"'));
});
