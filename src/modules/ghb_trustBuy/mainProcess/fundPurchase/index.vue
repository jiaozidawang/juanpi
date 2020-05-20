<template>
  <u-page>
    <section class="fundInfoBox nmb-bg-white">
      <div class="fundName nmb-font-dark">{{ productInfo.prdName }}</div>
      <div class="fundData nmb-font-t2">
        <span>业绩比较基准：</span><span class="nmb-font-t13">{{ productInfo.perforCmparBase }}</span>
        <span class="investTermKey">投资期限：</span><span>{{ productInfo.investTerm }}</span>
      </div>
    </section>
    <split :gutter="10" />

    <section class="customerCardInfoBox nmb-bg-white">
      <u-cell title="受益账号"
              :value="formatCard(this.userAccountNo)"
              :is-link="false"></u-cell>
      <div class="cardInfo nmb-font-t2">
        <span class="usableAmount">{{ accountInfo.avaliableTitle }}：{{ accountInfo.avaliableMoney }}</span>
        <span class="lhyAmount">{{ accountInfo.otherTitle }}：{{ accountInfo.otherMoney }}</span>
      </div>
    </section>

    <split :gutter="10" />

    <section class="purchaseMoneyBox nmb-bg-white nmb-font-t2">
      <u-group v-if="pageType === 'preSubmit' || pageType === ''">
        <e-amount-input v-model="buyAmount"
                        :value="buyAmount"
                        title="购买金额"
                        :placeholder="amountPlaceholder"
                        :need-chinese-character="true"
                        @on-sync="getSync($event)"></e-amount-input>
      </u-group>

      <!-- 只读模式 -->
      <div v-if="pageType === 'formalSubmit'" class="formalSubmitInputBox">
        <div class="titleBox nmb-font-dark">购买金额</div>
        <div class="amtBox nmb-font-dark">¥ {{ formatNumber(buyAmount) || '0' }}</div>
      </div>
    </section>
    <div v-if="!isInputPass && inputErrorMsg" class="errorTipBox nmb-font-t13">{{ inputErrorMsg }}</div>

    <!-- <section class="purchaseTip nmb-font-t2">
      <div class="title">
        购买金额已包含以下费用：
      </div>
      <div>认购费率</div>
    </section> -->

    <section v-if="pageType !== 'formalSubmit'" class="agreementTipBox">
      <e-agreement v-model="agreeSelect">我已认真阅读并同意<span @click="goWatchDoc(contractDocUrl, '产品合同')">《产品合同》</span></e-agreement>
    </section>

    <section class="confirmBtnBox">
      <u-button :disabled="!purchaseBtnActive" @clickHandler="purchaseConfirm">确定</u-button>
    </section>

    <e-pwd-popup-input v-model="pwdInputerShow"
                       title="请输入交易密码"
                       :sessionKey="sessionKey"
                       @on-submit="pwdOnSubmit($event)">
      <div class="underTitleBox">
        <!-- <div class="closeBtn" @click="closePwdInputer">X</div> -->
        <div class="titleText">购买金额</div>
        <div class="buyAmount">{{ $tools.currencyFormat(buyAmount) }}</div>
      </div>
      <div slot="bottom" class="underPwdBox">
        <div class="tipText">{{ pwdInputBottomTip }}</div>
      </div>
    </e-pwd-popup-input>
  </u-page>
</template>

<script>
/**
 * prdCd: 产品编号
 * pageType: 页面类型 'preSubmit': 预购买(观看完视频), 'formalSubmit': 正式下单（完成双录）
 * orderNo: 订单编号
 */
import { UPage, UButton, UCell, EAgreement, EAmountInput, UGroup, EPwdPopupInput } from "@engine";
import { getBankList, errorAlert, pushWindow, closePage } from "@bridge";
import Split from '../../components/Split.vue';
import util from '../../util/index';
import Base64 from "@utils/tools/base64";
import mixins from "../../components/mixin_getDoc.js";

export default {
  name: 'fundPurchase',

  components: {
    UPage,
    UButton,
    UCell,
    EAgreement,
    Split,
    EAmountInput,
    UGroup,
    EPwdPopupInput
  },

  mixins: [mixins], // 混入获取文档方法

  data: function () {
    return {
      senceTag: 'NMB_SM_14',
      prdCd: '',
      pageType: 'preSubmit', // 是预下单还是正式下单 'preSubmit' || 'formalSubmit'
      orderNo: '', // 订单编号
      buyAmount: '', // 购买金额
      agreeSelect: false,
      purchaseBtnRunning: false, // 确认按钮防抖
      token: '',
      sessionKey: '',
      // 密码键盘显示控制
      pwdInputerShow: false,
      // 密码键盘输入相关
      isInputPass: false,
      inputErrorMsg: '',
      // 用户帐户卡号
      userAccountNo: '', // 脱敏卡号
      userAccountNoComplete: '', // 完整卡号
      accNo_sequence: '',
      customerType: 'personal', // 用户类型 个人还是机构
      // 用户帐户信息
      accountInfo: {
        avaliableTitle: '可用余额',
        avaliableMoney: '¥0.00',
        avaliableMoneyRaw: '',
        otherTitle: '其他余额',
        otherMoney: '¥0.00',
        otherMoneyRaw: ''
      },
      // 产品信息
      productInfo: {
        prdName: '',
        perforCmparBase: '',
        investTerm: '',
        baseInvestMoney: 0,
        increaseIvnestMoney: 0
      },
      contractDocUrl: '',
      riskTipDocUrl: '',
      pwdInputBottomTip: ''
    };
  },

  computed: {
    amountPlaceholder: function () {
      let baseMoney = util.money2chineseUnit(this.productInfo.baseInvestMoney);
      let increaseMoney = util.money2chineseUnit(this.productInfo.increaseIvnestMoney);
      return `${Math.floor(baseMoney.num)}${baseMoney.unit}起购，${Math.floor(increaseMoney.num)}${increaseMoney.unit}递增`;
    },

    purchaseBtnActive: function () {
      if (this.pageType === 'formalSubmit') {
        this.isInputPass = true;
        return true;
      }
      if (this.pageType === 'preSubmit') {
        return this.isInputPass && this.agreeSelect;
      }
    }
  },

  created () {
    let _this = this;
    _this.prdCd = window.App.params.prdCd || '';
    _this.orderNo = window.App.params.orderNo || '';
    _this.pageType = window.App.params.pageType || 'preSubmit';
    // popOtherWindow();
    // this.prdCd = 'GDHX02'; // mock 私募购买页 - prdCd
    closePage([
      '/ghb_trustBuy/mainProcess/videoWatch.html',
      '/ghb_trustBuy/mainProcess/videoCheck.html',
      '/ghb_trustBuy/mainProcess/bothwayRecord.html'
    ]);
    // window.App.on('back', e => {
    //   closeTo({
    //     urlPattern: '/ghb_trustBuy/mainProcess/fundDetail.html'
    //   });
    // });
  },

  mounted () {
    let _this = this;
    // 获取 合同地址 和 认购风险申请书地址
    _this.getDocUrl(_this.prdCd, '01', function (url, name) {
      _this.contractDocUrl = url;
    });
    // 下次优化
    _this.getDocUrl(_this.prdCd, '02', function (url, name) {
      _this.riskTipDocUrl = url;
    });
    // 查询私募详情信息
    _this.$tools.rpc('NMBMPSX3399', {
      prdCd: _this.prdCd,
      logSence: _this.senceTag
    }).then(res => {
      if (res.header.errorCode === '0') {
        let data = res.body;
        _this.renderData(data);
        let _formalSubmit = function () {
          // 是否正式下单
          if (_this.pageType === 'formalSubmit') {
            _this.getProcessingOrder(
              _this.getToken({
                orderNo: _this.orderNo,
                accNo_sequence: _this.accNo_sequence
              }, _this.preFormalSubmit)
            );
          }
        };
        // 获取卡号及余额
        _this.getCardNumberAndRemainAmt(_formalSubmit);
      }
    });
  },

  methods: {
    renderData (data) {
      this.productInfo.prdName = data.prdName;
      this.productInfo.perforCmparBase = data.perforCmparBase;
      let _ivTerm = util.get8StringDateDiff(data.prdIntStartDt, data.prdEndDt);
      this.productInfo.investTerm = _ivTerm
        ? _ivTerm + '天'
        : '-- 天';
      if (this.customerType === 'personal') {
        this.productInfo.baseInvestMoney = (data.indvFstLowtInvtAmt) * 1;
        this.productInfo.increaseIvnestMoney = (data.indvSuppLowtInvtAmt) * 1;
      }
    },

    // 查询卡号及账户余额
    getCardNumberAndRemainAmt (cb) {
      let _this = this;
      // 查询账户以及余额信息
      getBankList('1').then(res => {
        let data = res.body.accountInfoList[0];
        _this.userAccountNo = data.accNo;
        _this.accNo_sequence = data.accNo_sequence;
        // 获取明文卡号
        // _this.$tools.rpc('NMBMPSX3117', {
        //   accNo_sequence: data.accNo_sequence,
        //   logSence: _this.senceTag
        // }).then(res2 => {
        //   if (res2.header.errorCode === '0') {
        //     _this.userAccountNoComplete = res2.body.accNo;
        //   } else {
        //     return errorAlert(res2.header.errorMsg);
        //   }
        // });
        // 查询余额信息
        _this.$tools.rpc('NMBMPSX3151', {
          srcSystemID: 'NMB',
          systemID: 'NMB',
          transCode: 'NMBMPSX3151',
          CUSTNO: 'NMB',
          accountProtectFlag: res.body.accountProtectFlag,
          accNo: data.accNo_mask,
          accNo_sequence: data.accNo_sequence || '',
          DEBTTP: 'S01',
          TERMCD: '000',
          BEGINO: 1,
          RCRDNM: 1,
          logSence: _this.senceTag
        }).then(res => {
          if (res.header.errorCode === '0') {
            console.log('余额查询', res.body);
            _this.accountInfo.avaliableMoney = _this.$tools.currencyFormat(res.body.SUBSACLIST[0].AVAIBL);
            _this.accountInfo.avaliableMoneyRaw = res.body.SUBSACLIST[0].AVAIBL;
            if (res.body.springBoardBalance > 0) {
              _this.accountInfo.otherTitle = '跳板';
              _this.accountInfo.otherMoney = _this.$tools.currencyFormat(res.body.springBoardBalance);
              _this.accountInfo.otherMoneyRaw = res.body.springBoardBalance;
            } else {
              _this.accountInfo.otherTitle = '灵活盈';
              _this.accountInfo.otherMoney = _this.$tools.currencyFormat(res.body.flexibilityBalance);
              _this.accountInfo.otherMoneyRaw = res.body.flexibilityBalance;
            }
            cb && cb();
          }
        });
      });
    },

    // 查询在途订单
    getProcessingOrder (cb) {
      let _this = this;
      _this.$tools.rpc('NMBMPSX3411', {
        orderNo: _this.orderNo,
        logSence: _this.senceTag
      }).then(res => {
        if (res.header.errorCode === '0') {
          console.log('查询订单详情', res);
          this.buyAmount = res.body.orderAmt;
          this.pwdInputBottomTip = `输入广东华兴银行(${res.body.txnAcctNum.slice(-4)})的交易密码`;
          cb && cb();
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 编码交易参数
    paramsBase64 () {
      let _this = this;
      let params = {
        prdCd: _this.prdCd,
        accNo_sequence: _this.accNo_sequence,
        orderAmt: _this.buyAmount
      };
      let secCheckString = JSON.stringify(params);
      const base64 = new Base64();
      return base64.encode(secCheckString);
    },

    // 确定按钮逻辑
    purchaseConfirm () {
      if (!this.purchaseBtnActive) {
        return false;
      }
      let _this = this;
      if (!_this.purchaseBtnRunning) {
        _this.purchaseBtnRunning = true;
        if (_this.pageType === 'preSubmit') {
          _this.getToken({
            prdCd: _this.prdCd,
            accNo_sequence: _this.accNo_sequence,
            orderAmt: _this.buyAmount,
            amt: _this.buyAmount + '',
            transType: 'RecordPreOrder',
            menuId: 'MB26'
          }, _this.NMBMPSX3401);
        } else {
          _this.getToken({
            orderNo: _this.orderNo,
            accNo_sequence: _this.accNo_sequence
          }, _this.preFormalSubmit);
        }
      }
    },

    // 获取安全token
    getToken (paramsStr, cb) {
      let _this = this;
      let secCheckString = JSON.stringify(paramsStr);
      const base64 = new Base64();
      let base64Params = base64.encode(secCheckString);
      _this.$tools.rpc("NMBMPSX7006", {
        transJson: base64Params,
        logSence: _this.senceTag
      }).then(res => {
        if (res.header.errorCode === '0') {
          _this.token = res.body.token;
          cb && cb();
          _this.purchaseBtnRunning = false;
        } else {
          _this.purchaseBtnRunning = false;
        }
      }).catch(err => {
        console.log(err);
        _this.purchaseBtnRunning = false;
      });
    },

    // 正式下单的前置动作 获取sessionKey
    // 拿 session && 弹出密码组件
    preFormalSubmit () {
      let _this = this;
      _this.$tools.rpc("NMBMPSX7012", {}).then(res => {
        if (res.header.errorCode === '0') {
          console.log('获取session7012', res.body);
          _this.sessionKey = res.body.sessionKey; // 拿到 sessionKey
          _this.purchaseBtnRunning = false;
          _this.pwdInputerShow = true;
        } else {
          _this.purchaseBtnRunning = false;
          errorAlert(res.header.errorMsg);
        }
      }).catch(err => {
        _this.purchaseBtnRunning = false;
        console.log(err);
      });
    },

    // 预下单 start
    NMBMPSX3401 () {
      let _this = this;
      let params = {
        prdCd: _this.prdCd,
        accNo_sequence: _this.accNo_sequence,
        orderAmt: _this.buyAmount,
        amt: _this.buyAmount + '',
        transType: 'RecordPreOrder',
        menuId: 'MB26'
      };
      _this.$tools.rpc("NMBMPSX3401", {
        token: _this.token,
        ...params,
        logSence: _this.senceTag
      }).then(res => {
        if (res.header.errorCode == "0") {
          _this.purchaseBtnRunning = false;
          let _orderNo = res.body.orderNo;
          pushWindow('/ghb_pdf/index/index.html', {
            pdfUrl: _this.riskTipDocUrl,
            title: '认购风险申请书',
            showButton: true,
            needCountdown: true,
            delay: 20,
            pushParams: {
              url: '/ghb_trustBuy/mainProcess/docCheck.html',
              options: {
                prdCd: _this.prdCd,
                orderNo: _orderNo
              }
            },
            buttonText: '我已阅读并知晓风险内容，下一步'
          }, {
            defaultTitle: '认购风险申请书'
          });
        } else {
          _this.purchaseBtnRunning = false;
          errorAlert(res.header.errorMsg);
        }
      }).catch(err => {
        console.log(err);
        _this.purchaseBtnRunning = false;
      });
    },

    // 正式下单 start
    NMBMPSX3403 (orderNo, TRANPW) {
      let _this = this;
      let params = {
        orderNo,
        accNo_sequence: _this.accNo_sequence,
        amt: _this.buyAmount + '',
        transType: 'ProductPurchase',
        menuId: 'MB26'
      };
      let _NMBMPSX3403 = function () {
        _this.$tools.rpc("NMBMPSX3403", {
          token: _this.token,
          sessionKey: _this.sessionKey,
          TRANPW: TRANPW,
          algorithmType: 'SM',
          processType: '3',
          ...params,
          logSence: _this.senceTag
        }).then(res => {
          if (res.header.errorCode == "0") {
            // alert('正式下单成功', '').then(res => {
            //   if (res.ok === true) {
            //     pushWindow('/ghb_trustBuy/mainProcess/purchaseStatus.html', {
            //       prdCd: _this.prdCd,
            //       orderNo
            //     });
            //   }
            // });
            pushWindow('/ghb_trustBuy/mainProcess/purchaseStatus.html', {
              prdCd: _this.prdCd,
              orderNo
            });
          } else {
            return errorAlert(res.header.errorMsg);
          }
        });
      };
      // 重新拿token再调3403
      _this.getToken(params, _NMBMPSX3403);
    },

    pwdOnSubmit (e) {
      let _this = this;
      this.pwdInputerShow = false;
      if (e.type === "done") {
        // 密码输入完毕, 去提交
        _this.NMBMPSX3403(this.orderNo, e.pwd);
      }
    },

    // 银行卡脱敏
    formatCard (src) {
      return src.replace(/^(\d{4}).*(\d{4})$/g, '$1 **** **** $2');
    },

    formatNumber (src) {
      return util.formatNumber(src, 2);
    },

    // 金额输入 sync 提示
    getSync (e) {
      if (e) {
        let baseMoney = util.money2chineseUnit(this.productInfo.baseInvestMoney);
        let increaseMoney = util.money2chineseUnit(this.productInfo.increaseIvnestMoney);
        // 判断起购金额
        if (Number(e) < this.productInfo.baseInvestMoney) {
          this.isInputPass = false;
          this.inputErrorMsg = `购买金额应大于等于起购金额${Math.floor(baseMoney.num)}${baseMoney.unit}。`;
          return;
        }
        // 判断递增金额
        if (this.productInfo.increaseIvnestMoney !== 0) {
          let increaseRate = (Number(e) - this.productInfo.baseInvestMoney) / this.productInfo.increaseIvnestMoney;
          if (increaseRate < 0 || !Number.isInteger(increaseRate)) {
            this.isInputPass = false;
            this.inputErrorMsg = `请按指定金额${Math.floor(increaseMoney.num)}${increaseMoney.unit}递增。`;
            return;
          }
        }
        // 判断是否超过余额
        let remainMoney = this.accountInfo.avaliableMoneyRaw * 1 + this.accountInfo.otherMoneyRaw * 1;
        if (Number(e) > remainMoney) {
          this.isInputPass = false;
          this.inputErrorMsg = `对不起，转出账户余额不足。`;
          return;
        }
        this.isInputPass = true;
        this.inputErrorMsg = '';
      } else {
        this.inputErrorMsg = '';
      }
    },

    // 密码键盘相关
    closePwdInputer () {
      this.pwdInputerShow = false;
    },

    // 去查看文档
    goWatchDoc (url, title) {
      pushWindow('/ghb_pdf/index/index.html', {
        pdfUrl: url,
        title: title,
        showButton: false
      }, {
        defaultTitle: title
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fundInfoBox {
  padding: 14px 16px;

  .fundName {
    line-height: 18px;
    font-size: 16px;
    letter-spacing: 0;
    margin-bottom: 12px;
  }

  .fundData {
    line-height: 17px;
    font-size: 12px;

    .investTermKey {
      margin-left: 20px;
    }
  }
}

.underTitleBox {
  position: relative;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  height: 33px;
  line-height: 33px;

  .closeBtn {
    position: absolute;
    top: -45px;
    right: 15px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .titleText {
    width: 60px;
    font-size: 15;
  }

  .buyAmount {
    flex: 1;
    text-align: right;
    font-size: 24px;
  }
}

.underPwdBox {
  display: flex;
  width: 100%;
  font-size: 12px;

  .tipText {
    flex: 1;
    color: #888888;
  }

  .forgetBtn {
    width: 60px;
    text-align: right;
    color: #459FFC;
  }
}


.customerCardInfoBox {
  .cardInfo {
    margin: 0 15px;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    text-align: right;
    // padding-right: 12px;

    .usableAmount {
      margin-right: 15px;
    }
  }
}

.purchaseMoneyBox {
  font-size: 12px;
  padding-bottom: 10px;

  // /deep/ .u-group-header {
  //   display: none;
  // }

  .formalSubmitInputBox {
    padding-top: 10px;
    padding-bottom: 15px;
    font-size: 20px;

    .titleBox {
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      font-size: 16px;
    }

    .amtBox {
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      font-size: 20px;
      font-size: 30px;
    }
  }
}

.errorTipBox {
  padding: 10px 15px 0;
  font-size: 12px;
}

.agreementTipBox {
  padding-top: 20px;
}

.purchaseTip {
  margin: 11px 15px 0 15px;
  font-size: 12px;
}

.confirmBtnBox {
  margin: 30px 15px;
}

</style>

