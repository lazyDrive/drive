<template>
    <div id="media-online">
        <v-dialog v-model="dialog" persistent width="300px"></v-dialog>
    </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-online',
    props: {
    },

    data: function() {
        return {
            dialog: false
        };
    },

    mounted: function() {
        const vm = this;
        window.addEventListener('load', function() {
            window.addEventListener('online', vm.updateOnlineStatus);
            window.addEventListener('offline', vm.updateOnlineStatus);
        });
    },

    beforeDestroy: function() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },

    methods: {
        updateOnlineStatus: function() {

            var state =  navigator.onLine || false;

            if(state == true) {
                this.$store.commit(types.SHOW_SNACKBAR, 'You are online.');
                this.dialog = false;
            }
            else {
                this.$store.commit(types.SHOW_SNACKBAR, 'You are offline. Some functionality may be unavaliable.');
                this.dialog = true;
            }
        }
    }
}
</script>

<style>
.green {
    color: #20c997!important;
}

.red {
    color: red!important;
}

</style>
