<template>
    <div class="file" @dblclick.prevent="preview()" @click="select($event, item)" @contextmenu="show($event, item.id)" :item-data="item.id" id="media-file">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`${ hover } ${selectedState ? 'selected' : 'unselected'} responsize-view elevation-0`"
            class="mx-auto"
            :width="`${isMobile ? '145' : (menuState ? '192' : '210')}`"
            :height="`${isMobile ? '140' : (menuState ? '175' : '190')}`"
            >

            <v-img
            class="m-gradient"
            :aspect-ratio="16/10"
            v-if="item.imgUrl != ''"
            :src="item.imgUrl"
            :alt="item.name"
            :lazy-src="item.imgLazyUrl"
            >
            </v-img>

            <v-img
            :aspect-ratio="16/10"
            v-if="item.imgUrl == ''"
            :src="`/api/thirdParty/${item.extImg}/t/${item.extension}`"
            :alt="item.name"
            contain
            :lazy-src="item.imgLazyUrl"
            >
            </v-img>

            <!-- <v-icon  :size="`${isMobile ? '80' : '120'}`">{{ icon }}</v-icon> -->

    <v-card-title>
        <img v-if="item.extImg && !isMobile" class="extensionImage" :src="`/api/thirdParty/${item.extImg}/t/${item.extension}`" />
        <span class="file-text">{{ getName }}</span>
    </v-card-title>
</v-card>
</v-hover>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-file',
    data() {
        return {
            iconsMap:{
                'mp3' : 'library_music',
                'zip': 'archive',
                'mp4': 'music_video',
                'default': 'insert_drive_file'
            }
        }
    },
    props: ['item'],
    computed: {
        selectedState: function(){

            var res = this.$store.state.selectedItems.filter(file => {
                return file.id === this.item.id
            })

            if(res.length != 0) {
                return true;
            } else {
                return false;
            }
        },
        getName: function(){
            if(this.item.name.length >= 15)
            {
                return this.item.name.substring(0,15) + "..";
            } else {

                return this.item.name;
            }
        },
        menuState: function(){
            return this.$store.state.showInfoBar;
        },
        isMobile: function(){
            return this.$store.state.isMobile;
        },
        icon: function(){
            if(this.iconsMap[this.item.extension] && this.iconsMap[this.item.extension] != '')
            {
                return this.iconsMap[this.item.extension];
            }
            else {
                return this.iconsMap['default'];
            }
        }
    },
    methods: {
        show : function(event, item){
            var e = event || window.event;
            e.preventDefault()

            if (!(e.shiftKey || e.ctrlKey) || (item.type == 'quick')) {
                this.select(e, this.item);
            }

            this.$store.commit(types.HIDE_FOLDER_MENU);
            this.$store.commit(types.HIDE_FILE_MENU);
            this.$store.commit(types.SHOW_FILE_MENU, {event: e});

            this.$nextTick(() => {
                this.$store.state.showFileMenu = true;
            })
        },
        select: function(event, item){
            var e = event || window.event;
            e.preventDefault()

            if (!(e.shiftKey || e.ctrlKey) || (item.type == 'quick')) {
                this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            }

            if(this.selectedState)
            {
                this.$store.commit(types.UNSELECT_BROWSER_ITEM, item);
            }else {
                this.$store.commit(types.SELECT_BROWSER_ITEM, item);
            }
        },
        preview: function(){
            this.$store.dispatch('log', this.item);
            this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, this.item);
            this.$store.commit(types.SHOW_PREVIEW_MODAL);
        }
    }
}
</script>
