<template>
  <u-page class="bothWayRecord">
    <div>订单号:{{ orderNo }}</div>
    <div>产品号:{{ prdCd }}</div>
    <u-button size="S"
              @clickHandler="goFormalSubmit">模拟去正式下单</u-button>
    <u-button size="S"
              @clickHandler="testSDK">测试sdk</u-button>
    <u-button size="S"
              @clickHandler="getinfo">获取用户信息</u-button>
    <u-button size="S"
              @clickHandler="updateSlStatus">更新双录状态</u-button>
    <br><br><br>
    <u-button size="S"
              @clickHandler="initTest">初始化</u-button>
    <u-button size="S"
              @clickHandler="apiMapTest">setMap</u-button>
    <u-button size="S"
              @clickHandler="createSDK">建立双录任务</u-button>
    <u-button size="S"
              @clickHandler="NMBMPSX3381">私募产品额度查询</u-button>
    <u-button size="S"
              @clickHandler="NMBMPSX3399">私募产品详情查询</u-button>
  </u-page>
</template>

<script>
/**
 * prdCd: 产品编号
 * orderNo: 订单号
 * pageType: 页面状态 'reBothwayRecord': 重新双录 || '': 正常流程
 */
import { UPage, UButton } from "@engine";
import {
  popOtherWindow,
  pushWindow,
  getUserInfo,
  errorAlert,
  hideLoading
} from "@bridge";

export default {
  name: 'bothWayRecord',

  components: {
    UPage,
    UButton
  },

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    this.pageType = window.App.params.pageType || '';
    this.os = ((window.App || {}).device || {}).os || 'ios';
    console.log(this.os);
    popOtherWindow();

    // 建立事件监听
    document.addEventListener("onRecordTaskEnter", (res) => {
      alert('onRecordTaskEnter', '');
      console.log('onRecordTaskEnter: ', res);
    }, false);
    document.addEventListener("onRecordTaskExit", (res) => {
      alert('onRecordTaskExit', '');
      console.log('onRecordTaskExit', res);
    }, false);
    document.addEventListener("onRecordTaskUpload", (res) => {
      alert('onRecordTaskUpload');
      console.log('onRecordTaskUpload', res);
    }, false);

    this.getinfo(this.renderData); // 获取用户相关信息
  },

  data: function () {
    return {
      os: 'ios',
      userId: '',
      prdCd: '',
      orderNo: '',
      pageType: ''
    };
  },

  mounted () {
  },

  methods: {
    NMBMPSX3381 () {
      this.$tools.rpc('NMBMPSX3381', {
        prdCd: 'GDHX02',
        orgId: '800001'
      }).then(res => {
        console.log(res);
      });
    },
    NMBMPSX3399 () {
      this.$tools.rpc('NMBMPSX3399', {
        prdCd: 'GDHX02'
      }).then(res => {
        console.log(res);
      });
    },

    updateSlStatus (slStatus) {
      // slStatus '': 未提交, '0': 已提交, '1': 审核通过, '2': 审核未通过
      let _this = this;
      this.$tools.rpc('NMBMPSX3408', {
        orderNo: this.orderNo,
        slStatus: slStatus
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (this.pageType === 'reBothwayRecord') {
            // 重新双录
            pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {
              prdCd: this.prdCd,
              orderNo: this.orderNo
            });
          } else {
            // 正常往下走去正式下单
            _this.goFormalSubmit();
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    getinfo (cb) {
      getUserInfo().then(res => {
        if (res.header.errorCode === '0') {
          cb && cb(res.body);
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    renderData (data) {
      console.log('renderData', data);
      this.userId = data.userId || '';
    },

    goFormalSubmit () {
      pushWindow('/ghb_trustBuy/mainProcess/fundPurchase.html', {
        prdCd: this.prdCd,
        orderNo: this.orderNo,
        pageType: 'formalSubmit'
      });
    },

    // 创建双录接口映射
    setRecordApiMap (cb) {
      window.AlipayJSBridge.call('ghb_setRecordApiMap', {
        CIMIVRS2001: 'com.nmb.NMBMPSX3385',
        CIMIVRS2002: 'com.nmb.NMBMPSX3386',
        CIMIVRS2003: 'com.nmb.NMBMPSX3387',
        CIMIVRS2004: 'com.nmb.NMBMPSX3388',
        CIMIVRS2005: 'com.nmb.NMBMPSX3396',
        CIMIVRS2006: 'com.nmb.NMBMPSX3395',
        CIMIVRS2007: 'com.nmb.NMBMPSX3397'
      }, res => {
        console.log('双录接口映射完毕');
        cb && cb(res);
      });
    },

    // 初始化双录SDK
    initSDK (cb) {
      this.$client.showLoading('加载中');
      let osEnv = this.os === 'ios' ? 0 : 1; // 根据环境特殊处理一下
      let params = {
        env: osEnv, // 1表示生产环境，0测试环境
        companyNo: "huaxing",
        appId: "hx001"
      };
      window.AlipayJSBridge.call("ghb_initRecordSdk", params, function () {
        console.log('初始化双录sdk完毕', params);
        hideLoading();
        cb && cb();
      });
    },

    // 创建双录任务
    createNewRecordTask (cb) {
      console.log('enter createNewRecordTask');
      window.AlipayJSBridge.call('ghb_createNewRecordTask', {
        appId: 'hx001001', // 固定,吴
        companyNo: 'huaxing', // 固定, 吴
        orgCode: '800001', // 机构号 信托产品的 800001
        loginAccount: 'userid123', // 用户唯一标识符 登录账号 APP
        businessNo: Date.parse(new Date()).toString(), // 订单号 ok
        drAmsChannelCode: '', // ??
        signKey: '', // ??
        empNo: 'userid123', // ?? empNo 跟 loginAccount 保持一致
        empName: 'test', // ?
        empIdNo: 'test', // ?
        empIdType: '01', // ? 健兴提供
        appIdNo: '350182111101011234', // 身份证号 APP
        appIdType: '01', // 投保人证件类型 01
        applicationName: 'Ray', // 投保人姓名 APP TBD
        productName: '测试123', // 产品名称 ok
        productCode: '123123', // 产品代码 ok
        productType: 'B', // 产品类型 枚举值 吴 'B'
        dramsChannelCode: '', // ? norequire
        productAmount: '3000000', // 产品金额 ok
        sdkTalkParamsMap: {}, // JSON字符串 吴
        productRiskGrade: '1' // 产品风险等级 Number
      }, res => {
        console.log('新建双录任务', res);
        cb && cb(res);
      });
    },

    testSDK () {
      let _this = this;
      // 建立双录任务
      _this.setRecordApiMap(function (res) {
        _this.initSDK(function (res) {
          _this.createNewRecordTask(function (res) {
            console.log('来了老弟');
          });
        });
      });
      // _this.initSDK(function (res) {
      //   console.log('初始化双录sdk完毕');
      //   _this.setRecordApiMap(function (res) {
      //     console.log('双录接口映射完毕');
      //     _this.createNewRecordTask(function (res) {
      //       console.log('新建双录任务', res);
      //     });
      //   });
      // });
    },

    apiMapTest () {
      window.AlipayJSBridge.call('ghb_setRecordApiMap', {
        CIMIVRS2001: 'com.nmb.NMBMPSX3385',
        CIMIVRS2002: 'com.nmb.NMBMPSX3386',
        CIMIVRS2003: 'com.nmb.NMBMPSX3387',
        CIMIVRS2004: 'com.nmb.NMBMPSX3388',
        CIMIVRS2005: 'com.nmb.NMBMPSX3396',
        CIMIVRS2006: 'com.nmb.NMBMPSX3395',
        CIMIVRS2007: 'com.nmb.NMBMPSX3397'
      }, res => {
        console.log(res);
      });
    },

    initTest () {
      window.AlipayJSBridge.call("ghb_initRecordSdk", {
        env: "0", // 1表示生产环境，0测试环境
        companyNo: "huaxing",
        appId: "hx001"
      }, res => {
        console.log(res);
      });
    },

    createSDK () {
      let _this = this;
      _this.createNewRecordTask(function (res) {
        console.log('新建双录任务', res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
