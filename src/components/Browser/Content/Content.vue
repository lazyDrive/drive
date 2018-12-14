<template>
    <v-content id="media-content" >
        <v-card class="upload-section">
            <v-toolbar color="light-blue" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>My files</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn dark icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn dark icon>
                    <v-icon>view_module</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list two-line subheader>
                <v-subheader inset>Folders</v-subheader>
                <v-list-tile v-for="item in itemsupload" :key="item.title" avatar @click="1">
                    <v-list-tile-avatar>
                        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-subheader inset>Files</v-subheader>
                <v-list-tile v-for="item in items2upload" :key="item.title" @click="1">
                    <v-list-tile-avatar>
                        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
        <v-container fluid grid-list-md>
            <div class="media-toolbar">
                <div class="media-loader" v-if="this.$store.state.isLoading"></div>
            </div>
            <v-breadcrumbs :items="items">
                <v-icon slot="divider">chevron_right</v-icon>
            </v-breadcrumbs>
            <div class="media-toolbar"></div>

            <div id="media-items" ref="browserItems">
                <v-layout row wrap class="section" v-if="this.$store.state.contents.length > 0">
                    <span class="media-section-title"><strong>Recents & Quick Access</strong></span>
                </v-layout>
                <v-layout row wrap>
                    <media-file v-for="item in quick" :item="item" :key="item.id" ></media-file>
                </v-layout>

                <v-layout row wrap class="section" v-if="this.$store.state.contents.length > 0">
                    <span class="media-section-title"><strong>Folders</strong></span>
                </v-layout>
                <v-layout row wrap>
                    <media-folder v-for="item in folders" :item="item" :key="item.id" ></media-folder>
                </v-layout>

                <v-layout row wrap class="section" v-if="this.$store.state.contents.length > 0">
                    <span class="media-section-title"><strong>Files</strong></span>
                </v-layout>
                <v-layout row wrap>
                    <media-file v-for="item in files" :item="item" :key="item.id" ></media-file>
                </v-layout>
            </div>

            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            v-if="this.$store.state.loadMoreProgress"
            ></v-progress-circular>

        </v-container>

        <!-- Add infrobar -->
        <media-infrobar ref="infobar"></media-infrobar>
    </v-content>
</template>

<script>
import * as types from "./../../../store/mutation-types";

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
        ],
        itemsupload: [
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2upload: [
            { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
            { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
        ]
    }),
    computed: {
        quick: function() {
            return this.$store.state.contents.filter(
                item => (item.type == 'quick')
            );
        },
        folders: function() {
            return this.$store.state.contents.filter(
                item => (item.type == 'folders')
            );
        },
        files: function() {
            return this.$store.state.contents.filter(
                item => (item.type == 'files')
            );
        }
    },
    methods:{
        onScroll: function() {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                if(this.$store.state.isContentsLoaded)
                {
                    // this.$store.dispatch('loadMoreContents');
                }
            }
            else {
                this.$store.commit(types.SET_IS_LOADING_MORE, false);
            }
        },
        /* Unselect all browser items */
        unselectAllBrowserItems(event) {
            const notClickedBrowserItems = (this.$refs.browserItems && !this.$refs.browserItems.contains(event.target)) || event.target === this.$refs.browserItems;
            const notClickedInfobar = this.$refs.infobar !== undefined && !this.$refs.infobar.$el.contains(event.target);
            const clickedOutside = notClickedBrowserItems && notClickedInfobar;
            if (clickedOutside) {
                this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
        document.body.addEventListener('click', this.unselectAllBrowserItems, false);
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        document.body.removeEventListener('click', this.unselectAllBrowserItems, false);
    },
    mounted() {

    }
}
</script>

<style>
.section {
    padding-top:10px;
}

.upload-section {
    position: fixed!important;
    z-index: 10;
    bottom: 30px;
    right: 20px;
    width: 500px;
    display: none!important;
}
</style>
