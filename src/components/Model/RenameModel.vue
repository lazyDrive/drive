<template>
    <div id="media-rename">
        <v-dialog v-model="this.$store.state.showRenameModal" persistent width="500px">
            <v-card>
                <v-card-title
                class="grey lighten-4 title"
                >
                Rename
                <v-spacer></v-spacer>
                <v-icon >folder</v-icon>
            </v-card-title>
            <v-container >
                <v-flex>
                    <v-text-field
                    v-model="defaultData"
                    solo
                    @focus="$event.target.select()"
                    autofocus
                    label="Folder name"
                    ></v-text-field>
                </v-flex>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="hideRenameModal()">Cancel</v-btn>
                <v-btn color="success">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
    name: 'media-rename',
    data: () => ({
        defaultData:'Untitled Folder'
    }),

    props: {

    },

    methods:{
        hideRenameModal: function() {
            this.$store.commit(types.HIDE_RENAME_MODAL);
        }
    }
}
</script>
<style>
.confirm-text {
    text-align: left;
    font-size: 20px;
}
</style>
