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

        <div class="mb-3 action-area d-flex justify-content-center" v-if="allowLocalInput && !resolving">
          <div class="phase-name align-self-center me-1">{{ game.phase }}<span v-if="game.subphase !== ''">-{{ game.subphase }}</span>
            phase</div>
          <div class="align-self-center me-2">
            <icon :icon="['fas', arrowStyle]" size="2x" /> 
          </div>
          <div v-for="(move,moveIx) in moves" :key="moveIx" class="me-2">
            <move-button :move="move" />
          </div>
          <div class="align-self-center">
            <icon :icon="['fas', arrowStyle]" size="2x" /> 
          </div>
        </div>
        <div class="mb-3 action-area d-flex justify-content-center" v-if="!allowLocalInput">
          <em>waiting for opponent's move...</em>
        </div>

        <play-area :player="players[0]" class="mb-3" @die-clicked="console.log($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import CardArea from './CardArea.vue';
import MoveButton from './MoveButton.vue';
import PlayArea from './PlayArea.vue';
import { gatherMoves } from '../rulesets/moves';

export default {
  components: {
    CardArea,
    MoveButton,
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
    allowLocalInput() {
      return this.$store.getters.allowLocalInput;
    },
    selected() {
      return this.$store.state.game.selectedDice;
    },
    effectsToResolve() {
      return this.$store.state.game.effectsToResolve;
    },

    moves() {
      return gatherMoves(this.game);
    },

    arrowStyle() {
      return this.game.activePlayer === 0 ? 'arrow-down' : 'arrow-up';
    },
  },

  watch: {
    effectsToResolve: {
      // resolve effects
      handler(effectsToResolve) {
        if (effectsToResolve.length == 0) {
          return;
        }
        if (this.resolving) {
          return;
        }

        console.log(`resolving ${effectsToResolve.length} effects...`);
        this.resolving = true;
        this.$nextTick(() => {
          const promiseChain = this.game.effectsToResolve.reduce((promiseChain, effect) => {
            return promiseChain.then(effect.die.card[effect.effect].resolve(effect.die));
          }, Promise.resolve());
          promiseChain.catch(err => alert(err));
          promiseChain.finally(() => {
            this.$store.dispatch('clearResolvedEffects');
            this.resolving = false;
            console.log('finished resolving effects 👍');
          });
        });
      },
      deep: true,
    },
  },

  mounted() {
    this.$store.dispatch('setupStarterGame');
  },
};
</script>

<style lang="less" scoped>
.phase-name {
  text-transform: uppercase;
  flex-basis: 0;
  font-size: 75%;
  line-height: 1;
}
</style>