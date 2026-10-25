import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {resultMarkup} from '../dist/result-motion.mjs';
import {selectionSelector} from '../dist/game-nav-scroll.mjs';

// Acceptance boundary for this addition, against the source version opened for
// the task. Existing puzzle data, physics, assets, global CSS and storage code
// are byte-identical; only these common routing/presentation extensions change.
const base='a5ba1d89711d16082c4f10a682277f2dc51055a0';
const read=file=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
const before=file=>execFileSync('git',['show',`${base}:${file}`],{encoding:'utf8'});
const allowed=new Set(['dist/app.mjs','dist/index.html','dist/game-info.mjs','dist/game-info-content.mjs','dist/game-nav-scroll.mjs','dist/result-motion.mjs']);
const priorFiles=new Set(execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n'));
const changes=execFileSync('git',['diff','--name-only',base,'--','dist'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const file of changes)if(priorFiles.has(file))assert.ok(allowed.has(file),'Unrelated existing file changed: '+file);
console.log('PASS existing game engines, catalogs, assets, global styles and storage modules preserved');

let html=read('dist/index.html');
html=html.replace('<link rel="stylesheet" href="sintonia/ui.css">','')
  .replace('<button data-sintonia="sintonia" aria-pressed="false"><span>07</span> SINTONIA <small>um comando, vários caminhos</small></button>','')
  .replace('<section id="sintonia" hidden aria-label="SINTONIA — coordenação de caminhos"></section>','');
assert.equal(html,before('dist/index.html'));
console.log('PASS page structure changed only by the seventh game entry, scoped stylesheet and host');

const appBefore=before('dist/app.mjs');
const originalCallback=appBefore.match(/const collection=initCollection\(\{hideOriginal\(\)\{([^\n]+)\}\}\);/)[1];
let app=read('dist/app.mjs');
assert.ok(app.includes(`function hideOriginalForSibling(){${originalCallback}}`));
app=app.replace("import {createSintoniaRoute} from './sintonia/route.mjs';\n",'')
  .replace('return;sintonia.hide();saveEndless();collection.hide();','return;saveEndless();collection.hide();')
  .replace(`function hideOriginalForSibling(){${originalCallback}}\nconst collection=initCollection({hideOriginal(){sintonia.hide();hideOriginalForSibling();}});\nconst sintonia=createSintoniaRoute({hideOtherGames(){collection.hide();hideOriginalForSibling();}});\nsintonia.restoreOnLoad();`, `const collection=initCollection({hideOriginal(){${originalCallback}}});`);
assert.equal(app,appBefore);
console.log('PASS existing application logic is unchanged beyond routing into and out of SINTONIA');

const baseInfo=await import('data:text/javascript;base64,'+Buffer.from(before('dist/game-info-content.mjs')).toString('base64'));
for(const [game,value] of Object.entries(baseInfo.GAME_INFO))assert.deepEqual(GAME_INFO[game],value);
assert.equal(Object.keys(GAME_INFO).length,7);
assert.ok(GAME_INFO.sintonia.rules.some(rule=>rule.includes('Chegar antes não prende')));
const baseMotion=await import('data:text/javascript;base64,'+Buffer.from(before('dist/result-motion.mjs')).toString('base64'));
for(const game of Object.keys(baseInfo.GAME_INFO))for(const success of [true,false])assert.equal(resultMarkup(game,success),baseMotion.resultMarkup(game,success));
assert.match(resultMarkup('sintonia',true),/Todos encontraram seu lugar/);
assert.equal(selectionSelector({dataset:{sintonia:'sintonia'}}),'#sintonia > .level-screen');
assert.equal(selectionSelector({dataset:{sintonia:'sintonia',infoGame:'sintonia'}}),null);
console.log('PASS original help and celebrations preserved; SINTONIA extends both and the selection scroll');
