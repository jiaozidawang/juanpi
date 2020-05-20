<template>
    <u-page>
        <div class="nmb-bg-white main-box">
          <p class="nmb-font-t2">{{ detail.prdName }}</p>
          <div>￥<span>{{ currencyFormat(detail.orderAmt, '') }}</span></div>
          <p class="nmb-font-t2">购买金额</p>
        </div>

        <ul class="nmb-bg-white form-inline">
            <li v-show="showStatusList.includes(detail.orderStatus)">
                <label>状态</label>
                <span v-show="detail.orderStatus === '3'">审核中</span>
                <span v-show="detail.orderStatus === '4'" class="nmb-font-t10">审核通过</span>
                <span v-show="detail.orderStatus === '5'">
                  <span class="nmb-font-t30">审核未通过，点击</span><a href="javascript:;" @click="$tools.pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {orderNo: orderNo, prdCd: detail.prdCd})">重新提交</a>
                </span>
                <span v-show="detail.orderStatus === '6'">客户撤单</span>
            </li>
            <li>
                <label>业绩比较基准</label>
                <span>{{ formatPerforCmparBase(detail.perforCmparBase) }}{{ (!isChinese(detail.perforCmparBase.replace('或', '').replace('和', ''))) ? '%' : '' }}</span>
            </li>
            <li>
                <label>产品简称</label>
                <span>{{ detail.prdAbbrName || detail.prdName }}</span>
            </li>
            <li>
                <label>产品状态</label>
                <span>{{ detail.prdStatusName }}</span>
            </li>
            <li>
                <label>产品购买日</label>
                <span>{{ unitDate(detail.txnDt) || '' }}</span>
            </li>
            <li>
                <label>产品期限</label>
                <span>{{ detail.prdTerm ? detail.prdTerm + '天' : '' }}</span>
            </li>
            <li>
                <label>受益账号</label>
                <span>{{ accountText }}</span>
            </li>
        </ul>
        <!-- v-show="canCancleList.includes(detail.orderStatus)" -->
        <div v-if="wthrCanCancFlg === '1'" class="btn-box">
            <u-button type="hollow" @clickHandler="onCancle">撤单</u-button>
        </div>
        <e-pwd-popup-input v-model="pwdInputerShow"
          title="请输入交易密码" :bottomTip="pwdInputBottomTip"
          :sessionKey="sessionKey" @on-submit="pwdOnSubmit($event)">
          <!-- @on-submit="handleCancle" -->
          <div class="pwd-desc">
            撤单金额
            <span>
              {{ currencyFormat(detail.orderAmt, '') }}
            </span>
          </div>
        </e-pwd-popup-input>
    </u-page>
</template>
<script>
  import { UPage, UButton, UGroup, UCell, EPwdPopupInput } from "@engine";
  import {
    // alert,
    confirm,
    getBankList
  } from "@bridge";
  import tools from "@utils/tools";
  import util from '../../util';
  import Base64 from "@utils/tools/base64";

  export default {
    name: 'transaction-detail-page',
    components: {
      UPage,
      UButton,
      UGroup,
      UCell,
      EPwdPopupInput
    },

    data () {
      return {
        pwdInputerShow: false,
        pgeNumY: '', // 用于安全
        token: '', // 用于安全
        sessionKey: '', // 用于安全
        accNo_sequence: '', // 卡序列号，用于安全 前台传给前置 校验交易密码是否正确
        orderNo: '', // 订单编号
        agnSysSeqNum: '', // 代销系统流水号 线下订单无订单编号，只有代销系统流水号
        wthrCanCancFlg: '', // '0'不可撤单 '1'可撤单 交易中列表页传过来的
        detail: {
          prdCd: '', // 产品编号
          orderStatus: '', // 订单状态
          prdName: '',
          orderAmt: '',
          perforCmparBase: '', // 业绩比较基准
          prdAbbrName: '', // 产品简称
          prdStatusName: '', // 产品状态
          txnDt: '', // 产品购买日
          // prdEstabDt: '',
          // prdEndDt: '',
          prdTerm: '', // 产品期限
          txnAcctNum: '' // 受益账号
        }
      };
    },
    computed: {
      // 展示状态文字的对应状态
      showStatusList () {
        // orderStatus: 0预下单 1单证已签署未双录 2单证已签署未双录 3正式下单（审核中） 4审核通过 5审核驳回 6已撤单
        return ['3', '4', '5', '6'];
      },
      // 有撤单按钮的状态
      canCancleList () {
        return ['3', '4', '5'];
      },
      currencyFormat () {
        return tools.currencyFormat;
      },
      unitDate () {
        return util.date82kebabCase;
      },
      // 产品期限
      // dateRange () {
      //   if (this.detail.prdEstabDt && this.detail.prdEndDt) {
      //     return util.get8StringDateDiff(this.detail.prdEstabDt, this.detail.prdEndDt);
      //   } else {
      //     return '';
      //   }
      // },
      // 受益账号
      accountText () {
        const length = this.detail.txnAcctNum.length;
        if (length > 4) {
          return `广东华兴银行(尾号${this.detail.txnAcctNum.substr(-4)})`;
        } else {
          return '';
        }
      },
      // 密码输入键盘的底部提示语
      pwdInputBottomTip () {
        return `输入${this.accountText}的交易密码`;
      }
    },
    mounted () {
      this.orderNo = window.App.params.orderNo || '';
      this.agnSysSeqNum = window.App.params.seqNum || '';
      this.wthrCanCancFlg = window.App.params.wthrCanCancFlg || ''; // wthrCanCancFlg '0'不可撤单 '1'可撤单
      // this.orderNo = '513478908915810304'; // test
      // alert('this.orderNo:' + this.orderNo + ',this.wthrCanCancFlg:' + this.wthrCanCancFlg + ',window.App.params.click:' + window.App.params.click, ''); // test
      this.getOrderInfo();
    },
    methods: {
      // 查询订单详情
      getOrderInfo () {
        const postData = {
          orderNo: this.orderNo,
          agnSysSeqNum: this.agnSysSeqNum,
          logSence: 'NMB_SM_08'
        };
        this.$tools.rpc('NMBMPSX3411', postData).then(res => {
          const resData = res.body || {};
          if (resData.errorCode === '0') {
            Object.keys(this.detail).forEach(key => {
              this.detail[key] = resData[key] || '';
            });
            this.checkAcctSeq();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询卡详情，根据受益账号匹配获得卡序列号
      checkAcctSeq () {
        getBankList('1').then(res => {
          const accountInfoList = res.body.accountInfoList || [];
          let startsStr = this.detail.txnAcctNum.substr(0, 6); // 当前订单受益账号的前6位
          let endsStr = this.detail.txnAcctNum.substr(-4); // 当前订单受益账号的后4位
          for (let item of accountInfoList) {
            // 根据当前订单脱敏的受益账号的前6位和后4位匹配当前用户卡列表，找到对应的卡序列号
            if (item.accNo.substr(0, 6) === startsStr && item.accNo.substr(-4) === endsStr) {
              this.accNo_sequence = item.accNo_sequence;
              if (this.wthrCanCancFlg === '1' && window.App.params.click === '1') { // click '1'用户在列表点了“撤单”按钮
                this.onCancle();
              }
              return false;
            }
          }
          this.accNo_sequence = (accountInfoList || [])[0].accNo_sequence || '';
          if (this.wthrCanCancFlg === '1' && window.App.params.click === '1') { // click '1'用户在列表点了“撤单”按钮
            this.onCancle();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询产品详情
      // getProdDetail (prdCd) {
      //   this.$tools.rpc('NMBMPSX3399', {
      //     prdCd
      //   }).then(res => {
      //     if (res.body.errorCode === '0') {
      //       console.log(res);
      //     }
      //   });
      // },
      // 撤单按钮
      onCancle () {
        confirm('您确定要撤单吗？', '',
          { align: "center", okButton: "撤单", cancelButton: "取消" }).then(res => {
            if (res.ok) {
              // this.pwdInputerShow = true;
              this.handleCheck();
            }
          });
      },
      // base64加密获取安全token
      handleCheck (res) {
        let secCheckString = JSON.stringify({
          orderNo: this.orderNo,
          agnSysSeqNum: this.agnSysSeqNum,
          amt: this.detail.orderAmt,
          transType: 'RecordCancelOrder',
          menuId: 'MB26'
        });
        const base64 = new Base64();
        let secCheckData = base64.encode(secCheckString);
        this.$tools.rpc("NMBMPSX7006", {
          transJson: secCheckData
        }).then(res => {
          if (res.body.errorCode === '0') {
            this.token = res.body.token || '';
            // 获取sessionKey
            this.getSessionKey();
          }
        });
        // pushWindow('/ghb_trustBuy/transaction/cancle.html');
      },
      // 获取sessionKey
      getSessionKey () {
        this.$tools.rpc('NMBMPSX7012', {}).then(res => {
          if (res.body.errorCode === '0') {
            this.sessionKey = res.body.sessionKey || '';
            this.pgeNumY = res.body.pgeNumY || '';
            this.pwdInputerShow = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 密码键盘事件 输入满6位时会触发；点击蒙层隐藏键盘也会触发...
      pwdOnSubmit (e) {
        // this.pwdInputerShow = false;
        console.log('e: ', e);
        if (e.type === 'done') {
          console.log('密码输入完毕, 去提交');
          this.handleCancle(e.pwd);
        }
      },
      // 执行撤销订单 NMBMPSX3413
      handleCancle (pwd) {
        let params = {
          token: this.token,
          TRANPW: pwd, // 密码
          accNo_sequence: this.accNo_sequence,
          sessionKey: this.sessionKey,
          orderNo: this.orderNo,
          agnSysSeqNum: this.agnSysSeqNum,
          algorithmType: 'SM',
          processType: '3',
          logSence: 'NMB_SM_11',
          amt: this.detail.orderAmt,
          transType: 'RecordCancelOrder',
          menuId: 'MB26'
        };
        this.$tools.rpc("NMBMPSX3413", params).then(res => {
          if (res.body.errorCode === '0') {
            console.log(res.body);
            this.token = '';
            this.pgeNumY = '';
            this.sessionKey = '';
            this.pwdInputerShow = false;
            this.$tools.pushWindow('/ghb_trustBuy/transaction/cancle.html', {orderNo: this.orderNo, agnSysSeqNum: this.agnSysSeqNum});
          }
        });
      },
      // 字符串转化为数字，保留两位小数
      formatNum (str, unit = '') {
        if (this.isChinese(str)) {
          return str;
        }
        let num = parseFloat(str);
        if (isNaN(num)) {
          return '-';
        }
        let strr = num + '';
        let index = strr.indexOf('.');
        if (index < 0) {
          return strr + '.00' + unit;
        } else {
          strr += '00';
          return strr.substring(0, index + 3) + unit;
          // return ((Math.floor(num * 100) / 100).toFixed(2) + unit);
        }
      },

      // 判断是否包含中文字符
      isChinese (str) {
        return /[\u4e00-\u9fa5]+/g.test(str);
      },

      // 格式化业绩比较基准
      formatPerforCmparBase (perforCmparBase) {
        if (this.isChinese(perforCmparBase.replace('或', '').replace('和', ''))) {
          return perforCmparBase;
        }
        if (/-/g.test(perforCmparBase)) {
          let baseL = perforCmparBase.split('-');
          let baseNum1 = this.formatNum(baseL[0]);
          let baseNum2 = this.formatNum(baseL[1]);
          if (baseNum1 !== '-' && baseNum2 !== '-') {
            return baseNum1 + '-' + baseNum2;
          } else {
            return '-';
          }
        } else if (/或/g.test(perforCmparBase)) {
          let baseL = perforCmparBase.split('或');
          let baseNum1 = this.formatNum(baseL[0]);
          let baseNum2 = this.formatNum(baseL[1]);
          if (baseNum1 !== '-' && baseNum2 !== '-') {
            return baseNum1 + '或' + baseNum2;
          } else {
            return '-';
          }
        } else if (/和/g.test(perforCmparBase)) {
          let baseL = perforCmparBase.split('和');
          let baseNum1 = this.formatNum(baseL[0]);
          let baseNum2 = this.formatNum(baseL[1]);
          if (baseNum1 !== '-' && baseNum2 !== '-') {
            return baseNum1 + '和' + baseNum2;
          } else {
            return '-';
          }
        } else {
          let base = parseFloat(perforCmparBase);
          return this.formatNum(base);
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .main-box {
    margin-bottom: 10px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 112px;
    text-align: center;

    > p {
      font-size: 11px;
      line-height: 16px;
    }

    > div {
      line-height: 42px;
      font-size: 16px;

      > span {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }

  .form-inline {
    padding: 12px 15px;

    > li {
      font-size: 14px;
      line-height: 30px;

      > label {
        color: #888888;
      }

      > span {
        float: right;
      }
    }
  }

  .btn-box {
    margin-top: 30px;
  }

  .pwd-desc {
    padding: 10px 15px 5px;
    line-height: 33px;
    font-size: 15px;
    vertical-align: bottom;

    > span {
      float: right;
      line-height: 30px;
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>
