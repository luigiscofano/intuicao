import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeLibraryPreferences } from '../dist/library-preferences.mjs';

const read = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');
const html = read('index.html');
const catalog = html.match(/<nav class="games"[\s\S]*?<\/nav>/)?.[0];
const gameAttributes = /data-(?:game|collection|sintonia|repasse|orbita|broto|cerco|logic|versus)="([^"]+)"/g;
const gameIds = [...catalog.matchAll(gameAttributes)].map(match => match[1]);

test('catálogo mantém exatamente os 23 jogos ativos, sem Divisa e Órbita', () => {
  assert.equal(gameIds.length, 23);
  assert.equal(new Set(gameIds).size, 23);
  assert(!gameIds.includes('divisa'));
  assert(!gameIds.includes('orbita'));
  for (const id of ['pulso', 'refugio', 'renovo', 'mirante', 'foz', 'cerco', 'broto']) assert(gameIds.includes(id));
});

test('home não recebe bloco Continuar jogando nem miniaturas nos cards', () => {
  const home = html.slice(0, html.indexOf('<section id="selection"'));
  assert.doesNotMatch(home, /Continuar jogando|data-continue-game|id="continue-playing"/i);
  assert.doesNotMatch(catalog, /<img\b|<canvas\b|<svg\b|game-thumbnail|board-thumbnail/);
  for (const kind of ['all', 'favorites', 'recent']) assert.match(home, new RegExp(`data-library-filter="${kind}"`));
});

test('skin centralizada usa apenas botões reais sem copiar tabuleiros nem valores do estado', () => {
  const preferences = read('preferences-dialog.mjs');
  assert.match(preferences, /querySelectorAll\('button\[data-pulso-skin\], button\[data-refugio-skin\]'\)/);
  assert.match(preferences, /original\.click\(\)/);
  assert.doesNotMatch(preferences, /cloneNode|solutionState|applyAction|writeProgress|intuicao\.logica\.v1/);
});

test('preferências removem referências retiradas sem alterar o objeto recebido', () => {
  const input = { favorites: ['divisa', 'pulso'], recent: ['orbita', 'refugio', 'pulso'] };
  const before = structuredClone(input);
  assert.deepEqual(normalizeLibraryPreferences(input, gameIds), { favorites: ['pulso'], recent: ['refugio', 'pulso'] });
  assert.deepEqual(input, before);
});

test('configurações têm título acessível, fechamento e retorno de foco', () => {
  const preferences = read('preferences-dialog.mjs');
  assert.match(preferences, /aria-labelledby', 'preferences-title'/);
  assert.match(preferences, /aria-label="Fechar configurações"/);
  assert.match(preferences, /dialog\.showModal\(\)/);
  assert.match(preferences, /dialog\.addEventListener\('close',[\s\S]*trigger\.focus/);
  assert.match(preferences, /#progress-backup-panel|getElementById\('progress-backup-panel'\)/);
});
