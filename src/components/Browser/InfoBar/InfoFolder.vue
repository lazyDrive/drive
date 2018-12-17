<template>
    <div id="media-info-folder">
        <v-icon size="100">folder</v-icon>
        <br>
        <div>
            <h3 class="headline mb-0"><strong>{{ item.name }}</strong></h3>
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

        <v-btn flat color="orange">Copy Details</v-btn>
        <v-btn flat color="orange">Share</v-btn>
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
