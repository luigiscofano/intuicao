// Contadores independentes do tabuleiro. Recomeçar não apaga o desbloqueio.
const STORE='intuicao.answers.v1';
export function createAnswerProgress(storage=globalThis.localStorage){
 let records={},lastRaw=null;try{const saved=JSON.parse(storage?.getItem(STORE)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))records=saved;}catch{}
 const refresh=()=>{try{const raw=storage?.getItem(STORE)||'{}';if(raw===lastRaw)return;const saved=JSON.parse(raw);lastRaw=raw;if(saved&&typeof saved==='object'&&!Array.isArray(saved))for(const [key,x] of Object.entries(saved)){const own=records[key];records[key]={failures:Math.max(Number.isSafeInteger(x?.failures)&&x.failures>0?x.failures:0,Number.isSafeInteger(own?.failures)&&own.failures>0?own.failures:0),assisted:x?.assisted===true||own?.assisted===true};}}catch{}};
 const get=key=>{refresh();const x=records[key];return {failures:Number.isSafeInteger(x?.failures)&&x.failures>0?x.failures:0,assisted:x?.assisted===true};};
 const save=(key,value)=>{records[key]=value;try{const raw=JSON.stringify(records);storage?.setItem(STORE,raw);lastRaw=raw;}catch{}return {...value};};
 return {get,unlocked:key=>get(key).failures>=3,fail:key=>save(key,{...get(key),failures:Math.min(Number.MAX_SAFE_INTEGER,get(key).failures+1)}),assist:key=>save(key,{...get(key),assisted:true})};
}
