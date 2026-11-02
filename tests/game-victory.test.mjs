// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resultMarkup, createResultMotion } from '../dist/result-motion.mjs';
const baseline = '2d000b0c95c5e48b1f01ebf571d0007ed42cc340';
const previous = execFileSync('git', ['show', `${baseline}:dist/result-motion.mjs`], {
  encoding: 'utf8',
});
const old = await import('data:text/javascript;base64,' + Buffer.from(previous).toString('base64'));
for (const game of ['light', 'cut'])
  for (const success of [true, false])
    for (const options of [{}, { retry: true }, { winner: 2 }, { animate: false }])
      assert.equal(
        resultMarkup(game, success, options),
        old.resultMarkup(game, success, options),
        `${game}: exact original markup`,
      );
for (const file of ['dist/style.css', 'dist/app.mjs'])
  assert.equal(
    readFileSync(file, 'utf8'),
    execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8' }),
    `${file} byte-preserved`,
  );
function rig(factory, state = {}) {
  let next = 0;
  const tasks = new Map(),
    classes = new Set();
  const host = {
    innerHTML: '',
    dataset: {},
    attrs: {},
    setAttribute(k, v) {
      this.attrs[k] = v;
    },
    querySelector() {
      return null;
    },
  };
  const surface = {
    offsetWidth: 1,
    classList: { add: (c) => classes.add(c), remove: (c) => classes.delete(c) },
  };
  const clock = {
    setTimeout(fn, ms) {
      tasks.set(++next, { fn, ms });
      return next;
    },
    clearTimeout(id) {
      tasks.delete(id);
    },
  };
  const motion = factory(host, surface, clock, { getVictoryState: () => state });
  return { host, surface, motion, tasks, classes };
}
for (const game of ['light', 'cut']) {
  const a = rig(createResultMotion),
    b = rig(old.createResultMotion);
  for (const success of [true, true, false, true]) {
    a.motion.show(game, success);
    b.motion.show(game, success);
    assert.equal(JSON.stringify(a.host), JSON.stringify(b.host));
    assert.deepEqual([...a.classes], [...b.classes]);
    assert.deepEqual(
      [...a.tasks.values()].map((x) => x.ms),
      [...b.tasks.values()].map((x) => x.ms),
    );
  }
  a.motion.clear();
  b.motion.clear();
  assert.equal(JSON.stringify(a.host), JSON.stringify(b.host));
  assert.equal(a.tasks.size, 0);
}
const games = ['elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'orbita', 'desvio'];
const scenes = new Set();
for (const game of games) {
  const state = {},
    a = rig(createResultMotion, state);
  a.motion.show(game, true);
  scenes.add(a.host.innerHTML);
  assert.match(a.host.innerHTML, /game-victory/);
  assert.equal(a.host.dataset.outcome, 'win');
  assert.equal(a.tasks.size, 1);
  const serial = a.motion.serial;
  a.motion.show(game, true);
  assert.equal(a.motion.serial, serial, 'same won state does not restart');
  a.motion.clear();
  assert.equal(a.host.innerHTML, '');
  assert.equal(a.tasks.size, 0);
  assert.equal(a.classes.size, 0);
  const b = rig(createResultMotion, state);
  b.motion.show(game, true);
  assert.match(b.host.innerHTML, /game-victory-static/);
  assert.equal(b.tasks.size, 0, 'restored scene is static');
  const c = rig(createResultMotion);
  c.motion.show(game, true, { animate: false });
  assert.equal(c.tasks.size, 0);
  assert.match(c.host.innerHTML, /game-victory-static/);
  assert.doesNotMatch(resultMarkup(game, false), /game-victory/, 'loss never has victory art');
}
assert.equal(scenes.size, 7);
console.log(
  'PASS: 7 distinct victory scenes, real-win-only, dedup, static restoration, cleanup; original 2 exact markup/lifecycle/CSS preserved.',
);

// Every newly won campaign phase gets the standard PARABÉNS overlay as well.
for (const game of ['light', 'cut', ...games.filter((g) => g !== 'desvio')]) {
  const first = rig(createResultMotion);
  first.motion.show(game, true);
  assert.match(first.host.innerHTML, /victory-celebration/);
  assert.match(first.host.innerHTML, /PARABÉNS!/);
  assert.ok(first.classes.has('result-success'));
  first.motion.clear();
  assert.equal(first.tasks.size, 0);
  const replay = rig(createResultMotion);
  replay.motion.show(game, true);
  assert.match(replay.host.innerHTML, /victory-celebration/, 'fresh replay wins celebrate');
  assert.doesNotMatch(resultMarkup(game, false), /victory-celebration/);
}
assert.doesNotMatch(resultMarkup('desvio', true), /victory-celebration/, 'Desvio unaffected');
for (const game of games.filter((g) => g !== 'desvio'))
  assert.doesNotMatch(resultMarkup(game, true, { animate: false }), /victory-celebration/);
console.log(
  'PASS: PARABÉNS on all eight campaign wins and fresh replays; no false or restored-win trigger.',
);
