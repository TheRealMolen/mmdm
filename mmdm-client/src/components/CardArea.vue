<template>
  <div class="d-flex justify-content-end flex-wrap">
    <card v-for="(card,cardIx) in cards" :key="cardIx" :card="card" size="small" />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },

  props: {
    'cards': { type: Array, required: true },
  },
  
}
</script>

<style lang="less" scoped>

</style>
