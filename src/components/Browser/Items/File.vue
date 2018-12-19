<template>
    <div class="file" @click="select(this, item)" @contextmenu="show($event, item.id)" :item-data="item.id" id="media-file">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover || selectedState ? 12 : 1} ${selectedState ? 'selected' : 'unselected'} responsize-view`"
            class="mx-auto"
            :width="`${menuState ? '192' : '210'}`"
            :height="`${menuState ? '180' : '195'}`"
            >
            <v-img
            :aspect-ratio="16/10"
            :src="item.imgUrl"
            :lazy-src="item.imgLazyUrl"
            >
            <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
            >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
    </v-img>
    <v-card-title>
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
            if(this.item.name.length >= 20)
            {
                return this.item.name.substring(0, 20) + "..";
            } else {

                return this.item.name;
            }
        },
        menuState: function(){
            return this.$store.state.showInfoBar;
        },
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
        }
    }
}
</script>
