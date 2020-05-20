<template>
  <div class="ghb_balance" :class="classes">
    <span>-</span>
    <slot></slot>
    <span>-</span>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    classes () {
      return {
        'ghb_balance_nervous': this.type == 'nervous'
      };
    }
  }
};
</script>

<style lang="less">
  .ghb_balance{
    font-size: @fs18;
    padding: .2rem 0;
  }

  .ghb_balance_nervous {
    color: @color-main;
  }

</style>
