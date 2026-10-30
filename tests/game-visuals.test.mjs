import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('dist/game-visuals.css','utf8'),ui=readFileSync('dist/collection-ui.mjs','utf8');
assert(readFileSync('dist/index.html','utf8').includes('href="game-visuals.css"'));
for(const selector of ['.board-elo','.board-prumo','.board-desvio','#sintonia','#repasse','#orbita'])assert(css.includes(selector));
assert(!css.includes('.board-pacto'));assert(!css.includes('#scene'));
assert(!css.includes('.s-animal-sprite'));
assert(!ui.includes("'<span class=\"duel-arrow consumed-arrow\">${"));
console.log('PASS six-game isolated visual styles, reference and sprite exclusion, consumed arrow template');
