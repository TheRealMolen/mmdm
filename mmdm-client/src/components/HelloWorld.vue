<template>
  <div>
    <img src="img/UXMback.jpg" />

    <h1>mmdm live</h1>

    <!--div class="mb-2" v-for="(character,charIndex) in characterDice" :key="charIndex">
      <div class="d-inline" v-for="(dice,dieIndex) in character" :key="dieIndex">
        <die class="mr-2" :icon="dice.icon" :bg="dice.bg" :fg="dice.fg" :field="dice.field" :attack="dice.attack" :defense="dice.defense" :bursts="dice.bursts" />
      </div>
    </div-->

    <div class="mb-2" v-for="card in allCards" :key="card.id">
      <card :card="card" />
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
    characterDice() {
      return Object.entries(uxm.characters).map(([who,stats]) => {
        const fg = '#' + stats.fg;
        const bg = '#' + stats.bg;
        const oneEnergy = { fg, bg, icon:stats.energy };
        const twoEnergy = { fg, bg, icon:stats.energy+'x2' };
        const dice = [oneEnergy, twoEnergy, twoEnergy];
        for (let i=0; i<3; ++i) {
          const die = { fg, bg, icon:who.toLowerCase(), field:stats.faces[i][0], attack:stats.faces[i][1], defense:stats.faces[i][2] };
          if (stats.bursts && stats.bursts[i] > 0) {
            die.bursts = '****'.substring(0, stats.bursts[i]);
          }
          dice.push(die);
        }
        return dice;
      });
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
}
</script>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.d-inline {
  display: inline;
}
</style>
