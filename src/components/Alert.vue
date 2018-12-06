<template>
  <v-snackbar
  v-model="snackbar"
  :bottom="y === 'bottom'"
  :left="x === 'left'"
  :multi-line="mode === 'multi-line'"
  :right="x === 'right'"
  :timeout="timeout"
  :top="y === 'top'"
  :vertical="mode === 'vertical'"
  >
  {{ text }}
  <v-btn
  color="white"
  flat
  @click="snackbar = false"
  >
  Close
</v-btn>
</v-snackbar>
</template>

<script>

export default {
  data: () => {
    return {
      y: 'bottom',
      x: 'left',
      mode: ''
    }
  },
  props: {
    text:{
      type: Object,
      default: null
    },
    timeout:{
      type: Number,
      default: 6000
    },
    snackbar:{
      type: Boolean,
      default: true
    }
  }
}

</script>
