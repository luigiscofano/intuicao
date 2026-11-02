// Testes e verificações de componentes compartilhados do Intuição.
import { restoreOriginalLogoHTML } from './original-logo-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root } from './direct-ui-harness.mjs';
const html = restoreOriginalLogoHTML(
  fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8'),
);
const css = fs.readFileSync(new URL('../dist/platform.css', import.meta.url), 'utf8');
const revision = JSON.parse(
  fs.readFileSync(new URL('./curiosity-brand-authorized-changes.json', import.meta.url)),
);
for (const { before, after } of revision.html_changes) {
  assert.ok(!html.includes(before));
  assert.equal(html.split(after).length - 1, 1);
}
assert.ok(html.includes('<h1>A <em>curiosidade</em><br>é a primeira lição.</h1>'));
assert.ok(html.includes('<p>Brinque, experimente e descubra no seu ritmo.</p>'));
assert.ok(css.includes('#main > .intro h1 em{color:#405e49}'));
assert.ok(css.includes('text-decoration:underline;text-decoration-color:#a6b49b'));
root.innerHTML = html;
assert.equal(root.querySelectorAll('.brand').length, 2, 'Only the two existing brand locations');
for (const tag of ['header', 'footer']) {
  const container = root.querySelector(tag),
    brand = container.querySelector('.brand');
  assert.ok(brand.querySelector('.brand-icon'));
  assert.ok(brand.querySelector('.brand-dot'));
  assert.ok(
    css.includes(
      `body > ${tag} .brand{display:inline-flex;align-items:center;color:#3b342e;font-family:Georgia,"Times New Roman",serif`,
    ),
    'Identity is unconditional, not menu-only',
  );
  assert.ok(css.includes(`body > ${tag} .brand-dot{color:#997838}`));
  assert.match(
    css.match(new RegExp(`body > ${tag} \\.brand-icon\\{[^}]*background:[^}]*\\}`))?.[0] ?? '',
    /platform-assets\/leaf-seal\.svg/,
  );
}
assert.ok(
  css.includes(
    'font-size:30px;font-style:italic;font-weight:700;letter-spacing:-1.7px;line-height:1.5}',
  ),
  'Original gameplay header line box retained',
);
assert.ok(html.includes('<small>feito para explorar</small>'));
assert.equal(root.querySelectorAll('.platform-leaf').length, 10);
const ids = root.nodes.filter((n) => n.id).map((n) => n.id);
assert.equal(ids.length, new Set(ids).size);
for (const n of root.nodes) {
  for (const key of ['aria-labelledby', 'aria-describedby', 'aria-controls', 'for'])
    for (const id of (n.attrs[key] ?? '').split(/\s+/).filter(Boolean))
      assert.ok(ids.includes(id), `${key}: ${id}`);
  if (n.attrs.href?.startsWith('#')) assert.ok(ids.includes(n.attrs.href.slice(1)));
}
console.log(
  'PASS exact new title and subtitle; green highlighted curiosity; two consistent brand locations with unconditional serif identity, gold dot and botanical seal; header line box retained; DOM ID references and ornamental layer intact. Native browser QA remains separate.',
);
