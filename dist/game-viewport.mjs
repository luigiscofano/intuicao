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
function boardScrollHost(board) {
  return board.closest('.logic-board, .scene-wrap, .collection-board-wrap, .s-play-area, .r-board-scroll, .o-board-scroll') || board.parentElement;
}
function minimumBoardWidth(board, width) {
  // Estes tabuleiros contêm rótulos e coleções além das casas clicáveis.
  // O alvo de toque sozinho não protege esses conteúdos de sobreposição.
  const readableWidths = [['.acorde-board', 260], ['.quinhao-plot', 280], ['.dobra-grid', 270]];
  const readable = readableWidths.find(([selector]) => board.matches?.(selector));
  if (readable) return readable[1];
  // Conserva alvos de pelo menos 24 CSS px onde existe uma grade de botões.
  // Não altera os viewBoxes nem as coordenadas lógicas dos jogos.
  const targets = [...board.querySelectorAll('button, [role="button"], [role="gridcell"], .s-cell')].filter(visible).filter(target=>!target.matches?.('.support-marker'));
  // PRUMO tem a mesma escolha nos botões de apoio de 44 px acima da grade.
  const edges = targets.map(target => {const r=target.getBoundingClientRect();return Math.min(r.width,r.height);}).filter(n => n>1);
  const edge = edges.length ? Math.min(...edges) : null;
  return edge ? Math.min(width * 2, Math.max(96, width * 24 / edge)) : Math.min(width, 140);
}
export function installGameViewport(doc = globalThis.document, win = globalThis) {
  const main = doc?.getElementById('main');
  if (!main || !win.requestAnimationFrame || !win.MutationObserver) return () => {};
  let frame=0, centerFrame=0, active=null, identity='', lastHeight=0, lastWidth=0, interrupted=0, disposed=false;
  const originals=new WeakMap(), scrollHosts=new Map();
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
  function restoreHosts(){
    for(const [host,saved] of scrollHosts){
      host.style.maxHeight=saved.maxHeight;host.classList.remove('viewport-board-scroll');
      if(saved.tabIndex===null)host.removeAttribute('tabindex');else host.setAttribute('tabindex',saved.tabIndex);
    }
    scrollHosts.clear();
  }
  function update(){
    frame=0;observer.disconnect();
    try {
      const surface=[...main.querySelectorAll('.approved-play-surface')].find(visible);
      const section=surface?.closest('.approved-game-section');
      if(!section){active=null;identity='';restoreHosts();return;}
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
      const offsets=new Map([...scrollHosts.keys()].map(host=>[host,[host.scrollLeft,host.scrollTop]]));
      restoreHosts();
      let note=surface.querySelector(':scope > .viewport-fit-note');
      if(note)note.hidden=true;
      const boards=[...surface.querySelectorAll(FIT_BOARD_SELECTOR)].filter(visible);
      const minima=new Map();
      for(const board of boards){
        if(!originals.has(board))originals.set(board,{maxWidth:board.style.maxWidth,minWidth:board.style.minWidth});
        board.style.maxWidth=originals.get(board).maxWidth;board.style.minWidth=originals.get(board).minWidth;
        const width=board.getBoundingClientRect().width,min=minimumBoardWidth(board,width);
        minima.set(board,min);
        if(min>width+1)board.style.minWidth=`${Math.ceil(min)}px`;
      }
      // Medir o conjunto, não só o SVG: inclui turnos, ferramentas, setas e ações.
      for(let step=0;step<10;step++){
        const bounds=playBounds(section);
        if(!bounds || bounds.height<=height-20)break;
        let changed=false;
        for(const board of boards){
          const rect=board.getBoundingClientRect();
          const budget=availableBoardHeight(rect.height,bounds.height,height);
          const width=Math.max(minima.get(board),Math.floor(rect.width*budget/rect.height));
          if(width<rect.width-.5){board.style.maxWidth=`${width}px`;changed=true;}
        }
        if(!changed)break;
      }
      // Telas extremas e grades densas: mantém leitura/toque e todos os comandos.
      // Só o tabuleiro ganha rolagem local, com acesso por teclado e aviso explícito.
      let bounds=playBounds(section), constrained=false;
      const wide=boards.some(board=>{const host=boardScrollHost(board);return host && board.getBoundingClientRect().width>host.clientWidth+1;});
      if(bounds && (bounds.height>height-18 || wide)){
        if(!note){
          note=doc.createElement('div');note.className='viewport-fit-note';
          const label=doc.createElement('span');label.textContent='Mover tabuleiro';note.append(label);
          for(const [symbol,x,y,name] of [['←',-1,0,'esquerda'],['↑',0,-1,'cima'],['↓',0,1,'baixo'],['→',1,0,'direita']]){
            const button=doc.createElement('button');button.type='button';button.textContent=symbol;
            button.setAttribute('aria-label',`Mover tabuleiro para ${name}`);
            button.addEventListener('click',()=>{for(const host of scrollHosts.keys())if(visible(host))host.scrollBy({left:x*96,top:y*96,behavior:'instant'});});
            note.append(button);
          }
          surface.append(note);
        }
        note.hidden=false;
        for(const board of boards){
          const host=boardScrollHost(board);
          if(!host || scrollHosts.has(host))continue;
          const rect=host.getBoundingClientRect();bounds=playBounds(section);
          const budget=availableBoardHeight(rect.height,bounds.height,height);
          const tooWide=board.getBoundingClientRect().width>host.clientWidth+1;
          if(budget>=rect.height-1 && !tooWide)continue;
          scrollHosts.set(host,{maxHeight:host.style.maxHeight,tabIndex:host.getAttribute('tabindex')});
          host.style.maxHeight=`${Math.floor(Math.min(rect.height,budget))}px`;host.classList.add('viewport-board-scroll');
          if(!host.hasAttribute('tabindex') || Number(host.getAttribute('tabindex'))<0)host.setAttribute('tabindex','0');
          constrained=true;
        }
        if(!constrained)note.hidden=true;
      }
      for(const [host,[left,top]] of offsets)if(scrollHosts.has(host)){host.scrollLeft=left;host.scrollTop=top;}
      section.dataset.viewportFit=constrained?'scroll':'complete';
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
  return()=>{disposed=true;observer.disconnect();resize?.disconnect();restoreHosts();if(frame)win.cancelAnimationFrame(frame);if(centerFrame)win.cancelAnimationFrame(centerFrame);for(const event of events)win.removeEventListener(event,interrupt,true);win.removeEventListener('resize',schedule);win.removeEventListener('popstate',schedule);win.visualViewport?.removeEventListener('resize',schedule);};
}
if(globalThis.document)installGameViewport();
