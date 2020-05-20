/**
  @desc 爱加密密码键盘密码修改框
  * @param {String} title 左侧标题
  * @param {String} placeholder 提示语
  * @param {String} sessionKey  爱加密键盘需要的元素，通过调7012接口获得 必传
  * @param {Boolean} isTrading 是否是交易密码
  * @event on-focus 失焦后触发
  * @event illegal 密码前端校验不通过触发
  * @event handler 关闭键盘时触发
*/


<template>
  <div class="ghb-changePwdInput">
    <div class="ghb-changePwdInpu_content" >
      <div class="ghb-changePwdInput_title">{{title}}</div>
      <div class="ghb-changePwdInput_value">
        <input ref="input" :id="uuid" :placeholder="__placeholder" readonly @click="focusFn" type="password" @blur="onBlur">
        <div class="ghb-changePwdInput_value_circle" v-for="item in placeholdPwd">{{item}}</div>
        <!-- <span
          class="ghb-changePwdInput_placeholder"
          v-if="!isFocus && placeholdPwd<=0"
        >{{placeholder}}</span> -->
        <div :class="{'flashLine': isFocus}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { showKeyboard, hideKeyboard, alert } from "@bridge";
import props from "./utils/props";
import { pwdStrength } from "./utils";
import { setInterval, clearInterval, setTimeout } from "timers";
import uuid from '../../vux-support/mixins/uuid.js';
export default {
  name: "ghb-pwdInput",
  props: {...props, sessionKey: String},
  mixins: [uuid],
  data() {
    return {
      placeholdPwd: [],
      isFocus: false
    };
  },
  watch: {
    // 当是交易密码的时候需要监听输入到达6位自动失焦
    "placeholdPwd.length"(len) {
      if (!this.isTrading) {
        return;
      }
      if (len >= 6) {
        this.isFocus = false;
        this.onBlur();
      }
    }
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
    setPwd(len = 0) {
      this.placeholdPwd = Object.freeze(_.fill(Array(len), "●"));
      return "";
    },
    keyboardEvent({ data }) {
      const { len, pwdKey, InputState, reg } = data;
      this.pwd = pwdKey;
      // 派发input事件
      this.$emit("input", pwdKey);
      if (InputState == "close") {
        let tip = pwdStrength(reg, this.isTrading);
        if (tip != undefined) {
          this.$emit("illegal", tip);
        }
        // 失焦
        this.onBlur();
        // 派发失焦事件和结束事件
        this.$emit("on-focus", pwdKey);
        this.$emit('handler', data);
        // 取消监听
        App.off("keyboardInputMsg", this.keyboardEvent);
      }
      this.setPwd(len && len > 0 ? Number(len) : 0);
    },
    showKeyboard () {
      if (!window.currentInputId) window.currentInputId = document.activeElement.id
      else {
        window.preInputId = window.currentInputId;
        window.currentInputId = document.activeElement.id;
      };
      setTimeout(() => {
        if(!this.sessionKey) {
          alert('调起密码键盘失败，请传入密码随机数', '', {button: '好的'});
          return;
        };
        // 弹出密码键盘
        let params = this.isTrading
          ? { type: "0", maxSize: "6", isClean: true }
          : { type: "2", maxSize: "16", isClean: true };
          params = {...params, sessionKey: this.sessionKey}

        showKeyboard(params);
        this.isFocus = true;
        this.pwd = this.setPwd();
        // 开始监听键盘点击事件
        App.on("keyboardInputMsg", this.keyboardEvent);
      }, 100);

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
    // 触发失焦
    onBlur () {
      this.isFocus = false;
      window.currentInputId = '';
      // 隐藏键盘
      hideKeyboard();
    },
    clean () {
      this.placeholdPwd = [];
    }
  }
};
</script>

<style lang="less" >
@import "./less/index.less";

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
