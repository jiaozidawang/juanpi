
<template>
  <div class="ghb-id-input">
    <div class="ghb-id-input-init">
      <div class="ghb-id-input-l">
        <span>{{title}}</span>
      </div>
      <div class="ghb-id-input-c">
        <div class="flashLine" v-if="align == 'left' && isFocus"></div>
        <input
          class="ghb-id-input__input"
          type="text"
          :placeholder="__placeholder"
          readonly
          v-model="currentValue"
          :style="{textAlign: align}"
          @blur="blurFn"
          @click="focusFn"
        >
        <div class="flashLine" v-if="align == 'right' && isFocus"></div>
      </div>
      <div v-if="currentValue.length > 0" class="ghb-input_warn_icon" @click.stop="clean">
        <i class="icon-clean"></i>
      </div>
      <div class="ghb-id-input-r"></div>
    </div>
    <div class="id-keyboard" v-transfer-dom>
      <popup v-model="isShowIdKeyboard" @on-show="showFn" :show-mask="true">
        <div id="ghb-id-keyboare" class="ghb-id-keyboare">
          <div class="ghb-id-keyboare-header">
            <span class="icon"></span>
            <span>
              <i class="ghb-id-keyboare-logo"></i> 华兴银行安全输入
            </span>
          </div>
          <div class="ghb-id-keyboare-content" @touchstart.stop="handlerKeypress">
            <div
              class="ghb-id-keyboare-content-key"
              v-for="(item, index) in keyCodeList"
              :key="index"
              :data-num="item"
            >{{item}}</div>
            <div
              class="ghb-id-keyboare-content-key ghb-id-input-delete"
              data-num="d"
              v-longtap="longTap"
              @touchend="stopLongTap"
            ></div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
/**
 * 身份证号码输入框组件
 * @param {String} title 标题
 * @param {String} align 值在左边还是右边
 * @param {String} placeholder
 * @event on-blur 失焦后触发
 * @event on-focus 聚焦后触发
 * @event idError 失焦后判断身份证校验失败后触发
 * @event getInfo 失焦后身份证校验成功后18位身份证触发，返回身份证上的生日，性别信息
 * 用v-model绑定值
 */
import ghbInput from "./";
import base from "./base";
import dateTools from "../../../../utils/tools/dateTools";
import { Popup, Grid, GridItem, TransferDom } from "vux";
import "@core/utils/touch";
import { setInterval, clearInterval } from "timers";
export default {
  name: "ghbPhoneInput",
  mixins: [base],
  directives: {
    TransferDom
  },
  components: {
    ghbInput,
    Popup,
    Grid,
    GridItem
  },
  props: {
    mml: String,
    title: {
      type: String,
      default: "身份证号码"
    },
    align: {
      type: String,
      default: "right"
    },
    max: {
      type: String,
      default: "18"
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    value: String
  },
  data() {
    return {
      isWarn: false,
      warnText: "",
      // currentValue: '',
      timer: null,
      isShowIdKeyboard: false,
      isFocus: false,
      keyCodeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0]
    };
  },
  computed: {
    __placeholder() {
      if (!this.currentValue && !this.isFocus) {
        return this.placeholder;
      } else {
        return "";
      }
    }
  },
  methods: {
    showFn() {
      // document.addEventListener('click', e => {
      //   console.log(e);
      // })
    },
    clean() {
      this.currentValue = "";
    },
    handlerKeypress(e) {
      let num = e.target.dataset.num;
      if (num == -1 || num == undefined || num == null) return false;
      if (num == "d") {
        if (this.currentValue.length <= 0) {
          console.log("没有可删除的字符");
          return;
        }
        this.currentValue = this.currentValue.substring(
          0,
          this.currentValue.length - 1
        );
        return;
      }
      if (this.currentValue.length >= Number(this.max)) {
        return;
      }
      this.currentValue = this.currentValue + num;
    },
    longTap() {
      this.timer = setInterval(() => {
        this.currentValue = this.currentValue.substring(
          0,
          this.currentValue.length - 1
        );
      }, 100);
    },
    stopLongTap() {
      clearInterval(this.timer);
    },
    // 点击键盘触发
    clickKey(val) {
      if (val == "delete") {
        if (this.currentValue.length <= 0) {
          console.log("没有可删除的字符");
          return;
        }
        this.currentValue = this.currentValue.substring(
          0,
          this.currentValue.length - 1
        );
        return;
      }
      this.currentValue = this.currentValue + val;
      console.log(this.currentValue);
    },
    focusFn(e) {
      // 使该元素聚焦，但是不弹出系统键盘，没有光标效果
      e.target.focus();
      this.isFocus = true;
      this.isShowIdKeyboard = true;

      document.addEventListener("click", this.handler);

      // 隐藏错误感叹号
      this.isWarn = false;
      this.$emit("on-focus");
    },
    handler(e) {
      console.log(e);
    },
    blurFn() {
      this.$emit("on-blur", this.currentValue);
      this.isFocus = false;
      if (this.currentValue.length <= 0) {
        this.warnText = "请输入身份证号";
        this.isWarn = true;
        this.$emit("idError", { errMsg: this.warnText });
        return;
      }
      let isId = this.isIdCard(this.currentValue);
      if (!isId) {
        this.warnText = "身份证号码无效";
        this.isWarn = true;
        this.$emit("idError", { errMsg: this.warnText });
        return;
      }

      if (this.currentValue.length == 18) {
        let birth = this.currentValue.substr(6, 8);
        let gender = this.currentValue.substr(16, 1) % 2 == 0 ? "F" : "M";
        this.$emit("getInfo", { birth, gender });
      }
    },
    isIdCard(value, rule, callback) {
      if (value != "") {
        // 普通验证
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        // let errorMsg = rule && rule.message == undefined ? '身份证号码无效' : rule.message;
        let errorMsg = "身份证号码无效";
        if (!reg.test(value)) {
          // callback(new Error(errorMsg));
          return false;
        }
        // 验证身份证有效性
        let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
        let arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
        let sum = 0;
        for (var i = 0; i < value.length - 1; i++) {
          // 对前17位数字与权值乘积求和
          sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
        }
        if (arrValid[sum % 11] != value.substr(17, 1).toUpperCase()) {
          // callback(new Error(errorMsg));
          return false;
        }
        // 验证出生时间有效性
        let vYear = value.substr(6, 4) * 1;
        let vMonth = value.substr(10, 2) * 1;
        let vDay = value.substr(12, 2) * 1;
        let maxDays = 0;
        if ("|1|3|5|7|8|10|12|".indexOf("|" + vMonth + "|") > -1) {
          maxDays = 31;
        } else if (vMonth == 2) {
          if ((vYear % 4 == 0 && vYear % 100 != 0) || vYear % 400 == 0) {
            maxDays = 29;
          } else {
            maxDays = 28;
          }
        } else {
          maxDays = 30;
        }

        let nowStr = dateTools.date2Str(new Date(), "YYYYMMDD") * 1;
        if (value.substr(6, 8) * 1 <= nowStr && vDay <= maxDays) {
          // callback();
          return true;
        } else {
          // callback(new Error(errorMsg));
          return false;
        }
      }
      // callback();
      return true;
    },
    clickIcon() {
      this.$emit("clickIcon");
    }
  }
};
</script>

<style lang="less">
@import "~@core/public/less/mixin.less";
.ghb-id-input__input {
  &::placeholder {
    font-size: @fs30;
  }
}
.ghb-input_warn_icon {
  width: 0.34rem;
  height: 0.34rem;
  padding-left: 0.2rem;
}
.vux-popup-mask {
  background-color: rgba(0, 0, 0, 0) !important;
}
.ghb-id-input {
  background: #fff;
  height: @lh-line;
  position: relative;
  margin: 0 @spacing;
  &::before {
    .setTopLine();
  }
  &-init {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-l {
    font-size: @cellTitleSize;
    padding-right: 0.2rem;
  }
  &-c {
    flex: 1;
    display: flex;
    align-items: center;
    input {
      flex: 1;
    }
  }
}
.ghb-id-keyboare {
  height: 5.2rem;
  width: 100%;
  background-color: #1a1a1c;
  &-header {
    height: 0.78rem;
    font-size: @fs30;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    &-key {
      height: 1.02rem;
      width: 2.4rem;
      background: #49484d;
      font-size: 0.6rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.08rem;
      margin-left: 0.08rem;
      margin-bottom: 0.08rem;
      &:active {
        background-color: #64646b;
      }
    }
  }
}
.ghb-id-input-delete {
  .setBgIcon2("~@assets/base/jianpan_icon_delete@2x.png", 2.38rem, 1.02rem);
}
.ghb-id-keyboare-logo {
  .setBgIcon2("~@assets/base/keyboards_logo_huax@2x.png", 0.36rem, 0.3rem);
  display: inline-block;
}
.flashLine {
  height: 0.4rem;
  &::after {
    content: " ";
    display: block;
    width: 0.04rem;
    height: 0.4rem;
    background-color: @color-main;
    animation: flashLine 1s infinite;
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
