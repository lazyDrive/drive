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

            <v-layout row wrap class="section" v-if="this.$store.state.contents.quick">
                <span class="media-section-title"><strong>Recents & Quick Access</strong></span>
            </v-layout>
            <v-layout row wrap>
                <media-file v-for="item in quicks" :item="item" :key="item.id"></media-file>
            </v-layout>

            <v-layout row wrap class="section" v-if="this.$store.state.contents.folders">
                <span class="media-section-title"><strong>Folders</strong></span>
            </v-layout>
            <v-layout row wrap>
                <media-folder v-for="item in folders" :item="item" :key="item.id"></media-folder>
            </v-layout>

            <v-layout row wrap class="section" v-if="this.$store.state.contents.files">
                <span class="media-section-title"><strong>Files</strong></span>
            </v-layout>
            <v-layout row wrap>
                <media-file v-for="item in getFiles" :item="item" :key="item.id"></media-file>
            </v-layout>

            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            v-if="this.$store.state.loadMoreProgress"
            ></v-progress-circular>

        </v-container>
    </v-content>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
    name:'media-content',
    data: () => ({
        response:'',
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
            }
        ]
    }),
    computed: {
        getFiles() {
            return this.$store.state.contents.files;
        },
        folders(){
            return this.$store.state.contents.folders;
        },
        quicks(){
            return this.$store.state.contents.quick;
        }
    },
    methods:{
        onScroll: function() {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                if(this.$store.state.isContentsLoaded)
                {
                    this.$store.dispatch('loadMoreContents');
                }
            }
            else {
                this.$store.commit(types.SET_IS_LOADING_MORE, false);
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
    },
    mounted() {

    }
}
</script>

<style>
.section {
    padding-top:10px;
}
</style>
