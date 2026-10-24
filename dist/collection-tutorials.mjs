// Instâncias de referência do PDF. Nenhuma solução é consultada pela interface.
const clues=(n,entries)=>{const a=Array(n*n).fill(-1);for(const [r,c,v]of entries)a[(r-1)*n+c-1]=v;return a;};
export const TUTORIALS={
 elo:{id:'tutorial-E-01',game:'elo',rows:5,cols:5,regions:[0,1,1,1,1,0,0,1,1,2,0,5,3,3,2,0,5,3,3,2,5,5,4,4,2],fixed:{3:12},tutorial:true},
 prumo:{id:'tutorial-P-01',game:'prumo',rows:4,cols:4,supports:[{id:0,x2:2,y2:2},{id:1,x2:4,y2:0},{id:2,x2:4,y2:4},{id:3,x2:3,y2:6}],tutorial:true},
 pacto:{id:'tutorial-PA-01',game:'pacto',rows:8,cols:8,clues:clues(8,[[2,2,1],[3,2,1],[4,2,3],[4,3,3],[5,1,2],[5,6,0],[5,7,0],[7,2,3],[7,7,1]]),tutorial:true}
};
// Roteiros explícitos do PDF. As instruções não preenchem a grade; o jogador executa cada passo.
export const TUTORIAL_STEPS={
 pacto:[
 {text:'1 · Cotas cruzadas. Na coluna 2, as pistas já usam dois triângulos e dois losangos. Em L5C2 restam círculo ou quadrado. A linha 5 já tem dois círculos, em C6 e C7. Portanto, preencha quadrado em L5C2.',cells:[9,17,25,49,37,38,33],requires:[]},
 {text:'2 · Dupla fechada. L5C1 e L5C2 são quadrados e já formam sua dupla. L6C2 não pode ser quadrado, pois daria um segundo parceiro a L5C2. Pela cota da coluna 2 só restam círculo ou quadrado: preencha círculo em L6C2.',cells:[32,33,41],requires:[[33,2]]},
 {text:'3 · Exclusão local e global. L5C3 não pode ser círculo pela cota da linha 5; nem quadrado, pois tocaria a dupla da esquerda; nem losango, pois L4C3 já está pareado com L4C2. Só resta triângulo. Continue usando cotas, duplas fechadas e parceiros obrigatórios. Confirme quando terminar.',cells:[34,32,33,25,26,37,38],requires:[[33,2],[41,0]]}
 ],
 elo:[
 {text:'1 · Conferência guiada E-01. D está fixa em L3C3. Para reconstruir o exemplo do PDF, coloque A em L1C1 e B em L1C5. A e B se enxergam na linha 1, mesmo atravessando fronteiras de regiões. A linha é criada automaticamente, não desenhada manualmente.',cells:[0,4,12],requires:[]},
 {text:'2 · Seguir o caminho. Coloque C em L3C5. B encontra C abaixo; C encontra D à esquerda. A peça mais próxima em cada direção é a que conta. Este é um roteiro de conferência da solução do exemplo, não uma afirmação de que qualquer posição parcial já esteja correta.',cells:[4,14,12],requires:[[0,0],[1,4]]},
 {text:'3 · Fechar um único circuito. Coloque E em L5C3 e F em L5C1. Siga A → B → C → D → E → F → A: cada peça tem duas conexões, todas pertencem ao mesmo circuito e não há cruzamento fora de peça. Pressione Confirmar resposta para conferir. Depois experimente mover B para L1C3 e observe por que D passa a ter uma terceira direção.',cells:[0,4,14,12,22,20],requires:[[0,0],[1,4],[2,14]]}
 ],
 prumo:[
 {text:'1 · Bordas. B está na linha superior: qualquer casa abaixo puxaria seu centro de massa para baixo, sem casas acima para compensar. D está na linha inferior e não pode subir. No exemplo, pinte B em L1C2–C4 e D em toda a linha 4. O apoio D entre C2 e C3 exige ambas as casas.',cells:[1,2,3,12,13,14,15],requires:[]},
 {text:'2 · Completar as peças. Pinte C em L3C2–C4. A recebe L1C1, toda a linha 2 e L3C1. Todas as casas ficam cobertas e cada peça permanece conectada. Este desenho reconstrói a partição de referência, sem impor simetria como regra.',cells:[9,10,11,0,4,5,6,7,8],requires:[[1,1],[2,1],[3,1],[12,3],[13,3],[14,3],[15,3]]},
 {text:'3 · Massa × distância. Na peça A, três casas ficam uma unidade à esquerda do apoio: momento 3. À direita há uma a distância 1 e outra a distância 2: momento 1 + 2 = 3. Acima e abaixo também se compensam. A é assimétrica e mesmo assim equilibrada. Confirme: ambos os momentos devem zerar.',cells:[0,4,5,6,7,8],requires:[[0,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,2],[10,2],[11,2]]}
 ]
};
