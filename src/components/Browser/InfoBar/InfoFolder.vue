<template>
    <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
                <div>
                    <div class="headline">Unlimited music now</div>
                    <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'media-info-folder',
    data() {
        return {
        }
    },
    props: ['item'],
    computed: {

    },
    methods:{
    }
}
</script>
