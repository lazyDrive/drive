<template>
    <div class="media-browser">
        <div class="media-action">
            <div class="file">
                <form enctype="multipart/form-data" ref="formFile">
                    <input multiple type="file" hidden ref="inputFile" @change="processFile"/>
                </form>
            </div>
            <div class="folder">
                <form enctype="multipart/form-data" ref="formFolder">
                    <input multiple type="file" webkitdirectory mozdirectory hidden ref="inputFolder" @change="processFile"/>
                </form>
            </div>
        </div>
        <!-- media nav -->
        <media-nav-bar @tiggerSelectFile="selectFile" @tiggerSelectFolder="selectFolder"></media-nav-bar>

        <!-- Media content -->
        <media-content></media-content>

        <!-- Media Upload Menu -->
        <media-upload-menu></media-upload-menu>

        <!-- quick upload -->
        <media-quick-upload @tiggerSelectFile="selectFile" ></media-quick-upload>

        <!-- Media settings -->
        <media-settings></media-settings>

    </div>
</template>

<script>
export default {
    name: 'media-browser',
    data(){
        return {
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
        selectFolder: function() {
            const inputFolder = this.$refs.inputFolder;
            if(inputFolder)
            {
                inputFolder.click();
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
        },
        processFolder: function() {
            const formData = new FormData();
            var files = this.$refs.inputFolder.files;

            for( var i = 0; i < files.length; i++ ){
                let file = files[i];

                formData.append('files', file);
            }

            this.$store.dispatch('upload', formData);

            this.$refs.formFolder.reset();
        }
    }
}
</script>
