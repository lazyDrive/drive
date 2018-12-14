<template>
    <div class="file" @click="select(this, item)" @contextmenu="show($event, item.id)" :item-data="item.id" id="media-file">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover || selectedState ? 12 : 2} ${selectedState ? 'selected' : 'unselected'}`"
            class="mx-auto"
            width="150"
            height="145"
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
        <span class="file-text">{{ item.name }}</span>
    </v-card-title>
</v-card>
</v-hover>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-file',
    data: () => ({
    }),
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

            if (!(e.shiftKey || e.ctrlKey )) {
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

<style>
.file {
    margin: 15px 0 15px 10px;
    cursor: pointer;
}
</style>
