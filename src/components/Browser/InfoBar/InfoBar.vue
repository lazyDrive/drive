<template>
    <v-navigation-drawer
    v-model="menuState"
    right
    dark
    clipped
    app
    width="330"
    fixed
    :stateless="true"
    >
    <v-list dense>
        <v-list-tile @click.stop="hideInforbar()">
            <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Click to close</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
    name: 'Details',
    data: () => ({
        right: true
    }),
    props: {

    },
    components:{

    },
    computed: {
        rand : function() {
            return Math.floor((Math.random() * 100000000) + 1);
        },
        menuState: {
            get: function() {
                return this.$store.state.showInfoBar;
            },
            set: function() {
                // this.$store.commit(types.HIDE_INFOBAR);
            }
        }
    },
    methods:{
        about: function(a) {
            console.log(a);
        },
        settings: function(a) {
            console.log(a);
        },
        hideInforbar: function(){
            this.$store.commit(types.HIDE_INFOBAR);
        },
        fire: function(a){
            this[a](a);
        }
    }
}
</script>
