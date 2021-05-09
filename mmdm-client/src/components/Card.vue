<template>
  <div class="wrappr">
    <div class="card" :style="imageUrlVar"></div>
    <div class="die" v-if="card">
      <div v-for="(face,faceIx) in card.diceFaces" :key="faceIx">
        <die class="mr-2" :icon="face.icon" :bg="face.bg" :fg="face.fg" :field="face.field" :attack="face.attack" :defense="face.defense" :bursts="face.bursts" />
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
};
</script>

<style lang="less" scoped>
.card {
  margin: 0.75rem;
  display: inline-block;
  background-size: cover;
  background-image: var(--bgimg-url);
  border-radius: 1rem;
  width: 282px;
  height: 400px;
  box-shadow: 0.3rem 0.3rem 0.5rem #666;
}
.die {
  display: inline-block;
}
</style>