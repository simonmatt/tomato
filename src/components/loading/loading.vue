<template>
  <div class="loading" v-bind:class="{isCenter:center}">
    <img src="./32X32.gif" width="32" height="32" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Loading data..."
    },
    center: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;

  .desc {
    font-size: 1rem;
  }
}

.isCenter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
