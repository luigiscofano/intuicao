/** Mapas imutáveis e versionados. Paredes não pertencem a nenhuma equipe. */
const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
const starts=[[0,2,4],[20,22,24]];
const definitions=[
 {id:'classic',name:'Clássico',description:'O tabuleiro original, livre de paredes iniciais.',walls:[],outside:[]},
 {id:'lago',name:'Lago central',description:'Uma parede central cria dois caminhos ao redor.',walls:[12],outside:[]},
 {id:'pilares',name:'Quatro pilares',description:'Quatro obstáculos deixam uma passagem em cruz.',walls:[6,8,16,18],outside:[]},
 {id:'portais',name:'Portais',description:'As laterais fechadas concentram a travessia no centro.',walls:[10,14],outside:[]},
 {id:'ampulheta',name:'Ampulheta',description:'As bordas recuam em duas fileiras, estreitando as passagens.',walls:[],outside:[5,9,15,19]},
 {id:'cantos',name:'Cantos recortados',description:'Um tabuleiro sem cantos, com as equipes lado a lado.',walls:[],outside:[0,4,20,24],starts:[[1,2,3],[21,22,23]]},
 {id:'canais',name:'Canais',description:'Pilares e um núcleo central separam pequenos corredores.',walls:[6,8,12,16,18],outside:[]},
];
export const CERCO_MAPS=freeze(definitions.map(m=>({...m,rows:5,cols:5,version:1,starts:m.starts||starts,maxMoves:25-m.walls.length-m.outside.length-6})));
export function getCercoMap(idOrState='classic'){
 const id=typeof idOrState==='string'?idOrState:(idOrState&&typeof idOrState==='object'&&!Array.isArray(idOrState)?(Object.hasOwn(idOrState,'mapId')?idOrState.mapId:'classic'):null);
 return CERCO_MAPS.find(m=>m.id===id)||null;
}
