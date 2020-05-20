<template>
  <u-page class="purchaseStatusPage">
    <div class="purchaseStatusWrap">
      <section class="statusItem topStatusInfo nmb-font-dark">
        <div class="statusIcon" :class="purchaseStatus"></div>
        <div class="purchaseStatusText">购买申请已受理</div>
        <div class="purchaseMoney">
          <span class="moneyContent">{{ purchaseAmt }}</span>
        </div>
      </section>

      <section class="statusItem fundInfo">
        <div v-for="(e, i) in purchaseFundInfo" :key="i" class="infoItem">
          <div class="infoKey nmb-font-t2">{{ e.title }}</div>
          <div class="infoVal nmb-font-dark">{{ e.val }}</div>
        </div>
      </section>

      <!-- <section class="myflow">
        <div class="flowBox">
          <div class="timeFlow">
            <div class="dot"></div>
            <div class="line"></div>
          </div>
          <div class="desc">申请提交成功<br />申请提交成功</div>
        </div>
      </section> -->

      <section class="statusItem uflowComp">
        <u-flow orientation="vertical" mode="l">
          <u-flow-state is-done state="1">
            <div slot="title">
              <div class="textDesc nmb-font-dark">申请提交成功</div>
              <div class="timeDesc nmb-font-t2">{{ orderSubmitTime }}</div>
            </div>
          </u-flow-state>
          <u-flow-line line-span="45px" tip="123"></u-flow-line>
          <u-flow-state state="1">
            <div slot="title">
              <div class="textDesc nmb-font-dark">预计确认份额</div>
              <div class="timeDesc nmb-font-t2">{{ orderConfirmTime }}</div>
            </div>
          </u-flow-state>
        </u-flow>
      </section>

      <section class="btnBox">
        <div class="btnCell"><u-button type="hollow" @clickHandler="completeBtn">完成</u-button></div>
        <div class="btnCell"><u-button @clickHandler="goMyPrivate">查看我的私募</u-button></div>
      </section>
    </div>
  </u-page>
</template>

<script>
/**
 * prdCd: 产品编号
 * orderNo: 订单号
 */
import { UPage, UButton, UFlow, UFlowLine, UFlowState } from '@engine';
import { popOtherWindow, errorAlert, closeTo, pushWindow } from '@bridge';
import util from '../../util/index';

export default {
  name: 'purchaseStatus',

  components: {
    UPage,
    UButton,
    UFlow,
    UFlowLine,
    UFlowState
  },

  data: function () {
    return {
      senceTag: 'NMB_SM_08',
      prdCd: '',
      orderNo: '',
      purchaseStatus: '', // 订单状态
      purchaseAmt: '', // 购买金额
      orderSubmitTime: '', // 申请提交成功时间
      orderConfirmTime: '', // 预计确认份额时间
      purchaseFundInfo: [
        {
          title: '产品名称',
          val: ''
        },
        {
          title: '产品代码',
          val: ''
        },
        {
          title: '认购账号',
          val: ''
        }
      ]
    };
  },

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    // this.prdCd = 'GDHX02'; // mock
    // this.orderNo = '513144159726796800'; // mock
    popOtherWindow();
  },

  mounted () {
    // 查询在途订单
    this.getProcessingOrder();
  },

  methods: {
    // 获取订单详情
    getProcessingOrder () {
      let _this = this;
      _this.$tools.rpc('NMBMPSX3411', {
        orderNo: _this.orderNo,
        logSence: _this.senceTag
      }).then(res => {
        if (res.header.errorCode === '0') {
          console.log(res);
          _this.renderData(res.body);
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    renderData (data) {
      this.purchaseStatus = 'success';
      this.purchaseFundInfo[0].val = data.prdName; // 产品名称
      this.purchaseFundInfo[1].val = data.prdCd; // 产品编号
      this.purchaseFundInfo[2].val = util.desensitizeBankCard(data.txnAcctNum); // 卡号脱敏
      this.purchaseAmt = util.formatNumber(data.orderAmt * 1, 2); // 申购金额
      this.orderSubmitTime = util.date82kebabCase(data.txnDt) || ''; // 购买时间
      this.orderConfirmTime = util.date82kebabCase('') || ''; // TBD 结果 - 确认份额时间
    },

    completeBtn () {
      closeTo({
        index: -1
      });
    },

    goMyPrivate () {
      pushWindow('/ghb_trust_fund/trust_fund/index.html', {
        defaultIndex: '1'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.purchaseStatusPage {
  background-color: #ffffff;
}

.uflowComp {
  /deep/ .engine-flow {
    padding: 10px 5px;
    margin-bottom: 15px;
  }

  /deep/ .engine-flow__bd {
    align-items: initial;
    justify-content: initial;
    -webkit-box-align: initial;
  }

  /deep/ .engine-flow__line {
    position: relative;
    left: 5px;
  }

  /deep/ .app-flow__info-left {
    display: none !important;
  }

  .textDesc {
    position: relative;
    left: -7px;
    top: 10px;
    height: 21px;
    line-height: 21px;
    font-size: 15px;
  }

  .timeDesc {
    position: relative;
    left: -7px;
    top: 10px;
    height: 21px;
    line-height: 21px;
    font-size: 11px;
  }
}

.purchaseStatusWrap {
  padding: 0 15px;

  .statusItem {
    padding: 15px 0;
  }

  .statusItem + .statusItem {
    border-top: 1px solid #EDEDED;
  }

  .topStatusInfo {
    overflow: auto;

    .statusIcon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 auto;
    }

    .purchaseStatusText {
      line-height: 21px;
      font-size: 15px;
      text-align: center;
      margin-top: 15px;
    }

    .purchaseMoney {
      height: 42px;
      line-height: 42px;
      font-size: 30px;
      margin: 0 auto;
      text-align: center;

      .moneyContent {
        &::before {
          content: '¥';
          font-size: 16px;
          line-height: 20px;
          margin-right: 6.5px;
        }
      }
    }
  }

  .fundInfo {
    .infoItem + .infoItem {
      margin-top: 10px;
    }

    .infoItem {
      display: flex;
      font-size: 14px;
      height: 20px;
      line-height: 20px;

      .infoKey {
        flex: 1;
      }

      .infoVal {
        flex: 1;
        text-align: right;
      }
    }
  }

  .btnBox {
    display: flex;

    .btnCell {
      flex: 1;
    }

    .btnCell + .btnCell {
      margin-left: 15px;
    }
  }
}
</style>
<style lang="less" scoped>
@import '../../style/mixin.less';

.statusIcon.success {
  .setBackgroundModuleImage('success.png');
}
</style>