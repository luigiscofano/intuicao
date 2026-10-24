/* Independent ornamental physics. No game imports, storage, or input capture. */
export const LIMITS=Object.freeze({speed:1500,velocity:260,radius:62,dt:.032,maxLeaves:1000});
export const GROWTH=[20,45,75,110,155,210];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function pointerVelocity(previous,current){
 if(!previous||current.scroll!==previous.scroll)return null;
 const dt=(current.time-previous.time)/1000;
 if(dt<.004||dt>.15)return null;
 const dx=current.x-previous.x,dy=current.y-previous.y;
 if(Math.hypot(dx,dy)>350)return null;
 const speed=Math.hypot(dx,dy)/dt,ratio=Math.min(1,LIMITS.speed/Math.max(speed,1));
 return {x:dx/dt*ratio,y:dy/dt*ratio,speed:Math.min(speed,LIMITS.speed),dt};
}
export function growthOpacity(stage,seconds){return stage<0?.8:.8*clamp(Math.floor((seconds-GROWTH[stage]))/6,0,1);}
export function disturb(p,v,distance){
 if(distance>=LIMITS.radius||v.speed<12)return false;
 const f=1-distance/LIMITS.radius,eventScale=clamp((v.dt??1/60)*60,.24,3),gentle=v.speed<=420;
 p.vx=clamp(p.vx+v.x*(gentle?.025:.13)*f*eventScale,-LIMITS.velocity,LIMITS.velocity);
 p.vy=clamp(p.vy-(gentle?2+v.speed*.008:7+v.speed*.145)*f*eventScale,-LIMITS.velocity,LIMITS.velocity);
 p.spin=clamp((p.spin||0)+v.x*(gentle?.012:.08)*f*eventScale,-120,120);
 p.contact=0;p.active=true;p.moved=true;return true;
}
// A bounded spatial grid of stationary leaf supports. Each leaf enters <=3 cells;
// sorted per-cell heights avoid particle-pair scans and ignore the querying leaf.
export function createSupportField(particles,width,height){
 const size=16,cells=Array.from({length:Math.max(1,Math.ceil(width/size))},()=>[]),floor=height-4;
 for(const p of particles){if(p.active||p.opacity<.05)continue;const x=p.restX+p.dx,y=p.restY+p.dy-3;if(y<2||y>floor)continue;
  const lo=clamp(Math.floor((x-7)/size),0,cells.length-1),hi=clamp(Math.floor((x+7)/size),0,cells.length-1);
  for(let i=lo;i<=hi;i++)cells[i].push({y,p});
 }
 for(const cell of cells)cell.sort((a,b)=>a.y-b.y);
 return {floor,cells,support(x,fromY,ignore){const cell=cells[clamp(Math.floor(x/size),0,cells.length-1)];let lo=0,hi=cell.length;while(lo<hi){const mid=(lo+hi)>>1;if(cell[mid].y<fromY-1)lo=mid+1;else hi=mid;}for(let i=lo;i<cell.length;i++)if(cell[i].p!==ignore&&!cell[i].p.active)return cell[i].y;return floor;}};
}
export function stepParticle(p,dt,field){
 if(!p.active)return p;
 let remaining=clamp(dt,0,LIMITS.dt);
 while(remaining>1e-8){const h=Math.min(remaining,1/120);remaining-=h;
  let x=p.restX+p.dx,y=p.restY+p.dy;
  const drag=Math.exp(-1.25*h);p.vx*=drag;p.vy=(p.vy+300*h)*drag;
  const nx=clamp(x+p.vx*h,2,Math.max(2,(p.width??1200)-2));if(nx!==x+p.vx*h)p.vx=0;
  let ny=y+p.vy*h;const floor=field?.support(nx,y,p)??p.floor;
  if(ny<2){ny=2;p.vy=Math.max(0,p.vy)*.1;}
  if(p.vy>=0&&ny>=floor){ny=floor;p.vx*=Math.exp(-16*h);p.spin=(p.spin||0)*Math.exp(-12*h);p.vy=p.vy>45?-p.vy*.08:0;p.contact=(p.contact||0)+h;}else p.contact=0;
  p.dx=nx-p.restX;p.dy=ny-p.restY;p.angle=(p.angle||0)+(p.spin||0)*h;p.spin=(p.spin||0)*Math.exp(-1.8*h);
  if(p.contact>.08&&Math.abs(p.vx)<2&&Math.abs(p.vy)<2&&Math.abs(p.spin)<3){p.vx=p.vy=p.spin=0;p.active=false;break;}
 }
 return p;
}
// Preserve displaced positions/angles in normalized document-floor coordinates.
export function reconcileParticle(old,p,oldWidth,oldHeight,newWidth,newHeight){
 if(!old?.moved)return p;const sx=newWidth/oldWidth,sy=newHeight/oldHeight;
 p.dx=clamp((old.restX+old.dx)*sx,2,newWidth-2)-p.restX;
 p.dy=clamp((old.restY+old.dy)*sy,2,newHeight-4)-p.restY;
 p.vx=old.vx*sx;p.vy=old.vy*sy;p.angle=old.angle;p.spin=old.spin;p.moved=true;p.active=old.active;p.pausedMotion=old.pausedMotion;p.contact=old.contact;return p;
}
export function createPileDecoration({document:doc=globalThis.document,window:win=globalThis.window}={}){
 const layer=doc?.querySelector('body > .platform-leaf-layer'),footer=doc?.querySelector('body > footer');
 if(!layer||!footer)return {destroy(){}};
 const ns='http://www.w3.org/2000/svg',abort=new AbortController(),signal=abort.signal;
 const surface=doc.createElementNS(ns,'svg');surface.classList.add('platform-pile-surface');surface.setAttribute('aria-hidden','true');surface.setAttribute('focusable','false');surface.setAttribute('preserveAspectRatio','none');
 let destroyed=false,ready=false,visible=false,raf=0,timer=0,lastFrame=0,previous=null,width=0,height=0,particles=[],templates=[];
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
 let activeMs=win.performance.now(),clock=win.performance.now(),clockRunning=!doc.hidden;
 function seconds(){const now=win.performance.now();if(clockRunning)activeMs+=now-clock;clock=now;clockRunning=!doc.hidden;return activeMs/1000;}
 function paint(){const age=seconds();for(const p of particles){const opacity=reduced.matches?(p.stage<0?.8:.5):growthOpacity(p.stage,age);p.opacity=opacity;p.node.setAttribute('opacity',String(opacity));if(p.moved)p.node.setAttribute('transform',`translate(${p.dx.toFixed(2)} ${p.dy.toFixed(2)}) rotate(${p.angle.toFixed(2)} ${p.restX} ${p.restY})`);else p.node.removeAttribute('transform');}}
 function scheduleGrowth(){win.clearTimeout(timer);if(destroyed||doc.hidden||!visible||reduced.matches)return;const age=seconds();const pending=GROWTH.some(t=>age<t+6);if(pending)timer=win.setTimeout(()=>{paint();scheduleGrowth();},1000);}
 function frame(now){raf=0;if(destroyed||!visible||doc.hidden||reduced.matches)return;const dt=Math.min((now-lastFrame)/1000,LIMITS.dt);lastFrame=now;const field=createSupportField(particles,width,height);let active=false;for(const p of particles){if(p.moved&&!p.active&&field.support(p.restX+p.dx,p.restY+p.dy,p)>p.restY+p.dy+2)p.active=true;if(p.active){stepParticle(p,dt,field);active||=p.active;}}paint();if(active)raf=win.requestAnimationFrame(frame);}
 function wake(){if(!ready||destroyed||!visible||doc.hidden)return;paint();scheduleGrowth();if(!reduced.matches&&!raf&&particles.some(p=>p.active)){lastFrame=win.performance.now();raf=win.requestAnimationFrame(frame);}}
 function rest(){win.cancelAnimationFrame(raf);raf=0;for(const p of particles){p.pausedMotion=p.active;p.vx=p.vy=p.spin=0;p.active=false;}if(ready)paint();}
 function build(){if(!ready||destroyed)return;const rect=layer.getBoundingClientRect(),nextWidth=rect.width,nextHeight=win.innerWidth<=760?84:112;if(nextWidth===width&&nextHeight===height)return;
  const oldWidth=width,oldHeight=height,previousParticles=new Map(particles.map(p=>[p.key,p]));width=nextWidth;height=nextHeight;surface.setAttribute('viewBox',`0 0 ${width} ${height}`);surface.replaceChildren();particles=[];const scale=height/28,tile=240*scale,offset=(width-tile)/2,retained=new Set();
  function appendParticle(template,tileIndex,old){if(particles.length>=LIMITS.maxLeaves)return;const tileX=offset+tileIndex*tile,x=tileX+template.x*scale,y=template.y*scale,key=tileIndex+':'+template.id;
   const wrapper=doc.createElementNS(ns,'g'),placement=doc.createElementNS(ns,'g');placement.setAttribute('transform',`translate(${tileX} 0) scale(${scale})`);placement.append(template.node.cloneNode(true));wrapper.append(placement);surface.append(wrapper);
   const particle={key,template,tileIndex,node:wrapper,stage:template.stage,restX:x,restY:y,floor:height-4,width,dx:0,dy:0,vx:0,vy:0,spin:0,angle:0,active:false,moved:false};particles.push(reconcileParticle(old,particle,oldWidth,oldHeight,width,height));retained.add(key);
  }
  // Displaced leaves get priority even when their original template tile is now
  // outside the viewport. Their normalized landing location is still visible.
  for(const old of previousParticles.values())if(old.moved)appendParticle(old.template,old.tileIndex,old);
  for(let tileIndex=-Math.ceil(width/tile);offset+tileIndex*tile<width;tileIndex++){const tileX=offset+tileIndex*tile;if(tileX+tile<0)continue;for(const template of templates){if(particles.length>=LIMITS.maxLeaves)break;const key=tileIndex+':'+template.id,x=tileX+template.x*scale;if(retained.has(key)||x<-60||x>width+60)continue;appendParticle(template,tileIndex,previousParticles.get(key));}}
  paint();scheduleGrowth();
 }
 function move(event){if(event.pointerType!=='mouse'||reduced.matches||!ready||!visible||doc.hidden)return;const current={x:event.clientX,y:event.clientY,time:event.timeStamp,scroll:win.scrollY};if(previous&&current.scroll===previous.scroll&&current.time-previous.time<4)return;const velocity=pointerVelocity(previous,current);previous=current;if(!velocity)return;const rect=surface.getBoundingClientRect(),x=current.x-rect.left,y=current.y-rect.top;if(x<0||x>rect.width||y<0||y>rect.height)return;let changed=false;for(const p of particles){if(p.opacity<.05)continue;const distance=Math.hypot(x-p.restX-p.dx,y-p.restY-p.dy);if(disturb(p,velocity,distance))changed=true;}if(changed)wake();}
 function visibility(){seconds();clock=win.performance.now();previous=null;if(doc.hidden){win.cancelAnimationFrame(raf);raf=0;win.clearTimeout(timer);}else wake();}
 const observer=new win.IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);previous=null;if(visible)wake();else{win.cancelAnimationFrame(raf);raf=0;win.clearTimeout(timer);}}, {rootMargin:'80px'});observer.observe(footer);
 const resize=new win.ResizeObserver(()=>{build();wake();});resize.observe(footer);
 win.addEventListener('resize',()=>{build();wake();},{passive:true,signal});win.addEventListener('pointermove',move,{passive:true,signal});win.addEventListener('scroll',()=>{previous=null;},{passive:true,signal});doc.addEventListener('visibilitychange',visibility,{signal});reduced.addEventListener('change',()=>{previous=null;if(reduced.matches)rest();else for(const p of particles){p.active=!!p.pausedMotion;p.pausedMotion=false;}wake();},{signal});
 const files=['leaf-piles-base.svg',...GROWTH.map((_,i)=>`leaf-pile-growth-${i+1}.svg`)];
 const loading=Promise.all(files.map(async(file,index)=>{const response=await win.fetch(new URL(`platform-assets/${file}`,import.meta.url),{signal});if(!response.ok)throw Error('Decorative foliage unavailable');const xml=new win.DOMParser().parseFromString(await response.text(),'image/svg+xml');if(xml.querySelector('parsererror'))throw Error('Invalid decorative SVG');return [...xml.documentElement.children].filter(n=>n.tagName==='g'&&!n.hasAttribute('data-wrap-copy')).map((node,leafIndex)=>{const transform=node.getAttribute('transform')||'',match=transform.match(/translate\(([-.\d]+) ([-.\d]+)\)/);return {id:index+':'+leafIndex,node:doc.importNode(node,true),stage:index-1,x: +(match?.[1]||0)+5,y: +(match?.[2]||0)+4};});})).then(groups=>{if(destroyed)return;templates=[...groups.slice(1).flat(),...groups[0]];ready=true;layer.append(surface);build();layer.classList.add('platform-piles-interactive');wake();}).catch(()=>{surface.remove();layer.classList.remove('platform-piles-interactive');});
 function destroy(){if(destroyed)return;destroyed=true;abort.abort();observer.disconnect();resize.disconnect();win.cancelAnimationFrame(raf);win.clearTimeout(timer);surface.remove();layer.classList.remove('platform-piles-interactive');particles=[];}
 win.addEventListener('pagehide',event=>{if(!event.persisted)destroy();},{signal});
 return {destroy,loading};
}
if(typeof document!=='undefined'&&typeof window!=='undefined')createPileDecoration();
