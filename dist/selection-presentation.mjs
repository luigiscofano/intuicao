import { presentCompletionStates } from "./level-completion-state.mjs";
import { presentDifficultyPalette } from './difficulty-palette.mjs';
// Apresentação comum: reutiliza controles e estados visuais, sem ler ou gravar saves.
export const SELECTION_GAMES = Object.freeze({
 light:'campaign',cut:'campaign',elo:'campaign',prumo:'campaign',pacto:'campaign',sintonia:'campaign',repasse:'campaign',orbita:'campaign',divisa:'campaign',pulso:'campaign',foz:'campaign',refugio:'campaign',mirante:'campaign',renovo:'campaign',
 desvio:'versus',broto:'versus',cerco:'versus',enlace:'versus',vazante:'versus',mosaico:'versus',quinhao:'versus',estalo:'versus',dobra:'versus',acorde:'versus',lastro:'versus'
});
const DAILY='#selection-daily, #c-daily, #s-daily, #r-daily, #o-daily, [data-logic-daily]';
const ENDLESS='#selection-free, #c-free, #s-endless-entry, #r-endless-entry, #o-endless-entry, [data-presentation-mode="endless"]';
const CATALOG='#level-grid, #s-catalog, #r-catalog, #o-catalog, .elo-stage, .prumo-stage, .pacto-stage, .logic-tier';
const SETUP=':scope > .vs-map-setup, .duel-maps, .b-map-setup, .ce-map-setup, .ce-setup-teams, .ce-setup-controls, .nv-preparation';
function node(doc,tag,className,text=''){const n=doc.createElement(tag);n.className=className;n.textContent=text;return n;}
function move(item,parent){if(item&&item.parentElement!==parent)parent.append(item);}
function section(root,key,title,description=''){
 let block=root.querySelector(`:scope > [data-selection-section="${key}"]`);
 if(!block){block=node(root.ownerDocument,'section',`selection-section selection-${key}`);block.dataset.selectionSection=key;
  if(title){const heading=node(root.ownerDocument,'h3','selection-section-title',title);heading.id=`selection-${root.id||root.closest('[id]')?.id||'game'}-${key}-title`;block.setAttribute('aria-labelledby',heading.id);block.append(heading);}
  if(description)block.append(node(root.ownerDocument,'p','selection-section-description',description));root.append(block);
 }return block;
}
function modeCard(root,area,kind,control,game){
 let card=area.querySelector(`[data-selection-mode="${kind}"]`);
 if(!card){card=node(root.ownerDocument,'section',`selection-mode selection-mode-${kind}`);card.dataset.selectionMode=kind;card.append(node(root.ownerDocument,'h3','selection-section-title',kind==='daily'?'Desafio diário':'Modo sem parar'));card.append(node(root.ownerDocument,'p','selection-section-description'));area.append(card);}
 const description=kind==='daily'?'Um desafio da campanha escolhido para hoje.':'Continue explorando no seu ritmo.';
 const p=card.querySelector('.selection-section-description');if(p.textContent!==description)p.textContent=description;
 const text=kind==='daily'?'Jogar desafio diário':'Jogar sem parar';if(control.textContent!==text)control.textContent=text;
 control.classList.add('selection-mode-button');move(control,card);
}
// Cada jogo já filtra registros antigos ao desenhar seu catálogo oficial.
// O contador reutiliza essas mesmas marcações, sem supor um total fixo de fases.
export function campaignCompletion(tiles) {
  const levels = [...new Set(tiles)];
  const completed = levels.filter(tile =>
    tile.classList.contains('done') || tile.classList.contains('completed')
  ).length;
  return { completed, total: levels.length };
}

export function presentCampaignProgress(root, game) {
  if (!root) return;
  let progress = root.querySelector(':scope > .campaign-progress');
  if (SELECTION_GAMES[game] !== 'campaign') {
    progress?.remove();
    return;
  }

  const tiles = [...root.querySelectorAll(CATALOG)].flatMap(catalog =>
    [...catalog.querySelectorAll('.level-tile, .logic-level')]
  );
  const { completed, total } = campaignCompletion(tiles);
  if (!total) {
    progress?.remove();
    return;
  }

  if (!progress) {
    progress = node(root.ownerDocument, 'p', 'campaign-progress');
    progress.setAttribute('role', 'status');
    progress.setAttribute('aria-live', 'polite');
    progress.setAttribute('aria-atomic', 'true');
    progress.append(
      node(root.ownerDocument, 'strong', 'campaign-progress-count'),
      node(root.ownerDocument, 'span', 'campaign-progress-total')
    );
  }

  const count = progress.querySelector('.campaign-progress-count');
  const label = progress.querySelector('.campaign-progress-total');
  const labelText = ` / ${total} concluídas`;
  if (count.textContent !== String(completed)) count.textContent = String(completed);
  if (label.textContent !== labelText) label.textContent = labelText;
  progress.setAttribute('aria-label', `${completed} de ${total} fases concluídas`);

  // Mantém o contador antes das regras, com a mesma ordem visual e de leitura.
  const anchor = root.querySelector(':scope > .selection-section');
  if (progress.nextElementSibling !== anchor || progress.parentElement !== root) {
    root.insertBefore(progress, anchor);
  }
}

export function presentSelection(root,game){
 if(!root||!Object.hasOwn(SELECTION_GAMES,game))return;
 root.classList.add('unified-selection');root.dataset.presentationGame=game;
 const rules=root.querySelector('#selection-rules, .logic-rules, .nv-rules, .rules-preview');if(!rules)return;
 const rulesBlock=section(root,'rules','');move(rules,rulesBlock);if(rules.matches('.nv-rules'))rules.open=true;
 const campaign=SELECTION_GAMES[game]==='campaign';
 const daily=campaign?root.querySelector(DAILY):null,endless=campaign?root.querySelector(ENDLESS):null;
 const modes=section(root,'modes','');modes.hidden=!daily&&!endless;
 if(daily)modeCard(root,modes,'daily',daily,game);if(endless)modeCard(root,modes,'endless',endless,game);
 if(daily&&endless){const first=modes.querySelector('[data-selection-mode="daily"]');if(modes.firstElementChild!==first)modes.prepend(first);}
 const catalogue=[...root.querySelectorAll(CATALOG)];let levels=root.querySelector(':scope > [data-selection-section="levels"]');
 if(catalogue.length){levels=section(root,'levels','Níveis');const extras=root.querySelector('.logic-mode-actions');if(extras&&extras.children.length)move(extras,levels);for(const item of catalogue)move(item,levels);
  const resumeId=extras?.querySelector('[data-level-id]')?.dataset.levelId;
  for(const tile of levels.querySelectorAll('.logic-level')){if(resumeId===tile.dataset.levelId)tile.setAttribute('aria-current','true');if(!tile.querySelector('.selection-level-state')){const name=tile.querySelector(':scope > span');if(name)tile.title=name.textContent;tile.append(node(root.ownerDocument,'small','selection-level-state',tile.classList.contains('completed')?'✓ concluído':'explorar'));}}
 }
 let setup=root.querySelector(':scope > [data-selection-section="setup"]');
 if(!campaign){setup=section(root,'setup','Prepare a partida','Escolha as opções disponíveis para este jogo.');const mapSetup=root.querySelector(':scope > .vs-map-setup');if(mapSetup)move(mapSetup,setup);for(const toolbar of root.querySelectorAll(':scope > .collection-toolbar'))if(!toolbar.classList.contains('selection-actions'))move(toolbar,setup);for(const item of root.querySelectorAll(SETUP))move(item,setup);const startDuel=root.querySelector('#c-start-duel');if(startDuel)move(startDuel,setup);const tactical=root.querySelector('#c-tactical');if(tactical)move(tactical,setup);for(const item of [...root.children])if(item.matches('.b-resume-panel, .ce-resume-card'))move(item,setup);}
 for(const toolbar of root.querySelectorAll('.selection-actions, .logic-mode-actions'))toolbar.hidden=![...toolbar.children].some(n=>!n.hidden);
 const imports=[...root.querySelectorAll(':scope > details')];
 // Mantém a ordem de leitura e de Tab no DOM, além da ordem visual.
 let anchor=null;for(const item of [rulesBlock,modes,levels,setup,...imports].filter(Boolean).reverse()){if(item.nextElementSibling!==anchor)root.insertBefore(item,anchor);anchor=item;}
 presentCampaignProgress(root,game);
 if(campaign){presentDifficultyPalette(root);presentCompletionStates(root);}
}
export function initSelectionPresentation(doc=globalThis.document,win=doc?.defaultView){
 const main=doc?.getElementById('main');if(!main||!win?.MutationObserver)return()=>{};let queued=false;
 const observer=new win.MutationObserver(()=>{if(!queued){queued=true;win.queueMicrotask(update);}});
 function update(){queued=false;observer.disconnect();const game=new URL(win.location.href).searchParams.get('game');for(const root of main.querySelectorAll('.level-screen'))if(!root.closest('[hidden]'))presentSelection(root,game);observer.observe(main,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});}
 update();win.addEventListener('popstate',update);return()=>{observer.disconnect();win.removeEventListener('popstate',update);};
}
if(typeof document!=='undefined')initSelectionPresentation();
