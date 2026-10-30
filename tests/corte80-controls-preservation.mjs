import assert from 'node:assert/strict';import fs from 'node:fs';
const css=fs.readFileSync('dist/standard-controls.css','utf8'),app=fs.readFileSync('dist/app.mjs','utf8');
const hints=css.slice(css.indexOf('/* Dicas is available only')).replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,'');
assert.equal(hints,'#hint,#s-hint,#r-hint,#o-hint,#s-hint-apply,#r-hint-apply,#o-hint-apply,body:not(:has(.games>[data-collection="pacto"][aria-pressed="true"]))#c-hint,body:not(:has(.games>[data-collection="pacto"][aria-pressed="true"]))#c-hint-apply{display:none!important}');
for(const g of ['sintonia','repasse','orbita'])assert.match(fs.readFileSync(`dist/${g}/ui.mjs`,'utf8'),/<button[^>]+id="[sro]-confirm"[^>]*hidden/);
assert.ok(app.includes('Controles da curva'));
console.log('PASS latest wrappers: hints PACTO-only, automatic game confirmation visibility retained, actual Corte curve tabs preserved.');
