<template>
  <div class="details">
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      clipped
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
   v-model="right"
   right
   dark
   width="500"
   temporary
   fixed
 >
 <v-list dense>
   <v-list-tile @click.stop="right = !right">
     <v-list-tile-action>
       <v-icon>exit_to_app</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
 </v-list>


</v-navigation-drawer>
</div>
</template>

<script>

export default {
  name: 'Details',
  data: () => ({
    right: false,
    left: false,
    items: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' }
    ]
  }),
  props: {
    drawerRight: {
      type: Boolean,
      default: false
    }
  },
  components :{

  },
  mounted(){

  },
  methods :{
    about: function(a) {
      this.rightdrawer  = false;
      console.log(a);
    },
    settings: function(a) {
      this.rightdrawer  = true;
      console.log(a);
    },
    fire: function(a){
      this[a](a);
    }
  }
}
</script>
