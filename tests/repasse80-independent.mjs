/** Independent coordinate-walking oracle. No production transition, solver,
 * state keys or impossibility pruning. Counts all orders through memoized DAG. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {CAMPAIGN} from '../dist/repasse/campaign.mjs';
import {replay} from '../dist/repasse/engine.mjs';
const sides=['top','right','bottom','left'];
const vectors={up:[-1,0,'top'],right:[0,1,'right'],down:[1,0,'bottom'],left:[0,-1,'left']};
export const kind=p=>p.directions.length===1?'single':p.directions.length===4?'four':p.directions.includes('up')&&p.directions.includes('down')||p.directions.includes('left')&&p.directions.includes('right')?'original':'corner';
function fresh(l){return {v:l.pieces.map(p=>p.value),b:{top:Array(l.cols).fill(0),bottom:Array(l.cols).fill(0),left:Array(l.rows).fill(0),right:Array(l.rows).fill(0)}};}
function move(l,s,i){
 const value=s.v[i],p=l.pieces[i]; assert.ok(value>0);
 const transfers=p.directions.map(d=>{const [dr,dc,side]=vectors[d];let r=p.row+dr,c=p.col+dc;const crossed=[];
  while(r>=0&&r<l.rows&&c>=0&&c<l.cols){const j=l.pieces.findIndex(x=>x.row===r&&x.col===c);if(j>=0){if(s.v[j])return {j,value,d,crossed};crossed.push(j);}r+=dr;c+=dc;}
  return {side,index:dr?p.col:p.row,value,d,crossed};});
 const next={v:s.v.slice(),b:Object.fromEntries(sides.map(k=>[k,s.b[k].slice()]))};next.v[i]=0;
 for(const t of transfers)if(t.j!==undefined)next.v[t.j]+=value;else next.b[t.side][t.index]+=value;
 return {state:next,transfers};
}
const key=s=>JSON.stringify([s.v,s.b]);
const over=(l,s)=>sides.some(k=>s.b[k].some((v,i)=>v>l.targets[k][i]));
const won=(l,s)=>s.v.every(v=>!v)&&sides.every(k=>s.b[k].every((v,i)=>v===l.targets[k][i]));
export function oracle(l){
 const n=l.pieces.length,memo=new Map();let pruned=0;
 function solve(s){const k=key(s);if(memo.has(k))return memo.get(k);const result={count:0,before:Array(n).fill(0),last:0};memo.set(k,result);
 if(over(l,s)){pruned++;return result;}if(won(l,s)){result.count=1;return result;}
 const live=s.v.reduce((bits,v,i)=>v?bits|1<<i:bits,0);
 for(let i=0;i<n;i++)if(s.v[i]){const child=solve(move(l,s,i).state);if(!child.count)continue;result.count+=child.count;for(let j=0;j<n;j++)result.before[j]|=child.before[j];result.before[i]|=live&~(1<<i);result.last|=child.last||1<<i;}
 return result;
 }
 const root=solve(fresh(l));
 const required=[],first=[];
 for(let i=0;i<n;i++){if(solve(move(l,fresh(l),i).state).count)first.push(l.pieces[i].id);for(let j=0;j<n;j++)if(i!==j&&(root.before[i]&(1<<j))&&!(root.before[j]&(1<<i)))required.push([l.pieces[i].id,l.pieces[j].id]);}
 // Reconstruct an independently found winning order, optionally reversing a claimed relation.
 function witness(a=-1,b=-1){function walk(s,path){if(won(l,s))return path;for(let i=0;i<n;i++)if(s.v[i]&&!(i===a&&s.v[b])){const t=move(l,s,i).state;if(solve(t).count){const w=walk(t,[...path,l.pieces[i].id]);if(w)return w;}}return null;}return walk(fresh(l),[]);}
 const reversed=required.map(([a,b])=>({before:a,after:b,reverseWinningOrder:witness(l.pieces.findIndex(p=>p.id===a),l.pieces.findIndex(p=>p.id===b))}));
 assert.ok(reversed.every(r=>r.reverseWinningOrder===null));
 return {complete:true,solutionCount:root.count,states:memo.size,pruned,requiredPrecedences:required,firstMoves:first,lastMoves:l.pieces.filter((_,i)=>root.last&(1<<i)).map(p=>p.id),independentWinningOrder:witness(),reverseOrderAudits:reversed};
}
export function trace(l){
 let s=fresh(l);const n=l.pieces.length,received=Array.from({length:n},()=>[]),protectedBy=Array.from({length:n},()=>[]),lineage=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j))),depth=Array(n).fill(1),e={receive:[],accumulate:[],passage:[],timing:[],handoff:[],destinations:[],protect:[],reunite:[],unequal:[],shared:[],roles:[],linked:[],asymmetry:[],endgame:[]};
 let maxValue=Math.max(...s.v);
 for(const id of l.solution){const i=l.pieces.findIndex(p=>p.id===id),value=s.v[i];const {state,transfers}=move(l,s,i);const pieceTs=transfers.filter(t=>t.j!==undefined);
 if(pieceTs.length>=2)e.destinations.push({source:id,receivers:pieceTs.map(t=>l.pieces[t.j].id)});
 for(const t of transfers){for(const gone of t.crossed){const piece=l.pieces[gone].id;e.passage.push({piece,after:id});if(received[gone].length){const w={before:received[gone][0].source,piece,after:id};e.timing.push(w);if(t.j!==undefined)e.handoff.push({...w,receiver:l.pieces[t.j].id});if(protectedBy[gone].length)e.roles.push({...w,protection:protectedBy[gone],sources:received[gone].map(x=>x.source)});}}
 if(t.j!==undefined){const j=t.j,receiver=l.pieces[j].id,axis=['up','down'].includes(t.d)?'vertical':'horizontal';received[j].push({source:id,axis,value});e.receive.push({source:id,receiver,value});depth[j]=Math.max(depth[j],depth[i]+1);const common=lineage[i].flatMap((v,k)=>v&&lineage[j][k]?[l.pieces[k].id]:[]);if(common.length)e.reunite.push({source:id,receiver,origins:common});for(let k=0;k<n;k++)lineage[j][k]+=lineage[i][k];const side=vectors[t.d][2],index=axis==='vertical'?l.pieces[i].col:l.pieces[i].row;if(s.b[side][index]===l.targets[side][index]){const w={source:id,receiver,side,index,target:l.targets[side][index]};e.protect.push(w);protectedBy[j].push(w);}}}
 s=state;maxValue=Math.max(maxValue,value,...s.v,...sides.flatMap(k=>s.b[k]));}
 for(let i=0;i<n;i++){if(received[i].length>=2)e.accumulate.push({piece:l.pieces[i].id,sources:received[i].map(x=>x.source)});if(new Set(received[i].map(x=>x.axis)).size>1)e.shared.push({piece:l.pieces[i].id,sources:received[i].map(x=>x.source)});}
 for(const a of e.accumulate)for(const b of e.accumulate)if(a.piece<b.piece&&a.sources.join()!==b.sources.join())e.unequal.push({first:a.piece,second:b.piece});
 if(Math.max(...depth)>=3&&e.timing.length)e.linked.push({depth:Math.max(...depth),timing:e.timing[0]});
 for(const [a,b]of [['top','bottom'],['left','right']])l.targets[a].forEach((v,i)=>{if(v!==l.targets[b][i])e.asymmetry.push({sides:[a,b],index:i,targets:[v,l.targets[b][i]]});});
 e.endgame.push({last:l.solution.at(-1)});assert.ok(won(l,s),'independent replay must empty board and match every target');
 return {evidence:e,concepts:Object.keys(e).filter(k=>e[k].length),maxValue,depth:Math.max(...depth),targets:s.b};
}
function supported(f,t,o){const e=t.evidence,req=new Set(o.requiredPrecedences.map(x=>x.join('>'))),need=(a,b)=>req.has(a+'>'+b);switch(f){case'receive':case'protect':return e[f].some(x=>need(x.source,x.receiver));case'accumulate':case'shared':return e[f].some(x=>x.sources.filter(s=>need(s,x.piece)).length>=2);case'passage':return e.passage.some(x=>need(x.piece,x.after));case'timing':case'handoff':case'roles':return e[f].some(x=>need(x.before,x.piece)&&need(x.piece,x.after));case'destinations':return e.destinations.some(x=>x.receivers.filter(r=>need(x.source,r)).length>=2);case'reunite':return e.reunite.some(x=>need(x.source,x.receiver)&&x.origins.some(a=>need(a,x.receiver)));case'unequal':return e.unequal.some(x=>need(x.first,x.second)||need(x.second,x.first));case'linked':return e.linked.length>0&&o.requiredPrecedences.length>=4;case'asymmetry':return e.asymmetry.length>0&&o.requiredPrecedences.length>0;case'endgame':return o.lastMoves.length===1;default:return false;}}
export function auditCampaign(levels){const errors=[],rows=[];const check=(ok,msg)=>{if(!ok)errors.push(msg);};check(levels.length===80,'Exactly80levels');const hv=levels.map(l=>l.pieces.every(p=>kind(p)==='original'));
 check(hv.filter(Boolean).length>=48,'At least48HV');check(hv.slice(0,30).every(Boolean),'First30HV');for(const start of [30,45,60])check(hv.slice(start,start+15).filter(Boolean).length>=5,`5HV in tier ${start+1}`);check(hv.slice(75).filter(Boolean).length>=3&&hv[79],'3sageHV including80');
 for(const [index,k]of [[30,'single'],[45,'corner'],[60,'four']]){const l=levels[index];check(l&&l.pieces.filter(p=>kind(p)===k).length===1,`Introduction ${index+1} exactlyone ${k}`);check(l&&l.pieces.every(p=>kind(p)==='original'||kind(p)===k),`Introduction ${index+1} supported byHV`);check(levels.slice(0,index).every(l=>l.pieces.every(p=>kind(p)!==k)),`No ${k} before introduction`);}
 const configurations=new Map();for(const l of levels)for(const p of l.pieces){const k=p.directions.slice().sort().join(',');configurations.set(k,(configurations.get(k)||0)+1);}check(configurations.size===11,'Exactly11directionconfigurations present');check([...configurations.values()].every(n=>n>=2),'Every configuration has later application');
 const originalText=execFileSync('git',['show','bad9ec679bbbd0b4939cc329b4d476ea5d1eb1bd:dist/repasse/campaign.mjs'],{encoding:'utf8',maxBuffer:32*1024*1024});const original=JSON.parse(originalText.match(/export const CAMPAIGN = (\[[\s\S]*\]);/)[1]);const definition=l=>JSON.stringify([l.version,l.rulesVersion,l.rows,l.cols,l.pieces,l.targets]);for(const l of levels){const old=original.find(o=>o.id===l.id);if(old)check(definition(old)===definition(l),`ID${l.id}:reused for changed definition`);}check(new Set(levels.map(l=>l.id)).size===80,'80uniqueIDs');
 const fam=new Set();
 for(let i=0;i<levels.length;i++){const l=levels[i],label=i+1;check(l.rows<=4&&l.cols<=4&&l.pieces.length<=10,`${label}:editoriallimits`);check(l.pieces.every(p=>[1,2,4].includes(p.directions.length)),`${label}:configurations`);check(l.displayNumber===label,`${label}:displayNumber`);check(!(i>=2&&l.primaryConcept===levels[i-1].primaryConcept&&l.primaryConcept===levels[i-2].primaryConcept),`${label}:triplefamily`);fam.add(l.primaryConcept);
 const o=oracle(l),t=trace(l);check(o.solutionCount>0,`${label}:winningorder`);check(replay(l,o.independentWinningOrder).solved,`${label}:independent solution productionreplay`);check(supported(l.primaryConcept,t,o),`${label}:${l.primaryConcept} no causal necessity witness`);
 const old=l.validation?.alternatives;if(old?.complete){check(old.solutionCount===o.solutionCount,`${label}:alternativecount mismatch`);check(JSON.stringify(old.requiredPrecedences.slice().sort())===JSON.stringify(o.requiredPrecedences.slice().sort()),`${label}:precedences mismatch`);}
 rows.push({number:label,id:l.id,primaryConcept:l.primaryConcept,causallySupported:supported(l.primaryConcept,t,o),...o,trace:t});}
 check(fam.size===14,'All14primaryfamilies');
 for(const [i,concepts]of [[75,['protect','timing']],[76,['reunite']],[77,['shared','handoff']],[78,['destinations']]])for(const f of concepts)check(rows[i]&&supported(f,rows[i].trace,rows[i]),`${i+1}:sage synthesis ${f} not necessary`);
 return {passed:errors.length===0,errors,summary:{count:levels.length,originalOnly:hv.filter(Boolean).length,families:[...fam],totalWinningOrders:rows.reduce((a,r)=>a+r.solutionCount,0),allReverseAudits:rows.reduce((a,r)=>a+r.reverseOrderAudits.length,0)},levels:rows};}
if(process.argv[1]===fileURLToPath(import.meta.url)){const report=auditCampaign(CAMPAIGN);fs.writeFileSync(new URL('./repasse80-independent-validation.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,summary:report.summary,errors:report.errors},null,2));if(!report.passed)process.exitCode=1;}
