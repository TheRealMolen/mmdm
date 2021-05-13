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
      <div class="col action-area d-flex justify-content-center">
        <div v-for="(move,moveIx) in moves" :key="moveIx" class="me-2">
          <button type="button" class="btn" :class="buttonStyle(move)" :title="move.desc" @click="attempt(move)">{{ move.name }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CardArea from './CardArea.vue';
import PlayArea from './PlayArea.vue';

export default {
  components: {
    CardArea,
    PlayArea,
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
              that.$store.dispatch('doReroll');
            },
          });
        }
        
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
            if (!that.selected.some(die => die.face.type === 'character')) {
              return 'You need to select some characters to field';
            }
            
          },
          doit() {
            that.$store.dispatch('doField');
            // TODO: resolve effects in game.effectsToRresolve
          },
        });
        
        moves.push({
          name: 'Buy',
          desc: 'Buy dice from cards (select dice and the energy to buy them)',
          precondition() {
            if (!that.selected.length) {
              return 'You need to select at least one die to buy';
            }
            if (!that.selected.every(die => die.owner !== 1-that.game.currentTurn)) {
              return 'You can only field dice you own';
            }
          },
          doit() {
            that.$store.dispatch('doBuyDice');
            // TODO: resolve effects in game.effectsToRresolve
          },
        });

        this.game.globals.forEach(card => {
          moves.push({
            name: `Global: ${card.name}`,
            desc: card.globaltext,
          });
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
  },

  mounted() {
    this.$store.dispatch('setupStarterGame');
  },
};
</script>

<style lang="less" scoped>
</style>