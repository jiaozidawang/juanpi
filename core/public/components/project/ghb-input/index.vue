<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-26 10:55:05
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-19 17:43:58
 * @Description: 输入框
 -->
<template>
  <div class="ghb-input" @click="clickAllCellHandler">
    <div class="ghb-input_init">
      <div class="ghb-input_title" v-if="title != ''">
        <span>{{title}}</span>
      </div>

      <div class="ghb-input_input">
        <div v-show="!focus && format === 'card'" class="input_mask"><p class="placeholder" v-if="!private_value">{{placeholder}}</p>{{(private_value || '') | bandCard}}</div>
        <div v-show="!focus && format === 'money'" class="input_mask">{{(private_value || '') | amt}}</div>
        <!-- <div v-show="!focus && format === 'card'" class="input_mask">{{private_value | bandCard}}</div> -->
        <input
          ref="input"
          :style="style"
          class="ghb-input_init_input"
          :readonly="readonly"
          :disabled="disabled"
          :type="type"
          v-model="private_value"
          @focus="focusHandler"
          @blur="blurHandler"
          :placeholder="placeholder"
          :maxlength="maxlength"
          @keyup="keyupHandler"
        >
        <!-- <div v-if="isWarn" class="ghb-input_warn_icon" @click="warnHandler">
          <i class="icon-warn"></i>
        </div> -->
        <div
          v-if="focus && private_value.length > 0 && !readonly"
          class="ghb-input_warn_icon"
          @click.stop="clean"
        >
          <i class="icon-clean"></i>
        </div>
      </div>

      <div v-if="showIcon" class="ghb-input_icon" @click.stop="clickIcon">
        <i :class="icon"></i>
      </div>
      <slot name="right"></slot>
    </div>
    <!-- <ghbWarn v-if="isWarn || inputError" :handlerText="handlerText" :warnText="warnText"></ghbWarn> -->
  </div>
</template>

<script>
import cell from "@comp/base/v-cell";
import ghbWarn from "@comps/ghb-warn";
import props from "./utils/props";
import scrollWindow from '../mixins/focusScroll.js';
// 图标路径
// let
export default {
  components: {
    cell,
    ghbWarn
  },
  props: {
    ...props,
    format: {
      type: String,
      default: ''
    }
  },
  mixins: [scrollWindow],
  data() {
    return {
      focus: false
    };
  },
  watch: {
    private_value(newVal) {
      this.$emit("input", newVal);
    }
  },
  computed: {
    private_value: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    },
    style() {
      return {
        "text-align": this.align
      };
    },
    showIcon() {
      // if (this.iconType === "camera") return true;
      // if (this.iconType === "id") return true;
      // if (this.iconType === "bank") return true;
      if(this.iconType) return true;
    },
    icon() {
      const self = this;
      return {
        iconfont: true,
        scan: self.iconType === "id" || self.iconType === "bank" || self.iconType === "camera",
        user : self.iconType === 'user',
        input: self.iconType === 'input',
        address_book: self.iconType === 'book'
      };
    },
    beforeTitle() {
      return {
        "CNY-icon": this.preIcon === "CNY"
      };
    }
  },
  methods: {
    keyupHandler (e) {
      this.$emit('keyupHandler', e);
    },
    // 点击输入框时
    clickAllCellHandler () {
      if(this.readOnly) {
        return;
      }
      this.$refs.input.focus();
    },
    inputClick() {
      if (!this.readonly) {
        return;
      }
      if (this.iconType == "idCard") {
        // 此处增加调用扫描身份证api
      }
      this.$refs.input.focus();
      this.$emit("clickHandler");
    },
    clean() {
      this.private_value = "";
      this.$emit("cleanValue", '1');
      this.$refs.input.focus();
    },
    blurHandler() {
      this.cancleScroll();
      setTimeout(() => {
        this.focus = false;
        this.$emit("on-blur", this.private_value);
      }, 20)
    },
    focusHandler() {
      // 由于readonly的时候偶尔也会触发input的聚焦事件，所以加上这层防护
      if(this.readOnly) {
        return;
      }
      this.scrollWindow(this.$refs.input);
      this.focus = true;
      this.$emit("on-focus");
    },
    clickIcon() {
      this.$emit("clickIcon");
    },
    warnHandler() {
      this.$emit("inputWarn");
    }
  }
};
</script>

<style lang="less" >
@import "../../../less/mixin.less";
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
  height: @lh-line;
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
    height: .9rem;
    flex: 1;
    // padding-left: .2rem;
    // position: relative;
    display: flex;
    align-items: center;
    position: relative;
    .ghb-input_warn_icon {
      width: .34rem;
      height: .34rem;
      padding-left: .2rem;
    }
    .input_mask{
      text-align: right;
      line-height: .9rem;
      position: absolute;
      top: .02rem;
      left: 0;
      padding-right: .04rem;
      width: 100%;
      height: .88rem;
      background-color: #fff;
      box-sizing: border-box;
    }
    input {
      width: 100%;
      height: 100%;
      // flex: 1;
      caret-color: auto;
      font-size: @fs30;
      padding-right: .04rem;
      &::placeholder {
        color:@font-t3;
      }
      // &:focus{
      //   color: @color-main;
      // }
    }
  }
  .ghb-input_icon {
    margin-left: 0.2rem;
    display: flex;
    justify-content: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -.2rem;
      right: -.2rem;
      bottom: -.2rem;
      left: -.2rem;
    }
  }
}

.placeholder{
  color: @font-t3
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
.address_book {
  .setBgIconInput("./images/icon_shoujtxl@2x.png", .44rem, 0.44rem);
}
</style>
