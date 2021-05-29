import * as coreMoves from './coreMoves';


const isGlobalValidForPhase = game => {
  return card => {
    if (typeof card.global.phase === 'undefined') {
      return true;
    }
    return (card.global.phase === game.phase);
  }
};

const gatherGlobalMoves = game => {
  return game.globals.filter(isGlobalValidForPhase(game))
    .map(card => ({
      name: card.name,
      desc: card.global.text,
      precondition: card.global.precondition,
      doit: payload => {
        card.global.doit(payload);  
        payload.dispatch('deselect', {dice: payload.game.selectedDice});              
      },
    }));
};



// -----  R O L L  -------------------------------------------------------
const gatherRollPhaseMoves = game => {
  return [coreMoves.roll];
};


// -----  M A I N  -------------------------------------------------------
const gatherMainPhaseMoves = game => {
  const moves = [coreMoves.reroll, coreMoves.buyDie, coreMoves.field];

  game.selectedDice.forEach(die => {
    if (die.face.type === 'action') {
      moves.push({
        name: die.card.name,
        desc: die.card.text,
        precondition: die.card.precondition,
        doit: payload => {
          die.card.doit(payload);  
          payload.dispatch('deselect', {dice: payload.game.selectedDice});              
          payload.commit('moveAllDice', {source:'reserve', dice:[die], dest:'outOfPlay'});
        },
      });
    }
  });

  moves.push(...gatherGlobalMoves(game));

  moves.push(coreMoves.startAttackPhase);
  return moves;
};


// -----  A T T A C K  -------------------------------------------------------
const gatherAttackPhaseMoves = game => {
  return [coreMoves.attackWith, ...gatherGlobalMoves(game), coreMoves.endTurn];
};


// -----  G A T H E R  -------------------------------------------------------
export const gatherMoves = game => {
  switch (game.phase) {
    case 'roll': return gatherRollPhaseMoves(game);
    case 'main': return gatherMainPhaseMoves(game);
    case 'attack': return gatherAttackPhaseMoves(game);
  }

  console.error(`unknown game phase: ${game.phase}`);
  return [];
};