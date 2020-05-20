<template>
  <u-page class="nmb-bg-white">
    <u-result :status="statusType"
              :actionResult="statusAction"
              :showText="statusText"></u-result>
    <div class="top-box">
      提交以下材料并审核通过，即可完成购买
    </div>
    <u-group>
      <u-cell title="签名">
        <span :class="getFontClass(checkInfo.signature.status)">{{ getStatusType(checkInfo.signature.status) }}</span>
      </u-cell>
      <u-cell title="智能双录">
        <span :class="getFontClass(checkInfo.bothwayRecord.status)">{{ getStatusType(checkInfo.bothwayRecord.status) }}</span>
      </u-cell>
    </u-group>
    <section class="riskReminderBox">
      <u-reminder class="reminderComp" :showTips="showReminder" title="温馨提示"></u-reminder>
    </section>
  </u-page>
</template>

<script>
/**
 * prdCd 产品编号
 * orderNo 订单号码
 */
import { UPage, UResult, UGroup, UCell, UReminder } from "@engine";
import { errorAlert, popOtherWindow } from '@bridge';

export default {
  name: 'MaterialCheckStatus',

  components: {
    UPage,
    UResult,
    UGroup,
    UCell,
    UReminder
  },

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    popOtherWindow();
  },

  data: function () {
    return {
      statusType: 'success',
      statusAction: '提交材料审核中',
      statusText: '预计30分钟内审核完成，请您耐心等待',
      showReminder: [
        '1. 审核工作时间为周一至周日9:00-15:00。',
        '2. 非工作时间内提交的认证材料，将在工作时间内审核，请您耐心等待。'
      ],
      checkInfo: {
        signature: {
          status: ''
        },
        bothwayRecord: {
          status: ''
        }
      }
    };
  },

  mounted() {
    this.getOrderData();
  },

  methods: {
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

    getStatusType (status) {
      switch (status) {
        case '': return '未提交';
        case '0': return '审核中';
        case '1': return '审核通过';
        case '2': return '审核未通过';
      }
    },

    getOrderData () {
      let _this = this;
      this.$tools.rpc('NMBMPSX3411', {
        orderNo: _this.orderNo
      }).then(res => {
        if (res.header.errorCode === '0') {
          let order = res.body;
          _this.checkInfo.signature.status = order.dzStatus;
          _this.checkInfo.bothwayRecord.status = order.slStatus;
        }else{
          errorAlert(res.header.errorMsg);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.top-box {
    padding: 10px 15px 7px;
    font-size: 12px;
    line-height: 16px;
}

.riskReminderBox {
    width: 100%;

    .reminderComp {
      width: initial;
    }
}
</style>
