<template>
  <div class="ghb-operate-rusult-item">
    <div class="page__body" :style="{fontSize: fontSize}">
      <span>{{title}}</span>
      <p class="body-div-p" :class="isBold ? 'body-div-p--bold': ''" :style="valueStyle">
        {{text}}
        <slot name="default"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: "14px"
    },
    valueStyle: {
      type: Object
    },
    isBold: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    btnEvent() {
      // 默认按钮点击事件
      this.$emit("btnEvent");
    }
  },
  mounted() {
    // if (!this.isSuccess) {
    //     this.imgUrl = this.failImgUrl;
    // } else {
    //     this.imgUrl = this.successImgUrl;
    // }
  }
};
</script>

<style lang='less'>
@import "../../../less/mixin.less";
.ghb-operate-rusult-item {
  background: #fff;
  padding: 0.16rem 0.32rem;
  .page__body {
    display: flex;
    justify-content: space-between;
    line-height: 0.3rem;
    color: #888888;
    span {
      max-width: 1.98rem;
      width: 1.98rem;
    }
    .body-div-p {
      max-width: 4.48rem;
      word-wrap: break-word;
      text-align: right;
    }
    .body-div-p--bold {
      color: @font-t1;
      font-weight: bold;
    }
  }
  &:first-child {
    margin-top: 0.2rem;
    padding-top: 0.32rem;
  }
  &:last-child {
    padding-bottom: 0.32rem;
  }
}
</style>

