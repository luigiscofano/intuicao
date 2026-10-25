// Local, data-only formats for Reflexos and Corte certo. No code is evaluated.
import {assertJSONData,customIdentity} from './level-json-common.mjs';
import {shapePolygon,shapes,families,basicCutState,curvedCut,regionGeometry,secondBound} from './curves.mjs';
import {traceLightWorld} from './light-world.mjs';
import {area,cutSuccess} from './math.mjs';
const COLORS=['gold','blue','pink'];
const optional=(value,fallback)=>value===undefined?fallback:value;
const fail=message=>{throw new Error(message);};
const object=(v,label)=>v&&typeof v==='object'&&!Array.isArray(v)?v:fail(`${label}: use um objeto JSON.`);
const number=(v,label,min,max)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max?v:fail(`${label}: use um número entre ${min} e ${max}.`);
const list=(v,label,min,max)=>Array.isArray(v)&&v.length>=min&&v.length<=max?v:fail(`${label}: use uma lista com ${min} a ${max} itens.`);
const text=(v,fallback,max)=>v===undefined?fallback:typeof v==='string'&&v.trim().length>0&&v.length<=max?v.trim():fail(`Texto inválido: use de 1 a ${max} caracteres.`);
const color=(v,label)=>COLORS.includes(v)?v:fail(`${label}: use gold, blue ou pink.`);
const point=(v,label)=>{object(v,label);return {x:number(v.x,`${label}.x`,0,800),y:number(v.y,`${label}.y`,0,460)};};
const identifier=(v,label)=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,40}$/.test(v)?v:fail(`${label}: use até 40 letras, números, _ ou -.`);
const angle=(v,label,min=-360,max=360)=>number(v,label,min,max);
const sourceAngle=v=>{const a=angle(v,'Ângulo da fonte',-3600,3600);return a>=0&&a<360?a:((a%360)+360)%360;};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function common(input,game){
 assertJSONData(input);object(input,'Fase');
 if(input.game!==game||!['light','cut'].includes(game))fail('Use um JSON do jogo selecionado: game deve ser light (Reflexos) ou cut (Corte certo).');
 if(input.schemaVersion!==undefined&&input.schemaVersion!==1)fail('Versão JSON não suportada. Use schemaVersion: 1.');
 return {schemaVersion:1,game,id:text(input.id,`custom-${game}`,100),name:text(input.name,'Meu nível',100)};
}
function light(input){
 const l=common(input,'light');
 l.sources=list(input.sources,'sources',1,3).map((s,i)=>({...point(s,`sources[${i}]`),angle:sourceAngle(optional(s.angle,0)),color:color(s.color,`sources[${i}].color`)}));
 if(new Set(l.sources.map(s=>s.color)).size!==l.sources.length)fail('Cada fonte precisa ter uma cor diferente.');
 l.targets=list(input.targets,'targets',l.sources.length,l.sources.length).map((t,i)=>({...point(t,`targets[${i}]`),radius:number(optional(t.radius,22),`targets[${i}].radius`,22,22),color:color(t.color,`targets[${i}].color`)}));
 if(new Set(l.targets.map(t=>t.color)).size!==l.targets.length||l.sources.some(s=>!l.targets.some(t=>t.color===s.color)))fail('Forneça exatamente um alvo de cada cor usada nas fontes.');
 l.objects=list(input.objects,'objects',1,64).map((o,i)=>{object(o,`objects[${i}]`);if(!['mirror','wall'].includes(o.type))fail('Objetos devem ser mirror (espelho) ou wall (parede).');return {...point(o,`objects[${i}]`),type:o.type,length:number(o.length,`objects[${i}].length`,1,800),angle:angle(o.angle,`objects[${i}].angle`,o.type==='mirror'?-90:-360,o.type==='mirror'?90:360),...(o.type==='wall'?{width:number(optional(o.width,12),`objects[${i}].width`,1,200)}:{})};});
 const mirrors=l.objects.filter(o=>o.type==='mirror').length;
 if(!mirrors)fail('Reflexos precisa de pelo menos um espelho ajustável.');
 l.portals=list(optional(input.portals,[]),'portals',0,16).map((p,i)=>{object(p,`portals[${i}]`);const colors=p.colors==null?undefined:list(p.colors,`portals[${i}].colors`,1,3).map(c=>color(c,'Cor do portal'));if(colors&&new Set(colors).size!==colors.length)fail('Não repita cores em um portal.');return {...point(p,`portals[${i}]`),id:identifier(p.id,'id do portal'),pairId:identifier(p.pairId,'pairId do portal'),label:identifier(optional(p.label,p.id),'label do portal'),radius:number(optional(p.radius,16),'Raio do portal',4,48),...(colors?{colors}:{})};});
 if(new Set(l.portals.map(p=>p.id)).size!==l.portals.length)fail('IDs de portais não podem se repetir.');
 for(const p of l.portals){const partner=l.portals.find(q=>q.id===p.pairId);if(!partner||partner===p||partner.pairId!==p.id)fail('Cada portal deve apontar para seu par, e o par deve apontar de volta.');}
 if(input.solution===undefined)fail('Reflexos: inclua solution com um ângulo por espelho, na ordem de objects. Não há busca automática segura para esta cena.');
 l.solution=list(input.solution,'solution',mirrors,mirrors).map((a,i)=>angle(a,`solution[${i}]`,-90,90));
 l.target={...l.targets[0]};l.sourceAngle=l.sources[0].angle;l.wallPurpose=[];
 if(traceLightWorld(originalLevelAnswer(l)).status!=='target')fail('A solução de Reflexos não leva todas as fontes aos alvos sem colisões. Corrija solution ou a geometria.');
 return l;
}
function simplePolygon(points){
 const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
 const on=(a,b,c)=>Math.abs(cross(a,b,c))<1e-8&&c.x>=Math.min(a.x,b.x)-1e-8&&c.x<=Math.max(a.x,b.x)+1e-8&&c.y>=Math.min(a.y,b.y)-1e-8&&c.y<=Math.max(a.y,b.y)+1e-8;
 const intersects=(a,b,c,d)=>{const x=cross(a,b,c),y=cross(a,b,d),z=cross(c,d,a),w=cross(c,d,b);return (x*y<0&&z*w<0)||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b);};
 for(let i=0;i<points.length;i++){if(points.some((p,j)=>j!==i&&Math.hypot(p.x-points[i].x,p.y-points[i].y)<1e-6))return false;for(let j=i+1;j<points.length;j++)if(j!==i+1&&!(i===0&&j===points.length-1)&&intersects(points[i],points[(i+1)%points.length],points[j],points[(j+1)%points.length]))return false;}
 return area(points)>1;
}
// Bound the synchronous engine before calling it. A valid polygon can leave a
// near-zero-width sliver whose adaptive sampling would otherwise take billions
// of steps. The estimate covers every reachable center, rotation, amplitude and
// frequency, not just the submitted solution; accepted levels are rendered live.
function cutControlBounds(level){
 const a=level.basicDirection*Math.PI/180,origin=level.basicOrigin;
 const xs=[-400,1200,...[level.basicMin,level.basicMax].map(v=>origin.x+Math.cos(a)*v)];
 const ys=[-400,860,...[level.basicMin,level.basicMax].map(v=>origin.y+Math.sin(a)*v)];
 return {minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys)};
}
function assertCutWorkBudget(level,poly,geometry){
 if(level.family==='Reta')return; // Straight cuts use exact clipping, not adaptive sampling.
 const bounds=cutControlBounds(level),amplitude=level.permissions.amplitude?120:Math.abs(level.amplitude),frequency=level.permissions.frequency?2:level.frequency;
 let total=0;
 for(const piece of [poly,...geometry.pieces]){
  const size=area(piece);let diameter2=0,maxU=0;
  for(const p of piece){for(const q of piece)diameter2=Math.max(diameter2,(p.x-q.x)**2+(p.y-q.y)**2);
   for(const x of [bounds.minX,bounds.maxX])for(const y of [bounds.minY,bounds.maxY])maxU=Math.max(maxU,Math.hypot(p.x-x,p.y-y));}
  if(!(size>0&&diameter2>0)||size/diameter2<.0001)fail('Recorte fino demais para desenhar curvas com segurança. Afaste suas bordas ou use Reta.');
  const span=Math.sqrt(diameter2),M=secondBound(level.family,amplitude,frequency,maxU);
  const step=M>0?Math.min(1,Math.sqrt(.0008*size/(span*M))):1;
  // cutSolid samples each strip and an additional 40 units beyond both ends.
  const segments=Math.ceil(span/step)+Math.ceil((span+80)/step)+2;total+=segments;
  if(!Number.isFinite(segments)||segments>25000||total>400000)fail('Recorte complexo demais para os controles da curva. Simplifique os vazios, reduza a amplitude ou use Reta.');
 }
}
function cut(input){
 const l=common(input,'cut');
 if(!shapes.includes(input.shape))fail(`shape: escolha uma das formas do exemplo e do esquema.`);l.shape=input.shape;
 if(!families.includes(optional(input.family,'Reta')))fail('family: use Reta, Parábola, Seno, Cúbica, Cosseno ou Dupla curva.');l.family=optional(input.family,'Reta');
 l.target=number(input.target,'target',0,100);l.angle=angle(optional(input.angle,0),'angle',0,360);l.amplitude=number(optional(input.amplitude,40),'amplitude',-120,120);l.frequency=number(optional(input.frequency,1),'frequency',.5,2);
 l.basicDirection=angle(optional(input.basicDirection,l.angle),'basicDirection',0,360);
 if(Math.abs(Math.sin((l.basicDirection-l.angle)*Math.PI/360))>1e-8)fail('No JSON de Corte certo, basicDirection deve ser igual a angle: o controle básico desliza na normal da curva.');
 l.basicOrigin=point(optional(input.basicOrigin,{x:optional(input.centerX,400),y:optional(input.centerY,230)}),'basicOrigin');
 l.centerX=l.basicOrigin.x;l.centerY=l.basicOrigin.y;l.initialOffset=number(optional(input.initialOffset,0),'initialOffset',-600,600);
 l.basicMin=number(optional(input.basicMin,-600),'basicMin',-1000,1000);l.basicMax=number(optional(input.basicMax,600),'basicMax',-1000,1000);
 if(l.basicMin>=l.basicMax)fail('basicMin deve ser menor que basicMax.');
 l.initialTravel=number(optional(input.initialTravel,0),'initialTravel',l.basicMin,l.basicMax);l.basicRange=[l.basicMin,l.basicMax];
 const permissions=object(optional(input.permissions,{}),'permissions');l.permissions={};
 for(const key of ['x','y','rotate','offset','amplitude','frequency']){if(permissions[key]!==undefined&&typeof permissions[key]!=='boolean')fail(`permissions.${key}: use true ou false.`);l.permissions[key]=permissions[key]??true;}
 l.holes=list(optional(input.holes,[]),'holes',0,4).map((h,i)=>{const ring=list(h,`holes[${i}]`,3,12).map((p,j)=>{object(p,'Vértice do recorte');return {x:number(p.x,`holes[${i}][${j}].x`,-200,1000),y:number(p.y,`holes[${i}][${j}].y`,-200,660)};});if(!simplePolygon(ring))fail('Cada recorte precisa ser um polígono simples, sem cruzamentos, pontos repetidos ou área nula.');return ring;});
 const poly=shapePolygon(l.shape),geometry=regionGeometry(poly,l.holes);
 if(geometry.totalArea<100||geometry.totalArea<geometry.outerArea*.01||geometry.pieces.length>256)fail('Os recortes deixam área útil pequena demais ou geometria complexa demais.');
 assertCutWorkBudget(l,poly,geometry);
 l.hasEdgeOpening=l.holes.some(h=>regionGeometry(poly,[h]).removedArea<area(h)-1);
 let solution=optional(input.solutionTravel,input.basicSolution);
 if(solution===undefined){
  let lo=l.basicMin,hi=l.basicMax;const began=performance.now();
  const ratio=v=>curvedCut(poly,basicCutState(l,v)).ratio*100;
  if(ratio(lo)>l.target+3||ratio(hi)<l.target-3)fail('A meta não é alcançável dentro de basicMin/basicMax. Amplie o intervalo ou ajuste a geometria.');
  for(let i=0;i<32;i++){solution=(lo+hi)/2;const value=ratio(solution);if(Math.abs(value-l.target)<.01)break;if(performance.now()-began>1500)fail('Verificação limitada não concluiu. Forneça solutionTravel ou simplifique os recortes.');if(value<l.target)lo=solution;else hi=solution;}
 }
 l.solutionTravel=number(solution,'solutionTravel',l.basicMin,l.basicMax);l.basicSolution=l.solutionTravel;
 if(!cutSuccess(curvedCut(poly,basicCutState(l,l.solutionTravel)).ratio*100,l.target))fail('solutionTravel não produz a porcentagem desejada dentro da tolerância de 3 pontos percentuais.');
 const initial=originalLevelState(l);if(!Number.isFinite(curvedCut(poly,initial).ratio))fail('A configuração inicial da curva é inválida.');
 return l;
}
export function validateOriginalLevel(value,game){return game==='light'?light(value):game==='cut'?cut(value):fail('Jogo não suportado.');}
export function originalLevelState(level){return level.game==='light'?{objects:structuredClone(level.objects),target:{...level.target},sourceAngle:level.sourceAngle,sources:structuredClone(level.sources),targets:structuredClone(level.targets),portals:structuredClone(level.portals)}:basicCutState(level);}
export function originalLevelAnswer(level){if(level.game==='cut')return basicCutState(level,level.solutionTravel);let mirror=0;const state=originalLevelState(level);state.objects.forEach(o=>{if(o.type==='mirror')o.angle=level.solution[mirror++];});return state;}
export function originalLevelIdentity(level){const rules=exportOriginalLevel(level);delete rules.name;return customIdentity(level.game,rules);}
export function exportOriginalLevel(level){
 const keys=level.game==='light'?['sources','targets','objects','portals','solution']:['shape','target','family','angle','amplitude','frequency','basicDirection','basicOrigin','initialOffset','initialTravel','basicMin','basicMax','permissions','holes','solutionTravel'];
 return Object.fromEntries(['schemaVersion','game','id','name',...keys].map(k=>[k,structuredClone(level[k])]).filter(([,v])=>v!==undefined));
}
export function validOriginalSnapshot(level,snapshot,mode=null){
 try{assertJSONData(snapshot);object(snapshot,'Estado salvo');const initial=originalLevelState(level),copy=structuredClone(snapshot);
 if(level.game==='light'){if(!Array.isArray(copy.objects)||copy.objects.length!==initial.objects.length)return false;for(let i=0;i<initial.objects.length;i++)if(initial.objects[i].type==='mirror'){angle(copy.objects[i]?.angle,'Ângulo salvo',-90,90);copy.objects[i].angle=initial.objects[i].angle;}}
 else {const bounds=cutControlBounds(level);if(mode==='basic'&&!equal(snapshot,basicCutState(level,snapshot.basicTravel)))return false;if((!level.permissions.amplitude&&copy.amplitude!==initial.amplitude)||(!level.permissions.frequency&&copy.frequency!==initial.frequency))return false;for(const [key,min,max] of [['centerX',bounds.minX,bounds.maxX],['centerY',bounds.minY,bounds.maxY],['angle',0,360],['offset',-600,600],['amplitude',-120,120],['frequency',.5,2],['basicTravel',level.basicMin,level.basicMax]]){number(copy[key],key,min,max);copy[key]=initial[key];}}
 return equal(copy,initial);
 }catch{return false;}
}
export function originalJSONExample(game){return game==='light'?{schemaVersion:1,game:'light',id:'meu-reflexo',name:'Minha primeira reflexão',sources:[{x:200,y:330,angle:0,color:'gold'}],targets:[{x:400,y:150,radius:22,color:'gold'}],objects:[{type:'mirror',x:400,y:330,length:125,angle:-76}],portals:[],solution:[-45]}:{schemaVersion:1,game:'cut',id:'meu-corte',name:'Minha divisão ao meio',shape:'Retângulo',target:50,family:'Reta',angle:0,amplitude:40,frequency:1,basicDirection:0,basicOrigin:{x:400,y:230},initialTravel:80,basicMin:-300,basicMax:300,initialOffset:0,holes:[],solutionTravel:0};}
export function originalJSONHelp(game){return game==='light'?'Campos: game: "light"; sources e targets usam x (0–800), y (0–460) e color (gold, blue ou pink). Cada cor tem uma fonte e um alvo de raio 22. sources também tem angle (−3600 a 3600 graus; normalizado em uma volta). objects contém 1–64 espelhos (type: "mirror") ou paredes ("wall"), com x, y, length e angle; espelhos usam −90 a 90 graus. Pelo menos um espelho é necessário. length: 1–800; paredes podem ter width: 1–200 e angle: −360 a 360. portals é opcional: até 16 portais com id e pairId recíprocos, label alfanumérico, x, y, radius (4–48) e colors opcional. solution é obrigatório: um ângulo por espelho, na ordem de objects. A solução será testada pelo motor, sem executar código.':`Campos: game: "cut"; shape deve ser ${shapes.join(', ')}. family: ${families.join(', ')}. target: 0–100; angle e basicDirection: 0–360, com o mesmo valor. amplitude: −120 a 120; frequency: 0,5–2. basicOrigin: {x, y} dentro de 800 × 460. basicMin/basicMax: −1000 a 1000; initialTravel e solutionTravel ficam nesse intervalo. initialOffset: −600 a 600. holes aceita até 4 polígonos simples de 3–12 pontos {x, y}, sem cruzamentos, com x entre −200 e 1000 e y entre −200 e 660. permissions pode limitar amplitude e frequency com true/false. solutionTravel é opcional: sem ele, uma busca limitada tenta certificar uma solução. A área útil não pode ser nula. Recortes excessivamente finos ou caros de desenhar são rejeitados antes de iniciar a fase. Todos os números devem ser finitos.`;}
