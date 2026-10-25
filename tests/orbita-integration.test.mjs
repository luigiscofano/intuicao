import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {resultMarkup} from '../dist/result-motion.mjs';
import {selectionSelector, selectionScrollTop, easeNavigation} from '../dist/game-nav-scroll.mjs';

// The production revision immediately preceding the ÓRBITA integration.
const baseline = '044349eebdce9eafc20ed5b4029e5ed765d8fd62';
const read = name => fs.readFileSync(new URL('../dist/' + name, import.meta.url), 'utf8');
const before = name => execFileSync('git', ['show', `${baseline}:dist/${name}`], {encoding:'utf8',maxBuffer:64*1024*1024});
const previousModule = name => import('data:text/javascript;base64,' + Buffer.from(before(name)).toString('base64'));
const existing = ['light','cut','elo','prumo','pacto','desvio','sintonia','repasse'];
const integrationFiles = new Set(['app.mjs','index.html','platform.css','style.css','game-info-content.mjs','game-info.css','game-info.mjs','game-nav-scroll.mjs','result-motion.mjs']);

test('a coleção ganha somente o nono cartão, a folha de estilo e o host do ÓRBITA', () => {
  const html = read('index.html');
  assert.equal((html.match(/<button data-(?:game|collection|sintonia|repasse|orbita)=/g) || []).length,9);
  const restored = html
    .replace('<link rel="stylesheet" href="orbita/ui.css">','')
    .replace('<button data-orbita="orbita" aria-pressed="false"><span>09</span> ÓRBITA <small>giros que conectam caminhos</small></button>','')
    .replace('<section id="orbita" hidden aria-label="ÓRBITA — anéis e conexões"></section>','');
  assert.equal(restored,before('index.html'));
});

test('a integração da rota não altera a implementação dos oito jogos anteriores', () => {
  const restored = read('app.mjs')
    .replace("import {createOrbitaRoute} from './orbita/route.mjs';\n",'')
    .replaceAll('orbita.hide();','')
    .replace('const orbita=createOrbitaRoute({hideOthers(){repasse.hide();sintonia.hide();collection.hide();hideOriginalForSibling();}});\n','')
    .replace('if(!orbita.restoreOnLoad()&&!repasse.restoreOnLoad())','if(!repasse.restoreOnLoad())');
  assert.equal(restored,before('app.mjs'));
});

test('os estilos comuns apenas passam a atender o novo host, com todas as declarações preservadas', () => {
  const restored = read('platform.css')
    .replaceAll(', #orbita > .level-screen','')
    .replaceAll(', #orbita:not([hidden]) > .level-screen','')
    .replaceAll(', #orbita > .orbita-lab','')
    .replaceAll(', #orbita:not([hidden]) > .orbita-lab','');
  assert.equal(restored,before('platform.css'));
  assert.equal(read('style.css').replace(':is(#sintonia,#repasse,#orbita)',':is(#sintonia,#repasse)'),before('style.css'));
  assert.equal(read('game-info.css')
    .replaceAll(',#main > .games > button[data-orbita]','')
    .replaceAll(',#o-selection-title,#o-title',''),before('game-info.css'));
});

test('informações, animações e feedback dos jogos anteriores produzem os mesmos resultados', async () => {
  const oldInfo = (await previousModule('game-info-content.mjs')).GAME_INFO;
  const oldMotion = (await previousModule('result-motion.mjs')).resultMarkup;
  for (const game of existing) {
    assert.deepEqual(GAME_INFO[game],oldInfo[game],game);
    for (const win of [true,false]) {
      for (const options of [{},{retry:true},{winner:1}]) assert.equal(resultMarkup(game,win,options),oldMotion(game,win,options),game);
    }
  }
  assert.equal(GAME_INFO.orbita.name,'ÓRBITA');
  assert.match(resultMarkup('orbita',true),/PARABÉNS/);
  assert.match(resultMarkup('orbita',false),/Reiniciar fase imediatamente/);
});

test('a navegação mantém as oito rotas e inclui a seleção comum de ÓRBITA', async () => {
  const old = await previousModule('game-nav-scroll.mjs');
  for (const dataset of [{game:'light'},{game:'cut'},{collection:'elo'},{collection:'prumo'},{collection:'pacto'},{collection:'desvio'},{sintonia:'sintonia'},{repasse:'repasse'}]) {
    assert.equal(selectionSelector({dataset}),old.selectionSelector({dataset}));
    assert.equal(selectionSelector({dataset:{...dataset,infoGame:'ignored'}}),null);
  }
  assert.equal(selectionSelector({dataset:{orbita:'orbita'}}),'#orbita > .level-screen');
  assert.equal(selectionSelector({dataset:{orbita:'orbita',infoGame:'orbita'}}),null);
  for(const p of [-1,0,.25,.5,.75,1,2])assert.equal(easeNavigation(p),old.easeNavigation(p));
  for(const top of [-100,0,100,2000])assert.equal(selectionScrollTop(top,40,500),old.selectionScrollTop(top,40,500));
});

test('todos os motores, catálogos, dados, sprites e componentes não envolvidos são idênticos à produção anterior', () => {
  const files=execFileSync('git',['ls-tree','-r','--name-only',baseline,'--','dist'],{encoding:'utf8'}).trim().split('\n');
  for(const path of files){
    const name=path.slice(5);
    if(integrationFiles.has(name))continue;
    const original=execFileSync('git',['show',`${baseline}:${path}`],{maxBuffer:128*1024*1024});
    const current=fs.readFileSync(new URL('../'+path,import.meta.url));
    assert.ok(current.equals(original),`Arquivo anterior foi alterado: ${path}`);
  }
});
