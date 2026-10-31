import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('ELO mark toggle is inside board surface before board, retains handler and aria',()=>{
 const s=fs.readFileSync('dist/collection-ui.mjs','utf8'),css=fs.readFileSync('dist/compact-play.css','utf8');
 const surface=s.indexOf('<div id="c-board-surface"'),toggle=s.indexOf('<button id="c-mark-blocked"'),board=s.indexOf('<div id="c-board"');
 assert.ok(surface<toggle&&toggle<board);assert.equal((s.match(/id="c-mark-blocked"/g)||[]).length,1);
 assert.ok(s.includes('markBlocked=!markBlocked;data.markBlockedCells=markBlocked;persist();'));
 assert.match(css,/elo-board-surface>\.board-options\{display:flex;justify-content:flex-start;margin:0 0 12px;padding:0\}/);
 assert.match(css,/board-options\{margin-bottom:32px\}/);
});
