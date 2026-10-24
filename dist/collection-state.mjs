// Histórico independente da interface: cada transação inclui valores, lápis e marcas.
export function createHistory(initial){return {past:[],present:structuredClone(initial),future:[]};}
export function commitHistory(history,next){if(JSON.stringify(history.present)===JSON.stringify(next))return history;return {past:[...history.past,structuredClone(history.present)].slice(-300),present:structuredClone(next),future:[]};}
export function undoHistory(history){if(!history.past.length)return history;return {past:history.past.slice(0,-1),present:structuredClone(history.past.at(-1)),future:[structuredClone(history.present),...history.future]};}
export function redoHistory(history){if(!history.future.length)return history;return {past:[...history.past,structuredClone(history.present)],present:structuredClone(history.future[0]),future:history.future.slice(1)};}
export function dailyIndex(game,date,count){let h=2166136261;for(const char of `${game}:${date}`)h=Math.imul(h^char.charCodeAt(0),16777619);return (h>>>0)%count;}
export function loadCollection(store=globalThis.localStorage){try{const x=JSON.parse(store?.getItem('intuicao.collection.v1')||'null');return x?.version===1&&x.sessions&&Array.isArray(x.completed)?x:{version:1,sessions:{},completed:[],events:[]};}catch{return {version:1,sessions:{},completed:[],events:[]};}}
export function saveCollection(data,store=globalThis.localStorage){try{store?.setItem('intuicao.collection.v1',JSON.stringify(data));return true;}catch{return false;}}
export function recordEvent(data,type,details={}){data.events=[...(data.events||[]),{type,at:new Date().toISOString(),...details}].slice(-500);}
