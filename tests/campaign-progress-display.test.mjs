import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { campaignCompletion, presentCampaignProgress, SELECTION_GAMES } from '../dist/selection-presentation.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const tile=(...classes)=>({classList:{contains:value=>classes.includes(value)}});
class Element {
 constructor(tag,doc){this.tagName=tag;this.ownerDocument=doc;this.className='';this.textContent='';this.children=[];this.attributes={};this.parentElement=null;}
 setAttribute(name,value){this.attributes[name]=value;}
 append(...nodes){for(const node of nodes)this.insertBefore(node,null);}
 insertBefore(node,anchor){node.remove();const index=anchor?this.children.indexOf(anchor):this.children.length;this.children.splice(index,0,node);node.parentElement=this;}
 remove(){if(this.parentElement){const siblings=this.parentElement.children;siblings.splice(siblings.indexOf(this),1);this.parentElement=null;}}
 get nextElementSibling(){const siblings=this.parentElement?.children??[];return siblings[siblings.indexOf(this)+1]??null;}
 querySelector(selector){const name=selector.replace(':scope > ','').slice(1);return this.children.find(node=>node.className.split(' ').includes(name))??null;}
}
function fixture(tiles){const doc={createElement:tag=>new Element(tag,doc)};const root=new Element('section',doc);const heading=new Element('h2',doc),rules=new Element('section',doc);rules.className='selection-section';root.append(heading,rules);root.querySelectorAll=()=>[{querySelectorAll:()=>tiles}];return {root,rules};}
test('counts only completed campaign tiles, including assisted wins but not attempts',()=>{
 const unplayed=tile(),attempt=tile('current'),won=tile('done'),logicWon=tile('completed'),assisted=tile('done','assisted');
 assert.deepEqual(campaignCompletion([unplayed,attempt,won,logicWon,assisted]),{completed:3,total:5});
 assert.deepEqual(campaignCompletion([won,won,logicWon]),{completed:2,total:2});
 assert.deepEqual(campaignCompletion([]),{completed:0,total:0});
});
for(const [game,kind] of Object.entries(SELECTION_GAMES))test(`${game}: ${kind==='campaign'?'one accurate accessible counter':'no phase counter for Versus'}`,()=>{
 const tiles=Array.from({length:80},(_,i)=>tile(i<3?(game==='divisa'?'completed':'done'):'available'));
 const {root,rules}=fixture(tiles);presentCampaignProgress(root,game);presentCampaignProgress(root,game);
 const progress=root.querySelector(':scope > .campaign-progress');
 if(kind!=='campaign'){assert.equal(progress,null);return;}
 assert.equal(root.children.filter(node=>node.className==='campaign-progress').length,1);
 assert.equal(progress.querySelector('.campaign-progress-count').textContent,'3');
 assert.equal(progress.querySelector('.campaign-progress-total').textContent,' / 80 concluídas');
 assert.equal(progress.attributes['aria-label'],'3 de 80 fases concluídas');
 assert.equal(progress.attributes['aria-live'],'polite');assert.equal(progress.nextElementSibling,rules);
 tiles[3]=tile('done');presentCampaignProgress(root,game);
 assert.equal(progress.querySelector('.campaign-progress-count').textContent,'4');
});
test('uses actual catalog size, removes stale counters when changing to Versus or no catalog',()=>{
 const tiles=[tile('done'),tile()];const {root}=fixture(tiles);presentCampaignProgress(root,'light');
 assert.equal(root.querySelector('.campaign-progress').querySelector('.campaign-progress-total').textContent,' / 2 concluídas');
 presentCampaignProgress(root,'broto');assert.equal(root.querySelector('.campaign-progress'),null);
 presentCampaignProgress(root,'cut');tiles.splice(0);presentCampaignProgress(root,'cut');assert.equal(root.querySelector('.campaign-progress'),null);
});
test('removes explanatory notice and duplicate old counters, preserves storage and migration alerts',()=>{
 const logic=read('dist/logica/ui.mjs'),presentation=read('dist/selection-presentation.mjs');
 assert.doesNotMatch(logic,/Todas as fases estão disponíveis|percorre as 80 fases existentes|repete o ciclo|sem gerar fases inéditas|class="logic-progress"/);
 assert.doesNotMatch(presentation,/Uma sequência das 80 fases existentes/);
 assert.match(logic,/id="lg-storage-warning"/);
 for(const [game,prefix] of [['orbita','o'],['repasse','r'],['sintonia','s']]){
  const ui=read(`dist/${game}/ui.mjs`);assert.doesNotMatch(ui,/concluídos\. Progresso salvo neste navegador/);assert.match(ui,new RegExp(`id="${prefix}-selection-status"`));
 }
 assert.match(read('dist/orbita/ui.mjs'),/campaignMigrationNotice/);assert.match(read('dist/sintonia/ui.mjs'),/Tentativas anteriores preservadas/);
});
