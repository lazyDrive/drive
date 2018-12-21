<template>
    <div id="myModal" v-if="this.$store.state.showPreviewModal" class="modal">
        <v-icon color="white" @click="hidePreviewModal()" class="close">arrow_back</v-icon>
        <v-icon color="white" class="prev">arrow_back_ios</v-icon>
        <v-img
        class="modal-content"
        :src="item.imgUrl"
        ref="prevImage"
        :width="width"
        contain
        :alt="item.name"
        :height="height"
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
        width:800,
        height:450,
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
            this.width = 800;
            this.height = 450;
        },
        dec: function(){
            this.width = this.width - 150;
            this.height = this.height - 150;
        },
        inc: function(){
            this.width = this.width + 150;
            this.height = this.height + 150;
            // var seconds = 0;
            // setInterval(function () {
            //     seconds += 1;
            //     if(seconds >= 200)
            //     {
            //         clearInterval();
            //         return 0;
            //     }
            //
            //     this.width = this.width + seconds;
            //     this.height = this.height + seconds;
            // }.bind(this), 5);
        }
    }
}
</script>
