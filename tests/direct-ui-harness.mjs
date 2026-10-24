// Minimal deterministic DOM/timer harness. Not a layout/browser substitute.
const registry=new Map();
class Element {
 constructor(tag='div',attrs={}){this.tag=tag;this.attrs=attrs;this.id=attrs.id;this.parentElement=null;this.dataset={};for(const [k,v] of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;this.hidden=false;this.disabled=false;this.value=attrs.value??'';this.style={setProperty(){}};this.classList={add(){},remove(){},toggle(){}};this.nodes=[];this.textContent='';if(this.id)registry.set(this.id,this);}
 set id(value){if(this._id&&registry.get(this._id)===this)registry.delete(this._id);this._id=value;if(value)registry.set(value,this);}get id(){return this._id;}
 set innerHTML(html){
  const removed=new Set(this.nodes);for(const n of removed)if(n.id&&registry.get(n.id)===n)registry.delete(n.id);
  for(let p=this.parentElement;p;p=p.parentElement)p.nodes=p.nodes.filter(n=>!removed.has(n));
  this.html=html;this.nodes=[];const stack=[this],voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  for(const m of html.matchAll(/<(\/?)([a-z][a-z0-9-]*)([^>]*)>/gi)){
   const tag=m[2].toLowerCase();
   if(m[1]){const i=stack.findLastIndex(n=>n!==this&&n.tag===tag);if(i>=0)stack.length=i;continue;}
   const attrs={};for(const a of m[3].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[a[1]]=a[2]??'';
   const node=new Element(tag,attrs);stack.at(-1).appendChild(node);if(!voidTags.has(tag)&&!m[3].trim().endsWith('/'))stack.push(node);
  }
 }
 get innerHTML(){return this.html??'';}
 querySelectorAll(selector){
  const parts=selector.trim().match(/(?:\[[^\]]*\]|[^\s])+/g)??[];
  const matches=(n,s)=>{if(s.startsWith('.'))return (n.attrs.class??n.className??'').split(' ').includes(s.slice(1));if(s.startsWith('#'))return n.id===s.slice(1);const m=s.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return m?m[1] in n.attrs&&(m[2]===undefined||n.attrs[m[1]]===m[2]):n.tag===s;};
  return this.nodes.filter(n=>{if(!parts.length||!matches(n,parts.at(-1)))return false;let parent=n.parentElement;for(let i=parts.length-2;i>=0;i--){while(parent&&!matches(parent,parts[i]))parent=parent.parentElement;if(!parent)return false;parent=parent.parentElement;}return true;});
 }
 querySelector(s){return this.querySelectorAll(s)[0]??null;}
 appendChild(child){child.parentElement=this;for(let parent=this;parent;parent=parent.parentElement)parent.nodes.push(child,...child.nodes);return child;}addEventListener(){}
 setAttribute(k,v){this.attrs[k]=String(v);}focus(){}click(){if(!this.disabled)this.onclick?.();}
}
const host=new Element('div',{id:'collection'}),root=new Element(),nav=new Element('button',{'data-collection':'desvio'});
globalThis.document={getElementById:id=>registry.get(id)??null,querySelectorAll:s=>root.nodes.length?root.querySelectorAll(s):(s==='[data-collection]'?[nav]:[]),querySelector:s=>root.querySelector(s),createElement:tag=>new Element(tag),addEventListener(){}};
const store=new Map();globalThis.localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
const timers=new Map();let nextTimer=0;globalThis.setTimeout=fn=>{timers.set(++nextTimer,fn);return nextTimer;};globalThis.clearTimeout=id=>timers.delete(id);
const $=id=>registry.get(id);const flush=()=>{const callbacks=[...timers.values()];timers.clear();for(const cb of callbacks)cb();};

globalThis.cancelAnimationFrame=()=>{};globalThis.requestAnimationFrame=fn=>setTimeout(fn);
export {registry,Element,host,root,store,timers,$,flush};
// Additional event-capable deterministic simulation; not native browser/layout QA.
Element.prototype.matches=function(selector){return selector.split(',').some(s=>{s=s.trim();if(s[0]==='#')return this.id===s.slice(1);if(s[0]==='.')return (this.attrs.class||'').split(' ').includes(s.slice(1));const m=s.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return m?m[1] in this.attrs&&(m[2]===undefined||this.attrs[m[1]]===m[2]):this.tag===s;});};
Element.prototype.closest=function(selector){for(let n=this;n;n=n.parentElement)if(n.matches?.(selector))return n;return null;};
Element.prototype.contains=function(node){return node===this||this.nodes.includes(node);};
Element.prototype.addEventListener=function(type,fn){this.listeners??=new Map();const list=this.listeners.get(type)||[];list.push(fn);this.listeners.set(type,list);};
Element.prototype.removeEventListener=function(type,fn){this.listeners?.set(type,(this.listeners.get(type)||[]).filter(x=>x!==fn));};
Element.prototype.focus=function(){if(document.activeElement===this)return;document.activeElement=this;this.dispatch('focusin');};
Element.prototype.setPointerCapture=function(){};
Element.prototype.getBoundingClientRect=function(){let l;try{l=JSON.parse($('c-editor-json')?.value);}catch{}const width=(l?.cols||4)*100,height=(l?.rows||4)*100;return {left:0,top:0,width,height,right:width,bottom:height};};
Element.prototype.dispatch=function(type,opts={}){const event={type,target:this,button:0,pointerId:1,pointerType:'mouse',detail:1,clientX:50,clientY:50,key:'',preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},...opts};for(let n=this;n&&!event.stopped;n=n.parentElement){event.currentTarget=n;for(const fn of [...(n.listeners?.get(type)||[])])fn(event);if(type==='click'&&!n.disabled)n.onclick?.(event);else if(type!=='click')n['on'+type]?.(event);}if(!event.stopped)for(const fn of document.listeners?.get(type)||[])fn(event);return event;};
Element.prototype.click=function(){if(!this.disabled)this.dispatch('click',{detail:0});};
Object.defineProperty(Element.prototype,'ownerDocument',{get(){return document;}});
document.listeners=new Map();document.addEventListener=Element.prototype.addEventListener;document.removeEventListener=Element.prototype.removeEventListener;document.defaultView={listeners:new Map(),addEventListener:Element.prototype.addEventListener,removeEventListener:Element.prototype.removeEventListener};
globalThis.confirm=()=>true;
// Dialog API simulation. Native top-layer/inert layout is checked separately in browser QA.
document.body=new Element('body');document.body.appendChild(host);
Object.defineProperty(Element.prototype,'isConnected',{get(){return document.body.contains(this)||root.contains(this);}});
Element.prototype.showModal=function(){this.open=true;};
Element.prototype.close=function(){this.open=false;};
