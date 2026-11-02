// Geração e preparação de dados de Corte certo.
import fs from 'node:fs';
import { cutLevels as legacy } from '../dist/cut-legacy-levels.mjs';
import {
  shapePolygon,
  regionGeometry,
  basicCutState,
  curvedCut,
  curveValue,
} from '../dist/curves.mjs';
const rows = [
  [1, 'A metade de um retângulo: siga a seta, sem girar.'],
  [2, 'Um quarto: a largura funciona porque a altura é constante.'],
  [3, 'No triângulo, a largura não mede a área.'],
  [4, 'A região larga do trapézio pesa mais que a ponta.'],
  [5, 'Compense a inclinação dos lados ao buscar trinta por cento.'],
  [7, 'Compare as faixas de largura variável do pentágono.'],
  [11, 'Primeira parábola: compense o centro com as duas laterais.'],
  [13, 'A parábola encontra uma ponta: altura e área deixam de acompanhar.'],
  [8, 'Retome a reta: setenta por cento exige comparar faixas.'],
  [14, 'A abertura da parábola e a base larga se compensam.'],
  [6, 'Primeiro vazio amplo: o centro visual já não representa a distribuição do material.'],
  [12, 'Um quarto da área restante, não um quarto do quadrado original.'],
  [10, 'Meta alta sem vazios: estime também o pequeno complemento.'],
  [15, 'Vazio assimétrico e parábola invertida: redistribua o peso lateral.'],
  [17, 'Feche a introdução comparando a ponta e as laterais do pentágono.'],
  [21, 'Primeira onda: crista e vale se compensam em retângulo íntegro.', { holes: [] }],
  [19, 'Meta pequena: compare a ponta da parábola com o complemento.'],
  [9, 'O recorte desloca a concentração de material numa meta de vinte e dois por cento.'],
  [22, 'Na onda, um vazio elimina parte da compensação entre crista e vale.'],
  [16, 'A largura do losango muda rapidamente perto de suas pontas.'],
  [25, 'Primeira abertura na borda: o contorno visível também perde material.'],
  [20, 'Meta alta e recorte: estime a pequena região que ficará fora.'],
  [41, 'Dois vazios com reta: compare a soma do material restante em lados diferentes.'],
  [24, 'A base larga e a onda competem pelo peso da área.'],
  [18, 'Inclinação e vazio: a figura centralizada não garante a proporção.'],
  [27, 'Uma onda num pentágono: compare a região da ponta com o vale recortado.'],
  [43, 'Reta em contorno irregular: divida área, não a extensão aparente.', { family: 'Reta' }],
  [51, 'Dois vazios internos redistribuem as faixas de um trapézio.'],
  [29, 'Sem vazios: poucos por cento dependem de cristas dentro de faixas oblíquas.'],
  [55, 'Parábola invertida e contorno irregular: compare as duas massas laterais.'],
  [31, 'Primeira cúbica: o S troca área entre extremidades opostas.'],
  [23, 'Retome a onda em triângulo: as duas oscilações não pesam igualmente.'],
  [42, 'Parábola e dois recortes: as regiões externas não compensam por simetria.'],
  [34, 'Cúbica no trapézio: a base larga dá pesos diferentes às pontas do S.'],
  [28, 'Onda com abertura: uma crista pode perder material fora do contorno.'],
  [54, 'Reta no triângulo largo recortado: medir a base não mede o material.', { family: 'Reta' }],
  [45, 'Parábola invertida: recortes quebram a compensação entre as laterais.'],
  [33, 'Cúbica e triângulo: dois vazios mudam o peso da ponta.'],
  [
    11,
    'Primeiro cosseno: a crista central ocupa material diferente das extremidades.',
    { family: 'Cosseno', target: 50 },
  ],
  [30, 'Onda e dois vazios: estime a área entre regiões largas e estreitas.'],
  [53, 'Pentágono alongado: a abertura de borda altera a faixa que domina a área.'],
  [35, 'Cúbica invertida sem vazios: a inclinação do contorno desequilibra o S.'],
  [63, 'Cosseno e vazios internos: o centro visual deixa de ser centro de área.'],
  [49, 'Parábola sem vazios, meta pequena: avalie a sensibilidade de uma faixa lateral.'],
  [43, 'Onda no contorno irregular: a largura local decide a compensação.'],
  [
    11,
    'Primeira dupla curva: duas mudanças de curvatura, uma única fronteira.',
    { family: 'Dupla curva', target: 40 },
  ],
  [44, 'Cúbica com abertura: compare o peso útil dos dois braços do S.'],
  [56, 'Figura achatada: a parábola cruza faixas largas com recortes de borda.'],
  [61, 'Cosseno alongado: o recorte tira peso de uma extremidade.'],
  [48, 'Onda inclinada: compense duas regiões excluídas em uma meta alta.'],
  [
    65,
    'Primeiros três recortes com reta: conte a união, nunca três áreas somadas.',
    { family: 'Reta' },
  ],
  [47, 'Cúbica oblíqua: uma abertura retira peso da ponta estreita.'],
  [91, 'Dupla curva e três recortes: compare as bolsas de material, não dois cortes.'],
  [52, 'Sem vazios: parábola invertida e losango exigem comparar larguras.'],
  [64, 'Cosseno na figura achatada: o recorte pode eliminar parte da crista.'],
  [71, 'Onda com três vazios: a crista central não representa todo o peso.'],
  [50, 'Meta de oitenta e três: use o complemento e a área restante.'],
  [96, 'Dupla curva no triângulo largo: os dois vales têm pesos distintos.'],
  [59, 'Parábola e abertura oblíqua: a pequena meta depende da ponta útil.'],
  [62, 'Cosseno invertido em triângulo: crista e base não são intercambiáveis.'],
  [
    89,
    'Reta de leitura sofisticada: contorno irregular e três vazios assimétricos.',
    { family: 'Reta', target: 36 },
  ],
  [72, 'Onda invertida: compare cristas largas e vales recortados.'],
  [82, 'Cúbica invertida em trapézio estreito: os braços têm larguras distintas.'],
  [95, 'Parábola invertida e alongamento: o recorte muda o peso da ponta.'],
  [92, 'Cosseno invertido: três vazios rompem a simetria aparente.'],
  [100, 'Dupla curva estreita: uma meta alta exige integrar vários resíduos.'],
  [75, 'Onda sem vazios: compare cristas oblíquas numa meta pequena.'],
  [87, 'Cúbica alongada: três vazios internos mudam as massas opostas.'],
  [58, 'Sem vazios: parábola negativa no trapézio estreito exige leitura da faixa.'],
  [66, 'Cosseno e três vazios internos: o peso depende da largura restante.'],
  [
    88,
    'Reta no triângulo largo: três recortes desmentem a divisão por distância.',
    { family: 'Reta', target: 63 },
  ],
  [97, 'Onda oblíqua no contorno irregular: repese cristas após a união dos vazios.'],
  [98, 'Cúbica negativa em figura achatada: compare braço largo e ponta removida.'],
  [
    96,
    'Dupla curva invertida: a inversão troca as regiões valorizadas pelos vazios.',
    { amplitude: -60, target: 32 },
  ],
  [68, 'Cosseno negativo: estime sessenta e três por cento do material, não da silhueta.'],
  [
    42,
    'Síntese 1: reta, contorno assimétrico e distribuição útil em duas regiões.',
    { family: 'Reta', target: 43 },
  ],
  [79, 'Síntese 2: onda e recortes compensam cristas, vales e ponta alongada.'],
  [89, 'Síntese 3: cúbica, regiões de pesos visuais enganosos e pequena meta.'],
  [
    91,
    'Síntese 4: dupla curva invertida com vazios que mudam os pesos das bolsas.',
    { amplitude: -75, target: 68 },
  ],
  [99, 'Síntese final: integre meta pequena, cosseno oblíquo e união da área excluída.'],
];
const tiers = ['Básico', 'Aprendiz', 'Intermediário', 'Avançado', 'Mestre', 'Modo Sábio'].map(
  (name, i) => ({
    name,
    start: i * 15 + 1,
    end: i === 5 ? 80 : (i + 1) * 15,
    count: i === 5 ? 5 : 15,
  }),
);
const output = [],
  audit = [];
function evaluate(l, t, holes = l.holes ?? []) {
  return curvedCut(shapePolygon(l.shape), { ...basicCutState(l, t), holes });
}
function solve(l, target) {
  let lo = l.basicMin,
    hi = l.basicMax;
  for (let k = 0; k < 26; k++) {
    const m = (lo + hi) / 2;
    if (evaluate(l, m).ratio * 100 < target) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}
for (let i = 0; i < rows.length; i++) {
  const [source, discovery, changes] = rows[i],
    l = structuredClone(legacy[source - 1]);
  if (changes) {
    Object.assign(l, changes);
    l.id = `corte80-v1-${i + 1}`;
    l.name = discovery.split(':')[0];
    // Same pre-defined normal, recompute only the frontier-dependent range.
    const a = (l.angle * Math.PI) / 180,
      n = { x: Math.cos(a), y: Math.sin(a) },
      t = { x: -n.y, y: n.x },
      p = shapePolygon(l.shape);
    const uv = p.map((p) => ({
      u: (p.x - l.basicOrigin.x) * t.x + (p.y - l.basicOrigin.y) * t.y,
      v: (p.x - l.basicOrigin.x) * n.x + (p.y - l.basicOrigin.y) * n.y,
    }));
    const u0 = Math.min(...uv.map((p) => p.u)),
      u1 = Math.max(...uv.map((p) => p.u));
    const fs = Array.from({ length: 513 }, (_, j) =>
      curveValue(u0 + ((u1 - u0) * j) / 512, l.family, l.amplitude, l.frequency),
    );
    l.basicMin = Math.floor(
      Math.min(...uv.map((p) => p.v)) - Math.max(...fs) - (l.initialOffset ?? 0) - 50,
    );
    l.basicMax = Math.ceil(
      Math.max(...uv.map((p) => p.v)) - Math.min(...fs) - (l.initialOffset ?? 0) + 50,
    );
    l.basicRange = [l.basicMin, l.basicMax];
    l.permissions.frequency = ['Seno', 'Cosseno'].includes(l.family) && l.permissions.frequency;
    l.solutionTravel = solve(l, l.target);
    l.basicSolution = l.solutionTravel;
    l.initialTravel = Math.round(solve(l, l.target + (l.target > 60 ? -20 : 20)) * 10) / 10;
  }
  if (!l.holes?.length) {
    l.holeDescription = '';
    l.hasEdgeOpening = false;
  }
  const g = regionGeometry(shapePolygon(l.shape), l.holes ?? []);
  l.removedFraction = g.removedArea / g.outerArea;
  l.number = i + 1;
  l.stage = Math.min(6, Math.floor(i / 15) + 1);
  l.tier = tiers[l.stage - 1].name;
  l.discovery = discovery;
  l.origin = {
    id: legacy[source - 1].id,
    number: source,
    kind: changes ? 'recomposed' : 'retained',
    changes: changes ? Object.keys(changes) : [],
  };
  const travel = Math.round(l.solutionTravel * 10) / 10,
    result = evaluate(l, travel),
    init = evaluate(l, l.initialTravel),
    noHoles = evaluate(l, travel, []);
  const sensitivity = (evaluate(l, travel + 5).ratio - evaluate(l, travel - 5).ratio) * 100;
  const solidSensitivity =
    (evaluate(l, travel + 5, []).ratio - evaluate(l, travel - 5, []).ratio) * 100;
  const low = solve(l, Math.max(0, l.target - 3)),
    high = solve(l, Math.min(100, l.target + 3));
  l.certificate = {
    travel,
    percent: result.ratio * 100,
    errorPP: result.errorPP,
    initialPercent: init.ratio * 100,
    usableWidth: high - low,
    wholeStepTravel: Math.round((l.initialTravel + Math.round(travel - l.initialTravel)) * 10) / 10,
    usefulArea: g.totalArea,
  };
  const whole = evaluate(l, l.certificate.wholeStepTravel);
  l.certificate.wholeStepPercent = whole.ratio * 100;
  const holesEffect = Math.abs(noHoles.ratio * 100 - result.ratio * 100),
    sensitivityEffect = Math.abs(sensitivity - solidSensitivity);
  audit.push({
    number: i + 1,
    id: l.id,
    source,
    modified: !!changes,
    family: l.family,
    shape: l.shape,
    target: l.target,
    holes: l.holes?.length ?? 0,
    holesEffectPP: holesEffect,
    sensitivityEffectPP: sensitivityEffect,
    removedFraction: l.removedFraction,
    ...l.certificate,
  });
  if (
    Math.abs(result.ratio * 100 - l.target) > 3 ||
    Math.abs(init.ratio * 100 - l.target) <= 3 ||
    Math.abs(whole.ratio * 100 - l.target) > 3 ||
    high - low < 5
  )
    throw Error(`Invalid certificate ${i + 1}`);
  output.push(l);
  console.log(
    i + 1,
    l.family,
    l.origin.kind,
    'holes',
    l.holes?.length ?? 0,
    'effect',
    holesEffect.toFixed(2),
    'sensitivity',
    sensitivityEffect.toFixed(2),
    'width',
    (high - low).toFixed(1),
  );
}
fs.writeFileSync(
  'dist/cut-campaign.mjs',
  `// Curated 80-level campaign. Geometry engine and interaction controls are unchanged.\nexport const cutCampaignTiers=${JSON.stringify(tiers)};\nexport const cutLevels=${JSON.stringify(output)};\nexport const holeLevelNumbers=cutLevels.flatMap((l,i)=>l.holes?.length?[i+1]:[]);\n`,
);
fs.writeFileSync(
  'dist/levels.mjs',
  `export {lightLevels} from './light-levels.mjs';\nexport {cutLevels,holeLevelNumbers,cutCampaignTiers} from './cut-campaign.mjs';\n`,
);
fs.writeFileSync(
  'tests/corte80-build-audit.json',
  JSON.stringify(
    {
      levels: 80,
      tiers,
      introException:
        'Explicit six introductory lines take priority; no triple family after level 6.',
      records: audit,
    },
    null,
    2,
  ),
);
