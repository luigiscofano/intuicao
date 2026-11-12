import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const root=new URL('../',import.meta.url);
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
// Preserva o contrato histórico de PR60; o novo escopo está em campaign-progress-scope.test.mjs.
const presentationRelease='909b9244568ff4af411753dd737b74ee589c6e4c';
const base='669fbe8b917bff01db99cb05582862b0818a5bb2';
const read=path=>readFileSync(new URL(path,root),'utf8');
const prior=path=>git('show',`${base}:${path}`);
const allowed=['index.html','app.mjs','collection-ui.mjs','logica/storage.mjs','logica/ui.mjs','daily-challenge.mjs','logica/endless.mjs','selection-presentation.mjs','selection-presentation.css'].map(p=>'dist/'+p);
test('apresentação unificada preserva toda a distribuição fora dos nove arquivos autorizados',()=>{
 assert.equal(git('diff','--name-only',base,presentationRelease,'--','dist',...allowed.map(p=>':(exclude)'+p)),'');
 const extras=git('ls-files','--others','--exclude-standard','--','dist').trim().split('\n').filter(Boolean);
 assert.deepEqual(extras.filter(p=>!allowed.includes(p)),[]);
});
test('index preserva integralmente os includes e conteúdo anteriores, exceto diário e camada de seleção',()=>{
 const stripped=read('dist/index.html')
  .replace('    <link rel="stylesheet" href="selection-presentation.css" />\n','')
  .replace('    <script type="module" src="selection-presentation.mjs"></script>\n','')
  .replace('          <button type="button" id="selection-daily">Desafio diário</button>\n','');
 assert.equal(stripped,prior('dist/index.html'));
});
test('Desvio somente oculta os dois controles solo, sem modificar regras ou mapas',()=>{
 assert.equal(read('dist/collection-ui.mjs').replaceAll(' ${game === "desvio" ? "hidden" : ""}',''),prior('dist/collection-ui.mjs'));
});
test('todos os exemplos, motores, campanhas, artes, demais saves e interfaces Versus ficam intactos',()=>{
 const protectedPaths=['dist/rules-examples.css','dist/rules-examples.mjs','dist/rules-preview.css','dist/rules-preview.mjs','dist/rules-logic-examples.mjs','dist/rules-versus-examples.mjs','dist/versus','dist/logica/games','dist/logica/campaigns','dist/logica/session.mjs','dist/progress-backup.mjs','dist/identity.css'];
 // O contrato da PR60 continua exato; FOZ verifica os arquivos atuais.
 assert.equal(git('diff','--name-only',base,presentationRelease,'--',...protectedPaths),'');
});
