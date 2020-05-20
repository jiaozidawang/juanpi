<template>
  <u-page>
    <div class="main" style="height:100%">
      <scroll 
        class="wrapper"
        ref="scroll"
        :data="[detail]"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingDown="refreshData"
      > 
        <div class="nmb-font-dark top-box">
          提交以下材料并审核通过，即可完成合格投资者认证
        </div>
        <u-group class="clear-border-bottom">
            <div v-show="authTyp === '0'">
              <u-cell v-if="!needMeterial" title="上传资产证明材料">
                  <span class="nmb-font-t10">已满足</span>
              </u-cell>
              <u-cell v-else-if="!detail.astCheckStatus" is-link @clickHandler="toUploadMeterial" title="上传资产证明材料">
                  <span class="nmb-font-t2">待上传</span>
              </u-cell>
              <u-cell v-else-if="detail.astCheckStatus === '0'" title="上传资产证明材料">
                  <span class="nmb-font-t30">已完成</span>
              </u-cell>
              <u-cell v-else-if="detail.astCheckStatus === '00'" title="上传资产证明材料">
                  <span class="nmb-font-t2">审核中</span>
              </u-cell>
              <u-cell v-else-if="detail.astCheckStatus === '01'" title="上传资产证明材料">
                  <span class="nmb-font-t30">审核未通过</span>
              </u-cell>
              <u-cell v-else-if="detail.astCheckStatus === '02'" title="上传资产证明材料">
                  <span class="nmb-font-t10">审核通过</span>
              </u-cell>
              <u-cell v-else-if="detail.astCheckStatus === '99'" title="上传资产证明材料">
                  <span class="nmb-font-t30">已过期</span>
              </u-cell>
              <div v-show="detail.astCheckStatus === '01'" class="nmb-font-t30 reason-box">
                  未通过原因：{{ detail.astCheckMemo }}
                  <a href="javascript:;" @click="toUploadMeterial">重新上传</a>
              </div>
              <div v-show="detail.astCheckStatus === '99'" class="nmb-font-t30 reason-box">
                  您的资产证明材料已过期，请
                  <a href="javascript:;" @click="toUploadMeterial">重新上传</a>
              </div>
            </div>
            <!--  -->
            <u-cell v-if="!detail.signCheckStatus" is-link @clickHandler="toReadAndSign" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t2">待签署</span>
            </u-cell>
            <u-cell v-else-if="detail.signCheckStatus === '0'" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t30">已完成</span>
            </u-cell>
            <u-cell v-else-if="detail.signCheckStatus === '00'" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t2">审核中</span>
            </u-cell>
            <u-cell v-else-if="detail.signCheckStatus === '01'" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t30">审核未通过</span>
            </u-cell>
            <u-cell v-else-if="detail.signCheckStatus === '02'" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t10">审核通过</span>
            </u-cell>
            <u-cell v-else-if="detail.signCheckStatus === '99'" title="签署《承诺函》" class="no-border">
                <span class="nmb-font-t30">已过期</span>
            </u-cell>
            <div v-show="detail.signCheckStatus === '01'" class="nmb-font-t30 reason-box">
                未通过原因：{{ detail.signCheckMemo }}
                <a href="javascript:;" @click="toReadAndSign">重新签名</a>
            </div>
            <div v-show="detail.signCheckStatus === '99'" class="nmb-font-t30 reason-box">
                您的《承诺函》已过期，请
                <a href="javascript:;" @click="toReadAndSign">重新签名</a>
            </div>
        </u-group>
        <u-reminder :showTips="showReminder" title="温馨提示" class="reminder-no-border" />
        <div v-show="showBtnFlag" class="btn-box">
            <u-button :disabled="disabledStatus" @clickHandler="handleSubmit">提交审核</u-button>
        </div>
      </scroll>
    </div>
  </u-page>
</template>
<script>
  import { UPage, UButton, UGroup, UCell, UReminder } from "@engine";
  import scroll from '@comps/BScroll/newScroll';
  import mixins from "../../components/mixins";
  import {
    alert,
    closePage,
    // popOtherWindow,
    pushWindow,
    showLoading,
    hideLoading,
    getBankList
  } from "@bridge";

  export default {
    name: 'certification-intermediate-page',
    components: {
      UPage,
      UButton,
      UGroup,
      UCell,
      UReminder,
      scroll
    },
    mixins: [mixins],
    data () {
      return {
        pulldown: true, // 打开派发下拉事件
        needMeterial: true, // 需要提供材料证明。  资产>3百万时无需提供
        showReminder: ['1. 审核工作时间为周一至周日9:00-15:00。', '2. 非工作时间内提交的认证材料，将在工作时间内审核，请您耐心等待。'],
        detail: {
          // eligInveAuthStatus: '', // 0","已完成"投资者认证，资产证明已完成, "00", "待审批", "01", "驳回", "02", "通过";
          authSeqNum: '', // 合格投资者认证流水号
          signCheckStatus: '', // 承诺函审核状态
          signCheckMemo: '', // 承诺函审核备注
          astCheckStatus: '', // 资产证明审核状态
          astCheckMemo: '' // 资产证明审核备注
        }
      };
    },
    computed: {
      pullDownRefreshObj () {
        return this.pulldown ? {
          threshold: 90,
          stop: 50,
          txt: '刷新成功'
        } : false;
      },
      // 提交审核 按钮的禁用状态
      disabledStatus () {
        const whiteList = ['0', '00', '02']; // 已完成 审核中 审核通过
        const showStatus = (this.detail.astCheckStatus === '0' && whiteList.includes(this.detail.signCheckStatus)) ||
          (this.detail.signCheckStatus === '0' && whiteList.includes(this.detail.astCheckStatus)) ||
          (!this.needMeterial && this.detail.signCheckStatus === '0');
        return !showStatus;
      },
      // 提交审核 按钮的展示状态
      showBtnFlag () {
        const whiteList = ['00', '02']; // 审核中，审核通过
        return !(whiteList.includes(this.detail.signCheckStatus) && (whiteList.includes(this.detail.astCheckStatus) || !this.needMeterial || (this.authTyp === '1')));
      }
    },
    created () {
      showLoading();
      // popOtherWindow();
      closePage(['/ghb_trustBuy/certification/result.html']);
      this.init();
    },

    resume(opt) {
      // console.log("opt", opt);
      showLoading();
      closePage(['/ghb_trustBuy/certification/index.html', '/ghb_pdf/index/index.html', '/ghb_trustBuy/certification/sign.html', '/ghb_trustBuy/certification/meterial.html', '/ghb_trustBuy/certification/result.html']);
      this.init();
    },

    methods: {
      // 初始化
      async init () {
        // getStatus 和 authTyp 在mixins里
        await Promise.all([this.getStatus(), this.getTotalbal()]);
        this.$refs.scroll.forceUpdate(true);
        hideLoading();
      },
      // 刷新
      refreshData () {
        showLoading();
        this.init();
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
      // 去阅读承诺函并签署
      toReadAndSign () {
        this.getPDF();
      },
      // 去上传资产证明
      toUploadMeterial () {
        pushWindow('/ghb_trustBuy/certification/meterial.html');
      },
      handleSubmit () {
        if (this.disabledStatus) {
          return false;
        }
        // 提交审核
        const params = {
          prestTyp: '2' // 总提交   2：总提交 0:资料证明 1:签署
        };
        this.$tools.rpc('NMBMPSX3407', params).then(res => {
          if (res.body.errorCode === '0') {
            pushWindow('/ghb_trustBuy/certification/result.html');
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 获取合格投资者承诺函pdf文件地址
      getPDF () {
        this.$tools.rpc('NMBMPSX3421', {sysParName: 'QFII_COMMIT_LETTE'}).then(res => {
          const resData = res.body || {};
          if (resData.errorCode === '0') {
            if (resData.sysParVal) {
              // alert(resData.sysParVal, 'resData.sysParVal');
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
              alert('无法获取承诺函', '');
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
  .top-box {
    padding: 10px 15px 0;
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

  .reason-box {
    padding: 12px 15px;
    font-size: 12px;
    line-height: 16px;
  }
</style>
<style lang="less">
  .no-border .app-cell-content:after {
    display: none !important;
    content: '';
    border-bottom: 0 !important;
  }

  .reminder-no-border :after {
    border-top: 0 !important;
  }
</style>
