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
  <div class="ghb-input">
    <div class="ghb-input-init">
      <slot name="left">
        <div class="left_title">
          {{title}}
        </div>
      </slot>
      <slot>
        <div class="ghb-input-init_input">
          <!-- <div class="ghb-input-init_input_mask" @click="focusHandler" v-if="type !== 'text'">
            <div class="mask_content">
              <div class="mask_content_input">
                {{currentValue}}
                <span v-if="!isFocus && currentValue.length <= 0" class="placeholder">{{placeholder}}</span>
              </div>
              <div :class="{'mask_content_flashline': isFocus}"></div>
              <div class="mask_content_clean" v-if="isFocus && currentValue.length > 0" @click.stop="cleanValue">
                <i class="icon-clean"></i>
              </div>
            </div>
          </div> -->
          <div class="ghb-input-init_input_mask" @click="focusHandler" v-if="type !== 'text'">
              <div class="mask_content">
                <div class="mask_content_input">
                  <input
                    ref="input"
                    v-if="type !== 'text'"
                    fastfocus="true"
                    :id="uuid"
                    :readonly="isReadonly"
                    @click="focusHandler"
                    :type="type"
                    v-model="currentValue"
                    :placeholder="placeholder"
                    @blur="inputBlurHandler"
                  />
                  <!-- <span v-if="!isFocus && currentValue.length <= 0" class="placeholder">{{placeholder}}</span> -->
                </div>
                <div :class="{'mask_content_flashline': isFocus}"></div>
                <div class="mask_content_clean" v-if="isFocus && currentValue.length > 0" @click.stop="cleanValue">
                  <i class="icon-clean"></i>
                </div>
              </div>
          </div>

          <!-- <div class="ghb-input-init_input_text">
            <input
              ref="input"
              v-if="type === 'text'"
              fastfocus="true"
              :id="uuid"
              @click="focusHandler"
              :type="type"
              v-model="currentValue"
              :placeholder="__placeholder"
              @blur="inputBlurHandler"
            />
            <div class="mask_content_clean" v-if="isFocus && currentValue.length > 0" @click.stop="cleanValue">
              <i class="icon-clean"></i>
            </div>
          </div> -->
        </div>

      </slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval, setTimeout } from "timers";
export default {
  name: "ghb-pwdInput",
  props: {
    title: "",
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    max: {
      type: Number,
      default: 99
    },
    type: {
      type: String,
      default: "text"
    },
  },
  data() {
    return {
      uuid: Math.random().toString(36).substring(3, 8),
      placeholdPwd: [],
      isFocus: false,
      currentValue: '',
      isReadonly: true
    };
  },
  watch: {
    currentValue(newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.currentValue = newVal
      this.$refs.input.value = newVal
      this.$emit('on-change', newVal)
      this.$emit('input', newVal)
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
  destroyed () {
    // this.inputBlurHandler();
  },
  methods: {
    keyboardEvent({ data }) {
      const { InputState, value } = data;
      let putOutValue = '';
      if(value === 'back') {
        putOutValue = this.currentValue.substr(0, this.currentValue.length-1);
      } else {
        putOutValue = this.currentValue + value;
      }
      // 派发input事件
      this.$emit("input", putOutValue);
    },
    showKeyboard () {
      if (!window.currentInputId) {
        window.currentInputId = document.activeElement.id;
      } else {
        window.preInputId = window.currentInputId;
        window.currentInputId = document.activeElement.id;
      };


      let typeMap = {
        money: '0',
        id: '1',
        number: '2'
      };
      window.AlipayJSBridge.call("showCustomKeyboard", { type: typeMap[this.type] });
      // 开始监听键盘点击事件
      App.on("keyboardInputMsg", this.keyboardEvent);

    },
    // input点击触发事件
    focusHandler (e) {
      this.isFocus = true;

      if(this.type === 'text') {
        return;
      };

      // 使该元素聚焦，但是不弹出系统键盘，没有光标效果
      this.$refs.input.focus();

      // document.activeElement可以拿到当前聚焦的元素
      console.log('当前id:' + document.activeElement.id, 'windowId:' + window.currentInputId);

      // 如果当前inputId 等于 聚焦元素的id
      if(window.currentInputId === document.activeElement.id) {
        // this.isReadonly = false;
        return;
      };

      this.showKeyboard();
    },
    // 触发失焦
    inputBlurHandler () {
      this.isFocus = false;

      if(this.type === 'text') {
        return;
      };
      // this.isReadonly = true;
      window.currentInputId = '';
      // 隐藏键盘
      window.AlipayJSBridge.call("hideCustomKeyboard");
      App.off('keyboardInputMsg', this.keyboardEvent);
    },
    cleanValue () {
      this.currentValue = '';
    }
  }
};
</script>

<style lang="less" scoped>
// @import "./less/index.less";
@inputLineHeight: @lh-line;
.ghb-input {
  &-init {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    &_input {
      flex: 1;
      width: 100%;
      height: 100%;
      // background-color: blue;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        // background-color: pink;
        text-align: right;
        border: none;
      }
      &_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .mask_content{
          width: 100%;
          height: 100%;
          // background-color: orangered;
          text-align: right;
          display: flex;
          align-items: center;
          &_input{
            flex: 1;
            .placeholder{
              color: @font-t3;
            }
          }
          &_flashline{
            height: .5rem;
            &::after {
              content: " ";
              display: block;
              width: .04rem;
              height: .5rem;
              margin-left: .05rem;
              // background-color: @color-main;
              background-color: #6161F2;
              animation: flashLine 1s infinite;
            }
          }
          &_clean {
            margin-left: .1rem;
          }
        }
      }
      &_text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        input{
          flex: 1;
        }
      }
    }
    .left{
      line-height: @inputLineHeight;
    }
  }
}

@keyframes flashLine {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
