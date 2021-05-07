<template>
  <div>
    <img src="img/UXMback.jpg" />

    <h1>mmdm live</h1>

    <die class="mr-2" icon="mask" bg="#fb4" fg="#006" field="0" attack="2" defense="3" />
    <die class="mr-2" icon="shield" bg="#101238" fg="#fff" field="6" attack="5" defense="7" bursts="*" />
    <die class="mr-2" icon="fistx2" bg="#5ee690" fg="#1a1e5c" />
    <die class="mr-2" icon="prawn" bg="#fff" fg="#000" field="0" attack="1" defense="1" />
    <die class="mr-2" icon="two" bg="#fff" fg="purple" />
    <die class="mr-2 mb-2" icon="action" bg="#fff" fg="orange" />

    <div class="mb-2" v-for="(character,charIndex) in characterDice" :key="charIndex">
      <div class="d-inline" v-for="(dice,dieIndex) in character" :key="dieIndex">
        <die class="mr-2" :icon="dice.icon" :bg="dice.bg" :fg="dice.fg" :field="dice.field" :attack="dice.attack" :defense="dice.defense" :bursts="dice.bursts" />
      </div>
    </div>
  </div>
</template>

<script>
import uxmData from '../assets/data/UXMdata.json';
import Die from './Die.vue';

export default {
  components: {
    Die,
  },

  computed: {
    characterDice() {
      return Object.entries(uxmData.characters).map(([who,stats]) => {
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
