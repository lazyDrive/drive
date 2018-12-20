<template>
    <div id="media-tool" v-if="this.$store.state.isMobile">
        <v-btn
        fab
        bottom
        right
        color="info"
        dark
        fixed
        @click="select()"
        >
        <v-icon>cloud_upload</v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    name: 'media-tool',
    data: () => ({
        dialog: false
    }),

    methods:{
        select: function() {
            this.$emit('tiggerSelectFile')
        }
    }
}
</script>
