import test from 'node:test';
import assert from 'node:assert/strict';
import { LOGIC_GAME_INFO } from '../dist/logica/info.mjs';

test('Renovo conecta lógica e biologia sem apresentar as ligações como simulação', () => {
  const purpose = LOGIC_GAME_INFO.renovo.purpose;
  for (const topic of ['associação de parceiros', 'germinação', 'fotossíntese', 'botões florais', 'reprodução', 'metáfora visual']) {
    assert.ok(purpose.includes(topic), `Tema ausente: ${topic}`);
  }
  assert.match(purpose, /não representam a ordem de crescimento/);
  assert.match(purpose, /nem o transporte de água ou nutrientes/);
});
