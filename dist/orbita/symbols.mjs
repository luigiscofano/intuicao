// Display only: numeric type IDs and saved level definitions remain unchanged.
const SHAPES=Object.freeze([
  {symbol:'★',name:'estrela'},
  {symbol:'▲',name:'triângulo'},
  {symbol:'■',name:'quadrado'},
  {symbol:'◆',name:'losango'},
  {symbol:'✚',name:'cruz'},
  {symbol:'♥',name:'coração'}
].map(Object.freeze));
const numeric=type=>/^[1-6]$/.test(type?.symbol??'');

export function orbitaAppearance(level,typeId){
  const types=level.pieceTypes??[],original=types.find(type=>type.id===typeId);
  if(!original)return {symbol:String(typeId),name:String(typeId)};
  if(!numeric(original))return {symbol:original.symbol,name:original.name??original.symbol};
  // Preserve custom symbols and avoid giving two different types the same shape.
  const reserved=new Set(types.filter(type=>!numeric(type)).map(type=>type.symbol));
  for(const type of types.filter(numeric)){
    const preferred=SHAPES[Number(type.symbol)-1];
    const shape=!reserved.has(preferred.symbol)?preferred:SHAPES.find(item=>!reserved.has(item.symbol));
    const display=shape??{symbol:type.symbol,name:type.name??type.symbol};
    reserved.add(display.symbol);
    if(type.id===typeId)return display;
  }
  return {symbol:original.symbol,name:original.name??original.symbol};
}

export const orbitaSymbol=(level,type)=>orbitaAppearance(level,type).symbol;
export const orbitaTypeName=(level,type)=>orbitaAppearance(level,type).name;
export function orbitaLesson(level,text){
  return String(text).replace(/\b(peça|símbolo)\s+([1-6])\b/gi,(match,label,id)=>{
    const type=level.pieceTypes.find(item=>item.symbol===id);
    return type?label+' '+orbitaSymbol(level,type.id):match;
  });
}
