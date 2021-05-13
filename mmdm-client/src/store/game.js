import uxm from '../rulesets/uxm';
import { makeActionDie, pickActionColour, makeCharacterDie, makeSidekickDie, findCard } from '../rulesets/util';


const newPlayer = (num, local) => ({
  num,
  name: `player${num}`,
  local,

  cards: [],

  health: -1,

  // all of our dices!
  bag: [],
  attackers: [],
  fielded: [],
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
  players: [newPlayer(0, true), newPlayer(1, false)],
  actionCards: [],
  globals: [],
  currentTurn: 0,//Math.floor(Math.random() * 2),
  phase: 'roll',
  rerolled: false,

  selectedDice: [],
});



//               _   _                 
//              | | (_)                
//     __ _  ___| |_ _  ___  _ __  ___ 
//    / _` |/ __| __| |/ _ \| '_ \/ __|
//   | (_| | (__| |_| | (_) | | | \__ \
//    \__,_|\___|\__|_|\___/|_| |_|___/
//
const actions = {
  setupStarterGame({ commit, state }) {
    commit('resetGame', {startingHealth: 10});

    commit('addCardToPlayer', {playerNum:0, card:findCard('Sprite', 'KittyPryde'), numDice:2});
    commit('addCardToPlayer', {playerNum:0, card:findCard('Optic Blast', 'Cyclops'), numDice:2});
    commit('addCardToPlayer', {playerNum:1, card:findCard('Air Transport', 'Angel'), numDice:2});
    commit('addCardToPlayer', {playerNum:1, card:findCard('Cain Marko', 'Juggernaut'), numDice:2});
    
    commit('addActionCard', {card:findCard('Ambush'), numDice:3});
    commit('addActionCard', {card:findCard('Enrage'), numDice:3});
    commit('addActionCard', {card:findCard('Reckless Melee'), numDice:3});
  },


  // ------------- p h a s e s --------------
  doRollPhase({commit, state}) {
    const player = state.players[state.currentTurn];

    commit('moveAllDice', { source:'reserve', dest: 'used' });
    commit('moveAllDice', { source:'outOfPlay', dest: 'used' });

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
  doReroll({commit, state}) {
    commit('rollDice', { dice: state.selectedDice });

    // make sure to deselect
    [...state.selectedDice].forEach(die => {
      commit('toggleDieSelection', {die, selected:false});
    });

    // forbid further rerolls
    commit('setRerolled');
  },


  // -----------------------------------------
  dieClicked({commit, state}, {die}) {
    // TODO: validate
    commit('toggleDieSelection', {die});
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
      cardInstance.dice.push({ faces: cardInstance.die.faces, uid: nextDiceUid++, card: cardInstance });
    }
    player.cards.push(cardInstance);

    if (cardInstance.globaltext) {
      state.globals.push(cardInstance);
    }
  },

  addActionCard(state, {card, numDice}) {
    const cardInstance = {...card, numDice, tint: pickActionColour(state.actionCards), dice: []};
    cardInstance.die = makeActionDie(cardInstance);
    for (let i=0; i<numDice; ++i) {
      cardInstance.dice.push({ faces: cardInstance.die.faces, uid: nextDiceUid++, card: cardInstance });
    }
    state.actionCards.push(cardInstance);

    if (cardInstance.globaltext) {
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
    const dest = state.players[playerNum][destName];
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

  moveAllDice(state, {source, dest}) {
    const player = state.players[state.currentTurn];
    player[source].forEach(die => {
      player[dest].push(die);
      die.location = dest;
    });
    player[source].splice(0, player[source].length);
  },

  rollDice(state, { dice }) {
    dice.forEach(roll);
  },


  resetGame(state, {startingHealth}) {
    state.players.forEach((player,playerNum) => {
      player.health = startingHealth;
      player.cards = [];
      
      player.bag = [];
      player.attackers = [];
      player.fielded = [];
      player.reserve = [];
      player.prep = [];
      player.outOfPlay = [];
      player.used = [];

      // add 8 sidekicks to the bag
      for (let i=0; i<8; ++i) {
        const die = makeSidekickDie();
        die.owner = playerNum;
        die.location = 'bag';
        roll(die);
        player.bag.push(die);
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