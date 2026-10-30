import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const root=new URL('..',import.meta.url),base='b4c3d1f3d8393eeccaa3b7021c1b7e5fa3cc2d07';
test('three automatic-completion games change only confirm button visibility, not behavior',()=>{
 for(const [game,p] of [['sintonia','s'],['repasse','r'],['orbita','o']]){
  const path=`dist/${game}/ui.mjs`,before=execFileSync('git',['show',`${base}:${path}`],{cwd:root,encoding:'utf8'}),after=readFileSync(new URL(path,root),'utf8');
  assert.equal(after.replace(new RegExp(`(<button id="${p}-confirm"[^>]*?) hidden`),'$1'),before,path);
 }
});
test('only PACTO exposes the hint button and follow-up application; rules and intrinsic clues unaffected',()=>{
 const css=readFileSync(new URL('dist/standard-controls.css',root),'utf8');
 const block=css.slice(css.indexOf('/* Dicas is available only')).replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,'');
 assert.equal(block,'#hint,#s-hint,#r-hint,#o-hint,#s-hint-apply,#r-hint-apply,#o-hint-apply,body:not(:has(.games>[data-collection="pacto"][aria-pressed="true"]))#c-hint,body:not(:has(.games>[data-collection="pacto"][aria-pressed="true"]))#c-hint-apply{display:none!important}');
 assert.ok(!block.includes('rules'));assert.ok(!block.includes('clue'));assert.ok(!block.includes('board'));
});
