/** Mapas fixos: a rotação de 180° troca as equipes e inverte as setas. */
const CLASSIC_DIRECTIONS = [1, 2, 3, 2, 0, 1, 2, 3, 1, 0, 3, 2, 0, 1, 0, 3];

function defineMap({ id, name, description, rows, columns, blocked = [], pattern = 0, directions }) {
  const unavailable = new Set(blocked);
  const size = rows * columns;
  const arrows = directions ? [...directions] : Array(size).fill(0);
  if (!directions) {
    // Padrões deliberados e reproduzíveis; nunca sorteamos durante a partida.
    const motifs = [
      [1, 2, 0, 1, 2, 3, 1, 0],
      [2, 1, 3, 2, 0, 1, 0, 3],
      [1, 1, 2, 0, 3, 2, 1, 0],
    ];
    for (let cell = 0; cell < size / 2; cell += 1) {
      arrows[cell] = motifs[pattern % motifs.length][cell % 8];
      arrows[size - 1 - cell] = (arrows[cell] + 2) % 4;
    }
  }
  const board = arrows.map((direction, cell) => unavailable.has(cell) ? null : Object.freeze({
    owner: cell % columns < columns / 2 ? 0 : 1,
    direction,
  }));
  return Object.freeze({
    id, name, description, rows, columns,
    blocked: Object.freeze([...blocked]),
    board: Object.freeze(board),
    targets: Object.freeze([0, 1].map((owner) => board.filter((pod) => pod?.owner === owner).length)),
  });
}

export const DEFAULT_MAP_ID = "classico";
const ORIGINAL_MAPS = [
  defineMap({ id: "classico", name: "Canteiro clássico", description: "O arranjo original: 4 × 4, com oito vagens por equipe.", rows: 4, columns: 4, directions: CLASSIC_DIRECTIONS }),
  defineMap({ id: "entrelacado", name: "Canteiro entrelaçado", description: "4 × 4 com outras direções: novas cadeias no mesmo tamanho.", rows: 4, columns: 4, pattern: 1 }),
  defineMap({ id: "vereda", name: "Vereda", description: "3 × 6: um canteiro baixo e largo, com nove vagens por equipe.", rows: 3, columns: 6, pattern: 0 }),
  defineMap({ id: "horta", name: "Horta comprida", description: "4 × 6: mais espaço para preparar sequências, com doze vagens por equipe.", rows: 4, columns: 6, pattern: 2 }),
  defineMap({ id: "bosque", name: "Bosque", description: "6 × 6 completo, com dezoito vagens por equipe.", rows: 6, columns: 6, pattern: 1 }),
  defineMap({ id: "clareira", name: "Clareira", description: "6 × 6 sem os quatro cantos: dezesseis vagens por equipe.", rows: 6, columns: 6, blocked: [0, 5, 30, 35], pattern: 0 }),
  defineMap({ id: "ilha", name: "Ilha", description: "6 × 6 ao redor de um vazio central. O pulso não atravessa o vazio.", rows: 6, columns: 6, blocked: [14, 15, 20, 21], pattern: 2 }),
];

/** Seis tamanhos e oito composições por tamanho; IDs antigos são permanentes. */
export const ESTALO_GRID_SIZES = Object.freeze([
  [4, 4], [3, 6], [4, 6], [6, 6], [6, 8], [8, 8],
].map(size => Object.freeze(size)));

const FAMILIES = ["canteiro", "entrelacado", "clareira", "ilha", "margens", "passagem", "trilha", "varandas"];
const NAMES = { canteiro: "Canteiro", entrelacado: "Entrelaçado", clareira: "Clareira", ilha: "Ilha", margens: "Margens", passagem: "Passagem", trilha: "Trilha", varandas: "Varandas" };
const LEGACY_FAMILIES = { classico: "canteiro", entrelacado: "entrelacado", vereda: "canteiro", horta: "canteiro", bosque: "canteiro", clareira: "clareira", ilha: "ilha" };

function cutouts(family, rows, columns) {
  const cells = new Set();
  const add = (row, column) => {
    const cell = row * columns + column;
    cells.add(cell);
    cells.add(rows * columns - 1 - cell);
  };
  // Reentrâncias nas bordas introduzem uma interrupção real também nos tabuleiros pequenos.
  if (family === "varandas") {
    add(0, Math.floor(columns / 3));
    return [...cells].sort((a, b) => a - b);
  }
  // Nos pequenos, as variantes anteriores conservam seu espaço de decisão.
  if (rows < 4 || columns < 6) return [];
  if (family === "clareira") { add(0, 0); add(0, columns - 1); }
  if (family === "ilha") {
    add(Math.floor(rows / 2) - 1, columns / 2 - 1);
    add(Math.floor(rows / 2) - 1, columns / 2);
  }
  if (family === "margens") add(1, 0);
  if (family === "passagem") { add(0, columns / 2 - 1); add(0, columns / 2); }
  if (family === "trilha") { add(1, 1); }
  return [...cells].sort((a, b) => a - b);
}

function variantDirections(rows, columns, familyIndex) {
  const arrows = Array(rows * columns).fill(0);
  for (let cell = 0; cell < arrows.length / 2; cell += 1) {
    const row = Math.floor(cell / columns), column = cell % columns;
    // Ritmos distintos por família: faixas, diagonais e alternâncias curtas.
    const direction = (cell * (familyIndex % 2 ? 3 : 1) + row * (familyIndex + 1) +
      Math.floor(column / (familyIndex % 3 + 1)) + familyIndex) % 4;
    arrows[cell] = direction;
    arrows[arrows.length - 1 - cell] = (direction + 2) % 4;
  }
  return arrows;
}

export const ESTALO_MAPS = Object.freeze(ESTALO_GRID_SIZES.flatMap(([rows, columns]) =>
  FAMILIES.map((family, index) => {
    const original = ORIGINAL_MAPS.find(map => map.rows === rows && map.columns === columns && LEGACY_FAMILIES[map.id] === family);
    if (original) return original;
    const blocked = cutouts(family, rows, columns);
    return defineMap({
      id: `${family}-${rows}x${columns}`, name: NAMES[family], rows, columns, blocked,
      description: blocked.length ? `${rows} × ${columns} com ${blocked.length} recortes simétricos; o pulso para nos espaços vazios.` : `${rows} × ${columns} completo, com um arranjo próprio de setas.`,
      directions: variantDirections(rows, columns, index),
    });
  })
));

export function getEstaloMap(mapId = DEFAULT_MAP_ID) {
  const map = ESTALO_MAPS.find(({ id }) => id === mapId);
  if (!map) throw new Error("Mapa de Estalo desconhecido.");
  return map;
}
