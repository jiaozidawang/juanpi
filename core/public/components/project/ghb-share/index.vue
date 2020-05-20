<template>
  <Popup class="ghb-share" v-model="currentValue">
    <div class="div">
      <div class="ghb-share_recommer" v-if="isNeedRecommendNo">
        <div class="ghb-share_recommer_input" @click="focusInput">
          <input type="tel" ref="shellInput" placeholder="请输入客户经理编号(选填)" v-model="recommendNo">
        </div>
      </div>
      <div class="ghb-share_head">
        <span class="ghb-share_head_text">分享到</span>
      </div>
      <div class="ghb-share_body">
        <div class="ghb-share_body_line">
          <div
            class="ghb-share_channel"
            v-for="item in channelList"
            :key="item.class"
            @click="clickChannelIcon(item)"
          >
            <div class="ghb-share_channel_icon" :class="item.class"></div>
            <div class="ghb-share_channel_text">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="ghb-share_footer vux-1px-t" @click="currentValue = false">
        <span>取消</span>
      </div>
    </div>
  </Popup>
</template>

<script>
import { Popup } from "vux";
import { shareTo, errorAlertH5 } from "@bridge";
import mixin from "../mixins/vmodelMixin.js";
const LINE_ONE = [
  { class: "wechat", text: "微信好友", type: "1" },
  { class: "friend", text: "微信朋友圈", type: "2" },
  { class: "sina", text: "新浪微博", type: "3" }
];
const LINE_TWO = [
  { class: "copy", text: "复制口令", type: "4" },
  { class: "qrcode", text: "二维码", type: "5" },
  { class: "haibao", text: "微海报", type: "6" }
];

const ALL_LIST = [
  { class: "wechat", text: "微信好友", type: "1" },
  { class: "friend", text: "微信朋友圈", type: "2" },
  { class: "sina", text: "新浪微博", type: "3" },
  { class: "copy", text: "复制口令", type: "4" },
  { class: "qrcode", text: "二维码", type: "5" },
  { class: "haibao", text: "微海报", type: "6" }
]
export default {
  name: "ghb-share",
  mixins: [mixin],
  components: {
    Popup
  },
  data() {
    return {
      recommendNo: ""
    };
  },
  props: {
    value: Boolean,
    type: {
      type: String,
      default: "more"
    },
    isNeedRecommendNo: {
      type: Boolean,
      default: true
    },
    shareTypeList: Array // example ['wechat', 'friend']
  },
  computed: {
    channelList() {
      if(!this.shareTypeList || this.shareTypeList.length <= 0) {
        return ALL_LIST;
      }

      let channelList = [];
      this.shareTypeList.forEach(item => {
        ALL_LIST.forEach(listItem => {
          if(item == listItem.class) {
            channelList.push(listItem);
          };
        });
      });
      return channelList;
    }
  },
  methods: {
    focusInput () {
      this.$refs.shellInput.focus()
    },
    /**
     * @description: 点击
     * @param {type}
     * @return:
     */
    async clickChannelIcon(item) {
      let _self = this;
      if(this.recommendNo) {
        let reg = /^\d{8}$/;
        if(this.recommendNo.match(reg) == null) {
          errorAlertH5('请输入8位数字编号')
          return
        }
        let res = await _self.NMBMPSX3334({
          employeeId: _self.recommendNo
        });
        let { header, body } = res;
        if (header.errorCode !== "0") {
          _self.recommendNo = "";
          // return;
        }
      }
      this.$emit("clickIcon", { ...item, recommendNo: this.recommendNo });
    },
    /**
     * @description 员工信息查询
     * PBS11022
     */
    NMBMPSX3334(params = {}) {
      return this.$tools.rpc("NMBMPSX3334", { ...params }, { biz: true });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@comp/styles/1px.less";
@import "~@core/public/less/mixin.less";


.ghb-share {
  background-color: #fff;
  overflow: hidden;
}

.ghb-share_head_text{
  display: inline-block;
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: -1.4rem;
    top: 50%;
    display: block;
    height: 0.02rem;
    width: 1.2rem;
    border: none;
    background-color: #ededed;
  }
  &::after {
    content: " ";
    position: absolute;
    right: -1.4rem;
    top: 50%;
    display: block;
    height: 0.02rem;
    width: 1.2rem;
    border: none;
    background-color: #ededed;
  }
}

.ghb-share_recommer {
  height: 1.5rem;
  background-color: @bg-color;
  padding: 0.3rem @spacing;
  box-sizing: border-box;
  .ghb-share_recommer_input {
    height: @lh-line;
    background-color: @bg;
    input {
      padding: 0 @spacing;
      width: 100%;
      height: 100%;
    }
  }
}
.ghb-share_head,
.ghb-share_footer {
  padding: 0.3rem 0;
  text-align: center;
  span {
    line-height: 1.26;
  }
}

.ghb-share_body {
  .ghb-share_body_line {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

.ghb-share_channel {
  width: 33.3%;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:active {
    background-color: rgba(0, 0, 0, 0.02);
  }
  .ghb-share_channel_text {
    font-size: @fs24;
    line-height: 2;
  }
}

.wechat {
  .setBgIcon("~@assets/base/wechat@2x.png", 0.72rem);
}
.friend {
  .setBgIcon("~@assets/base/friend@2x.png", 0.72rem);
}
.sina {
  .setBgIcon("~@assets/base/sina@2x.png", 0.72rem);
}
.copy {
  .setBgIcon("~@assets/base/copy@2x.png", 0.72rem);
}
.qrcode {
  .setBgIcon("~@assets/base/qrcode@2x.png", 0.72rem);
}
.haibao {
  .setBgIcon("~@assets/base/haibao@2x.png", 0.72rem);
}
</style>

