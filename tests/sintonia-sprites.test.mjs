import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {USER_SPRITE_CHANGE,assertAuthorizedUserSpriteFiles,sha256} from './sintonia-sprites-history.mjs';

const root=process.env.SINTONIA_TEST_ROOT||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file));
const git=(...args)=>execFileSync('git',args,{cwd:root,maxBuffer:128*1024*1024});
const before=file=>git('show',`${USER_SPRITE_CHANGE.baseline}:${file}`);
const assetsPath='dist/sintonia/assets/chibi-user-atlas.svg';
const svg=read(assetsPath).toString();
const provenance=JSON.parse(read('docs/sintonia-sprites/asset-provenance.json'));
const animalFrames={tuiuiu:0,capivara:1,bemtevi:2,mico:3};
const paths=[...svg.matchAll(/<path data-animal="([a-z]+)" d="([^"]+)"\/>/g)];
const rectangles=Object.fromEntries(paths.map(([,animal,d])=>[animal,[...d.matchAll(/M(\d+) (\d+)h(\d+)v(\d+)h-(\d+)z/g)].map(([,x,y,w,h,back])=>{assert.equal(w,back);return [+x,+y,+w,+h];})]));
const visible=(animal,x,y)=>rectangles[animal].some(([left,top,width,height])=>x>=left&&x<left+width&&y>=top&&y<top+height);

test('sprite-only authorization leaves all 216 other deployed baseline files byte-for-byte unchanged',()=>{
 assertAuthorizedUserSpriteFiles();
 const files=git('ls-tree','-r','--name-only',USER_SPRITE_CHANGE.baseline,'--','dist').toString().trim().split('\n').filter(Boolean);
 assert.equal(files.length,217,'Frozen deployed source baseline');
 for(const file of files){
  if(file===USER_SPRITE_CHANGE.module)continue;
  assert.ok(read(file).equals(before(file)),`Sprite-only replacement cannot change: ${file}`);
 }
 const allowed=new Set([USER_SPRITE_CHANGE.module,...USER_SPRITE_CHANGE.newAssets.map(asset=>asset.path)]);
 const changed=git('diff','--name-only',USER_SPRITE_CHANGE.baseline,'--','dist').toString().trim().split('\n').filter(Boolean);
 const untracked=git('ls-files','--others','--exclude-standard','--','dist').toString().trim().split('\n').filter(Boolean);
 assert.deepEqual([...new Set([...changed,...untracked])].sort(),[...allowed].sort());
});

test('campaigns, rules, progress persistence, maps, layout, and the other eight games are untouched',()=>{
 for(const file of ['campaign.mjs','campaign-v1.mjs','engine.mjs','service.mjs','generator.mjs','fallback.mjs','ui.mjs','ui.css','route.mjs']){
  const name=`dist/sintonia/${file}`;assert.ok(read(name).equals(before(name)),name);
 }
 for(const name of ['dist/app.mjs','dist/index.html','dist/platform.css','dist/game-info-content.mjs','dist/result-motion.mjs'])assert.ok(read(name).equals(before(name)),name);
});

test('the exact uploaded PNG is embedded once, with no redraw, external dependency, or extra animal',()=>{
 const embedded=[...svg.matchAll(/xlink:href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/g)];
 assert.equal(embedded.length,1,'One shared source image, not four duplicated copies');
 assert.equal(sha256(Buffer.from(embedded[0][1],'base64')),USER_SPRITE_CHANGE.sourceSHA256);
 assert.equal(provenance.sourceSHA256,USER_SPRITE_CHANGE.sourceSHA256);
 assert.equal(provenance.sourceLibraryFileId,'libfile_8a210bf8f6008191873c2b2786ed652f');
 assert.equal(provenance.sourceLibraryVersion,0);
 assert.equal(sha256(svg),provenance.atlasSHA256);
 assert.match(svg,/width="1254" height="313\.5" viewBox="0 0 1254 313\.5"/);
 assert.match(svg,/clip-path="url\(#animals\)"/);
 assert.doesNotMatch(svg,/<(?:script|foreignObject|filter)\b|(?:href|xlink:href)="https?:/);
 assert.deepEqual(paths.map(([,animal])=>animal),Object.keys(animalFrames));
});

test('native clipping preserves white plumage and eyes while excluding grid, cards, and floor flecks',()=>{
 for(const [animal,frame] of Object.entries(animalFrames)){
  const clip=rectangles[animal];assert.ok(clip.length>0);
  for(const [x,y,w,h] of clip){assert.ok(x>=frame*313.5&&x+w<=(frame+1)*313.5);assert.ok(y>=50&&y+h<=299);}
  assert.equal(visible(animal,frame*313.5+150,20),false,'No white card above the animal');
  assert.equal(visible(animal,frame*313.5+5,150),false,'No black grid');
 }
 for(const [animal,x,y] of [['tuiuiu',60,195],['tuiuiu',100,180],['tuiuiu',175,85],['bemtevi',780,150],['bemtevi',820,190]])assert.equal(visible(animal,x,y),true,`Retained original white detail ${animal} at ${x},${y}`);
 for(const [animal,x,y] of [['tuiuiu',79,291],['tuiuiu',150,291],['tuiuiu',212,291],['capivara',355,291],['capivara',567,291],['bemtevi',725,291],['bemtevi',847,291],['mico',1016,291],['mico',1196,291]])assert.equal(visible(animal,x,y),false,`Removed decorative floor fleck ${animal} at ${x},${y}`);
});

test('all four existing animals render the correct frame through the unchanged spriteMarkup implementation',async()=>{
 const {ANIMAL_SPRITES}=await import(pathToFileURL(path.join(root,'dist/sintonia/assets.mjs')));
 assert.deepEqual(Object.keys(ANIMAL_SPRITES).sort(),Object.keys(animalFrames).sort());
 assert.ok(Object.isFrozen(ANIMAL_SPRITES));
 const ui=read('dist/sintonia/ui.mjs').toString();
 const start=ui.indexOf('  function spriteMarkup(board)'),end=ui.indexOf('  function renderBoards()',start);
 assert.ok(start>=0&&end>start);
 const factory=new Function('ANIMAL_SPRITES','recentDirection','esc','animalName',ui.slice(start,end)+';return spriteMarkup;');
 for(const direction of ['up','right','down','left']){
  const render=factory(ANIMAL_SPRITES,direction,value=>String(value),board=>board.animal);
  for(const [animal,frame] of Object.entries(animalFrames)){
   const sprite=ANIMAL_SPRITES[animal];assert.ok(Object.isFrozen(sprite));
   assert.equal(sprite.frame,frame);assert.equal(sprite.columns,4);assert.equal(sprite.rows,1);
   assert.equal(fileURLToPath(sprite.url),path.join(root,assetsPath));
   assert.equal(render({animal}),`<span class="s-animal-sprite" aria-hidden="true" style="background-image:url('${sprite.url}');background-size:400% 100%;background-position:${frame/3*100}% 0%"></span>`);
  }
  assert.match(render({animal:'unknown'}),/s-animal-placeholder/);
 }
});
