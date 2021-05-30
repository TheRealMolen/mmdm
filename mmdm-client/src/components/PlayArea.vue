<template>
  <div class="play-mat" :class="{invert, active}">
    <div class="attack area">
      ATTACK
      <div class="overlay">
        <dice-area size="small" :dice="player.attack" />
      </div>
    </div>
    <div class="field area">
      FIELD
      <div class="overlay">
        <dice-area size="small" :dice="player.field" />
      </div>
    </div>
    <div class="used area">
      USED
      <div class="overlay">
        <dice-area size="small" :dice="player.used" />
      </div>
    </div>
    <div class="reserve area">
      RESERVE
      <div class="overlay">
        <dice-area size="small" :dice="player.reserve" />
      </div>
    </div>
    <div class="prep area">
      PREP
      <div class="overlay">
        <dice-area size="small" :dice="player.prep" />
      </div>
    </div>
    <div class="oop pt-5 d-flex flex-column">
      <div class="flex-grow-1">
        out<br>of<br>play
        <div class="overlay">
          <dice-area size="small" :dice="player.outOfPlay" />
        </div>
      </div>
      <div class="bag">
        {{ bagCount }} dice in bag
      </div>
    </div>
  </div>
</template>

<script>
import DiceArea from './DiceArea.vue';

export default {
  components: {
    DiceArea,
  },

  props: {
    player: { type: Object, required: true },
    invert: { type: Boolean, default: false },
  },

  computed: {
    active() { 
      return this.$store.state.game.currentTurn === this.player.num;
    },

    bagCount() {
      const count = this.player.bag.length;
      if (this.player.local) {
        return count;
      }
      if (count === 0) {
        return "No";
      }
      if (count < 4) {
        return "A few";
      }
      if (count > 10) {
        return "Loads of";
      }
      return "Some";
    },
  },
}
</script>

<style lang="less" scoped>
.play-mat {
  display: grid;
  min-height: 20rem;
  grid-template-columns: 12% 16% 56% 16%;
  grid-template-rows: 10% 30% 60%;
  grid-template-areas: 
    "oop attack attack attack"
    "oop used field prep"
    "oop used reserve prep";

  &.invert {
    grid-template-rows: 60% 30% 10%;
    grid-template-areas: 
      "oop prep reserve used"
      "oop prep field used"
      "oop attack attack attack";

    &.active {
      grid-template-rows: 48% 22% 30%;
    }
  }

  &.active {
    background-color: #8d8;
    min-height: 24rem;
    grid-template-rows: 30% 22% 48%;
  }

  & > div {
    position: relative;
  }

  .area {
    border: 2px solid #333;
    margin: -2px 0 0 -2px;
  }

  .attack {
    grid-area: attack;
    background-color: #E68E83;

    .overlay {
      padding: 0;
    }
  }
  .used {
    grid-area: used;
    background-color: #70A3BF;
  }
  .field {
    grid-area: field;
    background-color: #C0D682;
  }
  .prep {
    grid-area: prep;
    background-color: #DFD290;
  }
  .reserve {
    grid-area: reserve;
    background-color: #F2EBD4;
  }
  .oop {
    grid-area: oop;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 3%;
  }
}
</style>