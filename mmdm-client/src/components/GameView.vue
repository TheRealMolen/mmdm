<template>
  <div class="container-fluid">
    <div class="row px-3">

      <div class="col-5 card-area">
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col">
              <card-area :cards="players[1].cards" />
              <div class="text-end"><strong>{{ players[1].name }}</strong> - {{ players[1].health }}hp</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <card-area :cards="game.actionCards" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-end"><strong>{{ players[0].name }}</strong> - {{ players[0].health }}hp</div>
              <card-area :cards="players[0].cards" />
              
            </div>
          </div>
        </div>
      </div>

      <div class="col-7 play-area d-flex flex-column">
        <play-area :player="players[1]" :invert="true" class="mb-3" />

        <play-area :player="players[0]" class="mb-3" />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col action-area d-flex justify-content-center">
      
        <button type="button" class="btn btn-primary btn-sm me-2">do a thing!</button>
        <button type="button" class="btn btn-primary btn-sm me-2">do a thing!</button>
        <button type="button" class="btn btn-primary btn-sm me-2">do a thing!</button>
        <button type="button" class="btn btn-primary btn-sm me-2">do a thing!</button>
      </div>

    </div>
  </div>
</template>

<script>
import CardArea from './CardArea.vue';
import PlayArea from './PlayArea.vue';

export default {
  components: {
    CardArea,
    PlayArea,
  },

  computed: {
    game() {
      return this.$store.state.game;
    },
    players() {
      return this.$store.state.game.players;
    },
  },

  mounted() {
    this.$store.dispatch('setupStarterGame');
  },
};
</script>

<style lang="less" scoped>
</style>