<template>
  <div class="die" :class="size" :style="{color:fg, background:bg, '--inner-shadow-col':outlineCol, transform:`rotate(${safeAngle}deg)`}">
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

        size: {type: String, default: "large" },
        angle: {type: Number},
        maxAngle: {type: Number, default: 5},
    },

    computed: {
        outlineCol() { return Color(this.bg).saturate(1.8).darken(0.75); },

        safeAngle() {
            if (this.angle)
                return this.angle;
            return 2 * this.maxAngle * (Math.random()-0.5);
        },
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
    box-shadow: 0.3rem 0.3rem 0.3rem rgba(0,0,0,0.4), inset 0 0 0.25rem var(--inner-shadow-col);
    box-sizing: content-box;

    &:hover {
        border: 2px solid lime;
        box-shadow: 0.5rem 0.5rem 0.5rem rgba(0,0,0,0.4), inset 0 0 0.25rem var(--inner-shadow-col);
        cursor: grab;
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
        width: 2.0rem;
        height: 2.0rem;
        border-radius: 0.2rem;
        box-shadow: 0.16rem 0.16rem 0.2rem rgba(0,0,0,0.6), inset 0 0 0.18rem var(--inner-shadow-col);

        &:hover {
            box-shadow: 0.3rem 0.3rem 0.45rem rgba(0,0,0,0.6), inset 0 0 0.18rem var(--inner-shadow-col);
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
                bottom: -0.4rem;
            }
        }
    }
}
</style>