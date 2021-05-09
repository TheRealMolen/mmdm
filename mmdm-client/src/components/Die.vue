<template>
  <div class="die" :style="{color:fg, background:bg, 'box-shadow': `0.3rem 0.3rem 0.3rem #666, inset 0 0 0.25rem ${outlineCol}`, transform:`rotate(${angle}deg)`}">
    <inline-svg class="icon" :src="`/mmdm/assets/img/${icon}.svg`" :fill="fg" />
    <div class="text tl">{{ field }}</div>
    <div class="text tr">{{ attack }}</div>
    <div class="text bl burst">{{ bursts }}</div>
    <div class="text br">{{ defense }}</div>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg'
import Color from 'color';

export default {
    components: {
        InlineSvg,
    },

    props: {
        icon: {type: String, default: ""},
        fg: {type: String, default: "#000000"},
        bg: {type: String, default: "#ffffff"},
        field: {type: String, default: ""},
        attack: {type: String, default: ""},
        defense: {type: String, default: ""},
        bursts: {type: String, default: ""},
    },

    data() {
        return {
            angle: 10 * (Math.random()-0.5),
        };
    },

    computed: {
        outlineCol() { return Color(this.bg).saturate(1.8).darken(0.75); },
    },
};
</script>

<style lang="less" scoped>
.die {
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
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
            font-size: 1.5rem;
            bottom: -0.7rem;
        }
    }
}
</style>