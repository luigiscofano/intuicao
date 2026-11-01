import test from'node:test';import assert from'node:assert/strict';import{execFileSync}from'node:child_process';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const base='187bc9150d18eeead7693149f4caf06c16a2d22d',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim();
test('somente os dois PNGs do interruptor mudam em produção',()=>{for(const line of git('ls-tree','-r',base,'--','dist').split('\n')){const[m,p]=line.split('\t');if(/assets\/accessories\/switch-[01]\.png$/.test(p))continue;assert.equal(git('hash-object',p),m.split(' ')[2],p);}});
