import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPAIGN} from '../dist/orbita/campaign.mjs';
import {initialState,replay} from '../dist/orbita/engine.mjs';
import {renderOrbitaBoardMarkup,ringPath} from '../dist/orbita/ui.mjs';
import {orbitaSymbol} from '../dist/orbita/symbols.mjs';

test('render moderno conserva círculos, casas, símbolos, alvos e seleção nas 1000 fases',()=>{
 for(const level of CAMPAIGN){
  const before=JSON.stringify(level),state=initialState(level),stateBefore=JSON.stringify(state),command=level.commands[0];
  const svg=renderOrbitaBoardMarkup(level,state,command);
  assert.ok(svg.includes('data-o-selection="'+command.id+'"'));
  assert.equal((svg.match(/data-o-piece=/g)||[]).length,level.cells.length);
  assert.equal((svg.match(/data-o-target=/g)||[]).length,Object.keys(level.targets).length);
  assert.equal((svg.match(/class="o-shared-house"/g)||[]).length,level.cells.filter(cell=>level.rings.filter(r=>r.cells.includes(cell.id)).length>1).length);
  assert.equal((svg.match(/class="o-rail o-active-rail"/g)||[]).length,command.turns.length);
  for(const ring of level.rings)assert.ok(svg.includes('d="'+ringPath(level,ring)+'"'));
  for(const type of level.pieceTypes)if(Object.values(state.occupancy).includes(type.id))assert.ok(svg.includes('>'+orbitaSymbol(level,type.id)+'</text>'));
  assert.equal(JSON.stringify(level),before);assert.equal(JSON.stringify(state),stateBefore);
 }
});
test('troca visual do anel e acerto usam letras, contorno e check, sem depender só da cor',()=>{
 const level=CAMPAIGN[999];
 for(const command of level.commands){
  const svg=renderOrbitaBoardMarkup(level,initialState(level),command);
  for(const turn of command.turns)assert.ok(svg.includes('class="o-rail o-active-rail" data-o-ring="'+turn.ring+'"'));
 }
 const solved=replay(level,level.solution);
 const svg=renderOrbitaBoardMarkup(level,solved.state,level.commands[0]);
 assert.equal((svg.match(/, completo/g)||[]).length,Object.keys(level.targets).length);
 assert.equal((svg.match(/ ✓<\/text>/g)||[]).length,Object.keys(level.targets).length);
});
test('superfície opaca e estilos locais eliminam flora, sombras e tracejado sobre o tabuleiro',()=>{
 const css=fs.readFileSync(new URL('../dist/orbita/ui.css',import.meta.url),'utf8');
 assert.match(css,/#orbita \.o-board-surface\{[^}]*z-index:4[^}]*background:#fff/);
 assert.match(css,/#orbita \.o-surface\{[^}]*z-index:4[^}]*background:#fff/);
 assert.doesNotMatch(css,/drop-shadow|stroke-dasharray/);
 assert.match(css,/#orbita \.o-turn:focus-visible/);
 assert.match(css,/#orbita \.o-neutral circle\{fill:#edf2ef/);
});
