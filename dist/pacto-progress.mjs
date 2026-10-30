/** PACTO80 migration is identity-based, never positional. Original records remain intact. */
export function migratePactoProgress(data,levels,storage=globalThis.localStorage){
 if(!levels?.length)return false;
 const active=new Set(levels.map(l=>l.id));
 const isCampaign=id=>/^pacto(?:-v\d+)?-\d+$/.test(id);
 const oldId=data.lastSessions?.pacto;
 let answers={};try{answers=JSON.parse(storage?.getItem('intuicao.answers.v1')||'{}')??{};}catch{}
 const retired=[...new Set([...Object.keys(data.sessions??{}),...(data.completed??[]),...Object.keys(answers).filter(k=>k.startsWith('pacto:')).map(k=>k.slice(6)),...(oldId?[oldId]:[])])].filter(id=>isCampaign(id)&&!active.has(id));
 let changed=false;
 if(retired.length){
  data.pactoLegacy??={lastSessionIds:[]};data.pactoLegacy.lastSessionIds??=[];
  data.pactoLegacy.campaign80??={version:1,records:{},policy:'Original IDs retained; no conclusions, attempts, assistance or undo transferred by position.'};
  const archive=data.pactoLegacy.campaign80.records;
  for(const id of retired)if(!Object.hasOwn(archive,id)){
   archive[id]={id,completed:(data.completed??[]).includes(id),...(data.sessions?.[id]?{session:structuredClone(data.sessions[id])}:{}),...(answers['pacto:'+id]?{answer:structuredClone(answers['pacto:'+id])}:{})};changed=true;
  }
  if(oldId&&isCampaign(oldId)&&!active.has(oldId)){
   if(!data.pactoLegacy.lastSessionIds.includes(oldId))data.pactoLegacy.lastSessionIds.push(oldId);
   // Retired puzzle has no equivalent current puzzle. Do not map its old ordinal.
   delete data.lastSessions.pacto;changed=true;
  }
 }
 return changed;
}
