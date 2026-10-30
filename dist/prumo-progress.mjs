/** PRUMO80 migration is identity-based, never positional. Original records remain intact. */
export function migratePrumoProgress(data,levels,storage=globalThis.localStorage){
 if(!levels?.length)return false;
 const active=new Set(levels.map(l=>l.id));
 const isCampaign=id=>/^prumo(?:-v\d+)?-\d+$/.test(id);
 const oldId=data.lastSessions?.prumo;
 let answers={};try{answers=JSON.parse(storage?.getItem('intuicao.answers.v1')||'{}')??{};}catch{}
 const retired=[...new Set([...Object.keys(data.sessions??{}),...(data.completed??[]),...Object.keys(answers).filter(k=>k.startsWith('prumo:')).map(k=>k.slice(6)),...(oldId?[oldId]:[])])].filter(id=>isCampaign(id)&&!active.has(id));
 let changed=false;
 if(retired.length){
  data.prumoLegacy??={lastSessionIds:[]};data.prumoLegacy.lastSessionIds??=[];
  data.prumoLegacy.campaign80??={version:1,records:{},policy:'Original IDs retained; no conclusions, attempts, assistance or undo transferred by position.'};
  const archive=data.prumoLegacy.campaign80.records;
  for(const id of retired)if(!Object.hasOwn(archive,id)){
   archive[id]={id,completed:(data.completed??[]).includes(id),...(data.sessions?.[id]?{session:structuredClone(data.sessions[id])}:{}),...(answers['prumo:'+id]?{answer:structuredClone(answers['prumo:'+id])}:{})};changed=true;
  }
  if(oldId&&isCampaign(oldId)&&!active.has(oldId)){
   if(!data.prumoLegacy.lastSessionIds.includes(oldId))data.prumoLegacy.lastSessionIds.push(oldId);
   // Retired puzzle has no equivalent current puzzle. Do not map its old ordinal.
   delete data.lastSessions.prumo;changed=true;
  }
 }
 return changed;
}
