// Read-only projection of existing campaign records. No new save key or positional migration.
import {lightLevels,cutLevels} from './levels.mjs';
import {GEOMETRY_LEVELS} from './geometry-levels.mjs';
import {SYMBOL_LEVELS} from './symbol-levels.mjs';
import {CAMPAIGN as sintonia,DIFFICULTIES as sintoniaTiers} from './sintonia/campaign.mjs';
import {CAMPAIGN as repasse,DIFFICULTIES as repasseTiers} from './repasse/campaign.mjs';
import {CAMPAIGN as orbita,campaignTier} from './orbita/campaign.mjs';
import {normalizeSintoniaData} from './sintonia/ui.mjs';
import {normalizeRepasseData} from './repasse/ui.mjs';
import {normalizeOrbitaData} from './orbita/ui.mjs';
const record=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const tiers=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const lightBands=['basic','apprentice','intermediate','advanced','master','sage'];
export const ACHIEVEMENT_GAMES=Object.freeze([
 {id:'light',name:'Reflexos',levels:lightLevels,tier:(l,i)=>tiers[lightBands.indexOf(l.campaignBand)]??tiers[Math.min(5,Math.floor(((l.campaignNumber??i+1)-1)/15))]},
 {id:'cut',name:'Corte certo',levels:cutLevels,tier:l=>l.tier},
 {id:'elo',name:'ELO',levels:GEOMETRY_LEVELS.elo,tier:l=>l.difficulty},
 {id:'prumo',name:'PRUMO',levels:GEOMETRY_LEVELS.prumo,tier:l=>l.difficulty},
 {id:'pacto',name:'PACTO',levels:SYMBOL_LEVELS.pacto,tier:l=>l.difficulty},
 {id:'sintonia',name:'SINTONIA',levels:sintonia,tier:l=>sintoniaTiers[l.difficulty]},
 {id:'repasse',name:'REPASSE',levels:repasse,tier:l=>repasseTiers[l.difficulty]},
 {id:'orbita',name:'ÓRBITA',levels:orbita,tier:(_,i)=>campaignTier(i+1)?.name}
]);
const definitions=[
 ['first','Primeira descoberta','Conclua 1 nível de campanha.',1,'total','01'],
 ['ten','Dez descobertas','Conclua 10 níveis diferentes de campanha.',10,'total','10'],
 ['fifty','Caminho de descobertas','Conclua 50 níveis diferentes de campanha.',50,'total','50'],
 ['hundred','Cem possibilidades','Conclua 100 níveis diferentes de campanha.',100,'total','100'],
 ['hard','Além do primeiro olhar','Conclua 1 nível Avançado, Mestre ou Modo Sábio.',1,'hard','✦'],
 ['all-games','Muitas formas de pensar','Conclua ao menos 1 nível em cada uma das 8 campanhas.',8,'explored','08']
];
export function readAchievements(storage){
 const warnings=[];
 if(arguments.length===0){try{storage=globalThis.localStorage;}catch{warnings.push('Não foi possível acessar o armazenamento deste navegador.');}}
 function read(key){try{const raw=storage?.getItem(key);if(!raw)return null;if(raw.length>8000000)throw Error('oversize');return JSON.parse(raw);}catch{warnings.push('Um registro local não pôde ser lido. Ele foi preservado.');return null;}}
 const collection=read('intuicao.collection.v1');
 const collected=new Set(collection?.version===1&&Array.isArray(collection.completed)?collection.completed.filter(x=>typeof x==='string'):[]);
 const completed={elo:collected,prumo:collected,pacto:collected};
 for(const game of ['light','cut']){const data=read(`intuicao.campaign.${game}.progress.v1`);completed[game]=new Set(data?.version===1&&Array.isArray(data.completedIds)?data.completedIds.filter(x=>typeof x==='string'):[]);}
 for(const [game,normalize] of [['sintonia',normalizeSintoniaData],['repasse',normalizeRepasseData],['orbita',normalizeOrbitaData]]){
  const data=read(`intuicao.${game}.v1`);
  try{
   // Malformed items are not completion evidence. Normalize a detached copy only.
   if(record(data?.campaign?.completed))data.campaign.completed=Object.fromEntries(Object.entries(data.campaign.completed).filter(([,value])=>record(value)));
   const normalized=normalize(data);
   completed[game]=new Set(Object.keys(normalized.campaign.completed));
  }catch{completed[game]=new Set();warnings.push('Um registro de campanha não pôde ser interpretado. Ele foi preservado.');}
 }
 let total=0,hard=0,explored=0;
 const games=ACHIEVEMENT_GAMES.map(game=>{
  const levels=game.levels.filter(level=>completed[game.id].has(typeof level.id==='number'?String(level.id):level.id));
  const count=levels.length;total+=count;if(count)explored++;
  for(const [i,level] of game.levels.entries())if(levels.includes(level)&&tiers.slice(3).includes(game.tier(level,i)))hard++;
  return {id:game.id,name:game.name,total:game.levels.length,completed:count};
 });
 const stats={total,hard,explored};
 return {...stats,available:games.reduce((sum,g)=>sum+g.total,0),games,warnings:[...new Set(warnings)],achievements:definitions.map(([id,name,description,target,metric,symbol])=>({id,name,description,target,symbol,current:Math.min(target,stats[metric]),unlocked:stats[metric]>=target}))};
}
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderAchievements(container,storage){
 const data=arguments.length>1?readAchievements(storage):readAchievements();
 const unlocked=data.achievements.filter(item=>item.unlocked).length;
 container.innerHTML=`<div class="achievement-heading"><p class="eyebrow">CADA DESCOBERTA CONTA</p><h2 id="achievements-title" tabindex="-1">Suas conquistas</h2><p>Um registro do que você já descobriu, no seu ritmo.</p></div><div class="achievement-summary" aria-label="Resumo do progresso"><div><strong>${data.total}<span> / ${data.available}</span></strong><p>Níveis concluídos</p></div><div><strong>${unlocked}<span> / ${data.achievements.length}</span></strong><p>Conquistas desbloqueadas</p></div><div><strong>${data.hard}</strong><p>Desafios avançados concluídos</p></div></div>${data.warnings.map(w=>`<p class="achievement-warning" role="status">${esc(w)}</p>`).join('')}<ul class="achievement-grid" aria-label="Conquistas">${data.achievements.map(a=>`<li class="achievement-card ${a.unlocked?'is-unlocked':''}"><span class="achievement-symbol" aria-hidden="true">${a.symbol}</span><p class="achievement-state">${a.unlocked?'Desbloqueada':'Em descoberta'}</p><h3>${a.name}</h3><p>${a.description}</p><label for="achievement-${a.id}">${a.current} de ${a.target}</label><progress id="achievement-${a.id}" value="${a.current}" max="${a.target}">${a.current} de ${a.target}</progress></li>`).join('')}</ul><section class="achievement-campaigns" aria-labelledby="achievement-campaign-title"><h3 id="achievement-campaign-title">Seu caminho em cada jogo</h3><ul>${data.games.map(g=>`<li><a href="?game=${g.id}">${g.name}<span>${g.completed} / ${g.total} concluídos <span aria-hidden="true">→</span></span></a></li>`).join('')}</ul></section><details class="achievement-criteria"><summary>Como as conquistas são contadas</summary><p>Contamos uma vez cada nível das 8 campanhas atuais cuja conclusão está salva neste navegador. Repetir o nível não aumenta o total. Conclusões assistidas também contam.</p><p>Desafios avançados são os níveis das etapas Avançado, Mestre e Modo Sábio, conforme a classificação editorial de cada jogo. Não significa dificuldade calibrada com jogadores.</p><p>Modo Sem Parar, fases importadas, campanhas antigas arquivadas e partidas Versus não entram nesta contagem. Não inferimos conclusões a partir de tentativas, acesso a gabaritos ou níveis visitados. As conquistas refletem os registros existentes, sem inventar a data da descoberta.</p><p>Seu progresso continua local: não é sincronizado entre dispositivos. Limpar os dados do navegador pode removê-lo. Abrir esta tela não altera nem apaga seus saves.</p></details>`;
 return data;
}
