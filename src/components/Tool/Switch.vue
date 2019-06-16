<template>
  <div class="lazy_switch">
    <label class="switch" :for="`toggle${sid}`">
      <input
        type="checkbox"
        :id="`toggle${sid}`"
        v-bind:value="value"
        v-on:input="updateValue($event)"
      >
      <span class="slider"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'lazy-switch',
  data: () => {
    return {}
  },
  props: ['sid', 'value'],
  methods: {
    updateValue: function (value) {
      console.log(value)
      // this.$emit("input", value);
    }
  }
}
</script>
