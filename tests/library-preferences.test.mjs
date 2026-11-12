import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeLibraryPreferences, readLibraryPreferences, saveLibraryPreferences, recordRecentGame, filterLibraryGames } from '../dist/library-preferences.mjs';
import { normalizeInterfaceSize } from '../dist/preferences-dialog.mjs';
const allowed=['pulso','refugio','cerco'];
test('remove jogos retirados e duplicados sem tocar saves',()=>{
 assert.deepEqual(normalizeLibraryPreferences({favorites:['pulso','pulso','divisa'],recent:['orbita','cerco']},allowed),{favorites:['pulso'],recent:['cerco']});
});
test('JSON inválido e storage bloqueado mantêm preferências em memória',()=>{
 assert.deepEqual(readLibraryPreferences({getItem(){throw Error();}},allowed),{favorites:[],recent:[]});
 assert.deepEqual(saveLibraryPreferences({setItem(){throw Error();}},{favorites:['pulso'],recent:[]},allowed).favorites,['pulso']);
});
test('recentes não duplicam jogos nem descartam favoritos',()=>{
 const value=recordRecentGame({favorites:['pulso'],recent:['cerco','pulso']},'pulso',allowed);
 assert.deepEqual(value,{favorites:['pulso'],recent:['pulso','cerco']});
 assert.deepEqual(filterLibraryGames(allowed,'recent',value),['pulso','cerco']);
 assert.deepEqual(filterLibraryGames(allowed,'favorites',value),['pulso']);
});
test('tamanho inválido usa padrão',()=>{
 assert.equal(normalizeInterfaceSize('large'),'large');assert.equal(normalizeInterfaceSize('huge'),'standard');
});
