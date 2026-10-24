import assert from 'node:assert/strict';
import fs from 'node:fs';
import {restoreTrunkShadowCSS} from './trunk-shadow-history.mjs';
const css=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8');
restoreTrunkShadowCSS(css);
assert.equal(css.split('filter:drop-shadow(0 2px 4px #34452a12)').length-1,1);
assert.match(css,/:is\(#selection, #collection > \.level-screen\)\{[^}]*filter:drop-shadow\(0 2px 4px #34452a12\)/);
assert.match(css,/:is\(#selection, #collection > \.level-screen\)::after\{[^}]*continuous-root-left\.svg[^}]*continuous-root-right\.svg/);
// One composited alpha silhouette includes its curved ::after, avoiding joint double-shadows.
// No filter is applied to the separate leaf layer, hero, or game roots.
console.log('PASS one subtle selection silhouette shadow including curved roots; all other CSS exact.');
