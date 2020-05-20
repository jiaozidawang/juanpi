<template>
  <div class="ghb-im-inputs">
    <div class="ghb-im-input" :style="inputStyles" ref="inputWrapper">
      <div class="ghb-im-input-content">
        <div class="ghb-im-input__input" @click="focuInput">
          <!-- <form> -->
          <input
            ref="iminput"
            type="text"
            @keydown="inputKeydownHandler"
            @blur="inputBlurHandler"
            v-model="currentValue"
            :placeholder="placeholder"
          />
          <!-- </form> -->
        </div>
        <div class="ghb-im-input__plugins">
          <div class="ghb-im-input__plugins-emoji" @click="showEmojiInput">
            <img src="./imgs/zaixkf_icon_biaoq@2x.png" alt />
          </div>
          <div v-if="!currentValue" class="ghb-im-input__plugins-more" @click="morePluginsHandler">
            <img src="./imgs/zaixkf_icon_tianjzp@2x.png" alt />
          </div>
          <div
            class="ghb-im-input__plugins-send"
            :class="{'send-active': currentValue}"
            @click="send"
          >
            <div>发送</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="ghb-im-input__emoji" v-if="!inputFocus && showEmoji"></div> -->
    <div class="ghb-im-input__emoji scroll-list-wrap" :class="emojiClass" ref="emojiWrapper">
      <scroll ref="scroll" :data="emojiList" :scrollbar="true" class="scroll">
        <ul>
          <li v-for="item in emojiList" @click="emojiClickHandler(item)">
            <img :src="item.url" />
          </li>
        </ul>
      </scroll>
    </div>
    <!-- 更多工具面板 -->
    <div v-if="showPlugins" class="ghb-im-input__more" ref="moreWrapper">
      <ul>
        <li>
          <div class="plugin-image" @click="pluginClickHandler('image')">
            <img src="./imgs/images@2x.png" />
          </div>
          <p>上传照片</p>
        </li>
        <!-- <li>
          <div class="plugin-image" @click="pluginClickHandler('photo')">
            <img src="./imgs/photo@2x.png"/>
          </div>
          <p>拍摄</p>
        </li>-->
      </ul>
    </div>
    <div v-show="!inputFocus && showEmoji" class="emoji-ctrl">
      <div class="emoji-ctrl-delete" @click="clickDelete">X</div>
      <div class="emoji-ctrl-send" @click="send">发送</div>
    </div>
    <div v-if="disabled" class="input-mask"></div>
    <div
      v-if="showEmoji || showPlugins || inputFocus"
      class="input-fullscreen-mask"
      @click="clickFullscreenMaskHandler"
    ></div>
  </div>
</template>


<script>
import emojiList from "./utils/emoji";
import { emojis } from "./utils/emoji";
import swiper from "swiper";
import scroll from "@comps/BScroll/newScroll";
import { resolve } from "url";
import scrollWindowMixin from "./mixins/index";
export default {
  name: "ghb-im-input",

  mixins: [scrollWindowMixin],

  components: { scroll },

  props: {
    placeholder: {
      type: String,
      default: "请输入您想咨询的问题"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String
  },

  data() {
    return {
      init: true,
      inputFocus: false,
      showEmoji: false,
      showPlugins: false,
      emojiList: emojis,
      currentValue: "",
      os: window.App.device.os
    };
  },

  computed: {
    emojiClass() {
      if (!this.inputFocus && this.showEmoji) {
        return "ghb-im-input__emoji-active";
      } else {
        return "";
      }
    },
    inputStyles() {
      if (this.init) {
        return {
          height: "50px",
          transition: "height .3s"
        };
      }
    },
    clickMaskHandler() {
      this.$emit("clickMask");
    }
  },

  watch: {
    // currentValue(newVal) {
    //   this.chineseCash = newVal ? this.$tools.changeAmt(newVal) : '';
    //   this.$emit('input', newVal);
    // },
    currentValue(v) {
      this.$emit("input", v);
    },
    value(v) {
      if (v) {
        this.currentValue = v;
      }
    }
  },

  methods: {
    /**
     * @description 点击全屏透明遮罩触发的事件
     */
    clickFullscreenMaskHandler() {
      this.remoteBox();
      this.$refs.iminput.blur();
      this.showEmoji = false;
      this.$refs.inputWrapper.style.height = "50px";
      this.showPlugins = false;
    },
    /**
     * @description 点击删除按钮
     */
    clickDelete() {
      let pattern = /\[([^\]]+)\]/g;
      let lastStr = this.currentValue.substr(this.currentValue.length - 1, 1);
      if (lastStr !== "]") {
        this.currentValue = this.currentValue.substr(
          0,
          this.currentValue.length - 1
        );
        return;
      }
      console.log(this.currentValue.match(pattern));
      let emojiList = this.currentValue.match(pattern);
      let needDeleteEmoji = emojiList[emojiList.length - 1];
      console.log("需要删除的表情", needDeleteEmoji);
      this.currentValue = this.currentValue.substring(
        0,
        this.currentValue.lastIndexOf(needDeleteEmoji)
      );
    },
    /**
     * @description 点击发送按钮
     */
    send() {
      this.$emit("send", this.currentValue);
      this.showPlugins = false;
      this.cleanValue();
    },
    /**
     * @description 清除输入框内的值
     */
    cleanValue() {
      this.currentValue = "";
    },
    /**
     * @description 聚焦事件
     * @description 点击输入框的外层wrapper使用JS手动让输入框聚焦，消除移动端300毫秒延迟导致的输入框聚焦不灵敏问题
     */
    focuInput() {
      // if (this.os == "android") {
      //   this.scrollWindow();
      // }
      this.$refs.inputWrapper.style.height = "50px";
      this.showEmoji = false;
      this.showPlugins = false;
      this.inputFocus = true;
      this.$emit("on-focus");
    },
    /**
     * @description 输入框失焦触发事件
     */
    inputBlurHandler() {
      this.inputFocus = false;
      setTimeout(() => {
        if (!this.showEmoji && !this.showPlugins) {
          this.remoteBox();
        }
      }, 300);
    },
    /**
     * @description 点击更多插件触发
     */
    morePluginsHandler() {
      // if(this.os == 'android') {
      // this.scrollWindow();
      // }
      this.$refs.inputWrapper.style.height = "194px";
      this.$refs.iminput.blur();
      if (this.showEmoji) {
        this.showPlugins = true;
      } else {
        setTimeout(() => {
          this.showPlugins = true;
        }, 300);
      }
      this.showEmoji = false;
    },
    /**
     * @description 插件点击控制器
     */
    pluginClickHandler(type) {
      if (type === "image") {
        // getNativePhoto(1, "0").then(res => {
        //   console.log(res);
        //   this.$emit("plugins", { type: "imgage", data: res });
        // });
        window.AlipayJSBridge.call(
          "getCustomerServiceInfo",
          {
            state: "1"
          },
          res => {
            console.log(res);
            let { errorCode, data } = res;
            if (errorCode === "0") {
              this.$emit("plugins", { type: "imgage", data: data });
            }
          }
        );
        return;
      }
      // if (type === 'photo') {
      //   getNativePhoto(1, '1', false).then(res => {
      //     console.log(res);
      //     this.$emit('plugins', {type: 'photo', data: res});
      //   })
      //   return
      // }
    },
    /**
     * @description 点击展示表情面板
     */
    showEmojiInput() {
      let _self = this;
      this.showPlugins = false;
      // this.scrollWindow('emoji');
      if (!this.showEmoji) {
        _self.$refs.emojiWrapper.style.transition = ".3s";
        _self.$refs.inputWrapper.style.height = "300px";
        _self.showEmoji = true;
        setTimeout(() => {
          // 设置高度后重新计算滚动
          _self.$refs.scroll.refresh();
        }, 200);
      } else {
        this.$refs.inputWrapper.style.height = "50px";
        this.showEmoji = false;
        this.$refs.iminput.focus();
        this.$emit("on-focus");
      }
    },
    /**
     * @description 点击表情触发事件
     * @param {object} emoji 表情对象
     */
    emojiClickHandler(emoji) {
      console.log(emoji);

      // this.currentValue = this.currentValue + '<img src="'+ emoji.url +'" />'
      this.currentValue = this.currentValue + emoji.val;
    },
    /**
     * @description 软键盘按下事件处理
     */
    inputKeydownHandler(e) {
      console.log(e);
      if (e.keyCode === 13) {
        this.$emit("send", this.currentValue);
        this.cleanValue();
      }
    },
    // inputKeypressHandler(e) {
    //   console.log(e);
    //   if (e.code === "Enter") {
    //     console.log(this.currentValue);
    //   }
    // },
    /**
     * @description 表情字符替换
     */
    replaceEmoji(str, baseUrl = "./imgs/emoji/") {
      console.log(baseUrl);
      if (baseUrl.substr(baseUrl.length - 1, 1) !== "/") {
        baseUrl = baseUrl + "/";
      }
      // let pattern = /\!\@\d{1,2}\&/g;
      let pattern = /\[([^\]]+)\]/g;
      let emojiList = [];
      emojiList = str.match(pattern);
      if (emojiList === null) {
        return str;
      }
      for (let i = 0; i <= emojiList.length - 1; i++) {
        let item = emojiList[i];
        for (let k = 0; k < emojis.length; k++) {
          const el = emojis[k];
          if (el.val === item) {
            let imgUrl = `<img src='${el.url}' style="display:inline-block"/>`;
            str = str.replace(item, imgUrl);
            break;
          }
        }
      }
      return str;
    }
  }
};
</script>


<style lang='less' scoped>
@import "~@public/less/mixin.less";

@input-send-color: #459ffc;
@input-send-color-active: #459ffc;

.ghb-im-input {
  background-color: #fff;
  position: relative;
  z-index: 3;
  transition: height 0.3s;
  &-content {
    height: 50px;
    width: 100%;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    .ghb-im-input__input {
      flex: 1;
      height: 100%;
      form {
        width: 100%;
        height: 100%;
      }
      input,
      .inputsss {
        width: 100%;
        height: 100%;
        border-radius: 22px;
        padding: 0 15px;
        font-size: 15px;
        box-sizing: border-box;
        background-color: #ededed;
        -webkit-appearance: none;
        &::placeholder {
          color: @font-t2;
        }
      }
    }
    .ghb-im-input__plugins {
      // width: 86px;
      // padding-right: 15px;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      > div {
        margin-left: 15px;
        .setIconSize(28px, 28px);
      }
      .ghb-im-input__plugins-send {
        width: 0;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        margin-left: 0;
        border-radius: 4px;
        background-color: @input-send-color;
        transition: width 0.3s;
        &:active {
          background-color: @input-send-color-active;
        }
      }

      .send-active {
        margin-left: 15px;
        width: 50px;
      }
    }
  }
}
.ghb-im-inputs {
  position: relative;
  .input-mask {
    height: 100%;
    width: 100%;
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #ededed;
  }
  .input-fullscreen-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0);
  }
}

.ghb-im-input__emoji {
  width: 100%;
  max-height: 0px;
  background-color: #f2f4f7;
  position: absolute;
  bottom: 0;
  height: 250px;
  .scroll {
    height: 100%;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    // padding-top: 10px;
    li {
      padding: 5px 11.5px;
      .setIconSize(30px, 30px);
    }
  }
}

.ghb-im-input__more {
  width: 100%;
  height: 144px;
  position: absolute;
  bottom: 0;
  z-index: 5;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #f2f4f7;
    padding-left: 20px;
    li {
      width: 68px;
      height: 68px;
      padding: 15px 0;
      padding-right: 20px;
      color: @font-t2;
      .plugin-image {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        padding-top: 4px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
.emoji-ctrl {
  width: 116px;
  height: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: #f2f4f7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &-delete,
  &-send {
    width: 50px;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    &:active {
      background-color: #888;
    }
  }
  &-delete {
    margin-right: 10px;
  }
}
.ghb-im-input__emoji-active {
  transition: height 0.3s;
  height: 250px;
  max-height: 250px;
  z-index: 4;
}
</style>
