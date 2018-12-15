<template>
    <v-navigation-drawer
    v-model="menuState"
    right
    app
    width="333"
    fixed
    :stateless="true"
    >
    <div
    id="details"
    style="max-width: 400px; margin: auto;"
    >
    <v-toolbar
    color="blue darken-3"
    >
    <v-btn icon dark @click="hideInforbar()">
        <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title class="m-d-title">Items Details</v-toolbar-title>
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
            <media-info-file v-for="item in quick" :item="item" :key="item.id"></media-info-file>
            <media-info-folder v-for="item in folders" :item="item" :key="item.id"></media-info-folder>
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
import InfoFolder from "@/components/Browser/InfoBar/InfoFolder"

export default {
    name: 'media-infoBar',
    data: () => ({
        right: true
    }),
    components:{
        'media-info-file': InfoFile,
        'media-info-folder': InfoFolder
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
        quick: function() {
            return this.$store.state.selectedItems.filter(
                item => (item.type == 'quick')
            ).reverse();
        },
        folders: function() {
            return this.$store.state.selectedItems.filter(
                item => (item.type == 'folders')
            ).reverse();
        },
        files: function() {
            return this.$store.state.selectedItems.filter(
                item => (item.type == 'files')
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
.m-d-title{
    color: white!important;
}
</style>
