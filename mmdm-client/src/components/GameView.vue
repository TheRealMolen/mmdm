<template>
  <div class="container-fluid">
    <div class="row px-3">

      <div class="col-5 card-area">
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col">
              <card-area :cards="players[1].cards" />
              <div class="text-end"><strong>{{ players[1].name }}</strong> - {{ players[1].health }}hp</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <card-area :cards="game.actionCards" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-end"><strong>{{ players[0].name }}</strong> - {{ players[0].health }}hp</div>
              <card-area :cards="players[0].cards" />
              
            </div>
          </div>
        </div>
      </div>

      <div class="col-7 play-area d-flex flex-column">
        <play-area :player="players[1]" :invert="true" class="mb-3" />

        <div class="mb-3 action-area d-flex justify-content-center" v-if="!resolving">
          <div v-for="(move,moveIx) in moves" :key="moveIx" class="me-2">
            <button type="button" class="btn" :class="buttonStyle(move)" :title="buttonTooltip(move)" @click="attempt(move)">{{ move.name }}</button>
          </div>
        </div>

        <play-area :player="players[0]" class="mb-3" @die-clicked="console.log($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import {splitDiceByFaceType, splitDiceByLocation, calcFieldingCosts, calcPurchaseCosts, accountDiceVsCosts} from '../rulesets/util';
import CardArea from './CardArea.vue';
import PlayArea from './PlayArea.vue';

export default {
  components: {
    CardArea,
    PlayArea,
  },

  data() {
    return {
      resolving: false,
    };
  },

  computed: {
    game() {
      return this.$store.state.game;
    },
    players() {
      return this.$store.state.game.players;
    },
    selected() {
      return this.$store.state.game.selectedDice;
    },

    moves() {
      const phase = this.game.phase;
      if (phase === 'roll') {
        return [
          {
            name: "Roll",
            desc: "Take four dice from your bag, refilling if needed, and roll them along with any dice in your prep area",
            doit({dispatch}) {
              dispatch('doRollPhase');
            }
          }
        ];
      }

      if (phase === 'main') {
        const moves = [];

        moves.push({
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
        });
        
        moves.push({
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
        });

        moves.push({
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
          doit({game, gameui, dispatch}) {
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
            
            // resolve effects
            if (game.effectsToResolve.length > 0) {
              gameui.resolving = true;
              gameui.$nextTick(() => {
                const promiseChain = game.effectsToResolve.reduce((promiseChain, effect) => {
                  return promiseChain.then(effect.die.card[effect.effect].resolve(effect.die));
                }, Promise.resolve());
                promiseChain.catch(err => alert(err));
                promiseChain.finally((resolve, reject) => {
                  dispatch('clearResolvedEffects');
                  gameui.resolving = false;
                });
              });
            }
          },
        });

        this.selected.forEach(die => {
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

        this.game.globals.forEach(card => {
          if (typeof card.global.phase !== 'undefined' && phase !== card.global.phase) {
            return;
          }

          moves.push({
            name: card.name,
            desc: card.global.text,
            precondition: card.global.precondition,
            doit: payload => {
              card.global.doit(payload);  
              payload.dispatch('deselect', {dice: payload.game.selectedDice});              
            },
          });
        });
        
        moves.push({
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
        });

        return moves;
      }

      if (phase === 'attack') {
        const moves = [];
        
        moves.push({
          name: 'Attack',
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
        });

        this.game.globals.forEach(card => {
          if (typeof card.global.phase !== 'undefined' && phase !== card.global.phase) {
            return;
          }
          
          moves.push({
            name: card.name,
            desc: card.global.text,
            precondition: card.global.precondition,
            doit: payload => {
              card.global.doit(payload);  
              payload.dispatch('deselect', {dice: payload.game.selectedDice});              
            },
          });
        });

        moves.push({
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
        });

        return moves;
      }

      return [];
    },
  },

  methods: {
    attempt(move) {
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          alert(err);
          return;
        }
      }

      move.doit({game: this.game, dispatch: this.$store.dispatch, commit: this.$store.commit, gameui: this});
    },

    buttonStyle(move) {
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          return 'btn-secondary';
        }
      }
      return 'btn-primary';
    },
    buttonTooltip(move) {
      let msg = move.desc;
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          msg += '\n\n' + err;
        }
      }
      return msg;
    },
  },

  mounted() {
    this.$store.dispatch('setupStarterGame');
  },
};
</script>

<style lang="less" scoped>
</style>