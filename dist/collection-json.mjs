// Leitura, validação e certificação de fases JSON de ELO, PRUMO, PACTO e DESVIO.
/** Safe local JSON import for ELO, PRUMO, PACTO and DESVIO. No saved state. */
import { assertJSONData, parseLevelJSON, customIdentity } from './level-json-common.mjs';
import { solveGeometry, validateGeometry, supportCells, prumoDomains } from './geometry-games.mjs';
import { solveSymbols, validateSymbols } from './symbol-games.mjs';
import { createDesvio, analyzeDesvio } from './desvio.mjs';
export const COLLECTION_JSON_DEADLINE = 1500;
const GAMES = new Set(['elo', 'prumo', 'pacto', 'desvio']);
const object = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const fail = (message) => {
  throw new Error(message);
};
const requireObject = (value, label) => {
  if (!object(value)) fail(`${label}: use um objeto JSON.`);
  return value;
};
const integer = (value, min, max, label) => {
  if (!Number.isSafeInteger(value) || value < min || value > max)
    fail(`${label}: use um inteiro entre ${min} e ${max}.`);
  return value;
};
const array = (value, max, label, min = 0) => {
  if (!Array.isArray(value) || value.length < min || value.length > max)
    fail(`${label}: quantidade de elementos inválida.`);
  return value;
};
const unique = (values, label) => {
  if (new Set(values).size !== values.length) fail(`${label}: há elementos repetidos.`);
  return values;
};
function optionalText(value, label, max = 160) {
  if (value === undefined) return undefined;
  if (
    typeof value !== 'string' ||
    value.length > max ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)
  )
    fail(`${label}: texto inválido ou longo demais.`);
  return value;
}
function numericMap(value, maxKey, mapValue, label) {
  requireObject(value, label);
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    if (!/^(0|[1-9]\d*)$/.test(key)) fail(`${label}: use índices inteiros sem zeros iniciais.`);
    integer(Number(key), 0, maxKey, label);
    output[key] = mapValue(item, key);
  }
  return output;
}
const ordered = (a, b) => a - b;
function normalizeElo(input, level) {
  const { rows, cols } = level,
    n = rows * cols;
  if (rows > 7 || cols > 7) fail('ELO: use uma grade de até 7 × 7.');
  level.regions = array(input.regions, n, 'ELO: regiões', n).map((value) =>
    integer(value, 0, 15, 'ELO: região'),
  );
  const count = Math.max(...level.regions) + 1;
  for (let region = 0; region < count; region++) {
    const cells = level.regions.flatMap((value, cell) => (value === region ? [cell] : []));
    if (!cells.length) fail('ELO: numere todas as regiões consecutivamente a partir de zero.');
    const set = new Set(cells),
      seen = new Set([cells[0]]),
      queue = [cells[0]];
    for (const cell of queue) {
      const r = Math.floor(cell / cols),
        c = cell % cols;
      for (const next of [
        r > 0 ? cell - cols : -1,
        r < rows - 1 ? cell + cols : -1,
        c > 0 ? cell - 1 : -1,
        c < cols - 1 ? cell + 1 : -1,
      ])
        if (set.has(next) && !seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
    }
    if (seen.size !== cells.length) fail('ELO: cada região deve ser conectada pelos lados.');
  }
  const cell = (value) => integer(value, 0, n - 1, 'ELO: casa'),
    region = (value) => integer(value, 0, count - 1, 'ELO: região');
  level.fixed =
    input.fixed === undefined
      ? {}
      : numericMap(
          input.fixed,
          count - 1,
          (value, key) => {
            cell(value);
            if (level.regions[value] !== Number(key))
              fail('ELO: a pista fixa deve pertencer à própria região.');
            return value;
          },
          'ELO: pistas fixas',
        );
  const raw =
      input.constraints === undefined ? {} : requireObject(input.constraints, 'ELO: restrições'),
    constraints = {};
  const allowed = new Set([
    'shapes',
    'passages',
    'forbiddenEdges',
    'rowCounts',
    'colCounts',
    'distances',
    'neighbors',
    'order',
    'cuts',
    'exclusivePassages',
  ]);
  for (const key of Object.keys(raw))
    if (!allowed.has(key)) fail(`ELO: restrição desconhecida (${key}).`);
  if (raw.shapes !== undefined)
    constraints.shapes = numericMap(
      raw.shapes,
      count - 1,
      (value) => {
        if (!['turn', 'straight'].includes(value)) fail('ELO: forma deve ser turn ou straight.');
        return value;
      },
      'ELO: formas',
    );
  if (raw.passages !== undefined)
    constraints.passages = unique(
      array(raw.passages, n, 'ELO: passagens').map(cell),
      'ELO: passagens',
    ).sort(ordered);
  if (raw.forbiddenEdges !== undefined) {
    const seen = new Set();
    constraints.forbiddenEdges = array(raw.forbiddenEdges, 2 * n, 'ELO: trechos vedados').map(
      (pair) => {
        array(pair, 2, 'ELO: trecho vedado', 2);
        const a = cell(pair[0]),
          b = cell(pair[1]);
        if (!(
          (Math.abs(a - b) === 1 && Math.floor(a / cols) === Math.floor(b / cols)) ||
          Math.abs(a - b) === cols
        ))
          fail('ELO: um trecho vedado deve unir casas vizinhas pelos lados.');
        const edge = [a, b].sort(ordered),
          key = edge.join(',');
        if (seen.has(key)) fail('ELO: trecho vedado repetido.');
        seen.add(key);
        return edge;
      },
    );
  }
  for (const [key, size] of [
    ['rowCounts', rows],
    ['colCounts', cols],
  ])
    if (raw[key] !== undefined)
      constraints[key] = numericMap(
        raw[key],
        size - 1,
        (value) => integer(value, 0, count, `ELO: ${key}`),
        `ELO: ${key}`,
      );
  if (raw.distances !== undefined)
    constraints.distances = numericMap(
      raw.distances,
      count - 1,
      (value) => integer(value, 2, 2 * (rows + cols - 2), 'ELO: distância'),
      'ELO: distâncias',
    );
  if (raw.neighbors !== undefined) {
    const seen = new Set();
    constraints.neighbors = array(raw.neighbors, (count * (count - 1)) / 2, 'ELO: vizinhanças').map(
      (pair) => {
        array(pair, 2, 'ELO: vizinhança', 2);
        const p = unique(pair.map(region), 'ELO: vizinhança').sort(ordered),
          key = p.join(',');
        if (seen.has(key)) fail('ELO: vizinhança repetida.');
        seen.add(key);
        return p;
      },
    );
  }
  if (raw.order !== undefined) {
    constraints.order = unique(array(raw.order, count, 'ELO: ordem').map(region), 'ELO: ordem');
    if (constraints.order.length > 0 && constraints.order.length < 4)
      fail('ELO: a ordem precisa de pelo menos quatro regiões.');
  }
  if (raw.cuts !== undefined) {
    const seen = new Set();
    constraints.cuts = array(raw.cuts, rows + cols - 2, 'ELO: cortes').map((cut) => {
      requireObject(cut, 'ELO: corte');
      if (!['row', 'col'].includes(cut.axis)) fail('ELO: eixo do corte deve ser row ou col.');
      const index = integer(
          cut.index,
          0,
          (cut.axis === 'row' ? rows : cols) - 2,
          'ELO: índice do corte',
        ),
        value = integer(cut.count, 0, count, 'ELO: travessias');
      if (value % 2) fail('ELO: a quantidade de travessias deve ser par.');
      const key = cut.axis + ':' + index;
      if (seen.has(key)) fail('ELO: corte repetido.');
      seen.add(key);
      return { axis: cut.axis, index, count: value };
    });
  }
  if (raw.exclusivePassages !== undefined) {
    const ids = new Set();
    constraints.exclusivePassages = array(raw.exclusivePassages, n, 'ELO: grupos exclusivos').map(
      (group) => {
        requireObject(group, 'ELO: grupo exclusivo');
        const id = optionalText(group.id, 'ELO: identificador de grupo', 32);
        if (!id || !/^[\p{L}\p{N}_-]+$/u.test(id) || ids.has(id))
          fail('ELO: use identificadores de grupo distintos, somente com letras, números, _ ou -.');
        ids.add(id);
        return {
          id,
          cells: unique(
            array(group.cells, n, 'ELO: casas do grupo', 2).map(cell),
            'ELO: casas do grupo',
          ).sort(ordered),
        };
      },
    );
  }
  const excluded = new Set([
    ...(constraints.passages ?? []),
    ...(constraints.exclusivePassages ?? []).flatMap((group) => group.cells),
  ]);
  for (const fixed of Object.values(level.fixed))
    if (excluded.has(fixed)) fail('ELO: pistas fixas não podem ocupar passagens.');
  if (Object.keys(constraints).length) level.constraints = constraints;
}
function normalizePrumo(input, level) {
  if (level.rows > 6 || level.cols > 6 || level.rows * level.cols > 36)
    fail('PRUMO: use até 6 × 6, no máximo 36 casas.');
  const used = new Set();
  level.supports = array(input.supports, 20, 'PRUMO: apoios', 1).map((support, index) => {
    requireObject(support, 'PRUMO: apoio');
    const x2 = integer(support.x2, 0, 2 * (level.cols - 1), 'PRUMO: x2'),
      y2 = integer(support.y2, 0, 2 * (level.rows - 1), 'PRUMO: y2');
    if (x2 % 2 && y2 % 2) fail('PRUMO: o apoio deve ficar num centro de casa ou meio de lado.');
    const result = { id: index, x2, y2 };
    for (const cell of supportCells(level, result)) {
      if (used.has(cell)) fail('PRUMO: dois apoios não podem compartilhar uma casa incidente.');
      used.add(cell);
    }
    return result;
  });
}
function normalizeDesvio(input, level) {
  const n = level.rows * level.cols;
  if (n > 16) fail('DESVIO: use até 16 casas.');
  level.arrows = array(input.arrows, n, 'DESVIO: setas', n).map((arrow) => {
    if (arrow !== 'H' && arrow !== 'V') fail('DESVIO: use somente setas H ou V.');
    return arrow;
  });
  if (input.initialAvailable !== undefined)
    level.initialAvailable = integer(
      input.initialAvailable,
      0,
      2 ** n - 1,
      'DESVIO: casas disponíveis',
    );
  if (input.initialRestriction !== undefined && input.initialRestriction !== null) {
    const value = requireObject(input.initialRestriction, 'DESVIO: destino inicial');
    if (!['row', 'col'].includes(value.axis)) fail('DESVIO: eixo inicial deve ser row ou col.');
    level.initialRestriction = {
      axis: value.axis,
      index: integer(
        value.index,
        0,
        (value.axis === 'row' ? level.rows : level.cols) - 1,
        'DESVIO: índice inicial',
      ),
    };
  }
}
export function normalizeCollectionLevel(input, game) {
  assertJSONData(input);
  requireObject(input, 'Fase');
  if (!GAMES.has(game)) fail('Jogo de coleção desconhecido.');
  if (
    input.game !== game &&
    !(game === 'desvio' && !Object.hasOwn(input, 'game') && Array.isArray(input.arrows))
  )
    fail('Use dados do jogo selecionado.');
  const level = {
    game,
    rows: integer(input.rows, 1, 64, 'Linhas'),
    cols: integer(input.cols, 1, 64, 'Colunas'),
  };
  if (level.rows * level.cols > 64) fail('O tabuleiro tem casas demais.');
  if (game === 'elo') normalizeElo(input, level);
  else if (game === 'prumo') normalizePrumo(input, level);
  else if (game === 'pacto') {
    if (level.rows !== 8 || level.cols !== 8)
      fail('PACTO: a grade deve ter exatamente 8 × 8 casas.');
    level.clues = array(input.clues, 64, 'PACTO: pistas', 64).map((value) =>
      integer(value, -1, 3, 'PACTO: símbolo'),
    );
  } else normalizeDesvio(input, level);
  level.id = customIdentity(game, level);
  const name = optionalText(input.name, 'Nome'),
    description = optionalText(input.description, 'Descrição', 1000);
  if (name !== undefined) level.name = name;
  if (description !== undefined) level.description = description;
  return level;
}
function inconclusive() {
  fail(
    'Verificação não concluída dentro do limite seguro. Reduza as alternativas ou acrescente pistas e tente novamente.',
  );
}
function boundedOption(value, fallback, maximum) {
  return Number.isFinite(value) && value >= 0 ? Math.min(value, maximum) : fallback;
}
// The existing PRUMO engine has no direct-call node budget. Keep its small,
// finite shape enumeration, but budget the exact-cover search outside a worker.
function solvePrumoSmall(level, { maxNodes = 20000, maxMs = 1000, maxOperations = 500000 } = {}) {
  const started = performance.now(),
    domains = prumoDomains(level),
    full = 2 ** (level.rows * level.cols) - 1,
    chosen = Array(level.supports.length).fill(0),
    solutions = [];
  let nodes = 0,
    operations = 0,
    limited = false,
    solutionLimit = false;
  const tick = () => {
    if (
      ++operations > maxOperations ||
      ((operations & 127) === 0 && performance.now() - started >= maxMs)
    ) {
      limited = true;
      return false;
    }
    return true;
  };
  function search(used, depth) {
    if (limited || solutionLimit) return;
    if (++nodes > maxNodes || performance.now() - started >= maxMs) {
      limited = true;
      return;
    }
    if (depth === domains.length) {
      if (used === full) {
        solutions.push(
          Array.from({ length: level.rows * level.cols }, (_, cell) =>
            chosen.findIndex((mask) => mask & (1 << cell)),
          ),
        );
        if (solutions.length >= 2) solutionLimit = true;
      }
      return;
    }
    let best = -1,
      options = null;
    for (let support = 0; support < domains.length; support++)
      if (!chosen[support]) {
        const available = [];
        for (const mask of domains[support]) {
          if (!tick()) return;
          if (!(mask & used)) available.push(mask);
        }
        if (!available.length) return;
        if (!options || available.length < options.length) {
          options = available;
          best = support;
        }
      }
    for (const mask of options) {
      chosen[best] = mask;
      search(used | mask, depth + 1);
      chosen[best] = 0;
      if (limited || solutionLimit) return;
    }
  }
  search(0, 0);
  return { count: solutions.length, solutions, exhaustive: !limited && !solutionLimit };
}
/** Bounded direct path, also used inside the disposable browser worker. */
export function verifyCollectionLevel(
  input,
  { worker = false, maxNodes, maxMs, maxOperations } = {},
) {
  const level = normalizeCollectionLevel(input, input?.game ?? 'desvio');
  if (level.game === 'desvio') {
    if (!worker && level.rows * level.cols > 12) inconclusive();
    const state = createDesvio(level),
      analysis = analyzeDesvio(level, state);
    return {
      level,
      solution: null,
      text: `Mapa válido. ${analysis.winning ? 'Quem começa' : 'O segundo jogador'} tem vitória teórica com jogo perfeito.`,
    };
  }
  if (!worker && level.game === 'prumo' && level.rows * level.cols > 16) inconclusive();
  let result;
  try {
    const budget = {
      maxNodes: boundedOption(maxNodes, 20000, 20000),
      maxMs: boundedOption(maxMs, 1000, 1000),
      maxOperations: boundedOption(maxOperations, 500000, 500000),
    };
    result =
      level.game === 'pacto'
        ? solveSymbols(level, undefined, 2, {
            maxNodes: boundedOption(maxNodes, worker ? 20000 : 128, worker ? 20000 : 128),
          })
        : level.game === 'prumo' && !worker
          ? solvePrumoSmall(level, budget)
          : solveGeometry(level, undefined, 2, budget);
  } catch (error) {
    if (error instanceof RangeError || /orçamento|budget/i.test(error?.message ?? ''))
      inconclusive();
    throw error;
  }
  if (result.count >= 2) fail('Há mais de uma solução. Acrescente pistas.');
  const complete = level.game === 'pacto' ? result.complete === true : result.exhaustive === true;
  if (!complete) inconclusive();
  if (result.count === 0) fail('Nenhuma solução atende às regras e pistas desta fase.');
  if (result.count !== 1 || !Array.isArray(result.solutions?.[0])) inconclusive();
  const solution = result.solutions[0].slice(),
    check =
      level.game === 'pacto' ? validateSymbols(level, solution) : validateGeometry(level, solution);
  if (!check.complete || !check.valid)
    fail('A solução calculada não passou na conferência das regras.');
  return {
    level,
    solution,
    text: 'Uma solução exata. Fase pronta para testar; dificuldade humana ainda não calibrada.',
  };
}
const abortError = () => {
  const error = new Error('Verificação cancelada.');
  error.name = 'AbortError';
  return error;
};
/** In browsers, expensive solving is isolated and terminated at the deadline. */
export function validateCollectionJSON(
  text,
  game,
  { signal, makeWorker, deadline = COLLECTION_JSON_DEADLINE } = {},
) {
  if (signal?.aborted) throw abortError();
  const level = normalizeCollectionLevel(
    parseLevelJSON(text, game, { allowLegacyDesvio: true }),
    game,
  );
  const factory =
    makeWorker ??
    (typeof Worker === 'function'
      ? () =>
          new Worker(new URL('./collection-json-worker.mjs', import.meta.url), { type: 'module' })
      : null);
  if (!factory) return verifyCollectionLevel(level);
  return new Promise((resolve, reject) => {
    let worker = null,
      timer = null,
      settled = false;
    const finish = (error, result) => {
      if (settled) return;
      settled = true;
      if (timer !== null) clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      worker?.terminate();
      error ? reject(error) : resolve(result);
    };
    const onAbort = () => finish(abortError());
    try {
      worker = factory();
      signal?.addEventListener('abort', onAbort, { once: true });
      if (signal?.aborted) {
        onAbort();
        return;
      }
      worker.onmessage = (event) => {
        if (event.data?.ok) finish(null, event.data.result);
        else finish(new Error(event.data?.error ?? 'Não foi possível verificar a fase.'));
      };
      worker.onerror = () =>
        finish(new Error('Não foi possível verificar a fase. Seu tabuleiro foi preservado.'));
      timer = setTimeout(
        () =>
          finish(
            new Error(
              'Verificação não concluída dentro do limite seguro. Reduza as alternativas ou acrescente pistas e tente novamente.',
            ),
          ),
        Math.max(1, Math.min(deadline, COLLECTION_JSON_DEADLINE)),
      );
      worker.postMessage({ level });
    } catch {
      finish(
        new Error('Não foi possível iniciar a verificação segura. Seu tabuleiro foi preservado.'),
      );
    }
  });
}
export const COLLECTION_JSON_EXAMPLES = Object.freeze({
  elo: { game: 'elo', id: 'meu-elo', rows: 2, cols: 2, regions: [0, 1, 2, 3], fixed: {} },
  prumo: { game: 'prumo', id: 'meu-prumo', rows: 1, cols: 3, supports: [{ id: 0, x2: 2, y2: 0 }] },
  pacto: {
    game: 'pacto',
    id: 'meu-pacto',
    rows: 8,
    cols: 8,
    clues: [
      -1, 3, 3, 1, 2, 1, 0, 0, 2, 0, 0, 1, 2, 1, 3, 3, 0, 3, 3, 2, 0, 2, 1, 1, 0, 1, 1, 2, 0, 2, 3,
      3, 1, 2, 2, 3, 1, 3, 0, 0, 1, 0, 0, 3, 1, 3, 2, 2, 3, 2, 2, 0, 3, 0, 1, 1, 3, 1, 1, 0, 3, 0,
      2, 2,
    ],
  },
  desvio: { game: 'desvio', id: 'meu-desvio', rows: 2, cols: 2, arrows: ['H', 'V', 'V', 'H'] },
});
export const COLLECTION_JSON_HELP = Object.freeze({
  elo: 'ELO: game "elo", rows e cols até 7, regions com uma região numérica por casa, consecutivas a partir de 0, e fixed opcional ligando região à casa fixa. Casas são índices a partir de 0, por linha. constraints pode conter shapes, passages, forbiddenEdges, rowCounts, colCounts, distances, neighbors, order, cuts e exclusivePassages. A fase deve ter uma solução única.',
  prumo:
    'PRUMO: game "prumo", rows e cols até 6, no máximo 36 casas, e supports com 1 a 20 apoios {x2, y2}. As coordenadas são duplicadas: centros têm coordenadas pares; um meio de lado tem uma coordenada ímpar. Apoios não podem compartilhar casas incidentes. A fase deve ter uma solução única.',
  pacto:
    'PACTO: game "pacto", rows 8, cols 8 e clues com exatamente 64 números em ordem de linha. Use -1 para uma casa vazia e 0, 1, 2 ou 3 para os quatro símbolos. A fase deve ter uma solução única.',
  desvio:
    'DESVIO: game "desvio", rows e cols com até 16 casas no total, e arrows com uma letra "H" ou "V" por casa, em ordem de linha. initialAvailable pode definir a máscara de casas disponíveis e initialRestriction o destino {axis: "row" ou "col", index}. Mapas não precisam ter uma única jogada vencedora. Exports antigos sem game também são aceitos.',
});
