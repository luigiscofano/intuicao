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
 // Postes e barras leves; a abertura ainda libera o centro da divisória.
 const closed='<rect x="2" y="10" width="8" height="2" fill="#b77b43"/><rect x="2" y="21" width="8" height="2" fill="#b77b43"/><rect x="5" y="11" width="2" height="11" fill="#e6b94f"/>';
 const opened='<rect x="2" y="5" width="1" height="6" fill="#b77b43"/><rect x="9" y="21" width="1" height="6" fill="#b77b43"/>';
 const art='<rect x="0" y="4" width="2" height="24" fill="#403c31"/><rect x="10" y="4" width="2" height="24" fill="#403c31"/><rect x="1" y="5" width="1" height="22" fill="#e8b975"/><rect x="11" y="5" width="1" height="22" fill="#e8b975"/>'+(open?opened:closed);
 return `<svg class="s-accessory-edge s-gate-art" viewBox="0 0 ${vertical?'12 32':'32 12'}" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${vertical?art:`<g transform="translate(32 0) rotate(90)">${art}</g>`}</svg>`;
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
