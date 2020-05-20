<template>
    <u-page>
        <div class="nmb-font-dark top-box">
          提交以下材料并审核通过，即可完成购买
        </div>
        <u-group class="myCellGroup">
            <u-cell title="签名">
                <span :class="getFontClass(checkInfo.signature.status)">{{ getSignatureStatus(checkInfo.signature.status) }}</span>
            </u-cell>
            <div v-if="checkInfo.signature.status === '2'"
                 class="nmb-font-t30 reason-box">
                未通过原因：{{ checkInfo.signature.errDesc }}
                <a href="javascript:;" @click="goSignature">重新签名</a>
            </div>
            <u-cell title="智能双录">
                <span :class="getFontClass(checkInfo.bothwayRecord.status)">{{ getBothwayRecordStatus(checkInfo.bothwayRecord.status) }}</span>
            </u-cell>
            <div v-if="checkInfo.bothwayRecord.status === '2'"
                 class="nmb-font-t30 reason-box">
                未通过原因：{{ checkInfo.bothwayRecord.errDesc }}
                <a href="javascript:;" @click="goBothwayRecord">重新双录</a>
            </div>
        </u-group>
        <section class="riskReminderBox">
            <u-reminder class="reminderComp" :showTips="showReminder" title="温馨提示"></u-reminder>
        </section>
        <div class="btn-box">
            <u-button :disabled="!btnActive" @clickHandler="goNext()">提交审核</u-button>
        </div>
    </u-page>
</template>

<script>
/**
 * prdCd: 产品编号
 * orderNo: 订单编号
 */
import { UPage, UButton, UGroup, UCell, UReminder } from "@engine";
import { errorAlert, pushWindow, screenToLandscape, closePage } from '@bridge';

export default {
  name: 'MaterialCheck',

  components: {
    UPage,
    UButton,
    UGroup,
    UCell,
    UReminder
  },

  created () {
  },

  data () {
    return {
      senceTag: 'NMB_SM_08',
      pageParams: {},
      prdCd: '',
      orderNo: '',
      pageType: '',
      /* orderStatus
       * 0 预下单
       * 3 正式下单
       */
      orderStatus: '0', // 0:
      /* status
       * 空串 未做
       * 0   已提交
       * 1   审核通过
       * 2   审核驳回
       */
      checkInfo: {
        signature: {
          status: '',
          errDesc: ''
        },
        bothwayRecord: {
          status: '',
          errDesc: ''
        }
      },
      showReminder: [
        '1. 审核工作时间为周一至周日9:00-15:00。',
        '2. 非工作时间内提交的认证材料，将在工作时间内审核，请您耐心等待。'
      ]
    };
  },

  mounted () {
    this.init();
  },

  // 双录页面返回触发
  resume (opt) {
    let pageType = opt.pageType ? opt.pageType : '';
    this.init(pageType);
  },

  computed: {
    btnActive () {
      return ['0', '1'].includes(this.checkInfo.signature.status) && ['0', '1'].includes(this.checkInfo.bothwayRecord.status);
    }
  },

  methods: {
    init (pageType) {
      this.prdCd = window.App.params.prdCd;
      this.orderNo = window.App.params.orderNo;
      this.pageType = pageType || window.App.params.pageType;
      // popOtherWindow();
      closePage(['/ghb_pdf/index/index.html']);
      let _this = this;
      this.$tools.rpc('NMBMPSX3411', {
        orderNo: _this.orderNo,
        logSence: _this.senceTag
      }).then(res => {
        console.log(res);
        if (res.header.errorCode === '0') {
          let order = res.body;
          _this.checkInfo.signature.status = order.dzStatus;
          _this.checkInfo.signature.errDesc = order.dzMemo;
          _this.checkInfo.bothwayRecord.status = order.slStatus;
          _this.checkInfo.bothwayRecord.errDesc = order.slMemo;
          _this.orderStatus = order.orderStatus;
        }else{
          errorAlert(res.header.errorMsg);
        }
      });
    },
    getFontClass (status) {
      let successClass = 'nmb-font-t10';
      let failClass = 'nmb-font-t30';
      let normal = 'nmb-font-gray';
      switch (status) {
        case '0': return normal;
        case '1': return successClass;
        case '2': return failClass;
      }
    },

    getSignatureStatus (status) {
      // let status = this.checkInfo.signature.status;
      let statusType = this.getStatusType(status);
      if (this.pageType === 'reSign' && statusType === '审核中') {
        return '已完成';
      }
      return statusType;
    },

    getBothwayRecordStatus (status) {
      let statusType = this.getStatusType(status);
      if (this.pageType === 'reBothwayRecord' && statusType === '审核中') {
        return '已完成';
      }
      return statusType;
    },

    getStatusType (status) {
      switch (status) {
        case '': return '未提交';
        case '0': return '审核中';
        case '1': return '审核通过';
        case '2': return '审核未通过';
      }
    },

    goSignature () {
      screenToLandscape();
      pushWindow(
        '/ghb_trustBuy/mainProcess/sign.html',
        {
          prdCd: this.prdCd,
          orderNo: this.orderNo,
          pageType: 'reSign'
        },
        {
          showTitleBar: false
        }
      );
    },
    goBothwayRecord () {
      pushWindow('/ghb_trustBuy/mainProcess/bothwayRecord.html', {
        prdCd: this.prdCd,
        orderNo: this.orderNo,
        pageType: 'reBothwayRecord'
      });
    },

    goNext () {
      if (!this.btnActive) {
        return false;
      }
      pushWindow('/ghb_trustBuy/mainProcess/materialCheckStatus.html', {
        prdCd: this.prdCd,
        orderNo: this.orderNo
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@core/public/less/mixin.less';
.top-box {
    padding: 10px 15px 7px;
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

.myCellGroup {
  /deep/ .app-cell-content::after {
    display: none;
  }
}

.reason-box {
    padding: 12px 15px;
    font-size: 12px;
    line-height: 16px;
}

.riskReminderBox {
    position: relative;
    width: 100%;

  .reminderComp {
      position: relative;
      width: initial;
  }

  /deep/ .app-reminder ::after {
      display: none;
  }
}
</style>

