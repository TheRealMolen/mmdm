<template>
  <div class="die" :style="{color:fg, background:bg, transform:`rotate(${state.angle}deg)`}">
    <inline-svg class="icon" :src="`img/${icon}.svg`" :fill="fg" />
    <div class="text tl">{{ field }}</div>
    <div class="text tr">{{ attack }}</div>
    <div class="text bl burst">{{ burst }}</div>
    <div class="text br">{{ defense }}</div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import InlineSvg from 'vue-inline-svg'

defineProps({
  icon: {type: String, default: ""},
  fg: {type: String, default: ""},
  bg: {type: String, default: ""},
  field: {type: String, default: ""},
  attack: {type: String, default: ""},
  defense: {type: String, default: ""},
  burst: {type: String, default: ""},
})

const state = reactive({ angle: 10 * (Math.random()-0.5) })
</script>

<style lang="less" scoped>
.die {
    display: inline-block;
    box-shadow: 0.3rem 0.3rem 0.3rem #666;
    border: 1px solid #999;
    width: 4rem;
    height: 4rem;
    border-radius: 0.35rem;
    position: relative;

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
            font-size: 1.0rem;
            bottom: -0.3rem;
        }
    }
}
</style>