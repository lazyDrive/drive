<template>
    <div id="media-info-folder">
        <v-icon size="100">folder</v-icon>
        <br>
        <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
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

        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
        <br>
        <div class="media-toolbar"></div>
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
