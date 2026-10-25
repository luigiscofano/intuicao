import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {restoreJSONImportFile} from './json-import-history.mjs';
import {validateOriginalLevel,originalJSONExample} from '../dist/original-json.mjs';
import {validateCollectionJSON,COLLECTION_JSON_EXAMPLES} from '../dist/collection-json.mjs';
const m=JSON.parse(fs.readFileSync(new URL('./json-import-authorized-change.json',import.meta.url)));
const read=file=>fs.readFileSync(new URL('../dist/'+file,import.meta.url));
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.deepEqual(Object.keys(m.files).sort(),['app.mjs','collection-ui.mjs','index.html','style.css']);
for(const [name,entry]of Object.entries(m.files)){
 const current=read(name),prior=execFileSync('git',['show',`${m.baseCommit}:dist/${name}`],{cwd:new URL('..',import.meta.url)});
 assert.equal(sha(current),entry.afterSha256,'Exact authorized new source: '+name);
 assert.equal(sha(prior),entry.beforeSha256,'Published baseline unchanged: '+name);
 assert.deepEqual(restoreJSONImportFile(name,current),prior,'Only exact authorized edits: '+name);
 assert.deepEqual(restoreJSONImportFile('dist/'+name,current),prior);
 assert.deepEqual(restoreJSONImportFile(name,prior),prior,'Older layer is idempotent');
 let rebuilt=prior.toString();for(const block of entry.blocks){assert.equal(rebuilt.split(block.before).length-1,1);rebuilt=rebuilt.replace(block.before,block.after);}assert.equal(rebuilt,current.toString());
 for(const invalid of [current.toString()+' ',current.toString().replace(entry.blocks[0].after,entry.blocks[0].after+'\n/* foreign */')])assert.notEqual(sha(restoreJSONImportFile(name,invalid)),entry.beforeSha256,'Unknown change cannot masquerade as baseline');
}
for(const [name,hash] of Object.entries(m.newFilesSha256))assert.equal(sha(read(name)),hash,'Exact new import artifact: '+name);
for(const game of ['light','cut','elo','prumo','pacto','desvio']){
 const text=read(`json-examples/${game}.json`).toString(),value=JSON.parse(text);
 assert.deepEqual(value,['light','cut'].includes(game)?originalJSONExample(game):COLLECTION_JSON_EXAMPLES[game]);
 const result=['light','cut'].includes(game)?validateOriginalLevel(value,game):await validateCollectionJSON(text,game);assert.ok(result);
}
const doc=read('IMPORTAR-NIVEIS-JSON.md').toString();for(const game of ['light','cut','elo','prumo','pacto','desvio'])assert.ok(doc.includes(`json-examples/${game}.json`));assert.match(doc,/inconclusiva/);assert.match(doc,/7 × 7/);assert.match(doc,/80 edições/);
console.log('PASS exact JSON/UI layer, preserved published baseline, tamper rejection and all six documented playable examples.');
