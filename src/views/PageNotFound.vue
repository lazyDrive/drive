<template>
  <div class="text-xs-center">Error (4xx)
    <br>We can't find the page you're looking for.
    <br>Here are a few links that may be helpful:
    <br>
    <router-link :to="{ path: '/' }">Home</router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
