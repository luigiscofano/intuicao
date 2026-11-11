// Harness de desenvolvimento: mede a interface real em um iframe redimensionável.
// Não lê nem altera progresso persistido e não participa da publicação.
const frame = document.getElementById('site');
const output = document.getElementById('results');
const index = new URL('../../dist/index.html', import.meta.url);
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const sizes = [320, 375, 390, 768, 1280];
const routes = ['', '?category=intuicao', '?category=logica', '?category=versus',
  '?screen=achievements', '?game=light', '?game=lastro'];

async function load(width, route) {
  frame.style.width = `${width}px`;
  await new Promise(resolve => {
    frame.onload = resolve;
    frame.src = `${index}${route}`;
  });
  await pause(250);
  frame.contentWindow.scrollTo(0, frame.contentDocument.body.scrollHeight);
  await pause(50);
}

function measure(width, route) {
  const doc = frame.contentDocument;
  const win = frame.contentWindow;
  const footer = doc.querySelector('body>footer');
  const bounds = footer.getBoundingClientRect();
  const style = win.getComputedStyle(footer);
  const motif = win.getComputedStyle(footer, '::after');
  const failures = [];
  if (Math.abs(parseFloat(motif.left) - footer.clientWidth / 2) > .6) failures.push('centro');
  if (motif.width !== '100px' || motif.height !== '18px') failures.push('dimensões');
  if (motif.transform !== 'matrix(1, 0, 0, 1, -50, 0)') failures.push('translação');
  if (motif.opacity !== '1' || motif.backgroundColor !== 'rgb(244, 237, 221)') failures.push('fundo opaco');
  if ((motif.backgroundImage.match(/radial-gradient/g) || []).length !== 4) failures.push('quatro peças');
  if (motif.backgroundSize.split(', ').some(size => size !== '16px 16px')) failures.push('peças quadradas');
  if (motif.backgroundRepeat.split(', ').some(value => value !== 'no-repeat')) failures.push('repetição');
  if (motif.backgroundPosition !== '12px 1px, 32px 1px, 52px 1px, 72px 1px') failures.push('respiro');
  if (motif.pointerEvents !== 'none') failures.push('intercepta eventos');
  if (style.borderTopColor !== 'rgb(200, 204, 184)') failures.push('cor da divisória');
  if (doc.documentElement.scrollWidth > win.innerWidth) failures.push('overflow horizontal');
  if (bounds.width < 100 || bounds.x < -.5) failures.push('corte');
  if (!doc.querySelector('footer .brand-image[src="platform-assets/intuicao-logo-original.png"]')) failures.push('marca alterada');
  return {width, route: route || 'início', pass: !failures.length, failures,
    footerWidth: bounds.width, center: parseFloat(motif.left), motifWidth: motif.width,
    viewport: win.innerWidth, documentWidth: doc.documentElement.scrollWidth};
}

document.getElementById('open').onclick = async () => {
  const width = Number(document.getElementById('width').value);
  const route = document.getElementById('route').value;
  await load(width, route);
  output.textContent = JSON.stringify(measure(width, route), null, 2);
};
document.getElementById('run').onclick = async () => {
  const results = [];
  for (const width of sizes) {
    for (const route of routes) {
      await load(width, route);
      results.push(measure(width, route));
      output.textContent = JSON.stringify({done:false,count:results.length,failures:results.filter(r=>!r.pass)});
    }
  }
  await load(390, '?category=versus');
  output.textContent = JSON.stringify({done:true,count:results.length,failures:results.filter(r=>!r.pass),results}, null, 2);
};
