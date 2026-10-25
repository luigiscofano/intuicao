import {parentPort} from 'node:worker_threads';
globalThis.self={postMessage:data=>parentPort.postMessage(data)};
await import('../dist/geometry-check-worker.mjs');
parentPort.on('message',data=>self.onmessage({data}));
