<template>
  <div class="ghb-im-inputs">
    <div class="ghb-im-input" :style="inputStyles" ref="inputWrapper">
      <div class="ghb-im-input-content">
        <div class="ghb-im-input__input" @click="focuInput">
          <!-- <input
            ref="iminput"
            type="text"
            v-model="currentValue"
            :placeholder="placeholder"
            @keydown="inputKeypressHandler"
          /> -->
          <div class="inputsss">
            <editor></editor>
          </div>
        </div>
        <div class="ghb-im-input__plugins">
          <div class="ghb-im-input__plugins-emoji" @click="showEmojiInput">
            <img src="./imgs/zaixkf_icon_biaoq@2x.png" alt />
          </div>
          <div class="ghb-im-input__plugins-more">
            <img src="./imgs/zaixkf_icon_tianjzp@2x.png" alt />
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
  </div>
</template>


<script>
import emojiList from "./utils/emoji";
import {emojis} from "./utils/emoji";
import swiper from "swiper";
import scroll from "@comps/BScroll/newScroll";
import Editor from './components/im-editor'
export default {
  props: {
    placeholder: {
      type: String,
      default: "请输入您想咨询的问题"
    }
  },
  components: { scroll, Editor },
  data() {
    return {
      init: true,
      inputFocus: false,
      showEmoji: false,
      emojiList: emojis,
      currentValue: ""
    };
  },
  computed: {
    emojiClass() {
      if (!this.inputFocus && this.showEmoji) {
        return "ghb-im-input__emoji-active";
      }
    },
    inputStyles() {
      if (this.init) {
        return {
          height: "50px",
          transition: "height .3s"
        };
      }
      // if(this.inputFocus && this.showEmoji) {

      // }
    }
  },
  methods: {
    showHtml: function (data) {
      this.previewHtml = data
    },
    focuInput() {
      this.$refs.inputWrapper.style.height = "50px";
      this.$refs.inputWrapper.style.transition = "0";
      this.$refs.emojiWrapper.style.transition = "0";
      this.showEmoji = false;
      // this.$refs.iminput.focus();
      this.$emit("on-focus");
    },
    showEmojiInput() {
      let _self = this;
      if (!this.showEmoji) {
        _self.$refs.emojiWrapper.style.transition = ".3s";
        _self.$refs.inputWrapper.style.height = "300px";

        _self.showEmoji = true;
        setTimeout(() => {
          // 设置高度后重新计算滚动
          _self.$refs.scroll.refresh();
        }, 200);
      } else {
        // _self.$refs.inputWrapper.style.height = '50px'
        // _self.showEmoji = false
        // _self.$refs.iminput.focus();
        this.$refs.inputWrapper.style.height = "50px";
        this.$refs.inputWrapper.style.transition = "0";
        this.$refs.emojiWrapper.style.transition = "0";
        this.showEmoji = false;
        this.$refs.iminput.focus();
        this.$emit("on-focus");
      }
    },
    emojiClickHandler(emoji) {
      let html = document.getElementsByClassName('ghb-editor-content')[0]

      if(html.childNodes.length > 0 && html.childNodes[0].nodeName == 'BR') {
        html.removeChild(html.firstChild);
      }
      let htmlContainer = document.createElement('img')
      htmlContainer.src = emoji.url;
      htmlContainer.style.display = 'inline-block';
      // htmlContainerParent.appendChild(htmlContainer);
      html.appendChild(htmlContainer)
      console.log(html.innerHTML);
    },
    setImage: function (evt) {
      // reader.readAsDataURL(file)
      // reader.onload = function (evt) {
      //   document.execCommand('insertImage', false, base64Image)
      // }
    },
    inputKeypressHandler(e) {
      console.log(e);
      if (e.code === "Enter") {
        // this.$refs.iminput.blur();
        // alert('发送')
        console.log(this.currentValue);
      }
    },
    replaceEmoji(str, baseUrl = './imgs/emoji/') {
      if(baseUrl.substr(baseUrl.length-1, 1)!== '/') {
          baseUrl = baseUrl + '/'
      }
      let pattern = /\!\@\d{1,2}\&/g;
      let emojiList = str.match(pattern);
      for(let i = 0 ; i <= emojiList.length-1; i++) {
        let item = emojiList[i];
        let emojiNum = item.slice(2);
        emojiNum = emojiNum.substring(0, emojiNum.length - 1);
        let img = `<img src='${baseUrl}${emojiNum}.gif'/>`
        let reg = new RegExp(item)
        str = str.replace(item, img);
      }
      return str
    }
  }
};
</script>


<style lang='less' scoped>
@import "~@public/less/mixin.less";

.ghb-im-input {
  background-color: #fff;
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
      input, .inputsss {
        width: 100%;
        height: 100%;
        border-radius: 22px;
        padding: 0 15px;
        font-size: 15px;
        box-sizing: border-box;
        background-color: #ededed;
        &::placeholder {
          color: @font-t2;
        }
      }
    }
    .ghb-im-input__plugins {
      width: 86px;
      padding-left: 15px;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      > div {
        .setIconSize(28px, 28px);
      }
    }
  }
}
.ghb-im-inputs {
  position: relative;
}
.ghb-im-input__emoji {
  width: 100%;

  // height: 250px;
  max-height: 0px;
  background-color: fff;
  position: absolute;
  bottom: 0;
  height: 250px;
  // overflow: scroll;
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
.ghb-im-input__emoji-active {
  transition: height 0.3s;
  height: 250px;
  max-height: 250px;
}
</style>