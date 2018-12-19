<template>
    <div class="text-xs-center folder" @click="select($event, item)" @contextmenu="show(this, item.id)" id="media-folder" >
        <v-chip
        :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected' : 'unselected'} ${menuState ? 'info-chip-size' : 'm-chip-size'}`"
         color="#CFD8DC" text-color="black" slot="activator">
        <v-avatar :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected-folder' : 'unselected'} m-f-pointer`">
            <v-icon :color="item.color">folder</v-icon>
        </v-avatar >
        <span :class="`${selectedState ? 50 : 2} ${selectedState ? 'selected-folder' : 'unselected'} m-f-pointer`">{{ getName }}</span>
    </v-chip>
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
            var res = this.$store.state.selectedItems.filter(file => {
                return file.id === this.item.id
            })

            if(res.length != 0) {
                return true;
            } else {
                return false;
            }
        },
        getName: function(){
            if(this.item.name.length >= 15)
            {
                return this.item.name.substring(0, 15) + "..";
            } else {

                return this.item.name;
            }
        },
        menuState: function(){
            return this.$store.state.showInfoBar;
        },
    },
    methods: {
        show : function(e, id){
            e = e || window.event;
            e.preventDefault()

            this.select(e, this.item);

            this.$store.commit(types.HIDE_FILE_MENU, id);
            this.$store.commit(types.HIDE_FOLDER_MENU, id);
            this.$store.commit(types.SHOW_FOLDER_MENU, id);

            this.$nextTick(() => {
                this.$store.state.showFolderMenu = true;
            })
        },
        select: function(e, item){
            e = e || window.event;
            e.preventDefault()

            if (!(e.shiftKey || e.ctrlKey )) {
                this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            }

            if(this.selectedState)
            {
                this.$store.commit(types.UNSELECT_BROWSER_ITEM, item);
            }else {
                this.$store.commit(types.SELECT_BROWSER_ITEM, item);
            }
        }
    }
}
</script>
