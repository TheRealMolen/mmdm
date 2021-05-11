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
  nextTurn: Math.floor(Math.random() * 2),
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

    // -----
    commit('buyDie', {playerNum:0, die:state.actionCards[0].dice[0]});
    commit('buyDie', {playerNum:0, die:state.actionCards[1].dice[1]});
    commit('buyDie', {playerNum:1, die:state.actionCards[2].dice[2]});
    commit('buyDie', {playerNum:0, die:state.actionCards[2].dice[1]});
    commit('buyDie', {playerNum:0, die:state.players[0].cards[0].dice[1]});
    commit('buyDie', {playerNum:0, die:state.players[0].cards[0].dice[0]});
    commit('buyDie', {playerNum:0, die:state.players[0].cards[1].dice[0]});
    commit('buyDie', {playerNum:1, die:state.players[1].cards[0].dice[1]});
    commit('buyDie', {playerNum:1, die:state.players[1].cards[1].dice[0]});
    commit('buyDie', {playerNum:1, die:state.players[1].cards[1].dice[0]});
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
  },

  addActionCard(state, {card, numDice}) {
    const cardInstance = {...card, numDice, tint: pickActionColour(state.actionCards), dice: []};
    cardInstance.die = makeActionDie(cardInstance);
    for (let i=0; i<numDice; ++i) {
      cardInstance.dice.push({ faces: cardInstance.die.faces, uid: nextDiceUid++, card: cardInstance });
    }
    state.actionCards.push(cardInstance);
  },

  buyDie(state, {playerNum, die}) {
    const dest = state.players[playerNum].used;
    const source = die.card.dice;

    const sourceIx = source.findIndex(test => { test.uid === die.uid; });
    source.splice(sourceIx, 1);

    roll(die);
    dest.push(die);
  },

  resetGame(state, {startingHealth}) {
    state.players.forEach(player => {
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