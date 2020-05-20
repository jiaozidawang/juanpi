
<!--
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
此组件已弃用，请调用 showPopupMessageInput JSAPI使用该功能
-->
<template>
  <x-dialog
    :show.sync="private_value"
    :hide-on-blur="hideOnBlur"
    :dialog-style="dialogStyle"
    :mask-z-index="maskZIndex"
    dialogTransition="msg-animate"
    @on-show="onShow"
    @on-hide="onHide"
  >
    <div class="ghb-message-content">
      <div class="ghb-message_head">
        <div class="ghb-message_head_title">
          请输入短信验证码
        </div>
        <span @click="$emit('input', false)">取消</span>
      </div>

      <div class="ghb-message_body">
        <div class="ghb-message_body_tip">
           <p  v-show="buttonText !== '获取验证码'">验证码已发送<span>{{phoneNumber}}</span></p>
        </div>
        <div class="ghb-message_body_input vux-1px">
          <input
            @focus="focusHandle"
            ref="msgInput"
            type="tel"
            class="ghb-message_body_input_init"
            maxlength="6"
            v-model="currentValue"
            @keydown="complete"
          >
          <div class="ghb-message_body_input_number">序号12</div>
          <button class="ghb-message_body_input_button" :class="{'ghb-message_body_input_button_active': canButtonClick}" @click="clickHandler" :disabled="!canButtonClick">
            {{buttonText}}
          </button>
        </div>
        <div class="ghb-message_body_qs" @click="$emit('voice')">收不到验证码，语音播报？</div>
      </div>
    </div>
  </x-dialog>

</template>

<script>
import { TransferDom } from 'vux';
import XDialog from '@comp/base/x-dialog';
import props from './utils/props'
import { setInterval, clearInterval } from 'timers';
import {showMask, hideMask} from '@bridge';
export default {
  components: {
    XDialog
  },
  props,
  directives: {
    TransferDom
  },
  data () {
    return {
      buttonText: '获取验证码',
      timer: '',
      isButtonDisabled: false,
      canButtonClick: true,
      currentValue: '',
      // 弹窗样式
      dialogStyle: {
        'position': 'absolute',
        'z-index': '5000',
        'background': '#fff',
        'width': '100%',
        'bottom': '0'
      }
    }
  },
  watch: {
    currentValue (newVal) {
      if(newVal.length >= 6) {
        this.$emit('handler', newVal);
        this.$emit('input', false);
      }
    }
  },
  computed: {
    private_value: {
      get(){ return this.value },
      set(v){
        !v && this.$emit('input', v)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods:{
    focusHandle () {
      this.dialogStyle.bottom = '119px';
      console.log("获取焦点");
    },
    complete (e) {
      console.log(e);
      if(e.keyCode == '13') {
        console.log('点击完成');
        alert('123')
        this.$emit('input',false);
      }

    },
    onShow () {
      // this.$refs['msgInput'].focus();
      console.log('1234');
      // this.dialogStyle.height = '10rem';
      // this.dialogStyle.position = 'fixed';


      // AlipayJSBridge.call('getInputHeight', (res) => {
      //   console.log(res);
      //   let userAgent = navigator.userAgent;
      //   let isIphoneX = userAgent.indexOf('Mac OS X') != -1;
      //   const sHeight = isIphoneX ? 38 : 0;
      //   this.dialogStyle.bottom = parseInt(res.height) + sHeight + 'px';
      // })
      // console.log(this.$refs);
      // showMask();

      // 阻止弹出默认键盘，但输入光标会消失。
      document.activeElement.blur();
      // 监听点击空白区域失焦事件
      // document.addEventListener('click', this.clearKeyboradHolder, false);

      window.AlipayJSBridge.call('onNativeKeyboardShow', {type: '0', isClean: true, maxSize: '6'}, (res) => {
        console.log(res)
        let userAgent = navigator.userAgent;
        let isIphoneX = userAgent.indexOf('Mac OS X') != -1;
        const sHeight = isIphoneX ? 38 : 0;
        this.dialogStyle.bottom = parseInt(res.height) - sHeight + 'px';
      })
      this.$emit('on-show');
    },
    clearKeyboradHolder () {

    },
    onHide () {
      // hideMask();
      window.AlipayJSBridge.call('onNativeKeyboardHide', {isClean: true}, (res) => {
        console.log(res)
      })
      this.$emit('on-hide');
    },
    clickHandler () {
      if(!this.canButtonClick) return;
      this.canButtonClick = false;
      let timer = null;
      let i = 59;
      this.$emit('getMsg');
      timer = setInterval(() => {
        this.buttonText = i + '秒后重发';
        i--;

        if(i < 0 ) {
          clearInterval(timer);
          this.buttonText = '获取验证码';
          this.canButtonClick = true;
        }

      }, 1000);

    }
  }
}
</script>

<style lang="less">
  // .weui-dialog{
  //   width: 100% !important;
  //   top: 15%;
  //   right: 0;
  //   bottom: auto;
  //   left: 0;
  //   border-radius: 0;
  // }
  .msg-animate-enter-active {
    animation: vux-dialog-in .2s;
  }
  .msg-animate-leave-active {
    animation: vux-dialog-out .3s;
  }
  @keyframes msg-animate-in {
    0% {
      // transform: scale(1.185);
      // transform: scale(1.185);
      bottom: 0;
      opacity: 0;
    }
    100% {
      // transform: scale(1);
      bottom: 240px;
      opacity: 1;
    }
  }
  @keyframes msg-animate-out {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.85);
      opacity: 0;
    }
  }
  .ghb-message-content{
    width: 7.5rem;
  }
  .ghb-message_head{
    height: @lh-line;
    box-sizing: border-box;
    position: relative;
    line-height: @lh-line;
    font-size: @fs30;
    color: @font-t2;
    .ghb-message_head_title{
      font-weight: bold;
      color: @font-t1;
    }
    span{
      position: absolute;
      right: 0;
      top: 0;
      line-height: @lh-line;
      padding: 0 .4rem;
    }
  }
  .ghb-message_body{
    padding: .2rem @spacing;
    .ghb-message_body_tip{
      height: .4rem;
      color: @font-t2;
      font-size: @fs28;
      line-height: .4rem;
    }
    .ghb-message_body_input{
      height: @lh-line;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin: .1rem 0 .2rem 0;
      .ghb-message_body_input_init{
        border: none;
        flex: 1;
        box-sizing: border-box;
        padding-left: .2rem;
      }
      .ghb-message_body_input_number{
        width: 1.4rem;
        font-size: @fs24;
        color: @font-t3;
      }
      .ghb-message_body_input_button{
        width: 1.8rem;
        height: .92rem;
        color: @bg;
        border: none;
        box-sizing: border-box;
        background: @bt-disabled;
      }
      .ghb-message_body_input_button_active {
        background: @bt-default;
        &:active{
          background-color: @bt-click;
        }
      }

    }
    .ghb-message_body_qs{
      text-align: right;
      font-size: @fs24;
      color: @color-main;
    }
  }

</style>

