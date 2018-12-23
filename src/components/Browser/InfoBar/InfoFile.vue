<template>
    <div class="m-d-img" id="media-info-file">
        <v-img aspect-ratio="1.75" :src="item.imgUrl" v-if="image" :lazy-src="item.imgLazyUrl"></v-img>

        <div class="video" v-if="video">
            <video class="media-video-player" controls>
                <source :src="item.filePath" type="video/mp4" />
            </video>
        </div>

        <div class="audio" v-if="audio">
            <audio class="media-audio-player" controls>
              <source :src="item.filePath" type="audio/mpeg">
            </audio>
        </div>

        <div class="file" v-if="file">
            <v-icon size="120">{{ icon }}</v-icon>
        </div>

        <br>
        <div class="m-d-details">
            <h3 class="headline mb-0"><strong>{{item.name}}</strong></h3>
        </div>

        <div class="m-d-info">
            <table>
                <tr>
                    <td class="m-d-td">Type</td>
                    <td class="m-d-td"><strong>{{ item.type }}</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Created Date</td>
                    <td class="m-d-td"><strong>{{ item.created_date }}</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Modified Date</td>
                    <td class="m-d-td"><strong>{{ item.created_date }}</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Size</td>
                    <td class="m-d-td"><strong>{{ item.size }} KB</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Extension</td>
                    <td class="m-d-td"><strong>{{ item.extension }}</strong>&nbsp;</td>
                </tr>
                <tr>
                    <td class="m-d-td">Mime Type</td>
                    <td class="m-d-td"><strong>{{ item.mime_type }}</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Dimensions</td>
                    <td class="m-d-td"><strong>{{ item.dimensions.height }} x {{ item.dimensions.width }}</strong></td>
                </tr>
                <tr>
                    <td class="m-d-td">Owner</td>
                    <td class="m-d-td"><strong>Me</strong></td>
                </tr>
            </table>
        </div>

        <v-btn flat color="success">Copy Details</v-btn>
        <v-btn flat color="success">Share</v-btn>
        <br>
        <div class="media-toolbar"></div>
        <br>
    </div>
</template>

<script>
export default {
    name: 'media-info-file',
    data() {
        return {
            videoExt:[
                'mp4',

            ],
            audioExt:[
                'mp3',
                'webm'
            ],
            fileExt:[
                'zip',
                'ico'
            ],
            imageExt:[
                'jpg',
                'jpeg',
                'png',
                'gif',
                'tif'
            ],
            iconsMap:{
                'mp3' : 'library_music',
                'zip': 'archive',
                'mp4': 'music_video',
                'webm': 'library_music',
                'default': 'insert_drive_file'
            }
        }
    },
    props: ['item'],
    computed: {
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
        },
        image: function(){
            if(this.imageExt.indexOf(this.item.extension) != -1 )
            {
                return true;
            }else {
                return false;
            }
        },
        file: function(){
            if(this.fileExt.indexOf(this.item.extension) != -1 )
            {
                return true;
            }else {
                return false;
            }
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
    methods:{

    }
}
</script>
