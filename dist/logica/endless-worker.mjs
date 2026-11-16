import { generateLogicChallenge } from './endless-generator.mjs';
self.onmessage = async event => {
  const { id, request } = event.data;
  try { self.postMessage({ id, result: await generateLogicChallenge(request) }); }
  catch (error) { self.postMessage({ id, error: error.message || 'Não foi possível gerar o desafio.' }); }
};
