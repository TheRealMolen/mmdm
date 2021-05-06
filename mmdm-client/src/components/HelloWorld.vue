<template>
  <div>
    <img src="img/UXMback.jpg" />

    <h1>mmdm live</h1>

    <die class="mr-2" icon="mask" bg="#fb4" fg="006" field="0" attack="2" defense="3" />
    <die class="mr-2" icon="shield" bg="#101238" fg="#fff" field="6" attack="5" defense="7" burst="*" />
    <die class="mr-2" icon="fistx2" bg="#5ee690" fg="#1a1e5c" />
    <die class="mr-2" icon="prawn" bg="#fff" fg="#000" field="0" attack="1" defense="1" />
    <die class="mr-2" icon="two" bg="#fff" fg="purple" />
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import Die from './Die.vue';

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}
</style>
