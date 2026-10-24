// Rotas com mudanças de direção expressivas; soluções e métricas verificadas nos testes.
export const lightLevels = [
  {
    "name": "Um raio, novos caminhos 1",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 1,
    "family": "sala-0",
    "sources": [
      {
        "x": 60,
        "y": 350,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 730,
        "y": 100,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 260,
        "y": 350,
        "length": 104,
        "angle": -21
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 100,
        "length": 104,
        "angle": -69
      },
      {
        "type": "wall",
        "x": 395,
        "y": 225,
        "angle": 69.5377284765778,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 730,
      "y": 100,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "Gire os espelhos e confirme. O raio deve alcançar seu alvo; as paredes absorvem a luz.",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 2",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 2,
    "family": "sala-1",
    "sources": [
      {
        "x": 60,
        "y": 90,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 730,
        "y": 350,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 260,
        "y": 90,
        "length": 104,
        "angle": 53.5
      },
      {
        "type": "mirror",
        "x": 520,
        "y": 350,
        "length": 104,
        "angle": -8.5
      }
    ],
    "solution": [
      22.5,
      22.5
    ],
    "sourceAngle": 0,
    "target": {
      "x": 730,
      "y": 350,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 3",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 3,
    "family": "sala-2",
    "sources": [
      {
        "x": 60,
        "y": 230,
        "angle": 39.472459848343824,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 740,
        "y": 230,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 370,
        "length": 104,
        "angle": 30.303326452629726
      },
      {
        "type": "mirror",
        "x": 420,
        "y": 100,
        "length": 104,
        "angle": -41.10679208138902
      },
      {
        "type": "mirror",
        "x": 640,
        "y": 350,
        "length": 104,
        "angle": 37.228896936285764
      },
      {
        "type": "wall",
        "x": 400,
        "y": 230,
        "angle": 90,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -7.696673547370274,
      -3.106792081389017,
      -0.7711030637142358
    ],
    "sourceAngle": 39.472459848343824,
    "target": {
      "x": 740,
      "y": 230,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 3,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 4",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 4,
    "family": "sala-3",
    "sources": [
      {
        "x": 70,
        "y": 70,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 730,
        "y": 380,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 650,
        "y": 70,
        "length": 104,
        "angle": 90
      },
      {
        "type": "mirror",
        "x": 650,
        "y": 230,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 220,
        "y": 230,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 220,
        "y": 380,
        "length": 104,
        "angle": 0
      },
      {
        "type": "wall",
        "x": 565,
        "y": 302.5,
        "angle": 115.15930191603165,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      -45,
      -45,
      45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 730,
      "y": 380,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 5",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 5,
    "family": "sala-4",
    "sources": [
      {
        "x": 60,
        "y": 350,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 760,
        "y": 350,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 350,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 100,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 600,
        "y": 100,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 600,
        "y": 350,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 410,
        "y": 350,
        "angle": 90,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 760,
      "y": 350,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 6",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 6,
    "family": "sala-5",
    "sources": [
      {
        "x": 400,
        "y": 430,
        "angle": -90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 40,
        "y": 360,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 400,
        "y": 260,
        "length": 104,
        "angle": -21
      },
      {
        "type": "mirror",
        "x": 650,
        "y": 260,
        "length": 104,
        "angle": -69
      },
      {
        "type": "mirror",
        "x": 650,
        "y": 90,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 90,
        "length": 104,
        "angle": -69
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 360,
        "length": 104,
        "angle": -21
      },
      {
        "type": "wall",
        "x": 274,
        "y": 405.5,
        "angle": -78.9964591482505,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 40,
      "y": 360,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 5,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 7",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 7,
    "family": "sala-6",
    "sources": [
      {
        "x": 750,
        "y": 80,
        "angle": 136.7357045889284,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 60,
        "y": 180,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 580,
        "y": 240,
        "length": 104,
        "angle": 28.019826433455904
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 80,
        "length": 104,
        "angle": -34.848025861008296
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 300,
        "length": 104,
        "angle": 35.06505117707799
      },
      {
        "type": "wall",
        "x": 508.5,
        "y": 115,
        "angle": 261.7536791855315,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -2.980173566544096,
      -3.8480258610082956,
      4.06505117707799
    ],
    "sourceAngle": 136.7357045889284,
    "target": {
      "x": 60,
      "y": 180,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 3,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 8",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 8,
    "family": "sala-7",
    "sources": [
      {
        "x": 740,
        "y": 400,
        "angle": -117.55281157671782,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 60,
        "y": 100,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 620,
        "y": 170,
        "length": 104,
        "angle": 48.229987963732775
      },
      {
        "type": "mirror",
        "x": 420,
        "y": 350,
        "length": 104,
        "angle": -35.90903658395462
      },
      {
        "type": "mirror",
        "x": 180,
        "y": 100,
        "length": 104,
        "angle": 61.0845696639537
      },
      {
        "type": "wall",
        "x": 400,
        "y": 250,
        "angle": -66.1940564815423,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      10.229987963732775,
      2.0909634160453834,
      23.0845696639537
    ],
    "sourceAngle": -117.55281157671782,
    "target": {
      "x": 60,
      "y": 100,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 3,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 9",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 9,
    "family": "sala-8",
    "sources": [
      {
        "x": 750,
        "y": 230,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 40,
        "y": 70,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 550,
        "y": 230,
        "length": 104,
        "angle": 24.949546226893887
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 390,
        "length": 104,
        "angle": -46.39847963411441
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 230,
        "length": 104,
        "angle": -71.3480258610083
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 70,
        "length": 104,
        "angle": 0
      },
      {
        "type": "wall",
        "x": 395,
        "y": 150,
        "angle": -77.30041551040264,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -20.050453773106113,
      -1.398479634114409,
      63.651974138991704,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 40,
      "y": 70,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Um raio, novos caminhos 10",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 1,
    "stageName": "Um raio, novos caminhos",
    "difficulty": 10,
    "family": "sala-9",
    "sources": [
      {
        "x": 740,
        "y": 80,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 40,
        "y": 100,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 540,
        "y": 80,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 540,
        "y": 350,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 270,
        "y": 350,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 270,
        "y": 100,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 390,
        "y": 90,
        "angle": 268.36342295838324,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 40,
      "y": 100,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 1",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 11,
    "family": "sala-10",
    "sources": [
      {
        "x": 60,
        "y": 80,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 740,
        "y": 380,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 80,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 240,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 240,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 380,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 570,
        "y": 305,
        "angle": 113.80594351845772,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 740,
      "y": 380,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 2",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 12,
    "family": "sala-11",
    "sources": [
      {
        "x": 740,
        "y": 80,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 60,
        "y": 380,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 550,
        "y": 80,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 240,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 240,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 380,
        "length": 104,
        "angle": -76
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 60,
      "y": 380,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 3",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 13,
    "family": "sala-12",
    "sources": [
      {
        "x": 400,
        "y": 435,
        "angle": -90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 30,
        "y": 380,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 400,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 660,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 660,
        "y": 90,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 90,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 380,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 270.5,
        "y": 415.75,
        "angle": -81.54497232282256,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 30,
      "y": 380,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 5,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 4",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 14,
    "family": "sala-14",
    "sources": [
      {
        "x": 30,
        "y": 90,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 740,
        "y": 200,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 250,
        "y": 90,
        "length": 104,
        "angle": 90
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 370,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 370,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 200,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 385,
        "y": 145,
        "angle": 98.8067926944353,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -45,
      -45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 740,
      "y": 200,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 5",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 15,
    "family": "sala-15",
    "sources": [
      {
        "x": 740,
        "y": 370,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 30,
        "y": 260,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 550,
        "y": 370,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 90,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 90,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 260,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 385,
        "y": 315,
        "angle": -81.1932073055647,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -45,
      -45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 30,
      "y": 260,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 6",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 16,
    "family": "sala-15",
    "sources": [
      {
        "x": 60,
        "y": 90,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 770,
        "y": 200,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 250,
        "y": 90,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 370,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 370,
        "length": 104,
        "angle": -21
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 200,
        "length": 104,
        "angle": -69
      },
      {
        "type": "wall",
        "x": 415,
        "y": 145,
        "angle": 98.8067926944353,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -45,
      -45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 770,
      "y": 200,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 7",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 17,
    "family": "sala-16",
    "sources": [
      {
        "x": 740,
        "y": 80,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 100,
        "y": 400,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 560,
        "y": 80,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 360,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 360,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 150,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 100,
        "y": 150,
        "length": 104,
        "angle": -14
      },
      {
        "type": "wall",
        "x": 420,
        "y": 240,
        "angle": 243.43494882292202,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      45,
      -45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 100,
      "y": 400,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 5,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 8",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 18,
    "family": "sala-17",
    "sources": [
      {
        "x": 770,
        "y": 370,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 100,
        "y": 30,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 570,
        "y": 370,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 100,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 100,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 300,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 100,
        "y": 300,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 435,
        "y": 200,
        "angle": -63.093906544063145,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -45,
      -45,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 100,
      "y": 30,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 5,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 9",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 19,
    "family": "sala-18",
    "sources": [
      {
        "x": 770,
        "y": 230,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 40,
        "y": 90,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 570,
        "y": 230,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 380,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 270,
        "y": 380,
        "length": 104,
        "angle": 90
      },
      {
        "type": "mirror",
        "x": 270,
        "y": 90,
        "length": 104,
        "angle": 0
      },
      {
        "type": "wall",
        "x": 405,
        "y": 160,
        "angle": -79.14358665193774,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      -45,
      45,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 40,
      "y": 90,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Desvios e salas 10",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 2,
    "stageName": "Desvios e salas",
    "difficulty": 20,
    "family": "sala-19",
    "sources": [
      {
        "x": 400,
        "y": 25,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 40,
        "y": 100,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 400,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 640,
        "y": 200,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 640,
        "y": 370,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 370,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 100,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 274,
        "y": 51.25,
        "angle": 258.23171106797935,
        "length": 110,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 40,
      "y": 100,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 5,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Duas cores, dois destinos 1",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 21,
    "family": "colunas-0",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 490,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 310,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": 84.12821858176463
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 305,
        "length": 104,
        "angle": 36.128218581764635
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 305,
        "length": 104,
        "angle": 53.871781418235365
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 200,
        "length": 104,
        "angle": 5.871781418235365
      },
      {
        "type": "wall",
        "x": 580,
        "y": 232.5,
        "angle": 156.03751102542182,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      60.128218581764635,
      60.128218581764635,
      29.871781418235365,
      29.871781418235365
    ],
    "sourceAngle": 90,
    "target": {
      "x": 310,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "Nova regra: dois disparadores! Cada cor precisa alcançar seu próprio alvo. Trajetórias de cores diferentes não podem se cruzar, mesmo que a luz passe em instantes diferentes.",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 2",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 22,
    "family": "ziguezague-1",
    "sources": [
      {
        "x": 765,
        "y": 174,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 66,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 286,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 570,
        "y": 174,
        "length": 104,
        "angle": 48.009674994913226
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 66,
        "length": 104,
        "angle": -31
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 174,
        "length": 104,
        "angle": 26.810827917239422
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 394,
        "length": 104,
        "angle": -13.990325005086774
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 286,
        "length": 104,
        "angle": 31
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 394,
        "length": 104,
        "angle": -35.18917208276058
      },
      {
        "type": "wall",
        "x": 210,
        "y": 93,
        "angle": -81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 210,
        "y": 313,
        "angle": -81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      17.009674994913226,
      0,
      -4.189172082760578,
      17.009674994913226,
      0,
      -4.189172082760578
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 66,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 3",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 23,
    "family": "salas-encaixadas-0",
    "sources": [
      {
        "x": 60,
        "y": 380,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 120,
        "y": 310,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 60,
        "y": 110,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 500,
        "y": 190,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 650,
        "y": 380,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 650,
        "y": 110,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 320,
        "y": 310,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 320,
        "y": 190,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 60,
        "y": 245,
        "angle": 0,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      45,
      -45,
      -45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 60,
      "y": 110,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 4",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 24,
    "family": "ziguezague-3",
    "sources": [
      {
        "x": 765,
        "y": 174,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 66,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 286,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 560,
        "y": 174,
        "length": 104,
        "angle": 62.87694362721837
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 66,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 174,
        "length": 104,
        "angle": 39.464208296918
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 394,
        "length": 104,
        "angle": -27.123056372781633
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 286,
        "length": 104,
        "angle": 45
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 394,
        "length": 104,
        "angle": -50.535791703082
      },
      {
        "type": "wall",
        "x": 210,
        "y": 93,
        "angle": -81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 210,
        "y": 313,
        "angle": -81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      17.876943627218367,
      0,
      -5.535791703081998,
      17.876943627218367,
      0,
      -5.535791703081998
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 66,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 5",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 25,
    "family": "colunas-4",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 490,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 490,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 210,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 210,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 370,
        "length": 104,
        "angle": -2.9276071846605163
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 210,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 210,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 370,
        "length": 104,
        "angle": 73.07239281533948
      },
      {
        "type": "wall",
        "x": 130,
        "y": 333.75,
        "angle": 180,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 490,
        "y": 333.75,
        "angle": 180,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      45,
      -54.927607184660516,
      45,
      45,
      -54.927607184660516
    ],
    "sourceAngle": 90,
    "target": {
      "x": 130,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 6",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 26,
    "family": "salas-encaixadas-1",
    "sources": [
      {
        "x": 60,
        "y": 80,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 120,
        "y": 150,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 60,
        "y": 370,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 500,
        "y": 270,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 640,
        "y": 80,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 640,
        "y": 370,
        "length": 104,
        "angle": -69
      },
      {
        "type": "mirror",
        "x": 320,
        "y": 150,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 320,
        "y": 270,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 60,
        "y": 225,
        "angle": 180,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      -45,
      45,
      45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 60,
      "y": 370,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 7",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 27,
    "family": "colunas-1",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 310,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 490,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 305,
        "length": 104,
        "angle": 1.128218581764628
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 200,
        "length": 104,
        "angle": -60.87178141823537
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 200,
        "length": 104,
        "angle": -29.128218581764628
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 305,
        "length": 104,
        "angle": 88.87178141823537
      },
      {
        "type": "wall",
        "x": 580,
        "y": 232.5,
        "angle": 203.96248897457818,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -29.871781418235372,
      -29.871781418235372,
      -60.12821858176463,
      -60.12821858176463
    ],
    "sourceAngle": 90,
    "target": {
      "x": 490,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 8",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 28,
    "family": "ziguezague-2",
    "sources": [
      {
        "x": 35,
        "y": 174,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 174,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 174,
        "length": 104,
        "angle": 18.140620314222556
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 66,
        "length": 104,
        "angle": -38
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 174,
        "length": 104,
        "angle": 38
      },
      {
        "type": "mirror",
        "x": 630,
        "y": 66,
        "length": 104,
        "angle": -39.519500944462166
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 394,
        "length": 104,
        "angle": 18.140620314222556
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 286,
        "length": 104,
        "angle": -38
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 394,
        "length": 104,
        "angle": 38
      },
      {
        "type": "mirror",
        "x": 630,
        "y": 286,
        "length": 104,
        "angle": -39.519500944462166
      },
      {
        "type": "wall",
        "x": 405,
        "y": 174,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 405,
        "y": 394,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -19.859379685777444,
      0,
      0,
      -1.5195009444621697,
      -19.859379685777444,
      0,
      0,
      -1.5195009444621697
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 174,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 8,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 9",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 29,
    "family": "salas-encaixadas-2",
    "sources": [
      {
        "x": 740,
        "y": 380,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 680,
        "y": 310,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 740,
        "y": 110,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 300,
        "y": 190,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 150,
        "y": 380,
        "length": 104,
        "angle": 90
      },
      {
        "type": "mirror",
        "x": 150,
        "y": 110,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 480,
        "y": 310,
        "length": 104,
        "angle": 90
      },
      {
        "type": "mirror",
        "x": 480,
        "y": 190,
        "length": 104,
        "angle": 0
      },
      {
        "type": "wall",
        "x": 740,
        "y": 245,
        "angle": 0,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      45,
      -45,
      45,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 740,
      "y": 110,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Duas cores, dois destinos 10",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 3,
    "stageName": "Duas cores, dois destinos",
    "difficulty": 30,
    "family": "ziguezague-4",
    "sources": [
      {
        "x": 35,
        "y": 174,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 174,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 174,
        "length": 104,
        "angle": 32.67009587295495
      },
      {
        "type": "mirror",
        "x": 365,
        "y": 66,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 174,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 635,
        "y": 66,
        "length": 104,
        "angle": -52.50609380699123
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 394,
        "length": 104,
        "angle": 32.67009587295495
      },
      {
        "type": "mirror",
        "x": 365,
        "y": 286,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 394,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 635,
        "y": 286,
        "length": 104,
        "angle": -52.50609380699123
      },
      {
        "type": "wall",
        "x": 405,
        "y": 174,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 405,
        "y": 394,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -19.329904127045047,
      0,
      0,
      -0.5060938069912275,
      -19.329904127045047,
      0,
      0,
      -0.5060938069912275
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 174,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 8,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 1",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 31,
    "family": "ziguezague-1",
    "sources": [
      {
        "x": 35,
        "y": 174,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 66,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 286,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 174,
        "length": 104,
        "angle": 6.9903250050867705
      },
      {
        "type": "mirror",
        "x": 390,
        "y": 66,
        "length": 104,
        "angle": -24
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 174,
        "length": 104,
        "angle": 28.18917208276059
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 394,
        "length": 104,
        "angle": -41.009674994913226
      },
      {
        "type": "mirror",
        "x": 390,
        "y": 286,
        "length": 104,
        "angle": 24
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 394,
        "length": 104,
        "angle": -19.81082791723941
      },
      {
        "type": "wall",
        "x": 590,
        "y": 93,
        "angle": 81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 590,
        "y": 313,
        "angle": 81.69653726863694,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -17.00967499491323,
      0,
      4.189172082760589,
      -17.00967499491323,
      0,
      4.189172082760589
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 66,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 2",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 32,
    "family": "colunas-2",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 490,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 310,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 205,
        "length": 104,
        "angle": -88.28521719258075
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 315,
        "length": 104,
        "angle": 29.71478280741926
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 315,
        "length": 104,
        "angle": 60.28521719258074
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 205,
        "length": 104,
        "angle": -1.7147828074192617
      },
      {
        "type": "wall",
        "x": 580,
        "y": 232.5,
        "angle": 156.03751102542182,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      60.71478280741926,
      60.71478280741926,
      29.28521719258074,
      29.28521719258074
    ],
    "sourceAngle": 90,
    "target": {
      "x": 310,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 3",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 33,
    "family": "salas-encaixadas-0",
    "sources": [
      {
        "x": 740,
        "y": 80,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 680,
        "y": 150,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 740,
        "y": 370,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 300,
        "y": 270,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 160,
        "y": 80,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 160,
        "y": 370,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 480,
        "y": 150,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 480,
        "y": 270,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 740,
        "y": 225,
        "angle": 180,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -45,
      45,
      -45,
      -45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 740,
      "y": 370,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 4",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 34,
    "family": "ziguezague-0",
    "sources": [
      {
        "x": 765,
        "y": 174,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 174,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 394,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 570,
        "y": 174,
        "length": 104,
        "angle": 64.85937968577743
      },
      {
        "type": "mirror",
        "x": 440,
        "y": 66,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 174,
        "length": 104,
        "angle": 45
      },
      {
        "type": "mirror",
        "x": 180,
        "y": 66,
        "length": 104,
        "angle": -42.57451453132019
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 394,
        "length": 104,
        "angle": 64.85937968577743
      },
      {
        "type": "mirror",
        "x": 440,
        "y": 286,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 394,
        "length": 104,
        "angle": 45
      },
      {
        "type": "mirror",
        "x": 180,
        "y": 286,
        "length": 104,
        "angle": -42.57451453132019
      },
      {
        "type": "wall",
        "x": 210,
        "y": 174,
        "angle": 270,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 210,
        "y": 394,
        "angle": 270,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      19.859379685777427,
      0,
      0,
      2.4254854686798097,
      19.859379685777427,
      0,
      0,
      2.4254854686798097
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 174,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 8,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 5",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 35,
    "family": "ziguezague-0",
    "sources": [
      {
        "x": 35,
        "y": 174,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 174,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 174,
        "length": 104,
        "angle": 32.14062031422256
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 66,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 174,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 620,
        "y": 66,
        "length": 104,
        "angle": -54.425485468679824
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 394,
        "length": 104,
        "angle": 32.14062031422256
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 286,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 394,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 620,
        "y": 286,
        "length": 104,
        "angle": -54.425485468679824
      },
      {
        "type": "wall",
        "x": 590,
        "y": 174,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 590,
        "y": 394,
        "angle": 90,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -19.859379685777444,
      0,
      0,
      -2.425485468679824,
      -19.859379685777444,
      0,
      0,
      -2.425485468679824
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 174,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 8,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 6",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 36,
    "family": "colunas-0",
    "sources": [
      {
        "x": 130,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 490,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 310,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 670,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 250,
        "length": 104,
        "angle": -37.28702856728626
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 135,
        "length": 104,
        "angle": -85.28702856728626
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 135,
        "length": 104,
        "angle": -4.7129714327137435
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 250,
        "length": 104,
        "angle": -52.71297143271374
      },
      {
        "type": "wall",
        "x": 580,
        "y": 227.5,
        "angle": 23.96248897457818,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -61.28702856728626,
      -61.28702856728626,
      -28.712971432713744,
      -28.712971432713744
    ],
    "sourceAngle": -90,
    "target": {
      "x": 310,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 7",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 37,
    "family": "ziguezague-2",
    "sources": [
      {
        "x": 765,
        "y": 174,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 174,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 394,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 560,
        "y": 174,
        "length": 104,
        "angle": 50.85937968577743
      },
      {
        "type": "mirror",
        "x": 430,
        "y": 66,
        "length": 104,
        "angle": -31
      },
      {
        "type": "mirror",
        "x": 300,
        "y": 174,
        "length": 104,
        "angle": 31
      },
      {
        "type": "mirror",
        "x": 170,
        "y": 66,
        "length": 104,
        "angle": -29.480499055537834
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 394,
        "length": 104,
        "angle": 50.85937968577743
      },
      {
        "type": "mirror",
        "x": 430,
        "y": 286,
        "length": 104,
        "angle": -31
      },
      {
        "type": "mirror",
        "x": 300,
        "y": 394,
        "length": 104,
        "angle": 31
      },
      {
        "type": "mirror",
        "x": 170,
        "y": 286,
        "length": 104,
        "angle": -29.480499055537834
      },
      {
        "type": "wall",
        "x": 395,
        "y": 174,
        "angle": 270,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 395,
        "y": 394,
        "angle": 270,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      19.859379685777427,
      0,
      0,
      1.519500944462166,
      19.859379685777427,
      0,
      0,
      1.519500944462166
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 174,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 8,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 8",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 38,
    "family": "colunas-3",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 310,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 490,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 315,
        "length": 104,
        "angle": 8.714782807419255
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 205,
        "length": 104,
        "angle": -67.28521719258075
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 205,
        "length": 104,
        "angle": -22.714782807419255
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 315,
        "length": 104,
        "angle": 81.28521719258075
      },
      {
        "type": "wall",
        "x": 580,
        "y": 232.5,
        "angle": 203.96248897457818,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -29.285217192580745,
      -29.285217192580745,
      -60.714782807419255,
      -60.714782807419255
    ],
    "sourceAngle": 90,
    "target": {
      "x": 490,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 9",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 39,
    "family": "ziguezague-3",
    "sources": [
      {
        "x": 35,
        "y": 286,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 66,
        "angle": 0,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 174,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 286,
        "length": 104,
        "angle": 62.876943627218374
      },
      {
        "type": "mirror",
        "x": 390,
        "y": 394,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 540,
        "y": 286,
        "length": 104,
        "angle": 39.464208296918
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 66,
        "length": 104,
        "angle": -27.123056372781626
      },
      {
        "type": "mirror",
        "x": 390,
        "y": 174,
        "length": 104,
        "angle": 45
      },
      {
        "type": "mirror",
        "x": 540,
        "y": 66,
        "length": 104,
        "angle": -50.535791703082
      },
      {
        "type": "wall",
        "x": 590,
        "y": 367,
        "angle": 98.30346273136306,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      },
      {
        "type": "wall",
        "x": 590,
        "y": 147,
        "angle": 98.30346273136306,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      17.876943627218374,
      0,
      -5.535791703081994,
      17.876943627218374,
      0,
      -5.535791703081994
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 394,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Caminhos independentes 10",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 4,
    "stageName": "Caminhos independentes",
    "difficulty": 40,
    "family": "colunas-0",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 310,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 490,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 200,
        "length": 104,
        "angle": -8.128218581764628
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 305,
        "length": 104,
        "angle": 67.87178141823537
      },
      {
        "type": "mirror",
        "x": 310,
        "y": 305,
        "length": 104,
        "angle": 22.128218581764628
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": -81.87178141823537
      },
      {
        "type": "wall",
        "x": 220,
        "y": 232.5,
        "angle": 203.96248897457818,
        "length": 95,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -60.12821858176463,
      -60.12821858176463,
      -29.871781418235372,
      -29.871781418235372
    ],
    "sourceAngle": 90,
    "target": {
      "x": 490,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Primeiro portal branco 1",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 41,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 250,
        "y": 30,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 550,
        "y": 435,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 550,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 250,
        "y": 330,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 250,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 400,
        "y": 260,
        "length": 680,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 550,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "Novidade: portais brancos. As duas bocas com a mesma letra formam um par: a luz entra em uma e sai na outra mantendo a direção. O salto entre bocas não é um raio visível e não conta como cruzamento. Branco aceita todas as cores.",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 2",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 42,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 245,
        "y": 30,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 245,
        "y": 435,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 245,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 555,
        "y": 70,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 555,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 245,
        "y": 220,
        "length": 104,
        "angle": -76
      },
      {
        "type": "wall",
        "x": 245,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 245,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 3",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 43,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 240,
        "y": 430,
        "angle": -90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 240,
        "y": 25,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 560,
        "y": 145,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 240,
        "y": 130,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 400,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 240,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 4",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 44,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 250,
        "y": 30,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 250,
        "y": 435,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 250,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 550,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 250,
        "y": 220,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 550,
        "y": 340,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 550,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 400,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 550,
        "y": 284.20000016999995,
        "angle": 180,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 250,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 5",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 45,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 60,
        "y": 80,
        "angle": 0,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 600,
        "y": 350,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 460,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 560,
        "y": 100,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 300,
        "y": 80,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 300,
        "y": 240,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 700,
        "y": 100,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 700,
        "y": 350,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 510,
        "y": 230,
        "length": 360,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      -45
    ],
    "sourceAngle": 0,
    "target": {
      "x": 600,
      "y": 350,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 6",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 46,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 560,
        "y": 430,
        "angle": -90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 240,
        "y": 25,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 240,
        "y": 260,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 560,
        "y": 130,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 560,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 400,
        "y": 200,
        "length": 680,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 240,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 7",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 47,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 550,
        "y": 30,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 550,
        "y": 435,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 550,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 250,
        "y": 70,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 250,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 550,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 550,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 550,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 8",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 48,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 555,
        "y": 30,
        "angle": 90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 555,
        "y": 435,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 245,
        "y": 315,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 555,
        "y": 330,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 555,
        "y": 200,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 245,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 400,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 555,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 9",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 49,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 560,
        "y": 430,
        "angle": -90,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 560,
        "y": 25,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 560,
        "y": 350,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 240,
        "y": 390,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 560,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 240,
        "y": 120,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 400,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 240.00000000000003,
        "y": 175.79999983000002,
        "angle": 0,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 560,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 2,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Primeiro portal branco 10",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 5,
    "stageName": "Primeiro portal branco",
    "difficulty": 50,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 740,
        "y": 80,
        "angle": 180,
        "color": "gold"
      }
    ],
    "targets": [
      {
        "x": 200,
        "y": 350,
        "radius": 22,
        "color": "gold"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 340,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 240,
        "y": 100,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 500,
        "y": 80,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 240,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 100,
        "y": 100,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 100,
        "y": 350,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 290,
        "y": 230,
        "length": 360,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      45
    ],
    "sourceAngle": 180,
    "target": {
      "x": 200,
      "y": 350,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Leve a luz ao alvo."
  },
  {
    "name": "Dois raios e passagens 1",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 51,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 330,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 670,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 330,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 2",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 52,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 126,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 334,
        "y": 315,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 126,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 674,
        "y": 315,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 466,
        "y": 330,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 126,
        "y": 200,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 200,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 200,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 200,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 230,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 126,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 3",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 53,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 122,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 122,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 338,
        "y": 145,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 122,
        "y": 130,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 678,
        "y": 145,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 462,
        "y": 130,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 122,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 462,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 230,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 122,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 4",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 54,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 470,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 130,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 330,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 130,
        "y": 220,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 670,
        "y": 340,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 470,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 670,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 470,
        "y": 220,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 330,
        "y": 340,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 230,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 330,
        "y": 284.20000016999995,
        "angle": 180,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 470,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 5",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 55,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 674,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 334,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 466,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 674,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 126,
        "y": 330,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 126,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 674,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 6",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 56,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 122,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 462,
        "y": 260,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 338,
        "y": 130,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 122,
        "y": 260,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 678,
        "y": 130,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 678,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 462,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 570,
        "y": 200,
        "length": 300,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 200,
        "length": 300,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 122,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 7",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 57,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 670,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 330,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 70,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 470,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 670,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 330,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 8",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 58,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 674,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 334,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 674,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 674,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 466,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 674,
        "y": 220,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 126,
        "y": 340,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 334,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 126,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 334,
        "y": 220,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 466,
        "y": 340,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 466,
        "y": 220,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 340,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 126,
        "y": 220,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 340,
        "length": 104,
        "angle": 7
      },
      {
        "type": "wall",
        "x": 570,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 466,
        "y": 284.20000016999995,
        "angle": 180,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 334,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 9",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 59,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 338,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 678,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 678,
        "y": 350,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 462,
        "y": 390,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 678,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 122,
        "y": 120,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 338,
        "y": 350,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 122,
        "y": 390,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 338,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 462,
        "y": 120,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 462,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 570,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 462,
        "y": 175.79999983000002,
        "angle": 0,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 338,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Dois raios e passagens 10",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 6,
    "stageName": "Dois raios e passagens",
    "difficulty": 60,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 130,
        "y": 390,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 390,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 470,
        "y": 280,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 330,
        "y": 280,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 130,
        "y": 280,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 670,
        "y": 280,
        "radius": 15,
        "colors": null
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 180,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 180,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 390,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 180,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 180,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 390,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 570,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 130,
        "y": 331.5000005,
        "angle": 180,
        "length": 60,
        "width": 12,
        "purpose": "Fecha o atalho direto: é preciso contornar com os espelhos."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 130,
      "y": 390,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal.",
      "Fecha o atalho direto: é preciso contornar com os espelhos."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 1",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 61,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 330,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 670,
        "y": 200,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "Novidade: portais seletivos. Os pontos e nomes indicam as cores aceitas. Uma cor não autorizada para na entrada. Portais brancos continuam aceitando todas.",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 2",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 62,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 126,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 334,
        "y": 315,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 126,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 674,
        "y": 315,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 466,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 126,
        "y": 200,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 200,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 200,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 200,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 230,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 126,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 3",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 63,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 122,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 122,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 338,
        "y": 145,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 122,
        "y": 130,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 678,
        "y": 145,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 462,
        "y": 130,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 122,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 462,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 230,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 122,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 4",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 64,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 470,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 130,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 330,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 130,
        "y": 220,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 670,
        "y": 340,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 470,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 670,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 470,
        "y": 220,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 330,
        "y": 340,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 230,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 470,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 5",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 65,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 674,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 334,
        "y": 200,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 466,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 674,
        "y": 200,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 126,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 126,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 674,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 6",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 66,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 122,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 462,
        "y": 260,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 338,
        "y": 130,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 122,
        "y": 260,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 678,
        "y": 130,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 678,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 462,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 570,
        "y": 200,
        "length": 300,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 200,
        "length": 300,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 122,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 7",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 67,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 670,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 330,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 470,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 670,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 330,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 8",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 68,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 674,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 334,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 674,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 674,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 466,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 674,
        "y": 220,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 126,
        "y": 340,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 334,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 126,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 334,
        "y": 220,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 466,
        "y": 340,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 466,
        "y": 220,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 340,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 126,
        "y": 220,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 340,
        "length": 104,
        "angle": 7
      },
      {
        "type": "wall",
        "x": 570,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 334,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 9",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 69,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 338,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 678,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 678,
        "y": 350,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 462,
        "y": 390,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 678,
        "y": 240,
        "radius": 15,
        "colors": null
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 122,
        "y": 120,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 338,
        "y": 350,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 122,
        "y": 390,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 338,
        "y": 240,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 462,
        "y": 120,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 462,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 570,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 338,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Portais seletivos 10",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 7,
    "stageName": "Portais seletivos",
    "difficulty": 70,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 130,
        "y": 390,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 390,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 470,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 330,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 130,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 670,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 180,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 180,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 390,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 180,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 180,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 390,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 570,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 130,
      "y": 390,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 1",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 71,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 330,
        "y": 200,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 670,
        "y": 200,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 2",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 72,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 466,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 126,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 126,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 334,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 126,
        "y": 220,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 674,
        "y": 340,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 466,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 674,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 466,
        "y": 220,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 334,
        "y": 340,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 334,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 340,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 126,
        "y": 340,
        "length": 104,
        "angle": -76
      },
      {
        "type": "wall",
        "x": 230,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 466,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 3",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 73,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 122,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 122,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 462,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 338,
        "y": 145,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 122,
        "y": 130,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 678,
        "y": 145,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 462,
        "y": 130,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 122,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 462,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 230,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 122,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 4",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 74,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 130,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 130,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 470,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 130,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 330,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 470,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 670,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 220,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 220,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 130,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 470,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 130,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 5",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 75,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 126,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 674,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 334,
        "y": 200,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 466,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 674,
        "y": 200,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 126,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 126,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 330,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 230,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 570,
        "y": 260,
        "length": 300,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 674,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 6",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 76,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 678,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 678,
        "y": 350,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 462,
        "y": 390,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 338,
        "y": 350,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 122,
        "y": 390,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 462,
        "y": 240,
        "length": 104,
        "angle": -21
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 240,
        "length": 104,
        "angle": -69
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 240,
        "length": 104,
        "angle": -21
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 240,
        "length": 104,
        "angle": -69
      },
      {
        "type": "wall",
        "x": 678,
        "y": 305,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 338,
        "y": 305,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 678,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 7",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 77,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 670,
        "y": 110,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 470,
        "y": 70,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 330,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 130,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 470,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 670,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 220,
        "length": 104,
        "angle": 76
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 220,
        "length": 104,
        "angle": 14
      },
      {
        "type": "wall",
        "x": 670,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 330,
        "y": 155,
        "length": 90,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 8",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 78,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 674,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 334,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 126,
        "y": 390,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 466,
        "y": 390,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 466,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 334,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 126,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 674,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 674,
        "y": 180,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 466,
        "y": 180,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 390,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 334,
        "y": 180,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 126,
        "y": 180,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 674,
        "y": 390,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 570,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 126,
      "y": 390,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 9",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 79,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 678,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 338,
        "y": 430,
        "angle": -90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 338,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 678,
        "y": 25,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 678,
        "y": 350,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 462,
        "y": 390,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 678,
        "y": 240,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 122,
        "y": 120,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 338,
        "y": 350,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 122,
        "y": 390,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 338,
        "y": 240,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 462,
        "y": 120,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 462,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 338,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 122,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 678,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 570,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 338,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Escolha a passagem certa 10",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 8,
    "stageName": "Escolha a passagem certa",
    "difficulty": 80,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 670,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 30,
        "angle": 90,
        "color": "blue"
      }
    ],
    "targets": [
      {
        "x": 670,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 330,
        "y": 435,
        "radius": 22,
        "color": "blue"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 470,
        "y": 315,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 670,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 130,
        "y": 315,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 330,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 670,
        "y": 200,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 470,
        "y": 200,
        "length": 104,
        "angle": 83
      },
      {
        "type": "mirror",
        "x": 330,
        "y": 200,
        "length": 104,
        "angle": 7
      },
      {
        "type": "mirror",
        "x": 130,
        "y": 200,
        "length": 104,
        "angle": 83
      },
      {
        "type": "wall",
        "x": 570,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 230,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 670,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 4,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 1",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 81,
    "family": "colunas-0",
    "sources": [
      {
        "x": 75,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 195,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 725,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 75,
        "y": 200,
        "length": 104,
        "angle": 89.59296258285482
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 305,
        "length": 104,
        "angle": 41.592962582854824
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 305,
        "length": 104,
        "angle": 48.407037417145176
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 200,
        "length": 104,
        "angle": 0.4070374171451725
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 200,
        "length": 104,
        "angle": 89.59296258285482
      },
      {
        "type": "mirror",
        "x": 725,
        "y": 305,
        "length": 104,
        "angle": 41.592962582854824
      }
    ],
    "solution": [
      65.59296258285482,
      65.59296258285482,
      24.407037417145172,
      24.407037417145172,
      65.59296258285482,
      65.59296258285482
    ],
    "sourceAngle": 90,
    "target": {
      "x": 195,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "Nova cor: rosa! Agora são três disparadores e três alvos. Todos devem chegar sem cruzar a trajetória das outras cores.",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 2",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 82,
    "family": "ziguezague-1",
    "sources": [
      {
        "x": 765,
        "y": 164,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 279,
        "angle": 180,
        "color": "blue"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 66,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 181,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 25,
        "y": 296,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 570,
        "y": 164,
        "length": 104,
        "angle": 46.74373468210699
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 66,
        "length": 104,
        "angle": -31
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 164,
        "length": 104,
        "angle": 27.02416579078276
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 279,
        "length": 104,
        "angle": -15.25626531789301
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 181,
        "length": 104,
        "angle": 31
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 279,
        "length": 104,
        "angle": -34.97583420921724
      },
      {
        "type": "mirror",
        "x": 570,
        "y": 394,
        "length": 104,
        "angle": 46.74373468210699
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 296,
        "length": 104,
        "angle": -31
      },
      {
        "type": "mirror",
        "x": 250,
        "y": 394,
        "length": 104,
        "angle": 27.02416579078276
      }
    ],
    "solution": [
      15.74373468210699,
      0,
      -3.97583420921724,
      15.74373468210699,
      0,
      -3.97583420921724,
      15.74373468210699,
      0,
      -3.97583420921724
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 66,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 9,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 3",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 83,
    "family": "colunas-2",
    "sources": [
      {
        "x": 75,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 430,
        "angle": -90,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 430,
        "angle": -90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 195,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 25,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 725,
        "y": 25,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 75,
        "y": 250,
        "length": 104,
        "angle": -28.890562382434354
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 135,
        "length": 104,
        "angle": 75.10943761756565
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 135,
        "length": 104,
        "angle": 14.89056238243435
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 250,
        "length": 104,
        "angle": -61.109437617565646
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 250,
        "length": 104,
        "angle": -28.890562382434354
      },
      {
        "type": "mirror",
        "x": 725,
        "y": 135,
        "length": 104,
        "angle": 75.10943761756565
      }
    ],
    "solution": [
      -66.89056238243435,
      -66.89056238243435,
      -23.10943761756565,
      -23.10943761756565,
      -66.89056238243435,
      -66.89056238243435
    ],
    "sourceAngle": -90,
    "target": {
      "x": 195,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 4",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 84,
    "family": "ziguezague-3",
    "sources": [
      {
        "x": 765,
        "y": 164,
        "angle": 180,
        "color": "gold"
      },
      {
        "x": 765,
        "y": 279,
        "angle": 180,
        "color": "blue"
      },
      {
        "x": 765,
        "y": 394,
        "angle": 180,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 25,
        "y": 66,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 25,
        "y": 181,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 25,
        "y": 296,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 560,
        "y": 164,
        "length": 104,
        "angle": 61.57896194233612
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 66,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 164,
        "length": 104,
        "angle": 39.73962548300884
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 279,
        "length": 104,
        "angle": -28.42103805766388
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 181,
        "length": 104,
        "angle": 45
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 279,
        "length": 104,
        "angle": -50.26037451699116
      },
      {
        "type": "mirror",
        "x": 560,
        "y": 394,
        "length": 104,
        "angle": 61.57896194233612
      },
      {
        "type": "mirror",
        "x": 410,
        "y": 296,
        "length": 104,
        "angle": -45
      },
      {
        "type": "mirror",
        "x": 260,
        "y": 394,
        "length": 104,
        "angle": 39.73962548300884
      }
    ],
    "solution": [
      16.57896194233612,
      0,
      -5.260374516991163,
      16.57896194233612,
      0,
      -5.260374516991163,
      16.57896194233612,
      0,
      -5.260374516991163
    ],
    "sourceAngle": 180,
    "target": {
      "x": 25,
      "y": 66,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 9,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 5",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 85,
    "family": "colunas-4",
    "sources": [
      {
        "x": 75,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 195,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 725,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 75,
        "y": 205,
        "length": 104,
        "angle": -61.744776460999574
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 315,
        "length": 104,
        "angle": 14.255223539000426
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 315,
        "length": 104,
        "angle": 75.74477646099957
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 205,
        "length": 104,
        "angle": -28.255223539000426
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 205,
        "length": 104,
        "angle": -61.744776460999574
      },
      {
        "type": "mirror",
        "x": 725,
        "y": 315,
        "length": 104,
        "angle": 14.255223539000426
      }
    ],
    "solution": [
      66.25522353900043,
      66.25522353900043,
      23.744776460999574,
      23.744776460999574,
      66.25522353900043,
      66.25522353900043
    ],
    "sourceAngle": 90,
    "target": {
      "x": 195,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 6",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 86,
    "family": "ziguezague-0",
    "sources": [
      {
        "x": 35,
        "y": 296,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 181,
        "angle": 0,
        "color": "blue"
      },
      {
        "x": 35,
        "y": 66,
        "angle": 0,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 296,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 181,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 775,
        "y": 66,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 296,
        "length": 104,
        "angle": 42.50533661680156
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 394,
        "length": 104,
        "angle": -24
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 296,
        "length": 104,
        "angle": 24
      },
      {
        "type": "mirror",
        "x": 620,
        "y": 394,
        "length": 104,
        "angle": -21.646388907392065
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 181,
        "length": 104,
        "angle": 42.50533661680156
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 279,
        "length": 104,
        "angle": -24
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 181,
        "length": 104,
        "angle": 24
      },
      {
        "type": "mirror",
        "x": 620,
        "y": 279,
        "length": 104,
        "angle": -21.646388907392065
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 66,
        "length": 104,
        "angle": 42.50533661680156
      },
      {
        "type": "mirror",
        "x": 360,
        "y": 164,
        "length": 104,
        "angle": -24
      },
      {
        "type": "mirror",
        "x": 490,
        "y": 66,
        "length": 104,
        "angle": 24
      },
      {
        "type": "mirror",
        "x": 620,
        "y": 164,
        "length": 104,
        "angle": -21.646388907392065
      },
      {
        "type": "wall",
        "x": 590,
        "y": 66,
        "angle": 90,
        "length": 70,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      18.505336616801554,
      0,
      0,
      2.3536110926079346,
      18.505336616801554,
      0,
      0,
      2.3536110926079346,
      18.505336616801554,
      0,
      0,
      2.3536110926079346
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 296,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 12,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 7",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 87,
    "family": "colunas-1",
    "sources": [
      {
        "x": 725,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 195,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 605,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 75,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 725,
        "y": 305,
        "length": 104,
        "angle": 6.592962582854824
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 200,
        "length": 104,
        "angle": -55.407037417145176
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 200,
        "length": 104,
        "angle": -34.592962582854824
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 305,
        "length": 104,
        "angle": 83.40703741714518
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 305,
        "length": 104,
        "angle": 6.592962582854824
      },
      {
        "type": "mirror",
        "x": 75,
        "y": 200,
        "length": 104,
        "angle": -55.407037417145176
      }
    ],
    "solution": [
      -24.407037417145176,
      -24.407037417145176,
      -65.59296258285482,
      -65.59296258285482,
      -24.407037417145176,
      -24.407037417145176
    ],
    "sourceAngle": 90,
    "target": {
      "x": 605,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 8",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 88,
    "family": "ziguezague-2",
    "sources": [
      {
        "x": 35,
        "y": 164,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 279,
        "angle": 0,
        "color": "blue"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 164,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 279,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 240,
        "y": 164,
        "length": 104,
        "angle": 19.494663383198446
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 66,
        "length": 104,
        "angle": -38
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 164,
        "length": 104,
        "angle": 38
      },
      {
        "type": "mirror",
        "x": 630,
        "y": 66,
        "length": 104,
        "angle": -39.47870218167408
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 279,
        "length": 104,
        "angle": 19.494663383198446
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 181,
        "length": 104,
        "angle": -38
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 279,
        "length": 104,
        "angle": 38
      },
      {
        "type": "mirror",
        "x": 630,
        "y": 181,
        "length": 104,
        "angle": -39.47870218167408
      },
      {
        "type": "mirror",
        "x": 240,
        "y": 394,
        "length": 104,
        "angle": 19.494663383198446
      },
      {
        "type": "mirror",
        "x": 370,
        "y": 296,
        "length": 104,
        "angle": -38
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 394,
        "length": 104,
        "angle": 38
      },
      {
        "type": "mirror",
        "x": 630,
        "y": 296,
        "length": 104,
        "angle": -39.47870218167408
      },
      {
        "type": "wall",
        "x": 405,
        "y": 394,
        "angle": 90,
        "length": 70,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -18.505336616801554,
      0,
      0,
      -1.4787021816740804,
      -18.505336616801554,
      0,
      0,
      -1.4787021816740804,
      -18.505336616801554,
      0,
      0,
      -1.4787021816740804
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 164,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 12,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 9",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 89,
    "family": "colunas-3",
    "sources": [
      {
        "x": 725,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 430,
        "angle": -90,
        "color": "blue"
      },
      {
        "x": 195,
        "y": 430,
        "angle": -90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 605,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 25,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 75,
        "y": 25,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 725,
        "y": 135,
        "length": 104,
        "angle": 68.10943761756566
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 250,
        "length": 104,
        "angle": -21.89056238243434
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 250,
        "length": 104,
        "angle": -68.10943761756566
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 135,
        "length": 104,
        "angle": 21.89056238243434
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 135,
        "length": 104,
        "angle": 68.10943761756566
      },
      {
        "type": "mirror",
        "x": 75,
        "y": 250,
        "length": 104,
        "angle": -21.89056238243434
      }
    ],
    "solution": [
      23.10943761756566,
      23.10943761756566,
      66.89056238243434,
      66.89056238243434,
      23.10943761756566,
      23.10943761756566
    ],
    "sourceAngle": -90,
    "target": {
      "x": 605,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Terceira cor 10",
    "hint": "Procure a sequência de viradas que contorna as paredes. Cada cor precisa de um caminho sem cruzamentos.",
    "stage": 9,
    "stageName": "Terceira cor",
    "difficulty": 90,
    "family": "ziguezague-4",
    "sources": [
      {
        "x": 35,
        "y": 164,
        "angle": 0,
        "color": "gold"
      },
      {
        "x": 35,
        "y": 279,
        "angle": 0,
        "color": "blue"
      },
      {
        "x": 35,
        "y": 394,
        "angle": 0,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 775,
        "y": 164,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 775,
        "y": 279,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 775,
        "y": 394,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [],
    "objects": [
      {
        "type": "mirror",
        "x": 230,
        "y": 164,
        "length": 104,
        "angle": 34.01156485644533
      },
      {
        "type": "mirror",
        "x": 365,
        "y": 66,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 164,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 635,
        "y": 66,
        "length": 104,
        "angle": -52.492425044275336
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 279,
        "length": 104,
        "angle": 34.01156485644533
      },
      {
        "type": "mirror",
        "x": 365,
        "y": 181,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 279,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 635,
        "y": 181,
        "length": 104,
        "angle": -52.492425044275336
      },
      {
        "type": "mirror",
        "x": 230,
        "y": 394,
        "length": 104,
        "angle": 34.01156485644533
      },
      {
        "type": "mirror",
        "x": 365,
        "y": 296,
        "length": 104,
        "angle": -52
      },
      {
        "type": "mirror",
        "x": 500,
        "y": 394,
        "length": 104,
        "angle": 52
      },
      {
        "type": "mirror",
        "x": 635,
        "y": 296,
        "length": 104,
        "angle": -52.492425044275336
      },
      {
        "type": "wall",
        "x": 405,
        "y": 394,
        "angle": 90,
        "length": 70,
        "width": 12,
        "purpose": "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
      }
    ],
    "solution": [
      -17.988435143554664,
      0,
      0,
      -0.4924250442753362,
      -17.988435143554664,
      0,
      0,
      -0.4924250442753362,
      -17.988435143554664,
      0,
      0,
      -0.4924250442753362
    ],
    "sourceAngle": 0,
    "target": {
      "x": 775,
      "y": 164,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 12,
    "wallPurpose": [
      "Bloqueia o atalho fonte–alvo; a luz precisa contornar pela sequência de viradas."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 1",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 91,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 79,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 344,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 609,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 456,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 721,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 191,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 191,
        "y": 200,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 344,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 456,
        "y": 200,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 609,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 721,
        "y": 200,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 79,
        "y": 330,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 79,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 456,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 344,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 721,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 609,
        "y": 200,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 191,
        "y": 330,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 135,
        "y": 260,
        "length": 220,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 260,
        "length": 220,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 665,
        "y": 260,
        "length": 220,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 456,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "Síntese: combine três raios, portais brancos e seletivos. Alguns pares aceitam duas cores. Observe a letra do par e as cores permitidas antes de confirmar.",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 2",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 92,
    "family": "portal-entrada-antecipada",
    "sources": [
      {
        "x": 75,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 75,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 75,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 195,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 340,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 460,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 605,
        "y": 110,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 725,
        "y": 70,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 195,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 75,
        "y": 220,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 220,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 725,
        "y": 220,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 220,
        "length": 104,
        "angle": -76
      },
      {
        "type": "wall",
        "x": 75,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 340,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 605,
        "y": 155,
        "length": 90,
        "angle": 0,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 75,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 3",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 93,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 71,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 336,
        "y": 430,
        "angle": -90,
        "color": "blue"
      },
      {
        "x": 601,
        "y": 430,
        "angle": -90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 71,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 336,
        "y": 25,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 601,
        "y": 25,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 199,
        "y": 145,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 71,
        "y": 130,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 464,
        "y": 145,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 336,
        "y": 130,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 729,
        "y": 145,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 601,
        "y": 130,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 71,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 199,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 336,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 464,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 601,
        "y": 260,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 729,
        "y": 260,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 135,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 665,
        "y": 140,
        "length": 140,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 71,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 4",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 94,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 79,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 344,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 609,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 344,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 609,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 79,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 79,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 191,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 79,
        "y": 220,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 456,
        "y": 340,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 344,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 456,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 344,
        "y": 220,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 721,
        "y": 340,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 609,
        "y": 110,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 721,
        "y": 70,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F1",
        "pairId": "F2",
        "label": "F",
        "x": 609,
        "y": 220,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F2",
        "pairId": "F1",
        "label": "F",
        "x": 191,
        "y": 340,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 191,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 344,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 456,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 609,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 721,
        "y": 220,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 79,
        "y": 340,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 135,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 665,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 344,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 5",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 95,
    "family": "portal-cotovelos",
    "sources": [
      {
        "x": 75,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 340,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 605,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 460,
        "y": 390,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 725,
        "y": 390,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 195,
        "y": 390,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 195,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 340,
        "y": 280,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 460,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 605,
        "y": 280,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 725,
        "y": 280,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 75,
        "y": 280,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 75,
        "y": 180,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 180,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 390,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 180,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 180,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 390,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 180,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 725,
        "y": 180,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 75,
        "y": 390,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 135,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 665,
        "y": 280,
        "length": 90,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45,
      45,
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 460,
      "y": 390,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 9,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 6",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 96,
    "family": "portal-salas-trocadas",
    "sources": [
      {
        "x": 729,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 464,
        "y": 430,
        "angle": -90,
        "color": "blue"
      },
      {
        "x": 199,
        "y": 430,
        "angle": -90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 336,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 71,
        "y": 25,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 601,
        "y": 25,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 601,
        "y": 260,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 464,
        "y": 130,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 336,
        "y": 260,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 199,
        "y": 130,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 71,
        "y": 260,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 729,
        "y": 130,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 729,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 336,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 464,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 71,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "mirror",
        "x": 199,
        "y": 260,
        "length": 104,
        "angle": 69
      },
      {
        "type": "mirror",
        "x": 601,
        "y": 130,
        "length": 104,
        "angle": 21
      },
      {
        "type": "wall",
        "x": 665,
        "y": 200,
        "length": 220,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 200,
        "length": 220,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 135,
        "y": 200,
        "length": 220,
        "angle": 180,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45,
      45,
      45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 336,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 7",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 97,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 721,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 456,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 191,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 721,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 456,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 191,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 609,
        "y": 315,
        "radius": 15,
        "colors": null
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 721,
        "y": 330,
        "radius": 15,
        "colors": null
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 344,
        "y": 315,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 456,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 79,
        "y": 315,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 191,
        "y": 330,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 721,
        "y": 200,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 609,
        "y": 200,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 456,
        "y": 200,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 344,
        "y": 200,
        "length": 104,
        "angle": -76
      },
      {
        "type": "mirror",
        "x": 191,
        "y": 200,
        "length": 104,
        "angle": -14
      },
      {
        "type": "mirror",
        "x": 79,
        "y": 200,
        "length": 104,
        "angle": -76
      },
      {
        "type": "wall",
        "x": 665,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 135,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 721,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 8",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 98,
    "family": "portal-saida-tardia",
    "sources": [
      {
        "x": 725,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 195,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 725,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 460,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 195,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 605,
        "y": 315,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 725,
        "y": 330,
        "radius": 15,
        "colors": [
          "gold",
          "blue"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 340,
        "y": 315,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 460,
        "y": 330,
        "radius": 15,
        "colors": [
          "blue",
          "pink"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 75,
        "y": 315,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 195,
        "y": 330,
        "radius": 15,
        "colors": [
          "pink",
          "gold"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 725,
        "y": 200,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 605,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 460,
        "y": 200,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 340,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 195,
        "y": 200,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 75,
        "y": 200,
        "length": 104,
        "angle": -83
      },
      {
        "type": "wall",
        "x": 665,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 135,
        "y": 320,
        "length": 140,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 725,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 9",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 99,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 729,
        "y": 430,
        "angle": -90,
        "color": "gold"
      },
      {
        "x": 464,
        "y": 430,
        "angle": -90,
        "color": "blue"
      },
      {
        "x": 199,
        "y": 430,
        "angle": -90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 464,
        "y": 25,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 199,
        "y": 25,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 729,
        "y": 25,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 729,
        "y": 350,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 601,
        "y": 390,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 729,
        "y": 240,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 336,
        "y": 120,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 464,
        "y": 350,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 336,
        "y": 390,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 464,
        "y": 240,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 71,
        "y": 120,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 199,
        "y": 350,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 71,
        "y": 390,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F1",
        "pairId": "F2",
        "label": "F",
        "x": 199,
        "y": 240,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F2",
        "pairId": "F1",
        "label": "F",
        "x": 601,
        "y": 120,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 601,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 464,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 336,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 199,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "mirror",
        "x": 71,
        "y": 240,
        "length": 104,
        "angle": 0
      },
      {
        "type": "mirror",
        "x": 729,
        "y": 120,
        "length": 104,
        "angle": -90
      },
      {
        "type": "wall",
        "x": 665,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 135,
        "y": 177.5,
        "length": 45,
        "angle": -90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      -45,
      -45,
      -45,
      -45,
      -45,
      -45
    ],
    "sourceAngle": -90,
    "target": {
      "x": 464,
      "y": 25,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  },
  {
    "name": "Síntese de cores e portais 10",
    "hint": "Planeje as viradas e descubra qual saída de portal leva ao alvo. O teleporte preserva a direção.",
    "stage": 10,
    "stageName": "Síntese de cores e portais",
    "difficulty": 100,
    "family": "portal-duas-travessias",
    "sources": [
      {
        "x": 721,
        "y": 30,
        "angle": 90,
        "color": "gold"
      },
      {
        "x": 456,
        "y": 30,
        "angle": 90,
        "color": "blue"
      },
      {
        "x": 191,
        "y": 30,
        "angle": 90,
        "color": "pink"
      }
    ],
    "targets": [
      {
        "x": 456,
        "y": 435,
        "radius": 22,
        "color": "gold"
      },
      {
        "x": 191,
        "y": 435,
        "radius": 22,
        "color": "blue"
      },
      {
        "x": 721,
        "y": 435,
        "radius": 22,
        "color": "pink"
      }
    ],
    "portals": [
      {
        "id": "A1",
        "pairId": "A2",
        "label": "A",
        "x": 721,
        "y": 110,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "A2",
        "pairId": "A1",
        "label": "A",
        "x": 609,
        "y": 70,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B1",
        "pairId": "B2",
        "label": "B",
        "x": 721,
        "y": 220,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "B2",
        "pairId": "B1",
        "label": "B",
        "x": 344,
        "y": 340,
        "radius": 15,
        "colors": [
          "gold"
        ]
      },
      {
        "id": "C1",
        "pairId": "C2",
        "label": "C",
        "x": 456,
        "y": 110,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "C2",
        "pairId": "C1",
        "label": "C",
        "x": 344,
        "y": 70,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D1",
        "pairId": "D2",
        "label": "D",
        "x": 456,
        "y": 220,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "D2",
        "pairId": "D1",
        "label": "D",
        "x": 79,
        "y": 340,
        "radius": 15,
        "colors": [
          "blue"
        ]
      },
      {
        "id": "E1",
        "pairId": "E2",
        "label": "E",
        "x": 191,
        "y": 110,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "E2",
        "pairId": "E1",
        "label": "E",
        "x": 79,
        "y": 70,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F1",
        "pairId": "F2",
        "label": "F",
        "x": 191,
        "y": 220,
        "radius": 15,
        "colors": [
          "pink"
        ]
      },
      {
        "id": "F2",
        "pairId": "F1",
        "label": "F",
        "x": 609,
        "y": 340,
        "radius": 15,
        "colors": [
          "pink"
        ]
      }
    ],
    "objects": [
      {
        "type": "mirror",
        "x": 609,
        "y": 220,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 456,
        "y": 340,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 344,
        "y": 220,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 191,
        "y": 340,
        "length": 104,
        "angle": -7
      },
      {
        "type": "mirror",
        "x": 79,
        "y": 220,
        "length": 104,
        "angle": -83
      },
      {
        "type": "mirror",
        "x": 721,
        "y": 340,
        "length": 104,
        "angle": -7
      },
      {
        "type": "wall",
        "x": 665,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 400,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      },
      {
        "type": "wall",
        "x": 135,
        "y": 282.5,
        "length": 45,
        "angle": 90,
        "width": 12,
        "purpose": "Divisória entre salas: encontre a passagem pelo portal."
      }
    ],
    "solution": [
      45,
      45,
      45,
      45,
      45,
      45
    ],
    "sourceAngle": 90,
    "target": {
      "x": 456,
      "y": 435,
      "radius": 22,
      "color": "gold"
    },
    "requiredBounces": 6,
    "wallPurpose": [
      "Divisória entre salas: encontre a passagem pelo portal."
    ],
    "decoyCount": 0,
    "tutorial": "",
    "rules": "Cada cor no seu alvo, sem cruzar outras trajetórias."
  }
];
