<template>
    <div id="media-music-player">
        <div class="audioContainer">
            <a class="nav-icon" v-on:click="isPlaylistActive=!isPlaylistActive" :class="{'isActive': isPlaylistActive}" title="Music List">
                <span></span>
                <span></span>
                <span></span>
            </a>
            <div class="audioPlayerList" :class="{'isActive': isPlaylistActive}">
                <div class="item" v-for="(item,index) in musicPlaylist" :key="index"  v-bind:class="{ 'isActive':isCurrentSong(index) }" v-on:click="changeSong(index),isPlaylistActive=!isPlaylistActive">
                    <p class="title">{{ item.title }}</p>
                    <p class="artist">{{ item.artist }}</p>
                </div>

            </div>
            <div class="audioPlayerUI" :class="{'isDisabled': isPlaylistActive}">
                <div class="albumImage">
                    <transition name="ballmove" enter-active-class="animated zoomIn" leave-active-class="animated fadeOutDown" mode="out-in">
                        <img @load="onImageLoaded()" :src="musicPlaylist[currentSong].image" :key="currentSong" ondragstart="return false;" id="playerAlbumArt">
                    </transition>
                    <div class="loader" :key="currentSong">Loading...</div>
                </div>
                <div class="albumDetails">
                    <transition name="slide-fade" mode="out-in">
                        <p class="title" :key="currentSong">{{ musicPlaylist[currentSong].title }}</p>
                    </transition>
                    <transition name="slide-fade" mode="out-in">
                        <p class="artist" :key="currentSong">{{ musicPlaylist[currentSong].artist }}</p>
                    </transition>
                </div>

                <div class="currentTimeContainer" style="text-align:center">
                    <span class="currentTime">{{ currentTime | fancyTimeFormat }}</span>
                    <span class="totalTime"> {{ trackDuration | fancyTimeFormat }}</span>
                    <!-- <span style="color:black">({{ currentSong+1 }}/{{ musicPlaylist.length }})</span> -->
                </div>

                <div class="currentProgressBar">
                    <div class="currentProgress" :style="{ width: currentProgressBar + '%' }"></div>
                </div>

                <div class="playerButtons">

                    <v-btn icon large dark :disabled="!currentSong" @click="prevSong()">
                        <v-icon color="black" size="50px">skip_previous</v-icon>
                    </v-btn>

                    <v-btn icon large dark @click="playAudio()">
                        <v-icon color="black" v-if="!currentlyPlaying" size="60px" :key="1">play_circle_filled</v-icon>
                        <v-icon color="black" v-if="currentlyPlaying" size="60px" :key="1">pause_circle_filled</v-icon>
                    </v-btn>

                    <v-btn icon large dark :disabled="currentSong==musicPlaylist.length-1" @click="nextSong()">
                        <v-icon color="black" size="50px">skip_next</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>
<script>
export default {
    name: 'media-music-player',
    data() {
        return {
            audio: "",
            imgLoaded: false,
            currentlyPlaying: false,
            currentlyStopped: false,
            currentTime: 0,
            checkingCurrentPositionInTrack: "",
            trackDuration: 0,
            currentProgressBar: 0,
            isPlaylistActive: false,
            currentSong: 0,
            debug: false,
            audioFile: "",
            audioExt:[
                'mp3',
                'webm'
            ]
        }
    },
    mounted: function() {
        this.changeSong();
        this.audio.loop = false;
    },
    filters: {
        fancyTimeFormat: function(s) {
            return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
        }
    },
    computed:{
        musicPlaylist: function(){

            var files = this.$store.state.contents.filter(
                item => {
                    if(this.audioExt.indexOf(item.extension) != -1 ){
                        return true;
                    }
                }
            );

            files.forEach(file => {
                file.url = file.filePath;
                file.title = file.name;
                file.image = "https://source.unsplash.com/crs2vlkSe98";
                file.artist = "Daniel Simion";
            });

            return files;
        }
    },
    methods: {
        togglePlaylist: function() {
            this.isPlaylistActive = !this.isPlaylistActive;
        },
        nextSong: function() {
            if (this.currentSong < this.musicPlaylist.length - 1)
            this.changeSong(this.currentSong + 1);
        },
        prevSong: function() {
            if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
        },
        changeSong: function(index) {
            var wasPlaying = this.currentlyPlaying;
            this.imageLoaded = false;
            if (index !== undefined) {
                this.stopAudio();
                this.currentSong = index;
            }
            this.audioFile = this.musicPlaylist[this.currentSong].url;
            this.audio = new Audio(this.audioFile);
            var localThis = this;
            this.audio.addEventListener("loadedmetadata", function() {
                localThis.trackDuration = Math.round(this.duration);
            });
            this.audio.addEventListener("ended", this.handleEnded);
            if (wasPlaying) {
                this.playAudio();
            }
        },
        isCurrentSong: function(index) {
            if (this.currentSong == index) {
                return true;
            }
            return false;
        },
        getCurrentSong: function(currentSong) {
            return this.musicPlaylist[currentSong].url;
        },
        playAudio: function() {
            if (
                this.currentlyStopped == true &&
                this.currentSong + 1 == this.musicPlaylist.length
            ) {
                this.currentSong = 0;
                this.changeSong();
            }
            if (!this.currentlyPlaying) {
                this.getCurrentTimeEverySecond(true);
                this.currentlyPlaying = true;
                this.audio.play();
            } else {
                this.stopAudio();
            }
            this.currentlyStopped = false;
        },
        stopAudio: function() {
            this.audio.pause();
            this.currentlyPlaying = false;
            this.pausedMusic();
        },
        handleEnded: function() {
            if (this.currentSong + 1 == this.musicPlaylist.length) {
                this.stopAudio();
                this.currentlyPlaying = false;
                this.currentlyStopped = true;
            } else {
                this.currentlyPlaying = false;
                this.currentSong++;
                this.changeSong();
                this.playAudio();
            }
        },
        onImageLoaded: function() {
            this.imgLoaded = true;
        },
        getCurrentTimeEverySecond: function() {
            var localThis = this;
            this.checkingCurrentPositionInTrack = setTimeout(
                function() {
                    localThis.currentTime = localThis.audio.currentTime;
                    localThis.currentProgressBar =
                    localThis.audio.currentTime / localThis.trackDuration * 100;
                    localThis.getCurrentTimeEverySecond(true);
                }.bind(this),
                1000
            );
        },
        pausedMusic: function() {
            clearTimeout(this.checkingCurrentPositionInTrack);
        }
    },
    watch: {
        currentTime: function() {
            this.currentTime = Math.round(this.currentTime);
        }
    },
    beforeDestroy: function() {
        this.audio.removeEventListener("ended", this.handleEnded);
        this.audio.removeEventListener("loadedmetadata", this.handleEnded);

        clearTimeout(this.checkingCurrentPositionInTrack);
    }
}
</script>
