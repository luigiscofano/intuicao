// Definições históricas de Corte certo mantidas para compatibilidade.
import { shapePolygon, regionGeometry, curveValue } from './curves.mjs';
import { area } from './math.mjs';
// Campanhas de Reflexos e Corte certo.
export { lightLevels } from './light-levels.mjs';
// Dados materializados: valores e ordem preservados.
// prettier-ignore
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

// Corte v2: 100 desafios; vazios maiores, irregulares e com recortes de borda.
// A área é a figura MENOS A UNIÃO dos recortes, não a soma de áreas dos recortes.
export const holeLevelNumbers = [];
for (let index = 0; index < cutLevels.length; index++) {
  const l = cutLevels[index],
    number = index + 1,
    band = Math.floor(index / 20),
    slot = index % 20;
  l.id = `corte-v2-${number}`;
  l.removedFraction = 0;
  l.basicDirection = l.angle;
  l.basicOrigin = { x: l.centerX ?? 400, y: l.centerY ?? 230 };
  l.initialTravel = 0;
  l.permissions = { ...l.permissions, x: true, y: true, rotate: true, offset: true };
  const poly = shapePolygon(l.shape),
    center = poly.reduce((c, p) => ({ x: c.x + p.x / poly.length, y: c.y + p.y / poly.length }), {
      x: 0,
      y: 0,
    });
  const radius = Math.min(
    ...poly.map((a, i) => {
      const b = poly[(i + 1) % poly.length];
      return (
        Math.abs((b.x - a.x) * (a.y - center.y) - (a.x - center.x) * (b.y - a.y)) /
        Math.hypot(b.x - a.x, b.y - a.y)
      );
    }),
  );
  // Frequência por 20 fases: 6, 10, 14, 18 e 20. Introdução sem vazios nas 5 primeiras.
  const quota = [6, 10, 14, 18, 20][band],
    hasHole = band === 0 ? [5, 8, 11, 14, 17, 19].includes(slot) : (slot * 7) % 20 < quota;
  if (hasHole) {
    holeLevelNumbers.push(number);
    const count = number < 30 ? 1 : number < 65 ? 2 : 3,
      edge = number >= 25 && number % 3 !== 0;
    const desired = 0.19 + band * 0.035 + (number % 4) * 0.012;
    const create = (scale) =>
      Array.from({ length: count }, (_, j) => {
        const theta = ((number * 137.5 + j * 137) * Math.PI) / 180,
          isEdge = edge && j === count - 1;
        const orbit = isEdge ? 1.05 : j === 0 ? 0.28 : 0.48,
          cx = center.x + Math.cos(theta) * radius * orbit,
          cy = center.y + Math.sin(theta) * radius * orbit;
        const sides = 7 + ((number + j) % 4),
          r = radius * scale * (j === 0 ? 1 : 0.8);
        return Array.from({ length: sides }, (_, k) => {
          const a = theta + ((k + 0.13 * Math.sin(k * 2 + number)) * 2 * Math.PI) / sides;
          const notch = number > 45 && j === 0 && k === 2 ? 0.58 : 1;
          return {
            x: cx + r * Math.cos(a) * (1.05 + 0.13 * Math.sin(number)) * notch,
            y: cy + r * Math.sin(a) * (0.85 + 0.12 * Math.cos(number + j)) * notch,
          };
        });
      });
    let lo = 0.2,
      hi = 1.6;
    for (let k = 0; k < 24; k++) {
      const mid = (lo + hi) / 2,
        hs = create(mid);
      let removed;
      try {
        const g = regionGeometry(poly, hs);
        removed = g.removedArea / g.outerArea;
      } catch {
        removed = 1;
      }
      if (removed < desired) lo = mid;
      else hi = mid;
    }
    l.holes = create((lo + hi) / 2);
    const g = regionGeometry(poly, l.holes);
    l.removedFraction = g.removedArea / g.outerArea;
    l.hasEdgeOpening = l.holes.some((h) => regionGeometry(poly, [h]).removedArea < area(h) - 1);
    l.holeDescription = `${count} ${count === 1 ? 'recorte irregular excluído' : 'recortes irregulares excluídos'} da área${l.hasEdgeOpening ? ' · inclui abertura na borda' : ''}`;
    l.name += ` · ${l.hasEdgeOpening ? 'contorno recortado' : 'vazios irregulares'}`;
  }
  const a = (l.angle * Math.PI) / 180,
    n = { x: Math.cos(a), y: Math.sin(a) },
    t = { x: -n.y, y: n.x };
  const uv = poly.map((p) => ({
    u: (p.x - l.basicOrigin.x) * t.x + (p.y - l.basicOrigin.y) * t.y,
    v: (p.x - l.basicOrigin.x) * n.x + (p.y - l.basicOrigin.y) * n.y,
  }));
  const u0 = Math.min(...uv.map((p) => p.u)),
    u1 = Math.max(...uv.map((p) => p.u));
  const fs = Array.from({ length: 513 }, (_, i) =>
    curveValue(u0 + ((u1 - u0) * i) / 512, l.family, l.amplitude, l.frequency),
  );
  l.basicMin = Math.floor(
    Math.min(...uv.map((p) => p.v)) - Math.max(...fs) - (l.initialOffset ?? 0) - 50,
  );
  l.basicMax = Math.ceil(
    Math.max(...uv.map((p) => p.v)) - Math.min(...fs) - (l.initialOffset ?? 0) + 50,
  );
  l.basicRange = [l.basicMin, l.basicMax];
  l.entry = `Deslocamento em direção fixa de ${l.basicDirection}°; ajuste fino disponível na aba Controles da curva.`;
}

// Soluções certificadas no eixo básico, sem rotação ou translação lateral.
const cutBasicSolutions = [
  -8.344650268554688e-6, -75.00000596046448, -15.085746198892593, 41.50000512599945,
  -65.77848586440086, 53.69410726428032, -33.55955828726292, 46.680671483278275, -83.70269805192947,
  72.44916543364525, -7.501035317778587, -100.53117486834526, -27.152945935726166,
  30.060904696583748, -46.96964928507805, 23.445844024419785, -54.57992959022522, 45.64232061803341,
  -99.67638425529003, 65.28448566794395, -36.803274154663086, -61.03750464320183,
  -10.81570616364479, 67.64774683117867, -16.25332698225975, 41.06526005268097, -25.385801419615746,
  73.89141100645065, -86.61827033758163, 114.3892040848732, -8.851289749145508e-6,
  -74.99999663233757, -11.350991040468216, 41.49999243021011, -54.64710518717766,
  40.876329839229584, -37.88036896288395, 52.724897772073746, -94.48652729392052, 80.12945899367332,
  -91.91197022795677, 17.0941960811615, -71.97614347934723, 84.45539072155952, -72.39048478007317,
  108.43155011534691, -77.85303741693497, 81.73144486546516, -122.8992802798748, 115.80953526496887,
  -147.81637524068356, 24.585380360484123, -19.370532110333443, -0.45303916931152344,
  -79.53325580060482, 69.5602475553751, -19.249335557222366, 68.22529290616512, -109.09193612635136,
  86.05688194930553, -49.0017047226429, 44.59743681550026, 36.169090270996094, 20.880092352628708,
  -81.62247008085251, 87.05664086341858, -32.2611268311739, 71.32335865497589, -58.47864420711994,
  98.80194972455502, -132.01617322862148, 68.37533649802208, -18.26437172293663, 33.7668531537056,
  -93.28740212321281, 41.92192879319191, -70.53958965837955, 60.928410679101944, -82.05772417783737,
  96.07913960516453, -97.88626526296139, 47.19803100824356, -23.441634118556976, 44.32189466059208,
  -92.4096914678812, 94.65804143249989, 17.316858187317848, 79.45465324819088, -158.0113980770111,
  100.60567133128643, -75.3376123458147, 8.964979261159897, -58.08030590415001, 45.58603820204735,
  -64.43251088261604, 68.66103109717369, -82.5872229039669, 108.28031861782074, -166.70964977145195,
  101.65009117126465,
];
cutLevels.forEach((l, i) => {
  l.solutionTravel = cutBasicSolutions[i];
  l.basicSolution = l.solutionTravel;
});

// Estado inicial deliberadamente não resolvido: distância de 18–24 pp do alvo.
const cutInitialTravels = [
  82.8, -18, 15.1, -45.6, 6.6, -41.3, 21.7, 4.3, -40.3, 20.4, 89.1, -4.5, 12.5, -69.5, 31.6, -28.2,
  -9.8, -35.7, -44.7, -3.1, 135.7, 8.4, 24.5, -59.1, 39.5, -18.6, 32.8, 16.6, -28.3, 45.2, 92, -12,
  28.8, -54, 11, -19.6, 7.6, 0, -38.6, 16.9, -12.9, -81.6, -12.4, 37, -19, 25.5, -2.6, 11.4, -61.2,
  59.8, -15.2, -22.3, 44.8, -32.3, -3.8, -33.2, 33.5, 18.7, -51, 30, 2.5, -35.1, 118.1, -4.9, -46.5,
  29.2, 20, 22, 3.6, 23.1, -74.4, -6.3, 44.1, -26.6, -35.6, -14.9, 137.6, 8.5, -8.1, 45.8, 4.8, -67,
  73.6, -65, 9.1, 38.9, 60.9, 35.2, -79.3, 34.9, -4.9, -39.1, 35.4, -4.6, -0.1, -18.8, 26.4, -42.4,
  -65.3, 41.1,
];
cutLevels.forEach((l, i) => {
  l.initialTravel = cutInitialTravels[i];
});
