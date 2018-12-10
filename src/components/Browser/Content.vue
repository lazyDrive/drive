<template>
  <v-content id="media-content">
    <v-container fluid grid-list-md>
      <!-- <v-breadcrumbs :items="items">
        <v-icon slot="divider">chevron_right</v-icon>
      </v-breadcrumbs> -->
      <v-layout row wrap >
        <span class="media-section-title"><strong>Recents & Quick Access</strong></span>
      </v-layout>
      <v-layout row wrap class="section">
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
      <v-layout row wrap >
        <span class="media-section-title"><strong>Folders</strong></span>
      </v-layout>
      <v-layout row wrap class="section">
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
      <v-layout row wrap >
        <span class="media-section-title"><strong>Files</strong></span>
      </v-layout>
      <v-layout row wrap class="section">
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
          href: '/'
        },
        {
          text: 'about',
          disabled: false,
          href: './about'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    })
  }
</script>
