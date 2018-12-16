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
        <h3 class="headline mb-0">{{item.name}}</h3>
        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
    </div>

    <div class="m-d-info">
        <table>
            <tr>
                <td class="m-d-td">Type</td>
                <td class="m-d-td"><strong>{{ item.type }}</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">February</td>
                <td class="m-d-td"><strong>Anurag Kumar</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">January</td>
                <td class="m-d-td"><strong>$10011111111112323</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">February</td>
                <td class="m-d-td"><strong>Anurag Kumar</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">January</td>
                <td class="m-d-td"><strong>$10011111111112323</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">February</td>
                <td class="m-d-td"><strong>Anurag Kumar</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">January</td>
                <td class="m-d-td"><strong>$10011111111112323</strong></td>
            </tr>
            <tr>
                <td class="m-d-td">February</td>
                <td class="m-d-td"><strong>Anurag Kumar</strong></td>
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
