<template>
  <div class="d-flex flex-wrap justify-content-evenly pt-4">
    <div v-for="die in dice" :key="die.uid" class="die-container" :class="size">
      <die class="mb-1"
        :size="size"
        :max-angle="20"
        :die="die"
      />
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
    dice: {type: Array, required: true},
    size: {type: String, default: 'large'},
  },
  
}
</script>

<style lang="less" scoped>
.die-container {
  width: 4.5rem;
  height: 4.5rem;
  padding-top: 0.3rem;
  z-index: 10;

  &.small {
    width: 2.7rem;
    height: 2.7rem;
    padding-top: 0.1rem;
  }
}
</style>