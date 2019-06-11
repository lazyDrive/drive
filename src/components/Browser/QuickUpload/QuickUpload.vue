<template>
  <v-speed-dial
    v-model="fab"
    right
    fixed
    bottom
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
    v-if="this.$store.state.isMobile"
  >
    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>delete</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn fab dark small color="green">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn fab dark small color="teal" @click.prevent="select()">
      <v-icon>cloud_upload</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "media-tool",
  data: () => ({
    dialog: false,
    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition"
  }),

  methods: {
    select: function() {
      this.$emit("tiggerSelectFile");
    }
  }
};
</script>
