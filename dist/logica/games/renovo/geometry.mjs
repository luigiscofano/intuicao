// Shared by the renderer and pointer controller; coordinates match approved C1.
export function boardGeometry(level) {
  const size = 68, gap = 8, step = 76, x0 = 62, y0 = 54;
  const bw = level.width * step - gap, bh = level.height * step - gap;
  return { size, gap, step, x0, y0, bw, bh, width: bw + 128, height: bh + 160 };
}
export function cellCenter(level, index) {
  const {x0, y0, step, size} = boardGeometry(level);
  return [x0 + index % level.width * step + size / 2, y0 + Math.floor(index / level.width) * step + size / 2];
}
