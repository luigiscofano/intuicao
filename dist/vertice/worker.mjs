import {restoreVertice} from './engine.mjs';
import {chooseVerticeMove} from './bot.mjs';
self.onmessage=event=>{const {id,state,options}=event.data||{};try{const valid=restoreVertice(state);if(!valid)throw Error('Estado de VÉRTICE inválido.');self.postMessage({id,result:chooseVerticeMove(valid,options||{})});}catch(error){self.postMessage({id,error:error.message});}};
