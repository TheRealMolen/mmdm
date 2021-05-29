import {splitDiceByFaceType, splitDiceByLocation, calcFieldingCosts, calcPurchaseCosts, accountDiceVsCosts} from '../rulesets/util';


// ----  R O L L  --------------------------------------------------------
export const roll = {
  name: "Roll",
  desc: "Take four dice from your bag, refilling if needed, and roll them along with any dice in your prep area",
  doit({dispatch}) {
    dispatch('doRollPhase');
  }
};



// ----  R E R O L L  --------------------------------------------------------
export const reroll = {
  name: 'Reroll',
  desc: 'Reroll any number of rolled dice (you can only do this once per turn)',
  precondition(game) {
    if (game.rerolled) {
      return 'You can only reroll one time per turn';
    }
    if (!game.selectedDice.length) {
      return 'You need to select at least one die to reroll';
    }
    if (game.selectedDice.some(die => die.owner !== game.currentTurn)) {
      return 'You can only reroll dice you own';
    }
    if (game.selectedDice.some(die => die.location !== 'reserve')) {
      return 'You can only reroll dice in your reserve';
    }
    if (game.selectedDice.some(die => die.modifiers.findIndex(mod => mod.stat === 'spindown') >= 0)) {
      return `You cannot reroll dice whose energy you've partially spent`;
    }
  },
  doit({game, dispatch}) {
    const dice = [...game.selectedDice];
    dispatch('deselect', {dice});
    dispatch('doReroll', {dice});
  },
};

// ----  B U Y  --------------------------------------------------------
export const buyDie = {
  name: 'Buy',
  desc: 'Buy dice from cards (select dice and the energy to buy them)',
  precondition(game) {
    if (!game.selectedDice.length) {
      return 'You need to select at least one die to buy';
    }
    const diceByLocation = splitDiceByLocation(game.selectedDice);
    if (diceByLocation.card.length === 0) {
      return 'You need to select some dice to buy';
    }
    if (!diceByLocation.card.every(die => die.card.owner !== 1-game.currentTurn)) {
      return 'You can only buy dice from your own cards or from action cards';
    }
    if (!diceByLocation.reserve.every(die => die.owner === game.currentTurn)) {
      return 'You can only buy dice using energy you own';
    }
    if (!diceByLocation.reserve.every(die => die.face.type === 'energy')) {
      return 'You can only buy dice using energy';
    }
    if (diceByLocation.card.length + diceByLocation.reserve.length !== game.selectedDice.length) {
      return 'You can only buy dice with dice in your reserve';
    }

    const costs = calcPurchaseCosts(diceByLocation.card);
    const account = accountDiceVsCosts(diceByLocation.reserve, costs);
    if (!account.enough) {
      let msg = `You haven't covered the purchase costs: `;
      if (account.total > 0) {
        msg += `You need ${account.total} more energy. `;
      }
      if (account.energies.length > 0) {
        msg += `You need ${account.energies.join(', ')} energ${account.energies.length === 1 ? 'y' : 'ies'}`;
      }
      return msg;
    }
  },
  doit({game, dispatch}) {
    const diceByLocation = splitDiceByLocation(game.selectedDice);
    const costs = calcPurchaseCosts(diceByLocation.card);
    const account = accountDiceVsCosts(diceByLocation.reserve, costs);

    if (account.tooMuch) {
      if (!confirm(`You're spending ${-account.total} energ${account.total === -1 ? 'y' : 'ies'} more than required. Are you sure?`)) {
        return;
      }
    }

    dispatch('deselect', {dice: game.selectedDice});
    dispatch('doBuyDice', {diceToBuy: diceByLocation.card, diceToSpend: account.spent, diceToSpinDown: account.spinDown});
  },
};



// ----  F I E L D  --------------------------------------------------------
export const field = {
  name: 'Field',
  desc: 'Send characters to the field (select characters and the energy to field them)',
  precondition(game) {
    if (!game.selectedDice.length) {
      return 'You need to select at least one die to field';
    }
    if (!game.selectedDice.every(die => die.owner === game.currentTurn)) {
      return 'You can only field dice you own';
    }
    if (!game.selectedDice.every(die => die.location === 'reserve')) {
      return 'You can only field dice in your reserve';
    }
    
    const diceByType = splitDiceByFaceType(game.selectedDice);
    if (diceByType.character.length === 0) {
      return 'You need to select some characters to field';
    }

    const costs = calcFieldingCosts(diceByType.character);
    const account = accountDiceVsCosts(diceByType.energy, costs);
    if (!account.enough) {
      let msg = `You haven't covered the fielding costs: `;
      if (account.total > 0) {
        msg += `You need ${account.total} more energy. `;
      }
      if (account.energies.length > 0) {
        msg += `You need ${account.energies.join(', ')} energ${account.energies.length === 1 ? 'y' : 'ies'}`;
      }
      return msg;
    }
  },
  doit({game, dispatch}) {
    const diceByType = splitDiceByFaceType(game.selectedDice);
    const costs = calcFieldingCosts(diceByType.character);
    const account = accountDiceVsCosts(diceByType.energy, costs);

    if (account.tooMuch) {
      if (!confirm(`You're spending ${-account.total} energ${account.total === -1 ? 'y' : 'ies'} more than required. Are you sure?`)) {
        return;
      }
    }

    dispatch('deselect', {dice: game.selectedDice});
    dispatch('doField', {diceToField: diceByType.character, diceToSpend: account.spent, diceToSpinDown: account.spinDown});
  },
};


// ----  S T A R T   A T T A C K  --------------------------------------------------------
export const startAttackPhase = {
  name: 'Start Attack Phase',
  desc: 'Move to the Attack phase',
  precondition(game) {
    if (game.selectedDice.length !== 0) {
      return 'You need to deselect all your dice before moving to the attack phase';
    }
  },
  doit({game, dispatch}) {
    // TODO: check that the remaining characters are fieldable
    if (game.players[game.currentTurn].reserve.some(die => die.face.type === 'character')) {
      if (!confirm('You haven\'t fielded all of your characters -- are you sure you want to move to the attack phase?')) {
        return;
      }
    }

    dispatch('deselect', {dice: game.selectedDice});
    dispatch('startAttack');
  },
};






// ----  S T A R T   A T T A C K  --------------------------------------------------------
export const attackWith = {
  name: 'Attack With',
  desc: 'Move characters from the field to attack',
  precondition(game) {
    if (game.selectedDice.length === 0) {
      return 'You need to select some characters to attack with';
    }
    if (!game.selectedDice.every(die => die.location === 'field')) {
      return 'You can only attack with characters in the field';
    }
  },
  doit({game, dispatch, commit}) {
    commit('moveAllDice', {source: 'field', dice: [...game.selectedDice], dest: 'attack'})
    dispatch('deselect', {dice: game.selectedDice});
  },
};



// ----  E N D   T U R N  --------------------------------------------------------
export const endTurn = {
  name: 'End Turn',
  precondition(game) {
    if (game.selectedDice.length !== 0) {
      return 'You need to deselect all your dice before finishing your turn';
    }
  },
  doit({game, dispatch}) {
    dispatch('deselect', {dice: game.selectedDice});
    dispatch('finishTurn');
    dispatch('doTurnStart');
  },
};
