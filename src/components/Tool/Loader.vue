<template>
  <section class="loader-container">
    <div class="loader">
      <img src="/public/images/loader/main-loader2.gif" alt="Loading...">
    </div>
  </section>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.loader-container {
  background-color: rgba(255, 255, 255, 0.75);
  height: 100%;
  position: fixed;
  top: 0;
  transition: 0.2s all linear;
  width: 100%;
  z-index: 99999;
  left: 0;
  .loader {
    margin: 0 auto;
    position: relative;
    text-align: center;
    top: 40%;
    img {
      width: 100px;
    }
  }
}
</style>
