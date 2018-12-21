<template>
    <div class="file" @dblclick.prevent="preview()" @click="select(this, item)" @contextmenu="show($event, item.id)" :item-data="item.id" id="media-file">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`${ hover } ${selectedState ? 'selected' : 'unselected'} responsize-view elevation-0`"
            class="mx-auto"
            :width="`${isMobile ? '145' : (menuState ? '192' : '210')}`"
            :height="`${isMobile ? '140' : (menuState ? '175' : '190')}`"
            >

            <v-img
            :aspect-ratio="16/10"
            :src="item.imgUrl"
            :alt="item.name"
            :lazy-src="item.imgLazyUrl"
            >
    </v-img>
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
        }
    },
    methods: {
        show : function(e, id){
            e = e || window.event;
            e.preventDefault()

            this.select(e, this.item);

            this.$store.commit(types.HIDE_FOLDER_MENU, id);
            this.$store.commit(types.HIDE_FILE_MENU, id);
            this.$store.commit(types.SHOW_FILE_MENU, id);

            this.$nextTick(() => {
                this.$store.state.showFileMenu = true;
            })
        },
        select: function(e, item){
            e = e || window.event;
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
            this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, this.item);
            this.$store.commit(types.SHOW_PREVIEW_MODAL);
        }
    }
}
</script>
