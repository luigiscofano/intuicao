// The production module uses the browser Worker API; this tiny test bridge
// gives the same message surface to a real isolated Node worker thread.
import {parentPort} from 'node:worker_threads';
globalThis.self = {postMessage:value => parentPort.postMessage(value)};
await import('../dist/orbita/worker.mjs');
parentPort.on('message',data => self.onmessage({data}));
