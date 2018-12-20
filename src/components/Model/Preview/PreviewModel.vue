<template>
    <div id="myModal" v-if="this.$store.state.showPreviewModal" class="modal">
        <v-icon color="white" class="close" @click="hidePreviewModal()">close</v-icon>
        <v-icon color="white" class="prev">arrow_back_ios</v-icon>
        <v-img
        :src="item.imgUrl"
        class="modal-content"
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
<v-icon color="white" @click="next()" class="next">arrow_forward_ios</v-icon>
<div id="caption">{{item.name}}</div>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-create-folder',
    data: () => ({
        defaultData:'Untitled Folder',
        c:true
    }),
    computed:{
        item: function(){
            return this.$store.state.previewItem;
        },
    },
    methods:{
        hidePreviewModal: function() {
            this.$store.commit(types.HIDE_PREVIEW_MODAL);
        },
        next:function(){
            var flag = 0;
            var nextItem =  this.$store.state.contents.find((file) => {

                if(flag == 1)
                {
                    return true;
                }

                if (file.id === this.item.id ) {
                    flag = 1;
                }
            });

            if(nextItem != null)
            {
                this.$store.state.previewItem = nextItem;
            }
        },
        prev:function(){
            var flag = 0;
            var nextItem =  this.$store.state.contents.find((file) => {
                if(flag == 1)
                {
                    return true;
                }

                if (file.id === this.item.id) {
                    flag = 1;
                }
            });

            if(nextItem != null)
            {
                this.$store.state.previewItem = nextItem;
            }
        },
    }
}
</script>
