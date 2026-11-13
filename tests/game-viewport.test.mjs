import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { centeredScrollTop, availableBoardHeight, stableBoardWidth, stableBoardHeight, playBounds, installGameViewport, PLAY_PARTS } from '../dist/game-viewport.mjs';

function fixture({dense=false, fonts=false}={}) {
  const queue=new Map(), events=new Map(), observers=[]; let id=0, mutate, resolveFonts;
  const classes=()=>{const set=new Set();return {add:x=>set.add(x),remove:x=>set.delete(x),contains:x=>set.has(x)};};
  const node=()=>({append(){},addEventListener(){},style:{maxWidth:'',maxHeight:''},classList:classes(),dataset:{},attrs:new Map(),hidden:false,closest:()=>null,getClientRects(){return this.hidden?[]:[{}];},getAttribute(k){return this.attrs.get(k)??null;},setAttribute(k,v){this.attrs.set(k,v);},hasAttribute(k){return this.attrs.has(k);},removeAttribute(k){this.attrs.delete(k);}});
  const board=node(), host=node(), surface=node(), section=node(), heading=node(), actions=node();
  let note=null;
  heading.textContent='JOGO Fase 1'; heading.getBoundingClientRect=()=>({top:200,bottom:240,width:600,height:40});
  board.getBoundingClientRect=()=>{const width=Math.min(600,parseFloat(board.style.maxWidth)||600);return {top:250,bottom:250+width,width,height:width};};
  const cell=node();cell.getBoundingClientRect=()=>({width:dense?24:60,height:dense?24:60});
  board.querySelectorAll=()=>[cell];board.parentElement=host;
  host.getBoundingClientRect=()=>{const height=Math.min(board.getBoundingClientRect().height,parseFloat(host.style.maxHeight)||Infinity);return {top:250,bottom:250+height,height,width:600};};
  surface.closest=s=>s==='.approved-game-section'?section:null;
  surface.querySelectorAll=()=>[board];surface.querySelector=()=>note;surface.append=n=>{note=n;};
  surface.getBoundingClientRect=()=>({top:245,bottom:host.getBoundingClientRect().bottom+10+(note&&!note.hidden?20:0)});
  actions.getBoundingClientRect=()=>({top:250,bottom:450});
  section.querySelectorAll=s=>s===PLAY_PARTS?[heading,surface,actions]:[];
  section.querySelector=selector=>selector==='.approved-game-heading'?heading:null;
  const main={querySelectorAll:()=>[surface]};
  const doc={getElementById:()=>main,createElement:()=>node(),scrollingElement:{scrollHeight:2000}};
  if(fonts)doc.fonts={ready:new Promise(resolve=>resolveFonts=resolve)};
  const win={innerHeight:500,innerWidth:1280,scrollX:0,scrollY:0,location:{href:'https://example.test/?game=foo'},scrolls:[],scrollTo(v){this.scrolls.push(v);},requestAnimationFrame:fn=>{queue.set(++id,fn);return id;},cancelAnimationFrame:n=>queue.delete(n),addEventListener:(k,fn)=>events.set(k,fn),removeEventListener:k=>events.delete(k),MutationObserver:class{constructor(fn){mutate=fn;observers.push(this);}observe(){this.connected=true;}disconnect(){this.connected=false;}},ResizeObserver:class{observe(){}disconnect(){}}};
  const flush=()=>{const fns=[...queue.values()];queue.clear();fns.forEach(fn=>fn());};
  return {doc,win,events,queue,board,host,section,heading,surface,actions,flush,mutate:()=>mutate(),resolveFonts:()=>resolveFonts(),observers};
}
test('centering honors viewport margins and document boundaries',()=>{
  assert.equal(centeredScrollTop(300,400,800,50,2000),150);
  assert.equal(centeredScrollTop(0,100,800,0,2000),0);
  assert.equal(centeredScrollTop(1200,400,800,500,700),700);
  assert.equal(centeredScrollTop(300,900,800,100,2000),400);
});
test('board budget retains minimum usable height',()=>{
  assert.equal(availableBoardHeight(600,800,500),280);
  assert.equal(availableBoardHeight(600,400,500),600);
  assert.equal(availableBoardHeight(100,1000,300),72);
});
test('bounds exclude hidden heading/actions and handle absent layout',()=>{
  const f=fixture();f.heading.hidden=true;
  assert.equal(playBounds(f.section).top,245);
  f.surface.hidden=true;assert.equal(playBounds(f.section).height,200);
});
test('first opening fits and centers, ordinary mutations do not steal scroll',()=>{
  const f=fixture(),stop=installGameViewport(f.doc,f.win);f.flush();f.flush();
  assert.equal(f.win.scrolls.length,1);assert.equal(f.win.scrolls[0].behavior,'instant');
  assert.equal(f.board.getBoundingClientRect().width,400);
  f.mutate();f.mutate();assert.equal(f.queue.size,1);f.flush();f.flush();assert.equal(f.win.scrolls.length,1);
  f.heading.textContent='JOGO Fase 2';f.mutate();f.flush();f.flush();assert.equal(f.win.scrolls.length,2);stop();
});
test('input between fit and center cancels pending scroll',()=>{
  for(const event of ['wheel','touchstart','pointerdown','keydown']){const f=fixture(),stop=installGameViewport(f.doc,f.win);f.flush();f.events.get(event)();f.flush();assert.equal(f.win.scrolls.length,0,event);stop();}
});
test('dense boards fit without cropping or panning controls',()=>{
 const f=fixture({dense:true});const stop=installGameViewport(f.doc,f.win);f.flush();
 assert.equal(f.section.dataset.viewportFit,'stable');assert.equal(f.host.style.maxHeight,'');
 assert(!f.host.classList.contains('viewport-board-scroll'));assert.equal(f.board.getBoundingClientRect().width,400);stop();
});
test('stop removes listeners and cancels queued frames',()=>{const f=fixture(),stop=installGameViewport(f.doc,f.win);f.flush();stop();assert.equal(f.queue.size,0);assert.equal(f.events.size,0);assert(f.observers.every(o=>!o.connected));});
test('resolved fonts cannot restart disposed installer', async()=>{const f=fixture({fonts:true}),stop=installGameViewport(f.doc,f.win);f.flush();f.flush();stop();f.resolveFonts();await Promise.resolve();assert.equal(f.queue.size,0);});
test('missing ResizeObserver degrades safely',()=>{const f=fixture();delete f.win.ResizeObserver;assert.doesNotThrow(()=>{const stop=installGameViewport(f.doc,f.win);stop();});});
test('layout does not access saves, rewrite logical boards or suppress input',()=>{
  const source=readFileSync(new URL('../dist/game-viewport.mjs',import.meta.url),'utf8');
  assert(!/localStorage|sessionStorage|\.innerHTML\s*=|preventDefault|setAttribute\(['"]viewBox/.test(source));
  const css=readFileSync(new URL('../dist/game-viewport.css',import.meta.url),'utf8');assert(!/\bzoom\s*:|\btransform\s*:/.test(css));assert(!/viewport-board-scroll|viewport-fit-note/.test(css));
});

test('explicit endless options navigation moves focus without an extra scroll',()=>{const source=readFileSync(new URL('../dist/game-viewport.mjs',import.meta.url),'utf8');assert.equal((source.match(/\.focus\(/g)||[]).length,1);assert.match(source,/options\.addEventListener\('click',[\s\S]*?focus\(\{preventScroll:true\}\)/);});

test('nearly full height content uses the remaining margin instead of clipping the bottom',()=>{assert.equal(centeredScrollTop(300,566,568,0,2000),299);});

test('versus keeps board geometry across preview, score and result mutations',()=>{
  const f=fixture();f.surface.classList.add('approved-versus-surface');
  const initial=f.board.getBoundingClientRect();
  const stop=installGameViewport(f.doc,f.win);f.flush();f.flush();
  assert.equal(f.section.dataset.viewportFit,'stable');
  for(let state=0;state<8;state++){
    f.actions.getBoundingClientRect=()=>({top:250,bottom:450+state*70});
    f.mutate();f.flush();f.flush();
    assert.equal(f.board.getBoundingClientRect().width,initial.width);
    assert.equal(f.board.getBoundingClientRect().height,initial.height);
    assert(!f.host.classList.contains('viewport-board-scroll'));
  }
  assert.equal(f.win.scrolls.length,1);stop();
});

test('campaign geometry stays stable when feedback and actions change',()=>{
 const f=fixture(),stop=installGameViewport(f.doc,f.win);f.flush();f.flush();const first=f.board.getBoundingClientRect();
 for(let i=0;i<8;i++){f.actions.getBoundingClientRect=()=>({top:250,bottom:700+i*100});f.mutate();f.flush();f.flush();assert.deepEqual(f.board.getBoundingClientRect(),first);}
 assert.equal(f.win.scrolls.length,1);assert.equal(f.section.dataset.viewportFit,'stable');stop();
});
test('viewport resize refits but normal board mutations do not',()=>{
 const f=fixture(),stop=installGameViewport(f.doc,f.win);f.flush();f.flush();
 f.win.innerHeight=700;f.events.get('resize')();f.flush();f.flush();assert.equal(f.board.getBoundingClientRect().width,600);
 f.actions.getBoundingClientRect=()=>({top:250,bottom:1500});f.mutate();f.flush();assert.equal(f.board.getBoundingClientRect().width,600);stop();
});
test('stable dimensions use only board aspect and viewport, preserve tall shapes',()=>{
 for(const h of [320,568,844,900])for(const w of [320,390,1280])for(const [bw,bh]of [[600,600],[300,800],[800,300]]){
 const target=stableBoardWidth(bw,bh,h,w);assert(target<=bw);assert(target*bh/bw<=stableBoardHeight(h,w)+1);
 }
 const source=readFileSync(new URL('../dist/game-viewport.mjs',import.meta.url),'utf8');
 assert(!source.includes('Mover tabuleiro'));assert(!source.includes('scrollHosts'));assert(!source.includes('minimumBoardWidth'));
});
