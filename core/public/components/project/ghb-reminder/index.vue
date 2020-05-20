<template>
<div class="ghb-reminder" :style="{marginTop: marginTop}">
  <div class="reminder-title">
    <div class="reminder-title-icon">
      <img src="./imgs/icon_wenxints_16@2x.png" alt="">
    </div>
    <div class="reminder-title-text">{{title}}</div>
  </div>
  <slot></slot>
</div>
</template>
<script>

export default {
  name: "ghb-reminder",
  props: {
    gutter: {
      type: String,
      default: '10'
    },
    title: {
      type: String,
      default: '温馨提示'
    },
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
    }
  }
}
</script>
<style lang="less">
@import '~@core/public/less/mixin.less';

.ghb-reminder {
  color: @tipsValueFontColor;
  padding: 0 @spacing;
  >div {
    font-size: 13px;
  }
}
.reminder-title{
  display: flex;
  margin-bottom: 10px;
  &-icon{
    .setIconSize(.32rem, .32rem);
    margin-right: 5px;
  }
  &-text{
    line-height: 16px;
    font-size: 13px;
  }
}
</style>
