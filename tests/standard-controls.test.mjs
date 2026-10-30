import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../dist/'+p,import.meta.url),'utf8');
const css=read('standard-controls.css').replace(/\/\*[\s\S]*?\*\//g,'').trim();
const entries=[['collection','c','collection-workspace','collection-ui.mjs'],['sintonia','s','s-workspace','sintonia/ui.mjs'],['repasse','r','r-workspace','repasse/ui.mjs'],['orbita','o','o-workspace','orbita/ui.mjs']];
test('advanced hiding targets the seven later games and Corte, leaving only Reflexos advanced',()=>{
 const blocks=[...css.matchAll(/([^{}]+)\{([^{}]+)\}/g)];assert.equal(blocks.length,4);
 assert.equal(blocks[0][1].replace(/\s+/g,''),entries.map(([host,p])=>`#${host}:is(#${p}-advanced-toggle,#${p}-advanced)`).join(','));
 assert.equal(blocks[0][2].replace(/\s+/g,''),'display:none!important');
 assert.equal(blocks[2][1].replace(/\s+/g,''),'body:has(.games[data-game="cut"][aria-pressed="true"]):is(#toggle-controls,#advanced-controls)');
 assert.equal(blocks[2][2].replace(/\s+/g,''),'display:none!important');
 assert.ok(!css.includes('[data-game="light"]'));
 const app=read('app.mjs');assert.ok(app.includes("if(game==='cut')notes=cutControlGuide();"));
 for(const id of ['basic-cut','move-curve','rotate-curve'])assert.ok(app.includes("cutHandle('"+id+"'"));
 for(const id of ['cut-mode-basic','cut-mode-advanced','cut-control-panel'])assert.ok(app.includes('id="'+id+'"'));
 const html=read('index.html');assert.match(html,/<link rel="stylesheet" href="standard-controls\.css">/);
 assert.ok(html.includes('id="toggle-controls"'));assert.ok(html.includes('id="advanced-controls"'));
 for(const [,p,,path] of entries){const source=read(path);assert.ok(source.includes(`id="${p}-advanced-toggle"`));assert.ok(source.includes(`id="${p}-advanced"`));}
});
test('closed rules reclaim the advanced column while open rules keep their existing sidebar layout',()=>{
 const blocks=[...css.matchAll(/([^{}]+)\{([^{}]+)\}/g)];
 assert.equal(blocks[1][1].replace(/\s+/g,''),entries.map(([host,,workspace])=>`#${host}.${workspace}:not(.rules-open)`).join(','));
 assert.equal(blocks[1][2].replace(/\s+/g,''),'grid-template-columns:minmax(0,1fr)');
 assert.equal(blocks[3][1].replace(/\s+/g,''),'body:has(.games[data-game="cut"][aria-pressed="true"]).workspace:not(.rules-open)');
 assert.equal(blocks[3][2].replace(/\s+/g,''),'grid-template-columns:minmax(0,1fr)');
 for(const [,p,,path] of entries){const source=read(path);for(const id of ['undo','redo','reset','hint','confirm','rules-panel'])assert.ok(source.includes(`id="${p}-${id}"`),`${p}-${id}`);}
 assert.match(read('rules-sidebar.css'),/\.collection-workspace\.rules-open\{grid-template-columns:minmax\(0,1fr\) minmax\(260px,300px\)/);
});
