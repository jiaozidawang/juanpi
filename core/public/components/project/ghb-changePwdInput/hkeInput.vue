<template>
  <div class="ghb-changePwdInput vux-1px-t2">
    <div class="ghb-changePwdInpu_content" >
      <div class="ghb-changePwdInput_title">{{title}}</div>
      <div class="ghb-changePwdInput_value">
        <input ref="input" :id="uuid" :placeholder="__placeholder" readonly @click="focusFn" type="password" @blur="onBlur">
        <div class="ghb-changePwdInput_value_circle" v-for="item in placeholdPwd">{{item}}</div>
        <div :class="{'flashLine': isFocus}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { showCloudKeyboard, hideCloudKeyboard, alert, getCloudIdentitySign } from "@bridge";
import { pwdStrength } from "./utils";
import { setInterval, clearInterval, setTimeout } from "timers";
import uuid from '../../vux-support/mixins/uuid.js';
import commonProps from "./utils/props";
let props = {...commonProps, pinServerRandom: '', passwordType: ''};
export default {
  name: "ghb-hkeInput",
  props,
  mixins: [uuid],
  data() {
    return {
      placeholdPwd: [],
      isFocus: false
    };
  },
  computed: {
    __placeholder () {
      if(this.placeholdPwd.length <= 0) {
        return this.placeholder;
      } else {
        return ''
      }
    }
  },
  methods: {
    // 设置输入框中的 ● 的数量
    setPwd(len = 0) {
      this.placeholdPwd = Object.freeze(_.fill(Array(len), "●"));
      return "";
    },
    // 客户端派发事件的回调函数
    keyboardEvent({ data }) {
      const { len, pwdKey, InputState, reg } = data;
      /**
       * reg 返回一个数组
       * [0]是否包含大写字符
       * [1]是否包含小写字母
       * [2]是否包含数字
       * [3]是否包含符号
       * [4]是否为连续字符
       * [5]是否全部重复
       */
      this.pwd = pwdKey;
      this.$emit("input", data);
      if (InputState == "close") {
        // 失焦
        this.onBlur();
        this.$emit("on-blur", data);
        setTimeout(() => {
          App.off("keyboardInputMsg", this.keyboardEvent);
        },100);
      }
      if (InputState == "done") {
        // 失焦
        this.onBlur();
        this.$emit("handler", data);
        App.off("keyboardInputMsg", this.keyboardEvent);
      }
      this.setPwd(len && len > 0 ? Number(len) : 0);
    },
    // 调起云盾键盘
    async showKeyboard () {
      if (!window.currentInputId) {
        window.currentInputId = document.activeElement.id
      } else {
          window.preInputId = window.currentInputId;
          window.currentInputId = document.activeElement.id;
      }
      // // 获取随机数
      // let idInfo = await getCloudIdentitySign();
      // let pinServerRandom = idInfo.pinServerRandom;
      setTimeout(() => {
        // 弹出密码键盘
        showCloudKeyboard(true, this.pinServerRandom, this.passwordType);
        this.isFocus = true;
        this.pwd = this.setPwd();
        App.on("keyboardInputMsg", this.keyboardEvent);
      }, 300)
    },
    // input点击触发事件
    focusFn (e) {
      // 使该元素聚焦，但是不弹出系统键盘，没有光标效果
      e.target.focus();
      // document.activeElement可以拿到当前聚焦的元素
      console.log('当前id:' + document.activeElement.id, 'windowId:' + window.currentInputId);
      // 如果当前inputId 等于 聚焦元素的id
      if(window.currentInputId === document.activeElement.id) {
        return;
      }
      this.showKeyboard();
    },
    // 失焦事件
    onBlur () {
      this.isFocus = false;
      window.currentInputId = '';
      hideCloudKeyboard(true);
    },
    clean () {
      this.placeholdPwd = [];
    }
  }
};
</script>

<style lang="less" >
@import "./less/index.less";
.ghb-changePwdInput{
  &::before{
    content: none;
  }
  // &:first-of-type{
  //   &::before{
  //     content: none;
  //   }
  // }
}
.ghb-changePwdInpu_content{
  display: flex;
  height: .9rem;
  align-items: center;
  justify-content: space-between;
}
.ghb-changePwdInput_title{
  width: 1.8rem;
}
.ghb-changePwdInput_value{
  flex:1;
  position: relative;
  input{
    text-align: right;
    width: 100%;
    background-color: #f5f5f5;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .1rem;
    background: rgba(0, 0, 0, 0);
  }
}
</style>
