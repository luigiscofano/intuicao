/** Reproduce: node tests/sintonia-audit-purpose.mjs. Offline content audit only. */
import {readFileSync, writeFileSync, renameSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {FALLBACK_LEVELS} from '../dist/sintonia/fallback.mjs';
import {RULES_VERSION, DIRECTIONS, initialState, transition, stateKey, isWon, replay, validateLevel, solveLevel} from '../dist/sintonia/engine.mjs';
import {analyzePurpose, buildPurposeAblations, findAvoidingSolution} from '../dist/sintonia/purpose.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clock = () => globalThis.performance?.now?.() ?? Date.now();
const clone = value => JSON.parse(JSON.stringify(value));
const hash = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
const CRITICAL = new Set([177, 200, 423, 426, 500]);
const EVENT_MECHANICS = ['switch', 'key', 'ice', 'portal', 'oneway', 'fragile', 'selector', 'delivery'];
export const AUDIT_BUDGETS = Object.freeze({bulk: {maxStates: 15000, maxMs: 15000, maxDepth: 180, maxTotalMs: 120000}, critical: {maxStates: 100000, maxMs: 30000, maxDepth: 240, maxTotalMs: 300000}});

export function designPattern(level) {
  return level.editorial?.design?.pattern ?? level.design?.pattern ?? level.editorial?.pattern ?? level.parameters?.pattern ?? null;
}

export function levelFingerprint(level) {
  return hash({id: level.id, number: level.number ?? null, chapter: level.chapter ?? null, rulesVersion: level.rulesVersion, contentVersion: level.contentVersion ?? null, contentRevision: level.contentRevision ?? null,
    boards: level.boards, channels: level.channels ?? [], initialSwitches: level.initialSwitches ?? {}, initialSelectors: level.initialSelectors ?? {}, mechanics: level.mechanics, solution: level.solution, pattern: designPattern(level), secondaryPattern: level.editorial?.secondaryPattern ?? null});
}

function permutations(values) {
  if (!values.length) return [[]];
  return values.flatMap((value, index) => permutations(values.filter((_, i) => i !== index)).map(tail => [value, ...tail]));
}
const uniqueSorted = values => [...new Set(values)].sort();
const compress = values => values.filter((value, index) => index === 0 || JSON.stringify(value) !== JSON.stringify(values[index - 1]));

/** Editorial classifier, not mathematical equivalence or a uniqueness claim.
 * Ignores coordinates, margins, animal names, raw distances and consecutive
 * repeated activity. Canonical board relabeling also ignores panel order.
 */
export function logicalSignature(level, witness = analyzePurpose(level)) {
  if (!witness.valid) return {signature: null, classification: null};
  const candidates = permutations(level.boards.map((_, index) => index)).map(order => {
    const mapped = old => order.indexOf(old);
    const boards = order.map(old => ({goalTransit: witness.boards[old].goalDepartures.length > 0, pausesWhileOthersMove: witness.boards[old].waitingCommands.some(command => witness.boards.some(board => board.board !== old && board.movedCommands.includes(command))),
      sourceBoxRoles: witness.boxes.filter(box => box.origin.board === old).map(box => [...box.observedRoles].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))}));
    const relations = uniqueSorted(witness.dependencies.flatMap(dependency => dependency.controllers.map(controller => JSON.stringify({from: mapped(controller.board), to: mapped(dependency.receiverBoard), type: controller.type, condition: dependency.condition.type, value: dependency.condition.value ?? null,
      occupiedBy: uniqueSorted(dependency.crossings.flatMap(crossing => crossing.support.filter(support => support.id === controller.id && support.type === controller.type).flatMap(support => (support.occupants || []).map(occupant => occupant.type))))})))).map(JSON.parse);
    const transfers = uniqueSorted((level.channels || []).map(channel => `${mapped(channel.fromBoard)}>${mapped(channel.toBoard)}`));
    const activity = compress(Array.from({length: witness.commands}, (_, offset) => order.map(old => witness.boards[old].movedCommands.includes(offset + 1) ? 1 : 0).join('')));
    const dependencyOrder = compress(Array.from({length: witness.commands}, (_, offset) => {
      const command = offset + 1;
      return uniqueSorted([
        ...witness.dependencies.flatMap(dependency => dependency.crossings.filter(crossing => crossing.command === command).flatMap(crossing => crossing.support.map(support => `${mapped(support.board)}>${mapped(dependency.receiverBoard)}:${support.type}:${dependency.condition.type}:${(support.occupants || []).map(occupant => occupant.type).sort().join('+')}`))),
        ...witness.events.filter(event => event.command === command && ['delivery', 'key', 'switch', 'selector', 'fragile', 'portal', 'ice', 'oneway'].includes(event.type)).map(event => event.type === 'delivery' ? `${mapped(event.fromBoard)}>${mapped(event.toBoard)}:delivery` : `${mapped(event.board)}:${event.type}:${event.value ?? ''}`)
      ]);
    }).filter(events => events.length));
    return JSON.stringify({boards, relations, transfers, activity, dependencyOrder});
  }).sort();
  return {signature: `logic-v1-${hash(candidates[0]).slice(0, 20)}`, classification: JSON.parse(candidates[0]),
    scope: 'Observed dependency/role/activity classifier; not a proof that different signatures require different reasoning.'};
}

/** Recipient-only turn proof: sender pushes cannot satisfy the predicate.
 * The monitor records whether this box has arrived at the selected board and
 * the direction of its previous push there; both enter the visited-state key.
 */
export function findAvoidingReceiverTurn(level, {boxId, board, maxStates = 15000, maxMs = 15000, maxDepth = 180} = {}) {
  const validation = validateLevel(level), budget = {maxStates, maxMs, maxDepth};
  const scope = {type: 'post-delivery-recipient-direction-change', boxId, board};
  if (!validation.valid || !level.boards.some(definition => definition.boxes?.some(box => box.id === boxId)) || !Number.isInteger(board) || board < 0 || board >= level.boards.length) return {status: 'inconclusive', reason: 'invalid-input', visited: 0, optimal: false, scope, budget};
  if (!(maxStates >= 1) || !(maxMs > 0) || !(maxDepth >= 0)) return {status: 'inconclusive', reason: 'budget', visited: 0, optimal: false, scope, budget};
  const first = initialState(level), deadline = clock() + maxMs;
  const nodes = [{state: first, arrived: false, last: null, parent: -1, direction: null, depth: 0}];
  const keyFor = (state, arrived, last) => `${stateKey(state)}|${arrived ? 1 : 0}|${last ?? ''}`;
  const seen = new Set([keyFor(first, false, null)]);
  const incomplete = reason => ({status: 'inconclusive', reason, visited: seen.size, optimal: false, scope, budget});
  let depthLimited = false;
  for (let head = 0; head < nodes.length; head++) {
    if ((head & 31) === 0 && clock() >= deadline) return incomplete('time-budget');
    const node = nodes[head];
    if (isWon(level, node.state)) {
      const solution = [];
      for (let at = head; nodes[at].parent !== -1; at = nodes[at].parent) solution.push(nodes[at].direction);
      solution.reverse();
      if (!replay(level, solution).won) return incomplete('replay-failed');
      return {status: 'solved', solution, visited: seen.size, optimal: true, optimalScope: 'avoiding-predicate-only', replayed: true, scope, budget};
    }
    for (const direction of DIRECTIONS) {
      const moved = transition(level, node.state, direction);
      if (!moved.changed) continue;
      let arrived = node.arrived, last = node.last;
      const recipientPush = arrived && moved.events.some(event => event.type === 'push' && event.id === boxId && event.board === board);
      if (recipientPush && last && last !== direction) continue;
      if (recipientPush) last = direction;
      if (moved.events.some(event => event.type === 'delivery' && event.box === boxId && event.toBoard === board)) arrived = true;
      const key = keyFor(moved.state, arrived, last);
      if (seen.has(key)) continue;
      if (node.depth >= maxDepth) {depthLimited = true; continue;}
      if (seen.size >= maxStates) return incomplete('state-budget');
      seen.add(key); nodes.push({state: moved.state, arrived, last, parent: head, direction, depth: node.depth + 1});
    }
  }
  return depthLimited ? incomplete('depth-budget') : {status: 'unsolvable', visited: seen.size, exhaustive: true, optimal: false, scope, budget};
}

function gateTypeAblations(level) {
  return uniqueSorted(level.boards.flatMap(board => (board.gates || []).map(gate => gate.condition.type))).map(type => {
    const variant = clone(level);
    for (const board of variant.boards) board.gates = (board.gates || []).filter(gate => gate.condition.type !== type);
    const validation = validateLevel(variant);
    return {id: `open-gate-type:${type}`, kind: 'open-gate-type', conditionType: type, definitionValid: validation.valid, errors: validation.errors,
      hypothesis: `What survives when all ${type} controlled edges are permanently open?`, comparability: 'Aggregate diagnostic: several conditions may be removed together; this is not evidence about any single gate.', level: variant};
  });
}

const summarizedResult = result => ({...result, ...(result.status === 'solved' ? {commands: result.solution.length} : {})});

export function auditLevel(level, {bank = 'campaign', budget = CRITICAL.has(level.number) ? AUDIT_BUDGETS.critical : AUDIT_BUDGETS.bulk} = {}) {
  const started = clock(), witness = analyzePurpose(level), logical = logicalSignature(level, witness);
  if (!witness.valid || !witness.won) throw new Error(`Cannot audit uncertified ${level.id}: ${witness.error ?? 'nonwinning witness'}`);
  const run = callback => {
    const remaining = budget.maxTotalMs - (clock() - started);
    if (!(remaining > 0)) return {status: 'inconclusive', reason: 'total-time-budget', visited: 0, optimal: false};
    return summarizedResult(callback({...budget, maxMs: Math.min(budget.maxMs, remaining)}));
  };
  const baseline = run(options => solveLevel(level, options));
  const ablations = [...buildPurposeAblations(level), ...gateTypeAblations(level)].map(({level: variant, ...description}) => {
    const result = variant ? run(options => solveLevel(variant, options)) : {status: 'not-applicable', reason: description.notApplicableReason, visited: 0};
    const comparison = result.status === 'solved' ? analyzePurpose(variant, result.solution) : null;
    return {...description, result, ...(comparison?.valid ? {counterexampleLogicalSignature: logicalSignature(variant, comparison).signature,
      witnessChanges: {boxDirectionChanges: comparison.boxes.reduce((sum, box) => sum + box.directionChanges, 0) - witness.boxes.reduce((sum, box) => sum + box.directionChanges, 0), goalDepartures: comparison.boards.reduce((sum, board) => sum + board.goalDepartures.length, 0) - witness.boards.reduce((sum, board) => sum + board.goalDepartures.length, 0)}} : {}),
      ...(baseline.status === 'solved' && baseline.optimal && result.status === 'solved' && result.optimal ? {minimumCommandDelta: result.commands - baseline.commands} : {})};
  });
  const avoidance = [];
  const addAvoid = (id, claim, avoid) => avoidance.push({id, claim, avoid, result: run(options => findAvoidingSolution(level, {...options, avoid}))});
  for (const box of witness.boxes) {
    addAvoid(`box-turn:${box.id}`, 'Every solution changes the pushing direction of this box at least once.', {type: 'box-direction-change', boxId: box.id});
    if (box.plateReleases.some(release => release.afterGateSupport)) addAvoid(`box-release:${box.id}`, 'Every solution releases this box from a plate after that box has supported an actual gate crossing.', {type: 'box-support-release', boxId: box.id});
    if (box.blockedPushes.some(stop => stop.afterPriorGateSupport)) addAvoid(`box-supported-stop:${box.id}`, 'Every solution uses this box as a physical local stop after an earlier command consumed its actual gate support, while another animal moves.', {type: 'box-supported-stop', boxId: box.id});
    for (const receiver of [...new Set(box.deliveries.map(delivery => delivery.toBoard))]) {
      addAvoid(`receiver-push:${box.id}:${receiver}`, 'A winning solution cannot skip pushing this box on the receiving panel.', {type: 'event', eventType: 'push', boxId: box.id, board: receiver});
      avoidance.push({id: `receiver-turn:${box.id}:${receiver}`, claim: 'Every solution changes push direction on this recipient after receiving this box.', avoid: {type: 'post-delivery-recipient-direction-change', boxId: box.id, board: receiver}, result: run(options => findAvoidingReceiverTurn(level, {...options, boxId: box.id, board: receiver}))});
    }
  }
  for (const mechanic of EVENT_MECHANICS.filter(type => witness.events.some(event => event.type === type))) addAvoid(`mechanic:${mechanic}`, `Every solution contains at least one ${mechanic} event. This proves usage, not decision quality.`, {type: 'event', eventType: mechanic});
  for (const board of level.boards.map((_, index) => index).filter(board => witness.dependencies.some(dependency => dependency.receiverBoard !== board && dependency.controllers.some(controller => controller.board === board)))) addAvoid(`remote-condition:${board}`, 'Every solution crosses a remote gate whose condition is controlled on this panel; this does not imply the animal itself must move.', {type: 'helper-participation', board});
  for (const query of avoidance) query.conclusion = query.result.status === 'unsolvable' ? 'necessary-under-exact-predicate' : query.result.status === 'solved' ? 'counterexample-refutes-necessity' : 'inconclusive';
  return {id: level.id, number: level.number ?? null, chapter: level.chapter ?? null, bank, rulesVersion: level.rulesVersion, contentVersion: level.contentVersion ?? null, contentRevision: level.contentRevision ?? null, seed: level.seed ?? null, fingerprint: levelFingerprint(level),
    pattern: designPattern(level), secondaryPattern: level.editorial?.secondaryPattern ?? null, family: level.family, animals: level.boards.length, mechanics: level.mechanics, structuralSignature: level.signature, logicalSignature: logical.signature, logicalClassification: logical.classification, logicalSignatureScope: logical.scope,
    budget, baseline, witness: {valid: witness.valid, won: witness.won, commands: witness.commands, evidenceScope: witness.evidenceScope, boxes: witness.boxes, boards: witness.boards, dependencies: witness.dependencies}, ablations, avoidance, humanPlaytested: false};
}

function countBy(values, selector) {
  const result = {};
  for (const value of values) {const key = selector(value); result[key] = (result[key] || 0) + 1;}
  return result;
}

export function summarize(records) {
  const boxes = records.flatMap(record => record.witness.boxes.map(box => ({levelId: record.id, number: record.number, bank: record.bank, box}))), allQueries = records.flatMap(record => [...record.ablations, ...record.avoidance]);
  return {total: records.length, campaign: records.filter(record => record.bank === 'campaign').length, fallback: records.filter(record => record.bank === 'fallback').length, certified: records.filter(record => record.witness.valid && record.witness.won).length,
    boxes: boxes.length, boxesWithMultiplePushes: boxes.filter(({box}) => box.pushes.length > 1).length, boxesWithWitnessedDirectionChange: boxes.filter(({box}) => box.directionChanges > 0).length,
    boxesWithWitnessedSupportRelease: boxes.filter(({box}) => box.plateReleases.some(release => release.afterGateSupport)).length, deliveredBoxes: boxes.filter(({box}) => box.deliveries.length).length, deliveredBoxesWithRecipientPushes: boxes.filter(({box}) => box.postDeliveryPushes.length).length,
    boxesWithWitnessedSupportedStop: boxes.filter(({box}) => box.blockedPushes.some(stop => stop.afterPriorGateSupport)).length,
    necessaryBoxes: records.flatMap(record => record.ablations).filter(query => query.kind === 'remove-box' && query.result.status === 'unsolvable').length,
    necessaryBoxTurns: records.flatMap(record => record.avoidance).filter(query => query.id.startsWith('box-turn:') && query.result.status === 'unsolvable').length,
    necessarySupportReleases: records.flatMap(record => record.avoidance).filter(query => query.id.startsWith('box-release:') && query.result.status === 'unsolvable').length,
    necessarySupportedStops: records.flatMap(record => record.avoidance).filter(query => query.id.startsWith('box-supported-stop:') && query.result.status === 'unsolvable').length,
    necessaryRecipientTurns: records.flatMap(record => record.avoidance).filter(query => query.id.startsWith('receiver-turn:') && query.result.status === 'unsolvable').length,
    queryStatuses: countBy(allQueries, query => query.result.status), queryReasons: countBy(allQueries.filter(query => query.result.status === 'inconclusive'), query => query.result.reason), patterns: countBy(records, record => record.pattern ?? 'retained-or-unclassified'),
    logicalClasses: new Set(records.map(record => record.logicalSignature)).size, repeatedLogicalClasses: Object.entries(countBy(records, record => record.logicalSignature)).filter(([, count]) => count > 1).map(([signature, count]) => ({signature, count})),
    inconclusive: records.flatMap(record => [...record.ablations, ...record.avoidance].filter(query => query.result.status === 'inconclusive').map(query => ({levelId: record.id, number: record.number, query: query.id, reason: query.result.reason, visited: query.result.visited}))),
    counterexamplesToNecessity: records.flatMap(record => record.avoidance.filter(query => query.result.status === 'solved').map(query => ({levelId: record.id, number: record.number, query: query.id, commands: query.result.commands}))), humanPlaytested: false};
}

function renderMarkdown(report) {
  const summary = report.summary, critical = report.levels.filter(level => CRITICAL.has(level.number));
  const lines = ['# Sintonia — evidências de propósito e limites', '',
    'Este relatório é reproduzido por `node tests/sintonia-audit-purpose.mjs`. O motor não foi alterado; a versão de regras permanece 1. Os resultados descrevem o conteúdo exato identificado pelos hashes no JSON, não uma promessa sobre versões futuras.', '',
    `Foram reproduzidas ${summary.certified}/${summary.total} soluções (${summary.campaign} da campanha e ${summary.fallback} reservas). **Não foram realizados testes humanos.** Clareza, diversão, variedade percebida e dificuldade humana continuam sem confirmação empírica.`, '',
    '## O que os resultados significam', '',
    '- **Testemunho:** uma solução certificada usou o elemento daquela maneira. Isso não prova necessidade.',
    '- **Busca de evasão sem solução, exaustiva:** nenhuma vitória evita o evento sob o predicado exato registrado. É uma prova limitada a essa pergunta.',
    '- **Contraexemplo encontrado:** existe uma vitória que evita o evento. A alegação de necessidade foi refutada, mesmo se o certificado principal o usa.',
    '- **Inconclusivo:** limite de estados, tempo ou profundidade atingido. Não significa impossível nem necessário.',
    '- **Ablação:** comparação controlada com uma cópia válida. Remover uma caixa e perder toda solução prova necessidade física, mas não qualidade da descoberta. Diferenças de comprimento, isoladamente, também não provam propósito.',
    '- **Não aplicável:** a alteração criaria uma definição inválida, por exemplo transformar em parede a posição de uma caixa que também contém uma placa. Não apagamos outros elementos para fabricar uma comparação válida.', '',
    '## Orçamentos', '',
    `Por consulta comum: ${AUDIT_BUDGETS.bulk.maxStates} estados, ${AUDIT_BUDGETS.bulk.maxMs / 1000} s e profundidade ${AUDIT_BUDGETS.bulk.maxDepth}; limite total por fase de ${AUDIT_BUDGETS.bulk.maxTotalMs / 1000} s. Nas fases 177, 200, 423, 426 e 500: ${AUDIT_BUDGETS.critical.maxStates} estados, ${AUDIT_BUDGETS.critical.maxMs / 1000} s, profundidade ${AUDIT_BUDGETS.critical.maxDepth} e total de ${AUDIT_BUDGETS.critical.maxTotalMs / 1000} s. O teto de estados é determinístico; um estouro de relógio fica explicitamente inconclusivo.`, '',
    '## Caixas: uso observado e papel necessário', '',
    '| Evidência | Quantidade |', '|---|---:|',
    `| Caixas no conjunto | ${summary.boxes} |`, `| Mais de um empurrão no certificado | ${summary.boxesWithMultiplePushes} |`, `| Mudança de direção observada | ${summary.boxesWithWitnessedDirectionChange} |`,
    `| Remoção após sustentar uma travessia observada | ${summary.boxesWithWitnessedSupportRelease} |`, `| Caixas entregues | ${summary.deliveredBoxes} |`, `| Reposicionadas após a entrega | ${summary.deliveredBoxesWithRecipientPushes} |`,
    `| Remoção da caixa torna a fase insolúvel, por exaustão | ${summary.necessaryBoxes} |`, `| Mudança de direção necessária, por exaustão | ${summary.necessaryBoxTurns} |`, `| Liberação após apoio necessária, por exaustão | ${summary.necessarySupportReleases} |`, `| Mudança de direção no receptor necessária, por exaustão | ${summary.necessaryRecipientTurns} |`, `| Apoio anterior seguido de bloqueio físico observado | ${summary.boxesWithWitnessedSupportedStop} |`, `| Apoio seguido de bloqueio necessário, por exaustão | ${summary.necessarySupportedStops} |`, '',
    'A prova de mudança de direção no receptor ignora todos os empurrões feitos pelo remetente. Seu estado inclui chegada e última direção de empurrão no painel de destino; uma mudança entre remetente e receptor não satisfaz artificialmente o teste.', '',
    '## Fases críticas', '', '| Fase | Padrão | Comandos do certificado | Provas e limites |', '|---|---|---:|'];
  for (const record of critical) {
    const relevant = [...record.ablations.filter(query => query.kind === 'remove-box'), ...record.avoidance.filter(query => /^(box-turn:|box-release:|box-supported-stop:|receiver-push:|receiver-turn:|mechanic:delivery)/.test(query.id))];
    lines.push(`| ${record.number} | ${record.pattern ?? record.secondaryPattern ?? 'não classificado'} | ${record.witness.commands} | ${relevant.map(query => `${query.id}: ${query.result.status}${query.result.reason ? ` (${query.result.reason})` : ''}`).join('; ')} |`);
  }
  lines.push('', '## Dependências e variedade lógica', '',
    `A classificação editorial encontrou ${summary.logicalClasses} assinaturas entre ${summary.total} definições. Ela usa relações de controle, tipo de ocupante, transferência de recurso, papéis observados da caixa, saída da meta e sequência comprimida de movimentos/esperas. Não usa coordenadas, distâncias de corredor, margens ou nomes dos animais; a ordem dos painéis é normalizada.`, '',
    'Essa assinatura é uma classificação revisável, não uma prova matemática de equivalência de puzzles. Assinaturas diferentes não garantem descobertas diferentes, e repetições são publicadas no JSON em vez de escondidas por giros ou nomes novos. As ablações incluem cancelas individuais, grupos com condição idêntica, todos os controles de um mesmo tipo, gelo em piso comum, pontes permanentes e passagens bidirecionais. Desativar um portal pode apenas desconectar regiões; o relatório não chama isso de prova de um atalho bem desenhado.', '',
    '## Resultados inconclusivos', '',
    `Consultas: ${Object.entries(summary.queryStatuses).map(([status, count]) => `${status}: ${count}`).join('; ')}.`, '',
    summary.inconclusive.length ? `${summary.inconclusive.length} consultas permanecem inconclusivas. A lista integral com fase, predicado, motivo e estados visitados está no arquivo tests/sintonia-purpose-audit.json.` : 'Nenhuma consulta de ablação/evasão ficou inconclusiva dentro dos orçamentos declarados.', '',
    `Foram encontrados ${summary.counterexamplesToNecessity.length} contraexemplos a predicados de necessidade testados. Isso inclui perguntas deliberadamente fortes, como exigir mudança de direção numa demonstração introdutória de um empurrão; não se converte automaticamente em reprovação editorial. Cada exceção deve ser lida junto do padrão e da justificativa da fase.`, '',
    '## Reproduzir e verificar', '', '```sh', 'node tests/sintonia-audit-purpose.mjs', 'node --test tests/sintonia-purpose.test.mjs tests/sintonia-redesign.test.mjs', '```', '',
    'O JSON registra sementes, versões, hash do motor, fingerprints das definições, orçamentos, testemunhos e resultados de cada consulta. O teste de redesign rejeita evidência desatualizada após qualquer mudança de mapa ou solução. Não houve mudança de regra, estilo, desenho ou animação por parte desta auditoria.', '');
  return lines.join('\n');
}

export async function main() {
  const started = clock(), inputs = [...CAMPAIGN.map(level => ({level, bank: 'campaign'})), ...FALLBACK_LEVELS.map(level => ({level, bank: 'fallback'}))], records = [];
  const sourceFiles = {engine: 'dist/sintonia/engine.mjs', purposeModule: 'dist/sintonia/purpose.mjs', auditScript: 'tests/sintonia-audit-purpose.mjs', campaign: 'dist/sintonia/campaign.mjs', fallback: 'dist/sintonia/fallback.mjs'};
  const sourceHashes = Object.fromEntries(Object.entries(sourceFiles).map(([key, file]) => [key, hash(readFileSync(resolve(ROOT, file), 'utf8'))]));
  if (CAMPAIGN.length !== 500 || FALLBACK_LEVELS.length !== 36) throw new Error('The complete 500 + 36 definitions must be materialized before auditing.');
  for (const {level, bank} of inputs) {
    records.push(auditLevel(level, {bank}));
    if (records.length % 25 === 0 || CRITICAL.has(level.number)) console.log(JSON.stringify({audited: records.length, total: inputs.length, last: level.id, seconds: Math.round((clock() - started) / 1000), inconclusive: [...records.at(-1).ablations, ...records.at(-1).avoidance].filter(query => query.result.status === 'inconclusive').length}));
  }
  for (const [key, file] of Object.entries(sourceFiles)) if (sourceHashes[key] !== hash(readFileSync(resolve(ROOT, file), 'utf8'))) throw new Error(`Audit input changed while running (${file}); no report written. Rerun against stable files.`);
  const report = {schemaVersion: 1, rulesVersion: RULES_VERSION, scope: 'all-materialized-campaign-and-fallback-levels', sourceHashes,
    budgets: AUDIT_BUDGETS, humanPlaytested: false, summary: summarize(records), levels: records};
  const output = resolve(ROOT, 'tests/sintonia-purpose-audit.json');
  writeFileSync(`${output}.tmp`, `${JSON.stringify(report, null, 2)}\n`); renameSync(`${output}.tmp`, output);
  writeFileSync(resolve(ROOT, 'docs/sintonia-purpose-evidence.md'), renderMarkdown(report));
  console.log(JSON.stringify({done: true, seconds: Math.round((clock() - started) / 1000), summary: {...report.summary, inconclusive: report.summary.inconclusive.length, counterexamplesToNecessity: report.summary.counterexamplesToNecessity.length, repeatedLogicalClasses: report.summary.repeatedLogicalClasses.length}}));
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
