// Verificação de fases importadas da coleção em uma tarefa separada da interface.
import { verifyCollectionLevel } from './collection-json.mjs';
self.onmessage = (event) => {
  try {
    self.postMessage({
      ok: true,
      result: verifyCollectionLevel(event.data.level, { worker: true }),
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error instanceof Error ? error.message : 'Não foi possível verificar a fase.',
    });
  }
};
