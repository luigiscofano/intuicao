import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Element} from './direct-ui-harness.mjs';
import {restoreIngameFlowerCSS} from './ingame-flower-history.mjs';
import {restoreStemlessFlowerCSS} from './stemless-flower-history.mjs';
import {restoreWhiteFlowerCSS} from './white-flower-history.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=JSON.parse(read('tests/ingame-flower-authorized-change.json'));
const stemless=JSON.parse(read('tests/stemless-flower-authorized-change.json'));
const white=JSON.parse(read('tests/white-flower-authorized-change.json'));
const css=read('dist/platform.css').toString(),old=restoreIngameFlowerCSS(css);
assert.equal(sha(css),m.afterCssSHA256);
assert.equal(m.priorCssSHA256,stemless.afterCssSHA256,'Previous stemless authorization is not rebased');
assert.equal(sha(old),stemless.afterCssSHA256);
assert.equal(restoreIngameFlowerCSS(old),old,'Exact preceding layer remains idempotent');
assert.equal(sha(restoreStemlessFlowerCSS(css)),stemless.priorCssSHA256,'New layer restores through strict stemless history');
assert.equal(sha(restoreWhiteFlowerCSS(css)),white.priorCssSHA256,'Older white-flower history remains exact');
assert.equal(m.replacements.length,2,'Only the active button anchor and pseudo-element scope change');
const [anchor,flower]=m.replacements;
const active='#main > .games > button[aria-pressed=true]';
const guard=':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab))) ';
assert.equal(anchor.before.split('{')[0],active);
assert.equal(anchor.after,anchor.before.replace('{','{position:relative;'),'Only containing block is added to the existing active-button rule');
assert.equal(flower.before,stemless.replacements[0].after,'The previous stemless flower, not a recreated asset');
assert.equal(flower.before,guard+flower.after,'Only the menu visibility guard is removed');
assert.equal(flower.after.split('{')[0],active+'::after');
let expected=old;
for(const {before,after} of m.replacements){
 assert.equal(old.split(before).length-1,1);
 assert.equal(css.split(after).length-1,1);
 expected=expected.replace(before,after);
}
assert.equal(css,expected,'Two exact replacements and no other platform CSS mutations');
assert.equal(flower.after.slice(flower.after.indexOf('{')),flower.before.slice(flower.before.indexOf('{')),'Every flower declaration is identical');
assert.match(flower.after,/content:"";position:absolute;top:-13px;right:10px;width:32px;height:32px/);
assert.ok(flower.after.includes(stemless.maskDeclaration),'Stem exclusion mask unchanged');
assert.match(flower.after,/background:url\("platform-assets\/flower-white-original.png"\) center\/contain no-repeat/);
assert.match(flower.after,/filter:drop-shadow\(\.5px 0 0 #617b50\) drop-shadow\(-\.5px 0 0 #617b50\) drop-shadow\(0 \.5px 0 #617b50\) drop-shadow\(0 -\.5px 0 #617b50\);pointer-events:none;user-select:none/);
assert.equal((css.match(/button[^{}]*::after\{/g)||[]).length,1,'No new marker on inactive buttons or game controls');
assert.doesNotMatch(anchor.after.replace(anchor.before.replace('{',''),''),/padding:|margin:|width:|height:|transform:|filter:|overflow:/,'Positioning anchor does not change flow metrics');
for(const asset of m.assets){
 assert.deepEqual(asset,stemless.assets.find(a=>a.file===asset.file));
 assert.equal(sha(read('dist/'+asset.file)),asset.sha256,'Original flower PNGs remain byte-identical');
}

// Strict child-chain selector model, not a browser/layout substitute. Its tokens
// come from the exact production selector above; unsupported syntax fails closed.
const matchCompound=(node,token)=>{
 if(!node)return false;
 if(/^#[\w-]+$/.test(token))return node.id===token.slice(1);
 if(/^\.[\w-]+$/.test(token))return (node.attrs.class??'').split(/\s+/).includes(token.slice(1));
 const attr=token.match(/^([a-z]+)\[([\w-]+)=([\w-]+)\]$/);
 assert.ok(attr,'Only the tested tag/attribute compound is supported: '+token);
 return node.tag===attr[1]&&node.attrs[attr[2]]===attr[3];
};
const tokens=flower.after.split('{')[0].replace(/::after$/,'').split(' > ');
const matches=node=>{for(let i=tokens.length-1;i>=0;i--){if(!matchCompound(node,tokens[i]))return false;node=node.parentElement;}return true;};
const html=read('dist/index.html').toString();
const navigation=html.match(/<nav class="games"[^>]*>[\s\S]*?<\/nav>/)?.[0];
assert.ok(navigation);
const games=['light','cut','elo','prumo','pacto','desvio'];
let cases=0;
for(const game of games)for(const mode of ['selection','game','free','editor']){
 const original=['light','cut'].includes(game),fixture=new Element('body');
 const stage=mode==='selection'?'<section id="selection"></section><section class="lab" hidden></section><div id="collection" hidden></div>':original?`<section class="lab" data-mode="${mode}"><button aria-pressed="true">Active game control</button></section><div id="collection" hidden></div>`:`<section class="lab" hidden></section><div id="collection"><div class="collection-lab" data-mode="${mode}"><button aria-pressed="true">Active game control</button></div></div>`;
 fixture.innerHTML=`<main id="main">${navigation}${stage}<div class="games"><div><button aria-pressed="true">Nested impostor</button></div></div></main><aside class="games"><button aria-pressed="true">Unrelated active button</button></aside>`;
 const nav=fixture.querySelector('nav'),buttons=nav.nodes.filter(n=>n.tag==='button');
 assert.deepEqual(buttons.map(n=>n.dataset.game??n.dataset.collection),games,'Actual navigation contains all six games');
 for(const button of buttons)button.setAttribute('aria-pressed',String((button.dataset.game??button.dataset.collection)===game));
 const marked=fixture.nodes.filter(matches);
 assert.equal(marked.length,1,game+' '+mode+' marks exactly one active navigation button');
 assert.equal(marked[0].dataset.game??marked[0].dataset.collection,game);
 for(const inactive of buttons.filter(n=>n.attrs['aria-pressed']==='false'))assert.equal(matches(inactive),false);
 // The pseudo-element shares precisely the active button selector with its anchor.
 assert.equal(anchor.after.split('{')[0],tokens.join(' > '));
 marked[0].setAttribute('aria-pressed','false');
 assert.equal(fixture.nodes.filter(matches).length,0,'No active selection means no flower');
 cases++;
}
assert.equal(cases,24);
for(const invalid of [
 css+' ',old+' ',css+flower.after,
 css.replace(anchor.after,anchor.before),css.replace(flower.after,flower.before),
 css.replace(flower.after,flower.after.replace('[aria-pressed=true]','[aria-pressed=false]')),
 css.replace(flower.after,flower.after.replace('#main > .games > button','.games button')),
 css.replace(flower.after,flower.after.replace('top:-13px','top:-12px')),
 css.replace(flower.after,flower.after.replace('width:32px','width:33px')),
 css.replace(flower.after,flower.after.replace('pointer-events:none','pointer-events:auto')),
 css.replace(flower.after,flower.after.replace('drop-shadow(.5px 0 0','drop-shadow(.5px 0 1px')),
 css.replace(flower.after,flower.after.replace('mask-size:100% 100%','mask-size:90% 100%')),
 css.replace(flower.after,flower.after.replace('flower-white-original.png','flower-green-original.png'))
]){
 assert.throws(()=>restoreIngameFlowerCSS(invalid),'Unknown mutations fail closed at the new layer');
 assert.throws(()=>restoreStemlessFlowerCSS(invalid),'Unknown mutations fail closed through the old chain');
}
console.log('PASS exact in-game flower scope and relative anchor; 24 logical selector fixtures across six games and selection/game/free/editor; no inactive/internal markers; unchanged dimensions/mask/assets/contour/pointer behavior; strict historical restoration. Native browser/pixel QA remains separate.');
