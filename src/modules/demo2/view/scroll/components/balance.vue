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
    classes() {
      return {
        ghbBalanceNervous: this.type == 'nervous'
      };
    }
  }
};
</script>

<style lang="scss">
.ghb_balance {
    font-size: 12px;
    padding: 0.2rem 0;
}

.ghbBalanceNervous {
    color: red;
}
</style>
