import {RULES_VERSION, DIRECTIONS, initialState, transition, stateKey, validateLevel} from './engine.mjs';
import {LEGACY_CAMPAIGN, LEGACY_CONTENT_REVISION} from './campaign-v1.mjs';
import {CAMPAIGN as V2_CAMPAIGN} from './campaign-v2.mjs';
import * as generatorCatalog from './generator.mjs';

const clone = value => structuredClone(value);
const bounded = (value, min, max, fallback=min) => Number.isInteger(value) && value>=min && value<=max ? value : fallback;
const v2ById = new Map(V2_CAMPAIGN.map(level => [level.id, level]));
const legacyById = new Map(LEGACY_CAMPAIGN.map(level => [level.id, level]));
export const levelContentRevision = level => level?.contentRevision ?? (Number.isInteger(level?.contentVersion)?`sintonia-content-${level.contentVersion}`:LEGACY_CONTENT_REVISION);
const currentGeneration = result => !!result?.level && result.level.rulesVersion===RULES_VERSION
  && result.level.generatorVersion===generatorCatalog.GENERATOR_VERSION
  && levelContentRevision(result.level)===(generatorCatalog.CONTENT_REVISION??LEGACY_CONTENT_REVISION);

// Compare the actual definition as well as its revision. Identical animal
// positions are not sufficient: a goal, gate, box, trigger or undo future may
// have changed. Object key order does not make an otherwise identical map new.
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export function sintoniaDefinitionKey(level) {
  return JSON.stringify(canonical({id:level.id,version:level.version??1,rulesVersion:level.rulesVersion??RULES_VERSION,
    boards:level.boards,channels:level.channels??[],initialSwitches:level.initialSwitches??{},initialSelectors:level.initialSelectors??{}}));
}
export function isRetainedSintoniaAttempt(level, currentLevel) {
  return sintoniaDefinitionKey(level)!==sintoniaDefinitionKey(currentLevel);
}

// Editorial search traces and ablation reports belong to the shipped catalog,
// not the browser's limited save quota. Keep the complete playable definition,
// including its own hints, witness, certificate, names and revision metadata.
export function persistableSintoniaLevel(level) {
  const result=clone(level);
  if(result)delete result.editorial;
  return result;
}

export function restoreSintoniaSession(level, saved) {
  const empty = restoreIssue => ({level,contentRevision:levelContentRevision(level),commands:[],cursor:0,states:[initialState(level)],assisted:false,failures:0,winRecorded:false,...(restoreIssue?{restoreIssue}:{})});
  if (!saved) return empty();
  if (saved.rulesVersion!==RULES_VERSION || !Array.isArray(saved.commands)) return empty('invalid-history');
  try {
    // Old saves without a definition are only meaningful on their archived v1
    // map. Never reinterpret them on a revised catalog, even if replay happens
    // to yield the same positions at the current cursor.
    const savedRevision=saved.contentRevision??levelContentRevision(saved.level);
    if (savedRevision!==levelContentRevision(level) || (saved.level&&sintoniaDefinitionKey(saved.level)!==sintoniaDefinitionKey(level))) return empty('content-mismatch');
    if (saved.commands.length>100000 || saved.commands.some(dir=>!DIRECTIONS.includes(dir)) || !Number.isInteger(saved.cursor) || saved.cursor<0 || saved.cursor>saved.commands.length) return empty('invalid-history');
    const session=empty();
    let state=session.states[0];
    for (const direction of saved.commands) {
      const next=transition(level,state,direction);
      if (!next.changed) return empty('invalid-history');
      state=next.state;session.states.push(state);
    }
    if (saved.state&&stateKey(session.states[saved.cursor])!==stateKey(saved.state)) return empty('invalid-history');
    session.commands=saved.commands.slice();session.cursor=saved.cursor;
    session.assisted=saved.assisted===true;session.failures=bounded(saved.failures,0,Number.MAX_SAFE_INTEGER);session.winRecorded=saved.winRecorded===true;
    return session;
  } catch {return empty('invalid-history');}
}

export function serializeSintoniaSession(session) {
  return {rulesVersion:RULES_VERSION,contentRevision:session.contentRevision??levelContentRevision(session.level),level:persistableSintoniaLevel(session.level),
    commands:session.commands.slice(),cursor:session.cursor,state:clone(session.states[session.cursor]),assisted:session.assisted,failures:session.failures,winRecorded:session.winRecorded};
}

export function commitSintoniaCommand(level, session, direction) {
  const next=transition(level,session.states[session.cursor],direction);
  if (!next.changed) return {session,transition:next};
  return {session:{...session,commands:[...session.commands.slice(0,session.cursor),direction],states:[...session.states.slice(0,session.cursor+1),next.state],cursor:session.cursor+1},transition:next};
}

/** Archived definitions are chosen by saved revision, never by a new ordinal. */
export function archivedSintoniaLevel(id, saved) {
  if (saved?.level) return saved.level;
  const revision=saved?.contentRevision??LEGACY_CONTENT_REVISION;
  return revision===LEGACY_CONTENT_REVISION?legacyById.get(id):revision==='sintonia-content-2'?v2ById.get(id):null;
}

/** Recover learning evidence, not campaign completion, from old definitions. */
export function previouslyLearnedSintoniaMechanics(data,currentLevels=[]) {
  const result=new Set(Array.isArray(data?.learnedMechanics)?data.learnedMechanics:[]);
  for(const [id,saved] of Object.entries(data?.campaign?.sessions??{})) {
    const level=archivedSintoniaLevel(id,saved);
    for(const mechanic of level?.mechanics??[])result.add(mechanic);
  }
  for(const id of Object.keys(data?.campaign?.completed??{})) {
    const revision=data?.contentRevision??LEGACY_CONTENT_REVISION;
    const level=revision===LEGACY_CONTENT_REVISION?legacyById.get(id):revision==='sintonia-content-2'?v2ById.get(id):currentLevels.find(item=>item.id===id)??v2ById.get(id);
    for(const mechanic of level?.mechanics??[])result.add(mechanic);
  }
  return [...result];
}

export function resolveArchivedSintoniaAttempt(id,saved) {
  const level=archivedSintoniaLevel(id,saved);
  if(!level||level.id!==id)return {status:'blocked',reason:'missing-definition'};
  return resolveSintoniaCampaignAttempt(level,saved);
}

/** Resolve before replay or save; blocked attempts must not be overwritten. */
export function resolveSintoniaCampaignAttempt(currentLevel, saved) {
  if (!saved) return {level:currentLevel,saved:null,retained:false,status:'new'};
  const savedRevision=saved.contentRevision??levelContentRevision(saved.level);
  const level=archivedSintoniaLevel(currentLevel.id,saved);
  try {
    if (!level || level.id!==currentLevel.id || !validateLevel(level).valid) return {status:'blocked',reason:'missing-definition'};
    const session=restoreSintoniaSession(level,saved);
    if (session.restoreIssue) return {status:'blocked',reason:session.restoreIssue};
    return {level,saved,retained:isRetainedSintoniaAttempt(level,currentLevel),status:'resumed'};
  } catch {return {status:'blocked',reason:'invalid-definition'};}
}

// One task per instance. Generation and hint clients use independent workers,
// so a changed hint never cancels a readying Endless level.
const abortError = () => Object.assign(new Error('Tarefa substituída por uma solicitação mais recente.'), {name: 'AbortError'});

export function createSintoniaService({workerFactory, timeoutMs = 18000} = {}) {
  let worker = null, pending = null, serial = 0, destroyed = false;
  const stopWorker = () => {worker?.terminate(); worker = null;};
  function cancel() {
    serial++;
    if (pending) {clearTimeout(pending.timer); pending.reject(abortError()); pending = null;}
    stopWorker();
  }
  async function lightFallback(type, payload) {
    if (type === 'hint') {
      const {analyzePosition} = await import('./analysis.mjs');
      return analyzePosition(payload.level, payload.state, {allowSearch: false});
    }
    const {selectCertifiedFallback} = await import('./fallback.mjs');
    const result=selectCertifiedFallback(payload.seed, payload.options);
    if(!currentGeneration(result))throw new Error('O banco de desafios precisa ser atualizado. Recarregue a página; sua partida atual foi preservada.');
    return result;
  }
  function run(type, payload) {
    if (destroyed) return Promise.reject(new Error('Este serviço foi encerrado.'));
    cancel();
    const id = serial;
    return new Promise((resolve, reject) => {
      const finish = (error, value) => {
        if (!pending || pending.id !== id) return;
        clearTimeout(pending.timer); pending = null;
        if (error) reject(error); else resolve(value);
      };
      const recover = () => {
        if (!pending || pending.id !== id || pending.recovering) return;
        pending.recovering = true;
        clearTimeout(pending.timer);
        stopWorker();
        lightFallback(type, payload).then(value => finish(null, value), error => finish(error));
      };
      pending = {id, reject, timer: setTimeout(recover, Math.max(50, timeoutMs))};
      try {
        const make = workerFactory ?? (() => new Worker(new URL('./worker.mjs', import.meta.url), {type: 'module', name: 'sintonia-search'}));
        worker = make();
        worker.onmessage = event => {
          const message = event.data;
          if (message?.id !== id || !pending || pending.id !== id) return;
          if (message.ok&&(type!=='generate'||currentGeneration(message.result))) finish(null, message.result);
          else recover();
        };
        worker.onerror = event => {event?.preventDefault?.(); if (pending?.id === id) recover();};
        worker.onmessageerror = () => {if (pending?.id === id) recover();};
        worker.postMessage({id, type, ...payload});
      } catch {recover();}
    });
  }
  return {
    generate(seed, options = {}) {return run('generate', {seed: String(seed), options});},
    hint(level, state) {return run('hint', {level, state});},
    cancel,
    destroy() {cancel(); destroyed = true;}
  };
}
