// Mapas versionados de CERCO, com dimensões, paredes e posições iniciais.
/** Mapas imutáveis e versionados. Paredes não pertencem a nenhuma equipe. */
const freeze = (x) => {
  if (x && typeof x === 'object') {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const starts = [
  [0, 2, 4],
  [20, 22, 24],
];
const definitions = [
  {
    id: 'classic',
    name: 'Clássico',
    description: 'O tabuleiro original, livre de paredes iniciais.',
    walls: [],
    outside: [],
  },
  {
    id: 'lago',
    name: 'Lago central',
    description: 'Uma parede central cria dois caminhos ao redor.',
    walls: [12],
    outside: [],
  },
  {
    id: 'pilares',
    name: 'Quatro pilares',
    description: 'Quatro obstáculos deixam uma passagem em cruz.',
    walls: [6, 8, 16, 18],
    outside: [],
  },
  {
    id: 'portais',
    name: 'Portais',
    description: 'As laterais fechadas concentram a travessia no centro.',
    walls: [10, 14],
    outside: [],
  },
  {
    id: 'ampulheta',
    name: 'Ampulheta',
    description: 'As bordas recuam em duas fileiras, estreitando as passagens.',
    walls: [],
    outside: [5, 9, 15, 19],
  },
  {
    id: 'cantos',
    name: 'Cantos recortados',
    description: 'Um tabuleiro sem cantos, com as equipes lado a lado.',
    walls: [],
    outside: [0, 4, 20, 24],
    starts: [
      [1, 2, 3],
      [21, 22, 23],
    ],
  },
  {
    id: 'canais',
    name: 'Canais',
    description: 'Pilares e um núcleo central separam pequenos corredores.',
    walls: [6, 8, 12, 16, 18],
    outside: [],
  },
];
// Cada tamanho tem corredores/obstáculos próprios; os sete mapas originais não mudam.
const largerPatterns = {
  6: {
    lago: {
      walls: [
        [2, 2],
        [2, 3],
        [3, 2],
        [3, 3],
      ],
    },
    pilares: {
      walls: [
        [1, 1],
        [1, 4],
        [4, 1],
        [4, 4],
      ],
    },
    portais: {
      walls: [
        [2, 0],
        [2, 5],
        [3, 0],
        [3, 5],
      ],
    },
    ampulheta: {
      outside: [
        [1, 0],
        [1, 5],
        [2, 0],
        [2, 1],
        [2, 4],
        [2, 5],
        [3, 0],
        [3, 1],
        [3, 4],
        [3, 5],
        [4, 0],
        [4, 5],
      ],
    },
    cantos: {
      outside: [
        [0, 0],
        [0, 5],
        [1, 0],
        [1, 5],
        [4, 0],
        [4, 5],
        [5, 0],
        [5, 5],
      ],
      startColumns: [1, 2, 4],
    },
    canais: {
      walls: [
        [1, 2],
        [2, 2],
        [3, 3],
        [4, 3],
        [1, 4],
        [4, 1],
      ],
    },
  },
  7: {
    lago: {
      walls: [
        [2, 3],
        [3, 2],
        [3, 3],
        [3, 4],
        [4, 3],
      ],
    },
    pilares: {
      walls: [
        [1, 1],
        [2, 1],
        [1, 5],
        [2, 5],
        [4, 1],
        [5, 1],
        [4, 5],
        [5, 5],
      ],
    },
    portais: {
      walls: [
        [2, 0],
        [2, 6],
        [3, 0],
        [3, 1],
        [3, 5],
        [3, 6],
        [4, 0],
        [4, 6],
      ],
    },
    ampulheta: {
      outside: [
        [1, 0],
        [1, 6],
        [2, 0],
        [2, 1],
        [2, 5],
        [2, 6],
        [3, 0],
        [3, 1],
        [3, 5],
        [3, 6],
        [4, 0],
        [4, 1],
        [4, 5],
        [4, 6],
        [5, 0],
        [5, 6],
      ],
    },
    cantos: {
      outside: [
        [0, 0],
        [0, 1],
        [1, 0],
        [0, 5],
        [0, 6],
        [1, 6],
        [5, 0],
        [6, 0],
        [6, 1],
        [5, 6],
        [6, 5],
        [6, 6],
      ],
      startColumns: [2, 3, 4],
    },
    canais: {
      walls: [
        [1, 2],
        [2, 2],
        [3, 2],
        [3, 4],
        [4, 4],
        [5, 4],
        [1, 5],
        [5, 1],
      ],
    },
  },
  8: {
    lago: {
      walls: [
        [2, 3],
        [2, 4],
        [3, 3],
        [3, 4],
        [4, 3],
        [4, 4],
        [5, 3],
        [5, 4],
      ],
    },
    pilares: {
      walls: [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
        [1, 5],
        [1, 6],
        [2, 5],
        [2, 6],
        [5, 1],
        [5, 2],
        [6, 1],
        [6, 2],
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
      ],
    },
    portais: {
      walls: [
        [2, 0],
        [2, 7],
        [3, 0],
        [3, 1],
        [3, 6],
        [3, 7],
        [4, 0],
        [4, 1],
        [4, 6],
        [4, 7],
        [5, 0],
        [5, 7],
      ],
    },
    ampulheta: {
      outside: [
        [1, 0],
        [1, 7],
        [2, 0],
        [2, 1],
        [2, 6],
        [2, 7],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 5],
        [3, 6],
        [3, 7],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 5],
        [4, 6],
        [4, 7],
        [5, 0],
        [5, 1],
        [5, 6],
        [5, 7],
        [6, 0],
        [6, 7],
      ],
    },
    cantos: {
      outside: [
        [0, 0],
        [0, 1],
        [1, 0],
        [0, 6],
        [0, 7],
        [1, 7],
        [6, 0],
        [7, 0],
        [7, 1],
        [6, 7],
        [7, 6],
        [7, 7],
      ],
      startColumns: [2, 3, 5],
    },
    canais: {
      walls: [
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 5],
        [5, 5],
        [6, 5],
        [1, 5],
        [2, 5],
        [5, 2],
        [6, 2],
      ],
    },
  },
};
const descriptions = {
  classic: 'Mais espaço livre para construir caminhos e cercos.',
  lago: 'Um núcleo de paredes divide a passagem em rotas laterais.',
  pilares: 'Quatro pilares redesenhados criam passagens entre o centro e as bordas.',
  portais: 'Paredes laterais formam portais largos em direção ao centro.',
  ampulheta: 'O contorno recua em degraus até uma passagem central estreita.',
  cantos: 'Cantos recortados deslocam as equipes para a faixa central.',
  canais: 'Paredes desencontradas formam corredores e conexões transversais.',
};
export const CERCO_GRID_SIZES = freeze([5, 6, 7, 8]);
const largerMaps = CERCO_GRID_SIZES.slice(1).flatMap((size) =>
  definitions.map((base) => {
    const pattern = largerPatterns[size][base.id] || {},
      index = ([r, c]) => r * size + c;
    const walls = (pattern.walls || []).map(index),
      outside = (pattern.outside || []).map(index);
    const top = pattern.startColumns || [0, Math.floor((size - 1) / 2), size - 1],
      bottom = top.map((c) => size * size - 1 - c).sort((a, b) => a - b);
    return {
      id: `${base.id}-${size}`,
      family: base.id,
      name: base.name,
      description: descriptions[base.id],
      rows: size,
      cols: size,
      version: 1,
      walls,
      outside,
      starts: [top, bottom],
      maxMoves: size * size - walls.length - outside.length - 6,
    };
  }),
);
export const CERCO_MAPS = freeze([
  ...definitions.map((m) => ({
    ...m,
    rows: 5,
    cols: 5,
    version: 1,
    starts: m.starts || starts,
    maxMoves: 25 - m.walls.length - m.outside.length - 6,
  })),
  ...largerMaps,
]);
export function getCercoMapsForSize(size = 5) {
  return CERCO_MAPS.filter((m) => m.rows === size && m.cols === size);
}
export function getCercoMapVariant(idOrState = 'classic', size = 5) {
  const current = getCercoMap(idOrState);
  if (!current || !CERCO_GRID_SIZES.includes(size)) return null;
  const family = current.family || current.id;
  return getCercoMap(size === 5 ? family : `${family}-${size}`);
}
export function getCercoMap(idOrState = 'classic') {
  const id =
    typeof idOrState === 'string'
      ? idOrState
      : idOrState && typeof idOrState === 'object' && !Array.isArray(idOrState)
        ? Object.hasOwn(idOrState, 'mapId')
          ? idOrState.mapId
          : 'classic'
        : null;
  return CERCO_MAPS.find((m) => m.id === id) || null;
}
