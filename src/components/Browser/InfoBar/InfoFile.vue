<template>
    <div>
        <v-card light>
            <v-img
            aspect-ratio="1.75"
            :src="item.imgUrl"
            :lazy-src="item.imgLazyUrl"
            ></v-img>
            <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
            >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{item.name}}</h3>
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
    name: 'media-info-file',
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
