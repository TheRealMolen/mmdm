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

        <play-area :player="players[0]" class="mb-3" @die-clicked="console.log($event)" />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col action-area d-flex justify-content-center" v-if="!resolving">
        <div v-for="(move,moveIx) in moves" :key="moveIx" class="me-2">
          <button type="button" class="btn" :class="buttonStyle(move)" :title="buttonTooltip(move)" @click="attempt(move)">{{ move.name }}</button>
        </div>
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
      // TODO: gather moves
      const that = this;

      const phase = this.game.phase;
      if (phase === 'roll') {
        return [
          {
            name: "Roll",
            desc: "Take four dice from your bag, refilling if needed, and roll them along with any dice in your prep area",
            doit() {
              that.$store.dispatch('doRollPhase');
            }
          }
        ];
      }

      if (phase === 'main') {
        const moves = [];

        if (!this.game.rerolled) {
          moves.push({
            name: 'Reroll',
            desc: 'Reroll any number of rolled dice (you can only do this once per turn)',
            precondition() {
              if (!that.selected.length) {
                return 'You need to select at least one die to reroll';
              }
              if (that.selected.some(die => die.owner !== that.game.currentTurn)) {
                return 'You can only reroll dice you own';
              }
              if (that.selected.some(die => die.location !== 'reserve')) {
                return 'You can only reroll dice in your reserve';
              }
            },
            doit() {
              const dice = [...that.selected];
              that.$store.dispatch('deselect', {dice});
              that.$store.dispatch('doReroll', {dice});
            },
          });
        }
        
        moves.push({
          name: 'Buy',
          desc: 'Buy dice from cards (select dice and the energy to buy them)',
          precondition() {
            if (!that.selected.length) {
              return 'You need to select at least one die to buy';
            }
            const diceByLocation = splitDiceByLocation(that.selected);
            if (diceByLocation.card.length === 0) {
              return 'You need to select some dice to buy';
            }
            if (!diceByLocation.card.every(die => die.card.owner !== 1-that.game.currentTurn)) {
              return 'You can only buy dice from your own cards or from action cards';
            }
            if (!diceByLocation.reserve.every(die => die.owner === that.game.currentTurn)) {
              return 'You can only buy dice using energy you own';
            }
            if (!diceByLocation.reserve.every(die => die.face.type === 'energy')) {
              return 'You can only buy dice using energy';
            }
            if (diceByLocation.card.length + diceByLocation.reserve.length !== that.selected.length) {
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
          doit() {
            const diceByLocation = splitDiceByLocation(that.selected);
            const costs = calcPurchaseCosts(diceByLocation.card);
            const account = accountDiceVsCosts(diceByLocation.reserve, costs);

            if (account.tooMuch) {
              if (!confirm(`You're spending ${-account.total} energ${account.total === -1 ? 'y' : 'ies'} more than required. Are you sure?`)) {
                return;
              }
            }

            that.$store.dispatch('deselect', {dice: that.selected});
            that.$store.dispatch('doBuyDice', {diceToBuy: diceByLocation.card, diceToSpend: account.spent, diceToSpinDown: account.spinDown});
          },
        });

        moves.push({
          name: 'Field',
          desc: 'Send characters to the field (select characters and the energy to field them)',
          precondition() {
            if (!that.selected.length) {
              return 'You need to select at least one die to field';
            }
            if (!that.selected.every(die => die.owner === that.game.currentTurn)) {
              return 'You can only field dice you own';
            }
            if (!that.selected.every(die => die.location === 'reserve')) {
              return 'You can only field dice in your reserve';
            }
            
            const diceByType = splitDiceByFaceType(that.selected);
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
          doit() {
            const diceByType = splitDiceByFaceType(that.selected);
            const costs = calcFieldingCosts(diceByType.character);
            const account = accountDiceVsCosts(diceByType.energy, costs);

            if (account.tooMuch) {
              if (!confirm(`You're spending ${-account.total} energ${account.total === -1 ? 'y' : 'ies'} more than required. Are you sure?`)) {
                return;
              }
            }

            that.$store.dispatch('deselect', {dice: that.selected});
            that.$store.dispatch('doField', {diceToField: diceByType.character, diceToSpend: account.spent, diceToSpinDown: account.spinDown});
            
            // resolve effects
            if (that.game.effectsToResolve.length > 0) {
              that.resolving = true;
              that.$nextTick(() => {
                const promiseChain = that.game.effectsToResolve.reduce((promiseChain, effect) => {
                  return promiseChain.then(effect.die.card[effect.effect].resolve(effect.die));
                }, Promise.resolve());
                promiseChain.catch(err => alert(err));
                promiseChain.finally((resolve, reject) => {
                  that.$store.dispatch('clearResolvedEffects');
                  that.resolving = false;
                });
              });
            }
          },
        });

        this.game.globals.forEach(card => {
          moves.push({
            name: `Global: ${card.name}`,
            desc: card.globaltext,
          });
        });
        
        moves.push({
          name: 'Start Attack',
          desc: 'Move to the Attack phase',
          doit() {
            that.$store.dispatch('deselect', {dice: that.selected});
            that.$store.dispatch('startAttack');
          },
        });

        return moves;
      }

      if (phase === 'attack') {
        const moves = [];

        moves.push({
          name: 'End Turn',
          doit() {
            that.$store.dispatch('deselect', {dice: that.selected});
            that.$store.dispatch('finishTurn');
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
        const err = move.precondition();
        if (err) {
          alert(err);
          return;
        }
      }

      move.doit();
    },

    buttonStyle(move) {
      if (move.precondition) {
        const err = move.precondition();
        if (err) {
          return 'btn-secondary';
        }
      }
      return 'btn-primary';
    },
    buttonTooltip(move) {
      let msg = move.desc;
      if (move.precondition) {
        const err = move.precondition();
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