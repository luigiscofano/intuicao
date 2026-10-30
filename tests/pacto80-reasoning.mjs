// Explainable quota/partnership solver, independent of the engine's tuple GAC.
export const bits=m=>[0,1,2,3].filter(v=>m>>v&1);
export const cellName=i=>`L${(i/8|0)+1}C${i%8+1}`;
const symbols=['círculo','triângulo','quadrado','losango'];
export const neighbors=i=>[i>=8?i-8:-1,i<56?i+8:-1,i%8?i-1:-1,i%8<7?i+1:-1].filter(x=>x>=0);
export const lines=Array.from({length:16},(_,k)=>Array.from({length:8},(_,j)=>k<8?k*8+j:j*8+k-8));
const lineName=k=>`${k<8?'linha':'coluna'} ${k%8+1}`;
const single=m=>m>0&&!(m&m-1);
export function reason(level,{hypotheses=true,groups=true,maxSteps=2000}={}){
 const d=level.clues.map(v=>v<0?15:1<<v),trace=[],depth=Array(64).fill(0); let contradiction=null;
 function run(a,out,allowGroups=true){
  let changed=true,round=0;
  const remove=(cell,mask,kind,text,premises)=>{const before=a[cell],after=before&~mask;if(before===after)return; a[cell]=after;changed=true;out.push({kind,cell,before:bits(before),after:bits(after),premises:[...new Set(premises)],text});if(!after)contradiction={kind:'empty-domain',cell,text:`${cellName(cell)} fica sem símbolo possível. ${text}`};};
  while(changed&&!contradiction&&out.length<maxSteps){changed=false;round++;
   for(let k=0;k<16&&!contradiction;k++){const line=lines[k];for(let v=0;v<4;v++){const bit=1<<v,fixed=line.filter(i=>a[i]===bit),possible=line.filter(i=>a[i]&bit);if(fixed.length>2||possible.length<2){contradiction={kind:'quota',cells:line,symbol:v,text:`${lineName(k)}: ${fixed.length>2?'terceira ocorrência':'menos de duas posições possíveis'} de ${symbols[v]}.`};break;}
    if(fixed.length===2)for(const i of possible.filter(i=>a[i]!==bit))remove(i,bit,'quota-saturated',`${lineName(k)} já tem dois ${symbols[v]} (${fixed.map(cellName).join(', ')}); exclua ${symbols[v]} de ${cellName(i)}.`,fixed);
    else if(possible.length===2)for(const i of possible)remove(i,15^bit,'quota-remaining',`Na ${lineName(k)}, ${symbols[v]} só cabe em ${possible.map(cellName).join(' e ')}; ambas as casas precisam dele.`,line.filter(x=>x!==i));
   }}
   for(let i=0;i<64&&!contradiction;i++){const ns=neighbors(i);for(const v of bits(a[i])){const b=1<<v,possible=ns.filter(j=>a[j]&b),fixed=ns.filter(j=>a[j]===b);if(!possible.length)remove(i,b,'isolation',`${cellName(i)} não pode ser ${symbols[v]}: nenhum vizinho ortogonal pode ser seu parceiro.`,ns);
    else if(fixed.length>1)remove(i,b,'trio',`${cellName(i)} não pode ser ${symbols[v]}: tocaria ${fixed.map(cellName).join(' e ')}, formando um grupo maior que dois.`,fixed);
    else if(a[i]===b){if(fixed.length===1)for(const j of possible.filter(j=>j!==fixed[0]))remove(j,b,'closed-pair',`A dupla ${cellName(i)}–${cellName(fixed[0])} já está fechada; ${cellName(j)} não pode tocar essa dupla com outro ${symbols[v]}.`,[i,fixed[0]]);
     else if(possible.length===1)remove(possible[0],15^b,'mandatory-partner',`${cellName(i)} precisa de um parceiro ${symbols[v]}; só ${cellName(possible[0])} pode recebê-lo (${i%8===possible[0]%8?'vertical':'horizontal'}).`,[i,...ns.filter(j=>j!==possible[0])]);}
   }}
   if(allowGroups&&groups&&!changed&&!contradiction)for(let k=0;k<16&&!contradiction;k++){const line=lines[k];for(let mask=1;mask<15;mask++){const sy=bits(mask),need=sy.length*2,inside=line.filter(i=>(a[i]&~mask)===0),possible=line.filter(i=>a[i]&mask);if(inside.length>need||possible.length<need){contradiction={kind:'group-quota',cells:line,text:`Na ${lineName(k)}, o conjunto ${sy.map(v=>symbols[v]).join('/')} exige ${need} casas, mas a capacidade é incompatível.`};break;}
    if(inside.length===need)for(const i of line.filter(i=>!inside.includes(i)))remove(i,mask,'candidate-group',`Na ${lineName(k)}, ${inside.map(cellName).join(', ')} reservam as ${need} ocorrências de ${sy.map(v=>symbols[v]).join(' e ')}; retire esses símbolos de ${cellName(i)}.`,inside);
    if(possible.length===need)for(const i of possible)remove(i,15^mask,'candidate-group',`Na ${lineName(k)}, as ${need} ocorrências de ${sy.map(v=>symbols[v]).join(' e ')} só cabem em ${possible.map(cellName).join(', ')}; essas casas ficam reservadas ao conjunto.`,line.filter(j=>!possible.includes(j)));
   }}
  }
 }
 run(d,trace);
 while(hypotheses&&!contradiction&&d.some(m=>!single(m))&&trace.length<maxSteps){let found=false;
  for(let i=0;i<64&&!found;i++)if(!single(d[i]))for(const v of bits(d[i])){const copy=d.slice(),sub=[];copy[i]=1<<v;contradiction=null;run(copy,sub);const why=contradiction;contradiction=null;if(why){const before=d[i];d[i]&=~(1<<v);trace.push({kind:'refutation',cell:i,before:bits(before),after:bits(d[i]),premises:[i],assumption:{cell:i,value:v},chain:sub,contradiction:why,text:`Se ${cellName(i)} fosse ${symbols[v]}, ${sub.length} deduções levariam a: ${why.text} Portanto, exclua ${symbols[v]}.`});found=true;break;}}
  if(!found)break;run(d,trace);
 }
 for(const s of trace){const dep=Math.max(0,...s.premises.filter(i=>i!==s.cell).map(i=>depth[i]));s.depth=dep+1;depth[s.cell]=Math.max(depth[s.cell],s.depth);}
 const counts={};for(const s of trace)counts[s.kind]=(counts[s.kind]||0)+1;
 return {solved:!contradiction&&d.every(single),domains:d.map(bits),trace,counts,maxDepth:Math.max(...depth),contradiction};
}
