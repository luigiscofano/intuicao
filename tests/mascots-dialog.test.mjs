import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {FAUNA_ART,FAUNA_ASSETS} from '../dist/fauna-art.mjs';
import {FAUNA_INFO} from '../dist/fauna-info-content.mjs';
import {faunaCropMarkup} from '../dist/fauna-info.mjs';
import {mascotCardsMarkup} from '../dist/mascots-dialog.mjs';
const read=path=>readFileSync(new URL('../dist/'+path,import.meta.url),'utf8');
test('galeria usa exatamente os 15 ícones frontais oficiais com nomes e fichas',()=>{
 assert.equal(FAUNA_ART.length,15);
 assert.equal(new Set(FAUNA_ART.map(a=>a.id)).size,15);
 for(const art of FAUNA_ART){
  assert.ok(FAUNA_INFO[art.id].name);
  assert.ok(FAUNA_INFO[art.id].description);
  assert.match(faunaCropMarkup(art,'front'),/fauna-green-original\.png/);
  assert.equal(art.front.length,4);
 }
 assert.equal(FAUNA_ASSETS.front.url,'platform-assets/fauna-green-original.png');
});
test('entrada pelo Sobre, controles semânticos e reaproveitamento da ficha',()=>{
 const code=read('mascots-dialog.mjs');
 assert.match(code,/getElementById\('about-dialog'\)/);
 assert.match(code,/Conhecer os mascotes/);
 assert.match(code,/FAUNA_ART\.map/);
 assert.match(code,/faunaCropMarkup\(art, 'front'\)/);
 assert.match(code,/FAUNA_INFO\[art.id\]\.name/);
 assert.match(code,/aria-haspopup="dialog"/);
 assert.match(code,/fauna:open/);
 assert.match(code,/event.key === 'Escape'/);
 assert.match(code,/trigger.focus\(/);
 assert.match(read('fauna-info.mjs'),/addEventListener\('fauna:open'/);
});
test('integração única, estilos responsivos limitados à galeria',()=>{
 const html=read('index.html'),css=read('mascots-dialog.css');
 assert.equal((html.match(/src="mascots-dialog.mjs"/g)||[]).length,1);
 assert.equal((html.match(/href="mascots-dialog.css"/g)||[]).length,1);
 assert.match(css,/repeat\(5,minmax\(0,1fr\)\)/);
 assert.match(css,/repeat\(3,minmax\(0,1fr\)\)/);
 assert.match(css,/min-height:44px/);
 assert.doesNotMatch(css,/mix-blend-mode/);
});

test('HTML gerado oferece uma ação com nome para cada um dos quinze animais',()=>{
 const markup=mascotCardsMarkup();
 assert.equal((markup.match(/<button /g)||[]).length,15);
 for(const art of FAUNA_ART){
  assert.ok(markup.includes(`data-fauna="${art.id}"`));
  assert.ok(markup.includes(FAUNA_INFO[art.id].name));
 }
});
