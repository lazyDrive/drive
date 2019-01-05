<template>
    <v-navigation-drawer
    v-model="menuState"
    right
    app
    width="343"
    fixed
    :stateless="true"
    >
    <div
    class="m-d"
    style="max-width: 400px; margin: auto;"
    >
    <v-toolbar
    color="white"
    light
    flat
    class="m-over-toolbar"
    >
    <v-btn icon  @click="hideInforbar()">
        <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title style="color:black!important" class="m-d-title">Items Details</v-toolbar-title>
    <v-spacer></v-spacer>
</v-toolbar>

<v-container
fluid
grid-list-lg
class="infoBar"
>
<v-layout row wrap>
    <v-flex>
        <div v-if="this.$store.state.selectedItems.length <= 0" >
            <v-icon size="100">comment</v-icon>
            <h3 class="plz-select headline mb-0">Select file or folder to view its details.</h3>
        </div>
        <div v-if="this.$store.state.selectedItems.length > 0" >
            <media-info-file v-for="item in files" :item="item" :key="item.id"></media-info-file>
        </div>
    </v-flex>
</v-layout>
</v-container>
</div>
</v-navigation-drawer>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import InfoFile from "@/components/Browser/InfoBar/InfoFile"

export default {
    name: 'media-infoBar',
    data: () => ({
        right: true
    }),
    components:{
        'media-info-file': InfoFile,
        // 'media-info-folder': InfoFolder
    },
    computed: {
        menuState: {
            get: function() {
                return this.$store.state.showInfoBar;
            },
            set: function() {
                // this.$store.commit(types.HIDE_INFOBAR);
            }
        },
        files: function() {
            return this.$store.state.selectedItems;
        },
        music: function() {
            return this.$store.state.selectedItems.filter(
                item => (item.type == 'music')
            ).reverse();
        }

    },
    methods:{
        about: function() {

        },
        settings: function() {

        },
        hideInforbar: function(){
            this.$store.commit(types.HIDE_INFOBAR);
        },
        toggleMusicPlayer: function(){
            if(!this.$store.state.showMusicPlayer)
            {
                this.$store.commit(types.SHOW_MUSIC_PLAYER);
            }else{
                this.$store.commit(types.HIDE_MUSIC_PLAYER);
            }
        },
        fire: function(a){
            this[a](a);
        }
    }
}
</script>
