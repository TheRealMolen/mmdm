<template>
  <div class="play-mat" :class="{invert}">
    <div class="attack area">
      ATTACK
      <div class="overlay">
        <dice-area size="small" :dice="player.attackers" />
      </div>
    </div>
    <div class="field area">
      feld
      <div class="overlay">
        <dice-area size="small" :dice="player.fielded" />
      </div>
    </div>
    <div class="used area">
      USD
      <div class="overlay">
        <dice-area size="small" :dice="player.used" />
      </div>
    </div>
    <div class="reserve area">
      RERV
      <div class="overlay">
        <dice-area size="small" :dice="player.bag" />
      </div>
    </div>
    <div class="prep area">
      PROOOPP
      <div class="overlay">
        <dice-area size="small" :dice="player.prep" />
      </div>
    </div>
    <div class="oop pt-5">
      out<br>of<br>play
      <div class="overlay">
        <dice-area size="small" :dice="player.outOfPlay" />
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
    invert: {type: Boolean, default: false },
  },
}
</script>

<style lang="less" scoped>
.play-mat {
  display: grid;
  min-height: 22rem;
  grid-template-columns: 12% 16% 56% 16%;
  grid-template-rows: 20% 25% 55%;
  grid-template-areas: 
    "oop attack attack attack"
    "oop used field prep"
    "oop used reserve prep";

  &.invert {
    grid-template-rows: 55% 25% 20%;
    grid-template-areas: 
      "oop prep reserve used"
      "oop prep field used"
      "oop attack attack attack";
    }

  & > div {
    position: relative;
  }

  .area {
    border: 2px solid #555;
    margin: -2px 0 0 -2px;
  }

  .attack {
    grid-area: attack;
  }
  .used {
    grid-area: used;
  }
  .field {
    grid-area: field;
  }
  .prep {
    grid-area: prep;
  }
  .reserve {
    grid-area: reserve;
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
  }
}
</style>