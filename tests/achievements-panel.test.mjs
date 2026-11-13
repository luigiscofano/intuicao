import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../dist/achievements-panel.mjs', import.meta.url), 'utf8');
function harness(url='https://example.test/?game=elo&category=logica') {
  const node = () => ({events:{}, attributes:{}, hidden:true, isConnected:true,
    addEventListener(name,fn){this.events[name]=fn;}, setAttribute(k,v){this.attributes[k]=v;},
    focus(options){this.focused=options;}, append(child){this.child=child;}});
  const trigger=node(), content=node(), origin=node(), close=node(), dialog=node();
  dialog.open=false;dialog.querySelector=()=>close;
  dialog.showModal=()=>{dialog.open=true;};
  dialog.close=()=>{dialog.open=false;dialog.events.close();};
  const doc={activeElement:origin, events:{}, body:node(),
    getElementById:id=>({'achievements-open':trigger,achievements:content}[id]),
    createElement:()=>dialog, addEventListener(name,fn){this.events[name]=fn;}};
  let renders=0;
  const win={scrollX:5,scrollY:450,events:{},location:new URL(url),
    history:{state:{existing:true},replaceState(state,_,url){win.location=new URL(url);this.state=state;}},
    addEventListener(name,fn){this.events[name]=fn;},scrollTo(value){this.lastScroll=value;}};
  const context={URL,renderAchievements(container){assert.equal(container,content);renders++;},MISSION_UNLOCK_EVENT:'mission'};
  vm.createContext(context);vm.runInContext(source.replace(/^import .*;\n/gm,'').replace('export function','function'),context);
  const controller=context.initAchievementsPanel(doc,win);
  return {controller,doc,win,trigger,content,origin,close,dialog,get renders(){return renders;}};
}
test('abrir e fechar preserva tela, URL, foco e rolagem sem reabrir jogo',()=>{
  const h=harness();h.controller.open();
  assert.equal(h.dialog.open,true);assert.equal(h.content.hidden,false);assert.equal(h.renders,1);
  assert.equal(h.win.location.search,'?game=elo&category=logica');
  assert.equal(h.trigger.attributes['aria-expanded'],'true');assert.equal(h.close.focused.preventScroll,true);
  h.close.events.click();assert.equal(h.content.hidden,true);assert.equal(h.controller.isOpen,false);
  assert.equal(h.trigger.attributes['aria-expanded'],'false');assert.equal(h.origin.focused.preventScroll,true);
  assert.equal(h.win.lastScroll.top,450);assert.equal(h.win.lastScroll.left,5);
});
test('cliques repetidos não recriam painel e reabertura captura posição nova',()=>{
  const h=harness();h.controller.open();h.controller.open();assert.equal(h.renders,1);
  h.controller.close();h.win.scrollY=710;h.controller.open();assert.equal(h.renders,2);
  h.controller.close();assert.equal(h.win.lastScroll.top,710);
});
test('fechamento nativo restaura foco e remove só rota legada de conquistas',()=>{
  const h=harness('https://example.test/?game=elo&screen=achievements&category=logica');
  h.controller.open();h.origin.isConnected=false;h.dialog.close();
  assert.equal(h.trigger.focused.preventScroll,true);
  assert.equal(h.win.location.search,'?game=elo&category=logica');
  assert.equal(h.win.history.state.existing,true);
});
test('progresso se atualiza só enquanto painel está aberto',()=>{
  const h=harness();h.win.events.storage();assert.equal(h.renders,0);
  h.controller.open();h.win.events.storage();h.win.events.mission();assert.equal(h.renders,3);
  h.controller.close();h.win.events.mission();assert.equal(h.renders,3);
});
test('atalho da notificação abre painel sem navegação e preserva modificadores',()=>{
  const h=harness();let prevented=0;const event={target:{closest:()=>({})},preventDefault(){prevented++;}};
  h.doc.events.click({...event,ctrlKey:true});assert.equal(h.renders,0);
  h.doc.events.click(event);assert.equal(prevented,1);assert.equal(h.renders,1);
});
test('menu mantém Sobre e controles de pelo menos44px, sem abas antigas',()=>{
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
  const css=readFileSync(new URL('../dist/achievements-panel.css',import.meta.url),'utf8');
  assert.match(html,/id="about-open"/);assert.match(html,/id="achievements-open"/);
  assert.doesNotMatch(html,/data-screen="(?:games|achievements)"/);
  assert.match(css,/min-height:44px/);assert.doesNotMatch(css,/#about-open[^}]*display:\s*none/);
});
