import { FIT_BOARD_SELECTOR } from './board-fit.mjs';

export const PLAY_PARTS = '.approved-game-heading, .approved-play-surface, .approved-action-panel';
export function centeredScrollTop(top, height, viewport, scrollY, maximum) {
  return Math.max(0, Math.min(maximum, scrollY + top - Math.max(0, (viewport - height) / 2)));
}
export function availableBoardHeight(boardHeight, contentHeight, viewportHeight, gap = 20) {
  return Math.max(72, boardHeight - Math.max(0, contentHeight - viewportHeight + gap));
}
const visible = node => node && !node.closest('[hidden]') && node.getClientRects().length;
export function playBounds(section) {
  const rects = [...section.querySelectorAll(PLAY_PARTS)].filter(visible).map(node => node.getBoundingClientRect());
  if (!rects.length) return null;
  const top = Math.min(...rects.map(rect => rect.top)), bottom = Math.max(...rects.map(rect => rect.bottom));
  return { top, bottom, height: bottom - top };
}
// O tamanho depende apenas da janela e do formato do tabuleiro. Mensagens,
// dicas, pontuação e painéis nunca entram nesse cálculo durante uma partida.
export function stableBoardHeight(viewportHeight, viewportWidth) {
  const reserve = viewportWidth <= 650 ? 200 : 100;
  return Math.max(80, viewportHeight - reserve);
}
export function stableBoardWidth(width, height, viewportHeight, viewportWidth) {
  if (![width, height].every(Number.isFinite) || width <= 0 || height <= 0) return width;
  return Math.max(1, Math.floor(Math.min(width, width * stableBoardHeight(viewportHeight, viewportWidth) / height)));
}
export function installGameViewport(doc = globalThis.document, win = globalThis) {
  const main = doc?.getElementById('main');
  if (!main || !win.requestAnimationFrame || !win.MutationObserver) return () => {};
  let frame=0, centerFrame=0, active=null, identity='', lastHeight=0, lastWidth=0, interrupted=0, disposed=false;
  const originals=new WeakMap();
  let fittedWidths=[];
  const observer=new win.MutationObserver(schedule);
  const observe=()=>observer.observe(main,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','open','disabled']});
  const resize=win.ResizeObserver ? new win.ResizeObserver(entries => {
    if (entries.some(e => Math.abs((widths.get(e.target)??-1)-e.contentRect.width)>.5)) {
      for(const e of entries) widths.set(e.target,e.contentRect.width);
      schedule();
    }
  }) : null;
  const widths=new Map();
  function schedule(){if(!disposed && !frame)frame=win.requestAnimationFrame(update);}
  function update(){
    frame=0;observer.disconnect();
    try {
      const surface=[...main.querySelectorAll('.approved-play-surface')].find(visible);
      const section=surface?.closest('.approved-game-section');
      if(!section){active=null;identity='';fittedWidths=[];return;}
      section.classList.add('viewport-game');
      if(active!==section){resize?.disconnect();widths.clear();resize?.observe(section);}
      const workspace=surface.parentElement;
      const reading=[...section.querySelectorAll('.contextual-guidance,.s-mission,.s-new-rule,.o-mission,.o-tutorial,.collection-replay,.cut-control-guide,.endless-panel,.nv-objective')].filter(node=>!node.closest('.viewport-instructions'));
      if(reading.length){
        let instructions=workspace.querySelector(':scope > .viewport-instructions');
        if(!instructions){instructions=doc.createElement('div');instructions.className='viewport-instructions';workspace.append(instructions);}
        for(const node of reading)instructions.append(node);
      }
      const endless=[...section.querySelectorAll('.endless-panel')].find(visible);
      let shortcuts=section.querySelector('.viewport-endless-shortcuts');
      if(endless){
        if(!shortcuts){
          shortcuts=doc.createElement('div');shortcuts.className='viewport-endless-shortcuts';
          const next=doc.createElement('button');next.type='button';next.textContent='+';next.setAttribute('aria-label','Novo desafio');next.title='Novo desafio';next.hidden=Boolean(section.querySelector('#c-next'));
          next.addEventListener('click',()=>section.querySelector('.endless-panel button:is([data-logic-endless-new],#c-endless-new,#s-endless-new,#r-endless-new,#o-endless-new,#original-endless-new)')?.click());
          const options=doc.createElement('button');options.type='button';options.textContent='⋯';options.setAttribute('aria-label','Opções sem parar');options.title='Opções sem parar';
          options.addEventListener('click',()=>{
            const panel=[...section.querySelectorAll('.endless-panel')].find(visible);if(!panel)return;
            const details=panel.matches('details')?panel:panel.querySelector('details');if(details)details.open=true;
            details?.querySelector('summary')?.focus({preventScroll:true});
            panel.scrollIntoView({block:'start',behavior:'instant'});
          });
          shortcuts.append(next,options);section.querySelector('.approved-real-actions')?.append(shortcuts);
        }
        shortcuts.hidden=false;
      }else if(shortcuts)shortcuts.hidden=true;
      // Abrevia só a repetição visual “Apoio”; o nome acessível original permanece.
      for(const button of section.querySelectorAll('#c-tools:has(#c-active-support) button')){
        button.dataset.viewportLabel=button.textContent.trim().replace(/^Apoio\s+/, '');
      }
      const before=playBounds(section);
      const visual=win.visualViewport;
      // O zoom do jogador não dispara uma tentativa de anulá-lo.
      const height=visual && Math.abs(visual.scale-1)<.01 ? visual.height : win.innerHeight;
      const title=section.querySelector('.approved-game-heading')?.textContent || '';
      const nextIdentity=`${new URL(win.location.href).searchParams.get('game')}|${title}`;
      const opening=active!==section || identity!==nextIdentity;
      const wasVisible=before && before.top<height && before.bottom>0;
      const resized=lastHeight && (Math.abs(lastHeight-height)>1 || Math.abs(lastWidth-win.innerWidth)>1);
      active=section;identity=nextIdentity;lastHeight=height;lastWidth=win.innerWidth;

      // Versus mantém sua área jogável estável. Pontuação, prévias e resultados
      // não podem roubar largura do tabuleiro a cada renderização da partida.
      // O CSS responsivo define as dimensões; conteúdo extra usa o fluxo da página.
      if (surface.classList.contains('approved-versus-surface')) {
        section.dataset.viewportFit = 'stable';
        if (opening || (resized && wasVisible)) center(section);
        return;
      }
      const boards=[...surface.querySelectorAll(FIT_BOARD_SELECTOR)].filter(visible);
      // Cada renderizador pode recriar o SVG. Conservamos a medida por posição
      // no mesmo nível, em vez de recalculá-la usando feedback que acabou de surgir.
      const refit = opening || resized || fittedWidths.length !== boards.length;
      if(refit) fittedWidths=[];
      boards.forEach((board,index)=>{
        if(!originals.has(board)) originals.set(board,{maxWidth:board.style.maxWidth,minWidth:board.style.minWidth});
        if(refit){
          board.style.maxWidth=originals.get(board).maxWidth;
          board.style.minWidth='0';
          const rect=board.getBoundingClientRect();
          fittedWidths[index]=stableBoardWidth(rect.width,rect.height,height,win.innerWidth);
        }
        board.style.minWidth='0';
        board.style.maxWidth=`${fittedWidths[index]}px`;
      });
      // Não criamos uma janela recortada nem controles para deslocar o mapa.
      // Em zoom/altura extrema, a página continua rolável e os comandos acessíveis.
      section.dataset.viewportFit='stable';
      if(opening || (resized && wasVisible))center(section);
    } finally {observe();}
  }
  function center(section){
    const token=interrupted;
    if(centerFrame)win.cancelAnimationFrame(centerFrame);
    centerFrame=win.requestAnimationFrame(()=>{
      centerFrame=0;
      if(token!==interrupted || section!==active || !visible(section))return;
      const bounds=playBounds(section);if(!bounds)return;
      const height=win.visualViewport && Math.abs(win.visualViewport.scale-1)<.01 ? win.visualViewport.height : win.innerHeight;
      const maximum=Math.max(0,(doc.scrollingElement||doc.documentElement).scrollHeight-height);
      // Instantâneo evita movimento desnecessário e respeita reduced-motion sempre.
      win.scrollTo({top:centeredScrollTop(bounds.top,bounds.height,height,win.scrollY,maximum),left:win.scrollX,behavior:'instant'});
    });
  }
  const interrupt=()=>{interrupted++;if(centerFrame)win.cancelAnimationFrame(centerFrame);centerFrame=0;};
  const events=['wheel','touchstart','pointerdown','keydown'];
  for(const event of events)win.addEventListener(event,interrupt,{passive:true,capture:true});
  win.addEventListener('resize',schedule);win.addEventListener('popstate',schedule);
  win.visualViewport?.addEventListener('resize',schedule);doc.fonts?.ready.then(schedule);
  observe();schedule();
  return()=>{disposed=true;observer.disconnect();resize?.disconnect();if(frame)win.cancelAnimationFrame(frame);if(centerFrame)win.cancelAnimationFrame(centerFrame);for(const event of events)win.removeEventListener(event,interrupt,true);win.removeEventListener('resize',schedule);win.removeEventListener('popstate',schedule);win.visualViewport?.removeEventListener('resize',schedule);};
}
if(globalThis.document)installGameViewport();
