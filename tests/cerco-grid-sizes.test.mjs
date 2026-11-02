// Testes e verificações de CERCO.
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  CERCO_MAPS,
  CERCO_GRID_SIZES,
  getCercoMap,
  getCercoMapsForSize,
  getCercoMapVariant,
  createCerco,
  cercoNeighbors,
  legalCercoMoves,
  applyCercoMove,
  previewCercoMove,
  undoCerco,
  redoCerco,
  resetCerco,
  rematchCerco,
  restoreCerco,
  serializeCerco,
} from '../dist/cerco/engine.mjs';
import { CERCO_BOT_LEVELS, chooseCercoMove, chooseCercoMoveAsync } from '../dist/cerco/bot.mjs';
const root = fileURLToPath(new URL('../', import.meta.url)),
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cerco-five-baseline-'));
for (const name of ['maps.mjs', 'engine.mjs'])
  fs.writeFileSync(
    path.join(tmp, name),
    execFileSync('git', ['show', `95aed627:dist/cerco/${name}`], { cwd: root }),
  );
const old = await import(pathToFileURL(path.join(tmp, 'engine.mjs')));
after(() => fs.rmSync(tmp, { recursive: true, force: true }));
const copy = (x) => structuredClone(x),
  families = ['classic', 'lago', 'pilares', 'portais', 'ampulheta', 'cantos', 'canais'];
test('28 curated immutable maps, seven per size; original seven remain byte-equivalent', () => {
  assert.deepEqual(CERCO_GRID_SIZES, [5, 6, 7, 8]);
  assert.equal(CERCO_MAPS.length, 28);
  assert.equal(new Set(CERCO_MAPS.map((m) => m.id)).size, 28);
  assert.deepEqual(CERCO_MAPS.slice(0, 7), old.CERCO_MAPS);
  for (const size of CERCO_GRID_SIZES) {
    const maps = getCercoMapsForSize(size);
    assert.equal(maps.length, 7);
    assert.equal(new Set(maps.map((m) => JSON.stringify([m.walls, m.outside]))).size, 7);
    for (let i = 0; i < 7; i++) {
      const m = maps[i];
      assert.equal(m.rows, size);
      assert.equal(m.cols, size);
      assert.equal(m.id, size === 5 ? families[i] : `${families[i]}-${size}`);
      assert(Object.isFrozen(m.starts[0]));
      assert(Object.isFrozen(m.walls));
      const n = size * size,
        blocked = [...m.walls, ...m.outside],
        set = new Set(blocked);
      assert.equal(set.size, blocked.length);
      assert(blocked.every((c) => Number.isInteger(c) && c >= 0 && c < n));
      assert.deepEqual(
        [...set].sort((a, b) => a - b),
        blocked.map((c) => n - 1 - c).sort((a, b) => a - b),
      );
      assert.equal(m.maxMoves, n - blocked.length - 6);
      assert.equal(new Set(m.starts.flat()).size, 6);
      assert(m.starts.flat().every((c) => !set.has(c)));
      assert.deepEqual(
        m.starts[0].map((c) => n - 1 - c).sort((a, b) => a - b),
        [...m.starts[1]].sort((a, b) => a - b),
      );
      const seen = new Set([m.starts[0][0]]),
        queue = [...seen];
      for (let k = 0; k < queue.length; k++)
        for (const to of cercoNeighbors(queue[k], m))
          if (!set.has(to) && !seen.has(to)) {
            seen.add(to);
            queue.push(to);
          }
      assert.equal(seen.size, n - blocked.length, m.id + ' connected');
      const s = createCerco(0, m.id);
      for (const p of [0, 1])
        for (const from of m.starts[p])
          assert(
            legalCercoMoves(s, p).some((m) => m.from === from),
            'each initial piece mobile',
          );
    }
  }
});
test('dimension helper preserves family through 5→6→7→8→5; malformed choices fail closed', () => {
  for (const m of CERCO_MAPS)
    for (const size of CERCO_GRID_SIZES) {
      const next = getCercoMapVariant(m.id, size);
      assert.equal(next.rows, size);
      assert.equal(next.family || next.id, m.family || m.id);
      assert.equal(getCercoMapVariant(createCerco(1, m.id), size), next);
    }
  assert.equal(getCercoMapVariant('unknown', 8), null);
  for (const size of [0, 4, 9, '8', NaN, null]) {
    assert.equal(getCercoMapVariant('classic', size), null);
    assert.equal(getCercoMapsForSize(size).length, 0);
  }
  assert.equal(getCercoMap({ board: [] }).id, 'classic');
  assert.equal(getCercoMapVariant({}, 8).id, 'classic-8');
  for (const size of CERCO_GRID_SIZES) {
    const m = getCercoMapsForSize(size)[0];
    for (let cell = 0; cell < size * size; cell++)
      for (const to of cercoNeighbors(cell, m)) {
        assert.equal(
          Math.abs(Math.floor(cell / size) - Math.floor(to / size)) +
            Math.abs((cell % size) - (to % size)),
          1,
        );
        assert(to >= 0 && to < size * size);
      }
  }
});
let seed = 20261101;
const random = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0);
const certificates = [];
for (const map of CERCO_MAPS)
  test(`${map.id}: 200 games, both starters, immutable preview, terminal bound, undo/replay`, () => {
    let min = Infinity,
      max = 0,
      movesTotal = 0;
    const wins = [0, 0];
    for (const starter of [0, 1])
      for (let trial = 0; trial < 100; trial++) {
        let s = createCerco(starter, map.id),
          baseline = map.rows === 5 && trial === 0 ? old.createCerco(starter, map.id) : null;
        while (!s.over) {
          const moves = legalCercoMoves(s);
          assert(moves.length);
          const move = moves[random() % moves.length],
            before = JSON.stringify(s),
            preview = previewCercoMove(s, move);
          assert.equal(JSON.stringify(s), before);
          s = applyCercoMove(s, move).state;
          assert.deepEqual(s, preview.state);
          if (baseline) {
            baseline = old.applyCercoMove(baseline, move).state;
            assert.deepEqual(s, baseline);
          }
          assert.equal(s.board.filter((v) => v === 0).length, 3);
          assert.equal(s.board.filter((v) => v === 1).length, 3);
          assert.equal(s.board.filter((v) => v === 'barrier').length, s.turn);
          assert.equal(s.board.filter((v) => v === null).length, map.maxMoves - s.turn);
          assert(s.turn <= map.maxMoves);
          for (const c of map.walls) assert.equal(s.board[c], 'wall');
          for (const c of map.outside) assert.equal(s.board[c], 'outside');
          if (trial === 0) {
            const undone = undoCerco(s);
            assert.deepEqual(redoCerco(undone), s);
            assert.deepEqual(restoreCerco(serializeCerco(undone)), undone);
          }
        }
        assert.equal(s.winner, 1 - s.player);
        assert.equal(legalCercoMoves({ ...s, over: false }).length, 0);
        assert.deepEqual(restoreCerco(serializeCerco(s)), s);
        assert.deepEqual(resetCerco(s), createCerco(starter, map.id));
        assert.deepEqual(rematchCerco(s), createCerco(1 - starter, map.id));
        wins[s.winner]++;
        min = Math.min(min, s.turn);
        max = Math.max(max, s.turn);
        movesTotal += s.turn;
      }
    assert(wins.every((n) => n > 0));
    certificates.push({
      id: map.id,
      size: map.rows,
      games: 200,
      min,
      max,
      limit: map.maxMoves,
      movesTotal,
      wins,
    });
  });
test('legacy save without map metadata stays exact; all larger saves reject wrong dimensions and identities', () => {
  let legacy = copy(createCerco());
  delete legacy.mapId;
  delete legacy.mapVersion;
  const original = copy(legacy);
  for (let i = 0; i < 4; i++) legacy = applyCercoMove(legacy, legalCercoMoves(legacy)[0]).state;
  legacy = undoCerco(legacy);
  assert.deepEqual(restoreCerco(serializeCerco(legacy)), legacy);
  assert(!Object.hasOwn(redoCerco(legacy), 'mapId'));
  assert.deepEqual(resetCerco(legacy), original);
  for (const m of CERCO_MAPS) {
    const s = createCerco(1, m.id);
    for (const mutate of [
      (x) => x.board.push(null),
      (x) => x.board.pop(),
      (x) => (x.mapId = 'classic-9'),
      (x) => x.mapVersion++,
      (x) => (x.history = Array(m.maxMoves + 1).fill({ from: 0, to: 1 })),
    ]) {
      const bad = copy(s);
      mutate(bad);
      assert.equal(restoreCerco(bad), null);
      assert.deepEqual(s, createCerco(1, m.id));
    }
    if (m.rows > 5) {
      const bad = copy(s);
      delete bad.mapId;
      delete bad.mapVersion;
      assert.equal(restoreCerco(bad), null);
    }
  }
});
test('all map sizes and difficulties use legal bounded moves; budgets unchanged', () => {
  assert.deepEqual(CERCO_BOT_LEVELS, {
    beginner: { depth: 1, nodes: 64 },
    intermediate: { depth: 2, nodes: 2000 },
    strong: { depth: 5, nodes: 12000 },
  });
  for (const m of CERCO_MAPS)
    for (const starter of [0, 1])
      for (const difficulty of ['beginner', 'intermediate', 'strong']) {
        let s = createCerco(starter, m.id);
        for (let ply = 0; ply < 3 && !s.over; ply++) {
          const before = JSON.stringify(s),
            r = chooseCercoMove(s, { difficulty, nodeBudget: 768, depth: 3, seed: ply });
          assert.equal(JSON.stringify(s), before);
          assert(r.nodes <= r.nodeBudget);
          assert(r.nodeBudget <= 768);
          assert(legalCercoMoves(s).some((m) => m.from === r.move.from && m.to === r.move.to));
          s = applyCercoMove(s, r.move).state;
        }
      }
});
test('cooperative search aborts without applying stale moves; move guards reject prior turn', async () => {
  for (const size of CERCO_GRID_SIZES) {
    const s = createCerco(0, `classic${size === 5 ? '' : '-' + size}`),
      controller = new AbortController(),
      promise = chooseCercoMoveAsync(s, { difficulty: 'strong', signal: controller.signal });
    controller.abort();
    await assert.rejects(promise, { name: 'AbortError' });
    assert.equal(s.turn, 0);
    const move = legalCercoMoves(s)[0],
      next = applyCercoMove(s, move).state;
    assert.throws(() =>
      applyCercoMove(next, legalCercoMoves(next)[0], { expectedTurn: 0, expectedPlayer: 0 }),
    );
  }
});
test('worker keeps request ids and validates larger-map saves', async () => {
  const oldSelf = globalThis.self;
  const messages = [];
  globalThis.self = { postMessage: (m) => messages.push(m) };
  try {
    await import('../dist/cerco/worker.mjs?grid-sizes-test');
    for (const size of CERCO_GRID_SIZES) {
      const state = createCerco(0, `classic${size === 5 ? '' : '-' + size}`);
      self.onmessage({ data: { id: `grid-${size}`, state, options: { difficulty: 'beginner' } } });
      const response = messages.at(-1);
      assert.equal(response.id, `grid-${size}`);
      assert(
        legalCercoMoves(state).some(
          (m) => JSON.stringify(m) === JSON.stringify(response.result.move),
        ),
      );
    }
    self.onmessage({
      data: { id: 'stale-invalid', state: { ...createCerco(0, 'classic-8'), mapId: 'classic' } },
    });
    assert.equal(messages.at(-1).id, 'stale-invalid');
    assert(messages.at(-1).error);
  } finally {
    globalThis.self = oldSelf;
  }
});
after(() => {
  console.log('CERCO grid certificates:', JSON.stringify(certificates));
});
