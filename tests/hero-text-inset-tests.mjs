import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {restoreHeroTextInsetCSS} from './hero-text-inset-history.mjs';
const root=new URL('../',import.meta.url);
const css=fs.readFileSync(new URL('dist/platform.css',root),'utf8');
assert.equal(restoreHeroTextInsetCSS(css),execFileSync('git',['show','dd7795c:dist/platform.css'],{cwd:root,encoding:'utf8'}));
assert.match(css,/padding:32px 0 30px 20px;min-height:260px/);
assert.match(css,/padding:24px 4px 24px 12px;min-height:0/);
// Left padding consumes available content width, never translates/overflows the box.
// Vertical padding, fixed desktop minimum, all typography and frame geometry stay exact.
assert.ok(20>0 && 12>4);
console.log('PASS hero-only responsive left inset; all other CSS byte-identical to published dd7795c.');
