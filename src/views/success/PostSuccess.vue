<template>
  <div class="postsuccess">
    <h1>Shared successfully, thank you!</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.state.isHome = false;
  }
};
</script>
<style lang="scss" scoped>
.postsuccess {
  font-size: 1rem;
  min-width: calc(100vh - 7rem);
  background: #eee;
  padding-top: 3.75rem;
  width: 100%;
  text-align: center;
}

h1 {
  padding: 0;
  margin: 0;
  padding-top: 15rem;
}
</style>

