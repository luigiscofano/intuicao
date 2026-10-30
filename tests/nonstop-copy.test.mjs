import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const root=new URL('..',import.meta.url),base='e87c0e1825b4c8611bdf1ee2de43da303cc5607c';
const files=['endless-collection.mjs','endless-original.mjs','collection-ui.mjs','game-info-content.mjs','app.mjs','orbita/ui.mjs','sintonia/ui.mjs','repasse/ui.mjs'];
const rename=s=>s.replace(/\b(?:Endless|ENDLESS|endlesss)\b/g,'Modo Sem Parar').replaceAll('o modo Modo Sem Parar','o Modo Sem Parar').replace('`} · ${esc(level.id)}</p>',"`}${endless?'':` · ${esc(level.id)}`}</p>").replace('esc(level.difficulty)',"esc(String(level.difficulty).replace(/\\bendlesss?\\b/gi,'Modo Sem Parar'))");
test('runtime rename is exactly user-facing copy, preserving identifiers, storage keys and logic',()=>{
 for(const file of files){const prior=execFileSync('git',['show',`${base}:dist/${file}`],{cwd:root,encoding:'utf8',maxBuffer:20e6}),now=readFileSync(new URL('dist/'+file,root),'utf8');assert.equal(now,rename(prior),file);assert.ok(!/\b(?:Endless|ENDLESS|endlesss)\b/.test(now),file);}
});
test('all mode families and descriptive help use the requested exact label',()=>{
 for(const file of ['app.mjs','collection-ui.mjs','orbita/ui.mjs','sintonia/ui.mjs','repasse/ui.mjs','game-info-content.mjs']){const text=readFileSync(new URL('dist/'+file,root),'utf8');assert.ok(text.includes('Modo Sem Parar'),file);}
});
