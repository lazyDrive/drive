<template>
    <div class="media-browser">
        <div class="media-action">
            <form enctype="multipart/form-data" ref="formFile">
                <input multiple type="file" hidden ref="inputFile" @change="processFile"/>
            </form>
        </div>

        <!-- media nav -->
        <media-nav-bar
        @tiggerSelectFile="selectFile"
        ></media-nav-bar>

        <!-- Media content -->
        <media-content></media-content>

        <!-- Media Upload Menu -->
        <media-upload-menu></media-upload-menu>

        <!-- Media settings -->
        <media-settings></media-settings>

    </div>
</template>

<script>
export default {
    name: 'media-browser',
    data(){
        return {
            file:""
        }
    },
    methods:{
        selectFile: function() {
            const inputFile = this.$refs.inputFile;
            if(inputFile)
            {
                inputFile.click();
            }
            else {
                console.log('error');
            }
        },
        processFile: function() {
            const formData = new FormData();
            var files = this.$refs.inputFile.files;

            for( var i = 0; i < files.length; i++ ){
                let file = files[i];

                formData.append('files', file);
            }

            this.$store.dispatch('upload', formData);

            this.$refs.formFile.reset();
        }
    }
}
</script>
