<template>
    <div>
        <v-card light>
            <v-icon size="100">folder</v-icon>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </v-card>
        <br>
    </div>
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
