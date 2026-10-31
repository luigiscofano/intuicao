import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const BASELINE='dd0cf6a77232bcc755f1d250934b9f038c7a4e3b';
const root=new URL('../',import.meta.url),file='dist/footer-transition.css';
const css=readFileSync(new URL('../'+file,import.meta.url),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
const normalized=s=>s.replace(/\s+/g,'').replaceAll('"',"'");
const rule=selector=>{const match=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(m=>normalized(m[1])===normalized(selector));assert(match,'Regra ausente: '+selector);return normalized(match[2]);};
const has=(body,decl)=>assert(body.includes(normalized(decl)),decl);
test('contorno único e incondicional liga o rodapé ao chão com os assets originais',()=>{
 const before=rule('body > footer::before'),footer=rule('body > footer');
 assert.equal([...css.matchAll(/body\s*>\s*footer::before\s*\{/g)].length,1);
 assert(!css.includes(':has('));
 for(const decl of ['top:14px!important','bottom:calc(-1 * var(--footer-floor))!important','clip-path:none!important','mask:none!important','pointer-events:none'])has(before,decl);
 assert(before.includes('continuous-root-left.svg'));assert(before.includes('continuous-root-right.svg'));
 for(const decl of ['margin-top:24px!important','--footer-floor:112px','background:transparent!important'])has(footer,decl);
 const media=normalized(css.slice(css.indexOf('@media')));
 assert(media.includes('@media(max-width:760px)'));
 for(const decl of ['--footer-floor:84px','margin-top:20px!important'])has(media,decl);
});
test('tampa arredondada e painéis fechados não duplicam nem mascaram as raízes',()=>{
 const cap=rule('body > footer .footer-signature::before');
 for(const decl of ['top:0','height:15px','border:1px solid #b3c1a8','border-bottom:0','border-radius:14px 14px 0 0'])has(cap,decl);
 has(rule('body > footer .footer-signature::after'),'content:none!important');
 assert(!cap.includes('mask:'));assert(!cap.includes('clip-path:'));
 const rules=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
 const closing=rules.find(m=>m[2].includes('border-bottom-left-radius'));
 assert(closing);
 for(const decl of ['border-bottom-color:#b3c1a8!important','border-bottom-left-radius:19px!important','border-bottom-right-radius:19px!important','margin-bottom:0!important'])has(normalized(closing[2]),decl);
 for(const id of ['#selection','#main','#collection','#sintonia','#repasse','#orbita','#broto','#cerco','#vertice'])assert(closing[1].includes(id),id);
 const retired=rules.find(m=>m[1].includes('#selection')&&m[1].includes('::after'));
 assert(retired);has(normalized(retired[2]),'content:none!important');
 for(const id of ['#broto','#cerco','#vertice'])assert(retired[1].includes(id),id);
});
test('todos os outros arquivos publicados permanecem idênticos, incluindo vitórias, fauna e motores',()=>{
 const git=(...args)=>execFileSync('git',args,{cwd:root,maxBuffer:32*1024*1024});
 const files=git('ls-tree','-r','--name-only',BASELINE,'dist').toString().trim().split('\n');
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');let checked=0;
 for(const path of files){if(path===file)continue;assert.equal(hash(readFileSync(new URL('../'+path,import.meta.url))),hash(git('show',BASELINE+':'+path)),path);checked++;}
 assert(checked>100);
 const current=git('ls-files','--cached','--others','--exclude-standard','dist').toString().trim().split('\n');
 assert.deepEqual([...new Set(current)].sort(),[...files].sort(),'Nenhum arquivo extra de produção é necessário ao conserto.');
});
