<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="cleanStyle({ color: titleColor })" v-html="title"></div>
    <slot name="title"></slot>
    <div class="weui-cells" :class="{ 'vux-no-group-title': !title}" :style="cleanStyle({ marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter, backgroundColor: hasBg ? '#fff' : 'rgba(0, 0, 0, 0)'})">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
    <div class="weui-cells__title vux-group-footer-title" v-if="footerTitle" :style="cleanStyle({ color: footerTitleColor })" v-html="footerTitle"></div>
  </div>
</template>

<script>
import cleanStyle from "@comp/vux-support/libs/clean-style";

export default {
  name: "group",
  methods: {
    cleanStyle
  },
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: {
      type: [String, Number],
      default: "10px"
    },
    footerTitle: String,
    footerTitleColor: String,
    hasBg: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
@import "../../styles/weui/widget/weui_cell/weui_access";
@import "../../styles/weui/widget/weui_cell/weui_cell_global";
@import "../../styles/blank.less";
@import "../../../less/mixin.less";
.vux-no-group-title {
  margin-top: @group-title-margin-top;
}

// .weui-cells {
//   &:after {
//       .setBottomLine(@spacing)!important;
//   }
// }

.vux-group-footer-title.weui-cells__title {
  margin-top: @group-footer-title-margin-top;
  margin-bottom: @group-footer-title-margin-bottom;
  padding-top: 0;
  font-size: 12px;
}

/* global config for group items */
.vux-cell-value {
  color: @cell-value-color;
}
.vux-cell-placeholder {
  color: @cell-placeholder-color;
}
</style>
