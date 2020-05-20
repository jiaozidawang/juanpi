<template>
  <span class="vux-label-desc"><slot></slot></span>
</template>

<script>
export default {
  name: 'inline-desc'
}
</script>

<style lang="less">
.vux-label-desc {
  font-size: @fs24;
  color: @font-t2;
}
</style>
