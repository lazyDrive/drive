<template>
    <div class="file" @contextmenu="show(this, item.id)" :item-data="item.id" id="media-file">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2} ${selectedState ? 'selected' : 'unselected'}`"
            class="mx-auto"
            width="150"
            height="140"
            >
            <v-img
            :aspect-ratio="16/9"
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
        selectedState: false
    }),
    props: ['item'],
    methods: {
        show : function(e, id){
            e = e || window.event;
            e.preventDefault()

            this.$store.commit(types.HIDE_FOLDER_MENU, id);
            this.$store.commit(types.HIDE_FILE_MENU, id);
            this.$store.commit(types.SHOW_FILE_MENU, id);

            this.$nextTick(() => {
                this.$store.state.showFileMenu = true;
            })
        }
    }
}
</script>

<style>
.file {
    margin: 15px 0 15px 10px;
    cursor: pointer;
}
.selected {
    background-color: #8cccc382!important;
}
</style>
