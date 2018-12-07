<template>
  <div>
    <media-alert :snackbar="!state.online" :text="state.text" />
    <!-- <v-dialog v-model="dialog" width="800px"></v-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'status',
  props: {
    onlineClass: {
      type: String,
      required: false
    },
    offlineClass: {
      type: String,
      required: false
    }
  },

  data: function() {
    return {
      state: {
        online: navigator.onLine,
        text:'Now you are offline'
      },
      dialog: this.checkState()
    };
  },

  mounted: function() {
    const vm = this;
    window.addEventListener('load', function() {
      window.addEventListener('online', vm.updateOnlineStatus);
      window.addEventListener('offline', vm.updateOnlineStatus);
    });
  },

  beforeDestroy: function() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },

  methods: {
    updateOnlineStatus: function() {
      const vm = this;
      vm.state.online = navigator.onLine || false;
      vm.$emit('detected-condition', vm.state.online);
    },
    checkState: function(){

      // console.log('sa');
    }
  }
}
</script>

<style>
.green {
  color: #20c997!important;
}

.red {
  color: red!important;
}

</style>
