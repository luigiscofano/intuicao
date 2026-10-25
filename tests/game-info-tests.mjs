import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {createInfoDwell} from '../dist/game-info.mjs';
const read=n=>fs.readFileSync(new URL('../dist/'+n,import.meta.url),'utf8');
function clock(){let now=0,id=0;const jobs=new Map();return {setTimeout(f,ms){jobs.set(++id,{f,at:now+ms});return id;},clearTimeout(i){jobs.delete(i);},tick(ms){now+=ms;for(const [i,j] of [...jobs])if(j.at<=now){jobs.delete(i);j.f();}},get size(){return jobs.size;}};}
const c=clock(),shown=[],d=createInfoDwell(a=>shown.push(a),()=>{},c);d.start('first');c.tick(1499);assert.deepEqual(shown,[]);c.tick(1);assert.deepEqual(shown,['first']);d.start('cancelled');c.tick(1499);d.cancel();c.tick(1);assert.deepEqual(shown,['first']);d.start('replaced');c.tick(1000);d.start('latest');c.tick(1499);assert.equal(shown.length,1);c.tick(1);assert.deepEqual(shown,['first','latest']);assert.equal(c.size,0);
assert.deepEqual(Object.keys(GAME_INFO),['light','cut','elo','prumo','pacto','desvio']);
for(const [key,info] of Object.entries(GAME_INFO)){for(const field of ['name','summary','purpose','why'])assert.ok(info[field].length>2,key+' '+field);assert.ok(info.rules.length>=4);assert.ok(info.rules.every(s=>typeof s==='string'&&s.length>20));}
assert.match(GAME_INFO.light.rules.join(' '),/não podem se cruzar nem se tocar/);assert.match(GAME_INFO.cut.rules.join(' '),/3 pontos percentuais/);assert.match(GAME_INFO.elo.rules.join(' '),/um único circuito/);assert.match(GAME_INFO.prumo.rules.join(' '),/centro de massa/);assert.match(GAME_INFO.pacto.rules.join(' '),/exatamente dois/);assert.match(GAME_INFO.desvio.rules.join(' '),/mesma linha/);
const timers=clock();let active=null,doc;const mutations=[],resizes=[];
class E{
 constructor(tag='div'){this.tag=tag;this.children=[];this.attrs={};this.dataset={};this.listeners={};this.style={};this.open=false;this.hidden=false;this.isConnected=true;this.className='';this.offsetLeft=0;this.offsetTop=0;this.offsetWidth=150;this.classList={add:s=>{this.className+=' '+s;}};}
 setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k]??null;}removeAttribute(k){delete this.attrs[k];}
 append(...cs){for(const c of cs){c.parent=this;this.children.push(c);}}
 replaceChildren(...cs){this.children=[];this.append(...cs);}remove(){this.parent.children=this.parent.children.filter(c=>c!==this);this.isConnected=false;}
 addEventListener(t,f){(this.listeners[t]??=[]).push(f);}fire(t,extra={}){const e={target:this,relatedTarget:null,pointerType:'mouse',clientX:50,clientY:50,preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},...extra};for(const f of this.listeners[t]??[])f(e);return e;}
 focus(){active=this;doc.fire('focusin',{target:this});}showModal(){this.open=true;}close(){this.open=false;this.fire('close');}showPopover(){this.popoverOpen=true;}hidePopover(){this.popoverOpen=false;}
 matches(s){if(s===':popover-open')return !!this.popoverOpen;if(s==='[data-game],[data-collection]')return !!(this.dataset.game||this.dataset.collection);if(s==='button[data-info-game]')return this.tag==='button'&&!!this.dataset.infoGame;if(s==='.game-info-trigger')return this.className.split(' ').includes('game-info-trigger');if(s==='[data-info-close]')return 'data-info-close' in this.attrs;if(s==='button,[tabindex="0"]')return this.tag==='button'||this.attrs.tabindex==='0';if(s==='dialog[open]')return this.tag==='dialog'&&this.open;if(s.startsWith('[data-info-game='))return this.dataset.infoGame===s.match(/"([^"]+)"/)[1];if(s[0]==='#')return this.id===s.slice(1);if(s[0]==='.')return this.className===s.slice(1);return this.tag===s;}
 querySelectorAll(s){return this.children.flatMap(c=>[...(c.matches(s)?[c]:[]),...c.querySelectorAll(s)]);}querySelector(s){return this.querySelectorAll(s)[0]??null;}closest(s){return this.matches(s)?this:this.parent?.closest(s);}contains(e){return e===this||this.children.some(c=>c.contains(e));}
 getBoundingClientRect(){return {left:20,right:200,top:20,bottom:200,width:180,height:180};}
 set innerHTML(v){assert.match(v,/data-info-close/);const h=new E('h2');h.id='game-info-title';h.setAttribute('tabindex','-1');const x=new E('button');x.setAttribute('data-info-close','');const copy=new E();copy.className='game-info-copy';copy.setAttribute('tabindex','0');const close=new E('button');close.setAttribute('data-info-close','');this.append(h,x,copy,close);}
}
doc=new E('document');doc.body=new E('body');doc.append(doc.body);doc.documentElement={clientWidth:1000};doc.createElement=t=>new E(t);Object.defineProperty(doc,'activeElement',{get:()=>active});
const nav=new E('nav'),host=new E();host.id='collection';doc.body.append(nav,host);
const headings=['selection-title','game-title','collection-title','c-title'].map(id=>Object.assign(new E('h2'),{id}));doc.body.append(...headings);
const normalQuery=doc.querySelector.bind(doc),normalAll=doc.querySelectorAll.bind(doc);doc.querySelector=s=>s==='#main > .games'?nav:normalQuery(s);doc.querySelectorAll=s=>s.includes(',#')?s.split(',').flatMap(x=>normalAll(x)):normalAll(s);
const cards=Object.keys(GAME_INFO).map((game,i)=>{const b=new E('button');b.dataset[i<2?'game':'collection']=game;b.setAttribute('aria-pressed',i===0?'true':'false');b.offsetLeft=i*160;nav.append(b);return b;});
const win=new E();win.innerHeight=900;
let source=read('game-info.mjs').replace(/^import[^\n]+\n/,'').replace(/export function /g,'function ');
vm.runInNewContext(source,{GAME_INFO,document:doc,window:win,globalThis:timers,MutationObserver:class{constructor(f){mutations.push(f);}observe(){}},ResizeObserver:class{constructor(f){resizes.push(f);}observe(){}},...timers});
const dialog=doc.querySelector('#game-info-dialog'),tip=doc.querySelector('#game-info-tip'),title=dialog.querySelector('h2'),closes=dialog.querySelectorAll('[data-info-close]');
const buttons=nav.querySelectorAll('button[data-info-game]');assert.equal(buttons.length,6);assert.equal(nav.children.length,12,'Icons are siblings, not nested buttons');assert.deepEqual(buttons.map(b=>b.dataset.infoGame),Object.keys(GAME_INFO));for(const h of headings)assert.equal(h.querySelector('button[data-info-game]').dataset.infoGame,'light');
function over(b,type='mouse'){doc.fire('pointerover',{target:b,pointerType:type});}function click(b){return doc.fire('click',{target:b});}
over(buttons[0]);timers.tick(1499);assert.equal(tip.hidden,true);timers.tick(1);assert.equal(tip.hidden,false);assert.equal(buttons[0].getAttribute('aria-describedby'),tip.id);doc.fire('pointerout',{target:buttons[0]});assert.equal(tip.hidden,true);assert.equal(buttons[0].getAttribute('aria-describedby'),null);
over(buttons[0],'touch');timers.tick(1500);assert.equal(tip.hidden,true,'Touch hover does not show a preview');
for(const kind of ['pointerout','scroll','keydown','click']){over(buttons[1]);timers.tick(1499);doc.fire(kind,{target:kind==='pointerout'?buttons[1]:doc,key:'Escape'});timers.tick(1);assert.equal(tip.hidden,true,'Cancels on '+kind);}
for(let i=0;i<buttons.length;i++){buttons[i].focus();const event=click(buttons[i]);assert.ok(event.defaultPrevented&&event.stopped);assert.ok(dialog.open);assert.equal(active,title);assert.equal(title.textContent,GAME_INFO[buttons[i].dataset.infoGame].name);assert.equal(dialog.querySelector('.game-info-copy').children.length,3);assert.equal(tip.hidden,true);over(buttons[i]);timers.tick(1500);assert.equal(tip.hidden,true,'Never show a preview over modal');const key=dialog.fire('keydown',{key:'Tab',shiftKey:true});assert.ok(key.defaultPrevented&&key.stopped);assert.equal(active,closes[1]);dialog.fire('keydown',{key:'Tab'});assert.equal(active,closes[0]);dialog.fire('keydown',{key:'Escape'});assert.equal(dialog.open,false);assert.equal(active,buttons[i]);timers.tick(1500);assert.equal(tip.hidden,true,'Focus restored without reopening preview');}
for(const b of closes){click(buttons[1]);b.fire('click');assert.equal(dialog.open,false);assert.equal(active,buttons[1]);}
click(buttons[2]);dialog.fire('pointerdown');dialog.fire('click',{clientX:300});assert.equal(dialog.open,true,'Drag originating inside stays open');dialog.fire('pointerdown',{clientX:300});dialog.fire('click',{clientX:300});assert.equal(dialog.open,false);
const other=new E('dialog');other.open=true;doc.body.append(other);click(buttons[0]);assert.equal(dialog.open,false,'Existing modal wins');over(buttons[0]);timers.tick(1500);assert.equal(tip.hidden,true);other.open=false;
cards[0].setAttribute('aria-pressed','false');cards[5].setAttribute('aria-pressed','true');mutations.forEach(f=>f());for(const h of headings)assert.equal(h.querySelector('button[data-info-game]').dataset.infoGame,'desvio');mutations.forEach(f=>f());assert.equal(doc.querySelectorAll('button[data-info-game]').length,10,'Repeated observers do not duplicate icons');
assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\(/);assert.match(read('game-info.css'),/\.game-info-copy\{[^}]*overflow:auto/);
console.log('PASS game info: six content records, exact 1500ms dwell/cancellation, separate navigation/title icons, touch exclusion, modal isolation, focus/Tab/Escape/buttons/backdrop, route refresh and no duplicate icons. Native browser layout remains a separate check.');
const {restoreGameInfoHTML}=await import('./game-info-history.mjs');
const crypto=await import('node:crypto');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(fs.readFileSync(new URL('./game-info-authorized-change.json',import.meta.url),'utf8'));
const html=read('index.html'),restored=restoreGameInfoHTML(html);assert.equal(sha(restored),manifest.priorHtmlSHA256);assert.equal(restoreGameInfoHTML(restored),restored);assert.throws(()=>restoreGameInfoHTML(html+' '));assert.throws(()=>restoreGameInfoHTML(restored+' '));
for(const [file,hash] of Object.entries({...manifest.newFilesSHA256,...manifest.preservedDistSHA256}))assert.equal(sha(fs.readFileSync(new URL('../'+file,import.meta.url))),hash,'Exact protected or authorized file '+file);
assert.equal(Object.keys(manifest.newFilesSHA256).length,4);
console.log('PASS exact approved 4-file additions, all existing dist bytes, fail-closed reversible/idempotent HTML changes.');
