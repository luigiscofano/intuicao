import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN } from '../../dist/logica/games/refugio/campaign.mjs';
import { initialState } from '../../dist/logica/games/refugio/engine.mjs';
import { renderBoard } from '../../dist/logica/games/refugio/view.mjs';
function markerColors(level, skin) {
  const html = renderBoard(level, initialState(level), { skin });
  return level.markers.map(marker => {
    const group = html.split(`<g data-cell="${marker.index}"`)[1].split('</g>')[0];
    return [...group.matchAll(/<rect[^>]*fill="([^"]+)"/g)][1][1];
  });
}
test('cada marco tem uma cor exclusiva nas 80 fases, nas duas skins', () => {
  assert.equal(CAMPAIGN.length, 80);
  for (const level of CAMPAIGN) for (const skin of ['normal', 'identity']) {
    const colors = markerColors(level, skin);
    assert.equal(new Set(colors).size, level.markers.length, `${level.id}/${skin}`);
  }
});
test('cores aprovadas preservam verde/amarelo e distinguem azul/roxo', () => {
  const level = CAMPAIGN.find(level => level.markers.length === 4);
  assert.deepEqual(markerColors(level, 'identity'), ['#E1EDCE', '#F5E7B2', '#DCEAF1', '#EAE1EF']);
});
test('não volta a reciclar cores se um futuro mapa tiver mais marcos', () => {
  const level = { id:'future',rows:4,cols:4,markers:Array.from({length:12},(_,i)=>({index:i,label:i+1})),givens:Array(16).fill(null) };
  level.markers.forEach(marker=>level.givens[marker.index]=0);
  assert.equal(new Set(markerColors(level, 'identity')).size,12);
});
