import test from 'node:test';
import assert from 'node:assert/strict';
import {Worker} from 'node:worker_threads';
import {createTrama, tramaStateKey} from '../dist/trama/engine.mjs';
const url = new URL('../dist/trama/worker.mjs', import.meta.url).href;
function worker() {
 const source = `import {parentPort} from 'node:worker_threads';
 globalThis.self={postMessage:message=>parentPort.postMessage(message)};
 await import(${JSON.stringify(url)});
 parentPort.on('message',data=>self.onmessage({data}));parentPort.postMessage({ready:true});`;
 return new Worker(new URL('data:text/javascript,' + encodeURIComponent(source)), {type:'module'});
}
function receive(w, predicate, timeout=5000) {
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{cleanup();reject(Error('Worker não respondeu.'));},timeout);
  const cleanup=()=>{clearTimeout(timer);w.off('message',onMessage);w.off('error',onError);};
  const onMessage=message=>{if(predicate(message)){cleanup();resolve(message);}};
  const onError=error=>{cleanup();reject(error);};w.on('message',onMessage);w.on('error',onError);
 });
}
test('worker: valida estado, identifica origem e descarta busca substituída/cancelada',async()=>{
 const w=worker(),messages=[];w.on('message',m=>messages.push(m));
 try {
  await receive(w,m=>m.ready);const s=createTrama();
  w.postMessage({id:'old',matchId:'matchA',state:s,options:{difficulty:'strong'}});
  w.postMessage({type:'cancel',id:'old'});
  const done=receive(w,m=>m.id==='new');w.postMessage({id:'new',matchId:'matchB',state:s,options:{difficulty:'beginner',seed:1}});
  const answer=await done;assert.equal(answer.matchId,'matchB');assert.equal(answer.stateKey,tramaStateKey(s));assert.ok(Number.isInteger(answer.result.move));
  const rejected=receive(w,m=>m.id==='bad');w.postMessage({id:'bad',state:{...s,turn:99}});assert.match((await rejected).error,/inválido/);
  assert.equal(messages.some(m=>m.id==='old'),false);
 } finally {await w.terminate();}
});
