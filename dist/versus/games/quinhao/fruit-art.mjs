/** Arte aprovada do Quinhão: uma única fonte para tabuleiro e vitória.
 * Os índices dos frutos continuam iguais aos do motor e dos saves existentes.
 */
export const FRUIT_LABELS = Object.freeze([
  "castanha-do-pará", "pitanga", "jabuticaba",
]);

const SHAPES = Object.freeze([
  "<g transform=\"rotate(35 50 50)\"><path d=\"M48 12C36 14 29 35 30 54C31 70 40 83 52 86C60 80 68 66 69 50C71 31 61 14 48 12Z\" fill=\"#EED7A5\" stroke=\"#80613F\" stroke-width=\"2.5\"/><path d=\"M48 12C39 14 33 24 31 36L38 33L36 27L43 29L43 22L49 24L54 20L61 24C57 17 53 13 48 12Z\" fill=\"#A46B42\"/><path d=\"M68 43L62 48L64 55L59 58L61 65L55 67L57 73L49 76L47 84L52 86C60 80 68 65 69 50Z\" fill=\"#A46B42\"/><path d=\"M37 43L40 38M40 67L43 71\" fill=\"none\" stroke=\"#C4A074\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></g>",
  "<g fill=\"#DE8C78\" stroke=\"#A85C4C\" stroke-width=\"2\"><ellipse cx=\"29\" cy=\"48\" rx=\"12\" ry=\"20\"/><ellipse cx=\"71\" cy=\"48\" rx=\"12\" ry=\"20\"/><ellipse cx=\"39\" cy=\"47\" rx=\"13\" ry=\"23\"/><ellipse cx=\"61\" cy=\"47\" rx=\"13\" ry=\"23\"/><ellipse cx=\"50\" cy=\"47\" rx=\"13\" ry=\"25\"/></g><path d=\"M39 24Q50 15 61 24M51 21L56 11\" fill=\"none\" stroke=\"#39674A\" stroke-width=\"4\" stroke-linecap=\"round\"/>",
  "<circle cx=\"50\" cy=\"48\" r=\"28\" fill=\"#776487\" stroke=\"#574663\" stroke-width=\"3\"/><ellipse cx=\"41\" cy=\"37\" rx=\"7\" ry=\"5\" fill=\"#B0A1B9\"/><path d=\"M40 22L50 14L60 22\" fill=\"none\" stroke=\"#39674A\" stroke-width=\"4\" stroke-linecap=\"round\"/>",
]);

const BASKET = "<ellipse cx=\"50\" cy=\"76\" rx=\"39\" ry=\"17\" fill=\"#E7D6AF\" stroke=\"#A39775\" stroke-width=\"3\"/><path d=\"M13 70Q50 99 87 70\" fill=\"none\" stroke=\"#BCA577\" stroke-width=\"3\"/>";

export function renderFruitArt(fruit, basket = false, victory = false) {
  const className = victory ? "vva-quinhao-fruit" : "quinhao-fruit";
  // O nome acessível pertence ao controle/contador que contém a imagem.
  return `<svg class="${className}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${basket ? BASKET : ""}${SHAPES[fruit] ?? ""}</svg>`;
}
