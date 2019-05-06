<template>
  <div :class="`${snackbarState ? 'active' : ''} notification ${snackbarColor}`">
    <div class="text">
      {{ text() }}
      <a class="ripple rect" href="#cookies">learn more</a>
    </div>
    <div class="notification_close ripple" @click="close()">
      <i class="fa fa-close"></i>
    </div>
  </div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
  name: "lazy-alert",
  data: () => {
    return {};
  },
  computed: {
    snackbarState: {
      get: function() {
        return this.$store.state.showsnackbar.state;
      },
      set: function() {
        setTimeout(
          function() {
            this.$store.commit(types.HIDE_SNACKBAR);
          }.bind(this),
          1000
        );
      }
    },
    snackbarColor: function() {
      return this.$store.state.showsnackbar.color || "default";
    },
    timeout: function() {
      return this.$store.state.showsnackbar.time;
    }
  },
  methods: {
    close: function() {
      this.$store.commit(types.HIDE_SNACKBAR);
    },
    text: function() {
      return this.$store.state.showsnackbar.data;
    }
  }
};
</script>
