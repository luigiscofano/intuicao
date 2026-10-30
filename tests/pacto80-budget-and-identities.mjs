import assert from 'node:assert/strict';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {SYMBOL_LEVELS as OLD} from './fixtures/pacto-legacy-levels.mjs';
import {solveSymbols,profileSymbols,validateSymbolEditing,validateSymbols} from '../dist/symbol-games.mjs';
const old=new Map(OLD.pacto.map(l=>[l.id,l]));let kept=0,changed=0;
for(const l of SYMBOL_LEVELS.pacto){assert.equal(l.campaignVersion,2);assert.equal(l.rulesVersion,1);assert.equal(l.rows,8);assert.equal(l.cols,8);assert.equal(validateSymbolEditing(l).violations.length,0);assert.equal(profileSymbols(l).logical,true);assert.ok(validateSymbols(l,l.solution).valid);
 if(old.has(l.id)){assert.deepEqual(l.clues,old.get(l.id).clues);assert.deepEqual(l.solution,old.get(l.id).solution);kept++;}else{assert.ok(l.id.startsWith('pacto-v2-'));assert.notDeepEqual(l.clues,old.get(l.design.origin.sourceId).clues);changed++;}
 const limited=solveSymbols(l,l.clues,2,{maxNodes:0});assert.equal(limited.complete,false);assert.equal(limited.count,0,'zero candidates under interrupted search is not an unsatisfiability proof');
}
assert.equal(new Set(SYMBOL_LEVELS.pacto.map(l=>l.id)).size,80);assert.ok(kept&&changed);
console.log(JSON.stringify({passed:true,kept,changed,explicitlyInconclusiveBudgetChecks:80}));
