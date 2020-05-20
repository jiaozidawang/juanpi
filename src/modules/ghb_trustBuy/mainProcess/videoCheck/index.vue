<template>
    <u-page>
        <section class="stepBox nmb-bg-white">
            <step-flow :step=2 />
        </section>

        <div class="recordMethodTitle nmb-font-dark">
            即将进行视频双录验证，请在10分钟内完成验证
        </div>
        <section class="recordMethodChooseBox nmb-bg-white">
            <div class="selectItem" @click="selectMe('智能双录')">
                <div class="recordIcon bothwayRecord"></div>
                <div class="recordInfo">
                    <div class="recordTitle nmb-font-dark">智能双录</div>
                    <div class="recordIntroduce nmb-font-t2">24小时为您服务，方便、快捷。</div>
                </div>
                <!-- <div class="selectCheckBox">O</div> -->
            </div>
            <!-- <div class="selectItem" @click="selectMe('人工双录')">
                <div class="recordIcon"></div>
                <div class="recordInfo">
                    <div class="recordTitle">人工双录</div>
                    <div class="recordIntroduce">人工双录在线时间为8:00-18:00，非在线时间请选择智能双录。</div>
                </div>
                <div class="selectCheckBox">O</div>
            </div> -->
        </section>

        <!-- <div class="footerBtnBox" slot="bottom">
            <u-button :noBorderRadius="true" @clickHandler="goNext">确定</u-button>
        </div> -->
        <section class="confirmBtnBox">
          <u-button @clickHandler="goNext">下一步</u-button>
        </section>
    </u-page>
</template>

<script>
/**
 * prdCd
 * orderNo
 */
import { UPage, UButton } from "@engine";
import StepFlow from "../../components/StepFlow";
import { pushWindow, closePage, getDeviceAndAppInfo } from "@bridge";

export default {
  name: 'docAssign',
  components: {
    UPage,
    UButton,
    StepFlow
  },

  async created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    // popOtherWindow();
    // 自己的摸索实践
    // 兼容IOS写法(此写法在安卓上清除相同路径页面会有问题)
    closePage([
      '/ghb_trustBuy/mainProcess/docCheck.html',
      '/ghb_trustBuy/mainProcess/sign.html',
      '/ghb_trustBuy/mainProcess/bothwayRecord.html',
      '/ghb_pdf/index/index.html',
      '/ghb_pdf/index/index.html'
    ]);
    // 兼容安卓写法（次写法在IOS上会有问题，多个closePag会清除不掉页面，建议写成数组的方式）
    let appInfo = await getDeviceAndAppInfo();
    if (appInfo.os.toLowerCase() === 'android') {
      closePage(['/ghb_pdf/index/index.html']);
    }
    // window.App.on('back', e => {
    //   closeTo({
    //     urlPattern: '/ghb_trustBuy/mainProcess/fundDetail.html'
    //   });
    // });
  },

  data: function () {
    return {
      prdCd: '',
      orderNo: '',
      recordMethod: '智能双录'
    };
  },

  methods: {
    selectMe: function (method) {
      if (this.recordMethod !== method) {
        this.recordMethod = method;
      }
    },

    goNext () {
      pushWindow('/ghb_trustBuy/mainProcess/bothwayRecord.html', {
        prdCd: this.prdCd,
        orderNo: this.orderNo
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.stepBox {
  height: 118px;
  padding: 18px;
  box-sizing: border-box;
}

.recordMethodTitle {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  font-size: 12px;
}

.recordMethodChooseBox {
  padding: 0 15px;

  .selectItem {
    padding: 20px 0;
    display: flex;
    align-items: center;

    .recordIcon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .recordInfo {
      padding-left: 15px;
      flex: 1;

      .recordTitle {
        height: 16px;
        line-height: 16px;
        font-size: 15px;
        margin-bottom: 6px;
      }

      .recordIntroduce {
        width: 240px;
        line-height: 18px;
        font-size: 13px;
      }
    }

    .selectCheckBox {
      width: 18px;
    }
  }

  .selectItem + .selectItem {
    border-top: 1px solid #EDEDED;
  }
}
</style>
<style lang="less" scoped>
@import '../../style/mixin.less';

.recordIcon.bothwayRecord {
  .setBackgroundModuleImage('bothwayRecord.png');
}

.confirmBtnBox {
  margin: 30px 15px;
}
</style>
