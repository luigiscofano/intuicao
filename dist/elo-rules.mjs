/** ELO: pure rule-based verification and bounded search. No answer data is read.
 * Cells and regions are zero-based. A cut at index i is between i and i+1.
 * A passage is an empty cell crossed by the strict interior of a segment.
 * Forbidden unit edges forbid traversal, NEVER change automatic visibility.
 * X marks are annotations and are deliberately ignored by every function here.
 */
const stateArray = state => Array.isArray(state) ? state : state?.positions || [];
const coordinate = (l,c) => `L${Math.floor(c/l.cols)+1}C${c%l.cols+1}`;
const issue = (code,message,cells=[],premises) => ({code,message,cells,...(premises?{premises}:{})});
const validCell = (l,c) => Number.isInteger(c)&&c>=0&&c<l.rows*l.cols;
const validRegion = r => Number.isInteger(r)&&r>=0;
const adjacent = (l,a,b) => validCell(l,a)&&validCell(l,b)&&(Math.abs(a-b)===l.cols||(Math.abs(a-b)===1&&Math.floor(a/l.cols)===Math.floor(b/l.cols)));
const direction = (l,a,b) => a===b?-1:Math.floor(a/l.cols)===Math.floor(b/l.cols)?(b>a?0:1):a%l.cols===b%l.cols?(b>a?2:3):-1;
const distance = (l,a,b) => Math.abs(a%l.cols-b%l.cols)+Math.abs(Math.floor(a/l.cols)-Math.floor(b/l.cols));
const inside = (l,c,a,b) => direction(l,a,c)>=0&&direction(l,a,c)===direction(l,a,b)&&direction(l,b,c)===direction(l,b,a);
const onSegment = (l,c,a,b) => c===a||c===b||inside(l,c,a,b);
const crossedCut = (l,a,b,cut) => {const p=cut.axis==='row'?Math.floor(a/l.cols):a%l.cols,q=cut.axis==='row'?Math.floor(b/l.cols):b%l.cols;return Math.min(p,q)<=cut.index&&Math.max(p,q)>cut.index;};
const numericEntries = object => Object.entries(object||{}).map(([key,value])=>[Number(key),value]);

export function eloPointAllowed(l,cell){
 return validCell(l,cell)&&validRegion(l.regions?.[cell])&&!(l.constraints?.passages||[]).includes(cell)&&!(l.constraints?.exclusivePassages||[]).some(group=>group?.cells?.includes(cell));
}
/** Same right/down first-visible-point scan as the classical engine. Region
 * boundaries, passages, forbidden intervals and annotations are not walls. */
export function eloEdges(l,positions){const edges=[];for(let a=0;a<positions.length;a++){const p=positions[a];if(p<0||!Number.isInteger(p))continue;for(const step of [1,l.cols])for(let q=p+step;q<l.rows*l.cols&&(step!==1||Math.floor(q/l.cols)===Math.floor(p/l.cols));q+=step){const b=positions.indexOf(q);if(b>=0){edges.push([a,b]);break;}}}return edges;}
export function eloCrossing(l,p,e,f){if(e.some(v=>f.includes(v)))return false;let[a,b]=e.map(v=>[p[v]%l.cols,Math.floor(p[v]/l.cols)]),[c,d]=f.map(v=>[p[v]%l.cols,Math.floor(p[v]/l.cols)]);if(a[1]!==b[1])[a,b,c,d]=[c,d,a,b];return a[1]===b[1]&&c[0]===d[0]&&Math.min(a[0],b[0])<c[0]&&c[0]<Math.max(a[0],b[0])&&Math.min(c[1],d[1])<a[1]&&a[1]<Math.max(c[1],d[1]);}
function compile(l){
 const n=l.rows*l.cols,regions=l.regions||[],k=regions.reduce((max,r)=>validRegion(r)?Math.max(max,r+1):max,0),c=l.constraints||{},errors=[];
 const cells=Array.from({length:k},()=>[]);regions.forEach((r,cell)=>{if(validRegion(r)&&cell<n)cells[r].push(cell);});
 if(!Number.isInteger(l.rows)||!Number.isInteger(l.cols)||l.rows<1||l.cols<1||regions.length!==n||!k)errors.push(issue('region','A grade precisa de dimensões e regiões válidas.'));
 for(let r=0;r<k;r++){const available=new Set(cells[r]),seen=new Set(cells[r].slice(0,1)),queue=[...seen];for(const cell of queue)for(const next of [cell-1,cell+1,cell-l.cols,cell+l.cols])if(adjacent(l,cell,next)&&available.has(next)&&!seen.has(next)){seen.add(next);queue.push(next);}if(!cells[r].length||seen.size!==cells[r].length)errors.push(issue('region',`A região ${r+1} precisa ser conectada.`,cells[r]));}
 const cfg={shapes:numericEntries(c.shapes),passages:c.passages||[],forbiddenEdges:c.forbiddenEdges||[],rowCounts:numericEntries(c.rowCounts),colCounts:numericEntries(c.colCounts),distances:numericEntries(c.distances),neighbors:c.neighbors||[],order:c.order||[],cuts:c.cuts||[],exclusivePassages:c.exclusivePassages||[]};
 const bad=(message,where=[])=>errors.push(issue('constraint',message,where));
 for(const [r,type]of cfg.shapes)if(!cells[r]||!['turn','straight'].includes(type))bad('A pista de curva ou reta precisa indicar uma região válida.');
 for(const cell of cfg.passages)if(!validCell(l,cell))bad('Passagem fora da grade.');
 for(const edge of cfg.forbiddenEdges)if(!Array.isArray(edge)||edge.length!==2||!adjacent(l,...edge))bad('Um trecho vedado deve ligar centros de casas vizinhas.');
 for(const [axis,entries,size]of [['linha',cfg.rowCounts,l.rows],['coluna',cfg.colCounts,l.cols]])for(const [index,count]of entries)if(!Number.isInteger(index)||index<0||index>=size||!Number.isInteger(count)||count<0||count>k)bad(`Contagem de ${axis} inválida.`);
 for(const [r,total]of cfg.distances)if(!cells[r]||!Number.isInteger(total)||total<2)bad('A distância deve indicar uma região e uma soma inteira de pelo menos dois intervalos.');
 for(const pair of cfg.neighbors)if(!Array.isArray(pair)||pair.length!==2||pair[0]===pair[1]||pair.some(r=>!cells[r]))bad('Vizinhança deve indicar duas regiões distintas.');
 if(cfg.order.length&&(cfg.order.length<4||new Set(cfg.order).size!==cfg.order.length||cfg.order.some(r=>!cells[r])))bad('A ordem precisa de pelo menos quatro regiões distintas.');
 for(const cut of cfg.cuts)if(!['row','col'].includes(cut.axis)||!Number.isInteger(cut.index)||cut.index<0||cut.index>=(cut.axis==='row'?l.rows:l.cols)-1||!Number.isInteger(cut.count)||cut.count<0||cut.count%2)bad('Um corte interno exige uma quantidade par e não negativa de travessias.');
 for(const group of cfg.exclusivePassages)if(typeof group.id!=='string'||!Array.isArray(group.cells)||group.cells.length<2||new Set(group.cells).size!==group.cells.length||group.cells.some(cell=>!validCell(l,cell)))bad('Um grupo exclusivo precisa de identificador e pelo menos duas casas distintas.');
 const prohibited=new Set([...cfg.passages,...cfg.exclusivePassages.flatMap(group=>group.cells||[])]),allowed=cells.map(list=>list.filter(cell=>!prohibited.has(cell)));
 for(const [r,cell]of numericEntries(l.fixed))if(!cells[r]||!allowed[r].includes(cell))bad('A pista fixa precisa ocupar uma casa permitida da própria região.',[cell]);
 const requiredNeighbors=Array.from({length:k},()=>new Set());for(const pair of cfg.neighbors){if(!Array.isArray(pair))continue;const [a,b]=pair;if(requiredNeighbors[a]&&requiredNeighbors[b]){requiredNeighbors[a].add(b);requiredNeighbors[b].add(a);}}
 return {l,n,k,cfg,cells,allowed,errors,requiredNeighbors};
}
function graph(l,p){const edges=eloEdges(l,p),degree=Array(p.length).fill(0),adj=Array.from({length:p.length},()=>[]);for(const[a,b]of edges){degree[a]++;degree[b]++;adj[a].push(b);adj[b].push(a);}return {edges,degree,adj};}
function orderMatches(actual,wanted){if(actual.length!==wanted.length)return false;const shift=actual.indexOf(wanted[0]);return [1,-1].some(sign=>wanted.every((r,i)=>actual[(shift+sign*i+actual.length)%actual.length]===r));}
function orderConflict(cfg,p,g){
 const marks=cfg.order;if(!marks.length||marks.some(r=>p[r]<0)||g.degree.some(d=>d>2))return null;
 const marked=new Set(marks),adjacentMarks=(a,b)=>{const ai=marks.indexOf(a),bi=marks.indexOf(b),d=Math.abs(ai-bi);return d===1||d===marks.length-1;};
 // With every marked point placed, subdividing a current path can insert only
 // unmarked points. Thus its marked endpoints must be adjacent in the order.
 for(const start of marks)for(const next of g.adj[start]){let previous=start,current=next;const seen=new Set([start]);while(!seen.has(current)){if(marked.has(current)){if(!adjacentMarks(start,current))return issue('order',`As regiões ${start+1} e ${current+1} já são consecutivas no circuito, mas a ordem marcada exige outra região entre elas.`,[p[start],p[current]],{markedRegions:marks});break;}seen.add(current);const options=g.adj[current].filter(r=>r!==previous);if(options.length!==1)break;previous=current;current=options[0];}}
 return null;
}
function evaluate(comp,p,extra=0){
 const {l,k,cfg,errors}=comp,v=errors.slice(),pending=[],validPositions=p.map((cell,r)=>validCell(l,cell)&&l.regions[cell]===r?cell:-1),g=graph(l,validPositions),filled=p.every(cell=>cell!==-1);
 const push=(certain,item)=>(certain?v:pending).push(item),hasPassage=cell=>g.edges.some(([a,b])=>inside(l,cell,p[a],p[b]));
 if(errors.length)return {complete:false,valid:false,violations:v,pending,edges:g.edges,degree:g.degree};
 for(let r=0;r<k;r++){const cell=p[r];if(cell===-1)pending.push(issue('missing',`Falta posicionar a peça da região ${r+1}.`,comp.cells[r]));else if(!validCell(l,cell)||l.regions[cell]!==r)v.push(issue('position','Peça fora da própria região.',[cell]));else if(!comp.allowed[r].includes(cell))v.push(issue('passage-point','Casas de passagem permanecem sem ponto.',[cell]));if(l.fixed?.[r]!==undefined&&cell!==l.fixed[r])v.push(issue('fixed','A pista fixa não pode mudar.',[l.fixed[r]]));}
 if(extra>0)v.push(issue('extra','Há peças além das regiões.'));
 for(let r=0;r<k;r++)if(validPositions[r]>=0&&g.degree[r]!==2)push(filled||g.degree[r]>2,issue('degree',`A peça tem ${g.degree[r]} conexões; precisa de duas.`,[p[r]],{region:r,degree:g.degree[r]}));
 for(let i=0;i<g.edges.length;i++)for(let j=0;j<i;j++)if(eloCrossing(l,p,g.edges[i],g.edges[j]))v.push(issue('crossing','Conexões se cruzam fora de uma peça.',[...g.edges[i],...g.edges[j]].map(r=>p[r])));
 if(filled&&k){const seen=new Set([0]),queue=[0];for(const r of queue)for(const other of g.adj[r])if(!seen.has(other)){seen.add(other);queue.push(other);}if(seen.size!==k)v.push(issue('circuits','Todas as peças devem formar um único circuito.'));}
 for(const[r,shape]of cfg.shapes)if(p[r]>=0){const dirs=g.adj[r].map(s=>direction(l,p[r],p[s])),matches=dirs.length===2&&(shape==='straight'?Math.floor(dirs[0]/2)===Math.floor(dirs[1]/2):Math.floor(dirs[0]/2)!==Math.floor(dirs[1]/2));if(!matches)push(filled||dirs.length>=2,issue('shape',`A região ${r+1} precisa formar ${shape==='straight'?'um trecho reto':'uma curva'}.`,[p[r]],{region:r,shape}));}
 for(const cell of cfg.passages)if(!hasPassage(cell))push(filled,issue('passage',`Uma ligação precisa atravessar o centro de ${coordinate(l,cell)}, sem ponto nessa casa.`,[cell]));
 for(const [u,w]of cfg.forbiddenEdges)if(g.edges.some(([a,b])=>onSegment(l,u,p[a],p[b])&&onSegment(l,w,p[a],p[b])))v.push(issue('forbidden-edge','Uma conexão automática atravessa um trecho vedado.',[u,w]));
 for(const[axis,entries]of [['row',cfg.rowCounts],['col',cfg.colCounts]])for(const[index,target]of entries){const selected=p.filter(cell=>cell>=0&&(axis==='row'?Math.floor(cell/l.cols):cell%l.cols)===index),count=selected.length;if(count!==target)push(filled||count>target,issue(axis+'-count',`A ${axis==='row'?'linha':'coluna'} ${index+1} precisa de ${target} ponto${target===1?'':'s'}; há ${count}.`,selected,{axis,index,target,count}));}
 for(const[r,target]of cfg.distances)if(p[r]>=0){const total=g.adj[r].reduce((sum,s)=>sum+distance(l,p[r],p[s]),0);if(g.degree[r]!==2||total!==target)push(filled,issue('distance',`As duas ligações da região ${r+1} precisam somar ${target} intervalos entre centros.`,[p[r]],{region:r,target,total}));}
 for(const[a,b]of cfg.neighbors)if(p[a]<0||p[b]<0||!g.adj[a]?.includes(b))push(p[a]>=0&&p[b]>=0,issue('neighbor',`As regiões ${a+1} e ${b+1} precisam se conectar diretamente, sem ponto intermediário.`,[p[a],p[b]].filter(cell=>cell>=0),{regions:[a,b]}));
 const orderError=orderConflict(cfg,p,g);if(orderError)v.push(orderError);else if(cfg.order.length){if(filled&&g.degree.every(d=>d===2)){const route=[0];let previous=-1,current=0;while(route.length<=k){const next=g.adj[current].find(r=>r!==previous);if(next===0||next===undefined)break;route.push(next);previous=current;current=next;}if(!orderMatches(route.filter(r=>cfg.order.includes(r)),cfg.order))v.push(issue('order','A ordem relativa das regiões marcadas não corresponde ao circuito, em nenhum dos dois sentidos.',cfg.order.map(r=>p[r])));}else pending.push(issue('order','Complete o circuito respeitando a ordem relativa das regiões marcadas.'));}
 for(const cut of cfg.cuts){const count=g.edges.filter(([a,b])=>crossedCut(l,p[a],p[b],cut)).length;if(count!==cut.count)push(filled||count>cut.count,issue('cut-count',`O corte entre ${cut.axis==='row'?'linhas':'colunas'} ${cut.index+1} e ${cut.index+2} exige ${cut.count} travessias; há ${count}.`,[],{...cut,actual:count}));}
 for(const group of cfg.exclusivePassages){const used=group.cells.filter(hasPassage);if(used.length!==1)push(filled||used.length>1,issue('exclusive-passage',`Exatamente uma passagem do grupo ${group.id} deve ser atravessada; há ${used.length}.`,group.cells,{group:group.id,used}));}
 return {complete:filled&&!v.length,valid:!v.length,violations:v,pending,edges:g.edges,degree:g.degree};
}
export function validateElo(l,state){const comp=compile(l),a=stateArray(state),p=Array.from({length:comp.k},(_,r)=>a[r]??-1);return evaluate(comp,p,a.length-comp.k);}

const BUDGET=Symbol('ELO work budget');
function makeBudget(options={},defaults={maxOperations:500000,maxMs:150}){
 const start=performance.now(),maxOperations=options.maxOperations??defaults.maxOperations,maxMs=options.maxMs??defaults.maxMs;let operations=0;
 return {tick(amount=1){operations+=amount;if(operations>maxOperations||((operations&127)===0&&performance.now()-start>=maxMs))throw BUDGET;},get operations(){return operations;},get elapsedMs(){return performance.now()-start;}};
}
function initialDomains(comp,state){const input=stateArray(state),p=Array.from({length:comp.k},(_,r)=>input[r]===undefined||input[r]===-1?(comp.l.fixed?.[r]??-1):input[r]);return {input,p,domains:p.map((cell,r)=>cell===-1?comp.allowed[r].slice():[cell])};}
/** Optional domains are explicit mathematical assumptions for offline proof
 * tooling, not player X marks. Every conclusion is conditional on them. */
function restrictDomains(domains,provided){const assumptions=[],assumedSingles=new Set();if(provided!==undefined&&!Array.isArray(provided))throw new TypeError('options.domains deve ser um array de candidatas por região.');for(let r=0;r<domains.length;r++)if(provided?.[r]!==undefined){if(!Array.isArray(provided[r]))throw new TypeError('Cada domínio informado deve ser um array de casas.');const before=domains[r];domains[r]=before.filter(cell=>provided[r].includes(cell));if(domains[r].length!==before.length){assumptions.push({index:r,candidates:domains[r].slice()});if(before.length>1&&domains[r].length===1)assumedSingles.add(r);}}return {assumptions,assumedSingles};}
function segmentForbidden(comp,a,b){return comp.cfg.forbiddenEdges.some(([u,v])=>onSegment(comp.l,u,a,b)&&onSegment(comp.l,v,a,b));}
function endpointOptions(comp,domains,p,r,cell,budget){
 const {l}=comp,rays=[[],[],[],[]],required=new Set();
 for(let s=0;s<domains.length;s++)if(s!==r){let common=-2;for(const other of domains[s]){budget.tick();const dir=direction(l,cell,other);if(common===-2)common=dir;else if(common!==dir)common=-1;if(dir<0||segmentForbidden(comp,cell,other))continue;
  // A settled intermediate point is necessarily the first visible point.
  if(p.some((fixed,t)=>t!==r&&t!==s&&fixed>=0&&inside(l,fixed,cell,other)))continue;
  rays[dir].push({region:s,cell:other,length:distance(l,cell,other)});
 }if(common>=0)required.add(common);}
 return {rays,required};
}
function pointSupport(comp,domains,p,r,budget){
 const {l,cfg,requiredNeighbors}=comp,cell=p[r],{rays,required}=endpointOptions(comp,domains,p,r,cell,budget),shape=cfg.shapes.find(([s])=>s===r)?.[1],target=cfg.distances.find(([s])=>s===r)?.[1],requiredRegions=requiredNeighbors[r];
 if(required.size>2)return issue('third-direction',`A peça da região ${r+1} em ${coordinate(l,cell)} teria conexões em pelo menos três direções, quaisquer que sejam as casas restantes.`,[cell],{region:r,requiredDirections:[...required]});
 for(let d=0;d<4;d++)for(let e=d+1;e<4;e++){
  if([...required].some(dir=>dir!==d&&dir!==e))continue;if(shape&&(shape==='straight')!==(Math.floor(d/2)===Math.floor(e/2)))continue;
  for(const a of rays[d])for(const b of rays[e]){budget.tick();if(a.region===b.region||[...requiredRegions].some(s=>s!==a.region&&s!==b.region)||target!==undefined&&a.length+b.length!==target)continue;return null;}
 }
 const code=target!==undefined?'distance-bounds':shape?'shape-directions':requiredRegions.size?'neighbor-alignment':'two-directions';
 const message=target!==undefined?`Em ${coordinate(l,cell)}, nenhum par de primeiras conexões possíveis soma ${target} intervalos para a região ${r+1}.`:shape?`Em ${coordinate(l,cell)}, a região ${r+1} não dispõe de duas direções ${shape==='straight'?'opostas':'perpendiculares'} compatíveis com os pontos restantes.`:requiredRegions.size?`Em ${coordinate(l,cell)}, a região ${r+1} não pode ter duas conexões e atender às suas vizinhanças obrigatórias.`:`Em ${coordinate(l,cell)}, a região ${r+1} não pode obter duas direções de conexão fornecidas por regiões distintas.`;
 return issue(code,message,[cell],{region:r,shape,target,requiredRegions:[...requiredRegions],rays});
}
function passagePossible(comp,domains,p,cell,budget){
 const {l}=comp,rays=[[],[],[],[]];for(let r=0;r<domains.length;r++)for(const candidate of domains[r]){budget.tick();const dir=direction(l,cell,candidate);if(dir>=0)rays[dir].push({region:r,cell:candidate});}
 for(const[d,e]of [[0,1],[2,3]])for(const a of rays[d])for(const b of rays[e]){budget.tick();if(a.region===b.region||segmentForbidden(comp,a.cell,b.cell))continue;
  if(domains.some((domain,r)=>r!==a.region&&r!==b.region&&domain.every(point=>inside(l,point,a.cell,b.cell))))continue;
  return true;
 }return false;
}
function feasible(comp,domains,budget){
 budget.tick();const {l,k,cfg}=comp,p=domains.map(d=>d.length===1?d[0]:-1);
 if(domains.some(d=>!d.length))return issue('empty-domain','Uma região ficou sem posição permitida.');
 const check=evaluate(comp,p);if(!check.valid)return check.violations[0];
 if(p.every(cell=>cell>=0))return null;
 for(const[axis,entries]of [['row',cfg.rowCounts],['col',cfg.colCounts]])for(const[index,target]of entries){const matches=cell=>(axis==='row'?Math.floor(cell/l.cols):cell%l.cols)===index;const minimum=domains.filter(d=>d.every(matches)).length,maximum=domains.filter(d=>d.some(matches)).length;if(target<minimum||target>maximum)return issue('count-bounds',`A ${axis==='row'?'linha':'coluna'} ${index+1} exige ${target} pontos, mas as regiões ainda disponíveis permitem de ${minimum} a ${maximum}.`,[],{axis,index,target,minimum,maximum});}
 for(let r=0;r<k;r++)if(p[r]>=0){const unsupported=pointSupport(comp,domains,p,r,budget);if(unsupported)return unsupported;}
 const onCurrent=cell=>check.edges.some(([a,b])=>inside(l,cell,p[a],p[b]));
 for(const cell of cfg.passages)if(!onCurrent(cell)&&!passagePossible(comp,domains,p,cell,budget))return issue('passage-alignment',`Nenhum alinhamento entre duas regiões ainda pode atravessar a passagem ${coordinate(l,cell)} sem um ponto intermediário ou trecho vedado.`,[cell],{passage:cell});
 for(const group of cfg.exclusivePassages)if(!group.cells.some(onCurrent)&&!group.cells.some(cell=>passagePossible(comp,domains,p,cell,budget)))return issue('exclusive-choice',`Nenhuma das passagens do grupo ${group.id} pode ser atravessada pelas posições restantes.`,group.cells,{group:group.id});
 for(const cut of cfg.cuts){const left=cell=>(cut.axis==='row'?Math.floor(cell/l.cols):cell%l.cols)<=cut.index,forcedLeft=domains.filter(d=>d.every(left)).length,forcedRight=domains.filter(d=>d.every(cell=>!left(cell))).length,maxLeft=domains.filter(d=>d.some(left)).length,maxRight=domains.filter(d=>d.some(cell=>!left(cell))).length,minimum=forcedLeft&&forcedRight?2:0,maximum=2*Math.min(maxLeft,maxRight);if(cut.count<minimum||cut.count>maximum)return issue('cut-bounds',`O corte exige ${cut.count} travessias; a distribuição restante dos pontos permite entre ${minimum} e ${maximum}.`,[],{...cut,minimum,maximum});}
 // A partial circuit CAN be extended by subdivisions. Reject it only when a
 // remaining region cannot place its point on any of that circuit's segments.
 const g=graph(l,p),seen=new Set();for(let root=0;root<k;root++)if(p[root]>=0&&!seen.has(root)){const component=[root];seen.add(root);for(const r of component)for(const s of g.adj[r])if(!seen.has(s)){seen.add(s);component.push(s);}if(component.length>=4&&component.every(r=>g.degree[r]===2)){const set=new Set(component),edges=g.edges.filter(([a])=>set.has(a)),outside=domains.findIndex((domain,r)=>!set.has(r)&&domain.every(cell=>!edges.some(([a,b])=>inside(l,cell,p[a],p[b]))));if(outside>=0)return issue('closed-circuit',`O circuito fechado não pode incorporar a região ${outside+1}: nenhuma de suas casas restantes subdivide um segmento desse circuito.`,domains[outside],{component,excludedRegion:outside});}}
 return null;
}
export const ELO_TECHNIQUES={
 'shape-directions':'Duas direções compatíveis com a curva ou reta',
 'shape':'Orientação obrigatória da região',
 'passage-alignment':'Alinhamentos possíveis para a passagem',
 'passage':'Passagem obrigatória',
 'passage-point':'Passagens permanecem sem ponto',
 'forbidden-edge':'Nenhuma ligação pode percorrer o trecho vedado',
 'count-bounds':'Limites da contagem de pontos',
 'row-count':'Quantidade de pontos na linha',
 'col-count':'Quantidade de pontos na coluna',
 'distance-bounds':'Somas possíveis dos comprimentos das duas conexões',
 'distance':'Distância entre centros de células',
 'neighbor-alignment':'Alinhamento direto entre regiões vizinhas',
 'neighbor':'Vizinhança direta obrigatória',
 'order':'Ordem relativa dos marcos, nos dois sentidos',
 'cut-bounds':'Distribuição dos pontos dos dois lados do corte',
 'cut-count':'Quantidade de travessias do corte',
 'exclusive-choice':'Uma única passagem utilizável no grupo',
 'exclusive-passage':'Exatamente uma passagem atravessada',
 'two-directions':'Pelo menos duas direções viáveis',
 'third-direction':'Evitar uma terceira direção conectada',
 'degree':'Duas conexões por ponto',
 'crossing':'Evitar cruzamentos fora de pontos',
 'closed-circuit':'Subdivisão possível de um circuito parcial',
 'single-candidate':'Única candidata após deduções locais'
};
/** Constraint propagation only: each tested candidate is checked against
 * necessary local bounds and visible connections, never recursively searched.
 * Budgets bound actual work rather than rejecting boards at a cell-count cap.
 * A budget cutoff is not a contradiction and never invents an elimination. */
export function analyzeEloLocal(l,state,options={}){
 const comp=compile(l),{input,domains}=initialDomains(comp,state),{assumptions,assumedSingles}=restrictDomains(domains,options.domains),budget=makeBudget(options),eliminations=[],forced=[],techniqueCounts={},seenForced=new Set();let rounds=0,contradiction=false,diagnostic=null,budgetExhausted=false,changed=false;
 const record=(index,value,reason)=>{domains[index]=domains[index].filter(cell=>cell!==value);changed=true;techniqueCounts[reason.code]=(techniqueCounts[reason.code]||0)+1;eliminations.push({index,value,technique:reason.code,explanation:`A região ${index+1} não pode ocupar ${coordinate(l,value)}. ${reason.message}`,premises:reason.premises||{cells:reason.cells,rule:reason.code}});};
 const recordSingles=()=>{for(let r=0;r<domains.length;r++)if(domains[r].length===1&&(input[r]??-1)<0&&l.fixed?.[r]===undefined&&!seenForced.has(r)&&!assumedSingles.has(r)){seenForced.add(r);techniqueCounts['single-candidate']=(techniqueCounts['single-candidate']||0)+1;forced.push({index:r,value:domains[r][0],technique:'single-candidate',explanation:`A região ${r+1} só pode ocupar ${coordinate(l,domains[r][0])}, após conferir as posições permitidas e as restrições.`,premises:eliminations.filter(item=>item.index===r)});}};
 try{
  if(input.length>comp.k){diagnostic=issue('extra','Há peças além das regiões.');contradiction=true;}else{
   diagnostic=feasible(comp,domains,budget);contradiction=Boolean(diagnostic);
   if(!contradiction)do{changed=false;rounds++;for(let r=0;r<domains.length&&!contradiction;r++)if(domains[r].length>1)for(const cell of [...domains[r]]){budget.tick();const trial=domains.slice();trial[r]=[cell];const reason=feasible(comp,trial,budget);if(reason)record(r,cell,reason);if(!domains[r].length){diagnostic=reason;contradiction=true;break;}}if(!contradiction){recordSingles();diagnostic=feasible(comp,domains,budget);contradiction=Boolean(diagnostic);}}while(changed&&!contradiction);
  }
 }catch(error){if(error!==BUDGET)throw error;budgetExhausted=true;recordSingles();}
 return {kind:'regions',assumptions,candidates:domains,eliminations,forced,techniqueCounts,rounds,contradiction,solved:!contradiction&&domains.every(d=>d.length===1)&&evaluate(comp,domains.map(d=>d[0])).complete,diagnostic,budgetExhausted,exhaustive:!budgetExhausted,stats:{operations:budget.operations,elapsedMs:budget.elapsedMs}};
}
/** Search returns a lower bound on solution count. Only exhaustive:true proves
 * count===0 or count===1. Limit and resource cutoffs always remain explicit. */
export function solveElo(l,state,limit=2,options={}){
 const start=performance.now(),comp=compile(l),initial=initialDomains(comp,state),{assumptions}=restrictDomains(initial.domains,options.domains),solutions=[],stats={nodes:0,branches:0,forced:0,maxDepth:0,candidates:initial.domains.reduce((sum,d)=>sum+d.length,0),operations:0,elapsedMs:0},maxNodes=options.maxNodes??250000,maxMs=options.maxMs??2000,maxOperations=options.maxOperations??Infinity,budget=makeBudget({maxOperations,maxMs},{maxOperations:Infinity,maxMs:2000});let cutoffReason=null;
 limit=Math.max(1,Math.floor(limit)||1);
 function dfs(domains,depth){if(cutoffReason)return;if(stats.nodes>=maxNodes){cutoffReason='maxNodes';return;}if(performance.now()-start>=maxMs){cutoffReason='maxMs';return;}stats.nodes++;stats.maxDepth=Math.max(stats.maxDepth,depth);
  if(feasible(comp,domains,budget))return;
  let region=-1;for(let r=0;r<domains.length;r++)if(domains[r].length>1&&(region<0||domains[r].length<domains[region].length))region=r;
  if(region<0){const p=domains.map(d=>d[0]);if(evaluate(comp,p).complete){solutions.push(p);if(solutions.length>=limit)cutoffReason='solutionLimit';}return;}
  stats.branches++;for(const cell of domains[region]){const trial=domains.slice();trial[region]=[cell];dfs(trial,depth+1);if(cutoffReason)break;}
 }
 try{if(initial.input.length<=comp.k)dfs(initial.domains,0);}catch(error){if(error!==BUDGET)throw error;cutoffReason=budget.operations>maxOperations?'maxOperations':'maxMs';}
 stats.operations=budget.operations;stats.elapsedMs=performance.now()-start;
 return {count:solutions.length,solutions,assumptions,exhaustive:cutoffReason===null,cutoffReason,limited:cutoffReason!==null,nodes:stats.nodes,stats};
}
