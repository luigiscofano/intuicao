import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN,CHAPTERS,DIFFICULTIES} from '../dist/sintonia/campaign.mjs';
import {FALLBACK_LEVELS,selectCertifiedFallback} from '../dist/sintonia/fallback.mjs';
import {generateLevel,structuralSignature,transformBoard,analyzeSolution,sweepReachability,MECHANICS,REASONING_FAMILIES,familyRecencyPenalty,GENERATOR_VERSION,CONTENT_REVISION} from '../dist/sintonia/generator.mjs';
import {initialState,transition,validateLevel,replay,solveLevel,isWon,stateKey} from '../dist/sintonia/engine.mjs';

test('campaign has exactly 500 real definitions, prescribed ranges and animal counts',()=>{
  assert.equal(CAMPAIGN.length,500);assert.equal(CHAPTERS.length,20);assert.equal(DIFFICULTIES.length,6);
  assert.equal(new Set(CAMPAIGN.map(l=>l.id)).size,500);
  const expected=[[1,25,[25,0,0]],[26,100,[75,0,0]],[101,225,[85,40,0]],[226,350,[45,80,0]],[351,450,[20,50,30]],[451,500,[10,20,20]]];
  expected.forEach(([from,to,counts],difficulty)=>assert.deepEqual([2,3,4].map(n=>CAMPAIGN.slice(from-1,to).filter(l=>l.boards.length===n).length),counts,`difficulty ${difficulty}`));
  assert.equal(CAMPAIGN.find(l=>l.boards.length===3).number,151);assert.equal(CAMPAIGN.find(l=>l.boards.length===4).number,376);
  for(const [index,level] of CAMPAIGN.entries()){
    assert.equal(level.number,index+1);assert.equal(level.id,`sintonia-${String(index+1).padStart(4,'0')}`);assert.equal(level.chapter,Math.floor(index/25)+1);
    assert.ok(level.name&&level.lesson&&level.hints.length===3);assert.ok(level.editorial.discovery.startsWith('Aqui o jogador precisa descobrir que '));
    assert.equal(level.editorial.humanPlaytested,false);assert.ok(level.secondaryFamilies.length>=1&&level.secondaryFamilies.length<=2);
  }
  for(let chapter=1;chapter<=20;chapter++){
    const group=CAMPAIGN.filter(l=>l.chapter===chapter);
    assert.deepEqual(['focus','mix','revisit','compact','deep','synthesis'].map(role=>group.filter(l=>l.editorial.role===role).length),[4,8,5,4,3,1]);
  }
});

test('every campaign solution is valid, changes full state, and wins exactly at its end',()=>{
  for(const level of CAMPAIGN){
    assert.deepEqual(validateLevel(level),{valid:true,errors:[]},level.id);
    const result=replay(level,level.solution);assert.equal(result.valid,true,level.id);assert.equal(result.won,true,level.id);
    let state=initialState(level);assert.equal(isWon(level,state),false,level.id);
    for(const [index,direction] of level.solution.entries()){
      const moved=transition(level,state,direction);assert.equal(moved.changed,true,`${level.id} empty command ${index}`);
      state=moved.state;assert.equal(isWon(level,state),index===level.solution.length-1,`${level.id} early win ${index}`);
    }
    assert.equal(level.certificate.commands,level.solution.length);assert.equal(level.certificate.replayed,true);
  }
  assert.equal(CAMPAIGN[0].solution.length,1,'first level teaches one shared command');
});

test('all mechanics appear on schedule and have actual certified usage',()=>{
  const expectedFirst={walls:1,plate:76,switch:101,key:126,box:176,ice:201,portal:226,oneway:251,alternate:276,fragile:301,handoff:326,and:351,selector:401,delivery:426};
  const required={plate:['plate-gate'],switch:['switch','switch-gate'],key:['key','key-gate'],box:['push','box-support-gate'],ice:['ice'],portal:['portal'],oneway:['oneway'],alternate:['switch','sun-gate','moon-gate'],fragile:['fragile'],handoff:['handoff-0','handoff-1'],and:['and-gate'],selector:['selector','selected-0','selected-1'],delivery:['delivery','delivery-gate']};
  for(const mechanic of MECHANICS)assert.equal(CAMPAIGN.find(l=>l.mechanics.includes(mechanic.id))?.number,expectedFirst[mechanic.id],mechanic.id);
  for(const level of CAMPAIGN){
    for(const mechanic of level.mechanics)assert.ok(MECHANICS.find(m=>m.id===mechanic).introducedChapter<=level.chapter,`${level.id} premature ${mechanic}`);
    const analysis=analyzeSolution(level,level.solution),primary=level.parameters.primary;
    for(const flag of required[primary]||[])assert.ok(analysis.used.includes(flag),`${level.id} ${primary} not used: ${flag}`);
    if(level.parameters.secondary&&['ice','portal','oneway','fragile'].includes(level.parameters.secondary))assert.ok(analysis.used.includes(level.parameters.secondary),`${level.id} secondary unused`);
    if(level.family==='dual-use-object'){assert.ok(['support-then-release','support-and-necessary-stop'].includes(level.editorial.design?.pattern),level.id);if(level.editorial.design.pattern==='support-then-release')assert.ok(level.editorial.purpose.boxes.some(box=>box.plateReleases.some(release=>release.afterGateSupport)),level.id);else assert.equal(level.editorial.design.necessity?.status,'unsolvable',level.id);}
    if(level.family==='goal-transit')assert.ok(analysis.goalDepartures.some(Boolean),level.id);
    if(level.family==='unequal-loop')assert.ok(analysis.unequalLoops>0,level.id);
    if(!level.boards.some(board=>board.boxes?.length))assert.equal(/caixa|peso/i.test(level.hints.join(' ')),false,`${level.id} hint mentions absent box`);
    const expectedWord={ice:'gelo',portal:'portal',key:'chave',switch:'interruptor',fragile:'ponte',selector:'seletor',delivery:'canal',handoff:'placa',and:'duas'}[primary];
    if(expectedWord)assert.ok(level.hints.join(' ').includes(expectedWord),`${level.id} missing contextual mechanic`);
  }
  assert.deepEqual([...new Set(CAMPAIGN.map(l=>l.family))].sort(),[...REASONING_FAMILIES].sort());
});

test('500 definitions have distinct normalized topology, beyond rotation, mirrors, margins and panel order',()=>{
  assert.equal(new Set(CAMPAIGN.map(l=>structuralSignature(l))).size,500);
  assert.equal(new Set(CAMPAIGN.map(l=>structuralSignature(l,{topologyOnly:true}))).size,500);
  const original=CAMPAIGN[50],rotated=structuredClone(original);rotated.boards=original.boards.map(b=>transformBoard(b,5).board);
  assert.equal(structuralSignature(rotated),structuralSignature(original));
  rotated.boards.reverse();assert.equal(structuralSignature(rotated),structuralSignature(original));
  const padded=structuredClone(original);for(const board of padded.boards){const oldCols=board.cols,newCols=oldCols+4,map=cell=>(Math.floor(cell/oldCols)+2)*newCols+cell%oldCols+2;board.rows+=4;board.cols=newCols;board.walkable=board.walkable.map(map);board.start=map(board.start);board.goal=map(board.goal);}
  assert.equal(structuralSignature(padded),structuralSignature(original));
  assert.equal(structuralSignature(padded,{topologyOnly:true}),structuralSignature(original,{topologyOnly:true}));
});

test('after the introductory set, exhaustive wall sweeps cannot win; every microstep is checked',()=>{
  for(const level of CAMPAIGN.slice(12)){
    const macro=sweepReachability(level,{maxStates:2500,maxMs:5000});
    assert.equal(macro.status,'complete',level.id);
    assert.equal(macro.positions.has(level.boards.map(b=>b.goal).join(',')),false,level.id);
    assert.deepEqual(level.editorial.antiSpam.singleDirection.winningDirections,[],level.id);
    assert.equal(level.editorial.antiSpam.uniformRandom.runs,12);assert.equal(level.editorial.antiSpam.biasedRandom.runs,12);
  }
  const fixture=CAMPAIGN[50];assert.equal(replay(fixture,['right','down']).won,false);
  assert.equal(replay(fixture,['right','right','left','down','right']).won,true);
});

test('shortest certificates agree with an independent goal-directed BFS across all chapters',()=>{
  for(const level of CAMPAIGN.filter(l=>l.number===51||[1,13,25].includes((l.number-1)%25+1))){
    const solved=solveLevel(level,{maxStates:100000,maxMs:5000});
    assert.equal(solved.status,'solved',level.id);assert.equal(solved.optimal,true,level.id);assert.equal(solved.solution.length,level.solution.length,level.id);
  }
});

test('Endless creates replay-certified topology from new seeds and is deterministic',()=>{
  const signatures=new Set(),campaignSignatures=new Set(CAMPAIGN.map(l=>l.signature));
  for(let difficulty=0;difficulty<6;difficulty++)for(let i=0;i<8;i++){
    const seed=`acceptance-endless:${difficulty}:${i}`,options={difficulty,maxStates:35000,maxMs:12000,recentSignatures:[...signatures]},first=generateLevel(seed,options);
    assert.equal(replay(first.level,first.solution).won,true,seed);assert.equal(first.level.seed,seed);assert.equal(first.level.generatorVersion,GENERATOR_VERSION);assert.equal(first.level.contentRevision,CONTENT_REVISION);assert.equal(first.level.rulesVersion,1);
    assert.ok(!signatures.has(first.signature));assert.ok(!campaignSignatures.has(first.signature));signatures.add(first.signature);
    if(i===0){const second=generateLevel(seed,{...options,maxMs:18000});assert.deepEqual(second.level,first.level,`non-deterministic ${seed}`);}
  }
  assert.equal(signatures.size,48);
});

test('Endless introduces at most one unfamiliar mechanism and keeps introduction compact',()=>{
  const learned=['walls'];
  for(let i=0;i<MECHANICS.length-1;i++){
    const {level}=generateLevel(`new-concept:${i}`,{difficulty:5,learnedMechanics:learned,maxStates:35000,maxMs:12000});
    const unknown=level.mechanics.filter(id=>!learned.includes(id));assert.equal(unknown.length,1,level.id);assert.equal(level.boards.length,2);assert.ok(level.solution.length<=14);
    learned.push(...unknown);
  }
  assert.deepEqual([...new Set(learned)].sort(),MECHANICS.map(m=>m.id).sort());
});

test('budget expiration never returns a partial or unverified candidate',()=>{
  assert.throws(()=>generateLevel('budget-zero',{maxMs:0}),/budget/);
  assert.throws(()=>generateLevel('budget-tiny',{maxMs:Number.MIN_VALUE}),error=>['GENERATION_BUDGET','GENERATION_TIMEOUT'].includes(error.code));
});

test('recent family preference is deterministic, gentle, and grounded in actual wall discoveries',()=>{
  const learned=MECHANICS.filter(m=>m.difficulty<=2).map(m=>m.id),history=Array(24).fill('scenario-choice');
  let ordinary=0,preferred=0;
  for(let i=0;i<24;i++){
    const seed=`family-preference:${i}`,options={difficulty:2,learnedMechanics:learned,maxMs:10000,maxStates:25000};
    const baseline=generateLevel(seed,options),varied=generateLevel(seed,{...options,recentFamilies:history});
    if(baseline.level.family==='scenario-choice')ordinary++;if(varied.level.family==='scenario-choice')preferred++;
    assert.equal(replay(varied.level,varied.solution).won,true);
    if(i===0){assert.deepEqual(generateLevel(seed,{...options,recentFamilies:history}).level,varied.level);assert.deepEqual(generateLevel(seed,{...options,recentFamilies:[]}).level,baseline.level);}
  }
  assert.ok(ordinary>0);assert.ok(preferred<ordinary,`${preferred} should be below ${ordinary}`);
  let wallChoicesChanged=0;
  for(let i=0;i<8;i++){
    const options={difficulty:1,profile:{primary:'walls'},maxMs:10000,maxStates:10000},seed=`wall-preference:${i}`;
    const baseline=generateLevel(seed,options),varied=generateLevel(seed,{...options,recentFamilies:Array(24).fill(baseline.level.family)});
    assert.equal(varied.signature,baseline.signature);assert.deepEqual(varied.level.boards,baseline.level.boards);
    if(varied.level.family!==baseline.level.family)wallChoicesChanged++;
    const analysis=analyzeSolution(varied.level,varied.solution),observed=['final-command'];
    if(analysis.partialBlocks)observed.push('wall-adjust','waiting-place');if(analysis.earlyTurns)observed.push('intermediate-stop','axis-order');
    if(analysis.unequalLoops)observed.push('unequal-loop');if(analysis.goalDepartures.some(Boolean))observed.push('goal-transit');if(analysis.directionChanges>=3)observed.push('priority-change');
    assert.ok(observed.includes(varied.level.family),'family must be supported by the certificate');
  }
  assert.ok(wallChoicesChanged>=6);
  const introOptions={difficulty:5,learnedMechanics:['walls'],maxMs:10000,maxStates:25000};
  assert.deepEqual(generateLevel('history-keeps-introduction',introOptions).level,generateLevel('history-keeps-introduction',{...introOptions,recentFamilies:Array(24).fill('remote-support')}).level);
  const first=selectCertifiedFallback('family-fallback',{difficulty:2}),second=selectCertifiedFallback('family-fallback',{difficulty:2,recentFamilies:Array(24).fill(first.level.family)});
  assert.notEqual(second.level.family,first.level.family);assert.equal(second.level.difficulty,2);
  assert.equal(familyRecencyPenalty('x',[]),0);assert.equal(familyRecencyPenalty('x',Array(24).fill('x')),12.5);
  assert.ok(familyRecencyPenalty('x',['other','x'])>familyRecencyPenalty('x',['x','other']),'more recent occurrence counts more');
});

test('separate safety bank is complete, certified, eligible and prioritizes unused levels',()=>{
  assert.equal(FALLBACK_LEVELS.length,36);
  assert.equal(new Set(FALLBACK_LEVELS.map(l=>l.id)).size,36);
  for(let difficulty=0;difficulty<6;difficulty++)assert.equal(FALLBACK_LEVELS.filter(l=>l.difficulty===difficulty).length,6);
  const campaign=new Set(CAMPAIGN.map(l=>l.signature));for(const level of FALLBACK_LEVELS){assert.equal(replay(level,level.solution).won,true,level.id);assert.equal(campaign.has(level.signature),false,level.id);}
  const first=selectCertifiedFallback('fallback-choice',{difficulty:3}),second=selectCertifiedFallback('fallback-choice',{difficulty:3,usedFallbackIds:[first.level.id],recentSignatures:[first.signature]});
  assert.notEqual(first.level.id,second.level.id);assert.equal(first.validation.origin,'fallback');assert.equal(first.validation.replayed,true);
  const learning=selectCertifiedFallback('new-player',{difficulty:5,learnedMechanics:[]});assert.ok(learning.level.mechanics.filter(m=>m!=='walls').length<=1);
  assert.deepEqual(selectCertifiedFallback('repeat',{difficulty:4}),selectCertifiedFallback('repeat',{difficulty:4}));
});


test('Endless includes a compact supported-stop duet only after an exhaustive necessity proof',()=>{
  const options={difficulty:2,animals:2,profile:{primary:'box',pattern:'support-and-necessary-stop',minDepth:1,maxDepth:20,orientations:[0,0]},maxStates:30000,maxMs:12000};
  const first=generateLevel('supported-stop-duet',options),second=generateLevel('supported-stop-duet',options);
  assert.deepEqual(first.level,second.level);assert.equal(first.level.boards.length,2);assert.equal(first.level.solution.length,9);assert.equal(replay(first.level,first.solution).won,true);
  assert.equal(first.level.editorial.design.necessity.status,'unsolvable');assert.equal(first.level.editorial.design.necessity.predicate,'box-supported-stop');assert.ok(first.level.editorial.design.necessity.visited>1);assert.equal(first.level.editorial.humanPlaytested,false);
});


test('Endless can prepare a switch before committing to the one-way region',()=>{
  const {level,solution}=generateLevel('switch-before-commit',{difficulty:3,animals:2,profile:{primary:'oneway',preparationControl:'switch',introduction:true,minDepth:1,maxDepth:24},maxStates:35000,maxMs:12000});
  assert.equal(level.editorial.design.pattern,'oneway-prepare-before-commit');assert.equal(level.editorial.design.preparationControl,'switch');assert.ok(level.boards.some(b=>b.oneWays?.length&&b.switches?.length));assert.equal(replay(level,solution).won,true);assert.ok(level.mechanics.includes('switch'));
});
