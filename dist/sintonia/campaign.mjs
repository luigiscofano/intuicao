/** 80 curated SINTONIA levels; exact engine definitions retained or newly certified. Build: tests/sintonia-build-80.mjs. */
export const CONTENT_REVISION = 'sintonia-content-3';
export const DIFFICULTIES = Object.freeze(["Básico","Aprendiz","Intermediário","Avançado","Mestre","Modo Sábio"]);
export const CHAPTERS = DIFFICULTIES;
export const CAMPAIGN = [
  {
    "id": "sintonia-0001",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 4,
        "walkable": [
          0,
          2,
          4,
          5,
          6,
          7
        ],
        "start": 4,
        "goal": 0
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 2,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ],
        "start": 3,
        "goal": 1
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "final-command",
    "secondaryFamilies": [
      "shared-command",
      "individual-goals"
    ],
    "name": "Uma seta para todos",
    "lesson": "Todos recebem a mesma seta. Quem encontra uma parede fica parado. O mesmo comando move todos os animais. Leve cada um ao seu destino.",
    "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
    "hints": [
      "Todos recebem a mesma seta.",
      "Compare a direção entre cada animal e seu destino.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0001:0",
    "difficulty": 0,
    "solution": [
      "up"
    ],
    "signature": "st1-50dd6ac9-199",
    "prerequisites": [],
    "introduction": [
      "walls"
    ],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "focus"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 1,
      "optimal": true,
      "visited": 5,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o mesmo comando pode levar todos aos destinos.",
      "reasoning": {
        "used": [],
        "partialBlocks": 0,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 0,
        "earlyTurns": 0,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "not-run",
        "visited": 0,
        "resistant": null
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "focus",
      "prerequisiteChapters": [],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": [
            "up"
          ]
        },
        "sweeps": {
          "status": "complete",
          "visited": 11,
          "solves": true
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": [
            "up,right",
            "up,up,right",
            "up,right,right",
            "up,down",
            "up,up,down",
            "up,down,down",
            "up,left",
            "up,up,left",
            "up,left,left",
            "down,up,up",
            "up,right,down,left",
            "up,left,down,right"
          ]
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 8
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 10
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-50dd6ac9-199",
        "topologySignature": "top1-5fd7052f-104",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Um único comando apresenta a chegada conjunta; exceção introdutória deliberada à resistência a repetição.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 1,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 1,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 1,
            "waited": 0,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Um único comando apresenta a chegada conjunta; exceção introdutória deliberada à resistência a repetição.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 1
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 1,
    "chapter": 1,
    "topologySignature": "top1-5fd7052f-104",
    "contentRevision": "sintonia-content-3",
    "originNumber": 1,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 1,
      "id": "sintonia-0001",
      "version": 1,
      "reason": "Um único comando apresenta a chegada conjunta; exceção introdutória deliberada à resistência a repetição."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Todos recebem a mesma seta. Quem encontra uma parede fica parado."
  },
  {
    "id": "sintonia-0021",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ],
        "start": 0,
        "goal": 2
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 2,
        "walkable": [
          0,
          1,
          2,
          4,
          5
        ],
        "start": 5,
        "goal": 2
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "wall-adjust",
    "secondaryFamilies": [
      "axis-order",
      "unequal-loop"
    ],
    "name": "A parede também ajuda",
    "lesson": "Use um bloqueio de um tabuleiro para ajustar o outro.",
    "discovery": "Aqui o jogador precisa descobrir que um bloqueio de um tabuleiro permite ajustar o outro.",
    "hints": [
      "Observe qual animal pode continuar quando o outro encontra uma parede.",
      "Procure uma direção que mude apenas as posições ainda desalinhadas.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0021:0",
    "difficulty": 0,
    "solution": [
      "left",
      "up",
      "right",
      "right"
    ],
    "signature": "st1-4bbc7800-197",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 4,
      "optimal": true,
      "visited": 30,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um bloqueio de um tabuleiro permite ajustar o outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 2,
        "directionChanges": 2,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 14,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "variation",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 4
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 11
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-4bbc7800-197",
        "topologySignature": "top1-b62cc96d-102",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Bloqueio assimétrico compacto: a parede separa os movimentos.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 4,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 2,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 2,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Bloqueio assimétrico compacto: a parede separa os movimentos.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 2,
    "chapter": 1,
    "topologySignature": "top1-b62cc96d-102",
    "contentRevision": "sintonia-content-3",
    "originNumber": 21,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 21,
      "id": "sintonia-0021",
      "version": 1,
      "reason": "Bloqueio assimétrico compacto: a parede separa os movimentos."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0005",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5
        ],
        "start": 5,
        "goal": 0
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7
        ],
        "start": 3,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "axis-order",
    "secondaryFamilies": [
      "waiting-place",
      "wall-adjust"
    ],
    "name": "Primeiro este ajuste",
    "lesson": "Prepare os ajustes horizontais e verticais numa ordem que funcione para todos.",
    "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
    "hints": [
      "Compare o ajuste horizontal com o vertical.",
      "Prepare um eixo antes de completar o outro.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0005:0",
    "difficulty": 0,
    "solution": [
      "up",
      "left",
      "down",
      "left"
    ],
    "signature": "st1-83fd3684-197",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 4,
      "optimal": true,
      "visited": 24,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
      "reasoning": {
        "used": [],
        "partialBlocks": 2,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "not-run",
        "visited": 0,
        "resistant": null
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "mix",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 5
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 8
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-83fd3684-197",
        "topologySignature": "top1-d81fa7b6-102",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "A ordem dos eixos substitui a repetição de uma direção.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 4,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 1,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "A ordem dos eixos substitui a repetição de uma direção.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 3,
    "chapter": 1,
    "topologySignature": "top1-d81fa7b6-102",
    "contentRevision": "sintonia-content-3",
    "originNumber": 5,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 5,
      "id": "sintonia-0005",
      "version": 1,
      "reason": "A ordem dos eixos substitui a repetição de uma direção."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0008",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 4,
        "walkable": [
          0,
          1,
          5,
          6,
          7
        ],
        "start": 5,
        "goal": 1
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 2,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          7
        ],
        "start": 1,
        "goal": 4
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "unequal-loop",
      "waiting-place"
    ],
    "name": "Antes do fim",
    "lesson": "Experimente mudar de direção antes do fim do corredor.",
    "discovery": "Aqui o jogador precisa descobrir que mudar de direção antes do fim de um corredor permite um alinhamento que insistir na seta não produz.",
    "hints": [
      "Nem todo trecho precisa ser percorrido até o fim.",
      "Experimente mudar de direção numa casa intermediária.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0008:0",
    "difficulty": 0,
    "solution": [
      "down",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-9ec7f2ac-195",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 4,
      "optimal": true,
      "visited": 26,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que mudar de direção antes do fim de um corredor permite um alinhamento que insistir na seta não produz.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 2,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "not-run",
        "visited": 0,
        "resistant": null
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "compact",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 8,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 9
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-9ec7f2ac-195",
        "topologySignature": "top1-74ea3a9c-100",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Virar antes do extremo cria uma parada intermediária.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 4,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 1,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 1,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Virar antes do extremo cria uma parada intermediária.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 4,
    "chapter": 1,
    "topologySignature": "top1-74ea3a9c-100",
    "contentRevision": "sintonia-content-3",
    "originNumber": 8,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 8,
      "id": "sintonia-0008",
      "version": 1,
      "reason": "Virar antes do extremo cria uma parada intermediária."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0023",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          4,
          5,
          7
        ],
        "start": 5,
        "goal": 0
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          4,
          5,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 10,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "waiting-place",
    "secondaryFamilies": [
      "priority-change",
      "unequal-loop"
    ],
    "name": "Um lugar para esperar",
    "lesson": "Procure um recuo que permita esperar enquanto o outro caminho é preparado.",
    "discovery": "Aqui o jogador precisa descobrir que um recuo permite manter um animal parado durante a preparação do outro.",
    "hints": [
      "Um canto pode segurar um animal em algumas direções.",
      "Prepare esse lugar antes de completar o outro caminho.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0023:0",
    "difficulty": 0,
    "solution": [
      "right",
      "left",
      "up",
      "left",
      "up"
    ],
    "signature": "st1-e0bf455b-202",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "deep"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "visited": 31,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um recuo permite manter um animal parado durante a preparação do outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 3,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 2,
        "directionChanges": 4,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 14,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "revisit",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-e0bf455b-202",
        "topologySignature": "top1-90ef41f6-106",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "O recuo funciona como lugar de espera, não como distância artificial.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 1,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "O recuo funciona como lugar de espera, não como distância artificial.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 5,
    "chapter": 1,
    "topologySignature": "top1-90ef41f6-106",
    "contentRevision": "sintonia-content-3",
    "originNumber": 23,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 23,
      "id": "sintonia-0023",
      "version": 1,
      "reason": "O recuo funciona como lugar de espera, não como distância artificial."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0015",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          5
        ],
        "start": 4,
        "goal": 5
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          1,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 8,
        "goal": 4
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "unequal-loop",
    "secondaryFamilies": [
      "goal-transit",
      "priority-change"
    ],
    "name": "Uma volta diferente",
    "lesson": "Uma pequena volta pode produzir resultados diferentes nos tabuleiros.",
    "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
    "hints": [
      "Compare o efeito de uma pequena volta nos tabuleiros.",
      "Uma parede pode interromper apenas parte dessa volta.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0015:0",
    "difficulty": 0,
    "solution": [
      "up",
      "right",
      "left",
      "up",
      "right",
      "down"
    ],
    "signature": "st1-14584ef5-195",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 19,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 3,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 4,
        "directionChanges": 5,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 11,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "mix",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 11,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 10
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-14584ef5-195",
        "topologySignature": "top1-65aa4f14-100",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Os percursos desiguais precisam ser compensados.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 2,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Os percursos desiguais precisam ser compensados.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 6,
    "chapter": 1,
    "topologySignature": "top1-65aa4f14-100",
    "contentRevision": "sintonia-content-3",
    "originNumber": 15,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 15,
      "id": "sintonia-0015",
      "version": 1,
      "reason": "Os percursos desiguais precisam ser compensados."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0040",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8,
          10,
          11
        ],
        "start": 3,
        "goal": 10
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          5,
          9,
          10,
          11,
          12,
          13
        ],
        "start": 12,
        "goal": 10
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "axis-order",
    "secondaryFamilies": [
      "wall-adjust",
      "waiting-place"
    ],
    "name": "Primeiro este ajuste",
    "lesson": "Prepare os ajustes horizontais e verticais numa ordem que funcione para todos.",
    "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
    "hints": [
      "Compare o ajuste horizontal com o vertical.",
      "Prepare um eixo antes de completar o outro.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0040:0",
    "difficulty": 0,
    "solution": [
      "right",
      "up",
      "right",
      "down",
      "down",
      "down"
    ],
    "signature": "st1-1f6b08dd-206",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 51,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 4,
        "directionChanges": 3,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "focus",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 8
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-1f6b08dd-206",
        "topologySignature": "top1-ed4fe01b-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Outra ordem de eixos retoma a coordenação depois da volta desigual.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Outra ordem de eixos retoma a coordenação depois da volta desigual.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 10
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 7,
    "chapter": 1,
    "topologySignature": "top1-ed4fe01b-112",
    "contentRevision": "sintonia-content-3",
    "originNumber": 40,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 40,
      "id": "sintonia-0040",
      "version": 1,
      "reason": "Outra ordem de eixos retoma a coordenação depois da volta desigual."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0020",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 4,
        "walkable": [
          1,
          3,
          5,
          6,
          7
        ],
        "start": 6,
        "goal": 1
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 2,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "start": 3,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "unequal-loop",
      "final-command"
    ],
    "name": "A vez de ajudar",
    "lesson": "Alterne quem avança e quem ajuda a preparar o próximo passo.",
    "discovery": "Aqui o jogador precisa descobrir que o personagem que precisa avançar pode mudar durante a sequência.",
    "hints": [
      "Observe quem precisa de espaço agora.",
      "Depois de preparar um caminho, transfira a atenção para o outro.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0020:0",
    "difficulty": 0,
    "solution": [
      "down",
      "left",
      "down",
      "up",
      "right"
    ],
    "signature": "st1-b2df70f9-197",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "visited": 31,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o personagem que precisa avançar pode mudar durante a sequência.",
      "reasoning": {
        "used": [],
        "partialBlocks": 3,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 2,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 16,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "variation",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 16,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 6
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-b2df70f9-197",
        "topologySignature": "top1-738dc8e7-102",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Trocar qual animal avança primeiro evita tratar um painel como líder fixo.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 2,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 0,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Trocar qual animal avança primeiro evita tratar um painel como líder fixo.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 8,
    "chapter": 1,
    "topologySignature": "top1-738dc8e7-102",
    "contentRevision": "sintonia-content-3",
    "originNumber": 20,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 20,
      "id": "sintonia-0020",
      "version": 1,
      "reason": "Trocar qual animal avança primeiro evita tratar um painel como líder fixo."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0032",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          8,
          9,
          10,
          11
        ],
        "start": 3,
        "goal": 0
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          8,
          9,
          11
        ],
        "start": 5,
        "goal": 6
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "unequal-loop",
    "secondaryFamilies": [
      "priority-change",
      "goal-transit"
    ],
    "name": "Uma volta diferente",
    "lesson": "Uma pequena volta pode produzir resultados diferentes nos tabuleiros.",
    "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
    "hints": [
      "Compare o efeito de uma pequena volta nos tabuleiros.",
      "Uma parede pode interromper apenas parte dessa volta.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0032:0",
    "difficulty": 0,
    "solution": [
      "up",
      "right",
      "right",
      "down",
      "down",
      "up",
      "left"
    ],
    "signature": "st1-3fb19f8a-216",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "focus"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 96,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 2,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 4,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 25,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "deep",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 25,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-3fb19f8a-216",
        "topologySignature": "top1-0be87964-121",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Volta desigual mais articulada, ainda sem símbolos novos.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 0,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Volta desigual mais articulada, ainda sem símbolos novos.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 6
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 9,
    "chapter": 1,
    "topologySignature": "top1-0be87964-121",
    "contentRevision": "sintonia-content-3",
    "originNumber": 32,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 32,
      "id": "sintonia-0032",
      "version": 1,
      "reason": "Volta desigual mais articulada, ainda sem símbolos novos."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0014",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          7,
          8
        ],
        "start": 0,
        "goal": 7
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          2,
          5,
          6,
          8,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 8
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "final-command",
    "secondaryFamilies": [
      "goal-transit",
      "axis-order"
    ],
    "name": "Preparar a última seta",
    "lesson": "Prepare posições que possam terminar juntas no mesmo comando.",
    "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
    "hints": [
      "Imagine onde cada animal estaria uma seta antes do destino.",
      "Quem já está no destino precisa permanecer bloqueado ou voltar depois.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0014:0",
    "difficulty": 0,
    "solution": [
      "up",
      "up",
      "up",
      "right",
      "down",
      "down"
    ],
    "signature": "st1-7b910d61-204",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 0,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 42,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 5,
        "directionChanges": 2,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 13,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "revisit",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 13,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 8
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-7b910d61-204",
        "topologySignature": "top1-e1585f63-110",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Preparar posições compatíveis antes do comando de chegada.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 1,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Preparar posições compatíveis antes do comando de chegada.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 8
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 10,
    "chapter": 1,
    "topologySignature": "top1-e1585f63-110",
    "contentRevision": "sintonia-content-3",
    "originNumber": 14,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 14,
      "id": "sintonia-0014",
      "version": 1,
      "reason": "Preparar posições compatíveis antes do comando de chegada."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0051",
    "version": 1,
    "rulesVersion": 1,
    "generatorVersion": 2,
    "number": 11,
    "name": "Antes do fim",
    "chapter": 1,
    "difficulty": 0,
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "goal-transit",
      "unequal-loop"
    ],
    "lesson": "Mude de direção antes do fim do corredor e use o destino como passagem.",
    "hints": [
      "O corredor do tuiuiú tem uma casa a mais.",
      "Use essa diferença para desalinhar os animais antes de descer.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "mechanics": [
      "walls"
    ],
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          4
        ],
        "start": 0,
        "goal": 1
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4
        ],
        "start": 0,
        "goal": 4
      }
    ],
    "solution": [
      "right",
      "right",
      "left",
      "down",
      "right"
    ],
    "seed": "reference-2x3-v1",
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "focus"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "authored-reference",
      "humanPlaytested": false,
      "compatibility": "validated",
      "alternatives": "A exploração completa demonstra que cinco comandos são suficientes e mínimos.",
      "deadEnds": "As paredes não consomem recursos; desfazer continua disponível.",
      "role": "mix",
      "discovery": "Aqui o jogador precisa descobrir que é necessário mudar de direção antes do fim de um corredor e sair de um destino para preparar a chegada conjunta.",
      "reasoning": {
        "used": [],
        "partialBlocks": 3,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 5,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 7
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-5cc8a188-187",
        "topologySignature": "top1-57c895fd-92",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Referência compacta: passar pelo destino e virar antes do fim.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 1,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Referência compacta: passar pelo destino e virar antes do fim.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "signature": "st1-5cc8a188-187",
    "topologySignature": "top1-57c895fd-92",
    "contentRevision": "sintonia-content-3",
    "originNumber": 51,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 51,
      "id": "sintonia-0051",
      "version": 1,
      "reason": "Referência compacta: passar pelo destino e virar antes do fim."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0052",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          3,
          5,
          7,
          9,
          10,
          11,
          13,
          14,
          15
        ],
        "start": 14,
        "goal": 11
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          9
        ],
        "start": 1,
        "goal": 3
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "goal-transit",
    "secondaryFamilies": [
      "axis-order",
      "intermediate-stop"
    ],
    "name": "Chegar, sair, voltar",
    "lesson": "Um destino também pode ser uma passagem: chegar, sair e voltar faz parte.",
    "discovery": "Aqui o jogador precisa descobrir que um destino também pode servir como casa de passagem.",
    "hints": [
      "Chegar ao destino não prende o animal.",
      "Pode ser útil sair dele para preparar a chegada conjunta.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0052:0",
    "difficulty": 0,
    "solution": [
      "up",
      "right",
      "up",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-7660d07a-206",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 43,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um destino também pode servir como casa de passagem.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 4,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 13,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "compact",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 13,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 7
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-7660d07a-206",
        "topologySignature": "top1-a7bf4172-111",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Sair deliberadamente do destino para permitir o ajuste do parceiro.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 4,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Sair deliberadamente do destino para permitir o ajuste do parceiro.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 3
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 12,
    "chapter": 1,
    "topologySignature": "top1-a7bf4172-111",
    "contentRevision": "sintonia-content-3",
    "originNumber": 52,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 52,
      "id": "sintonia-0052",
      "version": 1,
      "reason": "Sair deliberadamente do destino para permitir o ajuste do parceiro."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0055",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          1,
          2,
          4,
          5,
          6,
          7,
          11
        ],
        "start": 1,
        "goal": 7
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 3,
        "goal": 4
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "waiting-place",
    "secondaryFamilies": [
      "priority-change",
      "intermediate-stop"
    ],
    "name": "Um lugar para esperar",
    "lesson": "Procure um recuo que permita esperar enquanto o outro caminho é preparado.",
    "discovery": "Aqui o jogador precisa descobrir que um recuo permite manter um animal parado durante a preparação do outro.",
    "hints": [
      "Um canto pode segurar um animal em algumas direções.",
      "Prepare esse lugar antes de completar o outro caminho.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0055:0",
    "difficulty": 0,
    "solution": [
      "down",
      "right",
      "right",
      "up",
      "right"
    ],
    "signature": "st1-bea03c7e-204",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "visited": 49,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um recuo permite manter um animal parado durante a preparação do outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 16,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "revisit",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 16,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-bea03c7e-204",
        "topologySignature": "top1-d70a4fef-109",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada curta de espera útil entre problemas de trânsito.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Retomada curta de espera útil entre problemas de trânsito.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 13,
    "chapter": 1,
    "topologySignature": "top1-d70a4fef-109",
    "contentRevision": "sintonia-content-3",
    "originNumber": 55,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 55,
      "id": "sintonia-0055",
      "version": 1,
      "reason": "Retomada curta de espera útil entre problemas de trânsito."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0064",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 10,
        "goal": 11
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          1,
          4,
          5,
          6,
          7,
          8,
          10,
          12,
          14,
          15
        ],
        "start": 14,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "final-command",
    "secondaryFamilies": [
      "waiting-place",
      "priority-change"
    ],
    "name": "Preparar a última seta",
    "lesson": "Prepare posições que possam terminar juntas no mesmo comando.",
    "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
    "hints": [
      "Imagine onde cada animal estaria uma seta antes do destino.",
      "Quem já está no destino precisa permanecer bloqueado ou voltar depois.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0064:0",
    "difficulty": 0,
    "solution": [
      "up",
      "up",
      "left",
      "up",
      "right",
      "right",
      "down"
    ],
    "signature": "st1-e69ceca9-211",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 48,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 4,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 14,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "deep",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 6
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-e69ceca9-211",
        "topologySignature": "top1-80ecb104-113",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Alinhar chegadas depois de movimentos e bloqueios diferentes.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Alinhar chegadas depois de movimentos e bloqueios diferentes.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 14,
    "chapter": 1,
    "topologySignature": "top1-80ecb104-113",
    "contentRevision": "sintonia-content-3",
    "originNumber": 64,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 64,
      "id": "sintonia-0064",
      "version": 1,
      "reason": "Alinhar chegadas depois de movimentos e bloqueios diferentes."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0056",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          2,
          3,
          4,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 6,
        "goal": 10
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          2,
          4,
          5,
          6,
          8
        ],
        "start": 4,
        "goal": 2
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "final-command",
    "secondaryFamilies": [
      "axis-order",
      "goal-transit"
    ],
    "name": "Preparar a última seta",
    "lesson": "Prepare posições que possam terminar juntas no mesmo comando.",
    "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
    "hints": [
      "Imagine onde cada animal estaria uma seta antes do destino.",
      "Quem já está no destino precisa permanecer bloqueado ou voltar depois.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0056:0",
    "difficulty": 0,
    "solution": [
      "down",
      "left",
      "left",
      "up",
      "right",
      "down",
      "right",
      "up",
      "right"
    ],
    "signature": "st1-0c646674-207",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 56,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a vitória depende de preparar posições compatíveis com o último comando.",
      "reasoning": {
        "used": [],
        "partialBlocks": 6,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 7,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 13,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 13,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-0c646674-207",
        "topologySignature": "top1-acd0cf3a-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Síntese geométrica: preparar conjuntamente o comando final.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 4,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Síntese geométrica: preparar conjuntamente o comando final.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 15,
    "chapter": 1,
    "topologySignature": "top1-acd0cf3a-112",
    "contentRevision": "sintonia-content-3",
    "originNumber": 56,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 56,
      "id": "sintonia-0056",
      "version": 1,
      "reason": "Síntese geométrica: preparar conjuntamente o comando final."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0076",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 2,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ],
        "start": 0,
        "goal": 1,
        "plates": [
          {
            "id": "support",
            "cell": 1
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          6,
          7,
          8,
          9,
          11
        ],
        "start": 11,
        "goal": 6,
        "gates": [
          {
            "id": "plate-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "wall-adjust",
      "goal-transit"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Animal ou caixa sobre uma placa mantém aberta a cancela com o mesmo símbolo. A posição final vale para o próximo comando. Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0076:0",
    "difficulty": 1,
    "solution": [
      "up",
      "right",
      "left",
      "right"
    ],
    "signature": "st1-b97806b0-338",
    "prerequisites": [
      "walls"
    ],
    "introduction": [
      "plate"
    ],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 4,
      "optimal": true,
      "visited": 28,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 4,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 1
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 1,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 2,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 3,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 3,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 21,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Placa em dupla: ocupar agora autoriza a passagem no comando seguinte.",
      "role": "focus",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 21,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 9
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-b97806b0-338",
        "topologySignature": "top1-7f3b6457-114",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Placa em dupla: ocupar agora autoriza a passagem no comando seguinte.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 3. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 16,
    "chapter": 2,
    "topologySignature": "top1-7f3b6457-114",
    "originNumber": 76,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 76,
      "id": "sintonia-0076",
      "version": 1,
      "reason": "Placa em dupla: ocupar agora autoriza a passagem no comando seguinte."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Animal ou caixa sobre uma placa mantém aberta a cancela com o mesmo símbolo. A posição final vale para o próximo comando."
  },
  {
    "id": "sintonia-0078",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          7,
          10,
          11
        ],
        "start": 10,
        "goal": 7,
        "plates": [
          {
            "id": "support",
            "cell": 11
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          9,
          10
        ],
        "start": 10,
        "goal": 4,
        "gates": [
          {
            "id": "plate-gate",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "axis-order",
      "final-command"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0078:0",
    "difficulty": 1,
    "solution": [
      "left",
      "up",
      "up",
      "right",
      "right",
      "up"
    ],
    "signature": "st1-313420f9-338",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 57,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 11
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 2,
            "waited": 4,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 3,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 10,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar apoio temporário com outra sequência de espera.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 10,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-313420f9-338",
        "topologySignature": "top1-b0b8fc68-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar apoio temporário com outra sequência de espera.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 5. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 11
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 17,
    "chapter": 2,
    "topologySignature": "top1-b0b8fc68-112",
    "originNumber": 78,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 78,
      "id": "sintonia-0078",
      "version": 1,
      "reason": "Consolidar apoio temporário com outra sequência de espera."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0046",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          2,
          3,
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          15
        ],
        "start": 8,
        "goal": 11
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          7,
          8
        ],
        "start": 4,
        "goal": 0
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "axis-order",
    "secondaryFamilies": [
      "wall-adjust",
      "goal-transit"
    ],
    "name": "Primeiro este ajuste",
    "lesson": "Prepare os ajustes horizontais e verticais numa ordem que funcione para todos.",
    "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
    "hints": [
      "Compare o ajuste horizontal com o vertical.",
      "Prepare um eixo antes de completar o outro.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0046:0",
    "difficulty": 1,
    "solution": [
      "right",
      "right",
      "right",
      "up",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-f9ca11ad-212",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "mix"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 62,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ordem de preparar os eixos muda o alinhamento conjunto.",
      "reasoning": {
        "used": [],
        "partialBlocks": 5,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "mix",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-f9ca11ad-212",
        "topologySignature": "top1-10f4641a-115",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada geométrica sem novo símbolo entre duas dependências.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Retomada geométrica sem novo símbolo entre duas dependências.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 18,
    "chapter": 2,
    "topologySignature": "top1-10f4641a-115",
    "contentRevision": "sintonia-content-3",
    "originNumber": 46,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 46,
      "id": "sintonia-0046",
      "version": 1,
      "reason": "Retomada geométrica sem novo símbolo entre duas dependências."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0079",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          7,
          8
        ],
        "start": 8,
        "goal": 7,
        "plates": [
          {
            "id": "support",
            "cell": 6
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          1,
          2,
          3,
          4,
          7,
          8,
          9,
          10,
          11,
          14
        ],
        "start": 1,
        "goal": 14,
        "gates": [
          {
            "id": "plate-gate",
            "from": 10,
            "to": 14,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "axis-order",
      "goal-transit"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0079:0",
    "difficulty": 1,
    "solution": [
      "right",
      "right",
      "down",
      "left",
      "down",
      "left",
      "down",
      "right"
    ],
    "signature": "st1-7b924449-341",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 59,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 6
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 3,
            "waited": 5,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 6,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Sustentar apoio enquanto o receptor completa sua travessia.",
      "role": "compact",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 12,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-7b924449-341",
        "topologySignature": "top1-6a9eaa0d-119",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Sustentar apoio enquanto o receptor completa sua travessia.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 7. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 14
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 6
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 10,
            "to": 14,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 19,
    "chapter": 2,
    "topologySignature": "top1-6a9eaa0d-119",
    "originNumber": 79,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 79,
      "id": "sintonia-0079",
      "version": 1,
      "reason": "Sustentar apoio enquanto o receptor completa sua travessia."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0037",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          1,
          2,
          4,
          6,
          7,
          10,
          11
        ],
        "start": 1,
        "goal": 7
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          9
        ],
        "start": 6,
        "goal": 2
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "goal-transit",
    "secondaryFamilies": [
      "wall-adjust",
      "axis-order"
    ],
    "name": "Chegar, sair, voltar",
    "lesson": "Um destino também pode ser uma passagem: chegar, sair e voltar faz parte.",
    "discovery": "Aqui o jogador precisa descobrir que um destino também pode servir como casa de passagem.",
    "hints": [
      "Chegar ao destino não prende o animal.",
      "Pode ser útil sair dele para preparar a chegada conjunta.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0037:0",
    "difficulty": 1,
    "solution": [
      "up",
      "up",
      "down",
      "right",
      "right",
      "down",
      "down",
      "up"
    ],
    "signature": "st1-547dd586-207",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "compact"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 53,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um destino também pode servir como casa de passagem.",
      "reasoning": {
        "used": [],
        "partialBlocks": 6,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 14,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "revisit",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 6
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-547dd586-207",
        "topologySignature": "top1-42c4655e-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar destino como passagem antes de uma regra nova.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 4,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Retomar destino como passagem antes de uma regra nova.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 20,
    "chapter": 2,
    "topologySignature": "top1-42c4655e-112",
    "contentRevision": "sintonia-content-3",
    "originNumber": 37,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 37,
      "id": "sintonia-0037",
      "version": 1,
      "reason": "Retomar destino como passagem antes de uma regra nova."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0114",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          10,
          11
        ],
        "start": 1,
        "goal": 11,
        "switches": [
          {
            "id": "prepare",
            "cell": 0,
            "group": "prepare"
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          9,
          10,
          11,
          12,
          13,
          15
        ],
        "start": 2,
        "goal": 10,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 6,
            "to": 10,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "priority-change",
      "intermediate-stop"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entrar no interruptor alterna a cancela. Sair preserva a configuração; ficar parado não aciona novamente. Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0114:0",
    "difficulty": 1,
    "solution": [
      "left",
      "right",
      "down",
      "down",
      "down",
      "left",
      "right"
    ],
    "signature": "st1-00e9c02f-393",
    "prerequisites": [
      "walls"
    ],
    "introduction": [
      "switch"
    ],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "mix",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 188,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": null,
            "goalRegion": [
              11
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              11,
              9,
              15,
              13,
              12
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              1,
              0
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              7,
              10
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              10,
              11
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              6,
              10
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 0
              }
            ],
            "crossingCommands": [
              4
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 1,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 2,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 2,
        "directionChanges": 4,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 26,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Interruptor compacto em dupla: entrar alterna; sair mantém a configuração.",
      "role": "focus",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 26,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-00e9c02f-393",
        "topologySignature": "top1-03a489e5-127",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Interruptor compacto em dupla: entrar alterna; sair mantém a configuração.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": null,
            "goalRegion": [
              11
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              11,
              9,
              15,
              13,
              12
            ]
          },
          "controls": [],
          "goal": 10
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 0,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 6,
            "to": 10,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 21,
    "chapter": 2,
    "topologySignature": "top1-03a489e5-127",
    "originNumber": 114,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 114,
      "id": "sintonia-0114",
      "version": 1,
      "reason": "Interruptor compacto em dupla: entrar alterna; sair mantém a configuração."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Entrar no interruptor alterna a cancela. Sair preserva a configuração; ficar parado não aciona novamente."
  },
  {
    "id": "sintonia-0108",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          2,
          4,
          5,
          6,
          7,
          8,
          10
        ],
        "start": 0,
        "goal": 10,
        "switches": [
          {
            "id": "prepare",
            "cell": 8,
            "group": "prepare"
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          1,
          3,
          5,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 1,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 5,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0108:0",
    "difficulty": 1,
    "solution": [
      "down",
      "down",
      "up",
      "right",
      "right",
      "down",
      "down",
      "left"
    ],
    "signature": "st1-05bac78b-377",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "mix",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 116,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 8,
            "commit": null,
            "goalRegion": [
              10
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              9,
              8,
              10,
              11,
              7,
              3
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              0,
              4,
              8
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              4,
              5
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              6,
              10
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              5,
              9
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 5,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 4,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar acesso ao interruptor e preparação da saída remota.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-05bac78b-377",
        "topologySignature": "top1-94800e9e-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar acesso ao interruptor e preparação da saída remota.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 8,
            "commit": null,
            "goalRegion": [
              10
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              9,
              8,
              10,
              11,
              7,
              3
            ]
          },
          "controls": [],
          "goal": 8
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 8,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 5,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 22,
    "chapter": 2,
    "topologySignature": "top1-94800e9e-112",
    "originNumber": 108,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 108,
      "id": "sintonia-0108",
      "version": 1,
      "reason": "Consolidar acesso ao interruptor e preparação da saída remota."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0094",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 5,
        "goal": 4,
        "plates": [
          {
            "id": "support",
            "cell": 0
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          1,
          2,
          4,
          6,
          7,
          8
        ],
        "start": 2,
        "goal": 4,
        "gates": [
          {
            "id": "plate-gate",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "final-command",
      "priority-change"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0094:0",
    "difficulty": 1,
    "solution": [
      "up",
      "left",
      "left",
      "down",
      "right"
    ],
    "signature": "st1-8c33121f-328",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "mix",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "visited": 46,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 0
              }
            ],
            "crossingCommands": [
              4
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 2,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 3,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 19,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Comparar o apoio temporário da placa com a configuração persistente.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 19,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 7
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-8c33121f-328",
        "topologySignature": "top1-d0ec9ab5-106",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Comparar o apoio temporário da placa com a configuração persistente.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 4
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 4. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 0
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 23,
    "chapter": 2,
    "topologySignature": "top1-d0ec9ab5-106",
    "originNumber": 94,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 94,
      "id": "sintonia-0094",
      "version": 1,
      "reason": "Comparar o apoio temporário da placa com a configuração persistente."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0102",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          6,
          7,
          9,
          10,
          13
        ],
        "start": 10,
        "goal": 0,
        "switches": [
          {
            "id": "prepare",
            "cell": 13,
            "group": "prepare"
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          7,
          9,
          11
        ],
        "start": 7,
        "goal": 5,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "final-command",
      "wall-adjust"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0102:0",
    "difficulty": 1,
    "solution": [
      "left",
      "down",
      "up",
      "right",
      "up",
      "up",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-14e7e2a7-379",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "mix",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 124,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 13,
            "commit": null,
            "goalRegion": [
              0
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              1,
              0,
              5,
              9
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              10,
              9,
              13
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              2,
              1
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              1,
              0
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              3,
              2
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 13
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 2,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 30,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Escolher quando configurar e quando abandonar o desvio.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 30,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-14e7e2a7-379",
        "topologySignature": "top1-8db132cf-113",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Escolher quando configurar e quando abandonar o desvio.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 13,
            "commit": null,
            "goalRegion": [
              0
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              1,
              0,
              5,
              9
            ]
          },
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 13,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 24,
    "chapter": 2,
    "topologySignature": "top1-8db132cf-113",
    "originNumber": 102,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 102,
      "id": "sintonia-0102",
      "version": 1,
      "reason": "Escolher quando configurar e quando abandonar o desvio."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0060",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          2,
          4,
          5,
          6,
          10,
          11,
          14,
          15
        ],
        "start": 14,
        "goal": 0
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 5,
        "goal": 2
      }
    ],
    "mechanics": [
      "walls"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "unequal-loop",
    "secondaryFamilies": [
      "axis-order",
      "goal-transit"
    ],
    "name": "Uma volta diferente",
    "lesson": "Uma pequena volta pode produzir resultados diferentes nos tabuleiros.",
    "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
    "hints": [
      "Compare o efeito de uma pequena volta nos tabuleiros.",
      "Uma parede pode interromper apenas parte dessa volta.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0060:0",
    "difficulty": 1,
    "solution": [
      "up",
      "up",
      "left",
      "left",
      "up",
      "right",
      "right"
    ],
    "signature": "st1-e1dec027-210",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 1,
      "animals": 2,
      "primary": "walls",
      "secondary": null,
      "role": "revisit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 61,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que uma volta pode devolver um animal e reposicionar outro.",
      "reasoning": {
        "used": [],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 4,
        "directionChanges": 3,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "revisit",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 12,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-e1dec027-210",
        "topologySignature": "top1-bef0a7b8-116",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada geométrica de volta desigual antes da chave.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "Retomada geométrica de volta desigual antes da chave.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 25,
    "chapter": 2,
    "topologySignature": "top1-bef0a7b8-116",
    "contentRevision": "sintonia-content-3",
    "originNumber": 60,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 60,
      "id": "sintonia-0060",
      "version": 1,
      "reason": "Retomada geométrica de volta desigual antes da chave."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0137",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          5,
          6,
          7,
          8
        ],
        "start": 3,
        "goal": 5,
        "keys": [
          {
            "id": "prepare",
            "cell": 0
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          7,
          8,
          9,
          11
        ],
        "start": 5,
        "goal": 2,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 1,
            "to": 2,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "wall-adjust",
      "intermediate-stop"
    ],
    "name": "Caminho liberado",
    "lesson": "Terminar sobre uma chave libera permanentemente a cancela com o mesmo símbolo. Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0137:0",
    "difficulty": 1,
    "solution": [
      "up",
      "left",
      "down",
      "down",
      "right",
      "right",
      "up"
    ],
    "signature": "st1-51383c55-338",
    "prerequisites": [
      "walls"
    ],
    "introduction": [
      "key"
    ],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "compact",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 73,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "key-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": null,
            "goalRegion": [
              5
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              3,
              7,
              11
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              0
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              7,
              8
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              8,
              5
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              1,
              2
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 0
              }
            ],
            "crossingCommands": [
              6
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 25,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Chave em dupla: obter abertura permanente no desvio antes de partir.",
      "role": "focus",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 25,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 5
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 7
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-51383c55-338",
        "topologySignature": "top1-45174910-112",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Chave em dupla: obter abertura permanente no desvio antes de partir.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": null,
            "goalRegion": [
              5
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              3,
              7,
              11
            ]
          },
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 0
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 1,
            "to": 2,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 26,
    "chapter": 2,
    "topologySignature": "top1-45174910-112",
    "originNumber": 137,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 137,
      "id": "sintonia-0137",
      "version": 1,
      "reason": "Chave em dupla: obter abertura permanente no desvio antes de partir."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Terminar sobre uma chave libera permanentemente a cancela com o mesmo símbolo."
  },
  {
    "id": "sintonia-0126",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          5,
          6,
          7,
          11,
          15
        ],
        "start": 5,
        "goal": 15,
        "keys": [
          {
            "id": "prepare",
            "cell": 1
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          4,
          7,
          9,
          10,
          11
        ],
        "start": 2,
        "goal": 3,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "unequal-loop",
      "wall-adjust"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0126:0",
    "difficulty": 1,
    "solution": [
      "up",
      "down",
      "right",
      "right",
      "down",
      "left",
      "down",
      "left"
    ],
    "signature": "st1-338284d8-341",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "focus",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 74,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "key-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 1,
            "commit": null,
            "goalRegion": [
              15
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              3,
              7,
              10,
              11,
              9
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              5,
              1
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              6,
              7
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              11,
              15
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              1,
              4
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 1
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 9,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 30,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar prioridade da preparação permanente.",
      "role": "compact",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 30,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-338284d8-341",
        "topologySignature": "top1-fc0ff429-117",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar prioridade da preparação permanente.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 1,
            "commit": null,
            "goalRegion": [
              15
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 15
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              3,
              7,
              10,
              11,
              9
            ]
          },
          "controls": [],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 1
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 27,
    "chapter": 2,
    "topologySignature": "top1-fc0ff429-117",
    "originNumber": 126,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 126,
      "id": "sintonia-0126",
      "version": 1,
      "reason": "Consolidar prioridade da preparação permanente."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0115",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8
        ],
        "start": 1,
        "goal": 0,
        "plates": [
          {
            "id": "support",
            "cell": 3
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 0,
        "goal": 6,
        "gates": [
          {
            "id": "plate-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "intermediate-stop",
      "priority-change"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0115:0",
    "difficulty": 1,
    "solution": [
      "right",
      "down",
      "left",
      "left",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-fcd0ea7c-332",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "revisit",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 7,
      "optimal": true,
      "visited": 44,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 7,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 3
              }
            ],
            "crossingCommands": [
              6
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 5,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 2,
        "directionChanges": 5,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 10,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada de placa explicita que a ajuda temporária ainda depende do ocupante.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 10,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-fcd0ea7c-332",
        "topologySignature": "top1-beb4981f-110",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomada de placa explicita que a ajuda temporária ainda depende do ocupante.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 6. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 3
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 28,
    "chapter": 2,
    "topologySignature": "top1-beb4981f-110",
    "originNumber": 115,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 115,
      "id": "sintonia-0115",
      "version": 1,
      "reason": "Retomada de placa explicita que a ajuda temporária ainda depende do ocupante."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0128",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          3,
          4,
          5,
          6,
          7,
          8,
          10,
          12,
          14,
          15
        ],
        "start": 3,
        "goal": 4,
        "keys": [
          {
            "id": "prepare",
            "cell": 14
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          5,
          6,
          7,
          8,
          10
        ],
        "start": 7,
        "goal": 1,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 8,
            "to": 5,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "waiting-place",
      "intermediate-stop"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0128:0",
    "difficulty": 1,
    "solution": [
      "down",
      "left",
      "down",
      "down",
      "up",
      "right",
      "up",
      "up",
      "left",
      "left"
    ],
    "signature": "st1-54fb0683-350",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "focus",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 121,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "key-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 14,
            "commit": null,
            "goalRegion": [
              4
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              5,
              2,
              1
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              7,
              6,
              10,
              14
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              6,
              5
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              5,
              4
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              8,
              5
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 14
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 4,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 16,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Planejar preparação e chegada depois de adquirir a chave.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 16,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-54fb0683-350",
        "topologySignature": "top1-199f7f7b-121",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Planejar preparação e chegada depois de adquirir a chave.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 14,
            "commit": null,
            "goalRegion": [
              4
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 4
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              5,
              2,
              1
            ]
          },
          "controls": [],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 14
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 8,
            "to": 5,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 29,
    "chapter": 2,
    "topologySignature": "top1-199f7f7b-121",
    "originNumber": 128,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 128,
      "id": "sintonia-0128",
      "version": 1,
      "reason": "Planejar preparação e chegada depois de adquirir a chave."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0122",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          3,
          4,
          5,
          7,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 4,
        "switches": [
          {
            "id": "prepare",
            "cell": 7,
            "group": "prepare"
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          5,
          7,
          8,
          9,
          10,
          11,
          13
        ],
        "start": 7,
        "goal": 13,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "wall-adjust",
      "priority-change"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0122:0",
    "difficulty": 1,
    "solution": [
      "up",
      "down",
      "left",
      "left",
      "up",
      "left",
      "down",
      "down"
    ],
    "signature": "st1-d71f4304-384",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "compact",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 119,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 7,
            "commit": null,
            "goalRegion": [
              4
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              9,
              13,
              8,
              5,
              1,
              0
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              11,
              7
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              9,
              5
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              5,
              4
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              11,
              10
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 3,
        "directionChanges": 5,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 9,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar interruptor, cuja configuração pode ser revertida ao contrário da chave.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 9,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-d71f4304-384",
        "topologySignature": "top1-86eafed5-115",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomar interruptor, cuja configuração pode ser revertida ao contrário da chave.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 7,
            "commit": null,
            "goalRegion": [
              4
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 4
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              9,
              13,
              8,
              5,
              1,
              0
            ]
          },
          "controls": [],
          "goal": 13
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 7,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 30,
    "chapter": 2,
    "topologySignature": "top1-86eafed5-115",
    "originNumber": 122,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 122,
      "id": "sintonia-0122",
      "version": 1,
      "reason": "Retomar interruptor, cuja configuração pode ser revertida ao contrário da chave."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0151",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 7,
        "goal": 8,
        "plates": [
          {
            "id": "support",
            "cell": 2
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          4,
          6,
          7,
          8,
          10,
          12,
          14
        ],
        "start": 12,
        "goal": 6,
        "gates": [
          {
            "id": "plate-gate",
            "from": 4,
            "to": 0,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 12,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          7,
          8,
          9
        ],
        "start": 3,
        "goal": 7,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 7
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Agora são 3 animais com o mesmo comando. Nenhuma regra nova: Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0151:0",
    "difficulty": 2,
    "solution": [
      "right",
      "down",
      "up",
      "up",
      "up",
      "right",
      "down",
      "right",
      "down"
    ],
    "signature": "st1-42588e08-549",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "plate",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 455,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 2
              }
            ],
            "crossingCommands": [
              5
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 7
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 3,
            "waited": 6,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          true,
          false,
          true
        ],
        "unequalLoops": 17,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 33,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Primeiro trio com placas já conhecidas; somente a quantidade de responsabilidades é nova.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 33,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-42588e08-549",
        "topologySignature": "top1-58f5ced3-169",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Primeiro trio com placas já conhecidas; somente a quantidade de responsabilidades é nova.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 8
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 5; auxiliary-gate-2 nos comandos 3. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 6
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 2
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 4,
            "to": 0,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 12,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 31,
    "chapter": 3,
    "topologySignature": "top1-58f5ced3-169",
    "originNumber": 151,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 151,
      "id": "sintonia-0151",
      "version": 1,
      "reason": "Primeiro trio com placas já conhecidas; somente a quantidade de responsabilidades é nova."
    },
    "actorIntroduction": 3
  },
  {
    "id": "sintonia-0161",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          8,
          9,
          11
        ],
        "start": 3,
        "goal": 11,
        "switches": [
          {
            "id": "prepare",
            "cell": 6,
            "group": "prepare"
          }
        ],
        "gates": [
          {
            "id": "contributor-gate-2",
            "from": 5,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "contributor-2",
              "value": true
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 0,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          8
        ],
        "start": 1,
        "goal": 8,
        "switches": [
          {
            "id": "contributor-2",
            "cell": 0,
            "group": "contributor-2"
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "waiting-place",
      "final-command"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0161:0",
    "difficulty": 2,
    "solution": [
      "down",
      "left",
      "right",
      "up",
      "up",
      "right",
      "right",
      "down",
      "down",
      "down"
    ],
    "signature": "st1-0b4749eb-630",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "switch",
      "secondary": null,
      "role": "mix",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 1556,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 6,
            "commit": null,
            "goalRegion": [
              11
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              5,
              2,
              8
            ]
          },
          {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 0,
            "goalRegion": [
              2,
              5,
              3,
              8,
              7,
              6
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              6
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              2,
              5
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              8,
              11
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              3,
              4
            ]
          },
          {
            "board": 2,
            "role": "prepare",
            "cells": [
              0
            ]
          },
          {
            "board": 0,
            "role": "contributor-exit",
            "edge": [
              5,
              2
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          },
          {
            "fromBoard": 2,
            "toBoard": 0,
            "control": "contributor-2",
            "role": "prepare-separate-cut"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "contributor-gate-2",
            "receiverBoard": 0,
            "condition": {
              "type": "switch",
              "id": "contributor-2",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "contributor-2",
                "board": 2,
                "cell": 0
              }
            ],
            "crossingCommands": [
              8
            ]
          },
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 6
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 6,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 5,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 5,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 32,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar trio com preparação de interruptor e tarefas distintas.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 32,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-0b4749eb-630",
        "topologySignature": "top1-9b6f4afa-161",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar trio com preparação de interruptor e tarefas distintas.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 6,
            "commit": null,
            "goalRegion": [
              11
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              5,
              2,
              8
            ]
          },
          "controls": [],
          "goal": 8
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 0,
            "goalRegion": [
              2,
              5,
              3,
              8,
              7,
              6
            ]
          },
          "controls": [
            {
              "id": "contributor-2",
              "type": "switch",
              "receiverBoard": 0
            }
          ],
          "goal": 8
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 6,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "contributor-gate-2",
          "definition": {
            "id": "contributor-gate-2",
            "from": 5,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "contributor-2",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "contributor-2",
              "value": true
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "switches",
          "id": "contributor-2",
          "definition": {
            "id": "contributor-2",
            "cell": 0,
            "group": "contributor-2"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 32,
    "chapter": 3,
    "topologySignature": "top1-9b6f4afa-161",
    "originNumber": 161,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 161,
      "id": "sintonia-0161",
      "version": 1,
      "reason": "Consolidar trio com preparação de interruptor e tarefas distintas."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0165",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          3,
          5,
          6,
          7,
          11,
          14,
          15
        ],
        "start": 15,
        "goal": 5,
        "keys": [
          {
            "id": "prepare",
            "cell": 3
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          4,
          8,
          10,
          11,
          12,
          13,
          14
        ],
        "start": 4,
        "goal": 14,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 8,
            "to": 12,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "unequal-loop",
      "intermediate-stop"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0165:0",
    "difficulty": 2,
    "solution": [
      "up",
      "up",
      "up",
      "down",
      "down",
      "right",
      "right",
      "up",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-c01f3d1b-336",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "revisit",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 57,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "key-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 3,
            "commit": null,
            "goalRegion": [
              5
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              12,
              13,
              14,
              10,
              11
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              15,
              11,
              7,
              3
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              7,
              6
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              6,
              5
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              8,
              12
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 3
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 5,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 12,
        "directionChanges": 5,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada de dupla com chave separa quantidade de animais de dificuldade.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-c01f3d1b-336",
        "topologySignature": "top1-0ce0f3d4-109",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomada de dupla com chave separa quantidade de animais de dificuldade.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 3,
            "commit": null,
            "goalRegion": [
              5
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              12,
              13,
              14,
              10,
              11
            ]
          },
          "controls": [],
          "goal": 14
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 3
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 8,
            "to": 12,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 33,
    "chapter": 3,
    "topologySignature": "top1-0ce0f3d4-109",
    "originNumber": 165,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 165,
      "id": "sintonia-0165",
      "version": 1,
      "reason": "Retomada de dupla com chave separa quantidade de animais de dificuldade."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0176",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          5,
          6,
          7,
          8,
          9,
          13,
          18
        ],
        "start": 8,
        "goal": 6,
        "boxes": [
          {
            "id": "box0",
            "cell": 13
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 18
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "start": 7,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "final-command",
      "unequal-loop"
    ],
    "name": "Um apoio que fica",
    "lesson": "Empurre uma caixa por vez. Uma caixa pode sustentar uma placa; só bloqueia quando não pode ser empurrada. Deixe um apoio preparado para liberar quem precisa continuar.",
    "discovery": "Aqui o jogador precisa descobrir que uma caixa pode sustentar a condição enquanto o animal segue para outra tarefa.",
    "hints": [
      "A caixa pode substituir um animal sobre a placa.",
      "Empurre o peso até o apoio e preserve um caminho para sair.",
      "Peça uma dica concreta para a configuração atual."
    ],
    "generatorVersion": 2,
    "seed": "sintonia-campaign-v1:0176:0",
    "difficulty": 2,
    "solution": [
      "down",
      "up",
      "up",
      "left",
      "left",
      "left",
      "right",
      "down"
    ],
    "signature": "st1-e4dd32cd-365",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [
      "box"
    ],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "focus"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 53,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que uma caixa pode sustentar a condição enquanto o animal segue para outra tarefa.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 7,
        "directionChanges": 4,
        "earlyTurns": 1,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 22,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 22,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-e4dd32cd-365",
        "topologySignature": "top1-f85535ae-107",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "decision": "retain-logical-definition",
      "retentionReason": "A caixa assume a placa e libera seu animal: um empurrão introdutório com função de acesso.",
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 13
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 18
            },
            "pushes": [
              {
                "command": 1,
                "direction": "down",
                "board": 0,
                "from": 13,
                "to": 18
              }
            ],
            "directionChanges": 0,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 1,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 5,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 18
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 4,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "curriculumReason": "A caixa assume a placa e libera seu animal: um empurrão introdutório com função de acesso.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate weight para painel 1. Aproveitar weight-gate nos comandos 5. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 6
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 13
          },
          "role": [
            "gate-support"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 18
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 34,
    "chapter": 3,
    "topologySignature": "top1-f85535ae-107",
    "contentRevision": "sintonia-content-3",
    "originNumber": 176,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 176,
      "id": "sintonia-0176",
      "version": 1,
      "reason": "A caixa assume a placa e libera seu animal: um empurrão introdutório com função de acesso."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Empurre uma caixa por vez. Uma caixa pode sustentar uma placa; só bloqueia quando não pode ser empurrada."
  },
  {
    "id": "sintonia-0179",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          3,
          6,
          7,
          8,
          9,
          11,
          12,
          13,
          16,
          17,
          18
        ],
        "start": 13,
        "goal": 9,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 6
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 8,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-11",
            "from": 17,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-13",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 2,
        "walkable": [
          0,
          2,
          3,
          4
        ],
        "start": 4,
        "goal": 3,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 2
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 2,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "priority-change",
      "waiting-place"
    ],
    "name": "A face certa",
    "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
    "hints": [
      "Compare a posição da placa com as faces da caixa.",
      "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
      "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0179:0",
    "difficulty": 2,
    "solution": [
      "down",
      "left",
      "up",
      "right",
      "up",
      "up",
      "down",
      "left",
      "right",
      "right"
    ],
    "signature": "st1-52505dd0-765",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "compact",
      "pattern": "turn-and-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 134,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "turn-and-support",
        "name": "A face certa",
        "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
        "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
        "hints": [
          "Compare a posição da placa com as faces da caixa.",
          "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
          "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 6
            },
            "pushes": [
              {
                "command": 3,
                "direction": "up",
                "board": 0,
                "from": 12,
                "to": 7
              },
              {
                "command": 8,
                "direction": "left",
                "board": 0,
                "from": 7,
                "to": 6
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 8,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "helper-exit-1",
                "receiverBoard": 1
              },
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 6
              }
            ],
            "crossingCommands": [
              10
            ]
          },
          {
            "gateId": "prepare-cut-11",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 2
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 2
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-13",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 2
              }
            ],
            "crossingCommands": [
              8
            ]
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 6
              }
            ],
            "crossingCommands": [
              9
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 6,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 9,
        "directionChanges": 7,
        "earlyTurns": 2,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Mudar de face orienta a caixa para um apoio necessário.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-52505dd0-765",
        "topologySignature": "top1-eabf0829-114",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Mudar de face orienta a caixa para um apoio necessário.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 9
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 6
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 8,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-11",
          "definition": {
            "id": "prepare-cut-11",
            "from": 17,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-13",
          "definition": {
            "id": "prepare-cut-13",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 2
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 2,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 35,
    "chapter": 3,
    "topologySignature": "top1-eabf0829-114",
    "originNumber": 179,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 179,
      "id": "sintonia-0179",
      "version": 1,
      "reason": "Mudar de face orienta a caixa para um apoio necessário."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0177",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 5,
        "walkable": [
          2,
          7,
          11,
          12,
          13,
          15,
          16,
          17,
          18,
          22,
          23
        ],
        "start": 7,
        "goal": 15,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 7
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-11",
            "from": 18,
            "to": 23,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 17,
            "to": 22,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          5
        ],
        "start": 0,
        "goal": 4,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 1
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          7
        ],
        "start": 2,
        "goal": 7,
        "plates": [
          {
            "id": "prepare-2",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-2",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "priority-change",
      "waiting-place"
    ],
    "name": "Guardar para recuperar",
    "lesson": "Afaste a caixa primeiro para alcançar o outro lado e trazê-la de volta ao apoio.",
    "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
    "hints": [
      "A placa está atrás da posição inicial da caixa.",
      "O primeiro estacionamento precisa permitir contornar; um canto terminal perde a recuperação.",
      "Entre na área de contorno, alcance a face oposta e traga a caixa de volta para sustentar a saída."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0177:0",
    "difficulty": 2,
    "solution": [
      "down",
      "right",
      "down",
      "down",
      "right",
      "left",
      "up",
      "up",
      "down",
      "down",
      "left",
      "left"
    ],
    "signature": "st1-2ca975ca-876",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "box",
      "secondary": null,
      "role": "mix",
      "pattern": "park-and-retrieve"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 634,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "park-and-retrieve",
        "name": "Guardar para recuperar",
        "lesson": "Afaste a caixa primeiro para alcançar o outro lado e trazê-la de volta ao apoio.",
        "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
        "hints": [
          "A placa está atrás da posição inicial da caixa.",
          "O primeiro estacionamento precisa permitir contornar; um canto terminal perde a recuperação.",
          "Entre na área de contorno, alcance a face oposta e traga a caixa de volta para sustentar a saída."
        ],
        "boxRoles": [
          "liberar-acesso",
          "estacionar-provisoriamente",
          "recuperar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 12,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 7
            },
            "pushes": [
              {
                "command": 1,
                "direction": "down",
                "board": 0,
                "from": 12,
                "to": 17
              },
              {
                "command": 7,
                "direction": "up",
                "board": 0,
                "from": 17,
                "to": 12
              },
              {
                "command": 8,
                "direction": "up",
                "board": 0,
                "from": 12,
                "to": 7
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 8,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "helper-exit-1",
                "receiverBoard": 1
              },
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "helper-exit-2",
                "receiverBoard": 2
              },
              {
                "command": 12,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "prepare-cut-11",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 1
              }
            ],
            "crossingCommands": [
              4
            ]
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 1
              }
            ],
            "crossingCommands": [
              7
            ]
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "helper-exit-2",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              10
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 3,
            "waited": 9,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 25,
        "directionChanges": 7,
        "earlyTurns": 3,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 40,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Estacionar e recuperar preserva a face de empurrão: decisão da antiga 177.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 40,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-2ca975ca-876",
        "topologySignature": "top1-c3740c33-156",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Estacionar e recuperar preserva a face de empurrão: decisão da antiga 177.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 15
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 4
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "liberar-acesso",
            "estacionar-provisoriamente",
            "recuperar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-11",
          "definition": {
            "id": "prepare-cut-11",
            "from": 18,
            "to": 23,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 17,
            "to": 22,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "prepare-2",
          "definition": {
            "id": "prepare-2",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit-2",
          "definition": {
            "id": "helper-exit-2",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 36,
    "chapter": 3,
    "topologySignature": "top1-c3740c33-156",
    "originNumber": 177,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 177,
      "id": "sintonia-0177",
      "version": 1,
      "reason": "Estacionar e recuperar preserva a face de empurrão: decisão da antiga 177."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0193",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          2,
          3,
          6,
          7,
          8,
          9,
          11,
          12,
          13,
          16,
          17
        ],
        "start": 13,
        "goal": 6,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 6
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 8,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ],
        "keys": [
          {
            "id": "release-key",
            "cell": 9
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          1,
          3,
          4,
          5
        ],
        "start": 3,
        "goal": 1,
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "dual-use-object",
    "secondaryFamilies": [
      "goal-transit",
      "waiting-place"
    ],
    "name": "O apoio já cumpriu seu papel",
    "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
    "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
    "hints": [
      "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
      "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
      "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0193:0",
    "difficulty": 2,
    "solution": [
      "left",
      "down",
      "left",
      "up",
      "right",
      "up",
      "right",
      "right",
      "left",
      "up",
      "left",
      "left",
      "down",
      "down",
      "up"
    ],
    "signature": "st1-8b4fb442-507",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "compact",
      "pattern": "support-then-release"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 15,
      "optimal": true,
      "visited": 279,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "support-then-release",
        "name": "O apoio já cumpriu seu papel",
        "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
        "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
        "hints": [
          "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
          "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
          "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar",
          "liberar-destino"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Esperar a chave obtida com apoio e atravessar a passagem permanente."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 15,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 16
            },
            "pushes": [
              {
                "command": 1,
                "direction": "left",
                "board": 0,
                "from": 12,
                "to": 11
              },
              {
                "command": 4,
                "direction": "up",
                "board": 0,
                "from": 11,
                "to": 6
              },
              {
                "command": 13,
                "direction": "down",
                "board": 0,
                "from": 6,
                "to": 11
              },
              {
                "command": 14,
                "direction": "down",
                "board": 0,
                "from": 11,
                "to": 16
              }
            ],
            "directionChanges": 2,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 4,
                "plateId": "weight"
              }
            ],
            "plateReleases": [
              {
                "command": 13,
                "plateId": "weight",
                "afterGateSupport": true
              }
            ],
            "supportUses": [
              {
                "command": 8,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              },
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "release-after-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 6
              }
            ],
            "crossingCommands": [
              8,
              9
            ]
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "controllers": [
              {
                "type": "key",
                "id": "release-key",
                "board": 0,
                "cell": 9
              }
            ],
            "crossingCommands": [
              10,
              13,
              15
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 15,
            "waited": 0,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 9,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "key",
          "key-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          true,
          true
        ],
        "unequalLoops": 17,
        "directionChanges": 11,
        "earlyTurns": 4,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 43,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Apoiar e depois retirar libera o destino, em dupla.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 43,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-8b4fb442-507",
        "topologySignature": "top1-23e953c5-113",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Apoiar e depois retirar libera o destino, em dupla.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "release-key",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 6
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Esperar a chave obtida com apoio e atravessar a passagem permanente.",
          "controls": [],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar",
            "liberar-destino"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 6
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "keys",
          "id": "release-key",
          "definition": {
            "id": "release-key",
            "cell": 9
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 8,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              8,
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "crossings": [
              10,
              13,
              15
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 37,
    "chapter": 3,
    "topologySignature": "top1-23e953c5-113",
    "originNumber": 193,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 193,
      "id": "sintonia-0193",
      "version": 1,
      "reason": "Apoiar e depois retirar libera o destino, em dupla."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0201",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          3,
          4,
          5,
          7,
          9,
          10,
          11,
          14,
          15
        ],
        "start": 3,
        "goal": 15,
        "ice": [
          7
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8,
          9,
          10
        ],
        "start": 2,
        "goal": 5
      }
    ],
    "mechanics": [
      "walls",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "waiting-place",
      "priority-change"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Ao entrar no gelo, o animal segue na direção da seta até o primeiro piso comum ou bloqueio. Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0201:0",
    "difficulty": 2,
    "solution": [
      "down",
      "left",
      "down",
      "right"
    ],
    "signature": "st1-6c646f55-233",
    "prerequisites": [
      "walls"
    ],
    "introduction": [
      "ice"
    ],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "ice",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 4,
      "optimal": true,
      "visited": 77,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 4,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 4,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 2,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 2,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 3,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 31,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Gelo em dupla: só a posição final do deslizamento conta.",
      "role": "focus",
      "prerequisiteChapters": [
        1
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 31,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-6c646f55-233",
        "topologySignature": "top1-69b70bda-124",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Gelo em dupla: só a posição final do deslizamento conta.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 15
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "ice",
          "id": "ice-0",
          "definition": 7,
          "role": "Prolonga o movimento até piso comum ou bloqueio.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 38,
    "chapter": 3,
    "topologySignature": "top1-69b70bda-124",
    "originNumber": 201,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 201,
      "id": "sintonia-0201",
      "version": 1,
      "reason": "Gelo em dupla: só a posição final do deslizamento conta."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Ao entrar no gelo, o animal segue na direção da seta até o primeiro piso comum ou bloqueio."
  },
  {
    "id": "sintonia-0204",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8
        ],
        "start": 2,
        "goal": 6,
        "ice": [
          3
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 3,
        "goal": 2
      }
    ],
    "mechanics": [
      "walls",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "waiting-place",
      "final-command"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0204:0",
    "difficulty": 2,
    "solution": [
      "down",
      "left",
      "up",
      "left",
      "down"
    ],
    "signature": "st1-f47e2811-224",
    "prerequisites": [
      "walls",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "ice",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 5,
      "optimal": true,
      "visited": 77,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 5,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 2,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 1,
        "directionChanges": 4,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 8,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar a parada em piso comum ou bloqueio.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 8,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-f47e2811-224",
        "topologySignature": "top1-927186c6-118",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar a parada em piso comum ou bloqueio.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Avançar em cada comando enquanto os parceiros usam esperas. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 6
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "ice",
          "id": "ice-0",
          "definition": 3,
          "role": "Prolonga o movimento até piso comum ou bloqueio.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 39,
    "chapter": 3,
    "topologySignature": "top1-927186c6-118",
    "originNumber": 204,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 204,
      "id": "sintonia-0204",
      "version": 1,
      "reason": "Consolidar a parada em piso comum ou bloqueio."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0157",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          9,
          10
        ],
        "start": 7,
        "goal": 9,
        "plates": [
          {
            "id": "support",
            "cell": 10
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          5,
          9,
          10,
          12,
          13
        ],
        "start": 12,
        "goal": 10,
        "gates": [
          {
            "id": "plate-gate",
            "from": 9,
            "to": 10,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 13,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 4,
        "goal": 6,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 1
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "intermediate-stop",
      "final-command"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0157:0",
    "difficulty": 2,
    "solution": [
      "left",
      "right",
      "up",
      "up",
      "up",
      "down",
      "down",
      "down",
      "right",
      "up",
      "left",
      "down",
      "left"
    ],
    "signature": "st1-fde89c4c-539",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "plate",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 193,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 10
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 1
              }
            ],
            "crossingCommands": [
              4
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 10,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 20,
        "directionChanges": 8,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 15,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar três responsabilidades sem acumular gelo e novidade.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 15,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-fde89c4c-539",
        "topologySignature": "top1-ee50c45d-167",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomar três responsabilidades sem acumular gelo e novidade.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 9
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 9; auxiliary-gate-2 nos comandos 4. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 10
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 10
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 9,
            "to": 10,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 13,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 40,
    "chapter": 3,
    "topologySignature": "top1-ee50c45d-167",
    "originNumber": 157,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 157,
      "id": "sintonia-0157",
      "version": 1,
      "reason": "Retomar três responsabilidades sem acumular gelo e novidade."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0212",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          5,
          6,
          7,
          9,
          11
        ],
        "start": 11,
        "goal": 0,
        "ice": [
          6
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8
        ],
        "start": 1,
        "goal": 7
      }
    ],
    "mechanics": [
      "walls",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "waiting-place",
      "final-command"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0212:0",
    "difficulty": 2,
    "solution": [
      "up",
      "right",
      "left",
      "up",
      "right",
      "left",
      "down",
      "down"
    ],
    "signature": "st1-1b38c043-216",
    "prerequisites": [
      "walls",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "ice",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 38,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 4,
            "waited": 4,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 10,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 21,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Outro ponto de parada do gelo muda a preparação da chegada.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 21,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-1b38c043-216",
        "topologySignature": "top1-f15277e6-108",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Outro ponto de parada do gelo muda a preparação da chegada.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "ice",
          "id": "ice-0",
          "definition": 6,
          "role": "Prolonga o movimento até piso comum ou bloqueio.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 41,
    "chapter": 3,
    "topologySignature": "top1-f15277e6-108",
    "originNumber": 212,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 212,
      "id": "sintonia-0212",
      "version": 1,
      "reason": "Outro ponto de parada do gelo muda a preparação da chegada."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0247",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 6,
        "walkable": [
          0,
          1,
          4,
          5,
          6,
          7,
          11,
          12,
          13,
          16,
          17
        ],
        "start": 12,
        "goal": 0,
        "portals": [
          {
            "id": "preparation-portal",
            "a": 13,
            "b": 16
          }
        ],
        "keys": [
          {
            "id": "prepare",
            "cell": 4
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          9,
          11,
          12,
          13,
          14,
          15
        ],
        "start": 12,
        "goal": 9,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 13,
            "to": 9,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "portal"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "waiting-place",
    "secondaryFamilies": [
      "wall-adjust",
      "final-command"
    ],
    "name": "Do outro lado",
    "lesson": "Entrar em um portal leva ao seu par no mesmo tabuleiro e encerra aquele deslocamento. Use a entrada e a saída do portal para preparar o alinhamento conjunto.",
    "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
    "hints": [
      "Os dois portais com o mesmo símbolo formam um par neste tabuleiro.",
      "Entrar no portal encerra esse deslocamento na saída; prepare a posição dos outros animais antes da entrada.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0247:0",
    "difficulty": 2,
    "solution": [
      "right",
      "right",
      "up",
      "up",
      "right",
      "left",
      "right",
      "down",
      "down",
      "left",
      "up",
      "left",
      "up"
    ],
    "signature": "st1-ee0ede4a-413",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [
      "portal"
    ],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "portal",
      "secondary": null,
      "role": "compact",
      "pattern": "portal-retrieve-and-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 172,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "portal-retrieve-and-return",
        "discovery": "o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial",
        "roles": [
          {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              0
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              9,
              5,
              6,
              4,
              2,
              0,
              3
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "reorganize-access",
            "cells": [
              13,
              16
            ]
          },
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              4
            ]
          },
          {
            "board": 0,
            "role": "return-home",
            "cells": [
              0
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "unlock-recipient"
          }
        ],
        "order": [
          "enter-portal",
          "retrieve-key",
          "return-through-portal",
          "joint-arrival"
        ],
        "counterfactual": "Without the portal the key component is disconnected. Fixing the key gate open removes the need to retrieve and return.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              13
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 12,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "portal"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 12,
        "directionChanges": 9,
        "earlyTurns": 5,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 30,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Portal em dupla: transportar dentro do painel para preparar a chave e retornar.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 30,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-ee0ede4a-413",
        "topologySignature": "top1-27d19c16-133",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Portal em dupla: transportar dentro do painel para preparar a chave e retornar.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              0
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              9,
              5,
              6,
              4,
              2,
              0,
              3
            ]
          },
          "controls": [],
          "goal": 9
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 4
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "portals",
          "id": "preparation-portal",
          "definition": {
            "id": "preparation-portal",
            "a": 13,
            "b": 16
          },
          "role": "Transporta uma vez dentro do painel e encerra o deslocamento.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 13,
            "to": 9,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              13
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 42,
    "chapter": 3,
    "topologySignature": "top1-27d19c16-133",
    "originNumber": 247,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 247,
      "id": "sintonia-0247",
      "version": 1,
      "reason": "Portal em dupla: transportar dentro do painel para preparar a chave e retornar."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Entrar em um portal leva ao seu par no mesmo tabuleiro e encerra aquele deslocamento."
  },
  {
    "id": "sintonia-0237",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 6,
        "walkable": [
          0,
          1,
          4,
          5,
          6,
          7,
          10,
          11,
          12,
          16,
          17
        ],
        "start": 0,
        "goal": 12,
        "portals": [
          {
            "id": "preparation-portal",
            "a": 1,
            "b": 4
          }
        ],
        "keys": [
          {
            "id": "prepare",
            "cell": 17
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          10,
          11,
          16,
          17,
          18,
          23
        ],
        "start": 18,
        "goal": 6,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 17,
            "to": 16,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "portal"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "waiting-place",
    "secondaryFamilies": [
      "axis-order",
      "final-command"
    ],
    "name": "Do outro lado",
    "lesson": "Use a entrada e a saída do portal para preparar o alinhamento conjunto.",
    "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
    "hints": [
      "Os dois portais com o mesmo símbolo formam um par neste tabuleiro.",
      "Entrar no portal encerra esse deslocamento na saída; prepare a posição dos outros animais antes da entrada.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0237:0",
    "difficulty": 2,
    "solution": [
      "right",
      "right",
      "down",
      "down",
      "up",
      "left",
      "left",
      "up",
      "up",
      "up",
      "right",
      "down",
      "left",
      "down"
    ],
    "signature": "st1-b5319ab7-415",
    "prerequisites": [
      "walls",
      "key",
      "portal"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "portal",
      "secondary": null,
      "role": "compact",
      "pattern": "portal-retrieve-and-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 14,
      "optimal": true,
      "visited": 132,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "portal-retrieve-and-return",
        "discovery": "o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial",
        "roles": [
          {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              12
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              16,
              11,
              10,
              6,
              1,
              2,
              0,
              3
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "reorganize-access",
            "cells": [
              1,
              4
            ]
          },
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              17
            ]
          },
          {
            "board": 0,
            "role": "return-home",
            "cells": [
              12
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "unlock-recipient"
          }
        ],
        "order": [
          "enter-portal",
          "retrieve-key",
          "return-through-portal",
          "joint-arrival"
        ],
        "counterfactual": "Without the portal the key component is disconnected. Fixing the key gate open removes the need to retrieve and return.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 14,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 17
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 4,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 10,
            "waited": 4,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "portal"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 10,
        "directionChanges": 8,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 42,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar ida e volta pelo portal com a preparação permanente.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 42,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-b5319ab7-415",
        "topologySignature": "top1-5b78e195-133",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar ida e volta pelo portal com a preparação permanente.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              12
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 12
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              16,
              11,
              10,
              6,
              1,
              2,
              0,
              3
            ]
          },
          "controls": [],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 17
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "portals",
          "id": "preparation-portal",
          "definition": {
            "id": "preparation-portal",
            "a": 1,
            "b": 4
          },
          "role": "Transporta uma vez dentro do painel e encerra o deslocamento.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 17,
            "to": 16,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 43,
    "chapter": 3,
    "topologySignature": "top1-5b78e195-133",
    "originNumber": 237,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 237,
      "id": "sintonia-0237",
      "version": 1,
      "reason": "Consolidar ida e volta pelo portal com a preparação permanente."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0187",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          2,
          5,
          6,
          7,
          8,
          11,
          12,
          13,
          16,
          17,
          18
        ],
        "start": 11,
        "goal": 5,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 8
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 6,
            "to": 5,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-11",
            "from": 17,
            "to": 18,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 13,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-13",
            "from": 7,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          4,
          5
        ],
        "start": 5,
        "goal": 1,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "wall-adjust",
      "intermediate-stop"
    ],
    "name": "A face certa",
    "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
    "hints": [
      "Compare a posição da placa com as faces da caixa.",
      "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
      "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0187:0",
    "difficulty": 2,
    "solution": [
      "down",
      "right",
      "up",
      "down",
      "left",
      "up",
      "up",
      "right",
      "down",
      "up",
      "left",
      "left"
    ],
    "signature": "st1-94d35624-767",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "compact",
      "pattern": "turn-and-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 291,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "turn-and-support",
        "name": "A face certa",
        "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
        "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
        "hints": [
          "Compare a posição da placa com as faces da caixa.",
          "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
          "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 12,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 8
            },
            "pushes": [
              {
                "command": 3,
                "direction": "up",
                "board": 0,
                "from": 12,
                "to": 7
              },
              {
                "command": 8,
                "direction": "right",
                "board": 0,
                "from": 7,
                "to": 8
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 8,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 12,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "prepare-cut-11",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-13",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              8
            ]
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": []
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 12,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 6,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 12,
        "directionChanges": 9,
        "earlyTurns": 5,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 92,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar orientação e apoio da caixa entre problemas de portal.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 92,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-94d35624-767",
        "topologySignature": "top1-38008bbd-115",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomar orientação e apoio da caixa entre problemas de portal.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 8
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 6,
            "to": 5,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-11",
          "definition": {
            "id": "prepare-cut-11",
            "from": 17,
            "to": 18,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 13,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-13",
          "definition": {
            "id": "prepare-cut-13",
            "from": 7,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 44,
    "chapter": 3,
    "topologySignature": "top1-38008bbd-115",
    "originNumber": 187,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 187,
      "id": "sintonia-0187",
      "version": 1,
      "reason": "Retomar orientação e apoio da caixa entre problemas de portal."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0231",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          12,
          13,
          14,
          15,
          16,
          17
        ],
        "start": 0,
        "goal": 2,
        "portals": [
          {
            "id": "preparation-portal",
            "a": 3,
            "b": 12
          }
        ],
        "keys": [
          {
            "id": "prepare",
            "cell": 17
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          1,
          2,
          3,
          7,
          8,
          9,
          10,
          11,
          14
        ],
        "start": 8,
        "goal": 3,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 9,
            "to": 10,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          {
            "id": "contributor-gate-2",
            "from": 9,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          8
        ],
        "start": 3,
        "goal": 1,
        "keys": [
          {
            "id": "contributor-2",
            "cell": 8
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "portal"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "waiting-place",
    "secondaryFamilies": [
      "wall-adjust",
      "priority-change"
    ],
    "name": "Do outro lado",
    "lesson": "Use a entrada e a saída do portal para preparar o alinhamento conjunto.",
    "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
    "hints": [
      "Os dois portais com o mesmo símbolo formam um par neste tabuleiro.",
      "Entrar no portal encerra esse deslocamento na saída; prepare a posição dos outros animais antes da entrada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0231:0",
    "difficulty": 2,
    "solution": [
      "down",
      "right",
      "right",
      "down",
      "left",
      "left",
      "up",
      "right",
      "right",
      "up",
      "right",
      "up",
      "up"
    ],
    "signature": "st1-042ca0ad-612",
    "prerequisites": [
      "walls",
      "key",
      "portal"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "portal",
      "secondary": null,
      "role": "mix",
      "pattern": "portal-retrieve-and-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 797,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "portal-retrieve-and-return",
        "discovery": "o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial",
        "roles": [
          {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              2
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              14,
              11,
              7,
              3,
              2,
              1
            ]
          },
          {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 8,
            "goalRegion": [
              0,
              6,
              1,
              7,
              2,
              5
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "reorganize-access",
            "cells": [
              3,
              12
            ]
          },
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              17
            ]
          },
          {
            "board": 0,
            "role": "return-home",
            "cells": [
              2
            ]
          },
          {
            "board": 2,
            "role": "prepare",
            "cells": [
              8
            ]
          },
          {
            "board": 1,
            "role": "contributor-exit",
            "edge": [
              9,
              8
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "unlock-recipient"
          },
          {
            "fromBoard": 2,
            "toBoard": 1,
            "control": "contributor-2",
            "role": "prepare-separate-cut"
          }
        ],
        "order": [
          "enter-portal",
          "retrieve-key",
          "return-through-portal",
          "joint-arrival"
        ],
        "counterfactual": "Without the portal the key component is disconnected. Fixing the key gate open removes the need to retrieve and return.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 17
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "contributor-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            },
            "controllers": [
              {
                "type": "key",
                "id": "contributor-2",
                "board": 2,
                "cell": 8
              }
            ],
            "crossingCommands": [
              8
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 8,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "portal"
        ],
        "partialBlocks": 12,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 22,
        "directionChanges": 8,
        "earlyTurns": 5,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 42,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Trio com portal: cada acesso possui preparação conhecida.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 42,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-042ca0ad-612",
        "topologySignature": "top1-de4e1bbb-176",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Trio com portal: cada acesso possui preparação conhecida.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "retriever-and-returner",
            "goalRegion": [
              2
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 2
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              10,
              14,
              11,
              7,
              3,
              2,
              1
            ]
          },
          "controls": [],
          "goal": 3
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 8,
            "goalRegion": [
              0,
              6,
              1,
              7,
              2,
              5
            ]
          },
          "controls": [
            {
              "id": "contributor-2",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 17
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "portals",
          "id": "preparation-portal",
          "definition": {
            "id": "preparation-portal",
            "a": 3,
            "b": 12
          },
          "role": "Transporta uma vez dentro do painel e encerra o deslocamento.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 9,
            "to": 10,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "contributor-gate-2",
          "definition": {
            "id": "contributor-gate-2",
            "from": 9,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "contributor-2"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "keys",
          "id": "contributor-2",
          "definition": {
            "id": "contributor-2",
            "cell": 8
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 45,
    "chapter": 3,
    "topologySignature": "top1-de4e1bbb-176",
    "originNumber": 231,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 231,
      "id": "sintonia-0231",
      "version": 1,
      "reason": "Trio com portal: cada acesso possui preparação conhecida."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0268",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          8,
          9,
          10,
          11,
          13
        ],
        "start": 10,
        "goal": 2,
        "keys": [
          {
            "id": "prepare",
            "cell": 13
          }
        ],
        "gates": [],
        "oneWays": [
          {
            "from": 4,
            "to": 0
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          6,
          10,
          11,
          12,
          13,
          15
        ],
        "start": 10,
        "goal": 6,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 11,
            "to": 6,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "oneway"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "unequal-loop",
      "priority-change"
    ],
    "name": "Escolha a travessia",
    "lesson": "A seta na divisória permite atravessar apenas no sentido indicado. Ela não move o animal sozinha. Prepare os outros caminhos antes de cruzar a passagem de sentido único.",
    "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
    "hints": [
      "A seta está na divisória: ela permite cruzar somente no sentido indicado.",
      "Confira o alinhamento dos outros animais antes de atravessar, porque o caminho de volta é limitado.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0268:0",
    "difficulty": 3,
    "solution": [
      "left",
      "down",
      "up",
      "left",
      "up",
      "up",
      "right",
      "up",
      "right"
    ],
    "signature": "st1-b34cdb4b-381",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [
      "oneway"
    ],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "oneway",
      "secondary": null,
      "role": "compact",
      "pattern": "oneway-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 131,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "oneway-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 13,
            "commit": [
              4,
              0
            ],
            "goalRegion": [
              2
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              1,
              2,
              0
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              10,
              9,
              13
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              4,
              0
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              1,
              2
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              11,
              6
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 13
              }
            ],
            "crossingCommands": [
              8
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "oneway"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 10,
        "directionChanges": 7,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Sentido único em dupla: preparar o controle antes de abandonar seu acesso.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 12,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-b34cdb4b-381",
        "topologySignature": "top1-0d4eaf79-122",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Sentido único em dupla: preparar o controle antes de abandonar seu acesso.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 13,
            "commit": [
              4,
              0
            ],
            "goalRegion": [
              2
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 2
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              1,
              2,
              0
            ]
          },
          "controls": [],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 13
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "oneWays",
          "id": "oneWays-0",
          "definition": {
            "from": 4,
            "to": 0
          },
          "role": "Restringe a travessia ao sentido indicado.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 11,
            "to": 6,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 46,
    "chapter": 4,
    "topologySignature": "top1-0d4eaf79-122",
    "originNumber": 268,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 268,
      "id": "sintonia-0268",
      "version": 1,
      "reason": "Sentido único em dupla: preparar o controle antes de abandonar seu acesso."
    },
    "actorIntroduction": null,
    "ruleExplanation": "A seta na divisória permite atravessar apenas no sentido indicado. Ela não move o animal sozinha."
  },
  {
    "id": "sintonia-0399",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 6,
        "goal": 7,
        "keys": [
          {
            "id": "prepare",
            "cell": 4
          }
        ],
        "oneWays": [
          {
            "from": 6,
            "to": 5
          }
        ],
        "gates": [
          {
            "id": "prepared-return",
            "from": 10,
            "to": 9,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          3,
          5,
          6,
          8,
          11,
          12,
          13,
          14,
          18,
          21,
          22,
          23
        ],
        "start": 6,
        "goal": 23,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 11,
            "to": 12,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "oneway"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "goal-transit",
      "unequal-loop"
    ],
    "name": "Escolha a travessia",
    "lesson": "Prepare os outros caminhos antes de cruzar a passagem de sentido único.",
    "discovery": "Aqui o jogador precisa descobrir que depois da passagem de sentido único, o retorno usa uma saída diferente, liberada pela chave.",
    "hints": [
      "A seta está na divisória: ela permite cruzar somente no sentido indicado.",
      "Confira o alinhamento dos outros animais antes de atravessar, porque o caminho de volta é limitado.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0399:0",
    "difficulty": 3,
    "solution": [
      "left",
      "left",
      "right",
      "down",
      "right",
      "right",
      "down",
      "down",
      "left",
      "up",
      "right"
    ],
    "signature": "st1-bd2fcc56-479",
    "prerequisites": [
      "walls",
      "key",
      "oneway"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "oneway",
      "secondary": null,
      "role": "revisit",
      "pattern": "oneway-independent-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 101,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "oneway-independent-return",
        "discovery": "depois da passagem de sentido único, o retorno usa uma saída diferente, liberada pela chave",
        "roles": [
          {
            "board": 0,
            "role": "committer-and-returner",
            "goalRegion": [
              7
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              12,
              13,
              14,
              8,
              18,
              3,
              23,
              22,
              21
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "commit",
            "edge": [
              6,
              5
            ]
          },
          {
            "board": 0,
            "role": "preserve-return",
            "edge": [
              10,
              9
            ]
          },
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              4
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 0,
            "control": "prepare",
            "role": "open-independent-return"
          },
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "open-recipient"
          }
        ],
        "order": [
          "commit-outward",
          "collect-key",
          "return-by-other-edge",
          "joint-arrival"
        ],
        "counterfactual": "Removing the directed restriction permits a direct return from the key instead of the independent return branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "prepared-return",
            "receiverBoard": 0,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              5
            ]
          },
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 9,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 2,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que depois da passagem de sentido único, o retorno usa uma saída diferente, liberada pela chave.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "oneway"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 5,
        "directionChanges": 7,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 21,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retorno por outro caminho contrasta com o compromisso sem volta.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 21,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-bd2fcc56-479",
        "topologySignature": "top1-5e494ea8-128",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retorno por outro caminho contrasta com o compromisso sem volta.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "committer-and-returner",
            "goalRegion": [
              7
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 0
            },
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              12,
              13,
              14,
              8,
              18,
              3,
              23,
              22,
              21
            ]
          },
          "controls": [],
          "goal": 23
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 4
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepared-return",
          "definition": {
            "id": "prepared-return",
            "from": 10,
            "to": 9,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "oneWays",
          "id": "oneWays-0",
          "definition": {
            "from": 6,
            "to": 5
          },
          "role": "Restringe a travessia ao sentido indicado.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 11,
            "to": 12,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 47,
    "chapter": 4,
    "topologySignature": "top1-5e494ea8-128",
    "originNumber": 399,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 399,
      "id": "sintonia-0399",
      "version": 1,
      "reason": "Retorno por outro caminho contrasta com o compromisso sem volta."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0224",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          10,
          11
        ],
        "start": 1,
        "goal": 10,
        "switches": [
          {
            "id": "prepare",
            "cell": 2,
            "group": "prepare"
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          7,
          8,
          9,
          10
        ],
        "start": 7,
        "goal": 5,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "final-command",
      "intermediate-stop"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0224:0",
    "difficulty": 3,
    "solution": [
      "up",
      "right",
      "left",
      "left",
      "left",
      "down",
      "down",
      "right",
      "down"
    ],
    "signature": "st1-51d197c6-380",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "revisit",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 125,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "switch-fork-before-exit",
        "discovery": "o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 2,
            "commit": null,
            "goalRegion": [
              10
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              1,
              0,
              5,
              9,
              10,
              8
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              1,
              2
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              3,
              6
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              7,
              10
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              3,
              2
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "visit-side-branch",
          "leave-control-with-configuration",
          "cross-exits",
          "joint-arrival"
        ],
        "counterfactual": "Opening the preparation gate removes the obligation to visit the side branch.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 2
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 5,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 4,
        "directionChanges": 5,
        "earlyTurns": 1,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 46,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada curta de configuração sem restrição direcional.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 46,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-51d197c6-380",
        "topologySignature": "top1-dab2e585-117",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomada curta de configuração sem restrição direcional.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 2,
            "commit": null,
            "goalRegion": [
              10
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              2,
              1,
              0,
              5,
              9,
              10,
              8
            ]
          },
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 2,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 48,
    "chapter": 4,
    "topologySignature": "top1-dab2e585-117",
    "originNumber": 224,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 224,
      "id": "sintonia-0224",
      "version": 1,
      "reason": "Retomada curta de configuração sem restrição direcional."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0251",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          6,
          7,
          8,
          11
        ],
        "start": 1,
        "goal": 11,
        "gates": [
          {
            "id": "contributor-gate-2",
            "from": 7,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            }
          }
        ],
        "oneWays": [
          {
            "from": 4,
            "to": 7
          }
        ],
        "switches": [
          {
            "id": "prepare",
            "cell": 0,
            "group": "prepare"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          10,
          13,
          14,
          15
        ],
        "start": 4,
        "goal": 2,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 0,
            "to": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        "start": 4,
        "goal": 5,
        "keys": [
          {
            "id": "contributor-2",
            "cell": 7
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "oneway",
      "switch"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "wall-adjust",
      "goal-transit"
    ],
    "name": "Escolha a travessia",
    "lesson": "Prepare o interruptor antes de atravessar o trecho sem retorno.",
    "discovery": "Aqui o jogador precisa descobrir que o interruptor deve preparar a passagem remota antes de abandonar seu acesso pelo sentido único.",
    "hints": [
      "Localize o interruptor que abre a passagem do outro animal.",
      "Depois do sentido único, não há retorno ao controle: configure a passagem antes de atravessar.",
      "Antes de descer pelo sentido único, entre no interruptor à esquerda da posição inicial."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0251:0",
    "difficulty": 3,
    "solution": [
      "up",
      "left",
      "right",
      "down",
      "right",
      "right",
      "down",
      "right",
      "left",
      "up",
      "right",
      "down",
      "left"
    ],
    "signature": "st1-1b4ce404-638",
    "prerequisites": [
      "walls",
      "key",
      "oneway",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "oneway",
      "secondary": null,
      "role": "focus",
      "pattern": "oneway-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 1255,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "oneway-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": [
              4,
              7
            ],
            "goalRegion": [
              11
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              1,
              2,
              3,
              6,
              10,
              14,
              13,
              15
            ]
          },
          {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 7,
            "goalRegion": [
              8,
              9,
              10,
              5,
              6,
              0,
              1,
              2
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              1,
              0
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              4,
              7
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              8,
              11
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              0,
              1
            ]
          },
          {
            "board": 2,
            "role": "prepare",
            "cells": [
              7
            ]
          },
          {
            "board": 0,
            "role": "contributor-exit",
            "edge": [
              7,
              8
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          },
          {
            "fromBoard": 2,
            "toBoard": 0,
            "control": "contributor-2",
            "role": "prepare-separate-cut"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "prefix-counterfactual-in-tests/sintonia-commitment-evidence.json",
        "secondaryPatterns": [
          "configure-before-oneway-commit"
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "contributor-gate-2",
            "receiverBoard": 0,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            },
            "controllers": [
              {
                "type": "key",
                "id": "contributor-2",
                "board": 2,
                "cell": 7
              }
            ],
            "crossingCommands": [
              8,
              9,
              11
            ]
          },
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 0
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 6,
            "goalDepartures": 2
          },
          {
            "board": 2,
            "moved": 9,
            "waited": 4,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o interruptor deve preparar a passagem remota antes de abandonar seu acesso pelo sentido único.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "oneway",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          true,
          true
        ],
        "unequalLoops": 17,
        "directionChanges": 11,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 32,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Configurar interruptor antes do compromisso; conserva a prova temporal da antiga 251.",
      "role": "compact",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 50,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-1b4ce404-638",
        "topologySignature": "top1-c7dc4957-174",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Configurar interruptor antes do compromisso; conserva a prova temporal da antiga 251.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 0,
            "commit": [
              4,
              7
            ],
            "goalRegion": [
              11
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              1,
              2,
              3,
              6,
              10,
              14,
              13,
              15
            ]
          },
          "controls": [],
          "goal": 2
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 7,
            "goalRegion": [
              8,
              9,
              10,
              5,
              6,
              0,
              1,
              2
            ]
          },
          "controls": [
            {
              "id": "contributor-2",
              "type": "key",
              "receiverBoard": 0
            }
          ],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 0,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "contributor-gate-2",
          "definition": {
            "id": "contributor-gate-2",
            "from": 7,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "contributor-2"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "contributor-2"
            },
            "crossings": [
              8,
              9,
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "oneWays",
          "id": "oneWays-0",
          "definition": {
            "from": 4,
            "to": 7
          },
          "role": "Restringe a travessia ao sentido indicado.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 0,
            "to": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "keys",
          "id": "contributor-2",
          "definition": {
            "id": "contributor-2",
            "cell": 7
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 49,
    "chapter": 4,
    "topologySignature": "top1-c7dc4957-174",
    "originNumber": 251,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 251,
      "id": "sintonia-0251",
      "version": 1,
      "reason": "Configurar interruptor antes do compromisso; conserva a prova temporal da antiga 251."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0287",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 3,
        "walkable": [
          2,
          3,
          4,
          5,
          6,
          8,
          9,
          10,
          11,
          12,
          13,
          14
        ],
        "start": 10,
        "goal": 5,
        "switches": [
          {
            "id": "sky",
            "cell": 4,
            "group": "sky"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          2,
          5,
          6,
          7,
          11,
          13,
          15,
          16,
          17,
          18
        ],
        "start": 13,
        "goal": 7,
        "gates": [
          {
            "id": "moon",
            "from": 16,
            "to": 11,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 6,
            "to": 7,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "alternate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "final-command",
      "wall-adjust"
    ],
    "name": "Entre sol e lua",
    "lesson": "Um interruptor alterna dois conjuntos de cancelas: enquanto um abre, o outro fecha. Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0287:0",
    "difficulty": 3,
    "solution": [
      "down",
      "left",
      "up",
      "left",
      "up",
      "up",
      "right",
      "right"
    ],
    "signature": "st1-186d9832-453",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [
      "alternate"
    ],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "alternate",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 222,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "moon",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              5
            ]
          },
          {
            "gateId": "sun",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              8
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
      "reasoning": {
        "used": [
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 3,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 5,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 17,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Sol/lua em dupla é composição do interruptor, não regra de movimento nova.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 17,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-186d9832-453",
        "topologySignature": "top1-8de99762-128",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Sol/lua em dupla é composição do interruptor, não regra de movimento nova.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar switch sky para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            },
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar moon nos comandos 5; sun nos comandos 8. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "sky",
          "definition": {
            "id": "sky",
            "cell": 4,
            "group": "sky"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "moon",
          "definition": {
            "id": "moon",
            "from": 16,
            "to": 11,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "sun",
          "definition": {
            "id": "sun",
            "from": 6,
            "to": 7,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 50,
    "chapter": 4,
    "topologySignature": "top1-8de99762-128",
    "originNumber": 287,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 287,
      "id": "sintonia-0287",
      "version": 1,
      "reason": "Sol/lua em dupla é composição do interruptor, não regra de movimento nova."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Um interruptor alterna dois conjuntos de cancelas: enquanto um abre, o outro fecha."
  },
  {
    "id": "sintonia-0279",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          7,
          8,
          9,
          10,
          11,
          13,
          17,
          18,
          19
        ],
        "start": 9,
        "goal": 18,
        "switches": [
          {
            "id": "sky",
            "cell": 19,
            "group": "sky"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 4,
        "walkable": [
          1,
          2,
          3,
          4,
          5,
          7,
          8,
          12,
          16,
          17
        ],
        "start": 7,
        "goal": 12,
        "gates": [
          {
            "id": "moon",
            "from": 5,
            "to": 4,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 8,
            "to": 12,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "alternate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "axis-order",
      "priority-change"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0279:0",
    "difficulty": 3,
    "solution": [
      "up",
      "right",
      "right",
      "left",
      "left",
      "down",
      "left",
      "down",
      "right",
      "right",
      "down",
      "left"
    ],
    "signature": "st1-c3db528c-450",
    "prerequisites": [
      "walls",
      "switch",
      "alternate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "alternate",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 168,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 12,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "moon",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 19
              }
            ],
            "crossingCommands": [
              7
            ]
          },
          {
            "gateId": "sun",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 19
              }
            ],
            "crossingCommands": [
              11
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 9,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
      "reasoning": {
        "used": [
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 6,
        "directionChanges": 8,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 74,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar passagens alternadas antes da retomada de caixa.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 74,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-c3db528c-450",
        "topologySignature": "top1-922d62ad-126",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar passagens alternadas antes da retomada de caixa.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar switch sky para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            },
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 18
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar moon nos comandos 7; sun nos comandos 11. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 12
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "sky",
          "definition": {
            "id": "sky",
            "cell": 19,
            "group": "sky"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "moon",
          "definition": {
            "id": "moon",
            "from": 5,
            "to": 4,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "sun",
          "definition": {
            "id": "sun",
            "from": 8,
            "to": 12,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 51,
    "chapter": 4,
    "topologySignature": "top1-922d62ad-126",
    "originNumber": 279,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 279,
      "id": "sintonia-0279",
      "version": 1,
      "reason": "Consolidar passagens alternadas antes da retomada de caixa."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0210",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          5,
          6,
          7,
          8,
          10,
          11,
          12,
          13,
          15,
          16,
          17
        ],
        "start": 7,
        "goal": 1,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 16
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-14",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 2,
        "walkable": [
          1,
          2,
          3,
          4,
          5
        ],
        "start": 1,
        "goal": 2,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 3
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "A face certa",
    "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
    "hints": [
      "Compare a posição da placa com as faces da caixa.",
      "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
      "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0210:0",
    "difficulty": 3,
    "solution": [
      "right",
      "down",
      "left",
      "up",
      "left",
      "down",
      "down",
      "up",
      "right",
      "left",
      "up"
    ],
    "signature": "st1-72d2d2b3-766",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "revisit",
      "pattern": "turn-and-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 257,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "turn-and-support",
        "name": "A face certa",
        "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
        "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
        "hints": [
          "Compare a posição da placa com as faces da caixa.",
          "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
          "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 16
            },
            "pushes": [
              {
                "command": 3,
                "direction": "left",
                "board": 0,
                "from": 12,
                "to": 11
              },
              {
                "command": 7,
                "direction": "down",
                "board": 0,
                "from": 11,
                "to": 16
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 7,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "helper-exit-1",
                "receiverBoard": 1
              },
              {
                "command": 11,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "local-stop"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              11
            ]
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 3
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-13",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 3
              }
            ],
            "crossingCommands": [
              7
            ]
          },
          {
            "gateId": "prepare-cut-14",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 3
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              10
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 14,
        "directionChanges": 9,
        "earlyTurns": 6,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 85,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar outra face de empurrão e apoio em dupla.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 85,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-72d2d2b3-766",
        "topologySignature": "top1-386ce47e-115",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomar outra face de empurrão e apoio em dupla.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 2
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 16
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-13",
          "definition": {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-14",
          "definition": {
            "id": "prepare-cut-14",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 3
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 52,
    "chapter": 4,
    "topologySignature": "top1-386ce47e-115",
    "originNumber": 210,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 210,
      "id": "sintonia-0210",
      "version": 1,
      "reason": "Retomar outra face de empurrão e apoio em dupla."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0296",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          1,
          6,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ],
        "start": 9,
        "goal": 15,
        "switches": [
          {
            "id": "sky",
            "cell": 16,
            "group": "sky"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          1,
          2,
          4,
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          14,
          15,
          18,
          19
        ],
        "start": 18,
        "goal": 12,
        "gates": [
          {
            "id": "moon",
            "from": 14,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 7,
            "to": 12,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 5,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          5,
          6,
          7,
          8,
          9,
          10,
          12,
          13,
          14
        ],
        "start": 12,
        "goal": 1,
        "ice": [
          5
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "alternate",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "unequal-loop",
      "final-command"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0296:0",
    "difficulty": 3,
    "solution": [
      "up",
      "right",
      "up",
      "right",
      "up",
      "left",
      "down",
      "left",
      "down",
      "left",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-78536c90-566",
    "prerequisites": [
      "walls",
      "switch",
      "alternate",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "alternate",
      "secondary": "ice",
      "role": "mix",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 2651,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "moon",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              5
            ]
          },
          {
            "gateId": "sun",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              13
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 6,
            "waited": 7,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
      "reasoning": {
        "used": [
          "ice",
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 13,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 35,
        "directionChanges": 10,
        "earlyTurns": 5,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 37,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Combinar a configuração conhecida com a parada do gelo, em trio.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2,
        4,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 37,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-78536c90-566",
        "topologySignature": "top1-9a380f8b-200",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Combinar a configuração conhecida com a parada do gelo, em trio.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar switch sky para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            },
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 15
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar moon nos comandos 5; sun nos comandos 13. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 12
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "sky",
          "definition": {
            "id": "sky",
            "cell": 16,
            "group": "sky"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "moon",
          "definition": {
            "id": "moon",
            "from": 14,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "sun",
          "definition": {
            "id": "sun",
            "from": 7,
            "to": 12,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "crossings": [
              13
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "ice",
          "id": "ice-0",
          "definition": 5,
          "role": "Prolonga o movimento até piso comum ou bloqueio.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 53,
    "chapter": 4,
    "topologySignature": "top1-9a380f8b-200",
    "originNumber": 296,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 296,
      "id": "sintonia-0296",
      "version": 1,
      "reason": "Combinar a configuração conhecida com a parada do gelo, em trio."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0312",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          3,
          5,
          8,
          10,
          11,
          12,
          13,
          14,
          15,
          17,
          19,
          20,
          21,
          24
        ],
        "start": 3,
        "goal": 24,
        "switches": [
          {
            "id": "prepare",
            "cell": 17,
            "group": "prepare"
          }
        ],
        "gates": [],
        "fragile": [
          19
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          0,
          2,
          5,
          6,
          7,
          10,
          14,
          15,
          16,
          17,
          18,
          19,
          21,
          24
        ],
        "start": 10,
        "goal": 7,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 5,
            "to": 6,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "fragile"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "final-command",
      "wall-adjust"
    ],
    "name": "Antes de partir",
    "lesson": "A ponte permanece enquanto o animal está nela. Quando ele sai, a casa desaparece. Desfazer restaura a ponte. Prepare o restante antes de sair da ponte frágil.",
    "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
    "hints": [
      "A ponte não desaparece enquanto o animal fica sobre ela.",
      "Ao sair, essa casa deixa de existir. Prepare o que precisa ser feito antes; desfazer restaura a ponte.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0312:0",
    "difficulty": 3,
    "solution": [
      "down",
      "down",
      "left",
      "down",
      "up",
      "up",
      "right",
      "right",
      "down",
      "down"
    ],
    "signature": "st1-8bb1f4b7-436",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [
      "fragile"
    ],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "fragile",
      "secondary": null,
      "role": "compact",
      "pattern": "fragile-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 689,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "fragile-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 17,
            "commit": [
              14,
              19
            ],
            "goalRegion": [
              24
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              7,
              2
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              8,
              13,
              12,
              17
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              14,
              19
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              19,
              24
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              5,
              6
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 17
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 9,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
      "reasoning": {
        "used": [
          "fragile",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 5,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 17,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Ponte frágil em dupla: preparar antes de abandonar o acesso que desaparece.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 17,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-8bb1f4b7-436",
        "topologySignature": "top1-87a7529f-149",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Ponte frágil em dupla: preparar antes de abandonar o acesso que desaparece.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 17,
            "commit": [
              14,
              19
            ],
            "goalRegion": [
              24
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 24
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              7,
              2
            ]
          },
          "controls": [],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 17,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "fragile",
          "id": "fragile-0",
          "definition": 19,
          "role": "Desaparece ao abandonar a casa; exige preservar a preparação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 5,
            "to": 6,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 54,
    "chapter": 4,
    "topologySignature": "top1-87a7529f-149",
    "originNumber": 312,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 312,
      "id": "sintonia-0312",
      "version": 1,
      "reason": "Ponte frágil em dupla: preparar antes de abandonar o acesso que desaparece."
    },
    "actorIntroduction": null,
    "ruleExplanation": "A ponte permanece enquanto o animal está nela. Quando ele sai, a casa desaparece. Desfazer restaura a ponte."
  },
  {
    "id": "sintonia-0304",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          3,
          8,
          11,
          13,
          16,
          17,
          18,
          19
        ],
        "start": 17,
        "goal": 3,
        "switches": [
          {
            "id": "prepare",
            "cell": 11,
            "group": "prepare"
          }
        ],
        "gates": [],
        "fragile": [
          13
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          2,
          3,
          6,
          8,
          9,
          13,
          16,
          17,
          18,
          19,
          22,
          24
        ],
        "start": 2,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 3,
            "to": 8,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "fragile"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "wall-adjust",
      "axis-order"
    ],
    "name": "Antes de partir",
    "lesson": "Prepare o restante antes de sair da ponte frágil.",
    "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
    "hints": [
      "A ponte não desaparece enquanto o animal fica sobre ela.",
      "Ao sair, essa casa deixa de existir. Prepare o que precisa ser feito antes; desfazer restaura a ponte.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0304:0",
    "difficulty": 3,
    "solution": [
      "left",
      "up",
      "right",
      "right",
      "down",
      "right",
      "right",
      "up",
      "up",
      "up",
      "left"
    ],
    "signature": "st1-ae39ef1b-412",
    "prerequisites": [
      "walls",
      "switch",
      "fragile"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "fragile",
      "secondary": null,
      "role": "compact",
      "pattern": "fragile-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 304,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "switch",
        "pattern": "fragile-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 11,
            "commit": [
              18,
              13
            ],
            "goalRegion": [
              3
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              9,
              13,
              18,
              19,
              17,
              24,
              22,
              16
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              17,
              16,
              11
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              18,
              13
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              8,
              3
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              3,
              8
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "prepare",
                "board": 0,
                "cell": 11
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 5,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
      "reasoning": {
        "used": [
          "fragile",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 11,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 41,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar a perda de acesso e a preparação do interruptor.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 41,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-ae39ef1b-412",
        "topologySignature": "top1-7488bd28-129",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar a perda de acesso e a preparação do interruptor.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 11,
            "commit": [
              18,
              13
            ],
            "goalRegion": [
              3
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 3
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              9,
              13,
              18,
              19,
              17,
              24,
              22,
              16
            ]
          },
          "controls": [],
          "goal": 8
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 11,
            "group": "prepare"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "fragile",
          "id": "fragile-0",
          "definition": 13,
          "role": "Desaparece ao abandonar a casa; exige preservar a preparação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 3,
            "to": 8,
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "prepare",
              "value": true
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 55,
    "chapter": 4,
    "topologySignature": "top1-7488bd28-129",
    "originNumber": 304,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 304,
      "id": "sintonia-0304",
      "version": 1,
      "reason": "Consolidar a perda de acesso e a preparação do interruptor."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0197",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          6,
          7,
          8,
          11,
          12,
          13,
          16,
          17,
          18,
          19,
          21,
          22,
          23
        ],
        "start": 13,
        "goal": 16,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 16
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 18,
            "to": 19,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ],
        "keys": [
          {
            "id": "release-key",
            "cell": 19
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4
        ],
        "start": 0,
        "goal": 4,
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "dual-use-object",
    "secondaryFamilies": [
      "waiting-place",
      "unequal-loop"
    ],
    "name": "O apoio já cumpriu seu papel",
    "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
    "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
    "hints": [
      "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
      "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
      "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0197:0",
    "difficulty": 3,
    "solution": [
      "up",
      "left",
      "down",
      "right",
      "down",
      "left",
      "right",
      "right",
      "left",
      "up",
      "up",
      "down",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-34f98317-509",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "compact",
      "pattern": "support-then-release"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 15,
      "optimal": true,
      "visited": 272,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "support-then-release",
        "name": "O apoio já cumpriu seu papel",
        "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
        "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
        "hints": [
          "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
          "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
          "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar",
          "liberar-destino"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Esperar a chave obtida com apoio e atravessar a passagem permanente."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 15,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 21
            },
            "pushes": [
              {
                "command": 3,
                "direction": "down",
                "board": 0,
                "from": 12,
                "to": 17
              },
              {
                "command": 6,
                "direction": "left",
                "board": 0,
                "from": 17,
                "to": 16
              },
              {
                "command": 15,
                "direction": "down",
                "board": 0,
                "from": 16,
                "to": 21
              }
            ],
            "directionChanges": 2,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 6,
                "plateId": "weight"
              }
            ],
            "plateReleases": [
              {
                "command": 15,
                "plateId": "weight",
                "afterGateSupport": true
              }
            ],
            "supportUses": [
              {
                "command": 8,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              },
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "release-after-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              8,
              9
            ]
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "controllers": [
              {
                "type": "key",
                "id": "release-key",
                "board": 0,
                "cell": 19
              }
            ],
            "crossingCommands": [
              12
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 15,
            "waited": 0,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 9,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "key",
          "key-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 19,
        "directionChanges": 11,
        "earlyTurns": 6,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 30,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "A caixa sustenta e depois deixa a casa necessária ao destino.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 30,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-34f98317-509",
        "topologySignature": "top1-02399961-115",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "A caixa sustenta e depois deixa a casa necessária ao destino.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "release-key",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 16
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Esperar a chave obtida com apoio e atravessar a passagem permanente.",
          "controls": [],
          "goal": 4
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar",
            "liberar-destino"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 16
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "keys",
          "id": "release-key",
          "definition": {
            "id": "release-key",
            "cell": 19
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 18,
            "to": 19,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              8,
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 56,
    "chapter": 4,
    "topologySignature": "top1-02399961-115",
    "originNumber": 197,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 197,
      "id": "sintonia-0197",
      "version": 1,
      "reason": "A caixa sustenta e depois deixa a casa necessária ao destino."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0337",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          7,
          12,
          16,
          17,
          18,
          23,
          24
        ],
        "start": 2,
        "goal": 24,
        "plates": [
          {
            "id": "relay-a",
            "cell": 18
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 23,
            "to": 24,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          5,
          6,
          7,
          8,
          9,
          11,
          12
        ],
        "start": 5,
        "goal": 12,
        "plates": [
          {
            "id": "relay-b",
            "cell": 12
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 9,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "handoff"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "final-command",
      "axis-order"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Uma ajuda prepara a seguinte: atravesse, ocupe a próxima placa e libere o caminho de quem ajudou. Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0337:0",
    "difficulty": 3,
    "solution": [
      "down",
      "left",
      "down",
      "left",
      "down",
      "right",
      "down",
      "right"
    ],
    "signature": "st1-a6f414a8-480",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [
      "handoff"
    ],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "handoff",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 8,
      "optimal": true,
      "visited": 52,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 8,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "relay-return",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-b",
                "board": 1,
                "cell": 12
              }
            ],
            "crossingCommands": [
              8
            ]
          },
          {
            "gateId": "relay-out",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-a",
                "board": 0,
                "cell": 18
              }
            ],
            "crossingCommands": [
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 5,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 0,
        "directionChanges": 7,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 7,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Revezamento em dupla: o primeiro apoio permite alcançar o apoio de retorno.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 7,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-a6f414a8-480",
        "topologySignature": "top1-f2c46c95-121",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Revezamento em dupla: o primeiro apoio permite alcançar o apoio de retorno.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate relay-a para painel 2. Aproveitar relay-return nos comandos 8. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-a",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 24
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar plate relay-b para painel 1. Aproveitar relay-out nos comandos 7. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-b",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 12
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "relay-a",
          "definition": {
            "id": "relay-a",
            "cell": 18
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "relay-return",
          "definition": {
            "id": "relay-return",
            "from": 23,
            "to": 24,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "relay-b",
          "definition": {
            "id": "relay-b",
            "cell": 12
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "relay-out",
          "definition": {
            "id": "relay-out",
            "from": 9,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 57,
    "chapter": 4,
    "topologySignature": "top1-f2c46c95-121",
    "originNumber": 337,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 337,
      "id": "sintonia-0337",
      "version": 1,
      "reason": "Revezamento em dupla: o primeiro apoio permite alcançar o apoio de retorno."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Uma ajuda prepara a seguinte: atravesse, ocupe a próxima placa e libere o caminho de quem ajudou."
  },
  {
    "id": "sintonia-0326",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 0,
        "goal": 2,
        "plates": [
          {
            "id": "relay-a",
            "cell": 7
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 5,
            "to": 2,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 0,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          3,
          4,
          5,
          7,
          9,
          10,
          11,
          12,
          13,
          15
        ],
        "start": 0,
        "goal": 12,
        "plates": [
          {
            "id": "relay-b",
            "cell": 12
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 13,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          5,
          6,
          7,
          8
        ],
        "start": 1,
        "goal": 5,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 2
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "handoff"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "goal-transit",
      "unequal-loop"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0326:0",
    "difficulty": 3,
    "solution": [
      "right",
      "down",
      "right",
      "down",
      "down",
      "left",
      "up",
      "right",
      "right",
      "up"
    ],
    "signature": "st1-2843a863-673",
    "prerequisites": [
      "walls",
      "plate",
      "handoff"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "handoff",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 310,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "relay-return",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-b",
                "board": 1,
                "cell": 12
              }
            ],
            "crossingCommands": [
              10
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 2
              }
            ],
            "crossingCommands": [
              2
            ]
          },
          {
            "gateId": "relay-out",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-a",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              6
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 6,
            "waited": 4,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          false,
          false,
          true
        ],
        "unequalLoops": 12,
        "directionChanges": 7,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 38,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Trio consolida a cadeia de ajuda sem introduzir outro símbolo.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 38,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-2843a863-673",
        "topologySignature": "top1-61c0850a-167",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Trio consolida a cadeia de ajuda sem introduzir outro símbolo.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate relay-a para painel 2. Aproveitar relay-return nos comandos 10; auxiliary-gate-2 nos comandos 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-a",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 2
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar plate relay-b para painel 1. Aproveitar relay-out nos comandos 6. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-b",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 12
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 1. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "relay-a",
          "definition": {
            "id": "relay-a",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "relay-return",
          "definition": {
            "id": "relay-return",
            "from": 5,
            "to": 2,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 0,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              2
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "relay-b",
          "definition": {
            "id": "relay-b",
            "cell": 12
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "relay-out",
          "definition": {
            "id": "relay-out",
            "from": 13,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 2
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 58,
    "chapter": 4,
    "topologySignature": "top1-61c0850a-167",
    "originNumber": 326,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 326,
      "id": "sintonia-0326",
      "version": 1,
      "reason": "Trio consolida a cadeia de ajuda sem introduzir outro símbolo."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0240",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          4,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          14,
          15
        ],
        "start": 3,
        "goal": 12,
        "ice": [
          9
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          7,
          8,
          9,
          11,
          12,
          13,
          14,
          15
        ],
        "start": 2,
        "goal": 11
      }
    ],
    "mechanics": [
      "walls",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "intermediate-stop",
    "secondaryFamilies": [
      "priority-change",
      "waiting-place"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0240:0",
    "difficulty": 3,
    "solution": [
      "down",
      "right",
      "down",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-3aa1556d-248",
    "prerequisites": [
      "walls",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "ice",
      "secondary": null,
      "role": "revisit",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 6,
      "optimal": true,
      "visited": 140,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 6,
        "boxes": [],
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 1,
        "directionChanges": 4,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 13,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada compacta de gelo entre cadeias de apoio.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 13,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-3aa1556d-248",
        "topologySignature": "top1-bbcabbab-140",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomada compacta de gelo entre cadeias de apoio.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 12
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 11
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "ice",
          "id": "ice-0",
          "definition": 9,
          "role": "Prolonga o movimento até piso comum ou bloqueio.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 59,
    "chapter": 4,
    "topologySignature": "top1-bbcabbab-140",
    "originNumber": 240,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 240,
      "id": "sintonia-0240",
      "version": 1,
      "reason": "Retomada compacta de gelo entre cadeias de apoio."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0350",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          5,
          6,
          7,
          8,
          10,
          11
        ],
        "start": 2,
        "goal": 0,
        "plates": [
          {
            "id": "relay-a",
            "cell": 10
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 0,
        "goal": 6,
        "plates": [
          {
            "id": "relay-b",
            "cell": 6
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        "start": 8,
        "goal": 7,
        "fragile": [
          6
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "handoff",
      "fragile"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "axis-order",
      "wall-adjust"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0350:0",
    "difficulty": 3,
    "solution": [
      "right",
      "down",
      "down",
      "down",
      "left",
      "left",
      "up",
      "left",
      "down",
      "up",
      "right",
      "right",
      "up",
      "right"
    ],
    "signature": "st1-a287e76d-553",
    "prerequisites": [
      "walls",
      "plate",
      "handoff",
      "fragile"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "handoff",
      "secondary": "fragile",
      "role": "synthesis",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 14,
      "optimal": true,
      "visited": 385,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 14,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "relay-return",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-b",
                "board": 1,
                "cell": 6
              }
            ],
            "crossingCommands": [
              8
            ]
          },
          {
            "gateId": "relay-out",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "relay-a",
                "board": 0,
                "cell": 10
              }
            ],
            "crossingCommands": [
              6
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 6,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 10,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 8,
            "waited": 6,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "fragile",
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 14,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 32,
        "directionChanges": 9,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 78,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Síntese de revezamento com perda de acesso já apresentada.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 78,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-a287e76d-553",
        "topologySignature": "top1-0ed6a398-168",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Síntese de revezamento com perda de acesso já apresentada.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate relay-a para painel 2. Aproveitar relay-return nos comandos 8. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-a",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 0
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar plate relay-b para painel 1. Aproveitar relay-out nos comandos 6. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "relay-b",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 6
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "relay-a",
          "definition": {
            "id": "relay-a",
            "cell": 10
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "relay-return",
          "definition": {
            "id": "relay-return",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-b"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "relay-b",
          "definition": {
            "id": "relay-b",
            "cell": 6
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "relay-out",
          "definition": {
            "id": "relay-out",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "relay-a"
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "fragile",
          "id": "fragile-0",
          "definition": 6,
          "role": "Desaparece ao abandonar a casa; exige preservar a preparação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 60,
    "chapter": 4,
    "topologySignature": "top1-0ed6a398-168",
    "originNumber": 350,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 350,
      "id": "sintonia-0350",
      "version": 1,
      "reason": "Síntese de revezamento com perda de acesso já apresentada."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0354",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 3,
        "goal": 4,
        "plates": [
          {
            "id": "first",
            "cell": 1
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8,
          9,
          10,
          11,
          12,
          13,
          14
        ],
        "start": 6,
        "goal": 8,
        "plates": [
          {
            "id": "second",
            "cell": 4
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15
        ],
        "start": 15,
        "goal": 3,
        "gates": [
          {
            "id": "together",
            "from": 7,
            "to": 3,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "and"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "priority-change",
      "axis-order"
    ],
    "name": "Dois apoios juntos",
    "lesson": "A cancela só abre quando as duas placas indicadas estão ocupadas. Observe os dois símbolos. Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0354:0",
    "difficulty": 4,
    "solution": [
      "down",
      "up",
      "up",
      "right",
      "up",
      "right",
      "down",
      "down",
      "down",
      "up"
    ],
    "signature": "st1-61a6c9f4-478",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [
      "and"
    ],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "and",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 567,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "together",
            "receiverBoard": 2,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            },
            "controllers": [
              {
                "type": "plate",
                "id": "first",
                "board": 0,
                "cell": 1
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 10,
            "waited": 0,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 3,
            "waited": 7,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
      "reasoning": {
        "used": [
          "and-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          true,
          true,
          false
        ],
        "unequalLoops": 12,
        "directionChanges": 6,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 17,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Duas condições: dois apoios conhecidos precisam coincidir para autorizar a passagem.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 17,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-61a6c9f4-478",
        "topologySignature": "top1-461dc04f-195",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Duas condições: dois apoios conhecidos precisam coincidir para autorizar a passagem.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate first para painel 3. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "first",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 4
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar plate second para painel 3. Avançar em cada comando enquanto os parceiros usam esperas. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "second",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 8
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Aproveitar together nos comandos 5. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "first",
          "definition": {
            "id": "first",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "second",
          "definition": {
            "id": "second",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "together",
          "definition": {
            "id": "together",
            "from": 7,
            "to": 3,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            }
          },
          "role": {
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 61,
    "chapter": 5,
    "topologySignature": "top1-461dc04f-195",
    "originNumber": 354,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 354,
      "id": "sintonia-0354",
      "version": 1,
      "reason": "Duas condições: dois apoios conhecidos precisam coincidir para autorizar a passagem."
    },
    "actorIntroduction": null,
    "ruleExplanation": "A cancela só abre quando as duas placas indicadas estão ocupadas. Observe os dois símbolos."
  },
  {
    "id": "sintonia-0362",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 2,
        "goal": 5,
        "plates": [
          {
            "id": "first",
            "cell": 7
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 1,
        "plates": [
          {
            "id": "second",
            "cell": 4
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          7,
          10,
          11,
          13,
          14
        ],
        "start": 0,
        "goal": 3,
        "gates": [
          {
            "id": "together",
            "from": 1,
            "to": 2,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "and"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "waiting-place",
      "goal-transit"
    ],
    "name": "Dois apoios juntos",
    "lesson": "Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0362:0",
    "difficulty": 4,
    "solution": [
      "down",
      "left",
      "up",
      "up",
      "left",
      "left",
      "down",
      "right",
      "right",
      "up",
      "right"
    ],
    "signature": "st1-38c46a2d-458",
    "prerequisites": [
      "walls",
      "plate",
      "and"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "and",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 613,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "together",
            "receiverBoard": 2,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            },
            "controllers": [
              {
                "type": "plate",
                "id": "first",
                "board": 0,
                "cell": 7
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              9
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 3,
            "waited": 8,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
      "reasoning": {
        "used": [
          "and-gate"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          true,
          true,
          false
        ],
        "unequalLoops": 23,
        "directionChanges": 7,
        "earlyTurns": 5,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 16,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Consolidar simultaneidade das condições sem quarteto novo.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 16,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-38c46a2d-458",
        "topologySignature": "top1-bb4de852-176",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Consolidar simultaneidade das condições sem quarteto novo.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate first para painel 3. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "first",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar plate second para painel 3. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "second",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 1
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Aproveitar together nos comandos 9. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "first",
          "definition": {
            "id": "first",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "second",
          "definition": {
            "id": "second",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "together",
          "definition": {
            "id": "together",
            "from": 1,
            "to": 2,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            }
          },
          "role": {
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 62,
    "chapter": 5,
    "topologySignature": "top1-bb4de852-176",
    "originNumber": 362,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 362,
      "id": "sintonia-0362",
      "version": 1,
      "reason": "Consolidar simultaneidade das condições sem quarteto novo."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0490",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 5,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          14
        ],
        "start": 11,
        "goal": 14,
        "keys": [
          {
            "id": "prepare",
            "cell": 10
          }
        ],
        "gates": [],
        "oneWays": [
          {
            "from": 7,
            "to": 8
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          9,
          11,
          13,
          14,
          15,
          16,
          17,
          19
        ],
        "start": 2,
        "goal": 13,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "oneway"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "priority-change",
      "wall-adjust"
    ],
    "name": "Escolha a travessia",
    "lesson": "Prepare os outros caminhos antes de cruzar a passagem de sentido único.",
    "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
    "hints": [
      "A seta está na divisória: ela permite cruzar somente no sentido indicado.",
      "Confira o alinhamento dos outros animais antes de atravessar, porque o caminho de volta é limitado.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0490:0",
    "difficulty": 4,
    "solution": [
      "left",
      "right",
      "right",
      "up",
      "right",
      "right",
      "down",
      "down",
      "left"
    ],
    "signature": "st1-89d8d16b-405",
    "prerequisites": [
      "walls",
      "key",
      "oneway"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 2,
      "primary": "oneway",
      "secondary": null,
      "role": "revisit",
      "pattern": "oneway-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 261,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "oneway-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 10,
            "commit": [
              7,
              8
            ],
            "goalRegion": [
              14
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              9,
              14,
              13,
              19
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              11,
              10
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              7,
              8
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              9,
              14
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              3,
              4
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 10
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
      "reasoning": {
        "used": [
          "key",
          "key-gate",
          "oneway"
        ],
        "partialBlocks": 4,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 1,
        "directionChanges": 5,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 46,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomar dupla compacta de preparação antes de compromisso.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 46,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-89d8d16b-405",
        "topologySignature": "top1-fe8eb1b5-146",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomar dupla compacta de preparação antes de compromisso.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 10,
            "commit": [
              7,
              8
            ],
            "goalRegion": [
              14
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 14
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              4,
              9,
              14,
              13,
              19
            ]
          },
          "controls": [],
          "goal": 13
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 10
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "oneWays",
          "id": "oneWays-0",
          "definition": {
            "from": 7,
            "to": 8
          },
          "role": "Restringe a travessia ao sentido indicado.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 3,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 63,
    "chapter": 5,
    "topologySignature": "top1-fe8eb1b5-146",
    "originNumber": 490,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 490,
      "id": "sintonia-0490",
      "version": 1,
      "reason": "Retomar dupla compacta de preparação antes de compromisso."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0376",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          3,
          4,
          5,
          6,
          7,
          9
        ],
        "start": 9,
        "goal": 7,
        "plates": [
          {
            "id": "support",
            "cell": 0
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          7,
          8,
          9,
          11
        ],
        "start": 11,
        "goal": 2,
        "gates": [
          {
            "id": "plate-gate",
            "from": 0,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          {
            "id": "auxiliary-gate-3",
            "from": 0,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          7,
          8
        ],
        "start": 8,
        "goal": 4,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 7
          }
        ]
      },
      {
        "id": "b3",
        "animal": "mico",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          11
        ],
        "start": 3,
        "goal": 6,
        "plates": [
          {
            "id": "auxiliary-3",
            "cell": 2
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "wall-adjust",
      "axis-order"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Agora são 4 animais com o mesmo comando. Nenhuma regra nova: Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0376:0",
    "difficulty": 4,
    "solution": [
      "up",
      "left",
      "left",
      "right",
      "left",
      "up",
      "right",
      "up",
      "right",
      "down",
      "right",
      "right",
      "right",
      "up",
      "left",
      "down",
      "left",
      "right"
    ],
    "signature": "st1-62fe6791-739",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 4,
      "primary": "plate",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 18,
      "optimal": true,
      "visited": 2277,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 18,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 0
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 7
              }
            ],
            "crossingCommands": [
              3
            ]
          },
          {
            "gateId": "auxiliary-gate-3",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-3",
                "board": 3,
                "cell": 2
              }
            ],
            "crossingCommands": [
              8
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 13,
            "waited": 5,
            "goalDepartures": 2
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 9,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 12,
            "waited": 6,
            "goalDepartures": 2
          },
          {
            "board": 3,
            "moved": 12,
            "waited": 6,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 16,
        "goalDepartures": [
          true,
          true,
          true,
          true
        ],
        "unequalLoops": 33,
        "directionChanges": 14,
        "earlyTurns": 10,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 46,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Primeiro quarteto usa somente placas conhecidas; cada painel recebe responsabilidade de acesso.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 46,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-62fe6791-739",
        "topologySignature": "top1-f47e890a-219",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Primeiro quarteto usa somente placas conhecidas; cada painel recebe responsabilidade de acesso.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 7
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 9; auxiliary-gate-2 nos comandos 3; auxiliary-gate-3 nos comandos 8. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 2
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 4
        },
        {
          "board": 3,
          "logicalAnimal": "mico",
          "role": "Preparar plate auxiliary-3 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-3",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 0
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 0,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-3",
          "definition": {
            "id": "auxiliary-gate-3",
            "from": 0,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 3,
          "type": "plates",
          "id": "auxiliary-3",
          "definition": {
            "id": "auxiliary-3",
            "cell": 2
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 64,
    "chapter": 5,
    "topologySignature": "top1-f47e890a-219",
    "originNumber": 376,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 376,
      "id": "sintonia-0376",
      "version": 1,
      "reason": "Primeiro quarteto usa somente placas conhecidas; cada painel recebe responsabilidade de acesso."
    },
    "actorIntroduction": 4
  },
  {
    "id": "sintonia-0388",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 5,
        "walkable": [
          6,
          7,
          8,
          10,
          11,
          12,
          13,
          16,
          17,
          18,
          22,
          27
        ],
        "start": 22,
        "goal": 10,
        "boxes": [
          {
            "id": "box0",
            "cell": 17
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 22
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-11",
            "from": 13,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          1,
          3,
          4,
          5
        ],
        "start": 3,
        "goal": 1,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          2,
          3,
          4,
          5,
          8
        ],
        "start": 8,
        "goal": 3,
        "plates": [
          {
            "id": "prepare-2",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-2",
            "from": 4,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "axis-order",
      "intermediate-stop"
    ],
    "name": "Guardar para recuperar",
    "lesson": "Afaste a caixa primeiro para alcançar o outro lado e trazê-la de volta ao apoio.",
    "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
    "hints": [
      "A placa está atrás da posição inicial da caixa.",
      "O primeiro estacionamento precisa permitir contornar; um canto terminal perde a recuperação.",
      "Entre na área de contorno, alcance a face oposta e traga a caixa de volta para sustentar a saída."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0388:0",
    "difficulty": 4,
    "solution": [
      "up",
      "right",
      "up",
      "up",
      "right",
      "left",
      "down",
      "down",
      "up",
      "left",
      "left"
    ],
    "signature": "st1-f8c4b741-965",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "box",
      "secondary": null,
      "role": "focus",
      "pattern": "park-and-retrieve"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 507,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "park-and-retrieve",
        "name": "Guardar para recuperar",
        "lesson": "Afaste a caixa primeiro para alcançar o outro lado e trazê-la de volta ao apoio.",
        "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
        "hints": [
          "A placa está atrás da posição inicial da caixa.",
          "O primeiro estacionamento precisa permitir contornar; um canto terminal perde a recuperação.",
          "Entre na área de contorno, alcance a face oposta e traga a caixa de volta para sustentar a saída."
        ],
        "boxRoles": [
          "liberar-acesso",
          "estacionar-provisoriamente",
          "recuperar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 17
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 22
            },
            "pushes": [
              {
                "command": 1,
                "direction": "up",
                "board": 0,
                "from": 17,
                "to": 12
              },
              {
                "command": 7,
                "direction": "down",
                "board": 0,
                "from": 12,
                "to": 17
              },
              {
                "command": 8,
                "direction": "down",
                "board": 0,
                "from": 17,
                "to": 22
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 8,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "helper-exit-1",
                "receiverBoard": 1
              },
              {
                "command": 11,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              },
              {
                "command": 11,
                "plateId": "weight",
                "gateId": "helper-exit-2",
                "receiverBoard": 2
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 22
              }
            ],
            "crossingCommands": [
              11
            ]
          },
          {
            "gateId": "prepare-cut-11",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              4
            ]
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              7
            ]
          },
          {
            "gateId": "prepare-cut-13",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 22
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "helper-exit-2",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 22
              }
            ],
            "crossingCommands": [
              11
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 7,
            "waited": 4,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 15,
        "directionChanges": 7,
        "earlyTurns": 5,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 32,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Trio retoma estacionar e recuperar a caixa.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 32,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-f8c4b741-965",
        "topologySignature": "top1-6e61566b-157",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Trio retoma estacionar e recuperar a caixa.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 1
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 17
          },
          "role": [
            "liberar-acesso",
            "estacionar-provisoriamente",
            "recuperar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 22
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-11",
          "definition": {
            "id": "prepare-cut-11",
            "from": 13,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-13",
          "definition": {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "prepare-2",
          "definition": {
            "id": "prepare-2",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit-2",
          "definition": {
            "id": "helper-exit-2",
            "from": 4,
            "to": 3,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 65,
    "chapter": 5,
    "topologySignature": "top1-6e61566b-157",
    "originNumber": 388,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 388,
      "id": "sintonia-0388",
      "version": 1,
      "reason": "Trio retoma estacionar e recuperar a caixa."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0424",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 9,
        "goal": 2,
        "switches": [
          {
            "id": "sky",
            "cell": 8,
            "group": "sky"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          5,
          6,
          7,
          8,
          9,
          11
        ],
        "start": 3,
        "goal": 0,
        "gates": [
          {
            "id": "moon",
            "from": 3,
            "to": 7,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 5,
            "to": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "alternate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "waiting-place",
      "axis-order"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0424:0",
    "difficulty": 4,
    "solution": [
      "down",
      "left",
      "left",
      "down",
      "right",
      "right",
      "up",
      "up",
      "left",
      "up"
    ],
    "signature": "st1-350d918f-444",
    "prerequisites": [
      "walls",
      "switch",
      "alternate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "alternate",
      "secondary": null,
      "role": "revisit",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 193,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "moon",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              1
            ]
          },
          {
            "gateId": "sun",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              8
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 5,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 3,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
      "reasoning": {
        "used": [
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 6,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 37,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Dupla retoma configuração sol/lua antes do seletor.",
      "role": "mix",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 37,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-350d918f-444",
        "topologySignature": "top1-dcdcb21c-121",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Dupla retoma configuração sol/lua antes do seletor.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar switch sky para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            },
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 2
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar moon nos comandos 1; sun nos comandos 8. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 0
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "sky",
          "definition": {
            "id": "sky",
            "cell": 8,
            "group": "sky"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "moon",
          "definition": {
            "id": "moon",
            "from": 3,
            "to": 7,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "crossings": [
              1
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "sun",
          "definition": {
            "id": "sun",
            "from": 5,
            "to": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "crossings": [
              8
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 66,
    "chapter": 5,
    "topologySignature": "top1-dcdcb21c-121",
    "originNumber": 424,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 424,
      "id": "sintonia-0424",
      "version": 1,
      "reason": "Dupla retoma configuração sol/lua antes do seletor."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia80-0067-v3",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 3,
        "walkable": [
          1,
          3,
          4,
          6,
          7,
          8
        ],
        "start": 6,
        "goal": 1,
        "plates": [
          {
            "id": "choice-plate",
            "cell": 1
          }
        ],
        "selectors": [
          {
            "id": "choice",
            "cell": 3,
            "group": "choice"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          7,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 2,
        "gates": [
          {
            "id": "choice-left",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          {
            "id": "choice-right",
            "from": 4,
            "to": 5,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "selector"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "help-recipient",
    "secondaryFamilies": [
      "wall-adjust",
      "waiting-place"
    ],
    "name": "Escolher a ligação",
    "lesson": "Entrar no seletor muda qual cancela recebe a ajuda da placa. A nova ligação vale no próximo comando. Mude a ligação para que a mesma placa ajude passagens diferentes.",
    "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
    "hints": [
      "Siga o símbolo da placa até a cancela selecionada.",
      "Prepare uma travessia, entre no seletor e volte a sustentar a placa para a próxima ligação.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia80-curated:67:0",
    "difficulty": 4,
    "solution": [
      "right",
      "up",
      "up",
      "left",
      "down",
      "left",
      "up",
      "right",
      "up",
      "right",
      "up"
    ],
    "signature": "st1-f6cdfba2-559",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [
      "selector"
    ],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "selector",
      "secondary": null,
      "role": "focus",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 81,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "choice-left",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 1
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 3
              }
            ],
            "crossingCommands": [
              4
            ]
          },
          {
            "gateId": "choice-right",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 1
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 3
              }
            ],
            "crossingCommands": [
              10
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 4,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
      "reasoning": {
        "used": [
          "selected-0",
          "selected-1",
          "selector"
        ],
        "partialBlocks": 8,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 10,
        "directionChanges": 9,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 29,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 29,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "role": "focus",
      "decision": "recompose",
      "retentionReason": "Seletor em dupla: escolher A/B não substitui a ocupação da placa.",
      "curriculumReason": "Seletor em dupla: escolher A/B não substitui a ocupação da placa.",
      "prerequisiteChapters": [
        1,
        2
      ],
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate choice-plate, selector choice para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            },
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            }
          ],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar choice-left nos comandos 4; choice-right nos comandos 10. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 2
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "choice-plate",
          "definition": {
            "id": "choice-plate",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "selectors",
          "id": "choice",
          "definition": {
            "id": "choice",
            "cell": 3,
            "group": "choice"
          },
          "role": "Escolhe conexão A/B; a placa correspondente ainda precisa de ocupação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-left",
          "definition": {
            "id": "choice-left",
            "from": 11,
            "to": 10,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-right",
          "definition": {
            "id": "choice-right",
            "from": 4,
            "to": 5,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "originNumber": null,
    "origin": {
      "kind": "role-first-new-composition",
      "catalog": null,
      "number": null,
      "id": null,
      "version": null,
      "reason": "Seletor em dupla: escolher A/B não substitui a ocupação da placa."
    },
    "number": 67,
    "chapter": 5,
    "actorIntroduction": null,
    "ruleExplanation": "Entrar no seletor muda qual cancela recebe a ajuda da placa. A nova ligação vale no próximo comando."
  },
  {
    "id": "sintonia-0422",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          11,
          12,
          14
        ],
        "start": 11,
        "goal": 8,
        "plates": [
          {
            "id": "choice-plate",
            "cell": 4
          }
        ],
        "selectors": [
          {
            "id": "choice",
            "cell": 5,
            "group": "choice"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          2,
          6,
          7,
          8,
          10,
          12,
          15,
          16,
          17
        ],
        "start": 10,
        "goal": 12,
        "gates": [
          {
            "id": "choice-left",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          {
            "id": "choice-right",
            "from": 16,
            "to": 17,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8
        ],
        "start": 8,
        "goal": 4,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 7
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "selector"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "help-recipient",
    "secondaryFamilies": [
      "priority-change",
      "intermediate-stop"
    ],
    "name": "Quem recebe a ajuda",
    "lesson": "Mude a ligação para que a mesma placa ajude passagens diferentes.",
    "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
    "hints": [
      "Siga o símbolo da placa até a cancela selecionada.",
      "Prepare uma travessia, entre no seletor e volte a sustentar a placa para a próxima ligação.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0422:0",
    "difficulty": 4,
    "solution": [
      "up",
      "left",
      "up",
      "down",
      "down",
      "right",
      "up",
      "left",
      "right",
      "down",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-233d928d-774",
    "prerequisites": [
      "walls",
      "plate",
      "selector"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "selector",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 1012,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 13,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "choice-left",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 4
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 5
              }
            ],
            "crossingCommands": [
              4
            ]
          },
          {
            "gateId": "choice-right",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 4
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 5
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 7
              }
            ],
            "crossingCommands": [
              6
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 11,
            "waited": 2,
            "goalDepartures": 3
          },
          {
            "board": 1,
            "moved": 4,
            "waited": 9,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 12,
            "waited": 1,
            "goalDepartures": 3
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
      "reasoning": {
        "used": [
          "plate-gate",
          "selected-0",
          "selected-1",
          "selector"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          true,
          false,
          true
        ],
        "unequalLoops": 20,
        "directionChanges": 10,
        "earlyTurns": 6,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 131,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Trio consolida escolha da conexão e preparação da chegada.",
      "role": "variation",
      "prerequisiteChapters": [
        1,
        2,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 131,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-233d928d-774",
        "topologySignature": "top1-4cc5ca19-176",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Trio consolida escolha da conexão e preparação da chegada.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate choice-plate, selector choice para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            },
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            }
          ],
          "goal": 8
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar choice-left nos comandos 4; choice-right nos comandos 9; auxiliary-gate-2 nos comandos 6. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 12
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 4
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "choice-plate",
          "definition": {
            "id": "choice-plate",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "selectors",
          "id": "choice",
          "definition": {
            "id": "choice",
            "cell": 5,
            "group": "choice"
          },
          "role": "Escolhe conexão A/B; a placa correspondente ainda precisa de ocupação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-left",
          "definition": {
            "id": "choice-left",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "crossings": [
              4
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-right",
          "definition": {
            "id": "choice-right",
            "from": 16,
            "to": 17,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 68,
    "chapter": 5,
    "topologySignature": "top1-4cc5ca19-176",
    "originNumber": 422,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 422,
      "id": "sintonia-0422",
      "version": 1,
      "reason": "Trio consolida escolha da conexão e preparação da chegada."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0415",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          5,
          6,
          7,
          8,
          10,
          11,
          12,
          13,
          15,
          16,
          17,
          18
        ],
        "start": 7,
        "goal": 1,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 16
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-cut-11",
            "from": 13,
            "to": 18,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          {
            "id": "prepare-cut-14",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          5
        ],
        "start": 3,
        "goal": 1,
        "plates": [
          {
            "id": "prepare-1",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "intermediate-stop",
      "axis-order"
    ],
    "name": "A face certa",
    "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
    "hints": [
      "Compare a posição da placa com as faces da caixa.",
      "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
      "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0415:0",
    "difficulty": 4,
    "solution": [
      "right",
      "right",
      "down",
      "left",
      "up",
      "left",
      "left",
      "right",
      "down",
      "up",
      "up"
    ],
    "signature": "st1-a8b6024d-857",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "box",
      "secondary": null,
      "role": "revisit",
      "pattern": "turn-and-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 213,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "turn-and-support",
        "name": "A face certa",
        "lesson": "Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.",
        "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
        "hints": [
          "Compare a posição da placa com as faces da caixa.",
          "Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.",
          "Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 16
            },
            "pushes": [
              {
                "command": 4,
                "direction": "left",
                "board": 0,
                "from": 12,
                "to": 11
              },
              {
                "command": 9,
                "direction": "down",
                "board": 0,
                "from": 11,
                "to": 16
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 9,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "helper-exit-1",
                "receiverBoard": 1
              },
              {
                "command": 11,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              11
            ]
          },
          {
            "gateId": "prepare-cut-11",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-12",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-cut-13",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "prepare-cut-14",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-1",
                "board": 1,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 16
              }
            ],
            "crossingCommands": [
              10
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 11,
        "directionChanges": 7,
        "earlyTurns": 2,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 25,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Retomada de dupla com orientação de caixa antes de outra escolha de destinatário.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 25,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-a8b6024d-857",
        "topologySignature": "top1-1f7a45c4-118",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Retomada de dupla com orientação de caixa antes de outra escolha de destinatário.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 1
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Preparar o acesso 1, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-1",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 16
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-11",
          "definition": {
            "id": "prepare-cut-11",
            "from": 13,
            "to": 18,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-12",
          "definition": {
            "id": "prepare-cut-12",
            "from": 12,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-13",
          "definition": {
            "id": "prepare-cut-13",
            "from": 11,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-cut-14",
          "definition": {
            "id": "prepare-cut-14",
            "from": 10,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-1"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "prepare-1",
          "definition": {
            "id": "prepare-1",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 69,
    "chapter": 5,
    "topologySignature": "top1-1f7a45c4-118",
    "originNumber": 415,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 415,
      "id": "sintonia-0415",
      "version": 1,
      "reason": "Retomada de dupla com orientação de caixa antes de outra escolha de destinatário."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0418",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          2,
          5,
          7,
          8,
          9,
          10,
          11,
          12,
          14
        ],
        "start": 7,
        "goal": 9,
        "plates": [
          {
            "id": "choice-plate",
            "cell": 14
          }
        ],
        "selectors": [
          {
            "id": "choice",
            "cell": 8,
            "group": "choice"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          2,
          3,
          7,
          11,
          12,
          13,
          14,
          15,
          16,
          18
        ],
        "start": 15,
        "goal": 3,
        "gates": [
          {
            "id": "choice-left",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          {
            "id": "choice-right",
            "from": 11,
            "to": 12,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 16,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          7,
          8,
          9,
          12,
          13
        ],
        "start": 12,
        "goal": 3,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 6
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "selector"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "help-recipient",
    "secondaryFamilies": [
      "goal-transit",
      "priority-change"
    ],
    "name": "Quem recebe a ajuda",
    "lesson": "Mude a ligação para que a mesma placa ajude passagens diferentes.",
    "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
    "hints": [
      "Siga o símbolo da placa até a cancela selecionada.",
      "Prepare uma travessia, entre no seletor e volte a sustentar a placa para a próxima ligação.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0418:0",
    "difficulty": 4,
    "solution": [
      "right",
      "right",
      "left",
      "right",
      "down",
      "right",
      "up",
      "up",
      "left",
      "right",
      "down",
      "left",
      "left",
      "up",
      "down",
      "right",
      "up",
      "up",
      "right"
    ],
    "signature": "st1-1655764b-786",
    "prerequisites": [
      "walls",
      "plate",
      "selector"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "selector",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 19,
      "optimal": true,
      "visited": 1016,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 19,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "choice-left",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 14
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              6
            ]
          },
          {
            "gateId": "choice-right",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 14
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 8
              }
            ],
            "crossingCommands": [
              16
            ]
          },
          {
            "gateId": "auxiliary-gate-2",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-2",
                "board": 2,
                "cell": 6
              }
            ],
            "crossingCommands": [
              14
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 12,
            "waited": 7,
            "goalDepartures": 5
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 13,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 15,
            "waited": 4,
            "goalDepartures": 2
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a placa precisa ajudar uma passagem antes de ser ligada à outra.",
      "reasoning": {
        "used": [
          "plate-gate",
          "selected-0",
          "selected-1",
          "selector"
        ],
        "partialBlocks": 17,
        "goalDepartures": [
          true,
          false,
          true
        ],
        "unequalLoops": 50,
        "directionChanges": 14,
        "earlyTurns": 6,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 28,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Escolher destinatário em trio sem somar mecanismo novo.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 28,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-1655764b-786",
        "topologySignature": "top1-e8cf8204-180",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Escolher destinatário em trio sem somar mecanismo novo.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate choice-plate, selector choice para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            },
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            }
          ],
          "goal": 9
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar choice-left nos comandos 6; choice-right nos comandos 16; auxiliary-gate-2 nos comandos 14. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [],
          "goal": 3
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar plate auxiliary-2 para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "auxiliary-2",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 3
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "choice-plate",
          "definition": {
            "id": "choice-plate",
            "cell": 14
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "selectors",
          "id": "choice",
          "definition": {
            "id": "choice",
            "cell": 8,
            "group": "choice"
          },
          "role": "Escolhe conexão A/B; a placa correspondente ainda precisa de ocupação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-left",
          "definition": {
            "id": "choice-left",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "crossings": [
              6
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-right",
          "definition": {
            "id": "choice-right",
            "from": 11,
            "to": 12,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "crossings": [
              16
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "auxiliary-gate-2",
          "definition": {
            "id": "auxiliary-gate-2",
            "from": 16,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "auxiliary-2"
            },
            "crossings": [
              14
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "auxiliary-2",
          "definition": {
            "id": "auxiliary-2",
            "cell": 6
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 70,
    "chapter": 5,
    "topologySignature": "top1-e8cf8204-180",
    "originNumber": 418,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 418,
      "id": "sintonia-0418",
      "version": 1,
      "reason": "Escolher destinatário em trio sem somar mecanismo novo."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0426",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 6,
        "walkable": [
          12,
          13,
          14,
          15,
          16
        ],
        "start": 12,
        "goal": 16,
        "boxes": [
          {
            "id": "parcel",
            "cell": 13
          }
        ],
        "gates": [
          {
            "id": "delivery-gate",
            "from": 14,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "delivery-final",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 6,
        "cols": 6,
        "walkable": [
          7,
          8,
          9,
          10,
          13,
          14,
          15,
          16,
          19,
          20,
          21,
          22,
          25,
          26,
          28
        ],
        "start": 20,
        "goal": 28,
        "plates": [
          {
            "id": "arrival",
            "cell": 15
          }
        ],
        "gates": [
          {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "channels": [
      {
        "id": "parcel-channel",
        "fromBoard": 0,
        "entry": 14,
        "toBoard": 1,
        "exit": 20
      }
    ],
    "family": "support-handoff",
    "secondaryFamilies": [
      "intermediate-stop",
      "priority-change"
    ],
    "name": "Preparar a entrega",
    "lesson": "Empurre a caixa na entrada para enviá-la a outro tabuleiro. Se a saída não estiver livre, o empurrão inteiro é bloqueado. Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos.",
    "hints": [
      "O canal precisa de uma saída livre antes do envio.",
      "Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.",
      "Prepare as ajudas de retorno antes de abandonar uma placa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0426:0",
    "difficulty": 4,
    "solution": [
      "down",
      "right",
      "up",
      "left",
      "up",
      "right",
      "down",
      "right",
      "right",
      "right",
      "down"
    ],
    "signature": "st1-bdedf254-633",
    "prerequisites": [
      "walls",
      "plate",
      "box"
    ],
    "introduction": [
      "delivery"
    ],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "delivery",
      "secondary": null,
      "role": "focus",
      "pattern": "receive-turn-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 501,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "requiredReceiverPushes": 2,
        "senderApproach": "ready-to-send after receiver preparation",
        "structures": {
          "channel": "redistribute one finite box resource",
          "receiverCircuit": "reach a different pushing face, not extend a corridor",
          "receiverGate": "prevent animal occupancy from replacing persistent box support",
          "helperChain": "two interdependent animals"
        },
        "causalClaim": "Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.",
        "roles": [
          "send resource, then wait for returned support",
          "clear receiving space, reach the useful pushing face, and sustain support"
        ],
        "boxRoles": [
          "transferred-resource",
          "reoriented-support"
        ],
        "dependencies": [
          {
            "from": 0,
            "to": 1,
            "kind": "resource-delivery"
          },
          {
            "from": 1,
            "to": 0,
            "kind": "persistent-box-support"
          }
        ],
        "errors": [
          "Sending while the receiver still occupies the exit does not transfer the box.",
          "Pushing into a terminal corner can lose access to the next pushing face; undo remains available."
        ],
        "evidenceScope": "Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.",
        "pattern": "receive-turn-support",
        "discovery": "preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 11,
        "boxes": [
          {
            "id": "parcel",
            "origin": {
              "id": "parcel",
              "board": 0,
              "cell": 13
            },
            "final": {
              "id": "parcel",
              "board": 1,
              "cell": 15
            },
            "pushes": [
              {
                "command": 2,
                "direction": "right",
                "board": 0,
                "from": 13,
                "to": 14
              },
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 6,
                "direction": "right",
                "board": 1,
                "from": 14,
                "to": 15
              }
            ],
            "directionChanges": 2,
            "deliveries": [
              {
                "command": 2,
                "channelId": "parcel-channel",
                "fromBoard": 0,
                "toBoard": 1,
                "entry": 14,
                "exit": 20
              }
            ],
            "postDeliveryPushes": [
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 6,
                "direction": "right",
                "board": 1,
                "from": 14,
                "to": 15
              }
            ],
            "plateEntries": [
              {
                "command": 6,
                "plateId": "arrival"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 9,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 10,
                "plateId": "arrival",
                "gateId": "delivery-final",
                "receiverBoard": 0
              },
              {
                "command": 11,
                "plateId": "arrival",
                "gateId": "delivery-home",
                "receiverBoard": 1
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "transferred-resource",
              "recipient-reposition"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "delivery-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "delivery-final",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              10
            ]
          },
          {
            "gateId": "delivery-home",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              11
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 2,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos.",
      "reasoning": {
        "used": [
          "delivery",
          "delivery-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 8,
        "earlyTurns": 5,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 101,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Entrega em dupla: liberar saída antes, enviar, alcançar outra face e apoiar depois.",
      "role": "focus",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 101,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-bdedf254-633",
        "topologySignature": "top1-a318b2fc-123",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Entrega em dupla: liberar saída antes, enviar, alcançar outra face e apoiar depois.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "send resource, then wait for returned support",
          "controls": [],
          "goal": 16
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "clear receiving space, reach the useful pushing face, and sustain support",
          "controls": [
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 28
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "parcel",
          "definition": {
            "id": "parcel",
            "cell": 13
          },
          "role": [
            "transferred-resource",
            "reoriented-support"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-gate",
          "definition": {
            "id": "delivery-gate",
            "from": 14,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-final",
          "definition": {
            "id": "delivery-final",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "arrival",
          "definition": {
            "id": "arrival",
            "cell": 15
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "delivery-home",
          "definition": {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "type": "channel",
          "id": "parcel-channel",
          "definition": {
            "id": "parcel-channel",
            "fromBoard": 0,
            "entry": 14,
            "toBoard": 1,
            "exit": 20
          },
          "role": "Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 71,
    "chapter": 5,
    "topologySignature": "top1-a318b2fc-123",
    "originNumber": 426,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 426,
      "id": "sintonia-0426",
      "version": 1,
      "reason": "Entrega em dupla: liberar saída antes, enviar, alcançar outra face e apoiar depois."
    },
    "actorIntroduction": null,
    "ruleExplanation": "Empurre a caixa na entrada para enviá-la a outro tabuleiro. Se a saída não estiver livre, o empurrão inteiro é bloqueado."
  },
  {
    "id": "sintonia-0437",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 6,
        "walkable": [
          3,
          9,
          15,
          21,
          27
        ],
        "start": 3,
        "goal": 27,
        "boxes": [
          {
            "id": "parcel",
            "cell": 9
          }
        ],
        "gates": [
          {
            "id": "delivery-gate",
            "from": 15,
            "to": 21,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "delivery-final",
            "from": 21,
            "to": 27,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          }
        ],
        "plates": [
          {
            "id": "sender-release",
            "cell": 15
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 6,
        "cols": 6,
        "walkable": [
          7,
          8,
          9,
          10,
          13,
          14,
          15,
          16,
          19,
          20,
          21,
          22,
          25,
          26,
          28
        ],
        "start": 20,
        "goal": 28,
        "plates": [
          {
            "id": "arrival",
            "cell": 9
          }
        ],
        "gates": [
          {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          6,
          7
        ],
        "start": 2,
        "goal": 6,
        "plates": [
          {
            "id": "helper-release",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "channels": [
      {
        "id": "parcel-channel",
        "fromBoard": 0,
        "entry": 15,
        "toBoard": 1,
        "exit": 20
      }
    ],
    "family": "support-handoff",
    "secondaryFamilies": [
      "waiting-place",
      "final-command"
    ],
    "name": "Preparar a entrega",
    "lesson": "Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
    "hints": [
      "O canal precisa de uma saída livre antes do envio.",
      "Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.",
      "Prepare as ajudas de retorno antes de abandonar uma placa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0437:0",
    "difficulty": 4,
    "solution": [
      "down",
      "down",
      "up",
      "up",
      "left",
      "up",
      "right",
      "down",
      "right",
      "right",
      "down",
      "down",
      "left",
      "down",
      "down",
      "left"
    ],
    "signature": "st1-8e5d03bc-888",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "delivery",
      "secondary": null,
      "role": "compact",
      "pattern": "receive-hold-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 16,
      "optimal": true,
      "visited": 1282,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "requiredReceiverPushes": 2,
        "senderApproach": "ready-to-send after receiver preparation",
        "structures": {
          "channel": "redistribute one finite box resource",
          "receiverCircuit": "reach a different pushing face, not extend a corridor",
          "receiverGate": "return while sender still holds its plate",
          "helperChain": "give each extra animal a necessary support recipient"
        },
        "causalClaim": "Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.",
        "roles": [
          "send resource, then wait for returned support",
          "clear receiving space, reach the useful pushing face, and sustain support",
          "hold the sender’s final passage before leaving through the box-supported passage"
        ],
        "boxRoles": [
          "transferred-resource",
          "multi-direction-support",
          "reciprocal-release"
        ],
        "dependencies": [
          {
            "from": 0,
            "to": 1,
            "kind": "resource-delivery"
          },
          {
            "from": 1,
            "to": 0,
            "kind": "persistent-box-support"
          },
          {
            "from": 2,
            "to": 0,
            "kind": "temporary-helper-support"
          },
          {
            "from": 1,
            "to": 2,
            "kind": "returned-box-support"
          },
          {
            "from": 0,
            "to": 1,
            "kind": "hold-return-before-final-crossing"
          }
        ],
        "errors": [
          "Sending while the receiver still occupies the exit does not transfer the box.",
          "Pushing into a terminal corner can lose access to the next pushing face; undo remains available."
        ],
        "evidenceScope": "Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.",
        "pattern": "receive-hold-return",
        "discovery": "receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 16,
        "boxes": [
          {
            "id": "parcel",
            "origin": {
              "id": "parcel",
              "board": 0,
              "cell": 9
            },
            "final": {
              "id": "parcel",
              "board": 1,
              "cell": 9
            },
            "pushes": [
              {
                "command": 2,
                "direction": "down",
                "board": 0,
                "from": 9,
                "to": 15
              },
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 4,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              },
              {
                "command": 7,
                "direction": "right",
                "board": 1,
                "from": 8,
                "to": 9
              }
            ],
            "directionChanges": 2,
            "deliveries": [
              {
                "command": 2,
                "channelId": "parcel-channel",
                "fromBoard": 0,
                "toBoard": 1,
                "entry": 15,
                "exit": 20
              }
            ],
            "postDeliveryPushes": [
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 4,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              },
              {
                "command": 7,
                "direction": "right",
                "board": 1,
                "from": 8,
                "to": 9
              }
            ],
            "plateEntries": [
              {
                "command": 7,
                "plateId": "arrival"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 12,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 15,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "transferred-resource",
              "recipient-reposition"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "delivery-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 9
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "delivery-final",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "helper-release",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              15
            ]
          },
          {
            "gateId": "delivery-home",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "sender-release",
                "board": 0,
                "cell": 15
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "helper-exit",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 9
              }
            ],
            "crossingCommands": [
              15
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 10,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 11,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 6,
            "waited": 10,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
      "reasoning": {
        "used": [
          "delivery",
          "delivery-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 16,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 39,
        "directionChanges": 10,
        "earlyTurns": 5,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 59,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Trio combina entrega com apoio do remetente para o retorno.",
      "role": "compact",
      "prerequisiteChapters": [
        1,
        2,
        3,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 59,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-8e5d03bc-888",
        "topologySignature": "top1-566149c0-168",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Trio combina entrega com apoio do remetente para o retorno.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "send resource, then wait for returned support",
          "controls": [
            {
              "id": "sender-release",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 27
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "clear receiving space, reach the useful pushing face, and sustain support",
          "controls": [
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 28
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "hold the sender’s final passage before leaving through the box-supported passage",
          "controls": [
            {
              "id": "helper-release",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "parcel",
          "definition": {
            "id": "parcel",
            "cell": 9
          },
          "role": [
            "transferred-resource",
            "multi-direction-support",
            "reciprocal-release"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "sender-release",
          "definition": {
            "id": "sender-release",
            "cell": 15
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-gate",
          "definition": {
            "id": "delivery-gate",
            "from": 15,
            "to": 21,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-final",
          "definition": {
            "id": "delivery-final",
            "from": 21,
            "to": 27,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "crossings": [
              15
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "arrival",
          "definition": {
            "id": "arrival",
            "cell": 9
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "delivery-home",
          "definition": {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "helper-release",
          "definition": {
            "id": "helper-release",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit",
          "definition": {
            "id": "helper-exit",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              15
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "type": "channel",
          "id": "parcel-channel",
          "definition": {
            "id": "parcel-channel",
            "fromBoard": 0,
            "entry": 15,
            "toBoard": 1,
            "exit": 20
          },
          "role": "Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 72,
    "chapter": 5,
    "topologySignature": "top1-566149c0-168",
    "originNumber": 437,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 437,
      "id": "sintonia-0437",
      "version": 1,
      "reason": "Trio combina entrega com apoio do remetente para o retorno."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0449",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          4,
          5,
          7,
          8,
          9,
          10,
          12,
          14
        ],
        "start": 9,
        "goal": 10,
        "keys": [
          {
            "id": "prepare",
            "cell": 4
          }
        ],
        "gates": [],
        "fragile": [
          0
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 5,
        "walkable": [
          0,
          1,
          3,
          4,
          5,
          6,
          7,
          8,
          10,
          13,
          14
        ],
        "start": 14,
        "goal": 5,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 13,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "key",
      "fragile"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "preserve-access",
    "secondaryFamilies": [
      "priority-change",
      "wall-adjust"
    ],
    "name": "Antes de partir",
    "lesson": "Prepare o restante antes de sair da ponte frágil.",
    "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
    "hints": [
      "A ponte não desaparece enquanto o animal fica sobre ela.",
      "Ao sair, essa casa deixa de existir. Prepare o que precisa ser feito antes; desfazer restaura a ponte.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0449:0",
    "difficulty": 4,
    "solution": [
      "up",
      "down",
      "left",
      "left",
      "up",
      "left",
      "left",
      "down",
      "down",
      "left"
    ],
    "signature": "st1-c672b9c3-375",
    "prerequisites": [
      "walls",
      "key",
      "fragile"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "fragile",
      "secondary": null,
      "role": "revisit",
      "pattern": "fragile-prepare-before-commit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 223,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "preparationControl": "key",
        "pattern": "fragile-prepare-before-commit",
        "discovery": "o controle no desvio precisa estar preparado antes de abandonar seu acesso",
        "roles": [
          {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 4,
            "commit": [
              1,
              0
            ],
            "goalRegion": [
              10
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              3,
              7,
              4,
              6,
              1,
              5,
              0,
              10
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              9,
              4
            ]
          },
          {
            "board": 0,
            "role": "preserve-access",
            "edge": [
              1,
              0
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              5,
              10
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              13,
              8
            ]
          }
        ],
        "dependencies": [
          {
            "fromBoard": 0,
            "toBoard": 1,
            "control": "prepare",
            "role": "prepare-remote-exit"
          }
        ],
        "order": [
          "prepare-control",
          "commit-access",
          "cross-prepared-exits",
          "joint-arrival"
        ],
        "counterfactual": "Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.",
        "proofStatus": "structural-design-hypothesis; replay and budgeted ablations recorded separately"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 10,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "preparation-remote",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "key",
                "id": "prepare",
                "board": 0,
                "cell": 4
              }
            ],
            "crossingCommands": [
              5
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 9,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 5,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o controle no desvio precisa estar preparado antes de abandonar seu acesso.",
      "reasoning": {
        "used": [
          "fragile",
          "key",
          "key-gate"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 1,
        "directionChanges": 6,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 26,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Dupla retoma ponte e preparação sem entrega.",
      "role": "revisit",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 26,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-c672b9c3-375",
        "topologySignature": "top1-b1708105-130",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Dupla retoma ponte e preparação sem entrega.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": {
            "board": 0,
            "role": "preparer-and-committer",
            "control": 4,
            "commit": [
              1,
              0
            ],
            "goalRegion": [
              10
            ]
          },
          "controls": [
            {
              "id": "prepare",
              "type": "key",
              "receiverBoard": 1
            }
          ],
          "goal": 10
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              3,
              7,
              4,
              6,
              1,
              5,
              0,
              10
            ]
          },
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "keys",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 4
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "fragile",
          "id": "fragile-0",
          "definition": 0,
          "role": "Desaparece ao abandonar a casa; exige preservar a preparação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "preparation-remote",
          "definition": {
            "id": "preparation-remote",
            "from": 13,
            "to": 8,
            "condition": {
              "type": "key",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "prepare"
            },
            "crossings": [
              5
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 73,
    "chapter": 5,
    "topologySignature": "top1-b1708105-130",
    "originNumber": 449,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 449,
      "id": "sintonia-0449",
      "version": 1,
      "reason": "Dupla retoma ponte e preparação sem entrega."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0439",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 6,
        "walkable": [
          9,
          15,
          21,
          27,
          33
        ],
        "start": 33,
        "goal": 9,
        "boxes": [
          {
            "id": "parcel",
            "cell": 27
          }
        ],
        "gates": [
          {
            "id": "delivery-gate",
            "from": 21,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "delivery-final",
            "from": 15,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 6,
        "cols": 6,
        "walkable": [
          7,
          8,
          9,
          10,
          14,
          15,
          16,
          19,
          20,
          21,
          22,
          25,
          26,
          27,
          28
        ],
        "start": 20,
        "goal": 7,
        "plates": [
          {
            "id": "arrival",
            "cell": 15
          }
        ],
        "gates": [
          {
            "id": "delivery-home",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          4,
          6,
          7,
          8
        ],
        "start": 8,
        "goal": 0,
        "plates": [
          {
            "id": "helper-release",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "prepare-helper",
            "from": 7,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "prepare"
            }
          }
        ]
      },
      {
        "id": "b3",
        "animal": "mico",
        "rows": 3,
        "cols": 3,
        "walkable": [
          2,
          4,
          5,
          6,
          7
        ],
        "start": 2,
        "goal": 6,
        "plates": [
          {
            "id": "prepare",
            "cell": 5
          }
        ],
        "gates": [
          {
            "id": "preparer-exit",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "channels": [
      {
        "id": "parcel-channel",
        "fromBoard": 0,
        "entry": 21,
        "toBoard": 1,
        "exit": 20
      }
    ],
    "family": "support-handoff",
    "secondaryFamilies": [
      "waiting-place",
      "priority-change"
    ],
    "name": "Preparar a entrega",
    "lesson": "Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos.",
    "hints": [
      "O canal precisa de uma saída livre antes do envio.",
      "Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.",
      "Prepare as ajudas de retorno antes de abandonar uma placa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0439:0",
    "difficulty": 4,
    "solution": [
      "left",
      "up",
      "up",
      "right",
      "down",
      "right",
      "up",
      "left",
      "up",
      "down",
      "up",
      "up",
      "left",
      "down",
      "left",
      "down",
      "left"
    ],
    "signature": "st1-87abc95a-1115",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 4,
      "primary": "delivery",
      "secondary": null,
      "role": "mix",
      "pattern": "receive-turn-support"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 17,
      "optimal": true,
      "visited": 9427,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "requiredReceiverPushes": 2,
        "senderApproach": "ready-to-send after receiver preparation",
        "structures": {
          "channel": "redistribute one finite box resource",
          "receiverCircuit": "reach a different pushing face, not extend a corridor",
          "receiverGate": "prevent animal occupancy from replacing persistent box support",
          "helperChain": "give each extra animal a necessary support recipient"
        },
        "causalClaim": "Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.",
        "roles": [
          "send resource, then wait for returned support",
          "clear receiving space, reach the useful pushing face, and sustain support",
          "hold the sender’s final passage before leaving through the box-supported passage",
          "prepare the helper’s entrance before using the returned box support"
        ],
        "boxRoles": [
          "transferred-resource",
          "reoriented-support"
        ],
        "dependencies": [
          {
            "from": 0,
            "to": 1,
            "kind": "resource-delivery"
          },
          {
            "from": 1,
            "to": 0,
            "kind": "persistent-box-support"
          },
          {
            "from": 2,
            "to": 0,
            "kind": "temporary-helper-support"
          },
          {
            "from": 1,
            "to": 2,
            "kind": "returned-box-support"
          },
          {
            "from": 3,
            "to": 2,
            "kind": "prepare-helper"
          },
          {
            "from": 1,
            "to": 3,
            "kind": "returned-box-support"
          }
        ],
        "errors": [
          "Sending while the receiver still occupies the exit does not transfer the box.",
          "Pushing into a terminal corner can lose access to the next pushing face; undo remains available."
        ],
        "evidenceScope": "Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.",
        "pattern": "receive-turn-support",
        "discovery": "preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 17,
        "boxes": [
          {
            "id": "parcel",
            "origin": {
              "id": "parcel",
              "board": 0,
              "cell": 27
            },
            "final": {
              "id": "parcel",
              "board": 1,
              "cell": 15
            },
            "pushes": [
              {
                "command": 2,
                "direction": "up",
                "board": 0,
                "from": 27,
                "to": 21
              },
              {
                "command": 4,
                "direction": "right",
                "board": 1,
                "from": 20,
                "to": 21
              },
              {
                "command": 7,
                "direction": "up",
                "board": 1,
                "from": 21,
                "to": 15
              }
            ],
            "directionChanges": 2,
            "deliveries": [
              {
                "command": 2,
                "channelId": "parcel-channel",
                "fromBoard": 0,
                "toBoard": 1,
                "entry": 21,
                "exit": 20
              }
            ],
            "postDeliveryPushes": [
              {
                "command": 4,
                "direction": "right",
                "board": 1,
                "from": 20,
                "to": 21
              },
              {
                "command": 7,
                "direction": "up",
                "board": 1,
                "from": 21,
                "to": 15
              }
            ],
            "plateEntries": [
              {
                "command": 7,
                "plateId": "arrival"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 9,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 10,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 11,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 12,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              },
              {
                "command": 13,
                "plateId": "arrival",
                "gateId": "delivery-home",
                "receiverBoard": 1
              },
              {
                "command": 17,
                "plateId": "arrival",
                "gateId": "preparer-exit",
                "receiverBoard": 3
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "transferred-resource",
              "recipient-reposition"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "delivery-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              9,
              10,
              11
            ]
          },
          {
            "gateId": "delivery-final",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "helper-release",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "delivery-home",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              13
            ]
          },
          {
            "gateId": "helper-exit",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              12
            ]
          },
          {
            "gateId": "prepare-helper",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare",
                "board": 3,
                "cell": 5
              }
            ],
            "crossingCommands": [
              11
            ]
          },
          {
            "gateId": "preparer-exit",
            "receiverBoard": 3,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 15
              }
            ],
            "crossingCommands": [
              17
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 8,
            "waited": 9,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 11,
            "waited": 6,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 6,
            "waited": 11,
            "goalDepartures": 0
          },
          {
            "board": 3,
            "moved": 8,
            "waited": 9,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos.",
      "reasoning": {
        "used": [
          "delivery",
          "delivery-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 16,
        "goalDepartures": [
          false,
          false,
          false,
          false
        ],
        "unequalLoops": 48,
        "directionChanges": 14,
        "earlyTurns": 8,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 131,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Quarteto usa a entrega já conhecida e distribui as ajudas de acesso.",
      "role": "deep",
      "prerequisiteChapters": [
        1,
        2,
        3,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 131,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-87abc95a-1115",
        "topologySignature": "top1-3d3c9016-212",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Quarteto usa a entrega já conhecida e distribui as ajudas de acesso.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "send resource, then wait for returned support",
          "controls": [],
          "goal": 9
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "clear receiving space, reach the useful pushing face, and sustain support",
          "controls": [
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 2
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 3
            }
          ],
          "goal": 7
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "hold the sender’s final passage before leaving through the box-supported passage",
          "controls": [
            {
              "id": "helper-release",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 0
        },
        {
          "board": 3,
          "logicalAnimal": "mico",
          "role": "prepare the helper’s entrance before using the returned box support",
          "controls": [
            {
              "id": "prepare",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 6
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "parcel",
          "definition": {
            "id": "parcel",
            "cell": 27
          },
          "role": [
            "transferred-resource",
            "reoriented-support"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-gate",
          "definition": {
            "id": "delivery-gate",
            "from": 21,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              9,
              10,
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-final",
          "definition": {
            "id": "delivery-final",
            "from": 15,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "arrival",
          "definition": {
            "id": "arrival",
            "cell": 15
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "delivery-home",
          "definition": {
            "id": "delivery-home",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              13
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "helper-release",
          "definition": {
            "id": "helper-release",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit",
          "definition": {
            "id": "helper-exit",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              12
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "prepare-helper",
          "definition": {
            "id": "prepare-helper",
            "from": 7,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare"
            },
            "crossings": [
              11
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 3,
          "type": "plates",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 5
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 3,
          "type": "gates",
          "id": "preparer-exit",
          "definition": {
            "id": "preparer-exit",
            "from": 7,
            "to": 6,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              17
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "type": "channel",
          "id": "parcel-channel",
          "definition": {
            "id": "parcel-channel",
            "fromBoard": 0,
            "entry": 21,
            "toBoard": 1,
            "exit": 20
          },
          "role": "Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 74,
    "chapter": 5,
    "topologySignature": "top1-3d3c9016-212",
    "originNumber": 439,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 439,
      "id": "sintonia-0439",
      "version": 1,
      "reason": "Quarteto usa a entrega já conhecida e distribui as ajudas de acesso."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0470",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          2,
          3,
          4,
          6,
          7,
          8,
          13,
          17,
          18,
          19
        ],
        "start": 6,
        "goal": 19,
        "switches": [
          {
            "id": "sky",
            "cell": 13,
            "group": "sky"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          3,
          4,
          5,
          6,
          7,
          9,
          10,
          12,
          14
        ],
        "start": 14,
        "goal": 5,
        "gates": [
          {
            "id": "moon",
            "from": 14,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 6,
            "to": 5,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "switch",
      "alternate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "scenario-choice",
    "secondaryFamilies": [
      "final-command",
      "unequal-loop"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0470:0",
    "difficulty": 4,
    "solution": [
      "up",
      "up",
      "right",
      "right",
      "down",
      "down",
      "up",
      "left",
      "left",
      "up",
      "down",
      "left",
      "left",
      "down",
      "right",
      "up"
    ],
    "signature": "st1-eb319f7c-450",
    "prerequisites": [
      "walls",
      "switch",
      "alternate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 2,
      "primary": "alternate",
      "secondary": null,
      "role": "revisit",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 16,
      "optimal": true,
      "visited": 194,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 16,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "moon",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 13
              }
            ],
            "crossingCommands": [
              1
            ]
          },
          {
            "gateId": "sun",
            "receiverBoard": 1,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "controllers": [
              {
                "type": "switch",
                "id": "sky",
                "board": 0,
                "cell": 13
              }
            ],
            "crossingCommands": [
              13
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 9,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 11,
            "waited": 5,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
      "reasoning": {
        "used": [
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 12,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 24,
        "directionChanges": 10,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 29,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "decision": "retain-logical-definition",
      "retentionReason": "Dupla de configuração oferece contraste antes das cinco sínteses.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        4
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 29,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-eb319f7c-450",
        "topologySignature": "top1-1d3859df-123",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Dupla de configuração oferece contraste antes das cinco sínteses.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar switch sky para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Preparar a chegada conjunta sem depender de congelar no destino.",
          "controls": [
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            },
            {
              "id": "sky",
              "type": "switch",
              "receiverBoard": 1
            }
          ],
          "goal": 19
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar moon nos comandos 1; sun nos comandos 13. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 5
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "switches",
          "id": "sky",
          "definition": {
            "id": "sky",
            "cell": 13,
            "group": "sky"
          },
          "role": "Entrada e permanência final alternam a configuração, preservada ao sair.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "moon",
          "definition": {
            "id": "moon",
            "from": 14,
            "to": 9,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            },
            "crossings": [
              1
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "sun",
          "definition": {
            "id": "sun",
            "from": 6,
            "to": 5,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            }
          },
          "role": {
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": true
            },
            "crossings": [
              13
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 75,
    "chapter": 5,
    "topologySignature": "top1-1d3859df-123",
    "originNumber": 470,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 470,
      "id": "sintonia-0470",
      "version": 1,
      "reason": "Dupla de configuração oferece contraste antes das cinco sínteses."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia80-0076-v3",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 3,
        "cols": 4,
        "walkable": [
          2,
          3,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 3,
        "goal": 11,
        "plates": [
          {
            "id": "support",
            "cell": 7
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          2,
          3,
          5,
          7,
          8,
          9,
          10,
          11,
          13,
          15
        ],
        "start": 2,
        "goal": 9,
        "gates": [
          {
            "id": "plate-gate",
            "from": 7,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "remote-support",
    "secondaryFamilies": [
      "final-command",
      "wall-adjust"
    ],
    "name": "Duas vozes, pouco espaço",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia80-curated:76:0",
    "difficulty": 5,
    "solution": [
      "right",
      "down",
      "down",
      "up",
      "left",
      "left",
      "left",
      "down",
      "right"
    ],
    "signature": "st1-cb3a1f45-336",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "compact",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 67,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 9,
        "boxes": [],
        "dependencies": [
          {
            "gateId": "plate-gate",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "support",
                "board": 0,
                "cell": 7
              }
            ],
            "crossingCommands": [
              3
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 4,
            "waited": 5,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 7,
            "waited": 2,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          true,
          true
        ],
        "unequalLoops": 10,
        "directionChanges": 5,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 14,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 14,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 3
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "role": "synthesis",
      "decision": "recompose",
      "retentionReason": "Coordenação compacta de duas responsabilidades, sem recursos novos.",
      "curriculumReason": "Coordenação compacta de duas responsabilidades, sem recursos novos.",
      "prerequisiteChapters": [
        1,
        2
      ],
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar plate support para painel 2. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [
            {
              "id": "support",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 11
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Aproveitar plate-gate nos comandos 3. Usar bloqueios como esperas enquanto os parceiros avançam. Abandonar temporariamente o destino para completar o ajuste conjunto.",
          "controls": [],
          "goal": 9
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "support",
          "definition": {
            "id": "support",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "plate-gate",
          "definition": {
            "id": "plate-gate",
            "from": 7,
            "to": 11,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "support"
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "originNumber": null,
    "origin": {
      "kind": "role-first-new-composition",
      "catalog": null,
      "number": null,
      "id": null,
      "version": null,
      "reason": "Coordenação compacta de duas responsabilidades, sem recursos novos."
    },
    "number": 76,
    "chapter": 6,
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0200",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          6,
          7,
          8,
          11,
          12,
          13,
          15,
          16,
          17,
          18,
          21,
          22,
          23
        ],
        "start": 11,
        "goal": 18,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 18
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          {
            "id": "prepare-2-6",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          {
            "id": "prepare-2-7",
            "from": 13,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          {
            "id": "prepare-2-8",
            "from": 18,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          {
            "id": "prepare-2-9",
            "from": 23,
            "to": 22,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          }
        ],
        "keys": [
          {
            "id": "release-key",
            "cell": 15
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 2,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4
        ],
        "start": 0,
        "goal": 4,
        "gates": [
          {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          3,
          4,
          7
        ],
        "start": 0,
        "goal": 7,
        "plates": [
          {
            "id": "prepare-2",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit-2",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "dual-use-object",
    "secondaryFamilies": [
      "final-command",
      "waiting-place"
    ],
    "name": "O apoio já cumpriu seu papel",
    "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
    "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
    "hints": [
      "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
      "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
      "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0200:0",
    "difficulty": 5,
    "solution": [
      "up",
      "right",
      "down",
      "left",
      "down",
      "right",
      "right",
      "left",
      "left",
      "right",
      "up",
      "up",
      "down",
      "right",
      "right",
      "down"
    ],
    "signature": "st1-6014c27f-1040",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "box",
      "secondary": null,
      "role": "synthesis",
      "pattern": "support-then-release"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 16,
      "optimal": true,
      "visited": 848,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "pattern": "support-then-release",
        "name": "O apoio já cumpriu seu papel",
        "lesson": "Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.",
        "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
        "hints": [
          "O destino ocupa a casa que primeiro precisa sustentar a passagem.",
          "A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.",
          "Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar."
        ],
        "boxRoles": [
          "reorientar",
          "sustentar",
          "liberar-destino"
        ],
        "roles": [
          "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "Esperar a chave obtida com apoio e atravessar a passagem permanente.",
          "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa."
        ]
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 16,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 0,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 0,
              "cell": 23
            },
            "pushes": [
              {
                "command": 3,
                "direction": "down",
                "board": 0,
                "from": 12,
                "to": 17
              },
              {
                "command": 7,
                "direction": "right",
                "board": 0,
                "from": 17,
                "to": 18
              },
              {
                "command": 16,
                "direction": "down",
                "board": 0,
                "from": 18,
                "to": 23
              }
            ],
            "directionChanges": 2,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 7,
                "plateId": "weight"
              }
            ],
            "plateReleases": [
              {
                "command": 16,
                "plateId": "weight",
                "afterGateSupport": true
              }
            ],
            "supportUses": [
              {
                "command": 9,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              },
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 0
              },
              {
                "command": 16,
                "plateId": "weight",
                "gateId": "helper-exit-2",
                "receiverBoard": 2
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "release-after-support",
              "local-stop"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "weight-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 18
              }
            ],
            "crossingCommands": [
              9,
              10
            ]
          },
          {
            "gateId": "prepare-2-6",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-2",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "prepare-2-7",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-2",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              15
            ]
          },
          {
            "gateId": "prepare-2-8",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-2",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              7
            ]
          },
          {
            "gateId": "prepare-2-9",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare-2",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": []
          },
          {
            "gateId": "helper-exit-1",
            "receiverBoard": 1,
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "controllers": [
              {
                "type": "key",
                "id": "release-key",
                "board": 0,
                "cell": 15
              }
            ],
            "crossingCommands": [
              13
            ]
          },
          {
            "gateId": "helper-exit-2",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 0,
                "cell": 18
              }
            ],
            "crossingCommands": [
              16
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 15,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 9,
            "waited": 7,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "key",
          "key-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 30,
        "directionChanges": 11,
        "earlyTurns": 5,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 45,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "A caixa assume e depois deixa apoio; chave e retorno tornam a retirada significativa.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 45,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-6014c27f-1040",
        "topologySignature": "top1-619f0940-160",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "A caixa assume e depois deixa apoio; chave e retorno tornam a retirada significativa.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Preparar o objeto, manter acesso e concluir a própria chegada.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "release-key",
              "type": "key",
              "receiverBoard": 1
            },
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 18
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Esperar a chave obtida com apoio e atravessar a passagem permanente.",
          "controls": [],
          "goal": 4
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Preparar o acesso 2, depois abandonar a placa graças ao apoio da caixa.",
          "controls": [
            {
              "id": "prepare-2",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-2",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-2",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "prepare-2",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 7
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "reorientar",
            "sustentar",
            "liberar-destino"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 18
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "keys",
          "id": "release-key",
          "definition": {
            "id": "release-key",
            "cell": 15
          },
          "role": "Aquisição pelo animal mantém a abertura até reiniciar.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 16,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              9,
              10
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-2-6",
          "definition": {
            "id": "prepare-2-6",
            "from": 8,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-2-7",
          "definition": {
            "id": "prepare-2-7",
            "from": 13,
            "to": 12,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "crossings": [
              15
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-2-8",
          "definition": {
            "id": "prepare-2-8",
            "from": 18,
            "to": 17,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "crossings": [
              7
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "prepare-2-9",
          "definition": {
            "id": "prepare-2-9",
            "from": 23,
            "to": 22,
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare-2"
            },
            "crossings": []
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "helper-exit-1",
          "definition": {
            "id": "helper-exit-1",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "key",
              "id": "release-key"
            }
          },
          "role": {
            "condition": {
              "type": "key",
              "id": "release-key"
            },
            "crossings": [
              13
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "prepare-2",
          "definition": {
            "id": "prepare-2",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit-2",
          "definition": {
            "id": "helper-exit-2",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              16
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 77,
    "chapter": 6,
    "topologySignature": "top1-619f0940-160",
    "originNumber": 200,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 200,
      "id": "sintonia-0200",
      "version": 1,
      "reason": "A caixa assume e depois deixa apoio; chave e retorno tornam a retirada significativa."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0423",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          11
        ],
        "start": 1,
        "goal": 5,
        "plates": [
          {
            "id": "choice-plate",
            "cell": 7
          }
        ],
        "selectors": [
          {
            "id": "choice",
            "cell": 11,
            "group": "choice"
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 5,
        "walkable": [
          0,
          1,
          3,
          4,
          6,
          7,
          8,
          12,
          14,
          16,
          17,
          18,
          19
        ],
        "start": 14,
        "goal": 8,
        "gates": [
          {
            "id": "choice-left",
            "from": 14,
            "to": 19,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          {
            "id": "choice-right",
            "from": 17,
            "to": 12,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          6,
          7,
          8,
          10,
          11,
          12,
          13,
          15,
          16,
          17,
          18
        ],
        "start": 7,
        "goal": 1,
        "boxes": [
          {
            "id": "box0",
            "cell": 12
          }
        ],
        "plates": [
          {
            "id": "weight",
            "cell": 16
          }
        ],
        "gates": [
          {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "selector",
      "box"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "help-recipient",
    "secondaryFamilies": [
      "dual-use-object",
      "waiting-place"
    ],
    "name": "Quem recebe a ajuda",
    "lesson": "Mude o destinatário da placa e use a caixa preparada como apoio e ponto de espera.",
    "discovery": "Aqui o jogador precisa descobrir que a placa muda de destinatário enquanto a caixa, depois de sustentar a passagem, também precisa separar os movimentos por bloqueio.",
    "hints": [
      "A placa e o seletor atendem duas etapas; a caixa do bem-te-vi também participa do alinhamento.",
      "Depois de sustentar a cancela, preserve a caixa na placa. Ela pode segurar uma seta quando não existe espaço para empurrá-la.",
      "Após usar a cancela, coloque o bem-te-vi acima da caixa: a seta para baixo o mantém parado enquanto os outros se ajustam."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0423:0",
    "difficulty": 5,
    "solution": [
      "down",
      "down",
      "down",
      "right",
      "down",
      "left",
      "up",
      "left",
      "up",
      "up",
      "right",
      "down",
      "down",
      "down",
      "right",
      "left",
      "up",
      "up",
      "right"
    ],
    "signature": "st1-07f8ea11-828",
    "prerequisites": [
      "walls",
      "plate",
      "selector",
      "box"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "selector",
      "secondary": "box",
      "role": "deep",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 19,
      "optimal": true,
      "visited": 12453,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": {
        "pattern": "selector-recipient-with-supported-stop",
        "secondaryPatterns": [
          "support-and-necessary-stop"
        ],
        "discovery": "A placa ajuda destinatários sucessivos; depois de sustentar a própria cancela, a caixa também precisa oferecer uma espera física para o alinhamento.",
        "roles": [
          "Capivara: sustentar a placa e alternar o destinatário.",
          "Tuiuiú: atravessar as duas configurações e preparar a chegada.",
          "Bem-te-vi: orientar a caixa, usar seu apoio, voltar para esperar contra ela e retornar ao destino."
        ],
        "structures": {
          "selector": "Escolher qual etapa recebe a ajuda da placa.",
          "box": "Mudar de direção até a placa, sustentar a cancela e bloquear um empurrão sem destino transitável.",
          "returnRoute": "Permitir sair do destino para alinhar os outros animais e voltar."
        },
        "preconditions": [
          "A caixa precisa sustentar uma travessia antes de cumprir o bloqueio analisado.",
          "O animal deve poder alcançar a caixa: uma cancela entre eles não conta como bloqueio da caixa."
        ],
        "proofStatus": "exhaustive-predicate-evidence-in-offline-audit",
        "evidence": {
          "report": "tests/sintonia-purpose-audit.json",
          "query": "box-supported-stop:box0",
          "witnessSupportCommands": [
            10,
            12,
            18
          ],
          "witnessStopCommand": 14
        },
        "caveat": "A prova é sobre o predicado exato de bloqueio após apoio; não declara solução única nem dificuldade humana."
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 19,
        "boxes": [
          {
            "id": "box0",
            "origin": {
              "id": "box0",
              "board": 2,
              "cell": 12
            },
            "final": {
              "id": "box0",
              "board": 2,
              "cell": 16
            },
            "pushes": [
              {
                "command": 1,
                "direction": "down",
                "board": 2,
                "from": 12,
                "to": 17
              },
              {
                "command": 6,
                "direction": "left",
                "board": 2,
                "from": 17,
                "to": 16
              }
            ],
            "directionChanges": 1,
            "deliveries": [],
            "postDeliveryPushes": [],
            "plateEntries": [
              {
                "command": 6,
                "plateId": "weight"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 10,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 2
              },
              {
                "command": 12,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 2
              },
              {
                "command": 18,
                "plateId": "weight",
                "gateId": "weight-gate",
                "receiverBoard": 2
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "local-stop",
              "support-then-stop"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "choice-left",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 7
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 11
              }
            ],
            "crossingCommands": [
              3
            ]
          },
          {
            "gateId": "choice-right",
            "receiverBoard": 1,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "controllers": [
              {
                "type": "plate",
                "id": "choice-plate",
                "board": 0,
                "cell": 7
              },
              {
                "type": "selector",
                "id": "choice",
                "board": 0,
                "cell": 11
              }
            ],
            "crossingCommands": [
              9
            ]
          },
          {
            "gateId": "weight-gate",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "weight",
                "board": 2,
                "cell": 16
              }
            ],
            "crossingCommands": [
              10,
              12,
              18
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 14,
            "waited": 5,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 11,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 14,
            "waited": 5,
            "goalDepartures": 1
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que a placa muda de destinatário enquanto a caixa, depois de sustentar a passagem, também precisa separar os movimentos por bloqueio.",
      "reasoning": {
        "used": [
          "box-support-gate",
          "plate-gate",
          "push",
          "selected-0",
          "selected-1",
          "selector"
        ],
        "partialBlocks": 16,
        "goalDepartures": [
          true,
          true,
          true
        ],
        "unequalLoops": 29,
        "directionChanges": 12,
        "earlyTurns": 6,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": true,
        "finalApproach": [
          true,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 169,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Configurar o destinatário e preservar o retorno; caixa apoia e depois oferece espera física comprovável.",
      "secondaryPattern": "support-and-necessary-stop",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        5,
        3
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 169,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-07f8ea11-828",
        "topologySignature": "top1-a8f95f59-194",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Configurar o destinatário e preservar o retorno; caixa apoia e depois oferece espera física comprovável.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "Capivara: sustentar a placa e alternar o destinatário.",
          "controls": [
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            },
            {
              "id": "choice-plate",
              "type": "plate",
              "receiverBoard": 1
            },
            {
              "id": "choice",
              "type": "selector",
              "receiverBoard": 1
            }
          ],
          "goal": 5
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "Tuiuiú: atravessar as duas configurações e preparar a chegada.",
          "controls": [],
          "goal": 8
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "Bem-te-vi: orientar a caixa, usar seu apoio, voltar para esperar contra ela e retornar ao destino.",
          "controls": [
            {
              "id": "weight",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 1
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "plates",
          "id": "choice-plate",
          "definition": {
            "id": "choice-plate",
            "cell": 7
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "selectors",
          "id": "choice",
          "definition": {
            "id": "choice",
            "cell": 11,
            "group": "choice"
          },
          "role": "Escolhe conexão A/B; a placa correspondente ainda precisa de ocupação.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-left",
          "definition": {
            "id": "choice-left",
            "from": 14,
            "to": 19,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 0
            },
            "crossings": [
              3
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "choice-right",
          "definition": {
            "id": "choice-right",
            "from": 17,
            "to": 12,
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            }
          },
          "role": {
            "condition": {
              "type": "selected",
              "plate": "choice-plate",
              "selector": "choice",
              "value": 1
            },
            "crossings": [
              9
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "boxes",
          "id": "box0",
          "definition": {
            "id": "box0",
            "cell": 12
          },
          "role": [
            "directional-reposition",
            "gate-support",
            "local-stop",
            "support-then-stop"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "weight",
          "definition": {
            "id": "weight",
            "cell": 16
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "weight-gate",
          "definition": {
            "id": "weight-gate",
            "from": 6,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "weight"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "weight"
            },
            "crossings": [
              10,
              12,
              18
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 78,
    "chapter": 6,
    "topologySignature": "top1-a8f95f59-194",
    "originNumber": 423,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 423,
      "id": "sintonia-0423",
      "version": 1,
      "reason": "Configurar o destinatário e preservar o retorno; caixa apoia e depois oferece espera física comprovável."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0473",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 6,
        "walkable": [
          19,
          20,
          21,
          22,
          23
        ],
        "start": 23,
        "goal": 19,
        "boxes": [
          {
            "id": "parcel",
            "cell": 22
          }
        ],
        "gates": [
          {
            "id": "delivery-gate",
            "from": 21,
            "to": 20,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "delivery-final",
            "from": 20,
            "to": 19,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          }
        ],
        "plates": [
          {
            "id": "sender-release",
            "cell": 21
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 6,
        "cols": 6,
        "walkable": [
          7,
          8,
          9,
          10,
          13,
          14,
          15,
          16,
          19,
          20,
          21,
          22,
          25,
          27,
          28
        ],
        "start": 21,
        "goal": 25,
        "plates": [
          {
            "id": "arrival",
            "cell": 8
          }
        ],
        "gates": [
          {
            "id": "delivery-home",
            "from": 19,
            "to": 25,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          4,
          6,
          7,
          8
        ],
        "start": 8,
        "goal": 0,
        "plates": [
          {
            "id": "helper-release",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "channels": [
      {
        "id": "parcel-channel",
        "fromBoard": 0,
        "entry": 21,
        "toBoard": 1,
        "exit": 21
      }
    ],
    "family": "support-handoff",
    "secondaryFamilies": [
      "final-command",
      "wall-adjust"
    ],
    "name": "Preparar a entrega",
    "lesson": "Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
    "hints": [
      "O canal precisa de uma saída livre antes do envio.",
      "Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.",
      "Prepare as ajudas de retorno antes de abandonar uma placa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0473:0",
    "difficulty": 5,
    "solution": [
      "down",
      "left",
      "up",
      "right",
      "up",
      "left",
      "down",
      "left",
      "left",
      "right",
      "up",
      "down",
      "left",
      "down",
      "right",
      "up",
      "left",
      "left",
      "left",
      "up",
      "left"
    ],
    "signature": "st1-c44f523a-888",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 3,
      "primary": "delivery",
      "secondary": null,
      "role": "deep",
      "pattern": "receive-hold-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 21,
      "optimal": true,
      "visited": 3883,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "requiredReceiverPushes": 2,
        "senderApproach": "ready-to-send after receiver preparation",
        "structures": {
          "channel": "redistribute one finite box resource",
          "receiverCircuit": "reach a different pushing face, not extend a corridor",
          "receiverGate": "return while sender still holds its plate",
          "helperChain": "give each extra animal a necessary support recipient"
        },
        "causalClaim": "Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.",
        "roles": [
          "send resource, then wait for returned support",
          "clear receiving space, reach the useful pushing face, and sustain support",
          "hold the sender’s final passage before leaving through the box-supported passage"
        ],
        "boxRoles": [
          "transferred-resource",
          "multi-direction-support",
          "reciprocal-release"
        ],
        "dependencies": [
          {
            "from": 0,
            "to": 1,
            "kind": "resource-delivery"
          },
          {
            "from": 1,
            "to": 0,
            "kind": "persistent-box-support"
          },
          {
            "from": 2,
            "to": 0,
            "kind": "temporary-helper-support"
          },
          {
            "from": 1,
            "to": 2,
            "kind": "returned-box-support"
          },
          {
            "from": 0,
            "to": 1,
            "kind": "hold-return-before-final-crossing"
          }
        ],
        "errors": [
          "Sending while the receiver still occupies the exit does not transfer the box.",
          "Pushing into a terminal corner can lose access to the next pushing face; undo remains available."
        ],
        "evidenceScope": "Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.",
        "pattern": "receive-hold-return",
        "discovery": "receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 21,
        "boxes": [
          {
            "id": "parcel",
            "origin": {
              "id": "parcel",
              "board": 0,
              "cell": 22
            },
            "final": {
              "id": "parcel",
              "board": 1,
              "cell": 8
            },
            "pushes": [
              {
                "command": 2,
                "direction": "left",
                "board": 0,
                "from": 22,
                "to": 21
              },
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 21,
                "to": 15
              },
              {
                "command": 6,
                "direction": "left",
                "board": 1,
                "from": 15,
                "to": 14
              },
              {
                "command": 11,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              }
            ],
            "directionChanges": 3,
            "deliveries": [
              {
                "command": 2,
                "channelId": "parcel-channel",
                "fromBoard": 0,
                "toBoard": 1,
                "entry": 21,
                "exit": 21
              }
            ],
            "postDeliveryPushes": [
              {
                "command": 3,
                "direction": "up",
                "board": 1,
                "from": 21,
                "to": 15
              },
              {
                "command": 6,
                "direction": "left",
                "board": 1,
                "from": 15,
                "to": 14
              },
              {
                "command": 11,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              }
            ],
            "plateEntries": [
              {
                "command": 11,
                "plateId": "arrival"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 18,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 20,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "transferred-resource",
              "recipient-reposition"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "delivery-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 8
              }
            ],
            "crossingCommands": [
              18
            ]
          },
          {
            "gateId": "delivery-final",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "helper-release",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              19
            ]
          },
          {
            "gateId": "delivery-home",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "sender-release",
                "board": 0,
                "cell": 21
              }
            ],
            "crossingCommands": [
              14
            ]
          },
          {
            "gateId": "helper-exit",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 8
              }
            ],
            "crossingCommands": [
              20
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 11,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 13,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 12,
            "waited": 9,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
      "reasoning": {
        "used": [
          "delivery",
          "delivery-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 18,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 51,
        "directionChanges": 17,
        "earlyTurns": 10,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 88,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Entrega com reorientação e ajuda entre três animais; o remetente preserva o retorno.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        3,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 88,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-c44f523a-888",
        "topologySignature": "top1-97eb276b-169",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Entrega com reorientação e ajuda entre três animais; o remetente preserva o retorno.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "send resource, then wait for returned support",
          "controls": [
            {
              "id": "sender-release",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 19
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "clear receiving space, reach the useful pushing face, and sustain support",
          "controls": [
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 25
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "hold the sender’s final passage before leaving through the box-supported passage",
          "controls": [
            {
              "id": "helper-release",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 0
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "parcel",
          "definition": {
            "id": "parcel",
            "cell": 22
          },
          "role": [
            "transferred-resource",
            "multi-direction-support",
            "reciprocal-release"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "sender-release",
          "definition": {
            "id": "sender-release",
            "cell": 21
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-gate",
          "definition": {
            "id": "delivery-gate",
            "from": 21,
            "to": 20,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              18
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-final",
          "definition": {
            "id": "delivery-final",
            "from": 20,
            "to": 19,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "crossings": [
              19
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "arrival",
          "definition": {
            "id": "arrival",
            "cell": 8
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "delivery-home",
          "definition": {
            "id": "delivery-home",
            "from": 19,
            "to": 25,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "crossings": [
              14
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "helper-release",
          "definition": {
            "id": "helper-release",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit",
          "definition": {
            "id": "helper-exit",
            "from": 4,
            "to": 1,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              20
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "type": "channel",
          "id": "parcel-channel",
          "definition": {
            "id": "parcel-channel",
            "fromBoard": 0,
            "entry": 21,
            "toBoard": 1,
            "exit": 21
          },
          "role": "Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 79,
    "chapter": 6,
    "topologySignature": "top1-97eb276b-169",
    "originNumber": 473,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 473,
      "id": "sintonia-0473",
      "version": 1,
      "reason": "Entrega com reorientação e ajuda entre três animais; o remetente preserva o retorno."
    },
    "actorIntroduction": null
  },
  {
    "id": "sintonia-0500",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 6,
        "cols": 6,
        "walkable": [
          6,
          7,
          8,
          12,
          13,
          14,
          15,
          16
        ],
        "start": 14,
        "goal": 16,
        "boxes": [
          {
            "id": "parcel",
            "cell": 13
          }
        ],
        "gates": [
          {
            "id": "delivery-gate",
            "from": 14,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "delivery-final",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          }
        ],
        "plates": [
          {
            "id": "sender-release",
            "cell": 14
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 6,
        "cols": 6,
        "walkable": [
          7,
          8,
          9,
          10,
          13,
          14,
          15,
          16,
          19,
          20,
          21,
          22,
          25,
          26,
          28
        ],
        "start": 20,
        "goal": 28,
        "plates": [
          {
            "id": "arrival",
            "cell": 9
          }
        ],
        "gates": [
          {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          4,
          7,
          8
        ],
        "start": 0,
        "goal": 8,
        "plates": [
          {
            "id": "helper-release",
            "cell": 4
          }
        ],
        "gates": [
          {
            "id": "helper-exit",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          {
            "id": "prepare-helper",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "prepare"
            }
          }
        ]
      },
      {
        "id": "b3",
        "animal": "mico",
        "rows": 3,
        "cols": 3,
        "walkable": [
          0,
          1,
          4,
          5,
          8
        ],
        "start": 0,
        "goal": 8,
        "plates": [
          {
            "id": "prepare",
            "cell": 1
          }
        ],
        "gates": [
          {
            "id": "preparer-exit",
            "from": 5,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          }
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "channels": [
      {
        "id": "parcel-channel",
        "fromBoard": 0,
        "entry": 14,
        "toBoard": 1,
        "exit": 20
      }
    ],
    "family": "support-handoff",
    "secondaryFamilies": [
      "priority-change",
      "final-command"
    ],
    "name": "Preparar a entrega",
    "lesson": "Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.",
    "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
    "hints": [
      "O canal precisa de uma saída livre antes do envio.",
      "Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.",
      "Prepare as ajudas de retorno antes de abandonar uma placa."
    ],
    "generatorVersion": 2,
    "contentRevision": "sintonia-content-3",
    "seed": "sintonia-campaign-v2:0500:0",
    "difficulty": 5,
    "solution": [
      "up",
      "left",
      "down",
      "left",
      "down",
      "right",
      "up",
      "up",
      "left",
      "up",
      "right",
      "down",
      "down",
      "down",
      "up",
      "right",
      "right",
      "up",
      "left",
      "down",
      "right",
      "down",
      "right",
      "right",
      "down",
      "right"
    ],
    "signature": "st1-42420cc7-1169",
    "prerequisites": [
      "walls",
      "plate",
      "box",
      "delivery"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 4,
      "primary": "delivery",
      "secondary": null,
      "role": "synthesis",
      "pattern": "receive-hold-return"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 26,
      "optimal": true,
      "visited": 12253,
      "replayed": true,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "role-first-structure-and-automatic-curation",
      "design": {
        "requiredReceiverPushes": 2,
        "senderApproach": "start-on-wrong-face; preserve upper bypass before sending",
        "structures": {
          "channel": "redistribute one finite box resource",
          "receiverCircuit": "reach a different pushing face, not extend a corridor",
          "receiverGate": "return while sender still holds its plate",
          "helperChain": "give each extra animal a necessary support recipient"
        },
        "causalClaim": "Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.",
        "roles": [
          "send resource, then wait for returned support",
          "clear receiving space, reach the useful pushing face, and sustain support",
          "hold the sender’s final passage before leaving through the box-supported passage",
          "prepare the helper’s entrance before using the returned box support"
        ],
        "boxRoles": [
          "transferred-resource",
          "multi-direction-support",
          "reciprocal-release"
        ],
        "dependencies": [
          {
            "from": 0,
            "to": 1,
            "kind": "resource-delivery"
          },
          {
            "from": 1,
            "to": 0,
            "kind": "persistent-box-support"
          },
          {
            "from": 2,
            "to": 0,
            "kind": "temporary-helper-support"
          },
          {
            "from": 1,
            "to": 2,
            "kind": "returned-box-support"
          },
          {
            "from": 3,
            "to": 2,
            "kind": "prepare-helper"
          },
          {
            "from": 1,
            "to": 3,
            "kind": "returned-box-support"
          },
          {
            "from": 0,
            "to": 1,
            "kind": "hold-return-before-final-crossing"
          }
        ],
        "errors": [
          "Sending while the receiver still occupies the exit does not transfer the box.",
          "Pushing into a terminal corner can lose access to the next pushing face; undo remains available."
        ],
        "evidenceScope": "Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.",
        "pattern": "receive-hold-return",
        "discovery": "receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda"
      },
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 26,
        "boxes": [
          {
            "id": "parcel",
            "origin": {
              "id": "parcel",
              "board": 0,
              "cell": 13
            },
            "final": {
              "id": "parcel",
              "board": 1,
              "cell": 9
            },
            "pushes": [
              {
                "command": 6,
                "direction": "right",
                "board": 0,
                "from": 13,
                "to": 14
              },
              {
                "command": 7,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 8,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              },
              {
                "command": 11,
                "direction": "right",
                "board": 1,
                "from": 8,
                "to": 9
              }
            ],
            "directionChanges": 2,
            "deliveries": [
              {
                "command": 6,
                "channelId": "parcel-channel",
                "fromBoard": 0,
                "toBoard": 1,
                "entry": 14,
                "exit": 20
              }
            ],
            "postDeliveryPushes": [
              {
                "command": 7,
                "direction": "up",
                "board": 1,
                "from": 20,
                "to": 14
              },
              {
                "command": 8,
                "direction": "up",
                "board": 1,
                "from": 14,
                "to": 8
              },
              {
                "command": 11,
                "direction": "right",
                "board": 1,
                "from": 8,
                "to": 9
              }
            ],
            "plateEntries": [
              {
                "command": 11,
                "plateId": "arrival"
              }
            ],
            "plateReleases": [],
            "supportUses": [
              {
                "command": 13,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              },
              {
                "command": 15,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              },
              {
                "command": 23,
                "plateId": "arrival",
                "gateId": "delivery-gate",
                "receiverBoard": 0
              },
              {
                "command": 25,
                "plateId": "arrival",
                "gateId": "helper-exit",
                "receiverBoard": 2
              },
              {
                "command": 25,
                "plateId": "arrival",
                "gateId": "preparer-exit",
                "receiverBoard": 3
              }
            ],
            "observedRoles": [
              "directional-reposition",
              "gate-support",
              "transferred-resource",
              "recipient-reposition",
              "local-stop"
            ]
          }
        ],
        "dependencies": [
          {
            "gateId": "delivery-gate",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 9
              }
            ],
            "crossingCommands": [
              23
            ]
          },
          {
            "gateId": "delivery-final",
            "receiverBoard": 0,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "helper-release",
                "board": 2,
                "cell": 4
              }
            ],
            "crossingCommands": [
              24
            ]
          },
          {
            "gateId": "delivery-home",
            "receiverBoard": 1,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "sender-release",
                "board": 0,
                "cell": 14
              }
            ],
            "crossingCommands": [
              22
            ]
          },
          {
            "gateId": "helper-exit",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 9
              }
            ],
            "crossingCommands": [
              13,
              15,
              25
            ]
          },
          {
            "gateId": "prepare-helper",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "prepare"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "prepare",
                "board": 3,
                "cell": 1
              }
            ],
            "crossingCommands": [
              12,
              18,
              22
            ]
          },
          {
            "gateId": "preparer-exit",
            "receiverBoard": 3,
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "arrival",
                "board": 1,
                "cell": 9
              }
            ],
            "crossingCommands": [
              25
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 16,
            "waited": 10,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 21,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 12,
            "waited": 14,
            "goalDepartures": 0
          },
          {
            "board": 3,
            "moved": 10,
            "waited": 16,
            "goalDepartures": 0
          }
        ],
        "caveat": "Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites."
      },
      "rubric": {
        "status": "human-review-pending",
        "dimensions": [
          "purpose",
          "discovery",
          "interdependence",
          "causal-clarity",
          "spatial-economy",
          "variety"
        ],
        "scores": null,
        "humanPlaytesting": false,
        "reason": "Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos."
      },
      "humanPlaytested": false,
      "discovery": "Aqui o jogador precisa descobrir que receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda.",
      "reasoning": {
        "used": [
          "delivery",
          "delivery-gate",
          "plate-gate",
          "push"
        ],
        "partialBlocks": 19,
        "goalDepartures": [
          false,
          false,
          false,
          false
        ],
        "unequalLoops": 53,
        "directionChanges": 20,
        "earlyTurns": 10,
        "occupiedBoxPlate": true,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false,
          true
        ]
      },
      "sweep": {
        "status": "complete",
        "visited": 151,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "A fase permite estados sem saída; desfazer e reiniciar são livres.",
      "decision": "retain-logical-definition",
      "retentionReason": "Quatro responsabilidades distintas: preparar, enviar, receber, devolver apoio e chegar conjuntamente.",
      "role": "synthesis",
      "prerequisiteChapters": [
        1,
        2,
        3,
        5
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 151,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 12,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "repetition": {
        "structuralSignature": "st1-42420cc7-1169",
        "topologySignature": "top1-aa78f8f2-218",
        "globallyRotatedOrReflectedDuplicate": false
      },
      "curriculumReason": "Quatro responsabilidades distintas: preparar, enviar, receber, devolver apoio e chegar conjuntamente.",
      "animalRoles": [
        {
          "board": 0,
          "logicalAnimal": "capivara",
          "role": "send resource, then wait for returned support",
          "controls": [
            {
              "id": "sender-release",
              "type": "plate",
              "receiverBoard": 1
            }
          ],
          "goal": 16
        },
        {
          "board": 1,
          "logicalAnimal": "tuiuiu",
          "role": "clear receiving space, reach the useful pushing face, and sustain support",
          "controls": [
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 0
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 2
            },
            {
              "id": "arrival",
              "type": "plate",
              "receiverBoard": 3
            }
          ],
          "goal": 28
        },
        {
          "board": 2,
          "logicalAnimal": "bemtevi",
          "role": "hold the sender’s final passage before leaving through the box-supported passage",
          "controls": [
            {
              "id": "helper-release",
              "type": "plate",
              "receiverBoard": 0
            }
          ],
          "goal": 8
        },
        {
          "board": 3,
          "logicalAnimal": "mico",
          "role": "prepare the helper’s entrance before using the returned box support",
          "controls": [
            {
              "id": "prepare",
              "type": "plate",
              "receiverBoard": 2
            }
          ],
          "goal": 8
        }
      ],
      "objectRoles": [
        {
          "board": 0,
          "type": "boxes",
          "id": "parcel",
          "definition": {
            "id": "parcel",
            "cell": 13
          },
          "role": [
            "transferred-resource",
            "multi-direction-support",
            "reciprocal-release"
          ],
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "plates",
          "id": "sender-release",
          "definition": {
            "id": "sender-release",
            "cell": 14
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-gate",
          "definition": {
            "id": "delivery-gate",
            "from": 14,
            "to": 15,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              23
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 0,
          "type": "gates",
          "id": "delivery-final",
          "definition": {
            "id": "delivery-final",
            "from": 15,
            "to": 16,
            "condition": {
              "type": "plate",
              "id": "helper-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "helper-release"
            },
            "crossings": [
              24
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "plates",
          "id": "arrival",
          "definition": {
            "id": "arrival",
            "cell": 9
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 1,
          "type": "gates",
          "id": "delivery-home",
          "definition": {
            "id": "delivery-home",
            "from": 22,
            "to": 28,
            "condition": {
              "type": "plate",
              "id": "sender-release"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "sender-release"
            },
            "crossings": [
              22
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "plates",
          "id": "helper-release",
          "definition": {
            "id": "helper-release",
            "cell": 4
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "helper-exit",
          "definition": {
            "id": "helper-exit",
            "from": 4,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              13,
              15,
              25
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 2,
          "type": "gates",
          "id": "prepare-helper",
          "definition": {
            "id": "prepare-helper",
            "from": 1,
            "to": 4,
            "condition": {
              "type": "plate",
              "id": "prepare"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "prepare"
            },
            "crossings": [
              12,
              18,
              22
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 3,
          "type": "plates",
          "id": "prepare",
          "definition": {
            "id": "prepare",
            "cell": 1
          },
          "role": "Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "board": 3,
          "type": "gates",
          "id": "preparer-exit",
          "definition": {
            "id": "preparer-exit",
            "from": 5,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "arrival"
            }
          },
          "role": {
            "condition": {
              "type": "plate",
              "id": "arrival"
            },
            "crossings": [
              25
            ]
          },
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        },
        {
          "type": "channel",
          "id": "parcel-channel",
          "definition": {
            "id": "parcel-channel",
            "fromBoard": 0,
            "entry": 14,
            "toBoard": 1,
            "exit": 20
          },
          "role": "Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.",
          "evidenceScope": "definition-and-certified-witness; necessity requires separate audit"
        }
      ],
      "causalityReport": "tests/sintonia80-purpose-audit.json"
    },
    "number": 80,
    "chapter": 6,
    "topologySignature": "top1-aa78f8f2-218",
    "originNumber": 500,
    "origin": {
      "kind": "curated-identical-logical-definition",
      "catalog": "sintonia-content-2",
      "number": 500,
      "id": "sintonia-0500",
      "version": 1,
      "reason": "Quatro responsabilidades distintas: preparar, enviar, receber, devolver apoio e chegar conjuntamente."
    },
    "actorIntroduction": null
  }
];
