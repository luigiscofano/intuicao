import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const distances = [left, above, upperLeft].map(value => Math.abs(estimate - value));
  const nearest = Math.min(...distances);
  return [left, above, upperLeft][distances.indexOf(nearest)];
}

// Leitor de teste limitado ao formato gerado: PNG RGBA, 8 bits, sem entrelaçamento.
// Usa apenas Node para que a validação no CI não dependa de ImageMagick.
export function decodeRgbaPng(buffer) {
  assert.deepEqual([...buffer.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(buffer.toString('ascii', 12, 16), 'IHDR');
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  assert.deepEqual([...buffer.subarray(24, 29)], [8, 6, 0, 0, 0]);
  assert.ok(width > 0 && width <= 256 && height > 0 && height <= 256);

  const chunks = [];
  for (let offset = 8; offset < buffer.length;) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    assert.ok(offset + length + 12 <= buffer.length, 'bloco PNG completo');
    if (type === 'IDAT') chunks.push(buffer.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
  }

  const stride = width * 4;
  const filtered = inflateSync(Buffer.concat(chunks));
  assert.equal(filtered.length, (stride + 1) * height);
  const pixels = Buffer.alloc(stride * height);
  let cursor = 0;

  for (let row = 0; row < height; row++) {
    const filter = filtered[cursor++];
    assert.ok(filter >= 0 && filter <= 4, 'filtro PNG reconhecido');
    for (let column = 0; column < stride; column++) {
      const index = row * stride + column;
      const left = column >= 4 ? pixels[index - 4] : 0;
      const above = row > 0 ? pixels[index - stride] : 0;
      const upperLeft = row > 0 && column >= 4 ? pixels[index - stride - 4] : 0;
      const predictions = [0, left, above, Math.floor((left + above) / 2),
        paeth(left, above, upperLeft)];
      pixels[index] = (filtered[cursor++] + predictions[filter]) & 255;
    }
  }
  return { width, height, pixels };
}
