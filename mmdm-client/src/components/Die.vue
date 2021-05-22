<template>
  <div
    class="die"
    :class="[size, selected?'selected':'', outOfPlay?'outOfPlay':'']"
    :style="{
      color: fg,
      background: bg,
      '--inner-shadow-col': outlineCol,
      '--angle': safeAngle+'deg',
    }"
    @click="onClick"
  >
    <inline-svg class="icon" :src="`/mmdm/assets/img/${icon}.svg`" :fill="fg" />
    <div class="text tl"><div v-if="fieldMod" class="modifier">{{fieldMod}}</div>{{ field }}&nbsp;</div>
    <div class="text tr">&nbsp;{{ attack }} <div v-if="attackMod" class="modifier">{{attackMod}}</div></div>
    <div class="text bl burst">{{ bursts }}&nbsp;</div>
    <div class="text br">&nbsp;{{ defense }} <div v-if="defenseMod" class="modifier">{{defenseMod}}</div></div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";
import Color from "color";
import { getStatModDisplay } from '../rulesets/util';

export default {
  components: {
    InlineSvg,
  },

  props: {
    die: { type: Object, required: true },
    size: { type: String, default: "large" },
    angle: { type: Number },
    maxAngle: { type: Number, default: 5 },
  },

  computed: {
    icon() {
      return this.die.face.icon;
    },
    fg() {
      return this.die.face.fg;
    },
    bg() {
      return this.die.face.bg;
    },
    field() {
      return this.die.face.field;
    },
    fieldMod() {
      return getStatModDisplay(this.die, 'field', 'F');
    },
    attack() {
      return this.die.face.attack;
    },
    attackMod() {
      return getStatModDisplay(this.die, 'attack', 'A');
    },
    defense() {
      return this.die.face.defense;
    },
    defenseMod() {
      const dMod = getStatModDisplay(this.die, 'defense', 'D');
      const hpMod = getStatModDisplay(this.die, 'hp', 'hp');
      if (dMod && hpMod) {
        return `${dMod},${hpMod}`;
      }
      if (dMod) {
        return dMod;
      }
      return hpMod;
    },
    bursts() {
      return this.die.face.bursts;
    },

    selected() {
      return typeof this.die.selected !== 'undefined' && this.die.selected === true;
    },

    outOfPlay() {
      return typeof this.die.location !== 'undefined' && this.die.location === 'outOfPlay';
    },

    outlineCol() {
      return Color(this.bg).saturate(1.8).darken(0.75);
    },

    safeAngle() {
      if (this.angle) return this.angle;
      return 2 * this.maxAngle * (Math.random() - 0.5);
    },
  },

  methods: {
    onClick() {
      if (this.die.location === 'outOfPlay') {
        return;
      }
      this.$store.dispatch('dieClicked', { die: this.die });
    },
  },
};
</script>

<style lang="less" scoped>

@keyframes selected {
  0%   {
      transform: scale(1.4) rotate(var(--angle)); 
    }
  100% {
      transform: scale(1.5) rotate(var(--angle));
    }
}

.die {
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.35rem;
  position: relative;
  --shadow-offset: 0.3rem;
  --shadow-blur: 0.3rem;
  --edge-thickness: 0.25rem;
  box-shadow: var(--shadow-offset) var(--shadow-offset) var(--shadow-blur) rgba(0, 0, 0, 0.4),
    inset 0 0 var(--edge-thickness) var(--inner-shadow-col);
  box-sizing: content-box;
  transform: rotate(var(--angle));

  &.selected {
    animation: selected 0.25s alternate infinite ease-in-out;
    --shadow-offset: 0.6rem;
    --shadow-blur: 0.7rem;
  }

  &:not(.outOfPlay):hover {
    --shadow-offset: 0.5rem;
    --shadow-blur: 0.5rem;
    cursor: grab;
    transform: scale(1.2) rotate(var(--angle));
  }

  .icon {
    width: 100%;
    height: 100%;
  }

  .modifier {
    position: absolute;
    left: 0.6rem;
    top: 0;
    color: #222;
    user-select: none;
  }

  .text {
    position: absolute;
    font-size: 0.8rem;
    font-weight: bold;
    user-select: none;

    &.tl {
      top: 0.2rem;
      left: 0.2rem;
      
      .modifier {
        left: 0.6rem;
        top: 0.1rem;
      }
    }
    &.tr {
      top: 0.2rem;
      right: 0.2rem;
    }
    &.bl {
      bottom: 0.2rem;
      left: 0.2rem;
    }
    &.br {
      bottom: 0.2rem;
      right: 0.2rem;
    }

    &.burst {
      font-size: 1.5rem;
      bottom: -0.7rem;
    }
  }

  &.small {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
    --shadow-offset: 0.16rem;
    --shadow-blur: 0.2rem;
    --edge-thickness: 0.18rem;
    
    .modifier {
      left: 0.4rem;
    }
    
    &.selected {
      --shadow-offset: 0.35rem;
      --shadow-blur: 0.6rem;
    }

    &:not(.outOfPlay):hover {
      --shadow-offset: 0.3rem;
      --shadow-blur: 0.45rem;
    }

    .text {
      font-size: 0.5rem;

      &.tl {
        top: 0.05rem;
        left: 0.13rem;
      
        .modifier {
          right: 0.6rem;
          top: 0;
          left: unset;
        }
      }
      &.tr {
        top: 0.05rem;
        right: 0.13rem;
      
        .modifier {
          left: 0.5rem;
          top: 0;
          right: unset;
        }
      }
      &.bl {
        bottom: 0;
        left: 0.13rem;
      }
      &.br {
        bottom: 0;
        right: 0.13rem;
        
        .modifier {
          left: 0.5rem;
          bottom: 0.1rem;
          right: unset;
        }
      }

      &.burst {
        font-size: 0.8rem;
        bottom: -0.5rem;
      }
    }
  }
}
</style>