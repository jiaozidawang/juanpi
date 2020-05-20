<template>
  <u-page class="bothWayRecord"></u-page>
</template>

<script>
/**
 * prdCd: 产品编号
 * orderNo: 订单号
 * pageType: 页面状态 'reBothwayRecord': 重新双录 || '': 正常流程
 */
import { UPage } from "@engine";
import {
  // alert,
  // popOtherWindow,
  pushWindow,
  closeTo,
  closePage,
  errorAlert,
  showLoading,
  hideLoading,
  getUserInfo
} from "@bridge";
import util from '../../util/index';

export default {
  name: 'bothWayRecord',

  components: {
    UPage
  },

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    // this.prdCd = 'GDSL01'; // mock 双录 - 产品编号
    // this.orderNo = '515331323919138816'; // mock 双录 - 订单编号
    this.pageType = window.App.params.pageType || '';
    this.os = ((window.App || {}).device || {}).os || 'ios';
    // popOtherWindow();
    closePage([
      '/ghb_trustBuy/mainProcess/docCheck.html',
      '/ghb_trustBuy/mainProcess/sign.html',
      '/ghb_pdf/index/index.html',
      '/ghb_trustBuy/mainProcess/fundPurchase.html'
    ]);
    this.getinfo();

    /**
     * operation
     *   0 双录场景退出; 1 上传场景退出
     * errorCode
     *   有该字段 -> 取消/中断场景
     * errorMsg
     * businessNo 业务编号
     * AI质检结果:
     *   aiResult    AI质检总结过
     *   vedioResult 视频质检结过
     *   audioResult 语音质检结过
     */

    // 建立事件监听
    document.addEventListener("onRecordTaskEnter", (res) => {
      console.error('onRecordTaskEnter: ', res);
    }, false);
    // document.addEventListener("onRecordTaskUpload", (res) => {
    //   console.log('onRecordTaskUpload', res);
    // }, false);
    document.addEventListener("onRecordTaskExit", this.onRecordTaskExit, false);
  },

  beforeDestroy () {
    document.removeEventListener("onRecordTaskExit", this.onRecordTaskExit, false);
    document.removeEventListener("onRecordTaskEnter", (res) => {
      console.error('onRecordTaskEnter: ', res);
    }, false);
  },

  data: function () {
    return {
      os: 'ios',
      userSex: '先生', // 先生 / 女士
      // userId: '',
      orderNo: '',
      pageType: '',
      // 产品信息
      prdName: '', // 产品名称
      prdCd: '', // 产品id
      ipoStartDt: '', // 募集开始日期
      ipoEndDt: '', // 募集结束日期
      perforCmparBase: '', // 业绩比较基准
      riskRankCd: '', // 风险等级编号
      riskRankName: '', // 风险等级名称
      customerRiskName: '', //客户风险等级
      prdTermDt: '', // 产品期限
      orderAmt: '', // 购买金额
      prdInit: '', // 发行方
      prdMgr: '', // 产品管理人
      prdEstabDt: '', // 产品成立日
      incomeRule: '', // 收益规则
      invtRange: '' //投资范围
    };
  },

  mounted () {
    this.init();
  },

  methods: {
    async init () {
      showLoading();
      try {
        await this.NMBMPSX3354(); //查询客户风险等级
        await this.getPrdInfo(); // 查询产品信息
        await this.getProcessingOrder(); // 查询订单信息
        await this.runSDK(); // 启动双录
        hideLoading();
      } catch (error) {
        hideLoading();
        console.log(error);
      }
    },

    onRecordTaskExit (res) {
      let _this = this;
      console.log('onRecordTaskExit', res);
      let data = this.os === 'ios' ? res.data : res;
      console.log(data);
      if (data.errorCode) {
        // 双录中断
        closeTo({
          index: -1
        });
        // alert(data.errMsg, '').then(res2 => {
        //   if (res2.ok) {
        //     if (_this.pageType === 'reBothwayRecord') {
        //       closePage(['/ghb_trustBuy/mainProcess/materialCheck.html']);
        //       _this.$nextTick(() => {
        //         pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {
        //           prdCd: _this.prdCd,
        //           orderNo: _this.orderNo
        //         });
        //       });
        //     } else {
        //       closePage(['/ghb_trustBuy/mainProcess/videoCheck.html']);
        //       _this.$nextTick(() => {
        //         pushWindow('/ghb_trustBuy/mainProcess/videoCheck.html', {
        //           prdCd: _this.prdCd,
        //           orderNo: _this.orderNo
        //         });
        //       });
        //     }
        //   }
        // });
      } else if (data.operation === 1) {
        // 双录上传结束
        _this.updateSlStatus('0');
      }
    },

    /**
     * ''  未提交
     * '0' 已提交
     * '1' 审核通过
     * '2' 审核未通过
     */
    updateSlStatus (slStatus) {
      let _this = this;
      this.$tools.rpc('NMBMPSX3408', {
        orderNo: this.orderNo,
        slStatus: slStatus
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (this.pageType === 'reBothwayRecord') {
            // 当前场景为重新双录
            // closePage(['/ghb_trustBuy/mainProcess/materialCheck.html']);
            // _this.$nextTick(() => {
            //   pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {
            //     prdCd: this.prdCd,
            //     orderNo: this.orderNo,
            //     pageType: 'reBothwayRecord'
            //   });
            // });
            closeTo({
              index: -1,
              data: {
                pageType: 'reBothwayRecord'
              }
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

    // 查询产品信息
    getPrdInfo () {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this.$tools.rpc('NMBMPSX3399', {
          prdCd: this.prdCd
        }).then(res => {
          if (res.header.errorCode === '0') {
            // 渲染产品信息
            console.log('查询产品详情');
            let data = res.body || {};
            _this.riskRankCd = data.riskRankCd;
            _this.riskRankName = data.riskRankName;
            _this.prdName = data.prdName;
            _this.prdInit = data.prdInit;

            _this.incomeRule = data.incomeRule;
            _this.invtRange = data.invtRange;
            _this.ipoStartDt = util.date82kebabCase(data.ipoStartDt);
            _this.ipoEndDt = util.date82kebabCase(data.ipoEndDt);
            _this.prdTermDt = util.get8StringDateDiff(data.prdIntStartDt, data.prdEndDt) || '';
            _this.perforCmparBase = data.perforCmparBase || '';
            _this.prdMgr = data.prdMgr;
            _this.prdEstabDt = util.date82kebabCase(data.prdEstabDt) || '';
            resolve();
          } else {
            errorAlert(res.header.errorMsg);
            reject(new Error(res.header.errorMsg));
          }
        });
      });
    },

    // 获得用户信息
    getinfo () {
      let _this = this;
      let sexMap = {
        '2': '先生',
        '3': '女士'
      };
      getUserInfo().then(res => {
        if (res.header.errorCode === '0') {
          if (sexMap[res.body.SEX]) {
            _this.userSex = sexMap[res.body.SEX];
          } else {
            _this.userSex = '性别';
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 查询在途订单
    getProcessingOrder () {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this.$tools.rpc('NMBMPSX3411', {
          orderNo: _this.orderNo
        }).then(res => {
          console.log('查询订单详情', res);
          if (res.header.errorCode === '0') {
            _this.orderAmt = res.body.orderAmt;
            resolve();
          } else {
            errorAlert(res.header.errorMsg);
            reject(new Error(res.header.errorMsg));
          }
        });
      });
    },

    // 查询客户风险等级
    NMBMPSX3354 () {
      let _this = this;
      let params = {
        accType: '1',
        offset: '1',
        queryNum: '10'
      };
      return new Promise((resolve, reject) => {
        _this.$tools.rpc('NMBMPSX3354', params, { biz: true }).then(res => {
          if (res.header.errorCode === '0') {
            _this.customerRiskName = res.body.respResuListInfo7[0].riskName;
            resolve();
          } else {
            errorAlert(res.header.errorMsg);
            reject(new Error(res.header.errorMsg));
          }
        });
      });
    },

    // 创建双录接口映射
    setRecordApiMap () {
      console.log('创建双录接口映射');
      let params = {
        CIMIVRS2001: 'com.nmb.NMBMPSX3385',
        CIMIVRS2002: 'com.nmb.NMBMPSX3386',
        CIMIVRS2003: 'com.nmb.NMBMPSX3387',
        CIMIVRS2004: 'com.nmb.NMBMPSX3388',
        CIMIVRS2005: 'com.nmb.NMBMPSX3396',
        CIMIVRS2006: 'com.nmb.NMBMPSX3395',
        CIMIVRS2007: 'com.nmb.NMBMPSX3397'
      };
      return new Promise((resolve, reject) => {
        window.AlipayJSBridge.call('ghb_setRecordApiMap', params, () => {
          resolve();
        });
      });
    },

    // 初始化双录SDK
    initSDK () {
      console.log('初始化双录SDK');
      // let osEnv = this.os === 'ios' ? 0 : 1; // 根据环境特殊处理一下
      let workspace = process.env.MGS_WORK_SPACE;
      let osEnv = '';
      if (workspace === 'PRD' || workspace === 'prod') { // 生产环境
        osEnv = 1;
      } else {
        osEnv = 0;
      }
      let params = {
        env: osEnv, // 1表示生产环境，0测试环境
        companyNo: "huaxing",
        appId: "hx001"
      };
      return new Promise((resolve, reject) => {
        window.AlipayJSBridge.call("ghb_initRecordSdk", params, () => {
          resolve();
        });
      });
    },

    // 创建双录任务
    createNewRecordTask () {
      let _this = this;
      let params = {
        appId: 'hx001001', // 固定,吴
        companyNo: 'huaxing', // 固定, 吴
        orgCode: '800001', // 机构号 信托产品的 800001 银行
        loginAccount: '*', // 用户唯一标识符 登录账号 APP
        businessNo: _this.orderNo,
        // businessNo: Date.parse(new Date()).toString(), // mock 双录 - 订单号
        drAmsChannelCode: '', // ??
        signKey: '', // ??
        empNo: '*', // ?? empNo 跟 loginAccount 保持一致
        empName: '*', // ?
        empIdNo: '*', // ?
        empIdType: '01', // ? 健兴提供
        appIdNo: '*', // 身份证号 APP
        appIdType: '01', // 投保人证件类型 01
        applicationName: '*', // 投保人姓名 APP TBD
        productName: _this.prdName, // 产品名称 ok
        productCode: _this.prdCd, // 产品代码 ok
        productType: 'B', // 产品类型 枚举值 吴 'B'
        productAmount: _this.orderAmt, // 产品金额 ok
        isNew: 'N', // 目前写死
        sdkTalkParamsMap: {
          customerName: '*',  // 客户姓名
          customerIdNo: '*',  // 客户身份证号
          sex: _this.userSex, // 先生/女士
          // productNo: _this.prdCd,
          productRiskLevel: _this.riskRankName, // 产品风险等级
          managerName: '', // 理财经理姓名
          subBranchName: '', // 理财经理所属分支行名称
          customerType: _this.customerRiskName, // 客户类型 取客户风险等级
          // productCompanyName: _this.prdInit,
          investmentExpireTime: _this.prdTermDt, // 投资期限
          // purchasePrice: _this.orderAmt,
          raiseBeginTime: _this.ipoStartDt, // 募集开始时间
          raiseEndTime: _this.ipoEndDt, // 募集结束时间
          productEstablishmentDate: _this.prdEstabDt, // 产品成立日
          productManagerName: _this.prdMgr, // 产品管理人
          productAmount: _this.orderAmt, // 产品金额 ok
          performanceBaseline: _this.perforCmparBase, // 业绩比较基准
          incomeRule: _this.incomeRule, // 收益规则
          invtRange: _this.invtRange, // 交易范围
          productCode: _this.prdCd,  // 产品编码
          productName: _this.prdName // 产品名称

        }, // JSON字符串 吴
        productRiskGrade: _this.riskRankCd // 产品风险等级 Number
      };
      return new Promise((resolve, reject) => {
        window.AlipayJSBridge.call('ghb_createNewRecordTask', params, res => {
          // console.log('新建双录任务params', params);
          // console.log('新建双录任务', res);
          if (res.error) {
            errorAlert('系统繁忙，请稍后重试').then(res => {
              if (res.ok) {
                closeTo({
                  index: -1
                });
              }
            });
            reject(new Error(res.errorMessage));
          } else {
            resolve();
          }
        });
      });
    },

    async runSDK () {
      let _this = this;
      // 建立双录任务
      try {
        await _this.setRecordApiMap();
        await _this.initSDK();
        await _this.createNewRecordTask();
      } catch (error) {
        console.log(error);
      }
    },

    goFormalSubmit () {
      closePage(['/ghb_trustBuy/mainProcess/fundPurchase.html']);
      this.$nextTick(() => {
        pushWindow('/ghb_trustBuy/mainProcess/fundPurchase.html', {
          prdCd: this.prdCd,
          orderNo: this.orderNo,
          pageType: 'formalSubmit'
        });
      });
    }
  }
};
</script>
