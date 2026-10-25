import assert from 'node:assert/strict';
import {buildDesvioContextHint} from '../dist/desvio-hints.mjs';
import {createDesvio,applyDesvioMove,legalDesvioMoves} from '../dist/desvio.mjs';
const map={id:'hint-map',rows:2,cols:3,arrows:['H','V','H','V','H','V']},start=createDesvio(map);
for(const mode of ['local','bot','competitive','training']){
 const before=JSON.stringify(start),a=buildDesvioContextHint(map,start,{mode});assert.match(a.focusText,/6 casas disponíveis/);assert.match(a.focusText,/jogador 1/);assert.equal(JSON.stringify(start),before);assert.deepEqual(a.cells,[]);assert.equal(a.action,undefined);
 const selected=buildDesvioContextHint(map,start,{mode,preview:1});assert.match(selected.explanation,/L1C2/);assert.match(selected.explanation,/coluna 2/);
 const next=applyDesvioMove(map,start,1),b=buildDesvioContextHint(map,next,{mode});assert.match(b.focusText,/jogador 2/);assert.match(b.focusText,/coluna 2/);assert.match(b.focusText,/1 casa disponível/);assert.notEqual(a.focusText,b.focusText);
 if(mode==='competitive'){assert.match(a.nextStep,/Não revelam melhor jogada/);assert.doesNotMatch(a.explanation,/vencedor|perdedor|garantir/);}
 if(mode==='training')assert.match(a.nextStep,/Analisar posição/);
 let s=next;while(s.winner===null)s=applyDesvioMove(map,s,legalDesvioMoves(map,s)[0]);assert.match(buildDesvioContextHint(map,s,{mode}).focusText,/venceu/);
}
console.log('PASS DESVIO contextual per mode/map/turn/selection, no solver or suggested move outside explicit training analysis, immutable state and completed-game explanation');
