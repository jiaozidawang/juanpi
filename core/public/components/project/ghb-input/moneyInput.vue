<template>
  <div class="ghb-input" @click="clickAllCellHandler">
    <div class="ghb-input_init">
      <div class="ghb-input_title" v-if="title != ''">
        <span>{{title}}</span>
      </div>

      <div class="ghb-input_input">
        <div class="ghb-input_input_mask" v-show="!focus" @click="msakClickHandler" :style="style">
          {{$tools.currencyFormat(currentValue)}}
          <span v-if="currentValue <= 0" style="color: #c1c1c1">{{placeholder}}</span>
        </div>
        <div class="ghb-input_input_content">
          <input
            ref="input"
            :style="style"
            type="number"
            class="ghb-input_init_input"
            :readonly="readonly"
            @focus="focusHandler"
            @blur="blurHandler"
            :placeholder="placeholder"
            @keyup="keyupHandler"
          >
          <div
            v-if="focus && currentValue.length > 0 && !readonly"
            class="ghb-input_warn_icon"
            @click.stop="clean"
          >
            <i class="icon-clean"></i>
          </div>
        </div>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import props from "./utils/props";
import scrollWindow from '../mixins/focusScroll.js';


// 图标路径
// let
export default {
  props: {
    sLimit: {
      type: String,
      default: '2'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    align: {
      type: String,
      default: "right"
    },
    value: {
      type: String,
      default: ""
    },
  },
  mixins: [scrollWindow],
  data() {
    return {
      focus: false,
      currentValue: ''
    };
  },
  mounted () {
    this.currentValue = this.value;
    this.$refs.input.value = this.value;
  },
  watch: {
    currentValue(newVal) {
      this.$emit('input', newVal);
    },
    value (newVal) {
      this.currentValue = newVal;
      this.$refs.input.value = newVal;
      this.$emit('on-change', newVal)
      this.$emit('input', newVal)
    }
  },
  computed: {
    style() {
      return {
        "text-align": this.align,
        color: this.readonly ? '#888888' : '#09122B'
      };
    },
  },
  methods: {
    keyupHandler (e) {
      if(this.readonly) {
        e.target.value = this.currentValue;
      };

      if(e.target.value.length>15) {
        e.target.value = e.target.value.substr(0, e.target.value.length -1);
      };

      // 限制小数位数
      let sn = e.target.value.split('.')[1]
      if(sn && sn.length > Number(this.sLimit) && e.keyCode != 8) {
        e.target.value = e.target.value.substr(0, e.target.value.length -1);
      };

      // 正整数只能有12位
      let bn = e.target.value.split('.')[0];
      if(bn && bn.length >12  && e.keyCode != 8) {
        e.target.value = e.target.value.substr(0, e.target.value.length -1);
      };

      // 第一位数字是0的的话第二位字符只能是小数点
      let firstChar = e.target.value.substr(0,1);
      console.log(firstChar);
      if(firstChar == '0') {
        if(e.target.value.length >=2 && e.target.value.substr(1,1) != '.') {
          e.target.value = this.currentValue
        };
      };

      // 第一位数字不能使小数点
      if(firstChar == '.') {
        e.target.value = this.currentValue
      };

      // 限制非数字和小数点的输入
      let reg = /\d|\./
      if(!reg.test(e.target.value.substr(e.target.value.length -1, 1)) && e.keyCode != 8){
        e.target.value = this.currentValue;
        return;
      };

      this.currentValue = e.target.value;
    },
    // 点击输入框时
    clickAllCellHandler () {
      if(this.readonly) {
        return;
      };
      this.$refs.input.focus();
    },
    clean() {
      this.currentValue = "";
    },
    blurHandler() {
      this.cancleScroll();
      this.focus = false;
      // this.$refs.input.value = this.$tools.currencyFormat(this.currentValue)
      this.$emit("on-blur", this.currentValue);
    },
    focusHandler() {
      // 由于readonly的时候偶尔也会触发input的聚焦事件，所以加上这层防护
      if(this.readonly) {
        return;
      }
      this.scrollWindow(this.$refs.input);
      this.focus = true;
      this.$emit("on-focus");
    },
    clickIcon() {
      this.$emit("clickIcon");
    },
    msakClickHandler () {
      if(this.readonly) {
        return;
      };
      this.$refs.input.focus();
    },
    warnHandler() {
      this.$emit("inputWarn");
    }
  }
};
</script>

<style lang="less" >
@import "../../../less/mixin.less";
@moneyInputHeight: @lh-line;
.setBgIconInput (@url,@w,@h){
  display: block;
  width: @w;
  height: @h;
  background: url(@url) no-repeat;
  background-size: 100% !important;
  position: relative;
}
.ghb-input {
  width: 100%;
  height: @moneyInputHeight;
  position: relative;
  display: flex;
  padding: 0 @spacing;
  box-sizing: border-box;
  &::before {
    .setTopLine(@spacing);
  }
}

.weui-cell {
  flex: 1;
}



.ghb-input_init {
  width: 100%;
  font-size: @cellTitleSize;
  display: flex;
  align-items: center;
  .ghb-input_title {
    padding-right: 0.2rem;
  }
  .ghb-input_input {
    height: @moneyInputHeight;
    position: relative;
    overflow: hidden;
    &_content{
      width: 100%;
      display: flex;
      align-items: center;
      .ghb-input_warn_icon {
        width: .34rem;
        height: .34rem;
        padding-left: .2rem;
      }
    }
    &_mask{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: #fff;
      text-align: right;
      line-height: @moneyInputHeight;
    }
    input {
      width: 100%;
      // height: .02rem;
      // flex: 1;
      caret-color: auto;
      font-size: @fs30;
    }
  }
  .ghb-input_icon {
    margin-left: 0.2rem;
    display: flex;
    justify-content: center;
  }
}

.ghb-input_bottomLine {
  .setBottomLine(@spacing);
}

.scan {
  .setBgIconInput("./images/scan.png", 0.44rem, .44rem);
}

.user {
  .setBgIconInput("./images/icon_user@2x.png", .38rem, 0.44rem);
}

.input {
  .setBgIconInput("./images/input.png", .38rem, 0.44rem);
}

</style>
