// Static scene illustration, NOT browser automation or responsive UI QA.
import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {lightLevels} from '../dist/light-levels.mjs';
import {segment,wallPolygon} from '../dist/math.mjs';
import {portalSVG,lightEndpointsSVG,worldRaysSVG} from '../dist/light-world-render.mjs';
import {traceLightWorld} from '../dist/light-world.mjs';
const baseline='bc9240ebd850f3b7d0710b36d8a0ce10319f7cb0';
const text=execFileSync('git',['show',`${baseline}:dist/light-levels.mjs`],{encoding:'utf8',maxBuffer:5e6});
const before=(await import('data:text/javascript;base64,'+Buffer.from(text).toString('base64'))).lightLevels;
const ids=process.argv.slice(2).length?process.argv.slice(2).map(Number):[5,16,18,46,61,78];
const line=(a,b,attr)=>`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" ${attr}/>`;
function board(l,solution=false){
 const state=structuredClone(l);if(solution){let n=0;for(const o of state.objects)if(o.type==='mirror')o.angle=l.solution[n++];}
 let svg='<rect width="800" height="460" fill="#fffefa"/><defs><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d8ded0"/></pattern></defs><rect width="800" height="460" fill="url(#dots)"/>';
 if(solution)svg+=worldRaysSVG(traceLightWorld(state),Infinity,true);
 svg+=portalSVG(state.portals??[],0)+lightEndpointsSVG(state);
 // Same object markup/geometry/styles as app.mjs draw(), with mirror 0 selected.
 state.objects.map((o,i)=>({o,i})).sort((a,b)=>(a.o.type==='wall'?0:1)-(b.o.type==='wall'?0:1)).forEach(({o,i})=>{const s=segment(o),grip=o.type==='mirror'?segment({...o,length:Math.min(o.length,104)}).b:s.b;
 if(o.type==='wall'){svg+=`<polygon points="${wallPolygon(o).map(p=>`${p.x},${p.y}`).join(' ')}" fill="#87938b" stroke="#64736b" stroke-width="1" stroke-linejoin="round"/>`+line(s.a,s.b,'stroke="#c5cec5" stroke-width="1" stroke-opacity=".65"');return;}
 svg+=line(s.a,s.b,'stroke="#687e88" stroke-width="6"')+line(s.a,s.b,'stroke="#dbeef1" stroke-width="3"')+line(s.a,s.b,'stroke="#fff" stroke-width="1" stroke-dasharray="18 9"')+`<circle cx="${o.x}" cy="${o.y}" r="${i===0?6:3}" fill="${i===0?'#c76b42':'#fffefa'}"/><text x="${o.x+10}" y="${o.y-10}" font-size="11">${i+1}</text><circle cx="${grip.x}" cy="${grip.y}" r="14" fill="#fffefa" stroke="#c76b42" stroke-width="1.5"/><text x="${grip.x}" y="${grip.y+4}" text-anchor="middle" font-size="14">↻</text>`;
 });return svg;
}
for(const n of ids){let out='<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><rect width="1600" height="1000" fill="#eee"/>';
for(const [row,solved] of [false,true].entries())for(const [col,ls] of [before,lightLevels].entries()){out+=`<text x="${col*800+15}" y="${row*500+25}" font-family="sans-serif" font-size="18">${n} · ${col?'DEPOIS':'ANTES'} · ${solved?'referência':'início'}</text><svg x="${col*800}" y="${row*500+40}" width="800" height="460" viewBox="0 0 800 460">${board(ls[n-1],solved)}</svg>`;}
fs.writeFileSync(`docs/reflexos-spacious/comparacao-${n}.svg`,out+'</svg>');}
console.log(JSON.stringify({static:true,samples:ids,actualPortalEndpointRayRenderers:true,objectMarkup:'app.mjs draw exact geometry and styles',notBrowser:true}));
