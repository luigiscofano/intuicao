// Desenho do mapa didático de ocorrência e dos créditos cartográficos.
// Contorno Natural Earth 1:110m, domínio público; coordenadas originais preservadas.
// As ocorrências são esquemas editoriais aproximados, fornecidos separadamente com fontes.
export const BRAZIL_MAP_SOURCE = Object.freeze({
  label: 'Natural Earth · contorno do Brasil',
  url: 'https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/',
  dataUrl:
    'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  licenseUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
});
export const BRAZIL_OUTLINE = [
  [-53.373662, -33.768378],
  [-53.650544, -33.202004],
  [-53.209589, -32.727666],
  [-53.787952, -32.047243],
  [-54.572452, -31.494511],
  [-55.60151, -30.853879],
  [-55.973245, -30.883076],
  [-56.976026, -30.109686],
  [-57.625133, -30.216295],
  [-56.2909, -28.852761],
  [-55.162286, -27.881915],
  [-54.490725, -27.474757],
  [-53.648735, -26.923473],
  [-53.628349, -26.124865],
  [-54.13005, -25.547639],
  [-54.625291, -25.739255],
  [-54.428946, -25.162185],
  [-54.293476, -24.5708],
  [-54.29296, -24.021014],
  [-54.652834, -23.839578],
  [-55.027902, -24.001274],
  [-55.400747, -23.956935],
  [-55.517639, -23.571998],
  [-55.610683, -22.655619],
  [-55.797958, -22.35693],
  [-56.473317, -22.0863],
  [-56.88151, -22.282154],
  [-57.937156, -22.090176],
  [-57.870674, -20.732688],
  [-58.166392, -20.176701],
  [-57.853802, -19.969995],
  [-57.949997, -19.400004],
  [-57.676009, -18.96184],
  [-57.498371, -18.174188],
  [-57.734558, -17.552468],
  [-58.280804, -17.27171],
  [-58.388058, -16.877109],
  [-58.24122, -16.299573],
  [-60.15839, -16.258284],
  [-60.542966, -15.09391],
  [-60.251149, -15.077219],
  [-60.264326, -14.645979],
  [-60.459198, -14.354007],
  [-60.503304, -13.775955],
  [-61.084121, -13.479384],
  [-61.713204, -13.489202],
  [-62.127081, -13.198781],
  [-62.80306, -13.000653],
  [-63.196499, -12.627033],
  [-64.316353, -12.461978],
  [-65.402281, -11.56627],
  [-65.321899, -10.895872],
  [-65.444837, -10.511451],
  [-65.338435, -9.761988],
  [-66.646908, -9.931331],
  [-67.173801, -10.306812],
  [-68.048192, -10.712059],
  [-68.271254, -11.014521],
  [-68.786158, -11.03638],
  [-69.529678, -10.951734],
  [-70.093752, -11.123972],
  [-70.548686, -11.009147],
  [-70.481894, -9.490118],
  [-71.302412, -10.079436],
  [-72.184891, -10.053598],
  [-72.563033, -9.520194],
  [-73.226713, -9.462213],
  [-73.015383, -9.032833],
  [-73.571059, -8.424447],
  [-73.987235, -7.52383],
  [-73.723401, -7.340999],
  [-73.724487, -6.918595],
  [-73.120027, -6.629931],
  [-73.219711, -6.089189],
  [-72.964507, -5.741251],
  [-72.891928, -5.274561],
  [-71.748406, -4.593983],
  [-70.928843, -4.401591],
  [-70.794769, -4.251265],
  [-69.893635, -4.298187],
  [-69.444102, -1.556287],
  [-69.420486, -1.122619],
  [-69.577065, -0.549992],
  [-70.020656, -0.185156],
  [-70.015566, 0.541414],
  [-69.452396, 0.706159],
  [-69.252434, 0.602651],
  [-69.218638, 0.985677],
  [-69.804597, 1.089081],
  [-69.816973, 1.714805],
  [-67.868565, 1.692455],
  [-67.53781, 2.037163],
  [-67.259998, 1.719999],
  [-67.065048, 1.130112],
  [-66.876326, 1.253361],
  [-66.325765, 0.724452],
  [-65.548267, 0.789254],
  [-65.354713, 1.095282],
  [-64.611012, 1.328731],
  [-64.199306, 1.492855],
  [-64.083085, 1.916369],
  [-63.368788, 2.2009],
  [-63.422867, 2.411068],
  [-64.269999, 2.497006],
  [-64.408828, 3.126786],
  [-64.368494, 3.79721],
  [-64.816064, 4.056445],
  [-64.628659, 4.148481],
  [-63.888343, 4.02053],
  [-63.093198, 3.770571],
  [-62.804533, 4.006965],
  [-62.08543, 4.162124],
  [-60.966893, 4.536468],
  [-60.601179, 4.918098],
  [-60.733574, 5.200277],
  [-60.213683, 5.244486],
  [-59.980959, 5.014061],
  [-60.111002, 4.574967],
  [-59.767406, 4.423503],
  [-59.53804, 3.958803],
  [-59.815413, 3.606499],
  [-59.974525, 2.755233],
  [-59.718546, 2.24963],
  [-59.646044, 1.786894],
  [-59.030862, 1.317698],
  [-58.540013, 1.268088],
  [-58.429477, 1.463942],
  [-58.11345, 1.507195],
  [-57.660971, 1.682585],
  [-57.335823, 1.948538],
  [-56.782704, 1.863711],
  [-56.539386, 1.899523],
  [-55.995698, 1.817667],
  [-55.9056, 2.021996],
  [-56.073342, 2.220795],
  [-55.973322, 2.510364],
  [-55.569755, 2.421506],
  [-55.097587, 2.523748],
  [-54.524754, 2.311849],
  [-54.088063, 2.105557],
  [-53.778521, 2.376703],
  [-53.554839, 2.334897],
  [-53.418465, 2.053389],
  [-52.939657, 2.124858],
  [-52.556425, 2.504705],
  [-52.249338, 3.241094],
  [-51.657797, 4.156232],
  [-51.317146, 4.203491],
  [-51.069771, 3.650398],
  [-50.508875, 1.901564],
  [-49.974076, 1.736483],
  [-49.947101, 1.04619],
  [-50.699251, 0.222984],
  [-50.388211, -0.078445],
  [-48.620567, -0.235489],
  [-48.584497, -1.237805],
  [-47.824956, -0.581618],
  [-46.566584, -0.941028],
  [-44.905703, -1.55174],
  [-44.417619, -2.13775],
  [-44.581589, -2.691308],
  [-43.418791, -2.38311],
  [-41.472657, -2.912018],
  [-39.978665, -2.873054],
  [-38.500383, -3.700652],
  [-37.223252, -4.820946],
  [-36.452937, -5.109404],
  [-35.597796, -5.149504],
  [-35.235389, -5.464937],
  [-34.89603, -6.738193],
  [-34.729993, -7.343221],
  [-35.128212, -8.996401],
  [-35.636967, -9.649282],
  [-37.046519, -11.040721],
  [-37.683612, -12.171195],
  [-38.423877, -13.038119],
  [-38.673887, -13.057652],
  [-38.953276, -13.79337],
  [-38.882298, -15.667054],
  [-39.161092, -17.208407],
  [-39.267339, -17.867746],
  [-39.583521, -18.262296],
  [-39.760823, -19.599113],
  [-40.774741, -20.904512],
  [-40.944756, -21.937317],
  [-41.754164, -22.370676],
  [-41.988284, -22.97007],
  [-43.074704, -22.967693],
  [-44.647812, -23.351959],
  [-45.352136, -23.796842],
  [-46.472093, -24.088969],
  [-47.648972, -24.885199],
  [-48.495458, -25.877025],
  [-48.641005, -26.623698],
  [-48.474736, -27.175912],
  [-48.66152, -28.186135],
  [-48.888457, -28.674115],
  [-49.587329, -29.224469],
  [-50.696874, -30.984465],
  [-51.576226, -31.777698],
  [-52.256081, -32.24537],
  [-52.7121, -33.196578],
  [-53.373662, -33.768378],
];
const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const minLon = -73.987235,
  maxLon = -34.729993,
  minLat = -33.768378,
  maxLat = 5.244486;
const cos = Math.cos((15 * Math.PI) / 180),
  scale = 284 / Math.max((maxLon - minLon) * cos, maxLat - minLat);
const mapW = (maxLon - minLon) * cos * scale,
  mapH = (maxLat - minLat) * scale;
export function projectBrazilPoint(point) {
  if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite))
    throw new TypeError('Coordenada inválida.');
  const [lon, lat] = point;
  if (lon < -180 || lon > 180 || lat < -90 || lat > 90)
    throw new RangeError('Coordenada fora do globo.');
  return [
    (320 - mapW) / 2 + (lon - minLon) * cos * scale,
    (320 - mapH) / 2 + (maxLat - lat) * scale,
  ];
}
const fmt = (n) => Number(n.toFixed(3));
export function brazilPolygonPath(points) {
  if (!Array.isArray(points) || points.length < 3)
    throw new TypeError('Polígono precisa de três pontos.');
  return (
    points
      .map((p, i) => {
        const [x, y] = projectBrazilPoint(p);
        return `${i ? 'L' : 'M'}${fmt(x)},${fmt(y)}`;
      })
      .join('') + 'Z'
  );
}
export const BRAZIL_OUTLINE_PATH = brazilPolygonPath(BRAZIL_OUTLINE);
let sequence = 0;
/** Polygons: lista de anéis [[longitude,latitude],...], não fronteiras científicas precisas.
 * Locator opcional: {point:[lon,lat],label}, um círculo vazio de localização, nunca uma área adicional.
 */
export function faunaRangeMapMarkup({
  id,
  name,
  polygons,
  description,
  note = '',
  sources = [],
  locator = null,
} = {}) {
  if (
    !id ||
    !name ||
    !description ||
    !Array.isArray(polygons) ||
    !polygons.length ||
    !sources.length
  )
    throw new TypeError('Mapa exige identificação, descrição, áreas e fontes.');
  const uid = `fauna-range-${String(id).replace(/[^a-zA-Z0-9_-]/g, '-')}-${++sequence}`,
    country = `${uid}-country`,
    hatch = `${uid}-hatch`,
    title = `${uid}-title`,
    desc = `${uid}-desc`;
  const paths = polygons.map(brazilPolygonPath).join('');
  const links = sources.map((source) => {
    let url;
    try {
      url = new URL(source.url);
    } catch {
      throw new TypeError('Fonte inválida.');
    }
    if (!['https:', 'http:'].includes(url.protocol))
      throw new TypeError('Fonte precisa de URL pública.');
    return `<a href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(source.label || url.hostname)}</a>`;
  });
  let marker = '';
  if (locator) {
    const [x, y] = projectBrazilPoint(locator.point);
    marker = `<g class="fauna-range-locator"><circle cx="${fmt(x)}" cy="${fmt(y)}" r="6" fill="none" stroke="#2d593c" stroke-width="1.5" stroke-dasharray="2 2"/><title>${esc(locator.label || 'Localização de área restrita')}</title></g>`;
  }
  const explanation = `${description} Áreas hachuradas aproximadas; não indicam presença contínua nem ocorrência em todo habitat dentro da região.${note ? ' ' + note : ''}`;
  return `<figure class="fauna-range-map" data-range-animal="${esc(id)}"><svg class="fauna-range-svg" viewBox="0 0 320 320" width="320" height="320" role="img" aria-labelledby="${title} ${desc}" focusable="false" style="display:block;width:100%;max-width:280px;height:auto;margin-inline:auto"><title id="${title}">${esc(name)}: ocorrência aproximada no Brasil</title><desc id="${desc}">${esc(explanation)}</desc><defs><clipPath id="${country}"><path d="${BRAZIL_OUTLINE_PATH}"/></clipPath><pattern id="${hatch}" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#dce9ce"/><path d="M-2 2L2-2M0 7L7 0M5 9L9 5" stroke="#4d7146" stroke-width="1.25"/></pattern></defs><path class="fauna-range-country" d="${BRAZIL_OUTLINE_PATH}" fill="#f1f3ed" stroke="#9caa93" stroke-width="1.5" stroke-linejoin="round"/><g clip-path="url(#${country})"><path class="fauna-range-area" d="${paths}" fill="url(#${hatch})" fill-rule="nonzero"/></g><path d="${BRAZIL_OUTLINE_PATH}" fill="none" stroke="#687e5d" stroke-width="1.25" stroke-linejoin="round"/>${marker}<text x="289" y="27" font-size="11" font-family="system-ui,sans-serif" fill="#50644a" text-anchor="middle" aria-hidden="true">N</text><path d="M289 46V31m-3 5 3-5 3 5" fill="none" stroke="#50644a" stroke-width="1.2" aria-hidden="true"/></svg><figcaption><strong class="fauna-range-legend"><span aria-hidden="true" style="display:inline-block;width:18px;height:12px;margin-right:6px;border:1px solid #4d7146;background:repeating-linear-gradient(135deg,#dce9ce 0 4px,#4d7146 4px 5px)"></span>Ocorrência aproximada no Brasil</strong><p class="fauna-range-description">${esc(description)}</p><p class="fauna-range-caveat">As hachuras indicam regiões aproximadas, não presença contínua em toda a área.${note ? ' ' + esc(note) : ''}${locator ? ' O círculo pontilhado apenas ajuda a localizar ' + esc(locator.label || 'a área restrita') + '; não amplia a ocorrência.' : ''}</p><p class="fauna-range-sources">Distribuição: ${links.join(' · ')}. Base cartográfica: <a href="${BRAZIL_MAP_SOURCE.url}" target="_blank" rel="noopener noreferrer">Natural Earth</a>.</p></figcaption></figure>`;
}
