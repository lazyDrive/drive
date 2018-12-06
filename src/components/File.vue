<template>
  <div class="file">
    <v-hover>
      <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="256"
      height="200"
      >
      <v-img
      :aspect-ratio="16/9"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>
        <span class="file-text">Cafe Badilico</span>
      </v-card-title>
    </v-card>
  </v-hover>
</div>
</template>

<script>

export default {
  data: () => ({
    reviews: 413,
    value: 4.5
  })
}
</script>

<style>

.file {
  margin: 0 0 15px 10px;
  cursor: pointer;
}
.file-text{
  font-size: 15px;
  text-align: center;
}
</style>
