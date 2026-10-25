// Static inspection of exact rail paths, cells, approved display symbols and badges.
// Does not claim browser layout, focus, touch or responsive-behavior verification.
import fs from 'node:fs';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {ringPath,computeOrbitaBadgeLayout,ringLabelPosition} from '../dist/orbita/ui.mjs';
import {orbitaSymbol} from '../dist/orbita/symbols.mjs';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const meetings=l=>l.cells.filter(c=>l.rings.filter(r=>r.cells.includes(c.id)).length===2).length;
const audit=JSON.parse(fs.readFileSync(new URL('./orbita-v3-audit.json',import.meta.url)));
const samples=[...new Map([...([2,3,4,5,8,10,12,14].map(k=>CATALOG.slice(200).find(l=>meetings(l)===k))),...Object.values(audit.familyCoverage??{}).map(ids=>CATALOG[ids[0]-1]),...([801,885,1000].map(id=>CATALOG[id-1])),...new Set(CATALOG.slice(200).map(l=>l.authorship.baseTopologyFamily))].map(x=>typeof x==='string'?CATALOG.slice(200).find(l=>l.authorship.baseTopologyFamily===x):x).filter(Boolean).map(l=>[l.id,l])).values()];
function board(l){let out='';
 for(const r of l.rings)out+=`<path d="${ringPath(l,r)}" fill="none" stroke="#e4e7dc" stroke-width="9"/><path d="${ringPath(l,r)}" fill="none" stroke="#aab89d" stroke-width="3"/>`;
 for(const r of l.rings){const p=ringLabelPosition(l,r);if(p)out+=`<circle cx="${p.x}" cy="${p.y}" r="13" fill="#405e49"/><text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="14" fill="white">${r.id}</text>`;}
 for(const c of l.cells){const shared=l.rings.filter(r=>r.cells.includes(c.id)).length>1;if(shared)out+=`<circle cx="${c.x}" cy="${c.y}" r="27" fill="none" stroke="#879b75" stroke-width="1.4"/>`;out+=`<circle cx="${c.x}" cy="${c.y}" r="23" fill="#fbfcf7" stroke="#c1cbb6"/><circle cx="${c.x}" cy="${c.y}" r="19" fill="#f0f4e7" stroke="#7f956d"/><text x="${c.x}" y="${c.y+6}" text-anchor="middle" font-size="18" fill="#304b38">${escape(orbitaSymbol(l,l.initial[c.id]))}</text>`;
 if(l.targets[c.id]!==undefined)out+=`<rect x="${c.x-18}" y="${c.y+22}" width="36" height="20" rx="5" fill="#fffdf6" stroke="#aeb99e"/><text x="${c.x}" y="${c.y+37}" text-anchor="middle" font-size="15" fill="#596b4a">${escape(orbitaSymbol(l,l.targets[c.id]))}</text>`;
 }
 for(const b of computeOrbitaBadgeLayout(l).sensors)out+=`<rect x="${b.cx-b.width/2}" y="${b.cy-10}" width="${b.width}" height="20" rx="6" fill="#faf1e4" stroke="#b5966a"/><text x="${b.cx}" y="${b.cy+4}" text-anchor="middle" font-size="11">${escape(b.label)}</text>`;return out;
}
const pageSize=8;
for(let page=0;page<Math.ceil(samples.length/pageSize);page++){
 const group=samples.slice(page*pageSize,(page+1)*pageSize);let out=`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${Math.ceil(group.length/2)*620}" style="background:#fafbf6;font-family:sans-serif">`;
 group.forEach((l,i)=>{const x=i%2*640,y=Math.floor(i/2)*620,scale=Math.min(600/l.layout.width,550/l.layout.height);out+=`<text x="${x+20}" y="${y+25}" font-size="17">${l.id} · ${l.rings.length} anéis · ${meetings(l)} encontros · ${escape(l.family)}</text><text x="${x+20}" y="${y+46}" font-size="12">${l.cells.length} casas · ${Math.round(l.layout.width)}×${Math.round(l.layout.height)} · forma: ${escape(l.authorship.baseTopologyFamily)} · estático</text><g transform="translate(${x+20} ${y+60}) scale(${scale})">${board(l)}</g>`;});
 fs.writeFileSync(new URL(`../docs/orbita-v3/contact-sheet-${page+1}.svg`,import.meta.url),out+'</svg>');
}
console.log(JSON.stringify({samples:samples.map(l=>({id:l.id,rings:l.rings.length,intersections:meetings(l),family:l.family})),pages:Math.ceil(samples.length/pageSize)},null,2));
