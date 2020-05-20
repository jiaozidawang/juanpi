<template>
  <div class="ghb-input">
    <div class="ghb-input-init">
      <slot name="left-lable"></slot>
      <slot>
        <div class="ghb-input-init_input">
          <div class="ghb-input-init_input_mask" @click="focusHandler" v-if="type !== 'text'"></div>
          <input
            ref="input"
            fastfocus="true"
            :id="uuid"
            :type="type"
            v-model="currentValue"
            :placeholder="placeholder"
            @blur="inputBlurHandler"
          />
        </div>
      </slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ghb-input",
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
    format: "",
    redStar: false,
    disabled: false,
    rightIcon: null,
    noClearIcon: false,
    debounce: {
      type: Number,
      default: 500
    },
    leftInput: false,
    isVerify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uuid: Math.random()
        .toString(36)
        .substring(3, 8),
      currentValue: "",
      showMask: false,
      showClearIcon: false,
      maskCurrentValue: ""
    };
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    },
    currentValue(newVal) {
      // this.temp++;
      // if (this.temp === 2) this.isRes = "";
      // // 如果是有格式化的类型的 则做绑定格式化
      // if (this.maskCurrentValue) {
      //   this.maskCurrentValue = this._formatBankCardReg(this.currentValue);
      // }
      this.$emit("input", newVal);
      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      //   this.changeFn();
      // }, 10);
    }
  },
  methods: {
    // 聚焦事件
    focusHandler() {
      // 假如禁用的时候不触发入焦事件。
      if (this.$props.disabled) {
        return;
      }
      if (window.currentInputId === this.$refs.input.id) {
        this.showClearIcon = this.currentValue !== "";
        return;
      };
      // if (window.nativeKeyboradCancel) {
      //   window.nativeKeyboradCancel();
      // }
      // 如果是有格式化的类型的 则做绑定格式化
      // if (this.$props.format == 'bankCard' && this.currentValue) {
      //   this.maskCurrentValue = this._formatBankCardReg(this.currentValue, this.noSpacing);
      // }
      if(this.type !== 'text') {
        this.nativeFocus();
      };
      this.$emit('on-focus', this.currentValue);
    },
    inputBlurHandler () {
      this.nativeBlur();
    },
    // 聚焦调起特殊键盘
    nativeFocus() {
      this.$refs.input.focus();
      // 阻止弹出默认键盘，但输入光标会消失。
      document.activeElement.blur();

      // 监听点击空白区域失焦事件
      // document.addEventListener("click", this.nativeBlur, false);
      // 监听原生键盘输入事件
      this.$emit("on-native-focus", this.currentValue);
      App.on("keyboardInputMsg", this.nativeUpdateValue);

      if (this.currentValue != "") {
        this.showClearIcon = true;
      };
      this.showNativeBoard();
      // 滚动输入框到可视区域
      // this.scrollWindow(this.$refs["input-box"]);
    },
    nativeBlur() {
      this.showClearIcon = false;
      this.showCursor = false;
      window.currentInputId = '';
      window.nativeKeyboradCancel = '';
      this.showMask = false;
      window.AlipayJSBridge.call("hideCustomKeyboard");
      // document.removeEventListener('click', this.nativeBlur);
      App.off('keyboardInputMsg', this.nativeUpdateValue);
    },
    // 调起三种特殊数字键盘逻辑
    showNativeBoard() {
      if (!window.currentInputId) {
        window.currentInputId = this.$refs["input"].id;
      } else {
        window.preInputId = window.currentInputId;
        window.currentInputId = this.$refs["input"].id;
      }
      this.showMask = true;

      let typeMap = {
        money: '0',
        id: '1',
        number: '2'
      };
      window.AlipayJSBridge.call("showCustomKeyboard", { type: typeMap[this.type] });
      window.App.on("keyboardInputMsg", this.inputEventCallback);
    },
    // 主动失焦操作，以及删除滚动距离不够而创建的div元素
    // clearKeyboradHolder() {
    //   console.log('为什么会执行了');
    //   // let holderBlockHeihtDOM = document.getElementsByClassName('holderBlockHeiht');
    //   // let isDOM = holderBlockHeihtDOM.length;
    //   // if (isDOM) document.body.removeChild(holderBlockHeihtDOM[0]);
    //   if (window.nativeKeyboradCancel) {
    //       window.nativeKeyboradCancel();
    //   }
    // },
    nativeUpdateValue(e) {
      console.log(e.data);
      // let data = e.data;
      // switch (data.action) {
      //   case 'input':
      //     this.updateVal__Input(data);
      //     break;
      //   case 'hide':
      //     this.clearKeyboradHolder();
      //     break;
      //   case 'finish':
      //     this.clearKeyboradHolder(true);
      //     break;
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.ghb-input {
  &-init {
    width: 100%;
    height: 100%;
    &_input {
      width: 100%;
      height: 100%;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        background-color: pink;
        text-align: right;
      }
      &_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: blue;
      }
    }
  }
}
</style>
