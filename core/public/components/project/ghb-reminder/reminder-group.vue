<template>
<div class="ghb-reminder-group">
  <div class="ghb-reminder-group-title" :style="{marginTop: marginTop, marginBottom: marginBottom}">{{title}}</div>
  <slot></slot>
</div>
</template>
<script>
export default {
  name: "ghb-reminder-item",
  props: {
    title: String,
    gutter: {
      type: String,
      default: '10'
    }
  },
  computed: {
    marginTop () {
      let margin = this.gutter;
      if(margin.indexOf('px') > 0) {
        return margin
      }
      if(margin.indexOf('rem') > 0) {
        return margin
      }
      return margin + 'px'
    },
    marginBottom () {
      return '5px'
    }
  }
}
</script>
<style lang="less">
.ghb-reminder-group {
  // font-weight: bold;
  &-title{

  }
}
</style>
