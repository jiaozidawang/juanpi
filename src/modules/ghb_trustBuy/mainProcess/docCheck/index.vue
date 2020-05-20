<template>
    <u-page>
        <section class="stepBox nmb-bg-white">
            <step-flow :step="1" />
        </section>

        <div class="infoTip nmb-font-dark">
            请先阅读《电子签署同意函》
        </div>
        <section class="infoBox nmb-bg-white nmb-font-dark">
            <div class="infoTitle">{{ docInfo.title }}</div>
            <div v-for="(e, i) in docInfo.paragraph" :key="i" class="infoBlock">
              {{ e }}
            </div>
        </section>

        <div class="footerBtnBox" slot="bottom">
            <u-button :noBorderRadius="true" @clickHandler="goNext()">同意</u-button>
        </div>
    </u-page>
</template>

<script>
/**
 * prdCd 产品代码
 * orderNo 订单编号
 */
import { UPage, UButton } from "@engine";
import StepFlow from "../../components/StepFlow";
import mixins from "../../components/mixin_getDoc.js";
import { pushWindow, errorAlert, closePage } from "@bridge";

export default {
  name: 'docCheck',

  components: {
    UPage,
    UButton,
    StepFlow
  },

  mixins: [mixins], // 混入获取文档方法

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    // popOtherWindow();
    closePage(['/ghb_trustBuy/mainProcess/fundPurchase.html']);
    // window.App.on('back', e => {
    //   closeTo({
    //     index: -1
    //   });
    // });
  },

  data: function () {
    return {
      prdCd: '',
      orderNo: '', // 订单编号
      // 电子签署同意函内容
      docInfo: {
        title: '电子签署同意函',
        paragraph: [
          // '1. 同意通过电子签名的方式签署以下文档，包括但不限于：合同、风险申明书、产品说明书等。签署完成后即表明已阅读并理解文档相关内容，并愿意受其所签署文档的相关约束。'
          // '2. 信托计划/资管计划的受托人/管理人承诺当前投资者通过电子签名方式完成签署后，愿意受投资者通过电子签名方式所签署文档的相关约束。'
        ]
      }
    };
  },

  mounted () {
    this.getContent();
  },

  methods: {
    // 动态获取电子签署同意函内容
    getContent () {
      this.$tools.rpc('NMBMPSX3421', {sysParName: 'ELEC_LETTE_OF_CONSENT'}).then(res => {
        const resData = res.body || {};
        if (resData.errorCode === '0') {
          if (resData.sysParVal) {
            this.docInfo.paragraph = resData.sysParVal.split('&lt;br/&gt;');
          } else {
            errorAlert('无法获取同意函');
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goNext () {
      let _this = this;
      _this.$client.closeTo('0');
      _this.getDocUrl(_this.prdCd, '01', function (url, name) {
        pushWindow('/ghb_pdf/index/index.html', {
          pdfUrl: url,
          title: '签署单证',
          pdfTittle: '请阅读以下产品合同及相关单证，无误后点击下方开始签名',
          showButton: true,
          needCountdown: false,
          pushParams: {
            url: '/ghb_trustBuy/mainProcess/sign.html',
            options: {
              prdCd: _this.prdCd,
              orderNo: _this.orderNo
            },
            extendParam: {
              showTitleBar: false
            }
          },
          buttonText: '点击开始签名'
        }, {
          defaultTitle: '签署单证'
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.stepBox {
    height: 118px;
    padding: 18px;
    box-sizing: border-box;
}

.infoTip {
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    font-size: 12px;
}

.infoBox {
    padding: 24px 15px;

    .infoTitle {
      text-align: center;
      font-size: 16px;
      height: 16px;
      line-height: 16px;
      margin-bottom: 20px;
    }

    .infoBlock {
      font-size: 13px;
      line-height: 20px;
    }

    .infoBlock + .infoBlock {
      margin-top: 20px;
    }
}
</style>

