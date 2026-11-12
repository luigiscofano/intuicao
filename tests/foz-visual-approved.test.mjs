import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import { CAMPAIGN, initialState, solutionState, renderBoard } from '../dist/logica/games/foz/index.mjs';
const root=new URL('../',import.meta.url);
const read=path=>readFileSync(new URL(path,root),'utf8');
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
// Main após a integração de #54–62, com os PNGs transparentes preservados.
const base='b34690d870b714280f742142413a64d9d7e0387e';
// Contrato histórico FOZ; o viewport protege a distribuição atual.
const fozRelease='24ea87b22d22947456e14c67b8b727ed27820f30';
const allowed=['dist/logica/games/foz/view.mjs','dist/approved-game-shell.mjs','dist/approved-game-shell.css','dist/platform-assets/foz-aiij-mosaico.png','dist/platform-assets/foz-aiij-mosaico.svg'];

test('FOZ preserva toda a distribuição fora das cinco alterações visuais aprovadas',()=>{
 assert.equal(git('diff','--name-only',base,fozRelease,'--','dist',...allowed.map(p=>':(exclude)'+p)),'');
 assert.deepEqual(git('diff','--name-only','--diff-filter=A',base,fozRelease,'--','dist').trim().split('\n').filter(Boolean).filter(p=>!allowed.includes(p)),[]);
});
test('só os canais mudam no renderizador; peças, pinos, texto e áreas de interação são idênticos',()=>{
 const previous=git('show',`${base}:dist/logica/games/foz/view.mjs`);
 const line='parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${C.frame}" stroke-width="3"/>`);';
 const water='parts.push(`<g class="foz-water-channel" aria-hidden="true"><path d="M${ax} ${ay}L${bx} ${by}" fill="none" stroke="#9cb5b3" stroke-width="17" stroke-linecap="round"/><path d="M${ax} ${ay}L${bx} ${by}" fill="none" stroke="#d5e3df" stroke-width="14" stroke-linecap="round"/></g>`);';
 assert.equal(read('dist/logica/games/foz/view.mjs'),previous.replace(line,water));
});
test('80 fases em dois estados mantêm canais, casas, foz fixa e estado sem traços brancos',()=>{
 for(const level of CAMPAIGN)for(const state of [initialState(level),solutionState(level)]){
  const snapshot=JSON.stringify(state),html=renderBoard(level,state);
  const groups=[...html.matchAll(/<g class="foz-water-channel"[^>]*>(.*?)<\/g>/g)];
  assert.equal(groups.length,level.channels.length);
  for(const [,channel] of groups){assert.equal((channel.match(/<path/g)||[]).length,2);assert.doesNotMatch(channel,/#fff|#FFF/);}
  assert.equal((html.match(/data-cell=/g)||[]).length,level.width*level.height);
  assert.equal((html.match(/aria-disabled="true"/g)||[]).length,1);
  assert.equal(JSON.stringify(state),snapshot); assert.doesNotMatch(html,/<image|fauna/);
 }
});
test('AIIJ usa o PNG aprovado sem alterar as larguras responsivas da identidade atual',()=>{
 // AIIJ RENOVO posterior é protegida por renovo-scope.test.mjs.
 const css=git('show',`${fozRelease}:dist/approved-game-shell.css`),mjs=git('show',`${fozRelease}:dist/approved-game-shell.mjs`);
 assert.match(mjs,/tiles\.classList\.toggle\("approved-tiles--foz", game === "foz"\)/);
 assert.equal(mjs.replace('      // AIIJ aprovada do FOZ: só a arte muda; outras rotas mantêm o mosaico.\n      tiles.classList.toggle("approved-tiles--foz", game === "foz");\n',''),git('show',`${base}:dist/approved-game-shell.mjs`));
 assert.equal(css.slice(0,css.indexOf('\n/* FOZ · AIIJ 3 aprovada.')),git('show',`${base}:dist/approved-game-shell.css`));
 const added=css.slice(css.indexOf('/* FOZ · AIIJ 3 aprovada.'));
 assert.match(added,/aspect-ratio: 304 \/ 148\.5/);assert.match(added,/foz-aiij-mosaico\.png/);assert.doesNotMatch(added,/\bwidth:|\bheight:|font|padding|margin/);
});
test('PNG 3 mantém hash aprovado e pixels realmente transparentes, sem animais nem fundo',()=>{
 const png=readFileSync(new URL('dist/platform-assets/foz-aiij-mosaico.png',root));
 assert.equal(createHash('sha256').update(png).digest('hex'),'2c91dd8942dbb459a36f4a2b9fa40d2894c661efc8045da8434d4e2875cff86a');
 assert.equal(png.subarray(1,4).toString(),'PNG');
 const w=png.readUInt32BE(16),h=png.readUInt32BE(20);assert.deepEqual([w,h,png[24],png[25]],[1216,594,8,6]);
 let chunks=[];for(let p=8;p<png.length;){const len=png.readUInt32BE(p),kind=png.toString('ascii',p+4,p+8);if(kind==='IDAT')chunks.push(png.subarray(p+8,p+8+len));p+=12+len;}
 const raw=inflateSync(Buffer.concat(chunks)),stride=w*4,decoded=Buffer.alloc(stride*h);let offset=0,transparent=0;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<h;y++){const type=raw[offset++];for(let x=0;x<stride;x++){const at=y*stride+x,a=x>=4?decoded[at-4]:0,b=y?decoded[at-stride]:0,c=y&&x>=4?decoded[at-stride-4]:0;decoded[at]=(raw[offset++]+([0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][type]))&255;if(x%4===3&&decoded[at]===0)transparent++;}}
 assert.ok(transparent/(w*h)>.7);for(const [x,y]of[[0,0],[w-1,0],[0,h-1],[w-1,h-1]])assert.equal(decoded[(y*w+x)*4+3],0);
 assert.doesNotMatch(read('dist/platform-assets/foz-aiij-mosaico.svg'),/<image|fauna|#fff|background/i);
});
