<template>
  <div class="ghb-input" @click="clickAllCellHandler">
    <div class="ghb-input_init">
      <div class="ghb-input_title" v-if="title != ''">
        <span>{{title}}</span>
      </div>

      <div class="ghb-input_input">
        <!-- <div v-show="!focus" @click.stop="inputClick" class="input_mask"></div> -->
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
          onKeyUp="value=value.replace(/[\W]/g,'')"
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
  props,
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
        input: self.iconType === 'input'
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
      this.$emit("clickHandler");
    },
    clean() {
      this.private_value = "";
    },
    blurHandler() {
      this.cancleScroll();
      this.focus = false;
      this.$emit("on-blur", this.private_value);
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
    .ghb-input_warn_icon {
      width: .34rem;
      height: .34rem;
      padding-left: .2rem;
    }
    .input_mask{
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    input {
      width: 100%;
      // height: .02rem;
      // flex: 1;
      caret-color: auto;
      font-size: @fs30;
      padding-right: .04rem;
      // &:focus{
      //   color: @color-main;
      // }
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
