import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';

// Content-only redesign baseline: the full nine-game site immediately before
// this change. The original Sintonia-addition integration audit targeted an
// earlier seven-game site and is retained separately as historical evidence.
const baseline='a9f4bd4d58218f474a5eba3cd54700ff6b1b134b';
const root=process.env.SINTONIA_TEST_ROOT||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const git=(...args)=>execFileSync('git',args,{cwd:root,maxBuffer:128*1024*1024});
const read=p=>fs.readFileSync(path.join(root,p));
const before=p=>git('show',`${baseline}:${p}`);
const load=p=>import(pathToFileURL(path.join(root,p)));
const boundedChanges=new Set([
 'dist/sintonia/campaign.mjs',
 'dist/sintonia/generator.mjs',
 'dist/sintonia/fallback.mjs',
 // Save migration and restart safety; not a license to alter rendering.
 'dist/sintonia/ui.mjs',
 'dist/sintonia/service.mjs',
 // Exact prior definitions retained for in-progress campaign compatibility.
 'dist/sintonia/campaign-v1.mjs',
 'dist/sintonia/purpose.mjs',
 'dist/sintonia/box-design.mjs',
 'dist/sintonia/delivery-design.mjs',
 'dist/sintonia/obstacle-design.mjs',
]);
const baselineFiles=git('ls-tree','-r','--name-only',baseline,'--','dist').toString().trim().split('\n').filter(Boolean);

test('redesign preserves every engine, asset, stylesheet and unrelated source byte',()=>{
 for(const file of baselineFiles){
  if(boundedChanges.has(file))continue;
  assert.ok(read(file).equals(before(file)),`Outside the content/migration boundary: ${file}`);
 }
});

test('changed and new deployed files are explicitly bounded Sintonia modules',()=>{
 const changed=git('diff','--name-only',baseline,'--','dist').toString().trim().split('\n').filter(Boolean);
 const untracked=git('ls-files','--others','--exclude-standard','--','dist').toString().trim().split('\n').filter(Boolean);
 for(const file of [...changed,...untracked])assert.ok(boundedChanges.has(file),`Unexpected deployed file: ${file}`);
});

test('Sintonia map artwork, edge rendering and board layout code remain identical',()=>{
 const original=before('dist/sintonia/ui.mjs').toString(),current=read('dist/sintonia/ui.mjs').toString();
 // Existing retry button must ask before discarding a retained old-map attempt;
 // the exact callback change is behavior-only and leaves its markup untouched.
 const renderComparable=current.replace("motion=createResultMotion($('s-motion'),$('s-board-surface'),globalThis,{onRetry:()=>{\n      if(mode==='campaign'&&isRetainedSintoniaAttempt(level,CAMPAIGN[index]))restartLevel($('s-motion').querySelector('[data-result-retry]'));\n      else restartCurrentImmediately();\n    }});", "motion=createResultMotion($('s-motion'),$('s-board-surface'),globalThis,{onRetry:restartCurrentImmediately});");
 const fragment=(source,from,to)=>{
  const start=source.indexOf(from),end=source.indexOf(to,start);
  assert.ok(start>=0&&end>start,`Rendering boundary missing: ${from}`);
  return source.slice(start,end);
 };
 for(const [from,to] of [
  ['function relationModel(level)','export function initSintonia'],
  ['  function spriteMarkup(board)','  function renderStatus()'],
  ['  function render(unknown=[])','  function endlessControls()'],
 ])assert.equal(fragment(renderComparable,from,to),fragment(original,from,to),from);
 // The plan explicitly requires an informed old-map continuation notice. This
 // exact text-only addition is allowed; no other status markup may change.
 const restoredStatus=fragment(current,'  function renderStatus()','  function keyboard(event)')
  .replace("    const retainedNotice=mode==='campaign'&&isRetainedSintoniaAttempt(level,CAMPAIGN[index])?'Partida preservada no mapa anterior. Reiniciar permite começar o mapa atualizado sem perder suas conclusões. ':'';\n",'')
  .replace("$('s-status').textContent=retainedNotice+message", "$('s-status').textContent=message");
 assert.equal(restoredStatus,fragment(original,'  function renderStatus()','  function keyboard(event)'));
});

test('all nine existing navigation entries and shared routing are unchanged',async()=>{
 const html=read('dist/index.html').toString();
 assert.equal((html.match(/<button data-(?:game|collection|sintonia|repasse|orbita)=/g)||[]).length,9);
 for(const file of ['dist/index.html','dist/app.mjs','dist/game-nav-scroll.mjs','dist/sintonia/route.mjs'])assert.ok(read(file).equals(before(file)),file);
 const {selectionSelector}=await load('dist/game-nav-scroll.mjs');
 for(const [dataset,selector] of [
  [{game:'light'},'#selection'],[{game:'cut'},'#selection'],
  ...['elo','prumo','pacto','desvio'].map(collection=>[{collection},'#collection > .level-screen']),
  ...['sintonia','repasse','orbita'].map(game=>[{[game]:game},`#${game} > .level-screen`]),
 ]){assert.equal(selectionSelector({dataset}),selector);assert.equal(selectionSelector({dataset:{...dataset,infoGame:'ignored'}}),null);}
 const app=read('dist/app.mjs').toString();
 assert.match(app,/const sintonia=createSintoniaRoute\(\{hideOtherGames\(\)\{orbita\.hide\(\);repasse\.hide\(\);collection\.hide\(\);hideOriginalForSibling\(\);\}\}\);/);
 assert.match(app,/if\(!orbita\.restoreOnLoad\(\)&&!repasse\.restoreOnLoad\(\)\)sintonia\.restoreOnLoad\(\);/);
});

test('all nine help records and celebrations remain byte-for-byte and behaviorally intact',async()=>{
 const {GAME_INFO}=await load('dist/game-info-content.mjs'),{resultMarkup}=await load('dist/result-motion.mjs');
 const prevInfo=await import('data:text/javascript;base64,'+before('dist/game-info-content.mjs').toString('base64'));
 const prevMotion=await import('data:text/javascript;base64,'+before('dist/result-motion.mjs').toString('base64'));
 assert.equal(Object.keys(GAME_INFO).length,9);assert.deepEqual(GAME_INFO,prevInfo.GAME_INFO);
 for(const game of Object.keys(GAME_INFO))for(const win of [true,false])for(const opts of [{},{retry:true},{winner:1}])assert.equal(resultMarkup(game,win,opts),prevMotion.resultMarkup(game,win,opts));
});

test('rules version remains one and historical campaign definitions are not rewritten',async()=>{
 const {RULES_VERSION}=await load('dist/sintonia/engine.mjs');assert.equal(RULES_VERSION,1);
 assert.ok(read('dist/sintonia/engine.mjs').equals(before('dist/sintonia/engine.mjs')));
 if(fs.existsSync(path.join(root,'dist/sintonia/campaign-v1.mjs'))){
  const old=await load('dist/sintonia/campaign-v1.mjs');
  // Compare level data, not a re-export/header that may need a relative path.
  const src=before('dist/sintonia/campaign.mjs').toString().replace(/^export \{CHAPTERS, DIFFICULTIES\} from '\.\/generator\.mjs';\s*$/m,'');
  const original=await import('data:text/javascript;base64,'+Buffer.from(src).toString('base64'));
  const archived=old.CAMPAIGN||old.LEGACY_CAMPAIGN||old.CAMPAIGN_V1;
  assert.ok(archived,'The historical module must export its 500 definitions');
  assert.deepEqual(archived,original.CAMPAIGN);
 }
});
