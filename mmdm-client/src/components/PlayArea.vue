<template>
  <div class="play-mat">

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.play-mat {
  display: grid;
  grid-template-columns: 16% 68% 16%;
  grid-template-rows: 20% 25% 55%;
  grid-template-areas: 
    "attack attack attack"
    "used field prep"
    "used reserve prep";

  .area {
    border: 2px solid #555;
  }
}
</style>