<template>
    <v-navigation-drawer
    v-model="menuState"
    right
    app
    width="334"
    fixed
    dark
    :stateless="true"
    >
    <div
    id="details"
    style="max-width: 400px; margin: auto;"
    >
    <v-toolbar
    dark
    >
    <v-toolbar-side-icon @click.stop="hideInforbar()"></v-toolbar-side-icon>
    <v-toolbar-title>Items Details</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>search</v-icon>
    </v-btn>
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
.plz-select{
    color: white!important;
}
</style>
