# SINTONIA implementation contract

This is an addition to the existing buildless ES-module Intuição Site. Do not edit existing games. All new implementation files live in dist/sintonia/. Root owns integration edits in existing files. Every board has exactly one animal. All coordinates in data are zero-based flat cell indices (row * cols + col).

## Public level format

- id: stable string; version: 1; rulesVersion: 1; number: campaign index when applicable.
- name, chapter (1–20), difficulty (0–5), family, secondaryFamilies, lesson, hints (three Portuguese hints), mechanics (string array), seed (optional).
- boards: array of Board in stable order.
- Board: {id, animal, rows, cols, walkable: number[], start: number, goal: number, boxes?: {id,cell}[], plates?: {id,cell}[], switches?: {id,cell,group}[], keys?: {id,cell}[], ice?: number[], fragile?: number[], portals?: {id,a,b}[], selectors?: {id,cell,group}[], gates?: {id,from,to,condition}[], oneWays?: {from,to}[]}.
- Conditions: {type:'plate',id}; {type:'all',ids:string[]} for plates; {type:'switch',id,value:boolean}; {type:'key',id}; {type:'selected',plate,selector,value:0|1}.
- Gate endpoints are adjacent walkable cells, closed blocks both directions. oneWays permit the from->to edge and block its reverse. All other adjacent walkable edges are open.
- initialSwitches: object group->boolean (default false); initialSelectors: group->0|1 (default 0).
- channels?: {id,fromBoard:number,entry:number,toBoard:number,exit:number}[].
- solution?: direction string[]; certificate?: metadata; editorial?: metadata. These do not alter rules.
- Animal identifiers: capivara, tuiuiu, bemtevi, mico. Assets provisioned by root separately.

## Engine exports (dist/sintonia/engine.mjs)

- RULES_VERSION = 1; DIRECTIONS = ['up','right','down','left'].
- initialState(level).
- transition(level,state,direction) -> {state,changed,won,events:[]}. Pure, never mutate caller state/level.
- isWon(level,state).
- stateKey(state) stable key of all logical fields.
- validateLevel(level) -> {valid:boolean,errors:string[]}.
- replay(level,commands,{state}={}) -> {state,won,valid,states?,error?}. Empty commands permitted.
- solveLevel(level,{state,maxStates,maxMs,maxDepth}={}) -> {status:'solved'|'unsolvable'|'inconclusive',solution?:string[],visited,optimal?:boolean}.
- gateIsOpen(level,state,gate) for rendering.
- canCross(level,state,boardIndex,from,to) for drawing/diagnostics optional.

State shape: {positions:number[], boxes:{id,board:number,cell:number}[], switches:object, keys:string[], selectors:object, collapsed:string[]}. A collapsed cell key is boardIndex + ':' + cell. Arrays and object keys need canonical ordering in stateKey, independent of incidental iteration order. No UI fields in state.

Transitions snapshot gate/selector state at beginning. Compute each animal's move and local push; slide on ice until ordinary terrain or block. Entering a portal teleports once within that board and ends movement. Pressure is based on final occupancy. Switch/selector toggles on entry ending on the cell; no trigger on blocked no-op. Collect keys on final position. Fragile cells collapse on departure. Commit deliveries atomically: destination must be initially free and not occupied by any competing movement; conflicts cancel sender and box push, never others by processing order. Channels cannot cycle automatically. Every animal on its goal still obeys input.

Support valid combinations explicitly. Boxes may occupy ordinary terrain/plates/key/switch cells (only animals activate keys/switches), but levels with box-accessible ice/portal/fragile must be rejected for this release. Achieve combinations across different boards. Keep special tiles unambiguous. Initial occupied plates count; starting on toggle/key/selector is not allowed.

## Catalog and generation exports

dist/sintonia/campaign.mjs exports CAMPAIGN (500 fully materialized level objects), CHAPTERS (20 title strings), DIFFICULTIES (six Portuguese labels).
Generated catalog may import JSON via fetch only if coordinated with root/UI; prefer a static .mjs export to support Node tests and browser without tooling.
dist/sintonia/generator.mjs exports generateLevel(seed,{difficulty=0,animals,learnedMechanics,recentSignatures,recentFamilies,maxStates,maxMs}={}) -> {level,solution,signature,validation}. Only return replay-certified levels; throw controlled error on budget failure. The UI persists the last 24 signatures and reasoning families; family recency is a soft deterministic preference, never a reason to deliver an uncertified candidate.
Use a seeded PRNG. Real varied topology, mechanisms and roles, not only rotations or campaign cycling.

dist/sintonia/worker.mjs (owned by root) imports engine and generator; handles generation/hints asynchronously. UI talks through a client wrapper owned by root:
dist/sintonia/service.mjs exports createSintoniaService() -> {generate(seed,options):Promise<result>,hint(level,state):Promise<solveResult>,cancel(),destroy()}.

## UI export

dist/sintonia/ui.mjs exports initSintonia({hideOtherGames}) -> {open(),hide(),isOpen()}. It creates/uses section#sintonia under main. Root adds nav button [data-sintonia] and calls open(); existing game activations call hide().
UI owns its DOM, scoped CSS, campaign/endless state persistence, history, keyboard, touch, rules, import/export consistent with existing platform, completion/hints.
No editing app.mjs/index.html/shared CSS by UI agent. Root handles minimal integration.
Use new localStorage namespace 'intuicao.sintonia.v1'; no writes to other games' state. Reuse createRestartConfirmation and createResultMotion modules, existing shared classes.

## Campaign allocation

1–25: 25 duets.
26–100: 75 duets.
101–225: 85 duets + 40 trios (no trio before 151).
226–350: 45 duets + 80 trios.
351–450: 20 duets + 50 trios + 30 quartets (no quartet before 376).
451–500: 10 duets + 20 trios + 20 quartets.
Totals: 260 duets,190 trios,50 quartets.

Mechanic introduction chapters: 1 movement,2 shelter,3 goal exit/intermediate stops,4 remote plates,5 toggles,6 keys,7 trios,8 boxes,9 ice,10 portals,11 one-way,12 alternate gates,13 fragile,14 role handoff,15 AND plates,16 quartets,17 selectors,18 delivery,19–20 combinations.
Every chapter 25 varied levels, simple revisits survive through Master. Keep metadata honest; certify actual solution on actual engine and never call a nonoptimal witness 'minimum'.

## Reference fixture

Both boards 2x3. A walkable [0,1,4], start0,goal1. B walkable[0,1,2,4],start0,goal4. Solution right,right,left,down,right. right,down must not win. Saturating every direction before changing direction cannot solve.

## Ownership

Engine agent owns engine.mjs and engine tests.
Generation agent owns campaign.mjs, generator.mjs, catalogs, generation scripts/audits/tests.
UI agent owns ui.mjs, ui.css, UI tests/inventory.
Root owns service.mjs, worker.mjs, assets, integration, browser QA, publication. Ask root before changing this contract.
