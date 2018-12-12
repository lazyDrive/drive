<template>
    <div class="text-xs-center folder" @click="select(this, item.id)" @contextmenu="show(this, item.id)" id="media-folder" >
        <v-tooltip top>
            <v-chip
            :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected' : 'unselected'}`"
            v-bind:color="item.color" text-color="white" width="100px" class="chip-size" slot="activator">
                <v-avatar :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected-file' : 'unselected'}`">
                    <v-icon class="chip-folder"

                    >folder</v-icon>
                </v-avatar >
                <span :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected-file' : 'unselected'}`">{{ item.name }}</span>
            </v-chip>
            <span>{{ item.name }}</span>
        </v-tooltip>
    </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'media-folder',
    data: () => ({

    }),
    props: ['item'],
    computed: {
        selectedState: function(){
            var res = this.$store.state.selectedItems.indexOf(this.item.id);

            if(res != -1) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        show : function(e,id){
            e = e || window.event;
            e.preventDefault()

            this.select(e, id);

            this.$store.commit(types.HIDE_FILE_MENU, id);
            this.$store.commit(types.HIDE_FOLDER_MENU, id);
            this.$store.commit(types.SHOW_FOLDER_MENU, id);

            this.$nextTick(() => {
                this.$store.state.showFolderMenu = true;
            })
        },
        select: function(e, id){
            e = e || window.event;
            e.preventDefault()

            if(e.ctrlKey){
                this.$store.commit(types.SELECT_BROWSER_ITEM, id);
            }
            else{
                this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS, id);
                this.$store.commit(types.SELECT_BROWSER_ITEM, id);
            }
        }
    }
}
</script>

<style>
.folder{
    margin: 10px 12px;
}
.chip-size{
    padding: 3px 19px;
}
.chip-size .v-chip__content{
    cursor: pointer!important;
}
.folder-text{
    font-size: 15px;
    padding: 0 16px!important;
    text-align: center!important;
}
.selected-file{
    color: black!important;
}
.selected{
    background-color: #e8f0fe!important;
}
</style>
