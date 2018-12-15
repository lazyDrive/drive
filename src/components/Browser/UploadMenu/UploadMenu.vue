<template>
    <div class="media-upload-menu" v-if="0">
        <v-card class="elevation-12 upload-section"
        >
        <v-toolbar dark>
            <v-toolbar-title>Uploading</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark icon>
                <v-icon>add</v-icon>
            </v-btn>
            <v-btn dark icon>
                <v-icon>expand_less</v-icon>
            </v-btn>
            <v-btn dark icon>
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list subheader class="scroll-section">
            <v-subheader><strong>Folders</strong></v-subheader>
            <v-list-tile  v-for="item in itemsupload" :key="item.title" avatar @click="1">
                <div class="progress" :style="`width: ${value}%`"></div>
                <v-list-tile-avatar>
                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn small icon color="error">
                        <v-icon color="white lighten-1">close</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-subheader>Files</v-subheader>
            <v-list-tile v-for="item in items2upload" :key="item.title" @click="1">
                <div class="progress" :style="`width: ${value}%`"></div>
                <v-list-tile-avatar>
                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn small icon color="success">
                        <v-icon color="white lighten-1">check</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-card>
</div>
</template>

<script>
export default {
    name: 'media-upload-menu',
    data: () => ({
        value: 60,
        itemsupload: [
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
            { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2upload: [
            { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
            { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
        ]
    })
}
</script>
