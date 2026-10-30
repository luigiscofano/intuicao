import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='e87c0e1825b4c8611bdf1ee2de43da303cc5607c',root=new URL('..',import.meta.url);
test('only sprite container inset changes; exact atlas, cell caps, rendering and mechanics preserved',()=>{
 const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist/sintonia'],{cwd:root,encoding:'utf8'}).trim().split('\n');
 for(const path of paths){
  let before=execFileSync('git',['show',`${base}:${path}`],{cwd:root,maxBuffer:40e6});
  if(path==='dist/sintonia/ui.mjs')before=Buffer.from(before.toString().replace(/\b(?:Endless|ENDLESS|endlesss)\b/g,'Modo Sem Parar').replaceAll('o modo Modo Sem Parar','o Modo Sem Parar'));
  const after=readFileSync(new URL(path,root));
  if(path==='dist/sintonia/ui.css')assert.equal(after.toString(),before.toString().replace('.s-animal-sprite{display:block;position:absolute;inset:-10%;','.s-animal-sprite{display:block;position:absolute;inset:0;'));
  else assert.ok(after.equals(before),path);
 }
 assert.equal(100/120,5/6); // 16.7% smaller side length, centered within the cell.
});
