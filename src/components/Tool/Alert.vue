<template>
    <v-snackbar
    v-model="snackbarState"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
    :color="this.$store.state.showsnackbarcolor"
    >
    {{ this.$store.state.showsnackbardata }}
    <v-btn
    color="white"
    flat
    @click="close()"
    >
    Close
</v-btn>
</v-snackbar>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
    name: 'Alert',
    data: () => {
        return {
            y: 'bottom',
            x: 'left',
            mode: '',
            timeout: 6000
        }
    },
    props: {

    },
    computed: {
        snackbarState: {
            get: function() {
                return this.$store.state.showsnackbar;
            },
            set: function() {
                // think about this
                setTimeout(function () {
                    this.$store.commit(types.HIDE_SNACKBAR);
                }.bind(this), 1000);
            }
        }
    },
    methods:{
        close: function(){
            this.$store.commit(types.HIDE_SNACKBAR);
        }
    }
}

</script>
