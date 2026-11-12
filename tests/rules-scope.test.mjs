import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const git = args => execFileSync('git', args, {cwd:new URL('../',import.meta.url),encoding:'utf8'});
// Árvore de PR58/v201: referência independente da identidade do commit local.
const base='34ca285ba6812a9dc15e23daf8caf2131af399c8';
const allowed=['rules-examples.css','rules-examples.mjs','rules-preview.css','rules-preview.mjs','rules-logic-examples.mjs','rules-versus-examples.mjs','logica/ui.mjs','versus/ui.mjs'].map(p=>'dist/'+p);
test('retirar o controle de pausa preserva toda a distribuição restante de v202',()=>{
 const v202='be8b58d9efbc05f553f5fd72a1f4cb527ecc6894';
 assert.equal(git(['diff','--name-only',v202,'--','dist',':(exclude)dist/rules-preview.css',':(exclude)dist/rules-preview.mjs']),'');
});
test('25 cartões não alteram motores, saves, campanhas, arte ou demais superfícies',()=>{
 assert.equal(git(['diff','--name-only',base,'--','dist',...allowed.map(p=>':(exclude)'+p)]),'');
 const normalize=source=>source.replace("import { rulesPreviewMarkup } from '../rules-preview.mjs';\n",'')
  .replace(/  function rulesMarkup\(\) \{[^]*?\n  \}/,'')
  .replaceAll('${rulesMarkup()}','');
 for(const file of ['logica/ui.mjs','versus/ui.mjs']){
  const previous=git(['show',base+':dist/'+file]);
  const current=readFileSync(new URL('../dist/'+file,import.meta.url),'utf8');
  // Remove apenas a linha vazia deixada ao mover o mesmo cartão de ajuda.
  assert.equal(normalize(current).replace(/\n[ \t]*\n/g,'\n'),normalize(previous).replace(/\n[ \t]*\n/g,'\n'),file);
 }
});
test('textos e geometrias dos onze exemplos existentes permanecem idênticos',async()=>{
 const source=git(['show',base+':dist/rules-examples.mjs']);
 const prior=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 const {RULE_EXAMPLES}=await import('../dist/rules-examples.mjs');
 assert.equal(Object.keys(prior.RULE_EXAMPLES).length,11);
 for(const [game,example] of Object.entries(prior.RULE_EXAMPLES)) assert.deepEqual(RULE_EXAMPLES[game],example,game);
});
