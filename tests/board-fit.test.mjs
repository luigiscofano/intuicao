import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { boardHeightBudget, nextBoardWidth, FIT_BOARD_SELECTOR, installBoardFit } from '../dist/board-fit.mjs';
const css = readFileSync(new URL('../dist/board-fit.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('reserva margem dentro de alturas reais, inclusive celular deitado', () => {
  for (const height of [320,375,568,667,768,900,1080]) {
    const budget = boardHeightBudget(height);
    assert(budget > 0 && budget <= height - 64);
    for (const [w,h] of [[640,640],[440,660],[680,460],[320,800]]) {
      const next = nextBoardWidth(w,h,budget);
      assert(next <= w);
      assert(next * h / w <= budget + 1 || h <= budget + 1);
    }
  }
});
test('não amplia um tabuleiro que já cabe e tolera dados ausentes', () => {
  assert.equal(nextBoardWidth(200,200,600),200);
  assert.equal(nextBoardWidth(200,0,600),200);
  assert.equal(boardHeightBudget(undefined),boardHeightBudget(768));
});
test('cobre as famílias dos 25 jogos, sem atuar em miniaturas ou vitórias', () => {
  for (const target of ['#scene','#c-board','#s-boards','#r-board','#o-board','.b-lab','.ce-lab','.logic-lab','enlace-board','vazante-river-frame','mosaico-board-wrap','quinhao-plot','dobra-map','acorde-board','lastro-instrument']) assert(FIT_BOARD_SELECTOR.includes(target),target);
  assert(!FIT_BOARD_SELECTOR.includes('victory'));
  assert(!FIT_BOARD_SELECTOR.includes('estalo-coordinates'), 'Estalo usa CSS estável');
});
test('carrega depois dos estilos e módulos existentes', () => {
  assert(html.indexOf('board-fit.css') > html.indexOf('identity.css'));
  assert(html.includes('src="board-fit.mjs"'));
  assert.match(css, /#c-board[\s\S]*?min-width: 0/);
  assert.match(css, /repeat\(var\(--r-inner-cols\), minmax\(0, 1fr\)\)/);
  assert(!css.includes('zoom:') && !css.includes('transform:'));
});
test('reajusta ao redimensionar, volta ao tamanho natural e limpa observadores', () => {
  const callbacks = {}, queue = new Map(); let id=0, resize, mutation;
  let natural=700; const board={style:{maxWidth:''}, parentElement:{clientWidth:700}, closest:()=>null,getClientRects:()=>[{}],getBoundingClientRect(){const width=Math.min(natural,parseFloat(this.style.maxWidth)||natural);return {width,height:width+30};}};
  const doc={getElementById:()=>({querySelectorAll:()=>[board]})};
  const win={innerHeight:400,requestAnimationFrame:fn=>{queue.set(++id,fn);return id;},cancelAnimationFrame:n=>queue.delete(n),addEventListener:(k,fn)=>callbacks[k]=fn,removeEventListener:k=>delete callbacks[k],ResizeObserver:class{constructor(fn){resize=fn;}observe(){}unobserve(){}disconnect(){this.disconnected=true;}},MutationObserver:class{constructor(fn){mutation=fn;}observe(){}disconnect(){}}};
  const flush=()=>{const work=[...queue.values()];queue.clear();work.forEach(fn=>fn());};
  const stop=installBoardFit(doc,win); flush();
  assert(board.getBoundingClientRect().height<=boardHeightBudget(400)+2);
  win.innerHeight=1000; callbacks.resize();flush();assert.equal(board.getBoundingClientRect().width,700);
  natural=300; resize([{target:board.parentElement,contentRect:{width:300}}]);flush();assert.equal(board.getBoundingClientRect().width,300);
  mutation();mutation();assert.equal(queue.size,1);stop();assert.equal(queue.size,0);assert(!callbacks.resize);
});
test('ajuste não acessa nem modifica persistência, regras, foco ou gestos', () => {
  const source=readFileSync(new URL('../dist/board-fit.mjs',import.meta.url),'utf8');
  assert(!/localStorage|sessionStorage|\.focus\(|\.transform\s*=|\.innerHTML\s*=|preventDefault/.test(source));
});
