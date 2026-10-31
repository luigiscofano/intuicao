import test from'node:test';import assert from'node:assert/strict';import{execFileSync}from'node:child_process';import{readFileSync}from'node:fs';
import{RULE_EXAMPLES}from'../dist/rules-examples.mjs';import{GAME_INFO}from'../dist/game-info-content.mjs';import{GAME_NAV_ICONS}from'../dist/game-nav-icons.mjs';
const base='083b8bc37b88f80b609ea2f33983b63d5ded113e',git=args=>execFileSync('git',args,{encoding:'utf8'});
test('VÉRTICE preserves prior modules except additive registration and later authorized TRAMA cosmetic UI',()=>{
 const allowed=new Set(['app.mjs','category-navigation.mjs','game-info-content.mjs','game-info.css','game-info.mjs','game-nav-icons.mjs','game-nav-scroll.mjs','index.html','platform.css','rules-examples.css','rules-examples.mjs','rules-preview.mjs','trama/ui.mjs','trama/ui.css'].map(n=>'dist/'+n));
 const files=git(['ls-tree','-r',base,'--','dist']).trim().split('\n');let count=0;
 for(const entry of files){const[meta,path]=entry.split('\t');if(allowed.has(path))continue;assert.equal(git(['hash-object','--',path]).trim(),meta.split(' ')[2],path);count++;}assert.ok(count>100);
});
test('All twelve prior content records and instructional SVGs are identical',async()=>{
 for(const[file,key,next]of[['rules-examples.mjs','RULE_EXAMPLES',RULE_EXAMPLES],['game-info-content.mjs','GAME_INFO',GAME_INFO],['game-nav-icons.mjs','GAME_NAV_ICONS',GAME_NAV_ICONS]]){const raw=git(['show',base+':dist/'+file]);const prev=(await import('data:text/javascript;base64,'+Buffer.from(raw).toString('base64')))[key];assert.equal(Object.keys(prev).length,12);for(const name in prev)assert.deepEqual(next[name],prev[name],name);}
 const css=readFileSync('dist/platform.css','utf8');assert.equal(css.replaceAll(', #vertice > .level-screen','').replaceAll(', #vertice:not([hidden]) > .level-screen',''),git(['show',base+':dist/platform.css']));
});
