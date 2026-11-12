import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resultMarkup, createResultMotion } from '../dist/result-motion.mjs';
import { victoryTilesMarkup } from '../dist/victory-tiles.mjs';
import { LOGIC_GAMES } from '../dist/logica/metadata.mjs';
const root = new URL('../', import.meta.url);
const baseline = 'cdc5c756a340c7613c62cded00650ef98d267ec7';
const git = path => execFileSync('git', ['show', `${baseline}:${path}`], {cwd:root,encoding:'utf8'});
const read = path => readFileSync(new URL(path,root),'utf8');
const oldCode = git('dist/result-motion.mjs').replace(/from '([^']+)'/g, (_, path) => `from '${new URL(path, new URL('dist/result-motion.mjs', root)).href}'`);
const old = await import(`data:text/javascript;base64,${Buffer.from(oldCode).toString('base64')}`);
const campaigns = [...LOGIC_GAMES.map(g=>g.id), 'light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'orbita'];

for (const game of campaigns) test(`${game}: opção A na vitória, falha e retry preservados`, () => {
  const html=resultMarkup(game,true);
  assert.match(html,/tile-victory/);
  assert.match(html,/Parabéns!/);
  assert.equal((html.match(/class="victory-tile victory-tile-/g)||[]).length,4);
  assert.doesNotMatch(html,/celebration-overlay|game-victory-art/);
  assert.match(resultMarkup(game,true,{animate:false}),/victory-tiles-static/);
  assert.equal(resultMarkup(game,false),old.resultMarkup(game,false));
  assert.match(resultMarkup(game,true,{retry:true}),/data-result-retry/);
});

function rig(getVictoryState) {
  let writes=0,retries=0,html='';
  const classes=new Set(), timers=new Map();
  const button={disabled:false};
  const host={dataset:{},setAttribute(){},querySelector(){return html.includes('data-result-retry')?button:null;},
    get innerHTML(){return html;},set innerHTML(value){writes++;html=value;}};
  const surface={offsetWidth:100,classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)}};
  const clock={setTimeout(fn,ms){const id=Symbol();timers.set(id,{fn,ms});return id;},clearTimeout:id=>timers.delete(id)};
  const motion=createResultMotion(host,surface,clock,{getVictoryState,onRetry(){retries++;}});
  return {host,motion,classes,timers,button,get writes(){return writes;},get retries(){return retries;}};
}

test('vitória da campanha não altera palco, não espera timer e não se repete no mesmo estado',()=>{
  const state={},r=rig(()=>state);
  r.motion.show('light',true);
  assert.equal(r.timers.size,0);assert.equal(r.classes.size,0);
  r.motion.show('light',true);assert.equal(r.writes,1);
  r.motion.clear();r.motion.show('light',true);
  assert.match(r.host.innerHTML,/victory-tiles-static/);
  assert.equal(r.timers.size,0);
});
test('falha mantém feedback, permite retry imediato uma vez e limpa o ciclo',()=>{
  const r=rig();r.motion.show('light',false);
  assert.ok(r.classes.has('result-failure'));assert.equal([...r.timers.values()][0].ms,300);
  r.button.onclick();r.button.onclick();assert.equal(r.retries,1);
  r.motion.clear();assert.equal(r.timers.size,0);assert.equal(r.classes.size,0);assert.equal(r.host.innerHTML,'');
});
test('DESVIO permanece exatamente igual, inclusive apresentação e ciclo',()=>{
  for (const success of [true,false]) for(const options of [{},{winner:1},{winner:2},{animate:false},{retry:true}]) {
    assert.equal(resultMarkup('desvio',success,options),old.resultMarkup('desvio',success,options));
  }
  const r=rig();r.motion.show('desvio',true);assert.ok(r.classes.has('result-success'));assert.equal([...r.timers.values()][0].ms,1100);
});
test('campanhas mantêm sua arte separada dos emblemas Versus autorizados depois',()=>{
  assert.doesNotMatch(read('dist/result-motion.mjs'),/versus-victory-art/);
  assert.doesNotMatch(read('dist/versus-victory.mjs'),/victoryTilesMarkup|PARABÉNS/);
  assert.match(read('dist/versus/ui.mjs'),/renderVersusVictory/);
});
test('arte decorativa finita, local e com redução de movimento',()=>{
  assert.match(victoryTilesMarkup(),/aria-hidden="true" focusable="false"/);
  assert.doesNotMatch(victoryTilesMarkup(),/<text|<image|href=/);
  const css=read('dist/victory-tiles.css');
  assert.match(css,/prefers-reduced-motion: reduce/);assert.match(css,/data-ui-reduced-motion='true'/);
  assert.doesNotMatch(css,/infinite|\.experiment|#scene|\.versus/);
  assert.doesNotMatch(read('dist/victory-tiles.mjs'),/localStorage|sessionStorage|fetch\(/);
});
