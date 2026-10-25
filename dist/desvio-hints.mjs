import {legalDesvioMoves} from './desvio.mjs';
const coord=(map,c)=>`L${Math.floor(c/map.cols)+1}C${c%map.cols+1}`;
/** Context visible on the current board, never optimal-play analysis. Strategic
 * recommendations remain exclusively in DESVIO's explicit training controls. */
export function buildDesvioContextHint(map,state,{mode='local',preview=-1,replay=false}={}){
 const title=`${map.rows} × ${map.cols}${replay?' · posição em revisão':''}`;
 if(state.winner!==null&&state.winner!==undefined)return {cells:[],focusText:`${title}: jogador ${state.winner+1} venceu.`,explanation:`O jogador ${state.player+1} ficou sem casa disponível no destino obrigatório. Casas consumidas não podem ser escolhidas novamente.`,nextStep:'Inicie outra partida para explorar uma nova sequência. Nenhuma jogada será aplicada por esta dica.'};
 const moves=legalDesvioMoves(map,state),where=state.restriction?`${state.restriction.axis==='row'?'linha':'coluna'} ${state.restriction.index+1}`:'qualquer linha ou coluna';
 const focusText=`${title}: vez do jogador ${state.player+1}. Há ${moves.length} casa${moves.length===1?'':'s'} ${moves.length===1?'disponível':'disponíveis'} em ${where}.`;
 const selected=moves.includes(preview),direction=selected?(map.arrows[preview]==='H'?'linha '+(Math.floor(preview/map.cols)+1):'coluna '+(preview%map.cols+1)):null;
 const explanation=selected?`${coord(map,preview)} tem seta ${map.arrows[preview]==='H'?'horizontal (↔)':'vertical (↕)'}. Se confirmada, essa casa é consumida e o próximo jogador deve escolher na ${direction}.`:`Nesta posição, selecione uma casa disponível em ${where}. Uma seta ↔ define a linha do próximo turno; ↕ define a coluna. Casas consumidas não bloqueiam o destino: só deixam de poder ser escolhidas.`;
 const nextStep=mode==='competitive'?'Modo competitivo: estas dicas explicam apenas o turno e as regras visíveis. Não revelam melhor jogada, análise de vitória nem permitem desfazer.':mode==='training'?`${selected?'A casa selecionada pode ser examinada':'A posição atual pode ser examinada'} pelo botão Analisar posição / prévia, exclusivo do treino. As dicas não confirmam ou aplicam jogadas.`:mode==='bot'&&state.player===1?'É a vez do bot. Aguarde sua jogada; depois a dica será recalculada para o seu novo destino.':`${selected?'Sua seleção ainda não foi aplicada.':'Selecione uma casa antes de confirmar.'} Use Confirmar jogada para consumir a casa. Recomendações de melhor jogada são exclusivas do modo de treino.`;
 return {cells:[],focusText,explanation,nextStep};
}
