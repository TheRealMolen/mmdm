<template>
  <div class="d-flex">
    <div class="position-relative">
      <div class="card" :class="size" :style="imageUrlVar"></div>
      <div v-for="die in card.dice" :key="die.uid" class="position-absolute" :style="{left:slots[die.uid].left+'%', top:slots[die.uid].top+'%'}">
        <die class="mb-1"
          :size="size"
          :angle="slots[die.uid].angle"
          :icon="die.face.icon"
          :bg="die.face.bg"
          :fg="die.face.fg"
          :field="die.face.field"
          :attack="die.face.attack"
          :defense="die.face.defense"
          :bursts="die.face.bursts"
        />
      </div>

      <div v-if="card.die.type == 'action'" class="tint" :class="size" :style="{'--tint': tint}">
      </div>
    </div>
  </div>
</template>

<script>
import Die from "./Die.vue";
import Color from 'color';

export default {
  components: {
    Die,
  },

  props: {
    pack: { type: String, default: "UXM" },
    id: { type: String },
    card: { type: Object, default: {} },
    size: { type: String, default: 'large' },
  },

  data() {
    return {
      slots: this.computeSlots(),
    };
  },

  computed: {
    safeId() {
      if (this.card !== {}) {
        return this.card.id;
      }
      return this.id;
    },

    imageUrlVar() {
      return { "--bgimg-url": `url(/mmdm/assets/img/${this.pack}${this.safeId}.jpg)` };
    },
  
    tint() {
      return Color(this.card.tint).alpha(0.5);
    },
  },


  methods: {
    computeSlots() {
      const rand = max => Math.random() * max;
      const face = (die) => die.faces[Math.floor(rand(die.faces.length))];
      
      const spaces = [];
      spaces.push({ left: 14 + rand(12), top: 10 + rand(8) });
      spaces.push({ left: 53 + rand(12), top: 10 + rand(8) });
      spaces.push({ left: 14 + rand(12), top: 38 + rand(8) });
      spaces.push({ left: 53 + rand(12), top: 38 + rand(8) });

      const dice = this.card.dice;
      const slots = {};
      dice.forEach((die,ix) => {
        slots[die.uid] = {...spaces[ix], angle: -90 + rand(180)};
        die.face = face(die);
      });

      return slots;
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: 0.25rem;
  background-color: #888;;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: var(--bgimg-url);
  border-radius: 1rem;
  width: 282px;
  height: 400px;
  box-shadow: 0.1rem 0.1rem 0.15rem #666;
  border: 0;

  &.small {
    border-radius: 0.5rem;
    width: 142px;
    height: 200px;
  }
}

.tint {
  position: absolute;
  width: 90%;
  height: 50px;
  bottom: 12px;
  left: 5%;
  background-color: var(--tint);
  mix-blend-mode: darken;
  border-radius: 5px;
  
  &.small {
    height: 24px;
    bottom: 8px;
  }
}
</style>