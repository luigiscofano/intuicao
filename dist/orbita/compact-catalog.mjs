// Compact, independently certified substitutions for the eight layouts that
// cannot keep 26px pieces separated by28px in the265px phone board.
// The other72 campaign definitions are returned by reference, unchanged.
import {CATALOG} from './catalog.mjs';
import {CATALOG as CERTIFIED_POOL} from './catalog-legacy1000.mjs';
export const COMPACT_SOURCE_MAP=Object.freeze({48:221,51:444,64:773,66:734,73:940,74:780,75:931,80:953});
export const CHANGED_PHASES=Object.freeze(Object.keys(COMPACT_SOURCE_MAP).map(Number));
export const COMPACT_CAMPAIGN=Object.freeze(CATALOG.map((old,index)=>{
 const phase=index+1,sourceId=COMPACT_SOURCE_MAP[phase];if(!sourceId)return old;
 const source=CERTIFIED_POOL.find(item=>item.id===sourceId);if(!source)throw new Error('Missing compact certificate '+sourceId);
 const level=structuredClone(source);
 Object.assign(level,{id:10000+phase,name:old.name,catalogVersion:5,definitionVersion:'orbita80-compact-1',editorialLevel:phase,editorialTierIndex:old.editorialTierIndex,difficulty:old.difficulty,difficultyBand:old.difficultyBand,chapter:old.chapter,editorialDiscovery:old.editorialDiscovery,discovery:old.discovery});
 level.editorialOrigin={catalog:'orbita-campaign-3',sourceLevel:sourceId,action:'compact-certified-substitution',replacesId:old.id,replacesDefinitionVersion:old.definitionVersion};
 level.validation={...level.validation,campaign80:true,compactPresentation:true};
 // The physical network can change, but commands, sensor requirements and the
 // solution certificate always come together from the same certified source.
 if(phase===51)level.discovery='Organize as transferências pelos quatro anéis e mantenha a condição do sensor.';
 if(phase===64)level.discovery='Planeje as transferências pela cadeia compacta e restaure os alvos que saem do lugar.';
 if(phase===75)level.discovery='Compare as rotas da rede compacta de quatro anéis e complete todos os alvos ao mesmo tempo.';
 level.authorship={...level.authorship,compactEditorialNote:'Selected certified compact network; difficulty remains editorial, not human-playtested.'};
 return Object.freeze(level);
}));
export const COMPACT_REPLACEMENT_REPORT=Object.freeze(CHANGED_PHASES.map(phase=>{
 const old=CATALOG[phase-1],level=COMPACT_CAMPAIGN[phase-1];return Object.freeze({phase,oldId:old.id,newId:level.id,sourceId:COMPACT_SOURCE_MAP[phase],oldRings:old.rings.length,newRings:level.rings.length,oldCells:old.cells.length,newCells:level.cells.length,oldSolutionLength:old.solution.length,newSolutionLength:level.solution.length,oldFamily:old.family,newFamily:level.family,concept:old.editorialDiscovery});
}));
