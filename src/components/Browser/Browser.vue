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
                    <input multiple type="file" directory webkitdirectory mozdirectory hidden ref="inputFolder" @change="processFolder"/>
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
            var files = this.$refs.inputFile.files;
            const uploadPath = this.$store.state.selectedDirectory;

            for( var i = 0; i < files.length; i++ ){
                let file = files[i];
                file.id = i;

                const formData = new FormData();
                formData.append('files', file);
                formData.append('uploadPath', uploadPath);

                this.$store.dispatch('upload', {formData, uploadPath});
            }

            this.$refs.formFile.reset();
        },
        processFolder: function() {
            var files = this.$refs.inputFolder.files;
            const uploadPath = this.$store.state.selectedDirectory;

            for( var i = 0; i < files.length; i++ ){
                let file = files[i];
                file.id = i;


                const formData = new FormData();
                formData.append('files', file);
                formData.append('uploadPath', uploadPath);
                formData.append('webkitRelativePath', file.webkitRelativePath);

                this.$store.dispatch('upload', {formData, uploadPath});
            }

            this.$refs.formFolder.reset();
        }
    }
}
</script>
