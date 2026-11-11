import {CAMPAIGN} from '../repasse/campaign.mjs';
import {initialState, stateKey, transition} from '../repasse/engine.mjs';

// Ephemeral evidence only: persisted completion flags never identify this round.
// A depth counts distinct pieces carrying one contribution, including its origin.
export function createRepasseMissionAttempt(level, {mode='campaign', resumed=false}={}) {
  const eligible=mode==='campaign' && CAMPAIGN.includes(level) && !resumed;
  return {level, eligible, done:false, expected:eligible?stateKey(initialState(level)):null,
    depth:level.pieces.map(()=>1), arrivals:new Map(), chain:false};
}
export function invalidateRepasseMissionAttempt(attempt) {
  if(attempt)attempt.eligible=false;
}
export function observeRepasseMissionCommand(attempt, {before, after, pieceId, human=false}={}) {
  if(!attempt?.eligible || attempt.done)return [];
  if(!human || !before || !after || stateKey(before)!==attempt.expected){attempt.eligible=false;return [];}
  const step=transition(attempt.level,before,pieceId);
  if(!step.changed)return [];
  if(stateKey(step.state)!==stateKey(after)){attempt.eligible=false;return [];}
  const depth=attempt.depth[step.removed.index];
  for(const {to} of step.transfers){
    if(to.kind==='piece')attempt.depth[to.index]=Math.max(attempt.depth[to.index],depth+1);
    else {
      if(depth>=3)attempt.chain=true;
      const key=`${to.side}:${to.index}`;
      const senders=attempt.arrivals.get(key)??new Set();
      senders.add(step.removed.id);attempt.arrivals.set(key,senders);
    }
  }
  attempt.expected=stateKey(after);
  if(!step.result.won)return [];
  attempt.done=true;
  return [
    ...(attempt.chain?['repasse-chain-inheritance']:[]),
    ...([...attempt.arrivals.values()].some(senders=>senders.size>=3)?['repasse-arrival-account']:[]),
  ];
}
