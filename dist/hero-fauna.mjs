// Center the original icon group in the actual free space after the headline.
const intro=document.querySelector('#main > .intro');
const gallery=intro?.querySelector('.hero-fauna');
const headline=intro?.querySelector('h1');
const desktop=matchMedia('(min-width:1101px)');
if(intro&&gallery&&headline){
 const align=()=>{
  if(!desktop.matches){gallery.style.removeProperty('left');gallery.style.removeProperty('right');return;}
  const bounds=intro.getBoundingClientRect();
  const textRange=document.createRange();textRange.selectNodeContents(headline);
  const textRight=Math.max(...Array.from(textRange.getClientRects(),r=>r.right));
  const panelInset=parseFloat(getComputedStyle(intro,'::before').right)||0;
  const panelRight=bounds.right-panelInset;
  const width=gallery.getBoundingClientRect().width;
  const ideal=(textRight+panelRight-width)/2;
  gallery.style.left=`${Math.max(textRight+20,ideal)-bounds.left}px`;
  gallery.style.right='auto';
 };
 new ResizeObserver(align).observe(intro);
 desktop.addEventListener('change',align);
 document.fonts.ready.then(align);
 align();
}
