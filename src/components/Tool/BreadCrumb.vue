<template>
  <div class="lazy_breadcrumbs">
    <ul class="breadcrumbs breadcrumbs_type">
      <li
        v-for="(item, index) in diskLoaded"
        :item="item"
        :key="item.id"
        :class="`breadcrumbs__item ${index === diskLoaded.length-1 ? 'breadcrumbs__item_active' : ''}`"
      >
        <span class="breadcrumbs__element" v-if="index === diskLoaded.length-1">{{ item.text }}</span>
        <a
          v-else
          @click.stop="doThis(item.path)"
          class="breadcrumbs__element breadcrumbs_go"
        >{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "lazy-breadcrumb",
  data: () => {
    return {};
  },
  computed: {
    diskLoaded: function() {
      return this.$store.state.diskLoaded;
    }
  },
  methods: {
    doThis: function(path) {
      if (path) {
        this.$router.push({
          path: `/drive/u/0/folder/${path}`
        });
      } else {
        this.$router.push({
          path: `/drive/u/0/my-drive`
        });
      }
    }
  }
};
</script>
