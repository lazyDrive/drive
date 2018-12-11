<template>
    <div id="media-tool">
        <v-btn
        fab
        bottom
        right
        color="info"
        dark
        fixed
        large
        @click="showToolModal()"
        >
        <v-icon>cloud_upload</v-icon>
    </v-btn>

    <v-dialog v-model="this.$store.state.showToolModal" persistent width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title"> Upload</v-card-title>

            <v-container grid-list-sm class="pa-4">
                <!-- dialog content -->
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="hideToolModal()">Close</v-btn>
                <v-btn color="success" @click="hideToolModal()">Done</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
    name: 'media-tool',
    data: () => ({
        dialog: false
    }),

    methods:{
        hideToolModal: function() {
            this.$store.commit(types.HIDE_TOOL_MODAL);
        },
        showToolModal: function() {
            this.$store.commit(types.SHOW_TOOL_MODAL);
        }
    }
}
</script>
