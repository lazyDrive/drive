<template>
    <div class="media-home">

        <!-- media nav -->
        <media-nav-bar></media-nav-bar>

        <!-- Media content -->
        <media-content></media-content>

        <!-- Media quick tool -->
        <media-tool-model></media-tool-model>

        <!-- Add models -->
        <media-settings></media-settings>
        <media-tool-model></media-tool-model>
        <media-rename-model></media-rename-model>
        <media-confirm-delete-model></media-confirm-delete-model>
        <media-create-folder-model></media-create-folder-model>

        <!-- Add menu -->
        <media-file-menu></media-file-menu>
        <media-folder-menu></media-folder-menu>

        <!-- Add snackbar -->
        <media-alert></media-alert>

        <!-- Add online state -->
        <media-online-state></media-online-state>
    </div>
</template>

<script>
export default {
    name: 'media-home',
    mounted () {
        this.$store.dispatch('getContents', 20);
    }
}
</script>
