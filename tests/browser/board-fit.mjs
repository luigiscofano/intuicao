import { FIT_BOARD_SELECTOR, boardHeightBudget } from '../../dist/board-fit.mjs';
const frame=document.querySelector('iframe'),out=document.getElementById('results');
const allGames=['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','divisa','pulso','foz','refugio','mirante','renovo','desvio','broto','cerco','enlace','vazante','mosaico','quinhao','estalo','dobra','acorde','lastro'];
const games = new URLSearchParams(location.search).get('games')?.split(',') || allGames;
const sizes=[[320,568],[360,640],[768,375],[1024,768],[1440,900]];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn){for(let i=0;i<80;i++){const found=fn();if(found)return found;await pause(50);}throw Error('Interface não ficou pronta');}
const visible=el=>el&&!el.closest('[hidden]')&&el.getClientRects().length;
const campaign='[data-level],[data-new-level],[data-s-level],[data-r-level],[data-o-level],[data-level-id]';
window.qaResults=[];
async function load(game,edge='last'){
 frame.src='../../dist/index.html?game='+game;
 await new Promise(resolve=>frame.onload=resolve);
 const d=frame.contentDocument;
 const hostId=['light','cut'].includes(game)?'selection':['elo','prumo','pacto','desvio'].includes(game)?'collection':['sintonia','repasse','orbita','broto','cerco'].includes(game)?game:['divisa','pulso','foz','refugio','mirante','renovo'].includes(game)?'logic-games':'versus-games';
 const host=await until(()=>{const el=d.getElementById(hostId);return visible(el)&&el;});
 const entry=await until(()=>[...host.querySelectorAll(campaign+',#nv-start,#b-start,#ce-start,[data-map]')].find(visible));
 const all=[...host.querySelectorAll(campaign)].filter(visible);
 if(all.length) (typeof edge==='number'?all.find(el=>Number(el.dataset.newLevel??el.dataset.level??el.dataset.sLevel??el.dataset.rLevel??el.dataset.oLevel)===edge-1)||all.at(-1):edge==='first'?all[0]:all.at(-1)).click();
 else {
  if(game==='broto') d.querySelector('[data-b-map]:last-child')?.click();
  if(game==='cerco') d.querySelector('[data-ce-map]:last-child')?.click();
  const resume=host.querySelector('#b-resume,#ce-resume,#nv-resume');
  (visible(resume)?resume:entry).click();
 }
 await until(()=>[...d.querySelectorAll(FIT_BOARD_SELECTOR)].some(visible));
 await pause(160);
 return d;
}
function measure(d,game,w,h,edge){
 const targets=[...d.querySelectorAll(FIT_BOARD_SELECTOR)].filter(visible);
 if(!targets.length)return [{game,edge,w,h,error:'Tabuleiro ausente na medição'}];
 return targets.map(board=>{
  const r=board.getBoundingClientRect(),parent=board.parentElement.getBoundingClientRect();
  const descendants=[...board.querySelectorAll('button,[data-cell],.elo-board-label')].filter(visible);
  const left=Math.min(r.left,...descendants.map(e=>e.getBoundingClientRect().left));
  const right=Math.max(r.right,...descendants.map(e=>e.getBoundingClientRect().right));
  return {game,edge,w,h,board:board.id||String(board.className),inline:board.style.maxWidth,winHeight:d.defaultView.innerHeight,visualHeight:d.defaultView.visualViewport?.height,width:Math.round(r.width),height:Math.round(r.height),budget:Math.round(boardHeightBudget(h)),horizontal:left>=-1&&right<=w+1,heightFit:r.height<=boardHeightBudget(h)+3,documentOverflow:d.documentElement.scrollWidth>w+1,cell:descendants[0]?Math.round(descendants[0].getBoundingClientRect().width):null};
 });
}
document.getElementById('run').onclick=async()=>{
 const results=[];out.textContent='Testando…';
 for(const game of games){
  try {
   frame.width=360;frame.height=640;const d=await load(game, Number(new URLSearchParams(location.search).get('level')) || 'last');
   for(const [w,h] of sizes){frame.width=w;frame.height=h;window.scrollTo(0,0);await pause(1100);results.push(...measure(d,game,w,h,Number(new URLSearchParams(location.search).get('level')) || 'last'));out.textContent=JSON.stringify({completed:game,count:results.length,failures:results.filter(x=>!x.horizontal||!x.heightFit||x.documentOverflow)},null,2);}
  }catch(e){results.push({game,error:e.message});}
 }
 window.qaResults=results;out.textContent=JSON.stringify({done:true,count:results.length,failures:results.filter(x=>x.error||!x.horizontal||!x.heightFit||x.documentOverflow),results},null,2);
};
document.getElementById('elo').onclick=async()=>{frame.width=360;frame.height=640;await load('elo',45);};
document.getElementById('repasse').onclick=async()=>{frame.width=360;frame.height=640;await load('repasse');};
