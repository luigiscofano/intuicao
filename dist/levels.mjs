import {shapePolygon} from './curves.mjs';
// Referência IA: 300 desafios. Equilíbrio 1 a 100.
export const balanceLevels = [
  {
    "name": "Tutorial: um bloco de cada lado",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 1,
        "x": 3
      },
      {
        "block": 1,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1
    ],
    "movableCount": 1
  },
  {
    "name": "1 móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -3,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 3,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": -4
      },
      {
        "block": 1,
        "x": 2
      }
    ],
    "solution": [
      -3,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -4
      },
      {
        "block": 1,
        "x": 3
      }
    ],
    "solution": [
      -4,
      3
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 0
      },
      {
        "block": 1,
        "x": 4
      }
    ],
    "solution": [
      -1,
      4
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -2
      },
      {
        "block": 1,
        "x": 1
      }
    ],
    "solution": [
      -2,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 2
      },
      {
        "block": 0,
        "x": -3
      }
    ],
    "solution": [
      -3,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "1 móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -4,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": -2
      },
      {
        "block": 1,
        "x": 3
      }
    ],
    "solution": [
      -4,
      3
    ],
    "movableCount": 1
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 0,
        "x": 1
      },
      {
        "block": 0,
        "x": -1
      }
    ],
    "solution": [
      -1,
      4
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 0,
        "x": -2
      }
    ],
    "solution": [
      -2,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 3,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -3
      },
      {
        "block": 1,
        "x": 2
      }
    ],
    "solution": [
      -3,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -2
      },
      {
        "block": 0,
        "x": -4
      },
      {
        "block": 1,
        "x": 3
      }
    ],
    "solution": [
      -4,
      3
    ],
    "movableCount": 2
  },
  {
    "name": "1 móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 6
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 3,
        "x": -1
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 2,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": -4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": 1
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": 3
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · braços e massas",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "1 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 1
      },
      {
        "block": 3,
        "x": 4
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 6
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 3,
        "x": -4
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 3
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": 4
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "1 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 3,
        "x": -3
      },
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -4
      },
      {
        "block": 2,
        "x": 0
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 0,
        "x": 3
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 1,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 7
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 0
      },
      {
        "block": 1,
        "x": -2
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "1 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 7
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": 0
      },
      {
        "block": 2,
        "x": -3
      },
      {
        "block": 2,
        "x": 3
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -3
      },
      {
        "block": 2,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 8
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 3,
        "x": -3
      },
      {
        "block": 3,
        "x": 4
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 8
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "1 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -3,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -1
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": 3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 7
      },
      {
        "mass": 5,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 5,
        "x": 3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 6,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      },
      {
        "mass": 1,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 8
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 5,
        "x": 3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 8
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 0,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": 3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 8
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -1
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 4,
        "x": -3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 10
      },
      {
        "mass": 5,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 4,
        "x": -4
      },
      {
        "block": 4,
        "x": -3
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 10
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 2,
        "x": 1
      },
      {
        "block": 2,
        "x": -3
      },
      {
        "block": 2,
        "x": 1
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · topos triangulares",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 8
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 1,
        "x": 0
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 1,
        "x": 2
      },
      {
        "block": 1,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -3,
      3
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 11
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 9
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 11
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 4,
        "x": -4
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 9
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": 1
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 4,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 8
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 10
      },
      {
        "mass": 5,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 11
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": 1
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 3,
        "x": 4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 5,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 8
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 4,
        "x": 0
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 8
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": -2
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 11
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 3,
        "x": -4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 7
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 11
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 10
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 9
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": 2
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 10
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 12
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": 2
      },
      {
        "block": 2,
        "x": 4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 2,
        "x": -4
      },
      {
        "block": 2,
        "x": 0
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 12
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 11
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": 3
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 12
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 3,
        "x": 0
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 4,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 3,
        "x": -1
      },
      {
        "block": 2,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 7
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 0,
        "x": -4
      },
      {
        "block": 2,
        "x": -3
      },
      {
        "block": 0,
        "x": 2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 2,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": 3
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 5,
        "x": -1
      },
      {
        "block": 4,
        "x": 0
      },
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 4,
        "x": 1
      },
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 3,
        "x": -3
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 3,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 9
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 7
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": -3
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 3,
        "x": 1
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": -4
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 12
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 8
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 13
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 7
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      }
    ],
    "solutionMoves": [
      {
        "block": 3,
        "x": -3
      },
      {
        "block": 0,
        "x": 1
      },
      {
        "block": 3,
        "x": 4
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 4,
        "x": 3
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1
    ],
    "movableCount": 6
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      },
      {
        "mass": 1,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 1,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 15
      },
      {
        "mass": 1,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 14
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 13
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -1
      },
      {
        "block": 6,
        "x": 4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 12
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 14
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 10
      },
      {
        "mass": 3,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 13
      },
      {
        "mass": 3,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 1,
        "x": 4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 1,
        "x": 1
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": -4
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 5,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 13
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 14
      },
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 14
      },
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 15
      },
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 11
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 13
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · pilhas e suportes",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 11
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 12
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 8
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 7
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 4,
        "x": 3
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 5,
        "x": -1
      },
      {
        "block": 2,
        "x": 4
      },
      {
        "block": 2,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 4,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 16
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 14
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 6,
        "x": -1
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 15
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 13
      },
      {
        "mass": 5,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 5,
        "x": 4
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 5,
        "x": -1
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 16
      },
      {
        "mass": 5,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 9
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 15
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 10
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": -4
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 4,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 8
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 1,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 15
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 14
      }
    ],
    "solutionMoves": [
      {
        "block": 0,
        "x": -3
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 6,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 0,
        "x": 0
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 3,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 14
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 13
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 9
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 13
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 4,
        "x": 2
      },
      {
        "block": 4,
        "x": -2
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 14
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 11
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 6,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 15
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 0,
        "x": -3
      },
      {
        "block": 4,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 1,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 16
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 6,
        "x": 4
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 17
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 16
      },
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 5,
        "x": -4
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 11
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 17
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 14
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 6,
        "x": 4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 16
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 10
      },
      {
        "mass": 4,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 13
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 17
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 3,
        "x": -4
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 3,
        "x": 3
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 17
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 14
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 6,
        "x": -1
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 6,
        "x": -1
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 18
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 17
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 13
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 6,
        "x": 4
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 14
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      },
      {
        "mass": 3,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 17
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 4,
        "x": 0
      },
      {
        "block": 4,
        "x": 1
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 13
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 16
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 15
      },
      {
        "mass": 3,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 18
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 17
      },
      {
        "mass": 4,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 12
      }
    ],
    "solutionMoves": [
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 3,
        "x": -1
      },
      {
        "block": 4,
        "x": 4
      },
      {
        "block": 3,
        "x": -2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 3,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 6
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 18
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 18
      },
      {
        "mass": 6,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 15
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 17
      },
      {
        "mass": 1,
        "x": -1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 18
      },
      {
        "mass": 1,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 6,
        "x": -1
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 5,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 6,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 6,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 1,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 16
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 14
      },
      {
        "mass": 2,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 18
      },
      {
        "mass": 2,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 5,
        "x": -2
      },
      {
        "block": 5,
        "x": 0
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  },
  {
    "name": "Todos móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 6,
        "x": -3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 16
      },
      {
        "mass": 6,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 1,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 1,
        "x": 2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 2,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 17
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 5
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 6
      },
      {
        "mass": 3,
        "x": -4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 18
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": 1
      },
      {
        "block": 4,
        "x": 2
      },
      {
        "block": 0,
        "x": -1
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 4,
        "x": -2
      },
      {
        "block": 4,
        "x": 3
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 4,
        "x": -3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 8
  },
  {
    "name": "1 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 1,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 1,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 2,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 2,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 4
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 5
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 6
      },
      {
        "mass": 4,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 18
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": 3
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 1
  },
  {
    "name": "2 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 2,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 0
      },
      {
        "mass": 2,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 1
      },
      {
        "mass": 3,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 2
      },
      {
        "mass": 3,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 3
      },
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 4
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 5
      },
      {
        "mass": 5,
        "x": -4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 15
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 18
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": -1
      },
      {
        "block": 6,
        "x": 0
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 0
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 7,
        "x": -4
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": 2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 2
  },
  {
    "name": "3 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 3,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 0
      },
      {
        "mass": 3,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 1
      },
      {
        "mass": 4,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 2
      },
      {
        "mass": 4,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 3
      },
      {
        "mass": 5,
        "x": -1,
        "fixed": true,
        "shape": "triangle",
        "ratio": 1.2,
        "order": 4
      },
      {
        "mass": 5,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 13
      },
      {
        "mass": 6,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 18
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 1.8,
        "order": 17
      }
    ],
    "solutionMoves": [
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 6,
        "x": 2
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 5,
        "x": 2
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 5,
        "x": 1
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 6,
        "x": -2
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 3
  },
  {
    "name": "4 móveis · síntese com oito blocos",
    "hint": "Conte massa × distância em cada lado. Mova apenas o topo; triângulos encerram a pilha. Confirme para verificar.",
    "weights": [
      {
        "mass": 4,
        "x": -1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 0
      },
      {
        "mass": 4,
        "x": 1,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 1
      },
      {
        "mass": 5,
        "x": -2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 2
      },
      {
        "mass": 5,
        "x": 2,
        "fixed": true,
        "shape": "rectangle",
        "ratio": 1.2,
        "order": 3
      },
      {
        "mass": 6,
        "x": 0,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 10
      },
      {
        "mass": 6,
        "x": 4,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 1.8,
        "order": 8
      },
      {
        "mass": 1,
        "x": 4,
        "fixed": false,
        "shape": "triangle",
        "ratio": 0.8,
        "order": 17
      },
      {
        "mass": 1,
        "x": 3,
        "fixed": false,
        "shape": "rectangle",
        "ratio": 0.8,
        "order": 18
      }
    ],
    "solutionMoves": [
      {
        "block": 7,
        "x": -3
      },
      {
        "block": 6,
        "x": -4
      },
      {
        "block": 6,
        "x": 3
      },
      {
        "block": 7,
        "x": -2
      },
      {
        "block": 6,
        "x": -3
      },
      {
        "block": 6,
        "x": 1
      },
      {
        "block": 7,
        "x": 4
      },
      {
        "block": 7,
        "x": 2
      },
      {
        "block": 4,
        "x": -1
      },
      {
        "block": 6,
        "x": -2
      },
      {
        "block": 5,
        "x": 1
      }
    ],
    "solution": [
      -1,
      1,
      -2,
      2,
      -1,
      1,
      -2,
      2
    ],
    "movableCount": 4
  }
];
export {lightLevels} from './light-levels.mjs';
export const cutLevels = [
  {
    "name": "Metade",
    "shape": "Retângulo",
    "target": 50,
    "angle": 0,
    "lockedAngle": false,
    "family": "Reta",
    "amplitude": 40,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Um quarto",
    "shape": "Quadrado",
    "target": 25,
    "angle": 0,
    "lockedAngle": false,
    "family": "Reta",
    "amplitude": 47,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Três lados",
    "shape": "Triângulo",
    "target": 40,
    "angle": 0,
    "lockedAngle": false,
    "family": "Reta",
    "amplitude": 54,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Braços de área",
    "shape": "Trapézio",
    "target": 60,
    "angle": 0,
    "lockedAngle": false,
    "family": "Reta",
    "amplitude": 61,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Lados inclinados",
    "shape": "Paralelogramo",
    "target": 30,
    "angle": 20,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": -68,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 20° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Diagonal",
    "shape": "Losango",
    "target": 65,
    "angle": 30,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 75,
    "frequency": 1,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 30° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cinco lados",
    "shape": "Pentágono",
    "target": 35,
    "angle": 45,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 82,
    "frequency": 1.5,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 45° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seis lados",
    "shape": "Hexágono",
    "target": 70,
    "angle": 60,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 89,
    "frequency": 1.5,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Assimetria",
    "shape": "Octógono",
    "target": 22,
    "angle": 75,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 96,
    "frequency": 2,
    "stage": 1,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 75° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Muitos lados",
    "shape": "Decágono",
    "target": 78,
    "angle": 90,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 103,
    "frequency": 2,
    "stage": 1,
    "initialOffset": 0,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": false,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Primeiro arco",
    "shape": "Retângulo",
    "target": 50,
    "angle": 0,
    "lockedAngle": false,
    "family": "Parábola",
    "amplitude": 40,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco no quadrado",
    "shape": "Quadrado",
    "target": 25,
    "angle": 0,
    "lockedAngle": false,
    "family": "Parábola",
    "amplitude": 47,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Vértice e triângulo",
    "shape": "Triângulo",
    "target": 40,
    "angle": 0,
    "lockedAngle": false,
    "family": "Parábola",
    "amplitude": 54,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco no trapézio",
    "shape": "Trapézio",
    "target": 60,
    "angle": 0,
    "lockedAngle": false,
    "family": "Parábola",
    "amplitude": 61,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Curvatura invertida",
    "shape": "Paralelogramo",
    "target": 30,
    "angle": 20,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": -68,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 20° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco inclinado",
    "shape": "Losango",
    "target": 65,
    "angle": 30,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 75,
    "frequency": 1,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 30° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Vértice fora do centro",
    "shape": "Pentágono",
    "target": 35,
    "angle": 45,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 82,
    "frequency": 1.5,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 45° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Hexágono e arco",
    "shape": "Hexágono",
    "target": 70,
    "angle": 60,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 89,
    "frequency": 1.5,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco mais fechado",
    "shape": "Octógono",
    "target": 22,
    "angle": 75,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 96,
    "frequency": 2,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 75° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Síntese parabólica",
    "shape": "Decágono",
    "target": 78,
    "angle": 90,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 103,
    "frequency": 2,
    "stage": 2,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Primeira onda",
    "shape": "Retângulo",
    "target": 50,
    "angle": 0,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 40,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda no quadrado",
    "shape": "Quadrado",
    "target": 25,
    "angle": 0,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 47,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda e triângulo",
    "shape": "Triângulo",
    "target": 40,
    "angle": 0,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 54,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Fase espacial",
    "shape": "Trapézio",
    "target": 60,
    "angle": 0,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 61,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Mais amplitude",
    "shape": "Paralelogramo",
    "target": 30,
    "angle": 20,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": -68,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 20° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda inclinada",
    "shape": "Losango",
    "target": 65,
    "angle": 30,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 75,
    "frequency": 1,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 30° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Duas mudanças",
    "shape": "Pentágono",
    "target": 35,
    "angle": 45,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 82,
    "frequency": 1.5,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 45° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Dois vales",
    "shape": "Hexágono",
    "target": 70,
    "angle": 60,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 89,
    "frequency": 1.5,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda oblíqua",
    "shape": "Octógono",
    "target": 22,
    "angle": 75,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 96,
    "frequency": 2,
    "stage": 3,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 75° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Síntese senoidal",
    "shape": "Decágono",
    "target": 78,
    "angle": 90,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 103,
    "frequency": 2,
    "stage": 3,
    "initialOffset": 0,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Primeiro S",
    "shape": "Retângulo",
    "target": 50,
    "angle": 0,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 40,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "S no quadrado",
    "shape": "Quadrado",
    "target": 25,
    "angle": 0,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 47,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Inflação desigual",
    "shape": "Triângulo",
    "target": 40,
    "angle": 0,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 54,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "S no trapézio",
    "shape": "Trapézio",
    "target": 60,
    "angle": 0,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 61,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Inverter o S",
    "shape": "Paralelogramo",
    "target": 30,
    "angle": 20,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": -68,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 20° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "S inclinado",
    "shape": "Losango",
    "target": 65,
    "angle": 30,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 75,
    "frequency": 1,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 30° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Assimetria cúbica",
    "shape": "Pentágono",
    "target": 35,
    "angle": 45,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 82,
    "frequency": 1.5,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 45° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Duas regiões",
    "shape": "Hexágono",
    "target": 70,
    "angle": 60,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 89,
    "frequency": 1.5,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "S oblíquo",
    "shape": "Octógono",
    "target": 22,
    "angle": 75,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 96,
    "frequency": 2,
    "stage": 4,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 75° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Síntese cúbica",
    "shape": "Decágono",
    "target": 78,
    "angle": 90,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 103,
    "frequency": 2,
    "stage": 4,
    "initialOffset": 0,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Reta em doze lados",
    "shape": "Dodecágono",
    "target": 18,
    "angle": 35,
    "lockedAngle": true,
    "family": "Reta",
    "amplitude": 100,
    "frequency": 1,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco irregular",
    "shape": "Hexágono irregular",
    "target": 72,
    "angle": 50,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 102,
    "frequency": 1,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 50° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda irregular",
    "shape": "Hexágono irregular",
    "target": 27,
    "angle": 65,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 104,
    "frequency": 1,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 65° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica irregular",
    "shape": "Hexágono irregular",
    "target": 76,
    "angle": 80,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 106,
    "frequency": 1,
    "stage": 5,
    "initialOffset": 0,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 80° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola oblíqua",
    "shape": "Heptágono",
    "target": 21,
    "angle": 110,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": -108,
    "frequency": 1,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 110° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Ondas compostas",
    "shape": "Decágono",
    "target": 81,
    "angle": 125,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 110,
    "frequency": 1,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 125° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica inclinada",
    "shape": "Heptágono",
    "target": 24,
    "angle": 140,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 112,
    "frequency": 1.5,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 140° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Onda em doze lados",
    "shape": "Dodecágono",
    "target": 79,
    "angle": 155,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 114,
    "frequency": 1.5,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": true
    },
    "entry": "normal a 155° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Arco em doze lados",
    "shape": "Dodecágono",
    "target": 17,
    "angle": 170,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 116,
    "frequency": 2,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 170° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Desafio final em S",
    "shape": "Hexágono irregular",
    "target": 83,
    "angle": 120,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 118,
    "frequency": 2,
    "stage": 5,
    "centerX": 400,
    "centerY": 230,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": true
    },
    "entry": "normal a 120° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: esquerda",
    "shape": "Trapézio",
    "target": 32,
    "angle": 0,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 35,
    "frequency": 0.5,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: direita",
    "shape": "Losango",
    "target": 68,
    "angle": 180,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": -38,
    "frequency": 1,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 180° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: cima",
    "shape": "Pentágono alongado",
    "target": 41,
    "angle": 90,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 41,
    "frequency": 1.5,
    "stage": 6,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: baixo",
    "shape": "Triângulo largo",
    "target": 59,
    "angle": 270,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 44,
    "frequency": 2,
    "stage": 6,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 270° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal inferior esquerda",
    "shape": "Hexágono irregular",
    "target": 24,
    "angle": 35,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": -47,
    "frequency": 0.5,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal superior direita",
    "shape": "Octógono achatado",
    "target": 76,
    "angle": 145,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 50,
    "frequency": 1,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 145° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal inferior direita",
    "shape": "Heptágono",
    "target": 37,
    "angle": 215,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 53,
    "frequency": 1.5,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 215° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal superior esquerda",
    "shape": "Trapézio estreito",
    "target": 63,
    "angle": 325,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": -56,
    "frequency": 2,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 325° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal a 60°",
    "shape": "Decágono",
    "target": 19,
    "angle": 60,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 59,
    "frequency": 0.5,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal a 240°",
    "shape": "Dodecágono",
    "target": 81,
    "angle": 240,
    "lockedAngle": true,
    "family": "Parábola",
    "amplitude": 62,
    "frequency": 1,
    "stage": 6,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 240° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: esquerda",
    "shape": "Pentágono alongado",
    "target": 32,
    "angle": 0,
    "lockedAngle": true,
    "family": "Cosseno",
    "amplitude": 45,
    "frequency": 1,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: direita",
    "shape": "Triângulo largo",
    "target": 68,
    "angle": 180,
    "lockedAngle": true,
    "family": "Cosseno",
    "amplitude": -48,
    "frequency": 1.5,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 180° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: cima",
    "shape": "Hexágono irregular",
    "target": 41,
    "angle": 90,
    "lockedAngle": true,
    "family": "Cosseno",
    "amplitude": 51,
    "frequency": 2,
    "stage": 7,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 145,
    "initialOffset": 0,
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: baixo",
    "shape": "Octógono achatado",
    "target": 59,
    "angle": 270,
    "lockedAngle": true,
    "family": "Cosseno",
    "amplitude": 54,
    "frequency": 0.5,
    "stage": 7,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 270° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal inferior esquerda",
    "shape": "Heptágono",
    "target": 24,
    "angle": 35,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": -57,
    "frequency": 1,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal superior direita",
    "shape": "Trapézio estreito",
    "target": 76,
    "angle": 145,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": 60,
    "frequency": 1.5,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 145° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal inferior direita",
    "shape": "Decágono",
    "target": 37,
    "angle": 215,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": 63,
    "frequency": 2,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 185,
    "initialOffset": 0,
    "entry": "normal a 215° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal superior esquerda",
    "shape": "Dodecágono",
    "target": 63,
    "angle": 325,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": -66,
    "frequency": 0.5,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 325° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal a 60°",
    "shape": "Trapézio",
    "target": 19,
    "angle": 60,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": 69,
    "frequency": 1,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal a 240°",
    "shape": "Losango",
    "target": 81,
    "angle": 240,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": 72,
    "frequency": 1.5,
    "stage": 7,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 240° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: esquerda",
    "shape": "Hexágono irregular",
    "target": 32,
    "angle": 0,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 55,
    "frequency": 1.5,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: direita",
    "shape": "Octógono achatado",
    "target": 68,
    "angle": 180,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": -58,
    "frequency": 2,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 180° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: cima",
    "shape": "Heptágono",
    "target": 41,
    "angle": 90,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 61,
    "frequency": 0.5,
    "stage": 8,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: baixo",
    "shape": "Trapézio estreito",
    "target": 59,
    "angle": 270,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 64,
    "frequency": 1,
    "stage": 8,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 270° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal inferior esquerda",
    "shape": "Decágono",
    "target": 24,
    "angle": 35,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": -67,
    "frequency": 1.5,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal superior direita",
    "shape": "Dodecágono",
    "target": 76,
    "angle": 145,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 70,
    "frequency": 2,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 145° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal inferior direita",
    "shape": "Trapézio",
    "target": 37,
    "angle": 215,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 73,
    "frequency": 0.5,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 215° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal superior esquerda",
    "shape": "Losango",
    "target": 63,
    "angle": 325,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": -76,
    "frequency": 1,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 325° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal a 60°",
    "shape": "Pentágono alongado",
    "target": 19,
    "angle": 60,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 79,
    "frequency": 1.5,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal a 240°",
    "shape": "Triângulo largo",
    "target": 81,
    "angle": 240,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 82,
    "frequency": 2,
    "stage": 8,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 240° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: esquerda",
    "shape": "Heptágono",
    "target": 32,
    "angle": 0,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 65,
    "frequency": 2,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: direita",
    "shape": "Trapézio estreito",
    "target": 68,
    "angle": 180,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": -68,
    "frequency": 0.5,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 180° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: cima",
    "shape": "Decágono",
    "target": 41,
    "angle": 90,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 71,
    "frequency": 1,
    "stage": 9,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: baixo",
    "shape": "Dodecágono",
    "target": 59,
    "angle": 270,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 74,
    "frequency": 1.5,
    "stage": 9,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 270° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal inferior esquerda",
    "shape": "Trapézio",
    "target": 24,
    "angle": 35,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": -77,
    "frequency": 2,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal superior direita",
    "shape": "Losango",
    "target": 76,
    "angle": 145,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 80,
    "frequency": 0.5,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 145° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal inferior direita",
    "shape": "Pentágono alongado",
    "target": 37,
    "angle": 215,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 83,
    "frequency": 1,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 215° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal superior esquerda",
    "shape": "Triângulo largo",
    "target": 63,
    "angle": 325,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": -86,
    "frequency": 1.5,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 325° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal a 60°",
    "shape": "Hexágono irregular",
    "target": 19,
    "angle": 60,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 89,
    "frequency": 2,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal a 240°",
    "shape": "Octógono achatado",
    "target": 81,
    "angle": 240,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": 92,
    "frequency": 0.5,
    "stage": 9,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 240° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Dupla curva: esquerda",
    "shape": "Decágono",
    "target": 32,
    "angle": 0,
    "lockedAngle": true,
    "family": "Dupla curva",
    "amplitude": 75,
    "frequency": 0.5,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 0° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: direita",
    "shape": "Dodecágono",
    "target": 68,
    "angle": 180,
    "lockedAngle": true,
    "family": "Cosseno",
    "amplitude": -78,
    "frequency": 1,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": false,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 180° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: cima",
    "shape": "Trapézio",
    "target": 41,
    "angle": 90,
    "lockedAngle": true,
    "family": "Cúbica",
    "amplitude": 81,
    "frequency": 1.5,
    "stage": 10,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 90° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: baixo",
    "shape": "Losango",
    "target": 59,
    "angle": 270,
    "lockedAngle": true,
    "family": "Seno",
    "amplitude": 84,
    "frequency": 2,
    "stage": 10,
    "permissions": {
      "x": false,
      "y": true,
      "rotate": false,
      "amplitude": false,
      "frequency": true,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 270° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Parábola: diagonal inferior esquerda",
    "shape": "Pentágono alongado",
    "target": 24,
    "angle": 35,
    "lockedAngle": false,
    "family": "Parábola",
    "amplitude": -87,
    "frequency": 0.5,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": false,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 35° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Dupla curva: diagonal superior direita",
    "shape": "Triângulo largo",
    "target": 76,
    "angle": 145,
    "lockedAngle": false,
    "family": "Dupla curva",
    "amplitude": 90,
    "frequency": 1,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 145° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Seno: diagonal inferior direita",
    "shape": "Hexágono irregular",
    "target": 37,
    "angle": 215,
    "lockedAngle": false,
    "family": "Seno",
    "amplitude": 93,
    "frequency": 1.5,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 185,
    "initialOffset": 0,
    "entry": "normal a 215° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cúbica: diagonal superior esquerda",
    "shape": "Octógono achatado",
    "target": 63,
    "angle": 325,
    "lockedAngle": false,
    "family": "Cúbica",
    "amplitude": -96,
    "frequency": 2,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 325° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Cosseno: diagonal a 60°",
    "shape": "Heptágono",
    "target": 19,
    "angle": 60,
    "lockedAngle": false,
    "family": "Cosseno",
    "amplitude": 99,
    "frequency": 0.5,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": true,
      "frequency": true,
      "offset": false
    },
    "centerX": 430,
    "centerY": 210,
    "initialOffset": 0,
    "entry": "normal a 60° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  },
  {
    "name": "Dupla curva: diagonal a 240°",
    "shape": "Trapézio estreito",
    "target": 81,
    "angle": 240,
    "lockedAngle": false,
    "family": "Dupla curva",
    "amplitude": 102,
    "frequency": 1,
    "stage": 10,
    "permissions": {
      "x": true,
      "y": true,
      "rotate": true,
      "amplitude": false,
      "frequency": false,
      "offset": false
    },
    "centerX": 370,
    "centerY": 250,
    "initialOffset": 0,
    "entry": "normal a 240° (0°: direita; 90°: baixo; 180°: esquerda; 270°: cima)"
  }
];

// Buracos determinísticos dentro do disco inscrito: nunca se cruzam nem saem da figura.
// Círculos e elipses são polígonos de 64 lados, iguais no desenho e no cálculo.
export const holeLevelNumbers=[9,10,14,18,20,24,28,30,34,38,40,44,48,50,54,58,60,64,68,70,74,78,80,84,88,90,94,96,98,100];
for(const number of holeLevelNumbers){
 const l=cutLevels[number-1],poly=shapePolygon(l.shape);
 const center=poly.reduce((c,p)=>({x:c.x+p.x/poly.length,y:c.y+p.y/poly.length}),{x:0,y:0});
 const radius=Math.min(...poly.map((a,i)=>{const b=poly[(i+1)%poly.length];return Math.abs((b.x-a.x)*(a.y-center.y)-(a.x-center.x)*(b.y-a.y))/Math.hypot(b.x-a.x,b.y-a.y);}));
 const count=number<=30?1:number<=70?2:3;
 l.holes=Array.from({length:count},(_,i)=>{
  const theta=(number*37+i*360/count)*Math.PI/180,orbit=count===1?.2:.46;
  const x=center.x+radius*orbit*Math.cos(theta),y=center.y+radius*orbit*Math.sin(theta);
  const kind=(Math.floor(number/4)+i)%5,sides=[64,3,4,6,64][kind],r=radius*(count===1?.3:.23);
  return Array.from({length:sides},(_,j)=>{const a=theta+2*Math.PI*j/sides;return {x:x+r*Math.cos(a)*(kind===4?1.2:1),y:y+r*Math.sin(a)*(kind===4?.65:1)};});
 });
 l.holeDescription=`${count} ${count===1?'vazio excluído':'vazios excluídos'} da área`;
 l.name+=` · ${count===1?'um vazio':count+' vazios'}`;
}
