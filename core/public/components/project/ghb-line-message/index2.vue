<template>
  <div class="ghb-validate">
    <div class="ghb-validate-init">
      <ghb-popup-picker
      v-model="pickData"
      title="验证方式"
      :data="currentPickList"
      show-name
      :column="1"
      v-if="isTransition"
      @on-change="changeHandler"
      @on-show="$emit('on-show')"
      @on-hide="$emit('on-hide')"
      @on-shadow-change="$emit('on-shadow-change')"
    ></ghb-popup-picker>


    <ghb-input
      :style="{ display: validateType == 'msg'? 'block': 'none'}"
      class="ghb-validate_input"
      :title="title"
      :placeholder="placeholder"
      :align="align"
      type="tel"
      maxlength="6"
      v-model="currentValue"
      >
      <div class="ghb-validate_right" slot="right">
        <span v-if="msgNumber != ''">{{msgNumber}}</span>
        <div
          class="ghb-validate_button"
          :class="{
            'ghb-validate_button_disabled': isSend,
            'ghb-validate_button_active': !isSend
          }"
          @click="getMsg"
        >{{buttonText}}</div>
      </div>
    </ghb-input>
    <div class="ghb-validate_tip" :class="{'ghb-validate_tip_height': isSend}">
      <!-- <span v-if="isSend">短信验证码已发送到您{{phoneNumber}}的手机</span> -->
      <span v-if="isSend">已向尾号为{{phoneNumber ? phoneNumber.substr(phoneNumber.length-4, 4): ''}}的手机号发送验证码，60s后方能重新获取，短信验证码120s内有效。</span>
    </div>
    </div>

  </div>
</template>

<script>
import ghbInput from "@comps/ghb-input";
import ghbPopupPicker from "@comps/ghb-popup-picker";
import cell from "@base/v-cell";
import { setInterval, clearInterval } from "timers";
export default {
  name: 'ghb-line-message',
  components: {
    ghbInput,
    cell,
    ghbPopupPicker
  },
  // mixins: [bind],
  props: {
    isTransition: {
      type: Boolean,
      default: false
    },
    validateType: {
      type: String,
      default: "msg"
    },
    msgNumber: String,
    title: {
      type: String,
      default: "验证码"
    },
    placeholder: {
      type: String,
      default: "请输入验证码"
    },
    align: {
      type: String,
      default: "left"
    },
    defaultPick: {
      type: String,
      default: "0"
    },
    pickList: {
      type: Array,
      default: []
    },
    value: String,
    phoneNumber: String
  },
  data() {
    return {
      nowValue: "",
      buttonText: "获取",
      canButtonClick: true, // 按钮是否可以点击
      method: "短信",
      pickData: [this.defaultPick],
      currentPickList: [this.pickList],
      isSend: false // 是否已经获取了验证码
    };
  },
  watch: {
    currentValue(newVal) {
      this.$emit("input", newVal);
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
    }
  },
  methods: {
    getMsg() {
      if (!this.canButtonClick) return;
      this.canButtonClick = false;
      let timer = null;
      let i = 59;
      this.$emit("getMsg");
      this.isSend = true;
      timer = setInterval(() => {
        this.buttonText = i + "秒后重发";
        i--;

        if (i < 0) {
          clearInterval(timer);
          this.buttonText = "重新发送";
          this.isSend = false;
          this.canButtonClick = true;
        }
      }, 1000);
    },
    changeHandler(val) {
      this.$emit("on-change", val);
    }
  }
};
</script>

<style lang="less" >
@import "~@comp/styles/1px.less";
@import "~@core/public/less/mixin.less";
// .ghb-validate_input{
//   height: @lh-line;
//   input{
//     padding-right: 2.3rem !important;
//   }
// }

.ghb-validate-input{
  height:.9rem;
  // background: red;
  display: flex;
  justify-content: space-between;
  padding: 0 @spacing;
  position: relative;
  &::before{
    .setTopLine(@spacing);
  }

  &_input{
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
    }
  }
}

.ghb-validate_right{
  height: .9rem;
  font-size: @fs24;
}

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
  background-color: @bt-disabled;
  color: @font-t0;
  border-color: @line;
}

.ghb-validate_tip {
  background: @bg-color;
  color: @color-main;
  font-size: @fs24;
  padding: .2rem @spacing 0;

}

.ghb-validate {
  .weui-cell {
    padding: 0 @spacing;
  }
  .ghb-input_init_input {
    margin-right: 0.2rem;
  }
  position: relative;
  // margin-bottom: .4rem;
  .ghb-validate_right {
    display: flex;
    align-items: center;
    color: @font-t3;
  }

  .ghb-validate_tip_height {
    min-height: 0.6rem;
  }
}
</style>

