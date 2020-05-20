<template>
    <u-page class="nmb-bg-white">
        <u-result status="success" actionResult="撤单成功" showText=" " />
        <ul class="form-inline">
            <li>
                <label>产品名称</label>
                <span>{{ detail.prdName }}</span>
            </li>
            <li>
                <label>投资金额</label>
                <span>{{ currencyFormat(detail.orderAmt) }}</span>
            </li>
            <li>
                <label>产品状态</label>
                <span>{{ detail.prdStatusName }}</span>
            </li>
            <li>
                <label>产品成立日</label>
                <span>{{ unitDate(detail.prdEstabDt) || '' }}</span>
            </li>
        </ul>
        <div class="btn-box">
            <u-button type="hollow" @clickHandler="handleSubmit">完成</u-button>
        </div>
    </u-page>
</template>
<script>
  import { UPage, UButton, UResult } from "@engine";
  import {
    stopPopGesture,
    closeTo
  } from "@core/bridge";
  import tools from "@utils/tools";
  import util from '../../util';

  export default {
    name: 'cancle-result-page',
    components: {
      UPage,
      UButton,
      UResult
    },

    data () {
      return {
        orderNo: '', // 订单编号
        agnSysSeqNum: '', // 代销系统流水号
        detail: {
          prdName: '',
          orderAmt: '', // 投资金额
          prdStatusName: '', // 产品状态
          prdEstabDt: '' // 产品成立日
        }
      };
    },
    computed: {
      currencyFormat () {
        return tools.currencyFormat;
      },
      unitDate () {
        return util.date82kebabCase;
      }
    },

    mounted () {
      // this.orderNo = '502899304127856640'; // test
      // 去除左上角箭头
      window.AlipayJSBridge.call('showLeftMenu', {show: false});
      stopPopGesture("0");
      // 禁用安卓物理返回键
      document.addEventListener('back', function(e) {
        e.preventDefault();
      }, false);
      this.orderNo = window.App.params.orderNo || '';
      this.agnSysSeqNum = window.App.params.agnSysSeqNum || '';
      console.log('params.orderNo: ', this.orderNo);
      this.getOrderInfo();
    },
    methods: {
      // 查询订单详情
      getOrderInfo () {
        this.$tools.rpc('NMBMPSX3411', {orderNo: this.orderNo, agnSysSeqNum: this.agnSysSeqNum}).then(res => {
          const resData = res.body || {};
          if (resData.errorCode === '0') {
            Object.keys(this.detail).forEach(key => {
              this.detail[key] = resData[key] || '';
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      handleSubmit () {
        // 跳转到 我的私募-持仓
        // pushWindow('/ghb_trust_fund/trust_fund/index.html', {defaultIndex: '1'});
        closeTo({
          index: -2,
          data: {
            defaultIndex: '1'
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .main-box {
    margin: 0 15px;
    padding: 40px 0 30px;
    border-bottom: 1px solid #EDEDED;
    text-align: center;

    .success_img{
      margin: 0 auto 15px;
      .setBgIcon('~@assets/base/success@2x.png', 50px);
    }

    > p {
      line-height: 21px;
      font-size: 15px;
    }
  }

  .form-inline {
    padding: 20px 15px;

    > li {
      font-size: 14px;
      line-height: 30px;

      > label {
        color: #888888;
      }

      > span {
        float: right;
        text-align: right;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>

