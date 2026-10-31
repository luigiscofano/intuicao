import assert from 'node:assert/strict';import{execFileSync}from'node:child_process';import{readFileSync}from'node:fs';import{RULE_EXAMPLES}from'../dist/rules-examples.mjs';
const base='553bb89074a345dee6567225e0f213148c7d23a3';
const oldSource=execFileSync('git',['show',base+':dist/rules-examples.mjs'],{encoding:'utf8'});
const previous=await import('data:text/javascript;base64,'+Buffer.from(oldSource).toString('base64'));
for(const key of Object.keys(RULE_EXAMPLES)){const expected=key==='light'?previous.RULE_EXAMPLES[key].svg.replace('L112 43','L112 53').replace('cx="112" cy="30"','cx="112" cy="40"').replace('x="112" y="34"','x="112" y="44"'):previous.RULE_EXAMPLES[key].svg;assert.equal(RULE_EXAMPLES[key].svg,expected,key+' visual unchanged except authorized Reflexos target spacing');assert.equal(RULE_EXAMPLES[key].steps.length,3);assert.ok(RULE_EXAMPLES[key].steps.join('').length<=500);}
for(const name of ['rules-examples.css','rules-preview.css'])assert.equal(readFileSync('dist/'+name,'utf8'),execFileSync('git',['show',base+':dist/'+name],{encoding:'utf8'}));
console.log('PASS exact9SVGs and animation CSS preserved; only moderate rule-copy expansion');
