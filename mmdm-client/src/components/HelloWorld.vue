<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <img :src="'/mmdm/assets/img/UXMback.jpg'" class="w-75" />

        <h1>mmdm live</h1>
      </div>

      <div class="col-9">
        <div class="mb-2 d-inline-block " v-for="card in allCards" :key="card.id">
          <card :card="card" size="small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uxm from '../rulesets/uxm';
import Card from './Card.vue';
import Die from './Die.vue';

export default {
  components: {
    Card,
    Die,
  },

  computed: {
    game() {
      return this.$store.state.game;
    },

    allCards() {
      return uxm.cards.map(cardInfo => {
        const card = {...cardInfo};

        if (typeof card.character !== 'undefined') {
          const stats = uxm.characters[card.character];
          const fg = '#' + stats.fg;
          const bg = '#' + stats.bg;
          const oneEnergy = { fg, bg, icon:stats.energy };
          const twoEnergy = { fg, bg, icon:stats.energy+'x2' };
          const faces = [oneEnergy, twoEnergy, twoEnergy];
          for (let i=0; i<3; ++i) {
            const face = { fg, bg, icon:card.character.toLowerCase(), field:stats.faces[i][0], attack:stats.faces[i][1], defense:stats.faces[i][2] };
            if (stats.bursts && stats.bursts[i] > 0) {
              face.bursts = '****'.substring(0, stats.bursts[i]);
            }
            faces.push(face);
          }

          card.diceFaces = faces;
        }
        else {
          card.diceFaces = [];
          for (let i=0; i<3; ++i) {
            card.diceFaces.push({bg:'white', fg:'#222', icon:'two'});
          }
          let bursts = '';
          for (let i=0; i<3; ++i) {
            card.diceFaces.push({bg:'white', fg:'#222', icon:'action', bursts});
            bursts += '*';
          }
        }

        return card;
      });
    },
  },

  mounted() {
    this.$store.dispatch('setupStarterGame');
  },
}
</script>

<style scoped>
</style>
