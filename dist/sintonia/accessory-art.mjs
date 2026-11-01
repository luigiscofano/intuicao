// Arte aprovada em 32 px; animais e regras permanecem em seus módulos originais.
const states={key:2,gate:2,plate:2,switch:2,box:2,portal:1,oneway:1,selector:2,delivery:2,bridge:2,ice:1,goal:2};
const rotations={right:0,down:90,left:180,up:270};
export function accessoryIcon(name,state=0,palette='C'){
 if(name==='switchOn'){name='switch';state=1;}
 if(name==='deliveryIn'){name='delivery';state=0;}
 if(name==='deliveryOut'){name='delivery';state=1;}
 let turn=0;if(Object.hasOwn(rotations,name)){turn=rotations[name];name='oneway';}
 if(!Object.hasOwn(states,name))throw new Error('Acessório desconhecido');
 const frame=states[name]>1&&state?1:0;
 const variant=['plate','switch'].includes(name)?`palettes/${['C','D','E'].includes(palette)?palette:'C'}/`:'';
 const src=new URL(`./assets/accessories/${variant}${name}-${frame}.png`,import.meta.url).href;
 return `<img class="s-accessory-icon s-accessory-art" src="${src}" width="32" height="32" alt="" aria-hidden="true" draggable="false"${turn?` style="transform:rotate(${turn}deg)"`:''}>`;
}
export function accessoryEdgeIcon({open=false,oneway=false,direction='right',vertical=true}={}){
 if(oneway)return accessoryIcon(direction);
 // Opção B aprovada: os retângulos originais são preservados em 16 × 32.
 const closed='<rect x="5" y="1" width="6" height="4" fill="#34443a"/><rect x="6" y="2" width="4" height="2" fill="#a3bd7b"/><rect x="6" y="2" width="4" height="1" fill="#d6e5b1"/><rect x="5" y="27" width="6" height="4" fill="#34443a"/><rect x="6" y="28" width="4" height="2" fill="#a3bd7b"/><rect x="6" y="28" width="4" height="1" fill="#d6e5b1"/><rect x="6" y="5" width="4" height="11" fill="#77543b"/><rect x="7" y="5" width="2" height="10" fill="#b77b43"/><rect x="7" y="6" width="1" height="8" fill="#e8b975"/><rect x="6" y="17" width="4" height="10" fill="#77543b"/><rect x="7" y="18" width="2" height="9" fill="#b77b43"/><rect x="7" y="19" width="1" height="7" fill="#e8b975"/><rect x="5" y="15" width="6" height="3" fill="#7d9861"/><rect x="6" y="16" width="4" height="1" fill="#d6e5b1"/>';
 const opened='<rect x="5" y="1" width="6" height="4" fill="#34443a"/><rect x="6" y="2" width="4" height="2" fill="#a3bd7b"/><rect x="6" y="2" width="4" height="1" fill="#d6e5b1"/><rect x="5" y="27" width="6" height="4" fill="#34443a"/><rect x="6" y="28" width="4" height="2" fill="#a3bd7b"/><rect x="6" y="28" width="4" height="1" fill="#d6e5b1"/><rect x="9" y="5" width="6" height="3" fill="#77543b"/><rect x="10" y="5" width="4" height="1" fill="#e8b975"/><rect x="1" y="24" width="6" height="3" fill="#77543b"/><rect x="2" y="24" width="4" height="1" fill="#e8b975"/>';
 const art=open?opened:closed;
 return `<svg class="s-accessory-edge s-gate-art" viewBox="0 0 ${vertical?'16 32':'32 16'}" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${vertical?art:`<g transform="translate(32 0) rotate(90)">${art}</g>`}</svg>`;
}
const cache=new Map();
// Mesmo mosaico da prancha: vizinhos compartilham pixels, sem linhas entre casas.
export function wallOverlay(board){
 const {cols,rows}=board;const walkable=new Set(board.walkable);
 const key=`${cols},${rows}:${[...walkable].sort((a,b)=>a-b).join(',')}`;
 if(cache.has(key))return cache.get(key);
 const w=cols*32,h=rows*32;
 const inside=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&!walkable.has(Math.floor(y/32)*cols+Math.floor(x/32));
 const color=(x,y)=>{
  if(!inside(x,y))return null;
  if([[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0],[0,2],[0,-2]].some(([dx,dy])=>!inside(x+dx,y+dy)))return '#34443a';
  if(!inside(x,y-4))return '#d6e5b1';
  if(!inside(x+4,y)||!inside(x,y+4))return '#7d9861';
  let c='#a3bd7b';if(y%14===10)c='#92ac70';
  if((x+(Math.floor(y/14)%2?14:0))%29===24&&y%14<10)c='#92ac70';
  if((x+7*y)%71<5&&(y%14===3||y%14===4))c='#bed493';return c;
 };
 const paths=new Map();
 for(let y=0;y<h;y++){let x=0;while(x<w){const c=color(x,y),start=x;while(x<w&&color(x,y)===c)x++;if(c)paths.set(c,(paths.get(c)||'')+`M${start} ${y}h${x-start}v1h-${x-start}z`);}}
 const result=`<svg class="s-wall-art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${[...paths].map(([c,d])=>`<path fill="${c}" d="${d}"/>`).join('')}</svg>`;
 if(cache.size>160)cache.clear();cache.set(key,result);return result;
}
