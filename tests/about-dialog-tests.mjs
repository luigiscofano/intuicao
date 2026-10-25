import {restoreEloV3File} from './elo-v3-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {restoreAboutDialogHTML} from './about-dialog-history.mjs';
const read=n=>fs.readFileSync(new URL('../dist/'+n,import.meta.url),'utf8');
const html=read('index.html'),css=read('about-dialog.css'),source=read('about-dialog.mjs');
restoreAboutDialogHTML(html);
const manifest=JSON.parse(fs.readFileSync(new URL('./about-dialog-authorized-change.json',import.meta.url),'utf8'));
for(const [file,hash] of Object.entries({...manifest.preservedDistSHA256,...manifest.newFilesSHA256})){const bytes=restoreEloV3File(file,fs.readFileSync(new URL('../'+file,import.meta.url)));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),hash,'Exact protected/new artifact '+file);}
const markup=html.slice(html.indexOf('<dialog id="about-dialog"'),html.indexOf('</dialog>')+9);
assert.match(markup,/aria-modal="true" aria-labelledby="about-title"/);
assert.match(markup,/Luigi Scofano de Araujo/);
assert.match(markup,/Porque a curiosidade é a primeira lição\./);
assert.doesNotMatch(markup,/\b(?:IA|ChatGPT|CS50)\b/i);
assert.equal((markup.match(/<p[ >]/g)||[]).length,6);
assert.match(css,/\.about-sparkles\{[^}]*pointer-events:none/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)[\s\S]*animation:none/);
assert.match(css,/\.about-copy\{[^}]*overflow:auto/);
assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\(|\.innerHTML/);
function run(reducedMotion){
 let active=null, next=0;const timers=new Map();
 class E{
  constructor(){this.listeners={};this.children=[];this.open=false;this.isConnected=true;this.style={setProperty(){}};this.textContent='';}
  addEventListener(t,fn){(this.listeners[t]??=[]).push(fn);}
  fire(t,extra={}){let e={target:this,clientX:50,clientY:50,preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},...extra};for(const f of this.listeners[t]??[])f(e);return e;}
  focus(){active=this;}
  showModal(){this.open=true;}
  close(){this.open=false;this.fire('close');}
  replaceChildren(){this.children=[];}
  append(c){this.children.push(...(c.fragment?c.children:[c]));}
  getBoundingClientRect(){return {left:0,right:100,top:0,bottom:100};}
 }
 const trigger=new E(),dialog=new E(),title=new E(),sparks=new E(),status=new E(),x=new E(),celebrate=new E(),close=new E(),media=new E();media.matches=reducedMotion;
 dialog.querySelector=s=>({'#about-title':title,'.about-sparkles':sparks,'.about-status':status,'.about-celebrate':celebrate}[s]);
 dialog.querySelectorAll=s=>s==='[data-about-close]'?[x,close]:[x,celebrate,close];
 const document={querySelector:s=>s==='#about-open'?trigger:dialog,get activeElement(){return active;},createElement:()=>new E(),createDocumentFragment:()=>Object.assign(new E(),{fragment:true})};
 vm.runInNewContext(source,{document,window:{matchMedia:()=>media},setTimeout:f=>{timers.set(++next,f);return next;},clearTimeout:n=>timers.delete(n),Math});
 trigger.focus();trigger.fire('click');assert.ok(dialog.open);assert.equal(active,title);
 trigger.fire('click');assert.equal(trigger.listeners.click.length,1);
 title.focus();let key=dialog.fire('keydown',{key:'Tab',shiftKey:true});assert.equal(active,close);assert.ok(key.defaultPrevented);assert.ok(key.stopped,'Modal keyboard events stay isolated');
 close.focus();dialog.fire('keydown',{key:'Tab'});assert.equal(active,x);
 for(let i=0;i<12;i++)celebrate.fire('click');assert.equal(sparks.children.length,reducedMotion?18:60);assert.equal(timers.size,1);
 const cb=[...timers.values()][0];cb();assert.equal(sparks.children.length,0);assert.equal(timers.size,0);
 celebrate.fire('click');dialog.fire('keydown',{key:'Escape'});assert.ok(!dialog.open);assert.equal(active,trigger);assert.equal(sparks.children.length,0);assert.equal(timers.size,0);
 for(const b of [x,close]){trigger.fire('click');b.fire('click');assert.ok(!dialog.open);assert.equal(active,trigger);}
 trigger.fire('click');dialog.fire('pointerdown',{clientX:50});dialog.fire('click',{clientX:200});assert.ok(dialog.open,'Dragging from inside must not dismiss');
 dialog.fire('pointerdown',{clientX:200});dialog.fire('click',{clientX:200});assert.ok(!dialog.open);
 trigger.fire('click');celebrate.fire('click');media.fire('change');assert.equal(sparks.children.length,0);assert.equal(timers.size,0);dialog.close();
 assert.equal(media.listeners.change.length,1);assert.equal(celebrate.listeners.click.length,1);
}
run(false);run(true);
console.log('PASS About dialog exact HTML isolation, six approved paragraphs, focus/Tab/Escape/X/Fechar/backdrop, repeated lifecycle, bounded sparkle cleanup and reduced-motion simulation. Native top-layer/mobile layout QA remains separate.');
