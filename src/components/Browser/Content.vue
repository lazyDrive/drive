<template>
  <v-content id="media-content">
    <v-container fluid grid-list-md>
      <div class="media-toolbar">
          <div class="media-loader" v-if="this.$store.state.isLoading"></div>
      </div>
      <v-breadcrumbs :items="items">
        <v-icon slot="divider">chevron_right</v-icon>
      </v-breadcrumbs>
      <div class="media-toolbar"></div>
      <v-layout row wrap class="section">
        <span class="media-section-title"><strong>Recents & Quick Access</strong></span>
      </v-layout>
      <v-layout row wrap>
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
      </v-layout>
      <v-layout row wrap class="section">
        <span class="media-section-title"><strong>Folders</strong></span>
      </v-layout>
      <v-layout row wrap>
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
        <media-folder />
      </v-layout>
      <v-layout row wrap class="section">
        <span class="media-section-title"><strong>Files</strong></span>
      </v-layout>
      <v-layout row wrap>
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-file />
        <media-online-state />
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name:'media-content',
    data: () => ({
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '#/'
        },
        {
          text: 'about',
          disabled: false,
          href: '#/about'
        },
        {
          text: 'section',
          disabled: false,
          href: '#/about'
        }
      ]
    })
  }
</script>

<style>
.section {
  padding-top:10px;
}
</style>
