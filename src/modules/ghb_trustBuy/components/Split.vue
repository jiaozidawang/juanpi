/**
 * description: splitBar
 */
<template>
  <div
    class="splitWrap nmb-bg-t11"
    :style="splitStyle">
  </div>
</template>

<script>
export default {

  name: 'Split',

  props: {
    gutter: {
      type: Number,
      default: 10
    }
  },

  computed: {
    splitStyle: function () {
      return {
        'height': `${this.gutter / 50}rem`
      };
    }
  },

  data: function () {
    return {};
  },

};
</script>

<style lang="scss" scoped>
</style>
