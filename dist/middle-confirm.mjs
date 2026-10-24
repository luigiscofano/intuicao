/** Clique da rodinha, restrito ao tabuleiro. Auxclick nunca confirma novamente. */
export function bindMiddleConfirm(board,{enabled=()=>true,onConfirm}={}){
 const doc=board.ownerDocument??globalThis.document,win=doc?.defaultView??globalThis.window;
 const removers=[];let press=null;
 const cancel=()=>{press=null;};
 const allowed=e=>enabled()&&board.isConnected!==false&&doc?.hasFocus?.()!==false&&board.contains(e.target)&&!e.target?.closest?.('a,input,textarea,select,[contenteditable="true"]');
 const consume=e=>{e.preventDefault();e.stopPropagation();};
 function listen(el,type,fn){el?.addEventListener?.(type,fn);removers.push(()=>el?.removeEventListener?.(type,fn));}
 listen(board,'pointerdown',e=>{
  cancel();if(e.button!==1||e.pointerType&&e.pointerType!=='mouse'||!allowed(e))return;
  consume(e);if(e.buttons!==undefined&&e.buttons!==4)return;
  press={id:e.pointerId,x:e.clientX,y:e.clientY};
  try{board.setPointerCapture(e.pointerId);}catch{}
 });
 // Mouse default autoscroll is associated with mousedown in some browsers.
 listen(board,'mousedown',e=>{if(e.button===1&&allowed(e))consume(e);});
 listen(board,'pointermove',e=>{if(press&&(e.pointerId!==press.id||Math.hypot(e.clientX-press.x,e.clientY-press.y)>7))cancel();});
 listen(board,'pointerup',e=>{
  if(e.button!==1)return;const previous=press;cancel();if(!allowed(e))return;consume(e);
  const r=board.getBoundingClientRect();
  if(previous?.id===e.pointerId&&Math.hypot(e.clientX-previous.x,e.clientY-previous.y)<=7&&e.clientX>=r.left&&e.clientX<r.right&&e.clientY>=r.top&&e.clientY<r.bottom)onConfirm?.();
 });
 listen(board,'auxclick',e=>{if(e.button===1&&allowed(e))consume(e);});
 listen(board,'pointercancel',cancel);listen(board,'lostpointercapture',cancel);
 listen(board,'keydown',e=>{if(e.key==='Escape')cancel();});listen(win,'blur',cancel);
 return {cancel,destroy(){cancel();removers.forEach(fn=>fn());}};
}
