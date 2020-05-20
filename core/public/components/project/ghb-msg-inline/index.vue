<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-16 20:48:08
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-04 19:29:16
 * @Description: 短信验证码框
 -->
<template>
  <div class="ghb-message-input">
    <div class="ghb-message-input__input">
      <input
        ref="msgInput"
        type="tel"
        :placeholder="placeholder"
        v-model="currentValue"
        @click="inputClickHandler"
        maxlength="6"
        @keydown="keydownHandler"
        @blur="blurHandler"
      >
    </div>
    <div class="ghb-message-input__button">
      <div v-if="currentValue && isFocus" class="icon-clean" @click.stop="cleanValue" style="marginRight: 10px;"></div>
      <span v-if="msgNumber">{{'(序号: ' + msgNumber + ')'}}</span>
      <div
        class="ghb-validate_button"
        :class="{
          'ghb-validate_button_disabled': isSend,
          'ghb-validate_button_active': !isSend
        }"
        @click="perGetMessage"
      >{{buttonText}}
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from "timers";
// import numberInput from '../mixins/numberInput';
import focusScroll from '../mixins/focusScroll';
export default {
  name: 'ghb-message-input',
  mixins: [focusScroll],
  props: {
    valueStyle: Object,
    msgNumber: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入验证码"
    },
    autoSendMsg: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left"
    },
    preCheck: {
      type: Boolean,
      default: false
    },
    value: String
  },
  data() {
    return {
      isFocus: false,
      nowValue: "",
      buttonText: "获取",
      canButtonClick: true, // 按钮是否可以点击
      method: "短信",
      timer: null, // 计时器
      isSend: false, // 是否已经获取了验证码
    };
  },
  watch: {
    currentValue(newVal) {
      if(/^[0-9]+$/.test(newVal)){
        this.$emit("input", newVal);
        return
      }
      this.currentValue = '';
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    },
    __valueStyle () {
      return {
        color: '#09122B',
        ...this.valueStyle
      }
    }
  },
  mounted () {
    this.autoSendMsg && this.getMsg();
  },
  methods: {
    cleanValue () {
      this.currentValue = '';
    },
    keydownHandler (e) {
      let reg = /\d/;
      if(e.key !== 'Backspace' && e.key.match(/\d/) === null) {
        e.preventDefault();
      }
    },
    inputClickHandler () {
      this.isFocus = true;
      this.scrollWindow(this.$refs.msgInput);
      this.$refs.msgInput.focus();
    },
    blurHandler () {
      this.isFocus = false;
      this.cancleScroll();
    },
    cleanTimer () {
      clearInterval(this.timer);
      this.buttonText = "重新发送";
      this.isSend = false;
      this.canButtonClick = true;
    },
    perGetMessage () {
      if (!this.canButtonClick) {
        return;
      };
      console.log(this.preCheck);
      if(this.preCheck) {
        this.$emit('preCheck');
        return;
      }
      this.getMsg();
    },
    getMsg() {
      this.canButtonClick = false;
      this.timer = null;
      let i = 59;
      this.$emit("getMsg");
      this.isSend = true;
      this.timer = setInterval(() => {
        this.buttonText = i + "秒后重发";
        i--;

        if (i < 0) {
          clearInterval(this.timer);
          this.buttonText = "重新发送";
          this.isSend = false;
          this.canButtonClick = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" >
@import "~@comp/styles/1px.less";
@import "~@core/public/less/mixin.less";
@inputFontSize: @fs30;

.ghb-message-input{
  height:.9rem;
  // background: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 @spacing;
  position: relative;
  &::before{
    .setTopLine(@spacing);
  }

  &__input{
    flex: 1;
    line-height: .9rem;
    display: flex;
    justify-content: flex-start;
    .title{
      width: 1.6rem;
      font-size: @cellTitleSize;
    }
    input{
      flex: 1;
      width: 2rem;
      font-size: @inputFontSize
    }
  }

  &__button{
    .ghb-validate_button {
      margin-left: 0.2rem;
      font-size: .3rem;
      width: 2rem;
      height: .6rem;
      line-height: 0.6rem;
      text-align: center;
      color: @color-main;
      border-radius: 0.05rem;
      box-sizing: border-box;
      border: 1px solid @color-main;
    }

    .ghb-validate_button_active {
      &:active {
        background-color: @bg-color;
      }
    }
    .ghb-validate_button_disabled {
      // background-color: @bt-disabled;
      color: @bt-disabled;
      border-color: @line;
    }
  }
  .ghb-message-input__button{
    .flex;
    align-items: center;
    span{
      color: @font-t3;
      font-size: .24rem;
    }
  }
}


</style>

