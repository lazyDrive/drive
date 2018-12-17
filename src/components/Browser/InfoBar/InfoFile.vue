<template>
    <div class="m-d-img" id="media-info-file">
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
    </v-layout>

    <br>
    <div class="m-d-details">
        <h3 class="headline mb-0"><strong>{{item.name}}</strong></h3>
        <!-- <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div> -->
    </div>

    <div class="m-d-info">
        <table>
            <tr>
                <td class="m-d-td">Type</td>
                <td class="m-d-td"><strong>{{ item.type }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Created Date</td>
                <td class="m-d-td"><strong>{{ item.created_date }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Modified Date</td>
                <td class="m-d-td"><strong>{{ item.created_date }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Size</td>
                <td class="m-d-td"><strong>{{ item.size }} KB</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Extension</td>
                <td class="m-d-td"><strong>{{ item.extension }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Mime Type</td>
                <td class="m-d-td"><strong>{{ item.mime_type }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Dimensions</td>
                <td class="m-d-td"><strong>{{ item.dimensions.height }} x {{ item.dimensions.width }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">Owner</td>
                <td class="m-d-td"><strong>Me</strong></td>
            </tr>
        </table>
    </div>

    <v-btn flat color="success">Copy Details</v-btn>
    <v-btn flat color="success">Share</v-btn>
    <br>
    <div class="media-toolbar"></div>
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
