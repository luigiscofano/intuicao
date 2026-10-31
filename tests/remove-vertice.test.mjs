import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {renderVersusVictory} from '../dist/versus-victory.mjs';
const base='f29224b94c5fedc4940103735954a0c7d44d3709',root=new URL('..',import.meta.url);
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:32*1024*1024});
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ids=['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','desvio','broto','cerco'];
const allowed=new Set(['README.md','app.mjs','category-navigation.mjs','footer-transition.css','game-info-content.mjs','game-info.css','game-info.mjs','game-nav-icons.mjs','game-nav-scroll.mjs','index.html','platform.css','rules-examples.css','rules-examples.mjs','rules-preview.mjs','style.css','versus-victory.css','versus-victory.mjs'].map(f=>'dist/'+f));
test('onze jogos e três duelos preservam ordem, nomes e apresentação',async()=>{
 assert.deepEqual(CATEGORY_GAMES,{intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio','broto','cerco']});
 for(const [file,key,current] of [['game-info-content.mjs','GAME_INFO',GAME_INFO],['rules-examples.mjs','RULE_EXAMPLES',RULE_EXAMPLES],['game-nav-icons.mjs','GAME_NAV_ICONS',GAME_NAV_ICONS]]){
  assert.deepEqual(Object.keys(current).sort(),[...ids].sort());
  const old=(await import('data:text/javascript;base64,'+Buffer.from(git('show',base+':dist/'+file)).toString('base64')))[key];
  for(const id of ids)assert.deepEqual(current[id],old[id],file+'/'+id);
 }
});
test('VÉRTICE não tem módulos, card, host, import ou stylesheet executável; saves não são apagados',()=>{
 assert(!existsSync(new URL('../dist/vertice',import.meta.url)));
 const html=read('dist/index.html'),app=read('dist/app.mjs'),nav=read('dist/category-navigation.mjs');
 assert(!/data-vertice|id="vertice"|vertice\/ui\.css/.test(html));assert(!/createVertice|vertice\/route|vertice\.hide/.test(app));
 assert(!/removeItem\(['"]intuicao\.vertice\.v1|localStorage\.clear\(/.test(app+nav));
 assert.equal((html.match(/<button data-(?:game|collection|sintonia|repasse|orbita|broto|cerco)=/g)||[]).length,11);
});
test('links legados de TRAMA e VÉRTICE caem na categoria Versus',()=>{
 const source=read('dist/category-navigation.mjs'),body=source.slice(source.indexOf('function locationState(){')+'function locationState(){'.length,source.indexOf('\n function record')).trim().slice(0,-1);
 const resolve=new Function('location','cards','id','CATEGORY_GAMES',body),cards=ids.map(id=>({id}));
 for(const old of ['trama','vertice'])for(const suffix of ['?game='+old,'#game='+old,'#'+old,'/'+old,'/'+old+'/']){
  const url=new URL('https://example.test'+(suffix.startsWith('/')?'':'/')+suffix);
  assert.deepEqual(resolve(url,cards,b=>b.id,CATEGORY_GAMES),{game:null,category:'versus'},suffix);
 }
 for(const id of ids){const url=new URL('https://example.test/?game='+id);assert.equal(resolve(url,cards,b=>b.id,CATEGORY_GAMES).game,id);}
});
test('celebrações dos três duelos restantes são literalmente iguais para todos os resultados',async()=>{
 const old=(await import('data:text/javascript;base64,'+Buffer.from(git('show',base+':dist/versus-victory.mjs')).toString('base64'))).renderVersusVictory;
 for(const game of ['desvio','broto','cerco'])for(const owner of [0,1])for(const kind of ['win','draw','loss'])for(const animate of [false,true]){
  const a={},b={},config={game,owner,winnerName:'Time '+owner,emblem:'<span>mascote</span>',draw:kind==='draw',lost:kind==='loss',animate};old(a,config);renderVersusVictory(b,config);assert.equal(b.innerHTML,a.innerHTML);
 }
});
test('motores, campanhas, arte e todos os arquivos fora do escopo ficam idênticos',()=>{
 let count=0;
 for(const line of git('ls-tree','-r',base,'--','dist').trim().split('\n')){
  const [meta,path]=line.split('\t');if(path.startsWith('dist/vertice/')||allowed.has(path))continue;
  assert.equal(git('hash-object','--',path).trim(),meta.split(' ')[2],path);count++;
 }assert(count>100);
 const footer=read('dist/footer-transition.css'),prior=git('show',base+':dist/footer-transition.css');
 assert.equal(footer,prior.replace(/,\s*#vertice(?:\s*>\s*\.[\w-]+)?/g,''),'Contorno genérico do rodapé preservado.');
});
