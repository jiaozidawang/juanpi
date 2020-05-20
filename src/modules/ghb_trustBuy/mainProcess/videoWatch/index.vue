<template>
  <u-page>
    <section class="videoBox">
      <div v-if="maskShow" class="mask">
        <div class="content">
          <div class="msg1">该视频大小约为 {{ b2mb(pageParams.recomVidDocCpcty) }}</div>
          <div class="msg2">建议您在WIFI环境下观看</div>
          <div class="line"></div>
          <div class="btnBox">
            <div class="item left" @click="back">暂不观看</div>
            <div class="item right nmb-bg-t32" @click="continueWatch">继续观看</div>
          </div>
        </div>
      </div>
      <video-comp ref="videoPlayer"
                  :prd-cd="pageParams.prdCd"
                  :video-url="pageParams.recomVid"
                  @play-finish="playFinish"
                  @screen-change="screenChange"/>
    </section>
    <section class="fundInfoBox">
      <div class="fundTitle nmb-font-dark">
        <div class="titleKey">产品名称：</div>
        <div class="titleVal">{{ pageParams.prdName }}</div>
      </div>
      <div class="fundTip">
        本产品由{{ pageParams.prdInit }}发行。为保障您的权益，请在认购前观看产品推介视频（建议WIFI环境下观看）。
      </div>
    </section>

    <!-- <div>{{ netStatus }} {{ b2mb(pageParams.recomVidDocCpcty) }}</div>
    <u-button size="S" @clickHandler="refresh">刷新</u-button> -->

    <!-- <section v-if="pageType === 'normalProcess'" class="footBox">
      <u-button :disabled="!videoPlayFinish"
                noBorderRadius
                @clickHandler="goFundPurchase()">我已观看完毕，下一步</u-button>
    </section> -->

    <div v-if="pageType === 'normalProcess' && playerType === 'normal'" class="footBox" slot="bottom">
      <u-button :disabled="!videoPlayFinish" @clickHandler="goFundPurchase()">我已观看完毕，下一步</u-button>
    </div>
  </u-page>
</template>

<script>
/**
 * type             页面类型 'onlyWatch': 只看视频, 'normalProcess': 正常流程
 * prdCd            产品编号
 * prdName          产品名称
 * recomVidDocCpcty 视频大小
 * recomVid         视频地址
 * prdInit          发行商
 */
import VideoComp from "../../components/VideoComp";
import { UPage, UButton } from "@engine";
import {
  closeTo,
  setSessionStorage,
  getSessionStorage,
  pushWindow,
  getClientInfo } from "@bridge";

export default {
  name: 'videoWatch',

  components: {
    UPage,
    UButton,
    VideoComp
  },

  created () {
    let data = window.App.params || {};
    this.pageType = data.type;
    this.pageParams.prdCd = data.prdCd || '';
    this.pageParams.prdName = data.prdName || '';
    this.pageParams.recomVidDocCpcty = data.recomVidDocCpcty || '';
    this.pageParams.recomVid = data.recomVid || ''; // window.location.origin + '/111.mp4'
    // this.pageParams.recomVid = 'http://10.1.87.107:7001/pub/hxbank/images/trust/GDHX02/071.mp4';
    // this.pageParams.recomVid = 'https://jrb2b.oneconnectft.com/resource/media/index_media1.mp4';
    this.pageParams.prdInit = data.prdInit || '';
  },

  mounted () {
    let _this = this;
    // 获取一下是否播放过
    let storageKey = this.pageParams.prdCd + '-videoHasPlayed';
    getSessionStorage(storageKey).then(res => {
      console.log('getSessionStorage', res);
      if (res && res === '1') {
        // 视频已经看过了
        this.videoPlayFinish = true;
      }
    });
    // 获取一下当前网络情况
    getClientInfo().then(res => {
      _this.netStatus = res.network;
      if (_this.netStatus === 'WIFI') {
        _this.maskShow = false;
      } else {
        _this.maskShow = true;
      }
    });
  },

  data: function () {
    return {
      maskShow: false, // 是否显示视频蒙层
      /* 'onlyWatch': 只观看,
       * 'normalProcess': 正常流程的视频观看页面
       */
      pageType: 'normalProcess',
      pageParams: {
        prdCd: '', // 产品编号
        prdName: '', // 产品名称
        prdInit: '', // 发行公司
        recomVid: '', // 视频地址
        recomVidDocCpcty: '' // 视频大小
      },
      playerType: 'normal',
      videoPlayFinish: false,
      // videoPlayFinish: true, // mock 视频观看页 - 放开视频按钮控制
      netStatus: '' // 网络情况 wan || WIFI
    };
  },

  methods: {
    // 视频播放完毕
    playFinish () {
      this.videoPlayFinish = true;
      let storageKey = this.pageParams.prdCd + '-videoHasPlayed';
      setSessionStorage(storageKey, '1');
    },

    screenChange (type) {
      this.playerType = type;
    },

    //去产品购买页面(预下单)
    goFundPurchase () {
      if (!this.videoPlayFinish) {
        return false;
      }
      pushWindow('/ghb_trustBuy/mainProcess/fundPurchase.html', {
        type: 'preSubmit',
        prdCd: this.pageParams.prdCd
      });
    },

    // 后退
    back () {
      closeTo({
        index: -1
        // data: {
        //   hha: '你好'
        // }
      });
    },

    // 关闭蒙层继续播放
    continueWatch () {
      this.maskShow = false;
    },

    // 字节转换mb
    b2mb (str) {
      if (str && typeof str === 'string') {
        return (Number(str) / 1048576).toFixed(2) + 'MB';
      } else {
        return '未知';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.videoBox {
  position: relative;
  // height: 201px;

  .mask {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    font-size: 14px;

    .content {
      width: 300px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
    }

    .msg1,
    .msg2 {
      text-align: center;
      height: 30px;
      line-height: 30px;
    }

    .line {
      height: 1px;
      // border-bottom: 1px solid #fff;
      margin: 15px 0;
    }

    .btnBox {
      display: flex;
      justify-content: space-around;

      .item {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        box-sizing: border-box;
      }

      .left {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 2px;
        margin-right: 60px;
      }

      .right {
        border-radius: 2px;
      }
    }
  }
}

.fundInfoBox {
  padding: 18px 15px;

  .fundTitle {
    display: flex;
    font-size: 15px;
    letter-spacing: 0;
    margin-bottom: 15px;

    .titleKey {
      white-space: nowrap;
      // width: 75px;
      line-height: 16px;
    }

    .titleVal {
      flex: 1;
      line-height: 16px;
    }
  }

  .fundTip {
    line-height: 18px;
    font-size: 13px;
    color: #999999;
  }
}

.footBox {
  padding: 22px 15px;
}
</style>
