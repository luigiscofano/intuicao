import {restoreOriginalLogoHTML} from './original-logo-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root} from './direct-ui-harness.mjs';
let html=restoreOriginalLogoHTML(fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8'));
// Normalize the later explicitly requested title/brand revision for this historical test.
const identityChanges=JSON.parse(fs.readFileSync(new URL('./curiosity-brand-authorized-changes.json',import.meta.url)));
for(const {before,after} of identityChanges.html_changes) html=html.replace(after,before);
const changes=JSON.parse(fs.readFileSync(new URL('./home-copy-authorized-changes.json',import.meta.url))).changes;
for(const {before,after} of changes){
 assert.ok(!html.includes(before),'Removed copy is absent');
 assert.equal(html.split(after).length-1,1,'Each authorized replacement occurs once');
}
root.innerHTML=html;
const intro=root.querySelector('.intro');
assert.equal(intro.querySelectorAll('p').length,1,'One introductory phrase');
assert.equal(intro.querySelectorAll('.eyebrow').length,0,'Only targeted eyebrow removed');
assert.equal(intro.querySelectorAll('h1').length,1);
assert.ok(html.includes('<h1>Antes da fórmula,<br>vem a <em>curiosidade.</em></h1>'));
assert.ok(html.includes('<footer><span>intuição. <small>feito para explorar</small></span></footer>'));
assert.ok(root.querySelector('.doc-link'));
assert.equal(root.querySelectorAll('.eyebrow').length,2,'Game and selection labels preserved');
const ids=root.nodes.filter(n=>n.id).map(n=>n.id);
assert.equal(new Set(ids).size,ids.length,'No duplicate IDs');
for(const n of root.nodes){
 for(const key of ['aria-labelledby','aria-describedby','aria-controls','for']){
  for(const id of (n.attrs[key]??'').split(/\s+/).filter(Boolean)) assert.ok(ids.includes(id),`${key} target exists: ${id}`);
 }
 if(n.attrs.href?.startsWith('#')) assert.ok(ids.includes(n.attrs.href.slice(1)),'Fragment target exists');
}
console.log('PASS home copy: exact scoped removals and one new phrase; title, footer brand and docs preserved; parsed DOM has no duplicate or broken ID references. Deterministic DOM harness, not native browser QA.');
