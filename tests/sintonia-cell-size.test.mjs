import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const root=new URL('..',import.meta.url),read=path=>readFileSync(new URL('dist/'+path,root),'utf8');
const css=read('sintonia/scenery.css'),base=read('sintonia/ui.css');
test('cell size caps increase modestly without changing proportional viewport bounds',()=>{
 for(const [selector,before,after] of [['.s-boards',60,75],['.s-boards[data-count="3"]',56,70],['.s-boards[data-count="4"]',50,62.5]]){
  assert.ok(css.includes(`#sintonia ${selector}{--s-cell-max:${after}px`));
  assert.ok(after/before===1.25);
 }
 assert.ok(css.includes('#sintonia .s-animal-board{max-width:475px}'));
 assert.ok(css.includes('max-width:min(1150px,calc('));
 assert.ok(base.includes('--s-map-width:min(calc(var(--cols) * var(--s-cell-max) + 4px),calc((100% - 4px) * var(--cols) / var(--s-max-cols) + 4px))'));
 // The preserved formula never exceeds available column width for any supported map.
 for(const available of [70,90,120,160,200,280,380])for(let maxCols=1;maxCols<=8;maxCols++)for(let cols=1;cols<=maxCols;cols++)for(const cap of [75,70,62.5]){
  const width=Math.min(cols*cap+4,(available-4)*cols/maxCols+4);
  assert.ok(width<=available+1e-9);
 }
});
test('sizing update leaves original layout, sprites, gameplay and all campaign definitions untouched',()=>{
 const baseline='9c6604d444df6beb435ea024eb573e4380e7748f';
 const paths=execFileSync('git',['ls-tree','-r','--name-only',baseline,'dist/sintonia'],{cwd:root,encoding:'utf8'}).trim().split('\n');
 for(const path of paths.filter(path=>path!=='dist/sintonia/scenery.css')){
  let before=execFileSync('git',['show',`${baseline}:${path}`],{cwd:root,maxBuffer:40e6});
  if(path==='dist/sintonia/ui.mjs')before=Buffer.from(before.toString().replace(/\b(?:Endless|ENDLESS|endlesss)\b/g,'Modo Sem Parar').replaceAll('o modo Modo Sem Parar','o Modo Sem Parar'));
  assert.equal(readFileSync(new URL(path,root),'utf8').replace('.s-animal-sprite{display:block;position:absolute;inset:0;', '.s-animal-sprite{display:block;position:absolute;inset:-10%;'),before.toString(),path);
 }
});
