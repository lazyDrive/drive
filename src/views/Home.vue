<template>
    <div class="media-home">

        <!-- Media browser -->
        <media-browser></media-browser>

        <!-- Add models -->
        <media-model></media-model>

        <!-- Add menu -->
        <media-menu></media-menu>

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
