import {solveLevel} from '../dist/sintonia/engine.mjs';
/** Evidence-backed editorial exceptions; never changes a board or command. */
export function applyVerifiedEditorial(level){
 if(level.number===251){
  const controller=level.boards.find(b=>b.keys?.some(k=>k.id==='prepare'));
  if(controller){const key=controller.keys.find(k=>k.id==='prepare');controller.keys=controller.keys.filter(k=>k.id!=='prepare');if(!controller.keys.length)delete controller.keys;controller.switches=[...(controller.switches||[]),{id:'prepare',cell:key.cell,group:'prepare'}];
   for(const board of level.boards)for(const gate of board.gates||[])if(gate.condition.type==='key'&&gate.condition.id==='prepare')gate.condition={type:'switch',id:'prepare',value:true};
   if(!level.mechanics.includes('switch'))level.mechanics.push('switch');if(!level.prerequisites.includes('switch'))level.prerequisites.push('switch');
   const solved=solveLevel(level,{maxStates:100000,maxMs:30000});if(solved.status!=='solved'||!solved.optimal)throw new Error('Switch-before-commit certification failed');level.solution=solved.solution;Object.assign(level.certificate,{commands:solved.solution.length,optimal:true,visited:solved.visited,replayed:true});
  }
  level.editorial.design.preparationControl='switch';level.editorial.design.secondaryPatterns=['configure-before-oneway-commit'];level.editorial.design.proofStatus='prefix-counterfactual-in-tests/sintonia-commitment-evidence.json';
  level.editorial.discovery='Aqui o jogador precisa descobrir que o interruptor deve preparar a passagem remota antes de abandonar seu acesso pelo sentido único.';level.discovery=level.editorial.discovery;
  level.lesson='Prepare o interruptor antes de atravessar o trecho sem retorno.';level.hints=['Localize o interruptor que abre a passagem do outro animal.','Depois do sentido único, não há retorno ao controle: configure a passagem antes de atravessar.','Antes de descer pelo sentido único, entre no interruptor à esquerda da posição inicial.'];
  return level;
 }
 if(level.number!==423)return level;
 level.secondaryFamilies=['dual-use-object','waiting-place'];
 level.editorial.secondaryPattern='support-and-necessary-stop';
 level.editorial.discovery='Aqui o jogador precisa descobrir que a placa muda de destinatário enquanto a caixa, depois de sustentar a passagem, também precisa separar os movimentos por bloqueio.';
 level.discovery=level.editorial.discovery;
 level.lesson='Mude o destinatário da placa e use a caixa preparada como apoio e ponto de espera.';
 level.hints=[
  'A placa e o seletor atendem duas etapas; a caixa do bem-te-vi também participa do alinhamento.',
  'Depois de sustentar a cancela, preserve a caixa na placa. Ela pode segurar uma seta quando não existe espaço para empurrá-la.',
  'Após usar a cancela, coloque o bem-te-vi acima da caixa: a seta para baixo o mantém parado enquanto os outros se ajustam.'
 ];
 level.editorial.design={pattern:'selector-recipient-with-supported-stop',secondaryPatterns:['support-and-necessary-stop'],
  discovery:'A placa ajuda destinatários sucessivos; depois de sustentar a própria cancela, a caixa também precisa oferecer uma espera física para o alinhamento.',
  roles:['Capivara: sustentar a placa e alternar o destinatário.','Tuiuiú: atravessar as duas configurações e preparar a chegada.','Bem-te-vi: orientar a caixa, usar seu apoio, voltar para esperar contra ela e retornar ao destino.'],
  structures:{selector:'Escolher qual etapa recebe a ajuda da placa.',box:'Mudar de direção até a placa, sustentar a cancela e bloquear um empurrão sem destino transitável.',returnRoute:'Permitir sair do destino para alinhar os outros animais e voltar.'},
  preconditions:['A caixa precisa sustentar uma travessia antes de cumprir o bloqueio analisado.','O animal deve poder alcançar a caixa: uma cancela entre eles não conta como bloqueio da caixa.'],
  proofStatus:'exhaustive-predicate-evidence-in-offline-audit',evidence:{report:'tests/sintonia-purpose-audit.json',query:'box-supported-stop:box0',witnessSupportCommands:[10,12,18],witnessStopCommand:14},
  caveat:'A prova é sobre o predicado exato de bloqueio após apoio; não declara solução única nem dificuldade humana.'};
 return level;
}
