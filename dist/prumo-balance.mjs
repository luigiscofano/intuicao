// Presentation only. Moments come from the existing PRUMO validator.
const number=n=>Number.isInteger(n)?String(n):n.toLocaleString('pt-BR',{maximumFractionDigits:2});
export function prumoBalanceModel(level,state,selected,moment){
 const cells=state.assignments.flatMap((value,i)=>value===selected?[i]:[]),support=level.supports[selected];
 const count=moment.count,dx=count?moment.x/(2*count):null,dy=count?moment.y/(2*count):null;
 return {cells,count,dx,dy,supportX:support.x2/2,supportY:support.y2/2,centerX:count?support.x2/2+dx:null,centerY:count?support.y2/2+dy:null,balanced:count>0&&moment.x===0&&moment.y===0};
}
export function prumoBalanceMarkup(level,state,selected,moment){
 const m=prumoBalanceModel(level,state,selected,moment),name=String.fromCharCode(65+selected);
 const unit=Math.min(184/level.cols,104/level.rows),left=(240-level.cols*unit)/2,top=(144-level.rows*unit)/2;
 const x=value=>left+(value+.5)*unit,y=value=>top+(value+.5)*unit;
 const sx=x(m.supportX),sy=y(m.supportY),cx=m.count?x(m.centerX):sx,cy=m.count?y(m.centerY):sy;
 const direction=(value,horizontal)=>value===null?'sem casas':value===0?'alinhado':`${horizontal?(value>0?'→ direita':'← esquerda'):(value>0?'↓ abaixo':'↑ acima')} · ${number(Math.abs(value))} ${Math.abs(value)===1?'casa':'casas'}`;
 const title=m.count?(m.balanced?'Centro alinhado ao apoio':'Centro fora do apoio'):'Peça sem casas';
 const cells=m.cells.map(i=>`<rect class="pb-cell" x="${left+(i%level.cols)*unit}" y="${top+Math.floor(i/level.cols)*unit}" width="${unit}" height="${unit}"/>`).join('');
 const guide=m.count?`<path class="pb-projection" d="M${sx} ${sy}H${cx}V${cy}"/><path class="pb-offset" d="M${sx} ${sy}L${cx} ${cy}"/>`:'';
 const center=m.count?`<circle class="pb-center" cx="${cx}" cy="${cy}" r="6"/>`:'';
 return `<div class="prumo-balance${m.balanced?' is-balanced':''}" role="status" aria-live="polite" aria-atomic="true"><div class="pb-diagram"><svg viewBox="0 0 240 144" aria-hidden="true" focusable="false"><rect class="pb-board" x="${left}" y="${top}" width="${level.cols*unit}" height="${level.rows*unit}" rx="3"/>${cells}${guide}<path class="pb-support" d="M${sx} ${sy-5}L${sx+5} ${sy}L${sx} ${sy+5}L${sx-5} ${sy}Z"/>${center}</svg><div class="pb-key"><span>◆ apoio</span><span>○ centro da peça</span></div></div><div class="pb-reading"><strong>Peça ${name} · ${title}</strong><p class="pb-axis">Horizontal: ${direction(m.dx,true)}<br>Vertical: ${direction(m.dy,false)}</p><p>Momentos exatos da peça ${name}: horizontal ${moment.x}; vertical ${moment.y} (coordenadas duplicadas).</p><p class="pb-note">${m.count?'O círculo mostra a média das casas da peça. Os dois eixos precisam alinhar ao apoio; as demais regras continuam valendo.':'Sem casas, não há centro para comparar. Momentos zero não indicam uma peça concluída.'}</p></div></div>`;
}
