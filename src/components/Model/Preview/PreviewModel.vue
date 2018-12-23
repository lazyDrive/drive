<template>
    <div id="media-preview-modal" v-if="this.$store.state.showPreviewModal" class="modal">
        <v-icon color="white" @click="hidePreviewModal()" class="close">arrow_back</v-icon>
        <v-icon color="white" class="prev">arrow_back_ios</v-icon>
        <v-img
        class="modal-content"
        :src="item.imgUrl"
        ref="prevImage"
        v-if="item.imgUrl"
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

<div class="video" v-if="video">
    <video class="media-video-player-preview" controls>
        <source :src="item.filePath" type="video/mp4" />
    </video>
</div>

<div class="audio" v-if="audio">
    <audio class="media-audio-player-preview" controls>
        <source :src="item.filePath" type="audio/mpeg">
        </audio>
</div>

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
        videoExt:[
            'mp4',

        ],
        audioExt:[
            'mp3',
            'webm'
        ]
    }),
    computed:{
        item: function(){
            return this.$store.state.previewItem;
        },
        video: function(){
            if(this.videoExt.indexOf(this.item.extension) != -1 )
            {
                return true;
            }else {
                return false;
            }
        },
        audio: function(){
            if(this.audioExt.indexOf(this.item.extension) != -1 )
            {
                return true;
            }else {
                return false;
            }
        }
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
        },
        keyup: function(event){
            event.preventDefault();

            if(event.keyCode == 27){
                this.hidePreviewModal();
            } else if(event.keyCode == 39){
                this.next();
            } else if(event.keyCode == 38){
                this.inc();
            } else if(event.keyCode == 40){
                this.dec();
            }
        }
    },
    created() {
        window.addEventListener('keyup', this.keyup);
    },
    destroyed() {
        window.removeEventListener('keyup', this.keyup);
    },
}
</script>
