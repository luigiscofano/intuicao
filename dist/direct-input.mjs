/** Entrada delegada e transacional. Regras e estado persistente ficam fora deste módulo. */
export function bindDirectInput(options) {
 const {board,getContext=()=>({}),onClick,onLongPress,onContext,onSupport,onGestureStart,onGestureCell,onGestureEnd,onGestureCancel,onHover,onFocus,onKey,onNavigate,onCancel,longPressMs=500,dragThreshold=7}=options;
 const doc=board.ownerDocument??globalThis.document, win=doc?.defaultView??globalThis.window; const removers=[],pointers=new Map();
 let active=null,timer=null,navigation=null,disposed=false,lastContext=-Infinity;
 const priorTouchAction=board.style.touchAction; board.style.touchAction='none';
 function listen(el,type,fn,opts){el?.addEventListener?.(type,fn,opts);removers.push(()=>el?.removeEventListener?.(type,fn,opts));}
 function stopTimer(){if(timer!==null){clearTimeout(timer);timer=null;}}
 function supportAt(target){const el=target?.closest?.('[data-support]');return el&&board.contains(el)?el:null;}
 function targetCell(target){const el=target?.closest?.('[data-cell]');return el&&board.contains(el)?Number(el.dataset.cell):null;}
 function cellAt(x,y){const {rows,cols}=getContext();const rect=board.getBoundingClientRect();if(!rows||!cols||rect.width<=0||rect.height<=0||x<rect.left||y<rect.top||x>=rect.right||y>=rect.bottom)return null;return Math.floor((y-rect.top)/rect.height*rows)*cols+Math.floor((x-rect.left)/rect.width*cols);}
 function focus(i){board.querySelector(`[data-cell="${i}"]`)?.focus({preventScroll:true});}
 function cancel(reason){stopTimer();const a=active;active=null;if(a?.dragging)onGestureCancel?.(reason,a);}
 function consume(i,e,a){if(i===null||a.visited.has(i))return;a.visited.add(i);a.lastCell=i;onGestureCell?.(i,e,a);}
 function trace(x,y,e,a){
  // Divide o segmento nas fronteiras exatas: cruzamentos curtos de cantos
  // não são perdidos quando eventos chegam separados por várias casas.
  const rect=board.getBoundingClientRect(),{rows,cols}=getContext(),dx=x-a.x,dy=y-a.y,ts=[0,1];
  if(dx&&cols)for(let c=0;c<=cols;c++){const t=(rect.left+c*rect.width/cols-a.x)/dx;if(t>0&&t<1)ts.push(t);}
  if(dy&&rows)for(let r=0;r<=rows;r++){const t=(rect.top+r*rect.height/rows-a.y)/dy;if(t>0&&t<1)ts.push(t);}
  ts.sort((u,v)=>u-v);for(let j=1;j<ts.length;j++){const t=(ts[j-1]+ts[j])/2;consume(cellAt(a.x+dx*t,a.y+dy*t),e,a);}consume(cellAt(x,y),e,a);a.x=x;a.y=y;
 }
 function geometry(){const [a,b]=[...pointers.values()];if(!a||!b)return null;return {x:(a.x+b.x)/2,y:(a.y+b.y)/2,distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y))};}
 function navEvent(phase,e){const g=geometry()||navigation?.last;if(!navigation||!g)return;navigation.last=g;onNavigate?.({phase,scale:g.distance/navigation.start.distance,dx:g.x-navigation.start.x,dy:g.y-navigation.start.y,centerX:g.x,centerY:g.y,startX:navigation.start.x,startY:navigation.start.y},e);}
 function down(e){if(e.button!==0&&e.button!==2)return;const support=supportAt(e.target),i=targetCell(e.target)??cellAt(e.clientX,e.clientY);if(i===null&&!support)return;
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});try{board.setPointerCapture(e.pointerId);}catch{}
 if(pointers.size>1){e.preventDefault();cancel('multitouch');if(!navigation){const g=geometry();navigation={start:g,last:g};navEvent('start',e);}return;}
 if(navigation)return;
 stopTimer();active={pointerId:e.pointerId,startCell:i,lastCell:i,button:e.button,shiftKey:e.shiftKey,altKey:e.altKey,pointerType:e.pointerType,context:getContext(),intent:undefined,visited:new Set(),startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,dragging:false,moved:false,longPressed:false,support:support?.dataset.support};
 if(i!==null)focus(i);if(e.pointerType==='touch'||e.button===2)e.preventDefault();
 if(e.button===0&&!support&&e.pointerType!=='mouse'){const a=active;timer=setTimeout(()=>{timer=null;if(active!==a||a.moved||pointers.size!==1)return;a.longPressed=true;lastContext=Date.now();onLongPress?.(i,e,a);},longPressMs);}
 }
 function move(e){if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(navigation){if(pointers.has(e.pointerId)){e.preventDefault();if(!navigation.ended)navEvent('move',e);}return;}
 const a=active;if(!a||e.pointerId!==a.pointerId){if(e.pointerType==='mouse'||!e.pointerType)onHover?.(cellAt(e.clientX,e.clientY),e);return;}
 if(a.longPressed)return;
 if(!a.moved&&Math.hypot(e.clientX-a.startX,e.clientY-a.startY)>=dragThreshold){a.moved=true;stopTimer();if(a.support===undefined){a.intent=onGestureStart?.(a.startCell,e,a);a.dragging=a.intent!==undefined&&a.intent!==null&&a.intent!==false;if(a.dragging)consume(a.startCell,e,a);}}
 if(a.dragging){e.preventDefault();trace(e.clientX,e.clientY,e,a);}
 }
 function release(e,canceled=false){if(!pointers.has(e.pointerId))return;
 if(navigation){if(pointers.size<=2&&!navigation.ended)navEvent('end',e);pointers.delete(e.pointerId);if(pointers.size===0)navigation=null;else navigation.ended=true;return;}
 pointers.delete(e.pointerId);const a=active;if(!a||a.pointerId!==e.pointerId)return;stopTimer();if(a.button===2||a.longPressed)lastContext=Date.now();
 if(canceled){cancel('pointercancel');return;}
 const i=cellAt(e.clientX,e.clientY);active=null;
 if(a.dragging){trace(e.clientX,e.clientY,e,a);onGestureEnd?.(i,e,a);return;}
 if(a.longPressed||a.moved||i!==a.startCell)return;
 if(a.support!==undefined){onSupport?.(a.support,e,a);return;}
 if(a.button===2){lastContext=Date.now();onContext?.(i,e,a);}else onClick?.(i,e,a);
 }
 function key(e){if(e.altKey||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()!=='z'))return;if(e.target?.isContentEditable||e.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;
 if(e.key==='Escape'){if(active||navigation){cancel('escape');navigation=null;pointers.clear();}onCancel?.('escape',e);e.preventDefault();return;}
 const support=supportAt(e.target);if(support&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onSupport?.(support.dataset.support,e,null);return;}
 const i=targetCell(e.target);if(i===null)return;const {rows,cols}=getContext();let next=i;
 if(e.key==='ArrowLeft'&&i%cols>0)next--;else if(e.key==='ArrowRight'&&i%cols<cols-1)next++;else if(e.key==='ArrowUp'&&i>=cols)next-=cols;else if(e.key==='ArrowDown'&&i<(rows-1)*cols)next+=cols;
 if(e.key.startsWith('Arrow')){e.preventDefault();focus(next);return;}
 if(onKey?.(i,e)===true)e.preventDefault();
 }
 listen(board,'pointerdown',down);listen(board,'pointermove',move);listen(board,'pointerup',e=>release(e));listen(board,'pointercancel',e=>release(e,true));
 listen(board,'lostpointercapture',e=>{if(active?.pointerId===e.pointerId){pointers.delete(e.pointerId);cancel('lostcapture');}});
 listen(board,'pointerleave',e=>{if(!active&&!navigation)onHover?.(null,e);});
 listen(board,'contextmenu',e=>{e.preventDefault();if(active?.button===2||active?.longPressed||Date.now()-lastContext<700)return;const i=targetCell(e.target);if(i!==null){lastContext=Date.now();onContext?.(i,e,null);}});
 listen(board,'click',e=>{e.preventDefault();e.stopPropagation();if(e.detail===0&&!active&&!navigation){const support=supportAt(e.target),i=targetCell(e.target);if(support)onSupport?.(support.dataset.support,e,null);else if(i!==null)onClick?.(i,e,null);}});
 listen(board,'keydown',key);
 listen(board,'focusin',e=>{const i=targetCell(e.target);if(i!==null)onFocus?.(i,e);});
 listen(doc,'keydown',e=>{if(e.key==='Escape'&&!board.contains(e.target)&&(active||navigation)){cancel('escape');navigation=null;pointers.clear();onCancel?.('escape',e);}});
 listen(doc,'pointerdown',e=>{if(!board.contains(e.target))onCancel?.('outside',e);},true);
 listen(win,'blur',()=>{cancel('blur');navigation=null;pointers.clear();});
 return function cleanup(){if(disposed)return;disposed=true;cancel('cleanup');removers.forEach(fn=>fn());pointers.clear();navigation=null;board.style.touchAction=priorTouchAction;};
}

/** Zoom e deslocamento visuais, sem alterar a solução. onNavigate chama handleNavigation. */
export function createBoardViewport({board,minScale=1,maxScale=3,onChange}={}){
 let state={scale:1,x:0,y:0},start=null;const original={transform:board.style.transform,transformOrigin:board.style.transformOrigin};board.style.transformOrigin='0 0';
 function apply(){board.style.transform=`translate(${state.x}px, ${state.y}px) scale(${state.scale})`;onChange?.({...state});return {...state};}
 function zoom(factor,clientX,clientY){const rect=board.getBoundingClientRect(),next=Math.min(maxScale,Math.max(minScale,state.scale*factor)),ratio=next/state.scale;const px=Number.isFinite(clientX)?clientX-rect.left:rect.width/2,py=Number.isFinite(clientY)?clientY-rect.top:rect.height/2;state.x+=px*(1-ratio);state.y+=py*(1-ratio);state.scale=next;return apply();}
 return {getState:()=>({...state}),zoom,pan(dx,dy){state.x+=dx;state.y+=dy;return apply();},reset(){state={scale:1,x:0,y:0};return apply();},handleNavigation(e){if(e.phase==='start'){start={...state,rect:board.getBoundingClientRect()};return;}if(!start)return;const scale=Math.min(maxScale,Math.max(minScale,start.scale*e.scale)),ratio=scale/start.scale;state={scale,x:start.x+e.dx+(e.startX-start.rect.left)*(1-ratio),y:start.y+e.dy+(e.startY-start.rect.top)*(1-ratio)};apply();if(e.phase==='end')start=null;},destroy(){board.style.transform=original.transform;board.style.transformOrigin=original.transformOrigin;}};
}
