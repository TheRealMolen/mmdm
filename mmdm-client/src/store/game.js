import uxm from '../rulesets/uxm';
import { getStatModAmount } from '../rulesets/util';
import { makeActionDie, pickActionColour, makeCharacterDie, makeSidekickDie, findCard } from '../rulesets/util';
import { joinGame } from '../sync';

// source for rules: 
//  pt 1: http://dicecoalition.com/tiki/tiki-view_blog_post.php?postId=14
//  pt 2: http://dicecoalition.com/tiki/tiki-view_blog_post.php?postId=22
//  pt 3: http://dicecoalition.com/tiki/tiki-view_blog_post.php?postId=85


const newPlayer = (num, local) => ({
  num,
  name: `player${num}`,
  local,

  cards: [],
  ownedDice: {},

  health: -1,
  damageHistory: [],

  // all of our dices!
  bag: [],
  attack: [],
  field: [],
  reserve: [],
  prep: [],
  outOfPlay: [],
  used: [],
});

const roll = die => {
  const upside = Math.floor(Math.random() * 6);
  die.face = die.faces[upside];
};



//           _        _       
//          | |      | |      
//       ___| |_ __ _| |_ ___ 
//      / __| __/ _` | __/ _ \
//      \__ \ || (_| | ||  __/
//      |___/\__\__,_|\__\___|
//
const state = () => ({
  gameid: null,
  players: [newPlayer(0, true), newPlayer(1, false)],
  actionCards: [],
  globals: [],
  currentTurn: 0,//Math.floor(Math.random() * 2),
  phase: 'roll',
  rerolled: false,

  selectedDice: [],
  effectsToResolve: [],
});

let sync = null;
let nextGameId = 1;

//               _   _                 
//              | | (_)                
//     __ _  ___| |_ _  ___  _ __  ___ 
//    / _` |/ __| __| |/ _ \| '_ \/ __|
//   | (_| | (__| |_| | (_) | | | \__ \
//    \__,_|\___|\__|_|\___/|_| |_|___/
//
const actions = {
  setupStarterGame({ commit, state }) {
    const gameid = `sg${nextGameId}`;
    ++nextGameId;
    sync = joinGame(gameid, newState => console.log(newState));

    commit('resetGame', {startingHealth: 10});

    commit('addCardToPlayer', {playerNum:0, card:findCard('Sprite', 'KittyPryde'), numDice:2});
    commit('addCardToPlayer', {playerNum:0, card:findCard('Optic Blast', 'Cyclops'), numDice:2});
    commit('addCardToPlayer', {playerNum:1, card:findCard('Air Transport', 'Angel'), numDice:2});
    commit('addCardToPlayer', {playerNum:1, card:findCard('Cain Marko', 'Juggernaut'), numDice:2});
    
    commit('addActionCard', {card:findCard('Ambush'), numDice:3});
    commit('addActionCard', {card:findCard('Enrage'), numDice:3});
    commit('addActionCard', {card:findCard('Reckless Melee'), numDice:3});

    // --  testing  ------
    commit('buyDie', { playerNum:0, die: state.players[0].cards[0].dice[1] });
    commit('buyDie', { playerNum:0, die: state.players[0].cards[0].dice[0] });
    commit('buyDie', { playerNum:0, die: state.players[0].cards[1].dice[1] });
    commit('buyDie', { playerNum:0, die: state.players[0].cards[1].dice[0] });
    commit('moveAllDice', { source:'used', dest: 'prep' });
  },


  // ------------- p h a s e s --------------
  doTurnStart({commit, state}) {
    commit('moveAllDice', { source:'reserve', dest: 'used' });
    commit('moveAllDice', { source:'outOfPlay', dest: 'used' });
  },

  doRollPhase({commit, state}) {
    const player = state.players[state.currentTurn];

    for (let i=0; i<4; ++i) {
      if (player.bag.length === 0) {
        commit('moveAllDice', { source:'used', dest: 'bag' });
      }

      // TODO: if (player.bag.length === 0) { BAG BURN } else
      commit('drawDie');  // moves from bag to prep
    }

    commit('moveAllDice', { source:'prep', dest: 'reserve' });
    commit('rollDice', { dice: player.reserve });

    commit('changePhase', {phase:'main'});
  },


  // -----------------------------------------
  doReroll({commit, state}, {dice}) {
    if (state.phase !== 'main') {
      throw `trying to reroll when in the ${state.phase} phase is forbidden!`;
    }
    if (state.rerolled) {
      throw `only one reroll is allowed!`;
    }
    
    commit('rollDice', { dice });

    // forbid further rerolls
    commit('setRerolled');
  },

  doBuyDice({commit, state}, {diceToBuy, diceToSpend, diceToSpinDown}) {
    if (state.phase !== 'main') {
      throw `trying to buy dice when in the ${state.phase} phase is forbidden!`;
    }

    diceToBuy.forEach(die => commit('buyDie', { playerNum: state.currentTurn, die }));
    commit('moveAllDice', { source: 'reserve', dice:diceToSpend, dest: 'outOfPlay' });
    diceToSpinDown.forEach(die => commit('spinDown', {die}));
  },

  doField({commit, state}, {diceToField, diceToSpend, diceToSpinDown}) {
    if (state.phase !== 'main') {
      throw `trying to field characters when in the ${state.phase} phase is forbidden!`;
    }

    diceToField.forEach(die => {
      if (typeof die.card !== 'undefined' && typeof die.card.whenFielded !== 'undefined') {
        commit('addEffectToResolve', {die, effect:'whenFielded'});
      }
    });

    commit('moveAllDice', { source: 'reserve', dice:diceToField, dest: 'field' });
    commit('moveAllDice', { source: 'reserve', dice:diceToSpend, dest: 'outOfPlay' });
    diceToSpinDown.forEach(die => commit('spinDown', {die}));
  },


  startAttack({commit, state}) {
    if (state.phase !== 'main') {
      throw `trying to move to attack phase when in the ${state.phase} phase is forbidden!`;
    }
    if (state.selectedDice.length > 0) {
      throw `can't start attack while dice are still selected`;
    }
    
    const unfieldedCharacters = state.players[state.currentTurn].reserve.filter(die => die.face.type === 'character');
    commit('moveAllDice', { source: 'reserve', dice:unfieldedCharacters, dest: 'used' });
    commit('changePhase', {phase:'attack'});
  },

  finishTurn({commit, state}) {
    if (state.phase !== 'attack') {
      throw `trying to finish turn when in the ${state.phase} phase is forbidden!`;
    }
    if (state.selectedDice.length > 0) {
      throw `can't end turn while dice are still selected`;
    }

    // move all combatants appropriately
    state.players.forEach(player => {
      const koFielded = player.field.filter(die => die.ko);
      commit('moveAllDice', { source: 'field', dice: koFielded, dest: 'prep' });
      const koAttackers = player.attack.filter(die => die.ko);
      commit('moveAllDice', { source: 'attack', dice: koAttackers, dest: 'prep' });

      // anyone who damaged the opponent will already have been moved, so the remaining dice will have been blocked
      commit('moveAllDice', { source: 'attack', dest: 'field' });
    });
    
    // move all unused actions to used
    const unusedActions = state.players[state.currentTurn].reserve.filter(die => die.face.type === 'action');
    commit('moveAllDice', { source: 'reserve', dice:unusedActions, dest: 'used' });

    commit('moveAllDice', { source: 'outOfPlay', dest: 'used' });
    
    commit('endTurn');
  },


  // -----------------------------------------
  dieClicked({commit, state}, {die}) {
    // TODO: validate
    commit('toggleDieSelection', {die});
  },
  deselect({commit}, {dice}) {
    [...dice].forEach(die => {
      commit('toggleDieSelection', {die, selected:false});
    });
  },


  clearResolvedEffects({commit}) {
    commit('clearResolvedEffects');
  },
}



//                     _        _   _                 
//                    | |      | | (_)                
//     _ __ ___  _   _| |_ __ _| |_ _  ___  _ __  ___ 
//    | '_ ` _ \| | | | __/ _` | __| |/ _ \| '_ \/ __|
//    | | | | | | |_| | || (_| | |_| | (_) | | | \__ \
//    |_| |_| |_|\__,_|\__\__,_|\__|_|\___/|_| |_|___/
//
let nextDiceUid = 100;
const mutations = {
  addCardToPlayer(state, {playerNum, card, numDice}) {
    const player = state.players[playerNum];
    const cardInstance = {...card, numDice, owner: playerNum, dice: []};
    cardInstance.die = makeCharacterDie(cardInstance);
    for (let i=0; i<numDice; ++i) {
      const die = { ...cardInstance.die, uid: nextDiceUid++, card: cardInstance, location: 'card' };
      die.modifiers = [];
      roll(die);
      cardInstance.dice.push(die);
    }
    player.cards.push(cardInstance);

    if (cardInstance.global) {
      state.globals.push(cardInstance);
    }
  },

  addActionCard(state, {card, numDice}) {
    const cardInstance = {...card, numDice, tint: pickActionColour(state.actionCards), dice: []};
    cardInstance.die = makeActionDie(cardInstance);
    for (let i=0; i<numDice; ++i) {
      const die = { ...cardInstance.die, uid: nextDiceUid++, card: cardInstance, location: 'card' };
      die.modifiers = [];
      roll(die);
      cardInstance.dice.push(die);
    }
    state.actionCards.push(cardInstance);

    if (cardInstance.global) {
      state.globals.push(cardInstance);
    }
  },


  changePhase(state, { phase }) {
    state.phase = phase;
  },
  endTurn(state) {
    state.currentTurn = 1 - state.currentTurn;
    state.phase = 'roll';
    state.rerolled = false;

    state.players.forEach(player => {
      Object.values(player.ownedDice).forEach(die => {
        die.modifiers = [];
        die.ko = false;
      });
    });
  },
  setRerolled(state) {
    state.rerolled = true;
  },

  
  toggleDieSelection(state, payload) {
    const {die} = payload;

    if (typeof payload.selected !== 'undefined') {
      if (die.selected === payload.selected) {
        return;
      }
    }

    if (die.selected) {
      die.selected = false;
      state.selectedDice.splice(state.selectedDice.indexOf(die), 1);
    }
    else {
      die.selected = true;
      state.selectedDice.push(die);
    }
  },


  buyDie(state, {playerNum, die}) {
    const destName = 'used';
    const player = state.players[playerNum];
    const dest = player[destName];
    const source = die.card.dice;

    if (typeof die.card.owner !== 'undefined' &&  die.card.owner !== playerNum) {
      console.error(`tried to buy die ${die.uid} but it's owned by someone else`);
      console.log(die);
      console.log(card);
      return;
    }

    const sourceIx = source.findIndex(test => test.uid === die.uid);
    if (sourceIx < 0) {
      console.error(`tried to buy die ${die.uid} but we couldn't find where it came from`);
      console.log(die);
      console.log(source);
      return;
    }
    source.splice(sourceIx, 1);

    die.owner = playerNum;
    player.ownedDice[die.uid] = die;
    die.location = destName;
    roll(die);
    dest.push(die);
  },


  drawDie(state) {
    const player = state.players[state.currentTurn];
    const bag = player.bag;

    if (bag.length === 0) {
      console.error(`tried to draw die but the bag's empty!`);
      console.log(player);
      return;
    }

    const drawIx = Math.floor(Math.random() * bag.length);
    const die = bag.splice(drawIx, 1)[0];

    die.location = 'prep';
    roll(die);
    player.prep.push(die);
  },

  moveAllDice(state, payload) {
    const {source, dest} = payload;
    const player = state.players[state.currentTurn];
    const filtered = typeof payload.dice !== 'undefined';

    const dice = filtered ? payload.dice : player[source];
    while (dice.length > 0) {
      const die = dice.pop();
      if (filtered) {
        player[source].splice(player[source].indexOf(die), 1);
      }

      player[dest].push(die);
      die.location = dest;
    }
  },

  rollDice(state, { dice }) {
    dice.forEach(roll);
  },
  spinDown(state, {die}) {
    const energy = die.face.icon.replace('x2','');
    const newFace = die.faces.find(face => face.icon === energy);
    if (typeof newFace === 'undefined') {
      throw 'Cannot spin down a die that has no single-energy sides!';
    }
    die.face = newFace;
    die.modifiers.push({stat: 'spindown', amount: 1, source: 'spinDown'});
  },


  addModifier(state, {die, stat, amount, source}) {
    die.modifiers.push({stat, amount, source});
  },
  resetModifiers(state) {
    state.players.forEach(player => {
      Object.values(player.ownedDice).forEach(die => {
        die.modifiers = [];
      });
    });
  },


  damageDie(state, {die, amount, source}) {
    const defense = die.face.defense + getStatModAmount(die, 'defense') + getStatModAmount(die, 'hp');
    if (defense - amount > 0) {
      die.modifiers.push({stat: 'hp', amount: -amount, source});
    }
    else {
      die.ko = true;
    }
  },
  damagePlayer(state, {playerNum, amount, source}) {
    const player = state.players[playerNum];
    player.damageHistory.push({amount, source});
    player.health -= amount;

    if (player.health <= 0) {
      if (!state.finished) {
        state.finished = true;
        state.winner = 1-playerNum;
      }
    }
  },


  addEffectToResolve(state, {die, effect}) {
    state.effectsToResolve.push({ die, effect });
  },
  clearResolvedEffects(state) {
    state.effectsToResolve = [];
  },


  resetGame(state, {startingHealth}) {
    state.finished = false;
    state.winner = -1;

    state.players.forEach((player,playerNum) => {
      player.health = startingHealth;
      player.damageHistory = [];
      player.cards = [];
      player.ownedDice = {};
      
      player.bag = [];
      player.attack = [];
      player.field = [];
      player.reserve = [];
      player.prep = [];
      player.outOfPlay = [];
      player.used = [];

      // add 8 sidekicks to the bag
      for (let i=0; i<8; ++i) {
        const die = makeSidekickDie();
        die.uid = nextDiceUid++;
        die.owner = playerNum;
        die.location = 'bag';
        die.modifiers = [];
        roll(die);
        player.bag.push(die);
        player.ownedDice[die.uid] = die;
      }
    });

    state.actionCards = [];
  },
}


// ----------------------------
export default {
  state,
  actions,
  mutations,
};