// Seeded, bounded generators. Every returned answer is checked by the same engines as play.
import {traceLightWorld} from './light-world.mjs';
import {curvedCut,shapePolygon,shapes,families} from './curves.mjs';
import {cutSuccess} from './math.mjs';
const clone=x=>structuredClone(x);
export function originalRandom(seed){let s=Number(seed)>>>0;return ()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export function normalizeOriginalOptions(game,o={}){o=o&&typeof o==='object'&&!Array.isArray(o)?o:{};return game==='light'?{sources:Math.max(1,Math.min(3,Math.round(Number(o.sources)||1))),mirrors:Math.max(1,Math.min(3,Math.round(Number(o.mirrors)||2))),walls:o.walls!==false,portals:o.portals===true,selective:o.selective===true}:{shape:shapes.includes(o.shape)?o.shape:'random',curves:o.curves!==false,holes:o.holes===true};}
export function generateOriginalEndless(game,seed,options={}){
 const o=normalizeOriginalOptions(game,options),random=originalRandom(seed),between=(a,b)=>a+(b-a)*random();
 let answer,initial;
 if(game==='light'){
  answer={objects:[],sources:[],targets:[],portals:[],sourceAngle:0};
  const colors=['gold','blue','pink'],lane=380/o.sources;
  for(let i=0;i<o.sources;i++){
   const color=colors[i],base=40+lane*(i+.5),span=Math.min(42,lane*.27),sign=random()<.5?-1:1;
   const source={x:40+between(0,20),y:base+between(-5,5),angle:0,color};answer.sources.push(source);
   const pts=[source];
   for(let j=0;j<o.mirrors;j++)pts.push({x:300+j*(340/Math.max(1,o.mirrors))+between(-16,16),y:j===0?source.y:base+sign*(j%2?span:-span)+between(-4,4)});
   pts.push({x:745+between(-10,10),y:base+(o.mirrors%2?sign:-sign)*span+between(-4,4)});
   for(let j=1;j<pts.length-1;j++){
    const a=pts[j-1],p=pts[j],b=pts[j+1],incoming=Math.atan2(p.y-a.y,p.x-a.x),outgoing=Math.atan2(b.y-p.y,b.x-p.x);
    answer.objects.push({type:'mirror',x:p.x,y:p.y,length:48,angle:(incoming+outgoing)*90/Math.PI});
   }
   answer.targets.push({...pts.at(-1),color,radius:22});
   if(o.portals){const colors=o.selective?[color]:undefined;answer.portals.push({id:`in${i}`,pairId:`out${i}`,label:String.fromCharCode(65+i),x:110+between(-6,6),y:source.y,radius:12,...(colors?{colors}:{})},{id:`out${i}`,pairId:`in${i}`,label:String.fromCharCode(65+i),x:235+between(-6,6),y:source.y,radius:12,...(colors?{colors}:{})});}
   if(o.walls)answer.objects.push({type:'wall',x:o.portals?175:150,y:o.portals?source.y:base+lane*.38,length:o.portals?Math.min(70,lane*.65):54,width:10,angle:o.portals?90:0});
  }
  // Reflect whole constructed paths, not just a catalogue entry: symmetry preserves geometry.
  const flipX=random()<.5,flipY=random()<.5;
  const tangent=a=>((a+90)%180+180)%180-90;
  for(const p of [...answer.sources,...answer.targets,...answer.objects,...answer.portals]){
   if(flipX){p.x=800-p.x;if(Number.isFinite(p.angle))p.angle=180-p.angle;}
   if(flipY){p.y=460-p.y;if(Number.isFinite(p.angle))p.angle=-p.angle;}
   if(p.type)p.angle=tangent(p.angle);if(Object.is(p.angle,-0))p.angle=0;
  }
  answer.target=clone(answer.targets[0]);
  if(traceLightWorld(answer).status!=='target')throw Error('O gerador de Reflexos não encontrou um caminho válido. Tente outra configuração.');
  initial=clone(answer);for(const mirror of initial.objects.filter(x=>x.type==='mirror'))mirror.angle=between(-80,80);
  // A partida começa como desafio, nunca já concluída.
  if(traceLightWorld(initial).status==='target')initial.objects.find(x=>x.type==='mirror').angle=90;
 }else if(game==='cut'){
  const shape=o.shape==='random'?shapes[Math.floor(random()*shapes.length)]:o.shape, family=o.curves?families[Math.floor(random()*families.length)]:'Reta';
  const holes=[];if(o.holes){const x=between(350,410),y=between(195,245),w=between(24,55),h=between(22,45);holes.push([{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}]);}
  answer={shape,family,angle:between(0,360),amplitude:between(15,48)*(random()<.5?-1:1),frequency:random()<.5?1:.5,centerX:400,centerY:230,offset:between(-35,35),holes};
  const result=curvedCut(shapePolygon(shape),answer);answer.target=Math.round(result.ratio*100);
  if(answer.target<10||answer.target>90){answer.family='Reta';answer.offset=0;answer.target=Math.round(curvedCut(shapePolygon(shape),answer).ratio*100);}
  if(!cutSuccess(curvedCut(shapePolygon(shape),answer).ratio*100,answer.target))throw Error('Não foi possível validar o corte gerado.');
  initial=clone(answer);initial.offset=answer.offset+(random()<.5?-130:130);
 }else throw Error('Jogo desconhecido');
 return {level:{id:`endless-${game}-${Number(seed)>>>0}-${JSON.stringify(o)}`,name:'Endless',hint:game==='light'?'Os caminhos de cores diferentes não podem se tocar. Use os portais para atravessar paredes e ajuste um espelho por vez.':'A meta usa só a área preenchida. Deslize a curva; buracos não contam na proporção.'},initial,answer,options:o};
}
