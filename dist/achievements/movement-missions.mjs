/** Live command evidence; versioned saves retain it without awarding on restore. */
export function createMovementAttempt({official=false, fresh=false, priorBest=null, clean=true}={}) {
  return {official, eligible:fresh, clean, frames:[], priorBest:Number.isSafeInteger(priorBest)&&priorBest>0?priorBest:null, finished:false};
}
/** Versioned evidence is bound to the exact engine-validated session. Restoring
 * never evaluates a victory. Historical baton flags are checked against engine
 * transitions, while clean/human flags retain the actual interaction provenance.
 */
export function serializeMovementAttempt(attempt,{session,definition}={}) {
  if(!attempt?.eligible||!attempt.official||typeof definition!=='string')return null;
  return {version:1,definition,commands:JSON.stringify(session.commands),cursor:session.cursor,
    clean:attempt.clean,finished:attempt.finished,priorBest:attempt.priorBest,
    frames:attempt.frames.map(frame=>({...frame}))};
}
export function startMovementAttempt({official=false,session,saved=null,reset=false,priorBest=null,definition,validateBaton=()=>false}={}) {
  const fresh=createMovementAttempt({official,priorBest,
    fresh:(reset||saved==null)&&session?.cursor===0&&session?.commands?.length===0});
  if(reset||saved==null||!official)return fresh;
  const evidence=saved.movementMission;
  if(session.restoreIssue||!Array.isArray(saved.commands)||JSON.stringify(saved.commands)!==JSON.stringify(session.commands)||saved.cursor!==session.cursor||!evidence||evidence.version!==1||typeof definition!=='string'||evidence.definition!==definition||
    evidence.commands!==JSON.stringify(session.commands)||evidence.cursor!==session.cursor||
    typeof evidence.clean!=='boolean'||typeof evidence.finished!=='boolean'||
    !(evidence.priorBest===null||Number.isSafeInteger(evidence.priorBest)&&evidence.priorBest>0)||
    !Array.isArray(evidence.frames)||evidence.frames.length>session.commands.length||
    (!evidence.finished&&evidence.frames.length!==session.commands.length)||
    (!evidence.finished&&evidence.priorBest!==fresh.priorBest))return fresh;
  for(let i=0;i<evidence.frames.length;i++){
    const frame=evidence.frames[i];
    if(!frame||typeof frame.human!=='boolean'||typeof frame.baton!=='boolean'||frame.baton!==validateBaton(i))return fresh;
  }
  return {...fresh,eligible:true,clean:evidence.clean,finished:evidence.finished,
    priorBest:evidence.priorBest,frames:evidence.frames.map(frame=>({...frame}))};
}
export function movementHistory(attempt) { if(attempt)attempt.clean=false; }

export function sintoniaBatonPass(level, before, result) {
  return (result.events??[]).some(event=>{
    if(event.type!=='gate')return false;
    // Gate events can also describe a pushed box. Require the animal's own path.
    if(!(result.events??[]).some(move=>move.type==='move'&&move.board===event.board&&move.from===event.from&&move.to===event.to))return false;
    const condition=event.condition;
    const ids=condition?.type==='plate'?[condition.id]:condition?.type==='all'?condition.ids:condition?.type==='selected'?[condition.plate]:[];
    return level.boards.some((board,index)=>index!==event.board&&(board.plates??[]).some(plate=>ids.includes(plate.id)&&before.positions[index]===plate.cell&&result.state.positions[index]!==plate.cell));
  });
}

/** Called ONLY after an accepted live command; cursor is the new engine cursor. */
export function observeMovement(attempt,{cursor,human=true,baton=false}) {
  if(!attempt||attempt.finished)return;
  attempt.frames.length=Math.min(attempt.frames.length,cursor-1);
  attempt.frames[cursor-1]={human,baton};
}
export function finishMovement(attempt,{game,won,cursor,levelId,provenMinimum=null}) {
  if(!attempt||attempt.finished||!attempt.official||!attempt.eligible||!won||cursor<1)return [];
  const frames=attempt.frames.slice(0,cursor);
  if(frames.length!==cursor||Array.from({length:cursor},(_,i)=>frames[i]).some(frame=>!frame?.human))return [];
  attempt.finished=true;
  const ids=[];
  if(attempt.clean)ids.push('efficiency-clean-plan');
  if(Number.isSafeInteger(provenMinimum)&&provenMinimum>0&&cursor===provenMinimum)ids.push('efficiency-proven-minimum');
  if(game==='sintonia'){
    if(frames.some(frame=>frame.baton))ids.push('sintonia-baton-pass');
    if(levelId==='sintonia-0021'&&cursor<=4)ids.push('sintonia-four-command-plan');
  }
  if(game==='orbita'&&attempt.priorBest!==null&&attempt.priorBest-cursor>=2)ids.push('orbita-personal-best');
  return ids;
}

/** A completed attempt can never write a new record a second time. */
export function newlyFinishedMovementBest(attempt,{wasFinished,cursor}={}) {
  if(wasFinished!==false||!attempt?.finished||!attempt.eligible||!attempt.official||!Number.isSafeInteger(cursor)||cursor<1)return null;
  return Math.min(attempt.priorBest??Infinity,cursor);
}
