import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const read=n=>fs.readFileSync(new URL('../dist/'+n,import.meta.url),'utf8');
const source=read('about-dialog.mjs'),css=read('about-dialog.css');
const baseline=n=>execFileSync('git',['show','4de1ab60c51d3a9bd3372a953de716498e51e032:dist/'+n],{encoding:'utf8'});
const oldSource=baseline('about-dialog.mjs'),oldCSS=baseline('about-dialog.css');
const loop=s=>s.slice(s.indexOf('  const fragment=document.createDocumentFragment();\n  const colors='),s.indexOf("  sparks.append(fragment);status.textContent='Viva cada pequena descoberta!';"));
assert.equal(loop(source),loop(oldSource),'Original pastel sparkle loop unchanged');
const green=s=>s.slice(s.indexOf(' const celebrateGreen=()=>{'),s.indexOf(' window.addEventListener'));
assert.ok(green(source).startsWith(green(oldSource)),'Original green-star function unchanged');
assert.ok(css.startsWith(oldCSS),'All original sparkle CSS unchanged');
assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../dist/platform-assets/fauna-green-original.png',import.meta.url))).digest('hex'),'b3616f1c1d48d13083194c2a6e09155ea59b1261b4f2c05ec603cc54d4e2c7cb','Exact user reference asset');
assert.match(css,/prefers-reduced-motion:reduce.*about-animal-confetti.*animation:none/);
let runs=0;
function run(reducedMotion,vw,vh,random){
 let active=null,next=0;const timers=new Map(),durations=new Map(),created=[];
 class E{
  constructor(){this.listeners={};this.children=[];this.open=false;this.popoverOpen=false;this.isConnected=true;this.attrs={};this.values={};this.style={setProperty:(k,v)=>this.values[k]=v};this.textContent='';}
  setAttribute(k,v){this.attrs[k]=v;}
  matches(s){assert.equal(s,':popover-open');return this.popoverOpen;}
  showPopover(){this.popoverOpen=true;}
  hidePopover(){this.popoverOpen=false;}
  addEventListener(t,fn){(this.listeners[t]??=[]).push(fn);}
  fire(t,extra={}){const e={target:this,clientX:vw/2,clientY:vh/2,preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},...extra};for(const f of this.listeners[t]??[])f(e);return e;}
  focus(){active=this;}
  showModal(){this.open=true;}
  close(){this.open=false;this.fire('close');}
  replaceChildren(){this.children=[];}
  append(c){this.children.push(...(c.fragment?c.children:[c]));}
  getBoundingClientRect(){const w=Math.min(680,vw-24),h=Math.min(640,vh-24);return {left:(vw-w)/2,right:(vw+w)/2,top:(vh-h)/2,bottom:(vh+h)/2,width:w,height:h};}
 }
 const trigger=new E(),dialog=new E(),title=new E(),sparks=new E(),status=new E(),x=new E(),celebrate=new E(),close=new E(),media=new E(),window=new E();media.matches=reducedMotion;
 window.innerHeight=vh;window.matchMedia=()=>media;
 dialog.querySelector=s=>({'#about-title':title,'.about-sparkles':sparks,'.about-status':status,'.about-celebrate':celebrate}[s]);
 dialog.querySelectorAll=s=>s==='[data-about-close]'?[x,close]:[x,celebrate,close];
 const document={documentElement:{clientWidth:vw},querySelector:s=>s==='#about-open'?trigger:dialog,get activeElement(){return active;},createElement:()=>{const e=new E();created.push(e);return e;},createDocumentFragment:()=>Object.assign(new E(),{fragment:true})};
 const math=Object.create(Math);math.random=()=>random;
 vm.runInNewContext(source,{document,window,setTimeout:(f,d)=>{timers.set(++next,f);durations.set(next,d);return next;},clearTimeout:n=>{timers.delete(n);durations.delete(n);},Math:math});
 const layer=created[0];assert.equal(layer.id,'about-green-sparkles');assert.deepEqual(layer.attrs,{popover:'manual','aria-hidden':'true',inert:''});assert.equal(dialog.children[0],layer);
 trigger.focus();trigger.fire('click');assert.ok(dialog.open);assert.equal(active,title);
 const verify=()=>{
  assert.equal(sparks.children.length,reducedMotion?18:60);assert.equal(layer.children.length,reducedMotion?18:60);assert.ok(layer.popoverOpen);assert.equal(timers.size,1);assert.deepEqual([...durations.values()],[reducedMotion?1100:1650]);
  let outside=0;const r=dialog.getBoundingClientRect();
  for(const s of layer.children.filter(s=>s.className==='about-green-spark')){assert.equal(s.textContent,'✦');assert.equal(s.className,'about-green-spark');assert.ok(['#3e7045','#527f43','#688c4e'].includes(s.values['--gcolor']));const x=parseFloat(s.values['--gx']),y=parseFloat(s.values['--gy']),dx=parseFloat(s.values['--gdx']),dy=parseFloat(s.values['--gdy']);for(const t of [0,.25,.5,.75,1]){assert.ok(x+t*dx>=0&&x+t*dx+24<=vw,'Star cell remains inside viewport horizontally');assert.ok(y+t*dy>=0&&y+t*dy+24<=vh,'Star cell remains inside viewport vertically');}if(x<r.left||x+24>r.right||y<r.top||y+24>r.bottom)outside++;}
  assert.ok(outside>0,'Green stars still extend beyond modal boundary');
  const animals=layer.children.filter(s=>s.className==='about-animal-confetti');assert.equal(animals.length,reducedMotion?8:28);
  for(const p of animals){assert.ok(p.innerHTML.includes('platform-assets/fauna-green-original.png'));assert.ok(p.innerHTML.includes('feColorMatrix'));assert.ok(parseFloat(p.values['--asize'])>=20&&parseFloat(p.values['--asize'])<=44);assert.ok(parseFloat(p.values['--ax'])>=12);assert.ok(parseFloat(p.values['--ay'])>=12);}

 };
 for(let i=0;i<12;i++){celebrate.fire('click');verify();}assert.equal(dialog.children.length,1,'No layer accumulation');
 const clear=()=>{assert.equal(sparks.children.length,0);assert.equal(layer.children.length,0);assert.ok(!layer.popoverOpen);assert.equal(timers.size,0);assert.equal(status.textContent,'');};
 [...timers.values()][0]();clear();
 celebrate.fire('click');window.fire('resize');assert.equal(layer.children.length,0);assert.equal(sparks.children.length,reducedMotion?18:60,'Resize leaves original particles intact');assert.equal(timers.size,1);assert.ok(!layer.popoverOpen);
 celebrate.fire('click');let e=dialog.fire('keydown',{key:'Escape'});clear();assert.ok(!dialog.open);assert.equal(active,trigger);assert.ok(e.defaultPrevented&&e.stopped);
 for(const b of [x,close]){trigger.fire('click');celebrate.fire('click');b.fire('click');clear();assert.equal(active,trigger);}
 trigger.fire('click');celebrate.fire('click');media.fire('change');clear();dialog.close();
 assert.equal(window.listeners.resize.length,1);assert.equal(media.listeners.change.length,1);assert.equal(celebrate.listeners.click.length,1);runs++;
}
for(const reduced of [false,true])for(const [w,h] of [[320,568],[375,667],[390,844],[768,1024],[1440,900]])for(const random of [0,.5,.999999])run(reduced,w,h,random);
console.log(`PASS additive animal confetti: ${runs} viewport/motion cases; exact supplied sheet, original stars preserved, bounded 28/8 extras, repeated clicks and cleanup.`);
