<!--
    opreate_result组件，用于操作结果展示使用
    @author :liuyunxiao
    可传值 ：
    ResultType： 操作结果类型,枚举值success ,fail, wait
    title： 操作成功、失败、等待标题
    describe： 操作结果详细描述，如需多颜色，自己span定义颜色包住传过来
    <div slot='special'><div>作为插槽传入自己定义的cell在按钮上
    btnText：按钮显示文字，如果不传则不显示按钮
 -->

<template>
  <div class="ghb-operate-result">
    <div class="main-container">
      <div class="main-container__img">
        <img :src="imgUrl">
      </div>
      <div class="main-container__title" v-if="title">
        <slot name="title">
          <span>{{title}}</span>
        </slot>
      </div>

      <p class="main-container__des">
        <slot name="describe">
          <span v-if="describe">{{describe}}</span>
        </slot>
      </p>

      <!-- 该插槽用于特殊的Cell -->
      <slot name="special"></slot>

      <!-- 默认按钮 -->
      <div class="btn-box" v-if="btnText">
        <m-button class="btn-lg" @clickHandler="btnEvent" type="primary">{{btnText}}</m-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  props: {
    ResultType: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    describe: {
      type: String,
      default: ""
    },
    btnText: {
      type: String,
      default: ""
    }
  },

  methods: {
    btnEvent() {
      // 默认按钮点击事件
      this.$emit("on-button-click");
    }
  },
  mounted() {
    let _this = this;
    switch (_this.ResultType) {
      case "success":
        _this.imgUrl = require("./image/success@2x.png");
        break;
      case "fail":
        _this.imgUrl = require("./image/icon_jieguoy_shibai@2x.png");
        break;
      case "wait":
        _this.imgUrl = require("./image/success@2x.png");
        break;
    }
  },
  beforeUpdate() {
    let _this = this;
    switch (_this.ResultType) {
      case "success":
        _this.imgUrl = require("./image/success@2x.png");
        break;
      case "fail":
        _this.imgUrl = require("./image/icon_jieguoy_shibai@2x.png");
        break;
      case "wait":
        _this.imgUrl = require("./image/success@2x.png");
        break;
    }
  }
};
</script>

<style lang='less'>
@import "../../../less/mixin.less";
.btn-box {
  margin-top: 0.8rem;
}
.ghb-operate-result {
  .main-container {
    padding: 0.78rem 0 0.01rem 0;
    background-color: #fff;
    position: relative;
    &::after{
      .setBottomLine();
    }
    .main-container__img {
      margin: 0 auto;
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    .main-container__title {
      margin-top: 0.3rem;
      text-align: center;
      font-size: @fs30;
      line-height: 0.42rem;
      color: #333;
    }
    .main-container__des {
      margin-top: 0.16rem;
      margin-bottom: 0.28rem;
      display: flex;
      justify-content: center;
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: #b3b3b3;
      text-align: center;
      word-break: break-all;
    }

    .btn-box {
      margin-top: 0.8rem;
    }
  }
}
</style>

