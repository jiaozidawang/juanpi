<template>
  <u-page>
    <div class="nmb-bg-white desc-block">
        <h3 class="nmb-font-dark">认证后即可购买我行私募资管产品</h3>
        <p>符合下述任一情形，即可认定为我行私募资管产品的合格投资者：</p>
        <p>1.客户金融资产余额在过去3个月曾到达500万（含）以上；</p>
        <p>2.客户金融资产余额剔除在我行银行贷款余额后的净额在过去3个月曾达到300万（含）以上；</p>
        <p>3.已提供我行认可的、已用印的金额资产或收入证明文件。</p>
    </div>
    <div class="btn-box mt20" >
        <u-button @clickHandler="handleSubmit">开始认证</u-button>
    </div>
  </u-page>
  
</template>
<script>
  import { UPage, UButton } from "@engine";
  // import tools from "@utils/tools";
  import mixins from "../../components/mixins";
  import { showLoading, hideLoading, pushWindow, errorAlertH5 } from "@bridge";
  // import { mapState } from 'vuex';

  export default {
    name: 'certification-home-page',
    components: {
      UPage,
      UButton
    },
    mixins: [mixins], // getSystermAuthTyp authTyp
    data () {
      return {
        // phoneNo: '13212341234',
      };
    },
    computed: {
      // ...mapState(['userInfo']),
      // text () {
      //   return tools.formatPhone(this.phoneNo);
      // }
    },

    created () {
      showLoading();
      this.getSystermAuthTyp();
      hideLoading();
    },

    methods: {
      handleSubmit() {
        if (this.authTyp === '1') { // 自证模式
          this.getPDF();
        } else {
          pushWindow('/ghb_trustBuy/certification/intermediate.html');
        }
        // pushWindow('/ghb_trustBuy/mainProcess/fundDetail.html?proCode=DYT', {}, {transparentTitle: 'always'}); // test
      },
      // 获取合格投资者承诺函pdf文件地址
      getPDF () {
        this.$tools.rpc('NMBMPSX3421', {sysParName: 'QFII_COMMIT_LETTE'}).then(res => {
          const resData = res.body || {};
          if (resData.errorCode === '0') {
            if (resData.sysParVal) {
              pushWindow('/ghb_pdf/index/index.html', {
                pdfUrl: resData.sysParVal,
                title: '签署承诺函',
                showButton: true,
                needCountdown: false,
                pushParams: {
                  url: '/ghb_trustBuy/certification/sign.html',
                  options: {
                    authTyp: this.authTyp
                  },
                  extendParam: {
                    showTitleBar: false
                  }
                },
                buttonText: '确认无误，可以签字'
              }, {
                defaultTitle: '签署承诺函'
              });
            } else {
              errorAlertH5('未获取到承诺函');
            }
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .desc-block {
    padding: 20px 15px;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 2.33px;
    
    h3 {
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .mt20 {
    margin-top: 20px;
  }
</style>

