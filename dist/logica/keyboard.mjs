/** Navega pela geometria, mesmo quando pistas ou espaços vazios não recebem foco. */
export function nextBoardCell(indices, current, key, columns) {
  if (!indices.length || !Number.isInteger(columns) || columns < 1) return current;
  if (key === 'Home') return indices[0];
  if (key === 'End') return indices.at(-1);

  const row = Math.floor(current / columns);
  const column = current % columns;
  const candidates = indices.filter(index => {
    const sameRow = Math.floor(index / columns) === row;
    const sameColumn = index % columns === column;
    if (key === 'ArrowLeft') return sameRow && index < current;
    if (key === 'ArrowRight') return sameRow && index > current;
    if (key === 'ArrowUp') return sameColumn && index < current;
    if (key === 'ArrowDown') return sameColumn && index > current;
    return false;
  });
  return candidates.reduce((nearest, index) =>
    nearest === current || Math.abs(index - current) < Math.abs(nearest - current) ? index : nearest,
  current);
}
