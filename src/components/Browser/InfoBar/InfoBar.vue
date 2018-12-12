<template>
    <v-navigation-drawer
    v-model="menuState"
    right
    dark
    app
    width="334"
    fixed
    :stateless="true"
    >
    <div
    id="details"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
    >
    <v-toolbar
    color="pink"
    dark
    >
    <v-toolbar-side-icon @click.stop="hideInforbar()"></v-toolbar-side-icon>
    <v-toolbar-title>Items Details</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>search</v-icon>
    </v-btn>
</v-toolbar>

<v-card>
    <v-container
    fluid
    grid-list-lg
    class="infoBar"
    >
    <v-layout row wrap>
        <media-info-folder></media-info-folder>
        <media-info-file></media-info-file>
        <media-info-file :item="files"></media-info-file>
        <media-info-file></media-info-file>
        <media-info-file></media-info-file>
        <media-info-file></media-info-file>
    </v-layout>
</v-container>
</v-card>
</div>
</v-navigation-drawer>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import InfoFile from "@/components/Browser/InfoBar/InfoFile"
import InfoFolder from "@/components/Browser/InfoBar/InfoFolder"

export default {
    name: 'Details',
    data: () => ({
        right: true
    }),
    props: {

    },
    components:{
        'media-info-file': InfoFile,
        'media-info-folder': InfoFolder
    },
    computed: {
        rand : function() {
            return Math.floor((Math.random() * 100000000) + 1);
        },
        menuState: {
            get: function() {
                return this.$store.state.showInfoBar;
            },
            set: function() {
                // this.$store.commit(types.HIDE_INFOBAR);
            }
        },
        files: function() {
            console.log('asas');
            console.log(this.$store.getters.getSelectedDirectoryFiles);
            return true;
        },
        folders: function() {
            return true;
        }
    },
    methods:{
        about: function(a) {
            console.log(a);
        },
        settings: function(a) {
            console.log(a);
        },
        hideInforbar: function(){
            this.$store.commit(types.HIDE_INFOBAR);
        },
        fire: function(a){
            this[a](a);
        }
    }
}
</script>

<style>
#details{
    user-select:text!important;
}

.infoBar{
    padding: 10px!important;
}
</style>
