<template>
    <v-content id="media-content" >
        <v-container fluid grid-list-md>
            <div class="media-toolbar">
                <div class="media-loader" v-if="this.$store.state.isLoading"></div>
            </div>

            <v-breadcrumbs :items="items">
                <v-icon slot="divider">chevron_right</v-icon>
            </v-breadcrumbs>

            <div class="media-toolbar"></div>

            <div id="media-items"
            @dragenter="onDragEnter"
            @drop="onDrop"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            ref="browserItems"
            >
            <div class="media-dragoutline">
                <v-icon size="200">cloud_upload</v-icon>
                <p>Drop file(s) to Upload</p>
            </div>

            <v-layout row wrap class="m-section" v-if="quick.length > 0">
                <span class="media-section-title"><strong>Recents & Quick Access</strong></span>
            </v-layout>
            <v-layout row wrap>
                <media-file v-for="item in quick" :item="item" :key="item.id" ></media-file>
            </v-layout>

            <v-layout row wrap class="m-section" v-if="folders.length > 0">
                <span class="media-section-title"><strong>Folders</strong></span>
            </v-layout>
            <v-layout row wrap>
                <media-folder v-for="item in folders" :item="item" :key="item.id" ></media-folder>
            </v-layout>

            <v-layout row wrap class="m-section" v-if="files.length > 0">
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
                item => (item.type == 'folders' && item.name.toLowerCase().includes(this.$store.state.search.toLowerCase()))
            );
        },
        files: function() {
            return this.$store.state.contents.filter(
                item => (item.type == 'files' && item.name.toLowerCase().includes(this.$store.state.search.toLowerCase()))
            );
        }
    },
    methods:{
        onScroll: function() {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                if(this.$store.state.isContentsLoaded)
                {
                    setTimeout(function () {
                        console.log('asas')
                    }, 500);
                    // this.$store.dispatch('getContents');
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
            }else{
                this.$store.dispatch('getContents', 20);
            }
        },
        // Listeners for drag and drop
        onDragEnter(event) {
            event.stopPropagation();
            return false;
        },

        // Notify user when file is over the drop area
        onDragOver(event) {
            event.preventDefault();
            document.querySelector('.media-dragoutline').classList.add('active');
            return false;
        },

        /* Upload files */
        upload(file) {
            // Create a new file reader instance
            let reader = new FileReader();

            // Add the on load callback
            reader.onload = (progressEvent) => {
                const result = progressEvent.target.result,
                splitIndex = result.indexOf('base64') + 7,
                content = result.slice(splitIndex, result.length);

                console.log(content)
                const formData = new FormData()
                formData.append('files', file);
                this.$store.dispatch('upload', formData);
            };

            reader.readAsDataURL(file);
        },

        // Logic for the dropped file
        onDrop(event) {
            event.preventDefault();

            // Loop through array of files and upload each file
            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {

                for( var i = 0; i < event.dataTransfer.files.length; i++ ){
                    let file = event.dataTransfer.files[i];
                    document.querySelector('.media-dragoutline').classList.remove('active');
                    this.upload(file);
                }
            }

            document.querySelector('.media-dragoutline').classList.remove('active');
        },

        // Reset the drop area border
        onDragLeave(event) {
            event.stopPropagation();
            event.preventDefault();
            document.querySelector('.media-dragoutline').classList.remove('active');
            return false;
        },
        current: function(){
            const selected = this.$store.state.selectedItems[0];

            return this.$store.state.contents.findIndex((file) => {
                if (file.id === selected.id) {
                    return true;
                }
            });
        },
        keyup: function(event){
            event.preventDefault();

            if(this.$store.state.selectedItems.length == 1 && !this.$store.state.showPreviewModal)
            {
                if(event.keyCode == 27){
                    console.log(event);
                } else if(event.keyCode == 39){
                    const current = this.current();
                    if(current < this.$store.state.contents.length-1) {
                        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
                        this.$store.commit(types.SELECT_BROWSER_ITEM, this.$store.state.contents[current + 1]);
                    }
                } else if(event.keyCode == 38){
                    console.log(event)
                }else if(event.keyCode == 37){
                    const current = this.current();
                    if(current > 0) {
                        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
                        this.$store.commit(types.SELECT_BROWSER_ITEM, this.$store.state.contents[current - 1]);
                    }
                } else if(event.keyCode == 40){
                    console.log(event);
                }else if(event.keyCode == 13){
                    this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, this.$store.state.selectedItems[0]);
                    this.$store.commit(types.SHOW_PREVIEW_MODAL);
                }
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
        document.body.addEventListener('keyup', this.keyup);
        document.body.addEventListener('click', this.unselectAllBrowserItems, false);
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        document.body.removeEventListener('keyup', this.keyup);
        document.body.removeEventListener('click', this.unselectAllBrowserItems, false);
    }
}
</script>
