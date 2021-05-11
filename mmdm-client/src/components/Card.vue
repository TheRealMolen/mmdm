<template>
  <div class="d-flex">
    <div class="position-relative">
      <div class="card" :class="size" :style="imageUrlVar"></div>
      <div v-for="(slot,slotIx) in slots" :key="slotIx" class="position-absolute" :style="{left:slot.left+'%', top:slot.top+'%'}">
        <die class="mb-1"
          :size="size"
          :angle="slot.angle"
          :icon="slot.face.icon"
          :bg="slot.face.bg"
          :fg="slot.face.fg"
          :field="slot.face.field"
          :attack="slot.face.attack"
          :defense="slot.face.defense"
          :bursts="slot.face.bursts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Die from "./Die.vue";

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
  },


  methods: {
    computeSlots() {
      const slots = [];
      const rand = max => Math.random() * max;
      const face = () => this.card.diceFaces[Math.floor(Math.random() * this.card.diceFaces.length)];
      
      slots.push({ left: 20 + rand(10), top: 12 + rand(8), angle: -90 + rand(180), face: face() });
      slots.push({ left: 51 + rand(10), top: 12 + rand(8), angle: -90 + rand(180), face: face() });
      slots.push({ left: 20 + rand(10), top: 36 + rand(8), angle: -90 + rand(180), face: face() });
      slots.push({ left: 51 + rand(10), top: 36 + rand(8), angle: -90 + rand(180), face: face() });

      return slots;
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: 0.75rem;
  background-color: #888;;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: var(--bgimg-url);
  border-radius: 1rem;
  width: 282px;
  height: 400px;
  box-shadow: 0.1rem 0.1rem 0.2rem #666;
  border: 0;

  &.small {
    border-radius: 0.5rem;
    width: 142px;
    height: 200px;
  }
}
</style>