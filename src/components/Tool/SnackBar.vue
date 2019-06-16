<template>
  <transition name="snackbar">
    <div v-if="active" class="snackbar" :class="classes">
      <div :class="`snackbar__wrap ${color}`">
        <div class="snackbar__body">
          <slot></slot>
          {{messagedata}}
          <button class="close-btn" @click="hide">close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as types from './../../store/mutation-types'

export default {
  name: 'snackbar',
  props: {
    timeout: {
      type: Number,
      default: 3000
    },
    infinity: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom-left'
    }
  },
  data () {
    return {
      timer: null
    }
  },
  watch: {
    active () {
      this.setTimer()
    }
  },
  computed: {
    classes () {
      return {
        [`snackbar--${this.position}`]: true
      }
    },
    active () {
      return this.$store.state.showsnackbar.state
    },
    color () {
      return this.$store.state.showsnackbar.color
    },
    messagedata () {
      return this.$store.state.showsnackbar.data || 'Empty Message.'
    }
  },
  methods: {
    hide () {
      this.$store.commit(types.HIDE_SNACKBAR)
    },
    setTimer () {
      if (this.timer) clearTimeout(this.timer)

      if (this.infinity) return

      this.timer = setTimeout(() => {
        if (this.active) {
          this.hide()
        }
      }, this.timeout)
    }
  }
}
</script>
