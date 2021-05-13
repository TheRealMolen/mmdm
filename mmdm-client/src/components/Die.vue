<template>
  <div
    class="die"
    :class="[size, selected?'selected':'']"
    :style="{
      color: fg,
      background: bg,
      '--inner-shadow-col': outlineCol,
      '--angle': safeAngle+'deg',
    }"
    @click="onClick"
  >
    <inline-svg class="icon" :src="`/mmdm/assets/img/${icon}.svg`" :fill="fg" />
    <div class="text tl">{{ field }}</div>
    <div class="text tr">{{ attack }}</div>
    <div class="text bl burst">{{ bursts }}</div>
    <div class="text br">{{ defense }}</div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";
import Color from "color";

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
    attack() {
      return this.die.face.attack;
    },
    defense() {
      return this.die.face.defense;
    },
    bursts() {
      return this.die.face.bursts;
    },

    selected() {
      return typeof this.die.selected !== 'undefined' && this.die.selected === true;
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

  &:hover {
    --shadow-offset: 0.5rem;
    --shadow-blur: 0.5rem;
    cursor: grab;
    transform: scale(1.2) rotate(var(--angle));
  }

  .icon {
    width: 100%;
    height: 100%;
  }

  .text {
    position: absolute;
    font-size: 0.8rem;
    font-weight: bold;

    &.tl {
      top: 0.2rem;
      left: 0.2rem;
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
    
    &.selected {
      --shadow-offset: 0.35rem;
      --shadow-blur: 0.6rem;
    }

    &:hover {
      --shadow-offset: 0.3rem;
      --shadow-blur: 0.45rem;
    }

    .text {
      font-size: 0.5rem;

      &.tl {
        top: 0.05rem;
        left: 0.13rem;
      }
      &.tr {
        top: 0.05rem;
        right: 0.13rem;
      }
      &.bl {
        bottom: 0;
        left: 0.13rem;
      }
      &.br {
        bottom: 0;
        right: 0.13rem;
      }

      &.burst {
        font-size: 0.8rem;
        bottom: -0.5rem;
      }
    }
  }
}
</style>