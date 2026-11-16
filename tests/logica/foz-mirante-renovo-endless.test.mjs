import test from 'node:test';
import assert from 'node:assert/strict';
const games=['foz','mirante','renovo'];
for(const game of games) {
  const generator=await import(`../../dist/logica/games/${game}/endless.mjs`);
  const engine=await import(`../../dist/logica/games/${game}/engine.mjs`);
  test(`${game}: 1,200 procedural seeds validate and remain deterministic`,()=>{
    const started=performance.now();
    for(let d=0;d<6;d++) {
      const signatures=new Set();
      for(let seed=0;seed<200;seed++) {
        const level=generator.generateEndlessLevel(`stress-${seed}`,d);
        assert.equal(level.version,1);assert.equal(level.game,game);assert.equal(level.difficulty,d);
        assert.equal(engine.checkState(level,engine.solutionState(level)).valid,true);
        assert.equal(engine.checkState(level,engine.initialState(level)).valid,false);
        assert.deepEqual(level,generator.generateEndlessLevel(`stress-${seed}`,d));
        const signature=generator.structuralSignature(level); signatures.add(signature);
        assert.equal(signature,generator.structuralSignature({...level,id:'different',name:'different',difficulty:9}));
        if(engine.isLevelValid)assert.equal(engine.isLevelValid(level),true);
      }
      assert.ok(signatures.size>=90,`${game} band ${d}: only ${signatures.size}/200 canonical structures`);
    }
    assert.ok(performance.now()-started<30000,'2,400 generations must fit a generous 30 second regression budget');
  });
  test(`${game}: clamping, seed types, isolated outputs and engine-only answer checking`,()=>{
    for(const [input,expected] of [[-100,0],[100,5],[NaN,0],[2.9,2]])assert.equal(generator.generateEndlessLevel('bands',input).difficulty,expected);
    for(const seed of ['',0,-1,'ç∞'])assert.deepEqual(generator.generateEndlessLevel(seed),generator.generateEndlessLevel(seed));
    const a=generator.generateEndlessLevel('isolation',3),b=generator.generateEndlessLevel('isolation',3),state=engine.solutionState(a);
    a.solution=[];assert.equal(engine.checkState(a,state).valid,true);assert.notDeepEqual(a,b);
    assert.deepEqual(b,generator.generateEndlessLevel('isolation',3));
  });
  if(game!=='foz')test(`${game}: bounded zero-attempt fallback always constructs valid new boards`,()=>{
    for(let d=0;d<6;d++)for(let seed=0;seed<100;seed++) {
      const level=generator.generateEndlessLevel(seed,d,{maxAttempts:0});
      assert.equal(engine.checkState(level,engine.solutionState(level)).valid,true);
      assert.equal(engine.checkState(level,engine.initialState(level)).valid,false);
      assert.deepEqual(level,generator.generateEndlessLevel(seed,d,{maxAttempts:0}));
    }
  });
}
