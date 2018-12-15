<template>
    <div class="navbar" id="media-navbar">
        <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
        width="250"
        >
        <v-list dense>
            <template v-for="item in items">
                <v-layout
                v-if="item.heading"
                :key="item.heading"
                row
                align-center
                >
                <v-flex xs6>
                    <v-subheader v-if="item.heading">
                        {{ item.heading }}
                    </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
            </v-layout>
            <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            >
            <v-list-tile slot="activator">
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="fire(child.link)"
            >
            <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ child.text }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list-group>
    <v-list-tile v-else :key="item.text" @click="fire(item.link)">
        <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>
                {{ item.text }}
            </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>
</v-list>
</v-navigation-drawer>

<v-toolbar
:clipped-left="$vuetify.breakpoint.lgAndUp"
color="blue darken-3"
dark
app
fixed
>
<v-toolbar-title style="width: 300px" class="ml-0">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <span class="hidden-sm-and-down">Media Manager</span>
</v-toolbar-title>
<v-text-field
flat
solo-inverted
hide-details
prepend-inner-icon="search"
label="Search"
class="hidden-sm-and-down"
></v-text-field>
<v-spacer></v-spacer>

<v-badge
color="cyan"
left
overlap
>
<span slot="badge" >6</span>
<v-btn icon>
    <v-icon
    large
    >notifications</v-icon>
</v-btn>
</v-badge>

<v-btn icon large>
    <v-avatar size="32px" tile>
        <img
        src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
        alt="Media Manager"
        >
    </v-avatar>
</v-btn>
</v-toolbar>
<media-settings :dialog="dialogSettings"/>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
/* eslint-disable */
export default {
    name: 'media-navbar',
    data: () => ({
        dialog: false,
        drawer: null,
        loading: null,
        dialogSettings:null,
        items: [
            { icon: 'create_new_folder', text: 'New Folder' , link: 'newFolder'},
            {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'Upload',
                model: true,
                children: [
                    { icon: 'upload_file', text: 'File upload', link: 'fileUpload' },
                    { icon: 'folder', text: 'Folder upload', link: 'folderUpload' },
                ]
            },
            { icon: 'query_builder', text: 'Recents' , link: 'about'},
            { icon: 'delete', text: 'Bin' , link: 'about'},
            { icon: 'content_copy', text: 'Make Duplicate' , link: 'about'},
            {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'More',
                model: false,
                children: [
                    { text: 'Import', link: 'export' },
                    { text: 'Export', link: 'export' },
                    { text: 'Print', link: 'export' }
                ]
            },
            { icon: 'settings', text: 'Settings', link: 'settings' },
            { icon: 'chat_bubble', text: 'Send feedback', link: 'about' },
            { icon: 'help', text: 'Help', link: 'about' },
            { icon: 'phonelink', text: 'App downloads', link: 'about' }
        ]
    }),
    props: {
        source: String
    },
    components :{

    },
    mounted(){

    },
    methods :{
        newFolder: function() {
            this.$store.commit(types.SHOW_CREATE_FOLDER_MODAL);
        },
        settings: function() {
            this.$store.commit(types.SHOW_SETTINGS);
        },
        folderUpload: function(){
            this.$emit('tiggerSelectFolder');
        },
        fileUpload: function(){
            this.$emit('tiggerSelectFile');
        },
        fire: function(a){
            this[a](a);
        }
    }
}
</script>

<style>
.v-toolbar__title{
    text-align: left!important;
}
</style>
