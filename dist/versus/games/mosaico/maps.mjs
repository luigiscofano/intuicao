/** Aberturas legais pares, sem junções completas nem pontos iniciais. */
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
const definitions = [
  {
    "id": "classic",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 5,
    "cols": 5,
    "initialTiles": []
  },
  {
    "id": "painel-5x5-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 24,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-5x5-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 2,
        "orientation": 1
      },
      {
        "cell": 22,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-5x5-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 6,
        "orientation": 2
      },
      {
        "cell": 18,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-5x5-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 8,
        "orientation": 3
      },
      {
        "cell": 16,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-5x5-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 5,
        "orientation": 0
      },
      {
        "cell": 19,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-5x5-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 5,
    "cols": 5,
    "initialTiles": [
      {
        "cell": 6,
        "orientation": 1
      },
      {
        "cell": 18,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-4x4-0",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 4,
    "cols": 4,
    "initialTiles": []
  },
  {
    "id": "painel-4x4-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 15,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-4x4-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 2,
        "orientation": 1
      },
      {
        "cell": 13,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-4x4-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 5,
        "orientation": 2
      },
      {
        "cell": 10,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-4x4-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 6,
        "orientation": 3
      },
      {
        "cell": 9,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-4x4-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 4,
        "orientation": 0
      },
      {
        "cell": 11,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-4x4-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 5,
        "orientation": 1
      },
      {
        "cell": 10,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-4x6-0",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 4,
    "cols": 6,
    "initialTiles": []
  },
  {
    "id": "painel-4x6-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 23,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-4x6-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 3,
        "orientation": 1
      },
      {
        "cell": 20,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-4x6-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 7,
        "orientation": 2
      },
      {
        "cell": 16,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-4x6-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 10,
        "orientation": 3
      },
      {
        "cell": 13,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-4x6-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 6,
        "orientation": 0
      },
      {
        "cell": 17,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-4x6-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 4,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 8,
        "orientation": 1
      },
      {
        "cell": 15,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-6x4-0",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 6,
    "cols": 4,
    "initialTiles": []
  },
  {
    "id": "painel-6x4-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 23,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-6x4-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 2,
        "orientation": 1
      },
      {
        "cell": 21,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-6x4-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 5,
        "orientation": 2
      },
      {
        "cell": 18,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-6x4-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 6,
        "orientation": 3
      },
      {
        "cell": 17,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-6x4-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 8,
        "orientation": 0
      },
      {
        "cell": 15,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-6x4-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 4,
    "initialTiles": [
      {
        "cell": 9,
        "orientation": 1
      },
      {
        "cell": 14,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-6x6-0",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 6,
    "cols": 6,
    "initialTiles": []
  },
  {
    "id": "painel-6x6-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 35,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-6x6-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 3,
        "orientation": 1
      },
      {
        "cell": 32,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-6x6-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 7,
        "orientation": 2
      },
      {
        "cell": 28,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-6x6-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 10,
        "orientation": 3
      },
      {
        "cell": 25,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-6x6-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 12,
        "orientation": 0
      },
      {
        "cell": 23,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-6x6-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 6,
    "cols": 6,
    "initialTiles": [
      {
        "cell": 14,
        "orientation": 1
      },
      {
        "cell": 21,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-7x7-0",
    "version": 1,
    "name": "Painel livre",
    "description": "Painel vazio.",
    "rows": 7,
    "cols": 7,
    "initialTiles": []
  },
  {
    "id": "painel-7x7-1",
    "version": 1,
    "name": "Cantos",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 0,
        "orientation": 0
      },
      {
        "cell": 48,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-7x7-2",
    "version": 1,
    "name": "Margens",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 3,
        "orientation": 1
      },
      {
        "cell": 45,
        "orientation": 1
      }
    ]
  },
  {
    "id": "painel-7x7-3",
    "version": 1,
    "name": "Pilares",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 8,
        "orientation": 2
      },
      {
        "cell": 40,
        "orientation": 2
      }
    ]
  },
  {
    "id": "painel-7x7-4",
    "version": 1,
    "name": "Diagonais",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 12,
        "orientation": 3
      },
      {
        "cell": 36,
        "orientation": 3
      }
    ]
  },
  {
    "id": "painel-7x7-5",
    "version": 1,
    "name": "Travessia",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 14,
        "orientation": 0
      },
      {
        "cell": 34,
        "orientation": 0
      }
    ]
  },
  {
    "id": "painel-7x7-6",
    "version": 1,
    "name": "Núcleo",
    "description": "Abertura com dois azulejos comuns já colocados, sem selos. Verde começa; as regras não mudam.",
    "rows": 7,
    "cols": 7,
    "initialTiles": [
      {
        "cell": 16,
        "orientation": 1
      },
      {
        "cell": 32,
        "orientation": 1
      }
    ]
  }
];
export const MOSAICO_MAPS = freeze(definitions.map(map => ({ ...map, columns: map.cols, group: `${map.rows}x${map.cols}` })));
const byId = new Map(MOSAICO_MAPS.map(map => [map.id, map]));
export function getMosaicoMap(value = "classic") {
  const id = typeof value === "string" ? value : value?.mapId ?? "classic";
  const map = byId.get(id);
  if (!map || (value?.mapVersion !== undefined && value.mapVersion !== map.version)) throw new Error("Painel de MOSAICO desconhecido ou incompatível.");
  return map;
}
