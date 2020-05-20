<template>
    <u-page class="nmb-bg-white">
        <u-result status="wait" actionResult="提交材料审核中" showText="预计30分钟内审核完成，请您耐心等待" />
        <div class="nmb-font-t2 top-box">
            以下材料审核通过，即可完成合格投资者认证
        </div>
        <u-group>
            <u-cell v-show="authTyp === '0'" title="上传资产证明材料">
                <span v-if="!needMeterial" class="nmb-font-t10">已满足</span>
                <span v-else-if="detail.astCheckStatus === '00'" class="nmb-font-t2">审核中</span>
                <span v-else-if="detail.astCheckStatus === '02'" class="nmb-font-t10">审核通过</span>
            </u-cell>
            <u-cell title="签署《承诺函》">
                <span v-if="detail.signCheckStatus === '00'" class="nmb-font-t2">审核中</span>
                <span v-else-if="detail.signCheckStatus === '02'" class="nmb-font-t10">审核通过</span>
            </u-cell>
        </u-group>
        <u-reminder :showTips="showReminder" title="温馨提示" />
        <div class="btn-box">
            <u-button @clickHandler="handleSubmit">完成</u-button>
        </div>
    </u-page>
</template>
<script>
  import { UPage, UButton, UGroup, UCell, UReminder, UResult } from "@engine";
  import mixins from "../../components/mixins";
  import { getBankList, closePage, pushWindow, hideLoading } from "@core/bridge";

  export default {
    name: 'certification-result-page',
    components: {
      UPage,
      UButton,
      UGroup,
      UCell,
      UReminder,
      UResult
    },
    mixins: [mixins], // getStatus authTyp aimbal

    data () {
      return {
        showReminder: ['1. 审核工作时间为周一至周日9:00-15:00。', '2. 非工作时间内提交的认证材料，将在工作时间内审核，请您耐心等待。'],
        needMeterial: true, // 需要提供材料证明。  资产>3百万时无需提供
        detail: {
          signCheckStatus: '', // 承诺函审核状态
          astCheckStatus: '' // 资产证明审核状态
        }
      };
    },

    created () {
      // showLoading();
      closePage(['/ghb_pdf/index/index.html', '/ghb_trustBuy/certification/sign.html']);
      this.init();
    },

    methods: {
      // init () {
      //   // 获取合格投资者认证状态
      //   this.$tools.rpc('NMBMPSX3404').then(res => {
      //     if (res.body.errorCode === '0') {
      //       for (var k in this.detail) {
      //         this.detail[k] = res.body[k] || '';
      //       }
      //     }
      //     hideLoading();
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      // 初始化
      async init () {
        // getStatus 和 authTyp 在mixins里
        await Promise.all([this.getStatus(), this.getTotalbal()]);
        hideLoading();
      },
      // 获取行内总资产
      async getTotalbal () {
        // 获取卡列表
        await getBankList('1').then(res => {
          const accountInfoList = res.body.accountInfoList || [];
          // TODO 提取参数
          // let accounts = accountInfoList.map(item => {
          //   console.log('item: ', item);
          //   return { accNo: item.accNo };
          // });
          // 获取持仓资产
          this.$tools.rpc('NMBMPSX3133', { accounts: accountInfoList }).then(res => {
            if (res.body.errorCode === '0') {
              let totalbal = res.body.totalbal || '0';
              if (+totalbal >= this.aimbal) {
                this.needMeterial = false;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      handleSubmit () {
        closePage(['/ghb_trustBuy/certification/intermediate.html']);
        setTimeout(() => {
          pushWindow('/ghb_trustBuy/certification/intermediate.html');
        }, 0);
      }
    }
  };
</script>

<style lang="less" scoped>
  .top-box {
    padding: 0 15px 7px;
    font-size: 12px;
    line-height: 16px;
  }

  .tip-box {
    padding: 20px 15px;
    font-size: 12px;
    line-height: 16px;

    div {
      margin-bottom: 10px;
    }
  }
</style>

