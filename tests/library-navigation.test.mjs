import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('..',import.meta.url),html=readFileSync(new URL('dist/index.html',root),'utf8');
const source=readFileSync(new URL('dist/category-navigation.mjs',root),'utf8');
function harness(url='https://example.test/'){
 const el=(dataset={})=>({dataset,hidden:false,attrs:{},events:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this.events[k]=f;},focus(){this.focused=true;},click(){this.clicked=(this.clicked||0)+1;nav.events.click({target:{closest:()=>this}});}});
 const ids=['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','desvio','broto','cerco'];
 const cards=ids.map(x=>el({game:x})),heads=[el(),el(),el()],infos=ids.map(x=>el({infoGame:x}));
 const nav=el();nav.querySelectorAll=s=>s==='.game-section-title'?heads:s==='[data-info-game]'?infos:cards;
 const filters=['','intuicao','logica','versus'].map(x=>el({category:x})),categories=el();categories.querySelectorAll=()=>filters;
 const tabs=el(),buttons=['games','achievements'].map(x=>el({screen:x}));tabs.querySelectorAll=()=>buttons;
 const title=el(),back=el(),awards=el();awards.querySelector=()=>title;
 const nodes={categories,'category-back':back,'category-title':title,achievements:awards,'library-navigation':tabs};let hidden=0,renders=0;
 const context={URL,URLSearchParams,location:new URL(url),history:{pushState(_,__,u){context.location=new URL(u);}},document:{querySelector:()=>nav,getElementById:id=>nodes[id]},window:{addEventListener(k,f){this[k]=f;}},renderAchievements(){renders++;}};
 vm.createContext(context);vm.runInContext(source.replace(/^import .*\n/,'').replaceAll('export ',''),context);context.initCategoryNavigation({hideGames(){hidden++;}});
 const click=(host,b)=>host.events.click({target:{closest:()=>b}});
 return {context,cards,heads,infos,nav,categories,filters,tabs,buttons,title,back,awards,click,get hidden(){return hidden;},get renders(){return renders;}};
}
test('home displays all eleven original cards unchanged',()=>{
 const prior=readFileSync(new URL('tests/fixtures/library-github-baseline.html',root),'utf8');
 const body=s=>s.match(/<nav(?: hidden)? class="games"[^>]*>([\s\S]*?)<\/nav>/)[1];assert.equal(body(html),body(prior));
 const h=harness();assert.equal(h.cards.filter(x=>!x.hidden).length,11);assert.equal(h.title.textContent,'Todos os jogos');assert.ok(h.awards.hidden);assert.equal(h.cards.filter(x=>x.clicked).length,0);
});
test('filters and all-games return preserve cards and info visibility',()=>{const h=harness();for(const [i,n] of [[1,2],[2,6],[3,3],[0,11]]){h.click(h.categories,h.filters[i]);assert.equal(h.cards.filter(x=>!x.hidden).length,n);assert.equal(h.infos.filter(x=>!x.hidden).length,n);}assert.equal(h.hidden,5);});
test('achievements closes games, refreshes on every entry and storage, and supports history',()=>{const h=harness();h.click(h.tabs,h.buttons[1]);assert.ok(h.nav.hidden);assert.ok(!h.awards.hidden);assert.equal(h.renders,1);assert.equal(h.context.location.search,'?screen=achievements');h.context.window.storage();assert.equal(h.renders,2);h.click(h.tabs,h.buttons[0]);assert.ok(h.awards.hidden);assert.equal(h.cards.filter(x=>!x.hidden).length,11);h.context.location=new URL('https://example.test/?screen=achievements');h.context.window.popstate();assert.equal(h.renders,3);});
test('direct game URLs restore each of eleven game handlers once',()=>{for(const game of ['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','desvio','broto','cerco']){const h=harness(`https://example.test/?game=${game}`);assert.equal(h.cards.find(x=>x.dataset.game===game).clicked,1);assert.equal(h.cards.filter(x=>!x.hidden).length,11);}});
test('filtered game links, old removed-game routes, invalid filters and reload remain safe',()=>{const h=harness('https://example.test/?game=elo&category=logica');assert.equal(h.cards.filter(x=>!x.hidden).length,6);h.back.onclick();assert.equal(h.cards.filter(x=>!x.hidden).length,11);assert.equal(h.context.location.search,'');assert.equal(harness('https://example.test/?game=trama').cards.filter(x=>!x.hidden).length,3);assert.equal(harness('https://example.test/?category=invalid').cards.filter(x=>!x.hidden).length,11);});
