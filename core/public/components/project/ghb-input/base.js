export default {
  watch: {
    currentValue(newVal) {
      this.$emit('input', newVal);
    }
  },
  computed: {
    currentValue: {
      get() {return this.value},
      set(v) { this.$emit('input', v)}
    },
  }
}
