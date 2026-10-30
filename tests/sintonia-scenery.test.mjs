import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {sceneryIcon} from '../dist/sintonia/scenery.mjs';

const base='4de1ab60c51d3a9bd3372a953de716498e51e032';
const root=new URL('..',import.meta.url);
const prior=path=>execFileSync('git',['show',`${base}:${path}`],{cwd:root,maxBuffer:40e6});
const now=path=>readFileSync(new URL(path,root));
test('all eleven scenery icons are decorative, self-contained, and consistently framed',()=>{
 for(const name of ['box','key','switch','switchOn','selector','deliveryIn','deliveryOut','up','right','down','left']){
  const svg=sceneryIcon(name);
  assert.match(svg,/^<svg class="s-scenery-icon" viewBox="0 0 32 32"/);
  assert.match(svg,/aria-hidden="true" focusable="false"/);
  assert.ok(svg.endsWith('</svg>'));
  assert.ok(!/\b(?:href|onclick|script)\b/.test(svg));
 }
 assert.notEqual(sceneryIcon('switch'),sceneryIcon('switchOn'));
 assert.notEqual(sceneryIcon('deliveryIn'),sceneryIcon('deliveryOut'));
 assert.throws(()=>sceneryIcon('__proto__'));
});
test('animal rendering and all pre-existing SINTONIA mechanics, levels, assets and persistence remain byte-identical',()=>{
 const old=prior('dist/sintonia/ui.mjs').toString(),current=now('dist/sintonia/ui.mjs').toString();
 const sprite=s=>s.slice(s.indexOf('  function spriteMarkup(board)'),s.indexOf('  function renderBoards()'));
 assert.ok(sprite(old).length>100);assert.equal(sprite(current),sprite(old));
 const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist/sintonia'],{cwd:root,encoding:'utf8'}).trim().split('\n');
 for(const path of paths.filter(path=>path!=='dist/sintonia/ui.mjs'))assert.ok(now(path).equals(prior(path)),path);
});
test('scenery CSS stays within SINTONIA and does not change animal styling',()=>{
 const css=now('dist/sintonia/scenery.css').toString();
 assert.ok(!/s-animal-(?:sprite|placeholder)/.test(css));
 for(const selector of css.replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/(?:^|\})([^{}]+)\{/g)){
  const text=selector[1].trim();if(text.startsWith('@media'))continue;
  assert.ok(text.split(',').every(s=>s.trim().startsWith('#sintonia ')),text);
 }
});
