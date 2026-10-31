import {FAUNA_CULTURE} from './fauna-culture-content.mjs';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Curiosidades documentadas, sem letras de músicas ou alteração das artes.
export function faunaCultureMarkup(id){
 const entry=FAUNA_CULTURE[id];if(!entry)throw new Error('Curiosidade cultural ausente.');
 const links=entry.sources.map(source=>{const url=new URL(source.url);if(!['https:','http:'].includes(url.protocol))throw new Error('Fonte cultural inválida.');return `<a href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a>`;});
 return `<section class="fauna-culture" data-culture-animal="${esc(id)}" aria-labelledby="fauna-culture-title"><h3 id="fauna-culture-title">Curiosidade cultural</h3>${entry.paragraphs.length>1?`<ul class="fauna-culture-topics">${entry.paragraphs.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`:entry.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="fauna-culture-sources">Saiba mais: ${links.join(' · ')}.</p></section>`;
}
