import {createEngine,replay,validateLevel} from '../dist/orbita/engine.mjs';
/** Add a witnessed goal on a cell only the gated command moves.
 * Its initial mismatch is a structural necessity proof for the gated command,
 * independent of search bounds. Does not change occupancy/geometry/motor.
 */
export function requireSensorInDebut(candidate){
 const level=structuredClone(candidate),end=replay(level,level.solution);if(!end.valid||!end.solved)throw Error('Invalid input certificate');
 const gated=level.commands.find(c=>c.requires?.length);if(!gated)throw Error('Missing gate');
 const moved=c=>new Set(c.turns.flatMap(t=>level.rings.find(r=>r.id===t.ring).cells));
 const gatedCells=moved(gated),otherCells=new Set(level.commands.filter(c=>c.id!==gated.id).flatMap(c=>[...moved(c)]));
 const witness=[...gatedCells].find(cell=>!otherCells.has(cell)&&end.state.occupancy[cell]!=='n'&&level.initial[cell]!==end.state.occupancy[cell]);
 if(!witness)throw Error('No exclusive mismatched target witness');
 level.targets[witness]=end.state.occupancy[witness];
 level.authorship??={};level.authorship.sensorNecessityWitness={command:gated.id,cell:witness,initialType:level.initial[witness],targetType:level.targets[witness],proof:'Only the gated command moves this initially incorrect target cell.'};
 const engine=createEngine(level);if(engine.commandStatus(engine.initialState(),gated.id).allowed)throw Error('Debut gate must begin blocked');
 if(!validateLevel(level).valid||!replay(level,level.solution).solved)throw Error('Modified target invalid');
 return level;
}
