import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';

const results = {};
for (const game of ['divisa', 'pulso', 'refugio']) {
  const generator = await import(`../../dist/logica/games/${game}/endless.mjs`);
  const engine = await import(`../../dist/logica/games/${game}/engine.mjs`);
  const campaign = (await import(`../../dist/logica/games/${game}/campaign.mjs`)).CAMPAIGN;
  const campaignKeys = new Set(campaign.map(generator.structuralSignature));
  const start = performance.now(), bands = [];
  let worstMs = 0;
  for (let d = 0; d < 6; d++) {
    const signatures = new Set(), solutionShapes = new Set(); let totalUnknown = 0, overlaps = 0;
    for (let seed = 0; seed < 160; seed++) {
      const before = performance.now();
      const level = generator.generateEndlessLevel(`qa-${seed}`, d);
      worstMs = Math.max(worstMs, performance.now() - before);
      assert.equal(level.version, 1); assert.equal(level.game, game); assert.equal(level.difficulty, d);
      assert.equal(level.solution.length, level.rows * level.cols);
      assert.equal(engine.isStateValid(level, engine.initialState(level)), true);
      assert.equal(engine.checkState(level, engine.initialState(level)).valid, false);
      assert.equal(engine.checkState(level, engine.solutionState(level)).valid, true);
      assert.equal(level.generation.unique, true);
      assert(level.generation.unknown >= 1);
      const signature = generator.structuralSignature(level);
      signatures.add(signature); solutionShapes.add(JSON.stringify(level.solution));
      totalUnknown += level.generation.unknown;
      overlaps += campaignKeys.has(signature);
      if (seed % 17 === 0) {
        assert.deepEqual(generator.generateEndlessLevel(`qa-${seed}`, d), level);
        const copy = JSON.parse(JSON.stringify(level));
        copy.id = 'different'; copy.name = 'Other'; copy.difficulty = 42; delete copy.generation;
        assert.equal(generator.structuralSignature(copy), signature);
        const mirrored = JSON.parse(JSON.stringify(level));
        const flip = i => Math.floor(i / level.cols) * level.cols + level.cols - 1 - i % level.cols;
        mirrored.solution = mirrored.solution.map((_,i)=>level.solution[flip(i)]);
        if (game === 'pulso') {
          mirrored.quotas.reverse();
          mirrored.givens = Object.fromEntries(Object.entries(level.givens).map(([i,v])=>[flip(Number(i)),v]));
        } else {
          mirrored.givens = mirrored.givens.map((_,i)=>level.givens[flip(i)]);
          if (game === 'refugio') mirrored.markers = mirrored.markers.map(m=>({...m,index:flip(m.index),label:m.label+8}));
        }
        assert.equal(generator.structuralSignature(mirrored), signature, 'Reflection invariant');

        // Verify playability using only legal player actions, not solutionState.
        let state = engine.initialState(level);
        for (let i = 0; i < level.solution.length; i++) {
          const v = level.solution[i];
          state = engine.applyAction(level, state, {type:'cell',index:i,tool:game === 'divisa' ? v : game === 'pulso' ? v === 1 ? 'mark' : 'empty' : v === 1 ? 'wall' : 'free'});
        }
        assert.equal(engine.checkState(level, state).valid, true);
      }
      if (seed < 6 && d === 0) {
        // Independent exhaustive enumeration for small boards. Does not use the
        // generator's pruning or its claimed certificate.
        const initial = engine.initialState(level), open = initial.cells.flatMap((v,i)=>v===null?[i]:[]);
        const choices = game === 'divisa' ? level.letters : [0,1]; let count = 0;
        const cells = initial.cells.slice();
        function visit(k) {
          if (k === open.length) { count += Number(engine.checkState(level,{cells,lastChanged:null}).valid); return; }
          for (const value of choices) { cells[open[k]] = value; visit(k+1); }
        }
        visit(0); assert.equal(count, 1, `${game} unique seed ${seed}`);
      }
    }
    assert(signatures.size >= (d === 0 ? 40 : 100), `${game} band ${d} diversity ${signatures.size}`);
    assert(solutionShapes.size >= 30, `${game} actual random solution diversity`);
    assert(overlaps < 30, `${game} must not replay its campaign`);
    bands.push({difficulty:d,distinct:signatures.size,solutionShapes:solutionShapes.size,meanUnknown:totalUnknown/160,campaignOverlaps:overlaps});
  }
  assert(bands[5].meanUnknown > bands[0].meanUnknown + 5, `${game} increasing decisions`);
  assert.equal(generator.generateEndlessLevel('clamp', -99).difficulty, 0);
  assert.equal(generator.generateEndlessLevel('clamp', 99).difficulty, 5);
  assert.equal(generator.generateEndlessLevel('clamp', NaN).difficulty, 0);
  if (game === 'refugio') for (let d = 0; d < 6; d++) for (let seed=0;seed<30;seed++) {
    const level=generator.generateEndlessLevel(`fallback-${seed}`,d,{maxAttempts:0});
    assert.equal(level.generation.fallback,true);
    assert.equal(engine.checkState(level,engine.solutionState(level)).valid,true);
    assert.equal(engine.checkState(level,engine.initialState(level)).valid,false);
    assert.deepEqual(generator.generateEndlessLevel(`fallback-${seed}`,d,{maxAttempts:0}),level);
  }
  // Generous CI guard. Structural bounds, rather than wall-clock interruption,
  // guarantee bounded work regardless of machine speed.
  assert(worstMs < 1500, `${game} exceeded generation budget: ${worstMs}`);
  results[game]={generated:960,worstMs:Math.round(worstMs*100)/100,totalMs:Math.round(performance.now()-start),bands};
}
console.log(JSON.stringify(results,null,2));
