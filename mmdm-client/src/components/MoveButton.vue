<template>
  <button type="button" class="btn" :class="buttonStyle(move)" :title="buttonTooltip(move)" @click="attempt(move)">{{ move.name }}</button>
</template>

<script>
export default {
  props: {
    move: {type: Object, required: true},
  },
  computed: {
    game() { return this.$store.state.game; },
  },
  
  methods: {
    attempt(move) {
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          alert(err);
          return;
        }
      }

      this.$store.commit('recordMove', {move});
      move.doit({game: this.game, dispatch: this.$store.dispatch, commit: this.$store.commit});
    },

    buttonStyle(move) {
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          return 'btn-secondary';
        }
      }
      return 'btn-primary';
    },
    buttonTooltip(move) {
      let msg = move.desc;
      if (move.precondition) {
        const err = move.precondition(this.game);
        if (err) {
          msg += '\n\n' + err;
        }
      }
      return msg;
    },
  },
}
</script>