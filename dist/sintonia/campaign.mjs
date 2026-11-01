/** 71 exact retained definitions; 9 goal/button separation revisions. */
export const CONTENT_REVISION='sintonia-content-5';
export const DIFFICULTIES=Object.freeze(["Básico","Aprendiz","Intermediário","Avançado","Mestre","Modo Sábio"]);
export const CHAPTERS=DIFFICULTIES;
export const CAMPAIGN=[
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
    "id": "sintonia80-0016-v5",
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
          4,
          6,
          8,
          9,
          10,
          11,
          13,
          15
        ],
        "start": 10,
        "goal": 11,
        "plates": [
          {
            "id": "support",
            "cell": 9
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
          5,
          8,
          9,
          10,
          11,
          12,
          14
        ],
        "start": 11,
        "goal": 12,
        "gates": [
          {
            "id": "plate-gate",
            "from": 8,
            "to": 12,
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
      "priority-change",
      "intermediate-stop"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:16:12",
    "difficulty": 1,
    "solution": [
      "up",
      "left",
      "left",
      "down",
      "left",
      "down",
      "up",
      "right",
      "right"
    ],
    "signature": "st1-939d50c8-344",
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
      "commands": 9,
      "optimal": true,
      "visited": 79,
      "replayed": true,
      "firstVictoryAt": 9,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
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
                "cell": 9
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
            "moved": 7,
            "waited": 2,
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
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 7,
        "directionChanges": 6,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 70,
            "optimal": false,
            "exhaustive": true
          }
        }
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 16,
    "chapter": 2,
    "originNumber": 16,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia-0076",
      "number": 16,
      "version": 1
    },
    "topologySignature": "top1-d6b94bd5-120",
    "actorIntroduction": null
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
    "id": "sintonia80-0031-v5",
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
        "goal": 1,
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
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "sintonia-campaign-v2:0151:0",
    "difficulty": 2,
    "solution": [
      "right",
      "down",
      "up",
      "up",
      "up",
      "left",
      "down",
      "left",
      "left",
      "down",
      "right",
      "up",
      "right",
      "down"
    ],
    "signature": "st1-d475643d-549",
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
      "commands": 14,
      "optimal": true,
      "visited": 446,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 14
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 14,
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
            "moved": 11,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 8,
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
        "partialBlocks": 12,
        "goalDepartures": [
          true,
          false,
          true
        ],
        "unequalLoops": 22,
        "directionChanges": 10,
        "earlyTurns": 6,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          true
        ]
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
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
      "causalityReport": "docs/sintonia-goals-v5-certificates.json",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 151,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 61,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "goalButtonSeparation": true
    },
    "number": 31,
    "chapter": 3,
    "topologySignature": "top1-58f5ced3-169",
    "originNumber": 31,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia-0151",
      "number": 31,
      "version": 1
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
    "id": "sintonia80-0034-v4",
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
          9,
          11
        ],
        "start": 0,
        "goal": 4,
        "plates": [
          {
            "id": "support",
            "cell": 9
          }
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 4,
        "cols": 4,
        "walkable": [
          5,
          8,
          9,
          10,
          11,
          12,
          15
        ],
        "start": 15,
        "goal": 8,
        "gates": [
          {
            "id": "plate-gate",
            "from": 9,
            "to": 8,
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
      "goal-transit"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:34:0",
    "difficulty": 2,
    "solution": [
      "up",
      "right",
      "right",
      "left",
      "down",
      "down",
      "left",
      "down",
      "left",
      "up",
      "right",
      "up"
    ],
    "signature": "st1-8daf2263-337",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 49,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
                "cell": 9
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
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
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
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 10,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 8,
        "directionChanges": 9,
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
        "visited": 8,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Sustentar a passagem e escolher quando liberar o apoio.",
      "retentionReason": "Sustentar a passagem e escolher quando liberar o apoio.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 42,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 34,
    "chapter": 3,
    "originNumber": 34,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0176",
      "number": 34,
      "version": 1,
      "reason": "Sustentar a passagem e escolher quando liberar o apoio."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-7115ad84-112"
  },
  {
    "id": "sintonia80-0035-v4",
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
          6,
          8,
          12
        ],
        "start": 3,
        "goal": 12,
        "switches": [
          {
            "id": "prepare",
            "cell": 6,
            "group": "prepare"
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
          4,
          5,
          6,
          8,
          9,
          10,
          11
        ],
        "start": 9,
        "goal": 5,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 10,
            "to": 11,
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
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:35:0",
    "difficulty": 2,
    "solution": [
      "left",
      "down",
      "right",
      "right",
      "up",
      "up",
      "left",
      "left",
      "down",
      "down",
      "down",
      "right"
    ],
    "signature": "st1-6bfb5a61-378",
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
      "role": "varied",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 103,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
              12
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              11,
              8,
              5,
              4
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              2,
              6
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
              8,
              12
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              10,
              11
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
        "commands": 12,
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
                "cell": 6
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
            "moved": 8,
            "waited": 4,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
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
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 11,
        "directionChanges": 6,
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
        "visited": 8,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Configurar a cancela antes de retornar ao percurso final.",
      "retentionReason": "Configurar a cancela antes de retornar ao percurso final.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 44,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 35,
    "chapter": 3,
    "originNumber": 35,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0179",
      "number": 35,
      "version": 1,
      "reason": "Configurar a cancela antes de retornar ao percurso final."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-ee7aab2c-113"
  },
  {
    "id": "sintonia80-0036-v5",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          5,
          6,
          10,
          11,
          12,
          13,
          14,
          15,
          17
        ],
        "start": 11,
        "goal": 2,
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
        "start": 6,
        "goal": 8,
        "gates": [
          {
            "id": "plate-gate",
            "from": 5,
            "to": 8,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 6,
            "to": 3,
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
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          7,
          9,
          12,
          13,
          14,
          18,
          19,
          21,
          22,
          23,
          24
        ],
        "start": 14,
        "goal": 9,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 12
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
      "goal-transit",
      "intermediate-stop"
    ],
    "name": "Uma passagem para o outro",
    "lesson": "Prepare a placa que abre o caminho do outro animal.",
    "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
    "hints": [
      "Encontre a placa e a cancela com o mesmo símbolo.",
      "O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:36:12",
    "difficulty": 2,
    "solution": [
      "left",
      "left",
      "down",
      "up",
      "down",
      "right",
      "right",
      "up",
      "up",
      "down",
      "down",
      "up",
      "right",
      "up",
      "up",
      "right"
    ],
    "signature": "st1-e78804af-564",
    "prerequisites": [
      "walls"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 2,
      "animals": 3,
      "primary": "plate",
      "secondary": null,
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 16,
      "optimal": true,
      "visited": 745,
      "replayed": true,
      "firstVictoryAt": 16,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 16,
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
              11
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
                "cell": 12
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
            "moved": 13,
            "waited": 3,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 6,
            "waited": 10,
            "goalDepartures": 0
          },
          {
            "board": 2,
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
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 12,
        "goalDepartures": [
          false,
          false,
          true
        ],
        "unequalLoops": 37,
        "directionChanges": 10,
        "earlyTurns": 6,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          true
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 590,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 104,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 35,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 36,
    "chapter": 3,
    "originNumber": 36,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia80-0036-v4",
      "number": 36,
      "version": 1
    },
    "topologySignature": "top1-0fb7034d-190",
    "actorIntroduction": null
  },
  {
    "id": "sintonia80-0037-v4",
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
          8,
          9,
          11,
          13,
          15
        ],
        "start": 11,
        "goal": 0,
        "keys": [
          {
            "id": "prepare",
            "cell": 8
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
          5,
          8,
          9,
          10,
          11
        ],
        "start": 1,
        "goal": 10,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 5,
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
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "unequal-loop",
      "goal-transit"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:37:0",
    "difficulty": 2,
    "solution": [
      "up",
      "up",
      "down",
      "left",
      "left",
      "down",
      "left",
      "down",
      "right",
      "up",
      "up",
      "right",
      "left"
    ],
    "signature": "st1-a669c54f-346",
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
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 101,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 13
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
            "control": 8,
            "commit": null,
            "goalRegion": [
              0
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              9,
              10,
              8,
              11
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              11,
              7,
              6,
              5,
              9,
              8
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              5,
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
            "moved": 11,
            "waited": 2,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 5,
            "waited": 8,
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
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          true
        ],
        "unequalLoops": 14,
        "directionChanges": 9,
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
        "visited": 7,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Fazer o desvio da chave antes da chegada conjunta.",
      "retentionReason": "Fazer o desvio da chave antes da chegada conjunta.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 55,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 37,
    "chapter": 3,
    "originNumber": 37,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0193",
      "number": 37,
      "version": 1,
      "reason": "Fazer o desvio da chave antes da chegada conjunta."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-f41a0e17-119"
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
    "id": "sintonia80-0042-v4",
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
          7,
          8,
          9,
          10,
          11
        ],
        "start": 0,
        "goal": 10,
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
          4,
          8,
          9,
          11,
          13,
          14,
          15
        ],
        "start": 11,
        "goal": 4
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
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:42:0",
    "difficulty": 2,
    "solution": [
      "down",
      "down",
      "left",
      "left",
      "up",
      "left",
      "down",
      "right",
      "right",
      "left",
      "up"
    ],
    "signature": "st1-a4fb2522-220",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 52,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 11
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
        "dependencies": [],
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
        "partialBlocks": 7,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 12,
        "directionChanges": 7,
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
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Escolher a parada que permite sincronizar o parceiro.",
      "retentionReason": "Escolher a parada que permite sincronizar o parceiro.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 18,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 42,
    "chapter": 3,
    "originNumber": 42,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0247",
      "number": 42,
      "version": 1,
      "reason": "Escolher a parada que permite sincronizar o parceiro."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-c5b3ac05-114"
  },
  {
    "id": "sintonia80-0043-v4",
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
          3,
          4,
          5,
          7,
          8
        ],
        "start": 2,
        "goal": 8,
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
          0,
          2,
          3,
          4,
          5,
          7,
          8,
          11,
          12,
          13,
          14,
          15
        ],
        "start": 3,
        "goal": 5,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 7,
            "to": 11,
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
      "axis-order"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:43:0",
    "difficulty": 2,
    "solution": [
      "down",
      "right",
      "left",
      "down",
      "down",
      "left",
      "down",
      "left",
      "left",
      "up",
      "up",
      "up",
      "down",
      "right"
    ],
    "signature": "st1-d537d137-353",
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
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 14,
      "optimal": true,
      "visited": 90,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 14
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
              8
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              11,
              15,
              14,
              13,
              12,
              8,
              4,
              0,
              5
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              2,
              3
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              1,
              5
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              4,
              8
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              7,
              11
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
                "cell": 3
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
            "waited": 8,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 11,
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
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 13,
        "directionChanges": 9,
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
        "visited": 36,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Preparar abertura permanente e depois corrigir a defasagem.",
      "retentionReason": "Preparar abertura permanente e depois corrigir a defasagem.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 36,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 32,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 43,
    "chapter": 3,
    "originNumber": 43,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0237",
      "number": 43,
      "version": 1,
      "reason": "Preparar abertura permanente e depois corrigir a defasagem."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-e0f059f5-123"
  },
  {
    "id": "sintonia80-0044-v4",
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
          4,
          5,
          8,
          10,
          12,
          13,
          14,
          15
        ],
        "start": 0,
        "goal": 10,
        "switches": [
          {
            "id": "prepare",
            "cell": 5,
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
          4,
          8,
          9,
          13,
          14
        ],
        "start": 2,
        "goal": 9,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 1,
            "to": 0,
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
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:44:0",
    "difficulty": 2,
    "solution": [
      "down",
      "right",
      "left",
      "left",
      "down",
      "down",
      "right",
      "right",
      "up"
    ],
    "signature": "st1-51fd96a3-384",
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
      "role": "varied",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 9,
      "optimal": true,
      "visited": 127,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 9
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
            "control": 5,
            "commit": null,
            "goalRegion": [
              10
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              0,
              4,
              8,
              9,
              13,
              14
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
              5
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              4,
              8
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              14,
              10
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              1,
              0
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
                "cell": 5
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
            "moved": 8,
            "waited": 1,
            "goalDepartures": 0
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
        "visited": 5,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Alternar a configuração sem perder a rota de retorno.",
      "retentionReason": "Alternar a configuração sem perder a rota de retorno.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 6
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 32,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 44,
    "chapter": 3,
    "originNumber": 44,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0187",
      "number": 44,
      "version": 1,
      "reason": "Alternar a configuração sem perder a rota de retorno."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-22a8aaab-119"
  },
  {
    "id": "sintonia80-0045-v5",
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
          4,
          5,
          6,
          7,
          8
        ],
        "start": 0,
        "goal": 4,
        "plates": [
          {
            "id": "support",
            "cell": 5
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
          5,
          8,
          9,
          10,
          11
        ],
        "start": 0,
        "goal": 10,
        "gates": [
          {
            "id": "plate-gate",
            "from": 5,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "support"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 5,
            "to": 1,
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
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          7,
          8,
          9,
          10
        ],
        "start": 2,
        "goal": 1,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 3
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
      "unequal-loop",
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
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "sintonia-content4:45:0",
    "difficulty": 2,
    "solution": [
      "right",
      "down",
      "right",
      "down",
      "right",
      "right",
      "left",
      "down",
      "right",
      "up",
      "up",
      "left",
      "down"
    ],
    "signature": "st1-2946b983-536",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 302,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 13
    },
    "editorial": {
      "source": "goal-button-separation-v5",
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
                "cell": 5
              }
            ],
            "crossingCommands": [
              4
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
                "cell": 3
              }
            ],
            "crossingCommands": [
              2
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 10,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 5,
            "goalDepartures": 2
          },
          {
            "board": 2,
            "moved": 7,
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
      "discovery": "Aqui o jogador precisa descobrir que a ocupação de uma placa prepara a passagem de outro tabuleiro.",
      "reasoning": {
        "used": [
          "plate-gate"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          true,
          true,
          false
        ],
        "unequalLoops": 19,
        "directionChanges": 10,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true,
          true
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "O terceiro animal prepara a passagem de outro painel.",
      "retentionReason": "O terceiro animal prepara a passagem de outro painel.",
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 151,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 89,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "docs/sintonia-goals-v5-certificates.json",
      "goalButtonSeparation": true
    },
    "number": 45,
    "chapter": 3,
    "originNumber": 45,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia80-0045-v4",
      "number": 45,
      "version": 1
    },
    "actorIntroduction": null,
    "topologySignature": "top1-0ad9a3ce-163"
  },
  {
    "id": "sintonia80-0046-v4",
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
        "start": 2,
        "goal": 0,
        "keys": [
          {
            "id": "prepare",
            "cell": 7
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
          2,
          3,
          4,
          5,
          6,
          8,
          10,
          11,
          12,
          13,
          15
        ],
        "start": 13,
        "goal": 2,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 12,
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
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "waiting-place",
      "wall-adjust"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:46:0",
    "difficulty": 3,
    "solution": [
      "down",
      "right",
      "left",
      "left",
      "up",
      "left",
      "up",
      "right",
      "right",
      "up"
    ],
    "signature": "st1-7ae286fd-350",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 106,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 10
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
            "control": 7,
            "commit": null,
            "goalRegion": [
              0
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              4,
              5,
              0,
              6,
              10,
              2,
              11,
              3,
              15
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              2,
              6,
              7
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              5,
              4
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              4,
              0
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              12,
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
                "cell": 7
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
            "waited": 4,
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
        "partialBlocks": 8,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 7,
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
        "visited": 4,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Separar preparação permanente de posicionamento final.",
      "retentionReason": "Separar preparação permanente de posicionamento final.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 4,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 10
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 29,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 46,
    "chapter": 4,
    "originNumber": 46,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0268",
      "number": 46,
      "version": 1,
      "reason": "Separar preparação permanente de posicionamento final."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-033ee1a7-124"
  },
  {
    "id": "sintonia80-0047-v4",
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
          8,
          9,
          11,
          12,
          14,
          15
        ],
        "start": 14,
        "goal": 12,
        "ice": [
          6
        ]
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 3,
        "cols": 4,
        "walkable": [
          1,
          4,
          5,
          8,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 4
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
      "wall-adjust",
      "priority-change"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:47:0",
    "difficulty": 3,
    "solution": [
      "right",
      "up",
      "up",
      "left",
      "down",
      "left",
      "up",
      "up",
      "down",
      "left"
    ],
    "signature": "st1-f4638d29-225",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 60,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 10
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
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 3,
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
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 7,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 7,
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
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Usar deslizamento e recuo para obter a parada intermediária.",
      "retentionReason": "Usar deslizamento e recuo para obter a parada intermediária.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 34,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 47,
    "chapter": 4,
    "originNumber": 47,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0399",
      "number": 47,
      "version": 1,
      "reason": "Usar deslizamento e recuo para obter a parada intermediária."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-37f96aca-117"
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
    "id": "sintonia80-0049-v4",
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
          7,
          10,
          11,
          12,
          13,
          14
        ],
        "start": 3,
        "goal": 13,
        "switches": [
          {
            "id": "prepare",
            "cell": 2,
            "group": "prepare"
          }
        ],
        "gates": [
          {
            "id": "contributor-gate-2",
            "from": 10,
            "to": 11,
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
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          4,
          5,
          8,
          12,
          13,
          14,
          15
        ],
        "start": 13,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 12,
            "to": 8,
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
          3,
          4,
          5,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 11,
        "goal": 0,
        "switches": [
          {
            "id": "contributor-2",
            "cell": 10,
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
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:49:0",
    "difficulty": 3,
    "solution": [
      "left",
      "up",
      "left",
      "up",
      "up",
      "right",
      "down",
      "down",
      "left",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-2f021492-648",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "switch",
      "secondary": null,
      "role": "varied",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 2163,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
              13
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              8,
              4,
              5,
              0
            ]
          },
          {
            "board": 2,
            "role": "independent-preparer-and-aligner",
            "control": 10,
            "goalRegion": [
              8,
              9,
              4,
              5,
              7,
              0,
              1,
              2,
              3
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              3,
              2
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              7,
              11
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              14,
              13
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              12,
              8
            ]
          },
          {
            "board": 2,
            "role": "prepare",
            "cells": [
              10
            ]
          },
          {
            "board": 0,
            "role": "contributor-exit",
            "edge": [
              10,
              11
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
        "commands": 12,
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
                "cell": 10
              }
            ],
            "crossingCommands": [
              9
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
                "cell": 2
              }
            ],
            "crossingCommands": [
              2,
              10,
              12
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 4,
            "goalDepartures": 2
          },
          {
            "board": 2,
            "moved": 9,
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
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          true,
          false
        ],
        "unequalLoops": 16,
        "directionChanges": 9,
        "earlyTurns": 8,
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
        "visited": 101,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Distribuir controle e espera entre três percursos.",
      "retentionReason": "Distribuir controle e espera entre três percursos.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 1070,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 1055,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 49,
    "chapter": 4,
    "originNumber": 49,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0251",
      "number": 49,
      "version": 1,
      "reason": "Distribuir controle e espera entre três percursos."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-c636288c-172"
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
    "id": "sintonia80-0052-v4",
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
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          15
        ],
        "start": 13,
        "goal": 2,
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
        "rows": 3,
        "cols": 4,
        "walkable": [
          0,
          2,
          4,
          5,
          6,
          8,
          10
        ],
        "start": 0,
        "goal": 10,
        "gates": [
          {
            "id": "plate-gate",
            "from": 6,
            "to": 10,
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
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:52:0",
    "difficulty": 3,
    "solution": [
      "up",
      "up",
      "down",
      "right",
      "up",
      "right",
      "down",
      "up",
      "left",
      "up"
    ],
    "signature": "st1-70c3e01b-341",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "plate",
      "secondary": null,
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 75,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 10
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
              7
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
        "unequalLoops": 7,
        "directionChanges": 8,
        "earlyTurns": 6,
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
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Abandonar o apoio somente depois da travessia do parceiro.",
      "retentionReason": "Abandonar o apoio somente depois da travessia do parceiro.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 4
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 63,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 52,
    "chapter": 4,
    "originNumber": 52,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0210",
      "number": 52,
      "version": 1,
      "reason": "Abandonar o apoio somente depois da travessia do parceiro."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-35b494f4-120"
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
    "id": "sintonia80-0054-v4",
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
          7,
          9,
          11,
          13,
          15
        ],
        "start": 0,
        "goal": 15,
        "keys": [
          {
            "id": "prepare",
            "cell": 9
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
          4,
          6,
          9,
          10,
          11,
          13
        ],
        "start": 9,
        "goal": 1,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 10,
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
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "intermediate-stop",
      "axis-order"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:54:0",
    "difficulty": 3,
    "solution": [
      "right",
      "down",
      "right",
      "down",
      "left",
      "up",
      "up",
      "right",
      "right",
      "down",
      "down",
      "left",
      "left"
    ],
    "signature": "st1-84569d6f-352",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 126,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 13
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
            "control": 9,
            "commit": null,
            "goalRegion": [
              15
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              2,
              1,
              3,
              0,
              4
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
              5,
              9
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              7,
              11
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
              10,
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
                "cell": 9
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
            "waited": 5,
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
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 9,
        "directionChanges": 8,
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
        "visited": 11,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Antecipar a aquisição da chave e preservar tempo para ajustar o outro animal.",
      "retentionReason": "Antecipar a aquisição da chave e preservar tempo para ajustar o outro animal.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 2
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 68,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 54,
    "chapter": 4,
    "originNumber": 54,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0312",
      "number": 54,
      "version": 1,
      "reason": "Antecipar a aquisição da chave e preservar tempo para ajustar o outro animal."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-fa4bb5f3-124"
  },
  {
    "id": "sintonia80-0055-v4",
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
          6,
          9,
          10
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
      "goal-transit",
      "final-command"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:55:0",
    "difficulty": 3,
    "solution": [
      "left",
      "left",
      "down",
      "down",
      "right",
      "up",
      "left",
      "up",
      "right",
      "right"
    ],
    "signature": "st1-0e436d2e-216",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 10,
      "optimal": true,
      "visited": 42,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 10
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
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 3,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 8,
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
        "partialBlocks": 5,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 6,
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
        "visited": 6,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Planejar a saída do gelo antes de fixar a chegada do parceiro.",
      "retentionReason": "Planejar a saída do gelo antes de fixar a chegada do parceiro.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 6,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 14,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 55,
    "chapter": 4,
    "originNumber": 55,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0304",
      "number": 55,
      "version": 1,
      "reason": "Planejar a saída do gelo antes de fixar a chegada do parceiro."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-eda44c37-109"
  },
  {
    "id": "sintonia80-0056-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 4,
        "cols": 4,
        "walkable": [
          1,
          2,
          3,
          5,
          7,
          8,
          11,
          12,
          13,
          14,
          15
        ],
        "start": 1,
        "goal": 13,
        "switches": [
          {
            "id": "prepare",
            "cell": 5,
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
          2,
          4,
          5,
          6,
          7,
          8,
          10,
          12,
          13
        ],
        "start": 7,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 6,
            "to": 5,
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
      "goal-transit",
      "priority-change"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:56:0",
    "difficulty": 3,
    "solution": [
      "down",
      "up",
      "right",
      "right",
      "down",
      "down",
      "down",
      "left",
      "left",
      "left",
      "down",
      "right"
    ],
    "signature": "st1-3ed979ef-394",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "varied",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 206,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
            "control": 5,
            "commit": null,
            "goalRegion": [
              13
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              5,
              4,
              8,
              0,
              12,
              13
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              1,
              5
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              3,
              7
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              14,
              13
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              6,
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
        "commands": 12,
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
                "cell": 5
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
            "moved": 11,
            "waited": 1,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 4,
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
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 20,
        "directionChanges": 6,
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
        "visited": 48,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Controlar a ordem das alternâncias e do retorno.",
      "retentionReason": "Controlar a ordem das alternâncias e do retorno.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 48,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 84,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 56,
    "chapter": 4,
    "originNumber": 56,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0197",
      "number": 56,
      "version": 1,
      "reason": "Controlar a ordem das alternâncias e do retorno."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-db959f2f-128"
  },
  {
    "id": "sintonia80-0057-v5",
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
          2,
          4,
          6,
          7,
          8,
          9,
          11,
          12,
          14
        ],
        "start": 2,
        "goal": 12,
        "plates": [
          {
            "id": "relay-a",
            "cell": 9
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 9,
            "to": 12,
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
        "rows": 4,
        "cols": 5,
        "walkable": [
          4,
          5,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          18
        ],
        "start": 4,
        "goal": 5,
        "plates": [
          {
            "id": "relay-b",
            "cell": 11
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 9,
            "to": 14,
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
      "priority-change",
      "unequal-loop"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:57:12",
    "difficulty": 3,
    "solution": [
      "left",
      "down",
      "down",
      "left",
      "down",
      "down",
      "left",
      "left",
      "left",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-cafeb219-486",
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
      "commands": 12,
      "optimal": true,
      "visited": 96,
      "replayed": true,
      "firstVictoryAt": 12,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 12,
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
                "cell": 11
              }
            ],
            "crossingCommands": [
              10
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
                "cell": 9
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
            "waited": 6,
            "goalDepartures": 0
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
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 10,
        "directionChanges": 7,
        "earlyTurns": 2,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 94,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 18,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 4,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 57,
    "chapter": 4,
    "originNumber": 57,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia-0337",
      "number": 57,
      "version": 1
    },
    "topologySignature": "top1-c9949d80-130",
    "actorIntroduction": null
  },
  {
    "id": "sintonia80-0058-v5",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8,
          10,
          13,
          14,
          15,
          18
        ],
        "start": 0,
        "goal": 8,
        "plates": [
          {
            "id": "relay-a",
            "cell": 18
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 4,
            "to": 8,
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
          12,
          14
        ],
        "start": 1,
        "goal": 12,
        "plates": [
          {
            "id": "relay-b",
            "cell": 8
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 3,
            "to": 7,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 2,
            "to": 3,
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
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          4,
          7,
          9,
          11,
          12,
          13,
          14,
          16,
          18,
          23
        ],
        "start": 7,
        "goal": 16,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 23
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
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:58:12",
    "difficulty": 3,
    "solution": [
      "right",
      "down",
      "right",
      "down",
      "down",
      "down",
      "right",
      "down",
      "down",
      "left",
      "up",
      "up",
      "up",
      "left",
      "left",
      "down"
    ],
    "signature": "st1-f6ed2fd9-701",
    "prerequisites": [
      "walls",
      "plate"
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
      "commands": 16,
      "optimal": true,
      "visited": 904,
      "replayed": true,
      "firstVictoryAt": 16,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 16,
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
                "cell": 8
              }
            ],
            "crossingCommands": [
              16
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
              8
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
                "cell": 23
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
            "moved": 12,
            "waited": 4,
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
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 13,
        "goalDepartures": [
          false,
          false,
          false
        ],
        "unequalLoops": 24,
        "directionChanges": 9,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          false
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 1017,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 322,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 193,
            "optimal": false,
            "exhaustive": true
          }
        }
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 58,
    "chapter": 4,
    "originNumber": 58,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia-0326",
      "number": 58,
      "version": 1
    },
    "topologySignature": "top1-94084587-193",
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
    "id": "sintonia80-0060-v5",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          0,
          1,
          2,
          6,
          7,
          9,
          10,
          12,
          14,
          16,
          17,
          18,
          19
        ],
        "start": 0,
        "goal": 12,
        "plates": [
          {
            "id": "relay-a",
            "cell": 6
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 16,
            "to": 12,
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
        "rows": 4,
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
        "start": 9,
        "goal": 7,
        "plates": [
          {
            "id": "relay-b",
            "cell": 0
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 5,
            "to": 1,
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
        "rows": 5,
        "cols": 5,
        "walkable": [
          1,
          5,
          6,
          11,
          12,
          13,
          15,
          16,
          21,
          22
        ],
        "start": 13,
        "goal": 11,
        "ice": [
          12
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "handoff",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "wall-adjust",
      "priority-change"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:60:12",
    "difficulty": 3,
    "solution": [
      "right",
      "right",
      "down",
      "down",
      "up",
      "up",
      "right",
      "down",
      "down",
      "down",
      "down",
      "left",
      "left",
      "up",
      "right",
      "right",
      "right",
      "down"
    ],
    "signature": "st1-f028654c-568",
    "prerequisites": [
      "walls",
      "plate",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 3,
      "animals": 3,
      "primary": "handoff",
      "secondary": "ice",
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 18,
      "optimal": true,
      "visited": 744,
      "replayed": true,
      "firstVictoryAt": 18,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 18,
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
                "cell": 0
              }
            ],
            "crossingCommands": [
              14
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
                "cell": 6
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
            "moved": 13,
            "waited": 5,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 9,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 3,
            "waited": 15,
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
          "ice",
          "plate-gate"
        ],
        "partialBlocks": 17,
        "goalDepartures": [
          false,
          false,
          true
        ],
        "unequalLoops": 52,
        "directionChanges": 8,
        "earlyTurns": 3,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false,
          false
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 701,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 178,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 42,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 56,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 60,
    "chapter": 4,
    "originNumber": 60,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia80-0060-v4",
      "number": 60,
      "version": 1
    },
    "topologySignature": "top1-76faeefb-186",
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
    "id": "sintonia80-0063-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          0,
          1,
          5,
          8,
          9,
          11,
          12,
          13,
          14,
          15,
          17,
          19
        ],
        "start": 15,
        "goal": 5,
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
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
          4,
          5,
          6,
          8,
          9,
          10,
          12,
          13,
          14
        ],
        "start": 2,
        "goal": 14,
        "gates": [
          {
            "id": "moon",
            "from": 2,
            "to": 5,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 4,
            "to": 3,
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
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:63:0",
    "difficulty": 4,
    "solution": [
      "down",
      "up",
      "left",
      "left",
      "down",
      "down",
      "right",
      "down",
      "right",
      "up",
      "up",
      "up"
    ],
    "signature": "st1-e42b1a33-464",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 251,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
                "cell": 19
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
            "moved": 8,
            "waited": 4,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 8,
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
        "unequalLoops": 11,
        "directionChanges": 7,
        "earlyTurns": 4,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          true
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
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Escolher a ordem sol/lua e o momento de trocar a configuração.",
      "retentionReason": "Escolher a ordem sol/lua e o momento de trocar a configuração.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 10,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 63,
    "chapter": 5,
    "originNumber": 63,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0490",
      "number": 63,
      "version": 1,
      "reason": "Escolher a ordem sol/lua e o momento de trocar a configuração."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-ba19f8eb-134"
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
    "id": "sintonia80-0065-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 5,
        "walkable": [
          0,
          5,
          10,
          12,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          24
        ],
        "start": 16,
        "goal": 10,
        "plates": [
          {
            "id": "first",
            "cell": 5
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
        "goal": 1,
        "plates": [
          {
            "id": "second",
            "cell": 6
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 4,
        "cols": 5,
        "walkable": [
          1,
          4,
          5,
          6,
          7,
          8,
          9,
          12,
          14,
          17
        ],
        "start": 17,
        "goal": 4,
        "gates": [
          {
            "id": "together",
            "from": 9,
            "to": 4,
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
      "final-command",
      "waiting-place"
    ],
    "name": "Dois apoios juntos",
    "lesson": "Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:65:0",
    "difficulty": 4,
    "solution": [
      "up",
      "up",
      "right",
      "right",
      "down",
      "down",
      "left",
      "left",
      "left",
      "up",
      "up",
      "up",
      "right",
      "up",
      "up",
      "left",
      "down",
      "down",
      "right"
    ],
    "signature": "st1-4ddac9cf-471",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 19,
      "optimal": true,
      "visited": 720,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 19
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
                "cell": 5
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
                "cell": 6
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
            "moved": 10,
            "waited": 9,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 11,
            "waited": 8,
            "goalDepartures": 2
          },
          {
            "board": 2,
            "moved": 7,
            "waited": 12,
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
        "partialBlocks": 17,
        "goalDepartures": [
          true,
          true,
          false
        ],
        "unequalLoops": 39,
        "directionChanges": 9,
        "earlyTurns": 3,
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
        "visited": 49,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Preparar dois apoios simultâneos antes da travessia.",
      "retentionReason": "Preparar dois apoios simultâneos antes da travessia.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 49,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 665,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 665,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 65,
    "chapter": 5,
    "originNumber": 65,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0388",
      "number": 65,
      "version": 1,
      "reason": "Preparar dois apoios simultâneos antes da travessia."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-5b0c4a30-188"
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
    "id": "sintonia80-0067-v4",
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
          4,
          8,
          11,
          12,
          13,
          14,
          18,
          20,
          21,
          22,
          23
        ],
        "start": 18,
        "goal": 2,
        "keys": [
          {
            "id": "prepare",
            "cell": 20
          }
        ],
        "gates": []
      },
      {
        "id": "b1",
        "animal": "tuiuiu",
        "rows": 5,
        "cols": 4,
        "walkable": [
          2,
          4,
          5,
          6,
          7,
          9,
          11,
          15
        ],
        "start": 4,
        "goal": 2,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 5,
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
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "waiting-place",
      "final-command"
    ],
    "name": "Caminho liberado",
    "lesson": "Recolha a chave antes de coordenar a travessia da cancela.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "Encontre a chave e a cancela que compartilham o símbolo.",
      "Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:67:0",
    "difficulty": 4,
    "solution": [
      "down",
      "left",
      "left",
      "left",
      "right",
      "right",
      "up",
      "right",
      "up",
      "up",
      "up",
      "up",
      "left"
    ],
    "signature": "st1-d143fd9d-361",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 13,
      "optimal": true,
      "visited": 147,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 13
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
            "control": 20,
            "commit": null,
            "goalRegion": [
              2
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              7,
              2,
              11,
              15
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              18,
              23,
              22,
              21,
              20
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              13,
              8
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              3,
              2
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
                "cell": 20
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
            "moved": 12,
            "waited": 1,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 3,
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
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "key",
          "key-gate"
        ],
        "partialBlocks": 11,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 24,
        "directionChanges": 6,
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
        "visited": 27,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Revisitar prioridade permanente com geometria de espera mais articulada.",
      "retentionReason": "Revisitar prioridade permanente com geometria de espera mais articulada.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 27,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 5
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 77,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 67,
    "chapter": 5,
    "originNumber": 67,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia80-0067-v3",
      "number": 67,
      "version": 1,
      "reason": "Revisitar prioridade permanente com geometria de espera mais articulada."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-ef21078b-131"
  },
  {
    "id": "sintonia80-0068-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          10,
          12,
          13,
          16
        ],
        "start": 7,
        "goal": 9,
        "plates": [
          {
            "id": "relay-a",
            "cell": 1
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 5,
            "to": 9,
            "condition": {
              "type": "plate",
              "id": "relay-b"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 3,
            "to": 7,
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
        "rows": 5,
        "cols": 5,
        "walkable": [
          3,
          4,
          6,
          7,
          8,
          13,
          18,
          22,
          23
        ],
        "start": 6,
        "goal": 13,
        "plates": [
          {
            "id": "relay-b",
            "cell": 8
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 7,
            "to": 8,
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
        "rows": 5,
        "cols": 5,
        "walkable": [
          2,
          3,
          7,
          12,
          13,
          17,
          19,
          20,
          21,
          22,
          23,
          24
        ],
        "start": 7,
        "goal": 19,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 21
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
      "priority-change",
      "goal-transit"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:68:0",
    "difficulty": 4,
    "solution": [
      "down",
      "down",
      "down",
      "left",
      "up",
      "right",
      "up",
      "left",
      "left",
      "down",
      "right",
      "up",
      "right",
      "up",
      "left",
      "down",
      "down",
      "down",
      "up"
    ],
    "signature": "st1-978dd8df-704",
    "prerequisites": [
      "walls",
      "plate",
      "handoff"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "handoff",
      "secondary": null,
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 19,
      "optimal": true,
      "visited": 570,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 19
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
                "cell": 8
              }
            ],
            "crossingCommands": [
              17
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
                "cell": 21
              }
            ],
            "crossingCommands": [
              5
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
                "cell": 1
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
            "moved": 11,
            "waited": 8,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 10,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 12,
            "waited": 7,
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
        "partialBlocks": 16,
        "goalDepartures": [
          true,
          true,
          true
        ],
        "unequalLoops": 43,
        "directionChanges": 13,
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
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Trocar quem ajuda e quem atravessa sem encerrar uma chegada cedo demais.",
      "retentionReason": "Trocar quem ajuda e quem atravessa sem encerrar uma chegada cedo demais.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 390,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 21,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 97,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 68,
    "chapter": 5,
    "originNumber": 68,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0422",
      "number": 68,
      "version": 1,
      "reason": "Trocar quem ajuda e quem atravessa sem encerrar uma chegada cedo demais."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-b05f8cc0-191"
  },
  {
    "id": "sintonia80-0069-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 3,
        "walkable": [
          3,
          5,
          6,
          8,
          9,
          11,
          12,
          13,
          14
        ],
        "start": 5,
        "goal": 13,
        "ice": [
          8
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
          4,
          5,
          6,
          9,
          12,
          13,
          14,
          15
        ],
        "start": 13,
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
      "goal-transit",
      "final-command"
    ],
    "name": "Distâncias diferentes",
    "lesson": "Prepare a entrada no gelo pensando na posição em que o animal vai parar.",
    "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
    "hints": [
      "No gelo, o animal segue até o primeiro piso comum ou bloqueio.",
      "Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:69:0",
    "difficulty": 4,
    "solution": [
      "right",
      "down",
      "down",
      "left",
      "up",
      "left",
      "up",
      "right",
      "down",
      "right",
      "up"
    ],
    "signature": "st1-51fd94ea-227",
    "prerequisites": [
      "walls",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "ice",
      "secondary": null,
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 11,
      "optimal": true,
      "visited": 80,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 11
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
        "dependencies": [],
        "boardRoles": [
          {
            "board": 0,
            "moved": 7,
            "waited": 4,
            "goalDepartures": 1
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
      "discovery": "Aqui o jogador precisa descobrir que o gelo permite deslocamentos de comprimentos diferentes com a mesma seta.",
      "reasoning": {
        "used": [
          "ice"
        ],
        "partialBlocks": 9,
        "goalDepartures": [
          true,
          false
        ],
        "unequalLoops": 7,
        "directionChanges": 9,
        "earlyTurns": 5,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          false
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
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Síntese compacta de parada, espera e comando final.",
      "retentionReason": "Síntese compacta de parada, espera e comando final.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 10,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 69,
    "chapter": 5,
    "originNumber": 69,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0415",
      "number": 69,
      "version": 1,
      "reason": "Síntese compacta de parada, espera e comando final."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-ed076b58-120"
  },
  {
    "id": "sintonia80-0070-v4",
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
          4,
          6,
          8,
          10,
          12,
          13,
          14
        ],
        "start": 6,
        "goal": 0,
        "switches": [
          {
            "id": "sky",
            "cell": 12,
            "group": "sky"
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
          5,
          7,
          8,
          9,
          11,
          15
        ],
        "start": 15,
        "goal": 8,
        "gates": [
          {
            "id": "moon",
            "from": 3,
            "to": 2,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 1,
            "to": 5,
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
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          9
        ],
        "start": 5,
        "goal": 9,
        "ice": [
          6
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
      "goal-transit",
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
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:70:0",
    "difficulty": 4,
    "solution": [
      "up",
      "up",
      "up",
      "left",
      "left",
      "down",
      "down",
      "down",
      "right",
      "right",
      "up",
      "up",
      "up",
      "left",
      "down",
      "down",
      "left"
    ],
    "signature": "st1-b0e2319e-530",
    "prerequisites": [
      "walls",
      "switch",
      "alternate",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 3,
      "primary": "alternate",
      "secondary": "ice",
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 17,
      "optimal": true,
      "visited": 1023,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 17
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 17,
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
                "cell": 12
              }
            ],
            "crossingCommands": [
              4
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
                "cell": 12
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
            "moved": 13,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 10,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 9,
            "waited": 8,
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
          "ice",
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 14,
        "goalDepartures": [
          true,
          false,
          true
        ],
        "unequalLoops": 21,
        "directionChanges": 7,
        "earlyTurns": 3,
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
        "visited": 31,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Trocar sol/lua enquanto o terceiro percurso exige uma parada útil.",
      "retentionReason": "Trocar sol/lua enquanto o terceiro percurso exige uma parada útil.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 350,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 835,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 70,
    "chapter": 5,
    "originNumber": 70,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0418",
      "number": 70,
      "version": 1,
      "reason": "Trocar sol/lua enquanto o terceiro percurso exige uma parada útil."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-2b17b146-171"
  },
  {
    "id": "sintonia80-0071-v4",
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
          2,
          3,
          4,
          5,
          6,
          9,
          10,
          11,
          12,
          13,
          14
        ],
        "start": 6,
        "goal": 3,
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
        "rows": 3,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          3,
          4,
          6,
          8,
          10,
          11,
          13,
          14
        ],
        "start": 1,
        "goal": 8,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 2,
            "to": 3,
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
      "unequal-loop",
      "final-command"
    ],
    "name": "Uma escolha que permanece",
    "lesson": "Entre no interruptor para preparar a configuração das passagens.",
    "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
    "hints": [
      "O interruptor alterna a passagem quando o animal entra e termina sobre ele.",
      "Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:71:0",
    "difficulty": 4,
    "solution": [
      "left",
      "up",
      "down",
      "down",
      "right",
      "right",
      "right",
      "right",
      "up",
      "up",
      "left",
      "down"
    ],
    "signature": "st1-58ca5481-399",
    "prerequisites": [
      "walls",
      "switch"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "switch",
      "secondary": null,
      "role": "varied",
      "pattern": "switch-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 245,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
              3
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              3,
              8,
              4,
              13,
              14
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              6,
              5,
              0
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              11,
              12
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              4,
              3
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              2,
              3
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
        "commands": 12,
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
              7
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 11,
            "waited": 1,
            "goalDepartures": 0
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
      "discovery": "Aqui o jogador precisa descobrir que o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção.",
      "reasoning": {
        "used": [
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 6,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 5,
        "directionChanges": 6,
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
        "visited": 52,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Preparar estado persistente e reordenar o retorno.",
      "retentionReason": "Preparar estado persistente e reordenar o retorno.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 52,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 142,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 71,
    "chapter": 5,
    "originNumber": 71,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0426",
      "number": 71,
      "version": 1,
      "reason": "Preparar estado persistente e reordenar o retorno."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-bb86915f-132"
  },
  {
    "id": "sintonia80-0072-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          0,
          4,
          5,
          6,
          9,
          12,
          13,
          14,
          16,
          17,
          18,
          19
        ],
        "start": 16,
        "goal": 4,
        "plates": [
          {
            "id": "first",
            "cell": 9
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
          6,
          9,
          10,
          11,
          14
        ],
        "start": 2,
        "goal": 10,
        "plates": [
          {
            "id": "second",
            "cell": 6
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 5,
        "cols": 5,
        "walkable": [
          3,
          8,
          12,
          13,
          14,
          16,
          17,
          21
        ],
        "start": 3,
        "goal": 14,
        "gates": [
          {
            "id": "together",
            "from": 8,
            "to": 13,
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
      "intermediate-stop",
      "waiting-place"
    ],
    "name": "Dois apoios juntos",
    "lesson": "Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para cima; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:72:0",
    "difficulty": 4,
    "solution": [
      "up",
      "right",
      "up",
      "left",
      "up",
      "down",
      "down",
      "up",
      "right",
      "up",
      "left",
      "up",
      "right",
      "down",
      "down"
    ],
    "signature": "st1-9be79b4a-463",
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
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 15,
      "optimal": true,
      "visited": 590,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 15
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 15,
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
                "cell": 9
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
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
            "moved": 11,
            "waited": 4,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 10,
            "waited": 5,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 5,
            "waited": 10,
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
      "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
      "reasoning": {
        "used": [
          "and-gate"
        ],
        "partialBlocks": 12,
        "goalDepartures": [
          true,
          true,
          true
        ],
        "unequalLoops": 35,
        "directionChanges": 12,
        "earlyTurns": 7,
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
        "visited": 12,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Sincronizar duas condições com diferentes percursos de aproximação.",
      "retentionReason": "Sincronizar duas condições com diferentes percursos de aproximação.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 148,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 148,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 72,
    "chapter": 5,
    "originNumber": 72,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0437",
      "number": 72,
      "version": 1,
      "reason": "Sincronizar duas condições com diferentes percursos de aproximação."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-b1a14faf-180"
  },
  {
    "id": "sintonia80-0073-v4",
    "version": 1,
    "rulesVersion": 1,
    "boards": [
      {
        "id": "b0",
        "animal": "capivara",
        "rows": 5,
        "cols": 4,
        "walkable": [
          5,
          9,
          11,
          12,
          13,
          14,
          15,
          19
        ],
        "start": 15,
        "goal": 5,
        "keys": [
          {
            "id": "prepare",
            "cell": 19
          }
        ],
        "gates": []
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
          14,
          15,
          16,
          17,
          18
        ],
        "start": 2,
        "goal": 14,
        "gates": [
          {
            "id": "preparation-remote",
            "from": 7,
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
      "key"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "priority-change",
    "secondaryFamilies": [
      "axis-order",
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
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:73:0",
    "difficulty": 4,
    "solution": [
      "down",
      "left",
      "down",
      "down",
      "right",
      "right",
      "up",
      "left",
      "left",
      "up",
      "up",
      "right"
    ],
    "signature": "st1-4835cdbe-356",
    "prerequisites": [
      "walls",
      "key"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 2,
      "primary": "key",
      "secondary": null,
      "role": "varied",
      "pattern": "key-fork-before-exit"
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 12,
      "optimal": true,
      "visited": 98,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 12
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
            "control": 19,
            "commit": null,
            "goalRegion": [
              5
            ]
          },
          {
            "board": 1,
            "role": "receiver-and-aligner",
            "goalRegion": [
              6,
              11,
              5,
              16,
              15,
              17,
              18,
              13,
              14
            ]
          }
        ],
        "structures": [
          {
            "board": 0,
            "role": "prepare",
            "cells": [
              15,
              19
            ]
          },
          {
            "board": 0,
            "role": "separate",
            "edge": [
              13,
              9
            ]
          },
          {
            "board": 0,
            "role": "exit",
            "edge": [
              9,
              5
            ]
          },
          {
            "board": 1,
            "role": "remote-exit",
            "edge": [
              7,
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
        "commands": 12,
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
                "cell": 19
              }
            ],
            "crossingCommands": [
              2
            ]
          }
        ],
        "boardRoles": [
          {
            "board": 0,
            "moved": 6,
            "waited": 6,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 8,
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
        "partialBlocks": 10,
        "goalDepartures": [
          false,
          false
        ],
        "unequalLoops": 16,
        "directionChanges": 7,
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
        "visited": 10,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "varied",
      "decision": "recompose",
      "curriculumReason": "Compor prioridade e volta desigual sem mecanismos novos.",
      "retentionReason": "Compor prioridade e volta desigual sem mecanismos novos.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 1
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 25,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 73,
    "chapter": 5,
    "originNumber": 73,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0449",
      "number": 73,
      "version": 1,
      "reason": "Compor prioridade e volta desigual sem mecanismos novos."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-a002a8d0-126"
  },
  {
    "id": "sintonia80-0074-v5",
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
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "start": 8,
        "goal": 1,
        "plates": [
          {
            "id": "relay-a",
            "cell": 10
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 5,
            "to": 1,
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
        "rows": 4,
        "cols": 3,
        "walkable": [
          0,
          1,
          2,
          3,
          6,
          8,
          9,
          10,
          11
        ],
        "start": 2,
        "goal": 8,
        "plates": [
          {
            "id": "relay-b",
            "cell": 11
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 1,
            "to": 0,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 1,
            "to": 2,
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
        "cols": 3,
        "walkable": [
          0,
          2,
          3,
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
        "goal": 3,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 10
          }
        ]
      },
      {
        "id": "b3",
        "animal": "mico",
        "rows": 4,
        "cols": 4,
        "walkable": [
          0,
          1,
          3,
          5,
          7,
          8,
          9,
          11,
          13,
          14,
          15
        ],
        "start": 0,
        "goal": 3,
        "ice": [
          9
        ]
      }
    ],
    "mechanics": [
      "walls",
      "plate",
      "handoff",
      "ice"
    ],
    "initialSwitches": {},
    "initialSelectors": {},
    "family": "support-handoff",
    "secondaryFamilies": [
      "priority-change",
      "waiting-place"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:74:12",
    "difficulty": 4,
    "solution": [
      "right",
      "right",
      "right",
      "down",
      "left",
      "left",
      "right",
      "left",
      "down",
      "down",
      "down",
      "right",
      "right",
      "up",
      "up",
      "left",
      "left",
      "down",
      "left",
      "up",
      "right",
      "up",
      "left"
    ],
    "signature": "st1-025d5483-766",
    "prerequisites": [
      "walls",
      "plate",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 4,
      "animals": 4,
      "primary": "handoff",
      "secondary": "ice",
      "role": "varied",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 23,
      "optimal": true,
      "visited": 3158,
      "replayed": true,
      "firstVictoryAt": 23,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 23,
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
                "cell": 11
              }
            ],
            "crossingCommands": [
              22
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
              8
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
            "moved": 17,
            "waited": 6,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 12,
            "waited": 11,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 17,
            "waited": 6,
            "goalDepartures": 2
          },
          {
            "board": 3,
            "moved": 10,
            "waited": 13,
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
          "ice",
          "plate-gate"
        ],
        "partialBlocks": 19,
        "goalDepartures": [
          false,
          true,
          true,
          false
        ],
        "unequalLoops": 42,
        "directionChanges": 14,
        "earlyTurns": 10,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          true,
          true,
          false,
          true
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 3120,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 914,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 455,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 1066,
            "optimal": false,
            "exhaustive": true
          }
        }
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 74,
    "chapter": 5,
    "originNumber": 74,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia80-0074-v4",
      "number": 74,
      "version": 1
    },
    "topologySignature": "top1-e833631c-231",
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
    "id": "sintonia80-0077-v4",
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
          2,
          3,
          5,
          6,
          7,
          9,
          11,
          12,
          13,
          14
        ],
        "start": 14,
        "goal": 13,
        "plates": [
          {
            "id": "first",
            "cell": 11
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
          2,
          3,
          4,
          5,
          7,
          8,
          10,
          12,
          13,
          14
        ],
        "start": 7,
        "goal": 0,
        "plates": [
          {
            "id": "second",
            "cell": 2
          }
        ]
      },
      {
        "id": "b2",
        "animal": "bemtevi",
        "rows": 5,
        "cols": 5,
        "walkable": [
          0,
          2,
          4,
          5,
          7,
          8,
          9,
          10,
          11,
          12
        ],
        "start": 0,
        "goal": 2,
        "gates": [
          {
            "id": "together",
            "from": 11,
            "to": 12,
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
      "unequal-loop",
      "goal-transit"
    ],
    "name": "Dois apoios juntos",
    "lesson": "Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para a direita; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:77:0",
    "difficulty": 5,
    "solution": [
      "right",
      "down",
      "down",
      "right",
      "up",
      "up",
      "right",
      "down",
      "down",
      "up",
      "left",
      "up",
      "left",
      "down",
      "left",
      "up"
    ],
    "signature": "st1-4e672aea-473",
    "prerequisites": [
      "walls",
      "plate",
      "and"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 3,
      "primary": "and",
      "secondary": null,
      "role": "synthesis",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 16,
      "optimal": true,
      "visited": 1057,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 16
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
                "cell": 11
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
                "cell": 2
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
            "moved": 5,
            "waited": 11,
            "goalDepartures": 0
          },
          {
            "board": 1,
            "moved": 9,
            "waited": 7,
            "goalDepartures": 0
          },
          {
            "board": 2,
            "moved": 8,
            "waited": 8,
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
      "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
      "reasoning": {
        "used": [
          "and-gate"
        ],
        "partialBlocks": 15,
        "goalDepartures": [
          false,
          false,
          true
        ],
        "unequalLoops": 37,
        "directionChanges": 12,
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
        "visited": 82,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "synthesis",
      "decision": "recompose",
      "curriculumReason": "Sintetizar preparação de dois apoios, travessia e chegada conjunta.",
      "retentionReason": "Sintetizar preparação de dois apoios, travessia e chegada conjunta.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 82,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 418,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 418,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 77,
    "chapter": 6,
    "originNumber": 77,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0200",
      "number": 77,
      "version": 1,
      "reason": "Sintetizar preparação de dois apoios, travessia e chegada conjunta."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-2bcdb70f-188"
  },
  {
    "id": "sintonia80-0078-v4",
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
          7,
          8
        ],
        "start": 5,
        "goal": 7,
        "switches": [
          {
            "id": "sky",
            "cell": 2,
            "group": "sky"
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
          4,
          6,
          7,
          9,
          12
        ],
        "start": 12,
        "goal": 2,
        "gates": [
          {
            "id": "moon",
            "from": 6,
            "to": 7,
            "condition": {
              "type": "switch",
              "id": "sky",
              "value": false
            }
          },
          {
            "id": "sun",
            "from": 4,
            "to": 1,
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
        "cols": 4,
        "walkable": [
          0,
          1,
          5,
          8,
          9,
          10,
          11,
          12,
          16,
          17
        ],
        "start": 0,
        "goal": 17,
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
      "goal-transit",
      "intermediate-stop"
    ],
    "name": "Entre sol e lua",
    "lesson": "Atravesse uma etapa e mude a configuração para preparar a seguinte.",
    "discovery": "Aqui o jogador precisa descobrir que as passagens de sol e lua precisam ser atravessadas em configurações diferentes.",
    "hints": [
      "O mesmo interruptor troca quais cancelas de sol e lua estão abertas.",
      "Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:78:0",
    "difficulty": 5,
    "solution": [
      "left",
      "up",
      "up",
      "right",
      "down",
      "left",
      "down",
      "down",
      "right",
      "up",
      "left",
      "left",
      "up",
      "right",
      "down",
      "left",
      "right",
      "down"
    ],
    "signature": "st1-57ad014c-528",
    "prerequisites": [
      "walls",
      "switch",
      "alternate",
      "ice"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 3,
      "primary": "alternate",
      "secondary": "ice",
      "role": "synthesis",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 18,
      "optimal": true,
      "visited": 640,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 18
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
                "cell": 2
              }
            ],
            "crossingCommands": [
              4
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
                "cell": 2
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
            "moved": 16,
            "waited": 2,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 8,
            "waited": 10,
            "goalDepartures": 1
          },
          {
            "board": 2,
            "moved": 10,
            "waited": 8,
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
          "ice",
          "moon-gate",
          "sun-gate",
          "switch",
          "switch-gate"
        ],
        "partialBlocks": 15,
        "goalDepartures": [
          true,
          true,
          true
        ],
        "unequalLoops": 31,
        "directionChanges": 14,
        "earlyTurns": 9,
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
        "visited": 128,
        "resistant": true
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "synthesis",
      "decision": "recompose",
      "curriculumReason": "Reordenar configurações e paradas entre três percursos.",
      "retentionReason": "Reordenar configurações e paradas entre três percursos.",
      "antiSpam": {
        "singleDirection": {
          "tested": 4,
          "winningDirections": []
        },
        "sweeps": {
          "status": "complete",
          "visited": 128,
          "solves": false
        },
        "shortCycles": {
          "tested": 40,
          "winningPatterns": []
        },
        "biasedRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 204,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "event",
            "eventType": "ice"
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "event",
              "eventType": "ice"
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 122,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 78,
    "chapter": 6,
    "originNumber": 78,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0423",
      "number": 78,
      "version": 1,
      "reason": "Reordenar configurações e paradas entre três percursos."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-f9fcdfb3-170"
  },
  {
    "id": "sintonia80-0079-v5",
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
          7,
          8,
          9,
          10,
          11
        ],
        "start": 2,
        "goal": 8,
        "plates": [
          {
            "id": "relay-a",
            "cell": 3
          }
        ],
        "gates": [
          {
            "id": "relay-return",
            "from": 11,
            "to": 10,
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
        "rows": 4,
        "cols": 5,
        "walkable": [
          0,
          1,
          2,
          3,
          5,
          8,
          9,
          10,
          15,
          16
        ],
        "start": 9,
        "goal": 10,
        "plates": [
          {
            "id": "relay-b",
            "cell": 16
          }
        ],
        "gates": [
          {
            "id": "relay-out",
            "from": 1,
            "to": 0,
            "condition": {
              "type": "plate",
              "id": "relay-a"
            }
          },
          {
            "id": "auxiliary-gate-2",
            "from": 1,
            "to": 2,
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
        "rows": 5,
        "cols": 3,
        "walkable": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          10,
          11,
          14
        ],
        "start": 3,
        "goal": 11,
        "plates": [
          {
            "id": "auxiliary-2",
            "cell": 4
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
      "axis-order",
      "wall-adjust"
    ],
    "name": "Ajuda em revezamento",
    "lesson": "Quem atravessou pode assumir a próxima ajuda entre os animais.",
    "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
    "hints": [
      "Uma das placas está numa região que a outra ajuda a abrir.",
      "Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.",
      "Na configuração inicial, comece para a esquerda; observe quem avança e quem espera."
    ],
    "generatorVersion": 4,
    "contentRevision": "sintonia-content-5",
    "seed": "goals-v5:79:12",
    "difficulty": 5,
    "solution": [
      "left",
      "up",
      "right",
      "right",
      "left",
      "left",
      "right",
      "left",
      "right",
      "down",
      "right",
      "down",
      "down",
      "right",
      "left",
      "up",
      "left",
      "left",
      "up",
      "right",
      "down"
    ],
    "signature": "st1-d581e0ee-689",
    "prerequisites": [
      "walls",
      "plate"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 3,
      "primary": "handoff",
      "secondary": null,
      "role": "synthesis",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 21,
      "optimal": true,
      "visited": 377,
      "replayed": true,
      "firstVictoryAt": 21,
      "engine": "unchanged-rules-1"
    },
    "editorial": {
      "source": "goal-button-separation-v5",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 21,
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
                "cell": 16
              }
            ],
            "crossingCommands": [
              15
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
                "cell": 3
              }
            ],
            "crossingCommands": [
              8
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
                "cell": 4
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
            "moved": 12,
            "waited": 9,
            "goalDepartures": 1
          },
          {
            "board": 1,
            "moved": 13,
            "waited": 8,
            "goalDepartures": 2
          },
          {
            "board": 2,
            "moved": 16,
            "waited": 5,
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
      "discovery": "Aqui o jogador precisa descobrir que um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou.",
      "reasoning": {
        "used": [
          "handoff-0",
          "handoff-1",
          "plate-gate"
        ],
        "partialBlocks": 15,
        "goalDepartures": [
          true,
          true,
          true
        ],
        "unequalLoops": 28,
        "directionChanges": 16,
        "earlyTurns": 6,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
          false
        ]
      },
      "compatibility": "validated",
      "alternatives": "Uma sequência verificada é fornecida; outras soluções podem existir.",
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 217,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 114,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 2
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 2
            },
            "budget": {
              "maxStates": 120000,
              "maxMs": 15000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 81,
            "optimal": false,
            "exhaustive": true
          }
        }
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
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 16,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "goalButtonSeparation": true,
      "causalityReport": "docs/sintonia-goals-v5-certificates.json"
    },
    "number": 79,
    "chapter": 6,
    "originNumber": 79,
    "origin": {
      "kind": "separate-goals-from-buttons",
      "catalog": "sintonia-content-4",
      "id": "sintonia80-0079-v4",
      "number": 79,
      "version": 1
    },
    "topologySignature": "top1-8e264c2f-182",
    "actorIntroduction": null
  },
  {
    "id": "sintonia80-0080-v4",
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
        "start": 6,
        "goal": 1,
        "plates": [
          {
            "id": "first",
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
          3,
          4,
          5,
          6,
          7,
          8,
          12,
          13,
          14
        ],
        "start": 13,
        "goal": 5,
        "plates": [
          {
            "id": "second",
            "cell": 7
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
          3,
          4,
          5,
          6,
          7,
          8,
          10,
          12,
          13,
          14,
          15
        ],
        "start": 0,
        "goal": 15,
        "gates": [
          {
            "id": "together",
            "from": 14,
            "to": 15,
            "condition": {
              "type": "all",
              "ids": [
                "first",
                "second"
              ]
            }
          },
          {
            "id": "auxiliary-gate-3",
            "from": 4,
            "to": 0,
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
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
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "start": 2,
        "goal": 4,
        "plates": [
          {
            "id": "auxiliary-3",
            "cell": 7
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
      "axis-order",
      "intermediate-stop"
    ],
    "name": "Dois apoios juntos",
    "lesson": "Prepare as duas placas ao mesmo tempo para abrir a cancela.",
    "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
    "hints": [
      "A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.",
      "Prepare as duas posições de apoio antes de tentar a travessia.",
      "Na configuração inicial, comece para baixo; observe quem avança e quem espera."
    ],
    "generatorVersion": 3,
    "contentRevision": "sintonia-content-4",
    "seed": "sintonia-content4:80:0",
    "difficulty": 5,
    "solution": [
      "down",
      "left",
      "down",
      "down",
      "down",
      "up",
      "up",
      "right",
      "right",
      "down",
      "right",
      "down",
      "right",
      "up",
      "left",
      "down",
      "left",
      "up",
      "left",
      "left",
      "right",
      "right",
      "down",
      "left"
    ],
    "signature": "st1-295a6659-664",
    "prerequisites": [
      "walls",
      "plate",
      "and"
    ],
    "introduction": [],
    "parameters": {
      "difficulty": 5,
      "animals": 4,
      "primary": "and",
      "secondary": null,
      "role": "synthesis",
      "pattern": null
    },
    "certificate": {
      "method": "breadth-first-witness-and-engine-replay",
      "rulesVersion": 1,
      "commands": 24,
      "optimal": true,
      "visited": 3519,
      "replayed": true,
      "engine": "unchanged-rules-1",
      "firstVictoryAt": 24
    },
    "editorial": {
      "source": "procedural-structure-and-automatic-curation",
      "design": null,
      "purpose": {
        "valid": true,
        "won": true,
        "evidenceScope": "supplied-command-sequence",
        "commands": 24,
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
                "cell": 2
              },
              {
                "type": "plate",
                "id": "second",
                "board": 1,
                "cell": 7
              }
            ],
            "crossingCommands": [
              13
            ]
          },
          {
            "gateId": "auxiliary-gate-3",
            "receiverBoard": 2,
            "condition": {
              "type": "plate",
              "id": "auxiliary-3"
            },
            "controllers": [
              {
                "type": "plate",
                "id": "auxiliary-3",
                "board": 3,
                "cell": 7
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
            "moved": 11,
            "waited": 13,
            "goalDepartures": 3
          },
          {
            "board": 1,
            "moved": 14,
            "waited": 10,
            "goalDepartures": 3
          },
          {
            "board": 2,
            "moved": 8,
            "waited": 16,
            "goalDepartures": 0
          },
          {
            "board": 3,
            "moved": 16,
            "waited": 8,
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
      "discovery": "Aqui o jogador precisa descobrir que dois animais precisam sustentar simultaneamente as condições de uma passagem.",
      "reasoning": {
        "used": [
          "and-gate",
          "plate-gate"
        ],
        "partialBlocks": 22,
        "goalDepartures": [
          true,
          true,
          false,
          true
        ],
        "unequalLoops": 66,
        "directionChanges": 17,
        "earlyTurns": 9,
        "occupiedBoxPlate": false,
        "boxAsStopAfterSupport": false,
        "finalApproach": [
          false,
          false,
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
      "deadEnds": "Mudanças de configuração podem exigir retornar a uma posição anterior.",
      "role": "synthesis",
      "decision": "recompose",
      "curriculumReason": "Coordenar quatro papéis e duas condições sem acrescentar mecanismos.",
      "retentionReason": "Coordenar quatro papéis e duas condições sem acrescentar mecanismos.",
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
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "uniformRandom": {
          "runs": 24,
          "commandsPerRun": 128,
          "wins": 0
        },
        "interpretation": "Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento."
      },
      "necessity": [
        {
          "avoid": {
            "type": "helper-participation",
            "board": 0
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 0
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 3167,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 1
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 1
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 3167,
            "optimal": false,
            "exhaustive": true
          }
        },
        {
          "avoid": {
            "type": "helper-participation",
            "board": 3
          },
          "result": {
            "scope": "all-winning-solutions-avoiding-event",
            "optimalScope": "avoiding-predicate-only",
            "avoid": {
              "type": "helper-participation",
              "board": 3
            },
            "budget": {
              "maxStates": 90000,
              "maxMs": 12000,
              "maxDepth": null
            },
            "status": "unsolvable",
            "visited": 377,
            "optimal": false,
            "exhaustive": true
          }
        }
      ],
      "causalityReport": "tests/sintonia-v4-editorial.json"
    },
    "number": 80,
    "chapter": 6,
    "originNumber": 80,
    "origin": {
      "kind": "recomposed-removed-mechanics",
      "catalog": "sintonia-content-3",
      "id": "sintonia-0500",
      "number": 80,
      "version": 1,
      "reason": "Coordenar quatro papéis e duas condições sem acrescentar mecanismos."
    },
    "actorIntroduction": null,
    "topologySignature": "top1-8e7cd9f6-228"
  }
];
