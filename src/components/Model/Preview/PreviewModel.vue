<template>
    <div id="myModal" v-if="this.$store.state.showPreviewModal" class="modal">
        <v-icon color="white" class="close" @click="hidePreviewModal()">close</v-icon>
        <v-icon color="white" class="prev">arrow_back_ios</v-icon>
        <v-img
        class="modal-content"
        :src="item.imgUrl"
        ref="prevImage"
        :max-width="maxWidth"
        :max-height="maxHeight"
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
<div class="caption"><img v-if="item.extImg" class="extensionImage" :src="`/api/thirdParty/${item.extImg}/t/${item.extension}`" /> &nbsp;&nbsp;{{item.name}}</div>

<div class="previewtool">
    <v-icon color="white" @click="dec()" class="remove">remove</v-icon>
    <v-icon color="white" @click="reset()" class="refresh">refresh</v-icon>
    <v-icon color="white" @click="inc()" class="add">add</v-icon>
</div>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-create-folder',
    data: () => ({
        defaultData:'Untitled Folder',
        c:true,
        maxWidth:800,
        maxHeight:450,
    }),
    computed:{
        item: function(){
            return this.$store.state.previewItem;
        },
    },
    methods:{
        hidePreviewModal: function() {
            this.$store.commit(types.HIDE_PREVIEW_MODAL);
            this.reset();
        },
        next:function(){
            var flag = 0;
            var nextItem =  this.$store.state.contents.find((file) => {

                if(flag == 1 && file.type != 'folders')
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
        prev:function() {
            var flag = 0;
            var nextItem =  this.$store.state.contents.find((file) => {
                if(flag == 1 && file.type != 'folders')
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
        reset: function(){
            this.maxWidth = 800;
            this.maxHeight = 450;
        },
        dec: function(){
            this.maxWidth = this.maxWidth - 200;
            this.maxHeight = this.maxHeight - 200;
        },
        inc: function(){
            this.maxWidth = this.maxWidth + 200;
            this.maxHeight = this.maxHeight + 200;
            // var seconds = 0;
            // setInterval(function () {
            //     seconds += 1;
            //     if(seconds >= 200)
            //     {
            //         clearInterval();
            //         return 0;
            //     }
            //
            //     this.maxWidth = this.maxWidth + seconds;
            //     this.maxHeight = this.maxHeight + seconds;
            // }.bind(this), 5);
        }
    }
}
</script>
