import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {ELO_CAMPAIGN} from '../dist/elo-campaign.mjs';
const base='acc557c9f431cdf71af1f183d94720f97e019b08',before=execFileSync('git',['show',base+':dist/collection-ui.mjs'],{encoding:'utf8'});
assert.equal(fs.readFileSync('dist/collection-ui.mjs','utf8'),before.replace("<small>${esc(l.difficulty??'desafio')}</small>",''));
for(const p of execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n'))if(p!=='dist/collection-ui.mjs')assert.deepEqual(fs.readFileSync(p),execFileSync('git',['show',base+':'+p],{maxBuffer:30e6}),p);
store.set('intuicao.collection.v1',JSON.stringify({version:1,completed:[ELO_CAMPAIGN[0].id,ELO_CAMPAIGN[1].id],sessions:{},events:[]}));store.set('intuicao.answers.v1',JSON.stringify({['elo:'+ELO_CAMPAIGN[1].id]:{assisted:true,failures:3}}));
const app=initCollection({hideOriginal(){}});app.activate('elo');
const tiles=host.querySelectorAll('[data-new-level]');assert.equal(tiles.length,80);assert.ok(tiles.every(t=>t.querySelectorAll('small').length===1));assert.match(tiles[0].innerHTML||host.innerHTML,/✓ concluído/);assert.match(host.innerHTML,/✓ assistido/);assert.match(tiles[0].attrs['aria-label'],/Básico/);assert.equal(host.querySelectorAll('.elo-stage').length,6);
for(let i=0;i<80;i++){host.querySelector(`[data-new-level="${i}"]`).click();assert.match(host.innerHTML,new RegExp('DESAFIO '+(i+1)+' / 80'));$('c-back').click();}
for(const game of ['prumo','pacto']){app.activate(game);assert.ok(host.querySelectorAll('[data-new-level]').every(t=>t.querySelectorAll('small').length===1));}
console.log('PASS exact one text removal; all other dist bytes,80 numbers/navigation,completion+assisted indicators,6 difficulty headings,accessible difficulty labels,other games preserved');
