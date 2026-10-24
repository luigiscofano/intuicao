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
 const f=(1-distance/LIMITS.radius),strength=clamp(v.speed/1000,0,1.5),eventScale=clamp((v.dt??(1/60))*60,.24,3);
 if(v.speed<=420&&(!p.active||p.gentle)){p.gentle=true;p.vx=clamp(p.vx+v.x*.025*f*eventScale,-15,15);p.vy=clamp(p.vy-(2+strength*12)*f*eventScale,-12,12);p.flight=0;p.active=true;return true;}
 p.gentle=false;
 p.vx=clamp(p.vx+v.x*.13*f*eventScale,-LIMITS.velocity,LIMITS.velocity);
 p.vy=clamp(p.vy-(7+strength*145)*f*eventScale,-LIMITS.velocity,LIMITS.velocity);
 p.spin=clamp((p.spin||0)+v.x*.08*f,-120,120);
 p.flight=v.speed>420?.38:0;p.active=true;return true;
}
export function stepParticle(p,dt){
 dt=clamp(dt,0,LIMITS.dt);p.flight=Math.max(0,p.flight-dt);
 const airborne=p.flight>0;
 p.vx+=(-p.dx*(airborne?3:34))*dt;
 p.vy+=(airborne?240:-p.dy*34)*dt;
 const drag=Math.exp(-(airborne?1.4:8)*dt);p.vx*=drag;p.vy*=drag;
 p.dx=clamp(p.dx+p.vx*dt,p.gentle?-7:-145,p.gentle?7:145);p.dy+=p.vy*dt;
 if(p.gentle)p.dy=clamp(p.dy,-5,5);
 // The reserved ornamental strip is the sole physics world, never footer text.
 const ceiling=2-p.restY,floor=p.floor-p.restY;
 if(p.dy<ceiling){p.dy=ceiling;p.vy=Math.abs(p.vy)*.22;}
 if(p.dy>floor){p.dy=floor;p.vy=-Math.abs(p.vy)*.18;p.vx*=.65;}
 p.angle=(p.angle||0)+(p.spin||0)*dt;p.spin=(p.spin||0)*Math.exp(-6*dt);p.angle*=Math.exp(-3*dt);
 if(p.flight===0&&Math.abs(p.dx)+Math.abs(p.dy)<.08&&Math.abs(p.vx)+Math.abs(p.vy)<.2){p.dx=p.dy=p.vx=p.vy=p.angle=p.spin=0;p.active=false;}
 return p;
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
 function paint(){const age=seconds();for(const p of particles){const opacity=reduced.matches?(p.stage<0?.8:.5):growthOpacity(p.stage,age);p.opacity=opacity;p.node.setAttribute('opacity',String(opacity));if(p.active)p.node.setAttribute('transform',`translate(${p.dx.toFixed(2)} ${p.dy.toFixed(2)}) rotate(${p.angle.toFixed(2)} ${p.restX} ${p.restY})`);else p.node.removeAttribute('transform');}}
 function scheduleGrowth(){win.clearTimeout(timer);if(destroyed||doc.hidden||!visible||reduced.matches)return;const age=seconds();const pending=GROWTH.some(t=>age<t+6);if(pending)timer=win.setTimeout(()=>{paint();scheduleGrowth();},1000);}
 function frame(now){raf=0;if(destroyed||!visible||doc.hidden)return;const dt=Math.min((now-lastFrame)/1000,LIMITS.dt);lastFrame=now;let active=false;for(const p of particles)if(p.active){stepParticle(p,dt);active||=p.active;}paint();if(active)raf=win.requestAnimationFrame(frame);}
 function wake(){if(!ready||destroyed||!visible||doc.hidden)return;paint();scheduleGrowth();if(!raf&&particles.some(p=>p.active)){lastFrame=win.performance.now();raf=win.requestAnimationFrame(frame);}}
 function rest(){for(const p of particles){p.dx=p.dy=p.vx=p.vy=p.angle=p.spin=p.flight=0;p.active=false;}if(ready)paint();}
 function build(){if(!ready||destroyed)return;const rect=layer.getBoundingClientRect(),nextWidth=rect.width,nextHeight=win.innerWidth<=760?84:112;if(nextWidth===width&&nextHeight===height)return;width=nextWidth;height=nextHeight;surface.setAttribute('viewBox',`0 0 ${width} ${height}`);surface.replaceChildren();particles=[];const scale=height/28,tile=240*scale,offset=(width-tile)/2;
 for(let tileX=offset-Math.ceil(width/tile)*tile;tileX<width;tileX+=tile){if(tileX+tile<0)continue;for(const template of templates){if(particles.length>=LIMITS.maxLeaves)break;const x=tileX+template.x*scale,y=template.y*scale;if(x<-60||x>width+60)continue;const wrapper=doc.createElementNS(ns,'g'),placement=doc.createElementNS(ns,'g');placement.setAttribute('transform',`translate(${tileX} 0) scale(${scale})`);placement.append(template.node.cloneNode(true));wrapper.append(placement);surface.append(wrapper);particles.push({node:wrapper,stage:template.stage,restX:x,restY:y,floor:Math.max(height-2,y),dx:0,dy:0,vx:0,vy:0,flight:0,spin:0,angle:0,active:false});}}
 paint();scheduleGrowth();}
 function move(event){if(event.pointerType!=='mouse'||reduced.matches||!ready||!visible||doc.hidden)return;const current={x:event.clientX,y:event.clientY,time:event.timeStamp,scroll:win.scrollY};if(previous&&current.scroll===previous.scroll&&current.time-previous.time<4)return;const velocity=pointerVelocity(previous,current);previous=current;if(!velocity)return;const rect=surface.getBoundingClientRect(),x=current.x-rect.left,y=current.y-rect.top;if(x<0||x>rect.width||y<0||y>rect.height)return;let changed=false;for(const p of particles){if(p.opacity<.05)continue;const distance=Math.hypot(x-p.restX-p.dx,y-p.restY-p.dy);if(disturb(p,velocity,distance))changed=true;}if(changed)wake();}
 function visibility(){seconds();clock=win.performance.now();previous=null;if(doc.hidden){win.cancelAnimationFrame(raf);raf=0;win.clearTimeout(timer);}else wake();}
 const observer=new win.IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);previous=null;if(visible)wake();else{win.cancelAnimationFrame(raf);raf=0;win.clearTimeout(timer);}}, {rootMargin:'80px'});observer.observe(footer);
 const resize=new win.ResizeObserver(()=>{build();wake();});resize.observe(footer);
 win.addEventListener('resize',()=>{build();wake();},{passive:true,signal});win.addEventListener('pointermove',move,{passive:true,signal});win.addEventListener('scroll',()=>{previous=null;},{passive:true,signal});doc.addEventListener('visibilitychange',visibility,{signal});reduced.addEventListener('change',()=>{previous=null;rest();wake();},{signal});
 const files=['leaf-piles-base.svg',...GROWTH.map((_,i)=>`leaf-pile-growth-${i+1}.svg`)];
 const loading=Promise.all(files.map(async(file,index)=>{const response=await win.fetch(new URL(`platform-assets/${file}`,import.meta.url),{signal});if(!response.ok)throw Error('Decorative foliage unavailable');const xml=new win.DOMParser().parseFromString(await response.text(),'image/svg+xml');if(xml.querySelector('parsererror'))throw Error('Invalid decorative SVG');return [...xml.documentElement.children].filter(n=>n.tagName==='g').map(node=>{const transform=node.getAttribute('transform')||'',match=transform.match(/translate\(([-.\d]+) ([-.\d]+)\)/);return {node:doc.importNode(node,true),stage:index-1,x: +(match?.[1]||0)+5,y: +(match?.[2]||0)+4};});})).then(groups=>{if(destroyed)return;templates=[...groups.slice(1).flat(),...groups[0]];ready=true;layer.append(surface);build();layer.classList.add('platform-piles-interactive');wake();}).catch(()=>{surface.remove();layer.classList.remove('platform-piles-interactive');});
 function destroy(){if(destroyed)return;destroyed=true;abort.abort();observer.disconnect();resize.disconnect();win.cancelAnimationFrame(raf);win.clearTimeout(timer);surface.remove();layer.classList.remove('platform-piles-interactive');particles=[];}
 win.addEventListener('pagehide',event=>{if(!event.persisted)destroy();},{signal});
 return {destroy,loading};
}
if(typeof document!=='undefined'&&typeof window!=='undefined')createPileDecoration();
