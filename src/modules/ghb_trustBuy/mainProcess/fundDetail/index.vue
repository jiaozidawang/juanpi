<template>
<m-page><!-- !!! 必须要用mpage才能实现顶部滚动由透明变白色的效果，不能用upage funDetailWrap不能设overflow: auto; -->
  <div class="fundDetailWrap">
  <!-- <u-page class="fundDetailWrap"> -->
    <div class="contentWrap">
      <!-- 测试 start -->
      <!-- <div>
        风评
        <select v-model="fpVal" name="test" id="test">
          <option value="未风评">未风评</option>
          <option value="风评过期">风评过期</option>
          <option value="超风险">超风险</option>
          <option value="通过">通过</option>
        </select>
      </div>
      <div>
        合格投资者认证
        <select v-model="validateInvestorVal" name="test2" id="test2">
          <option value="未完成">未完成</option>
          <option value="已完成">已完成</option>
        </select>
      </div>
      <div>
        <u-button size="S" @clickHandler="clearVideoStatus">清除视频记录</u-button>
      </div> -->
      <!-- 测试 end -->

      <section class="nmb-font-white topTipBox"
               :class="$theme + '-topBg'"
               :style="{paddingTop:mTopPadding+'px'}">
        <div v-if="topTipType" class="validateInvestorTipBox" :class="$theme + '-topTipBg'">
          <u-cell :isLink="topTipInfo[topTipType] && topTipInfo[topTipType].isLink"
                  :showBg="false"
                  titleColor="#fff"
                  valueColor="#fff"
                  :title="topTipInfo[topTipType] && topTipInfo[topTipType].title"
                  @clickHandler="goValidateInvestor()">
            <div slot="icon-before"><div class="topTipHeadIcon"></div></div>
            <div>{{ topTipInfo[topTipType] && topTipInfo[topTipType].value }}</div>
          </u-cell>
        </div>
        <div class="topFundInfomationContent">
          <div class="fundTitleBox">
            <div class="prdName">{{ prdName }}</div>
            <div class="prdCd">{{ prdCd }} | 代销产品</div>
          </div>
          <div class="annualInterestRateBox">
            <div class="nmb-font-t6 rateVal">{{ formatPerforCmparBase(perforCmparBase) }}<span v-if="!isChinese(perforCmparBase.replace('或', '').replace('和', ''))" class="unit">%</span></div>
            <div class="rateTip">业绩比较基准</div>
          </div>
          <div class="fundAbstractBox" :class="$theme + '-fundAbstractBg'">
            <div class="abstractItem beginningPurchaseAmount">
              <div class="title">起购金额</div>
              <div class="val nmb-font-t6">{{ money2chineseUnit(indvFstLowtInvtAmt) }}</div>
              <div class="additional">{{ money2chineseUnit(indvSuppLowtInvtAmt) }}递增</div>
            </div>
            <div class="abstractItem">
              <div class="title nmb-border-l">投资期限</div>
              <div class="val nmb-font-t6">{{ prdTermDt || '0' }}天</div>
            </div>
            <div class="abstractItem">
              <template v-if="tipMountSold">
                <div class="title nmb-border-l"></div>
                <div class="val nmb-font-t6">已售</div>
              </template>
              <template v-else>
                <div class="title nmb-border-l">剩余额度</div>
                <template v-if="noLimitControl">
                  <div class="val nmb-font-t6">充足</div>
                  <div class="additional">剩余名额充足</div>
                </template>
                <template v-else>
                  <div class="val nmb-font-t6">{{ showTotalUsabLmtText(totalUsabLmt) }}</div>
                  <div class="additional">{{ showPrdRemaCanPurchCnt(prdRemaCanPurchCnt) }}</div>
                </template>
              </template>
            </div>
          </div>
          <div v-if="(fpVal !== '未风评') && (riskName !== '')"
               class="nmb-font-white customerTypeBox"
               :class="$theme + '-customerTypeBox'"
               @click="goRiskEvaluate()">
            <div class="content">{{ riskName }} ></div>
          </div>
          <div v-if="(riskRankCd && riskRankName)" class="ratingBox nmb-font-dark" :class="$theme + '-fengxdjbg'">
            <span class="ratingInfo">{{ (riskRankCd && riskRankName) ? `PR${riskRankCd}${riskRankName}` : '' }}</span>
          </div>
        </div>
      </section>

      <section v-if="!isProductClosed" class="infoBox nmb-bg-white fundTimeInfoBox">
        <u-flow>
          <u-flow-state state="2" is-done>
            <span slot="title">
              <div class="timeDesc">起售</div>
              <div class="time">{{ dateFlowFormat(ipoStartDt) }}</div>
              <div class="time">{{ timeFlowFormat(openCityTm) }}</div>
            </span>
          </u-flow-state>
          <u-flow-line :tip="'销售期'" lineSpan="207px" is-done></u-flow-line>

          <u-flow-state state="3" is-done>
            <span slot="title">
              <div class="timeDesc">截止</div>
              <div class="time">{{ dateFlowFormat(ipoEndDt) }}</div>
              <div class="time">{{ timeFlowFormat(closeCityTm) }}</div>
            </span>
          </u-flow-state>
          <u-flow-line dashed></u-flow-line>

          <u-flow-state state="4" arrow mode="L">
            <span slot="title">
              <div class="timeDesc">起息</div>
              <!-- <div class="time">{{ dateFlowFormat(prdIntStartDt) }}</div> -->
            </span>
          </u-flow-state>
        </u-flow>
      </section>
      <split :gutter="10" />

      <section class="infoBox nmb-bg-white transactionInfoBox">
        <collapse header-val="交易规则"
                  :initShow="true">
          <div slot="content" class="infoContent nmb-border-b">
            <div v-for="e in transactionInfo" :key="e.id" class="introduceItem">
              <div class="infoTitle nmb-font-t2">{{ e.title }}</div>
              <div v-if="e.id === 0" class="infoVal nmb-font-dark word-pl">{{ `${e.timeStart} 至 ${e.timeEnd}` }}</div>
              <div v-else class="infoVal nmb-font-dark">{{ e.info }}</div>
            </div>
          </div>
        </collapse>
      </section>
      <section class="infoBox nmb-bg-white subInfo">
        <collapse header-val="更多交易规则"
                  :isSubTitle="true"
                  :initShow="false">
          <div slot="content" class="infoContent nmb-border-b">
            <div v-for="e in tradeRule" :key="e.id" class="introduceItem">
              <div class="infoTitle nmb-font-t2">{{ e.title }}</div>
              <div class="infoVal nmb-font-dark">{{ e.info }}</div>
            </div>
          </div>
        </collapse>
      </section>
      <!-- <section class="infoBox nmb-bg-white subInfo no-border-cell">
        <collapse header-val="交易相关费用"
                  :isSubTitle="true"
                  :initShow="false">
          <div slot="content" class="infoContent nmb-border-b top-border">
            <div v-for="e in tradeFee" :key="e.id" class="introduceItem">
              <div class="infoTitle nmb-font-t2">{{ e.title }}</div>
              <div class="infoVal nmb-font-dark">{{ e.info }}</div>
            </div>
          </div>
        </collapse>
      </section> -->
      <split :gutter="10" />

      <section class="infoBox nmb-bg-white investmentInfoBox">
        <collapse header-val="投资信息" :initShow="true">
          <div slot="content" class="infoContent">
            <div v-for="e in investmentInfo" :key="e.id" class="introduceItem">
              <div class="infoTitle nmb-font-t2">{{ e.title }}</div>
              <div class="infoVal nmb-font-dark">{{ e.info }}</div>
            </div>
          </div>
        </collapse>
      </section>
      <split :gutter="10" />

      <section class="infoBox nmb-bg-white productionIntroduceBox">
        <collapse header-val="产品简介" :initShow="true" :toggle="false">
          <div slot="content" class="infoContent">
            <div class="introduceItem">
              <div>
                <div v-for="e in productionIntroduce" :key="e.id" class="infoTitle nmb-font-t2">{{ e.title }}</div>              
              </div>
              <div>
                <div v-for="e in productionIntroduce" :key="e.id" class="infoVal nmb-font-dark">{{ e.info }}</div>              
              </div>
            </div>
          </div>
        </collapse>
      </section>
      <split :gutter="10" />

      <section class="infoBox nmb-bg-white videoPromoteBox">
        <collapse header-val="推介视频" :initShow="true" :toggle="false">
          <div slot="content" class="infoContent" @click="goVideo('onlyWatch')">
            <div class="flexItem videoBox">
              <div class="playMask"></div>
            </div>
            <div class="flexItem videoTip nmb-font-dark">
              为了更好的保障您的权益，请在认购前完整观看推介视频，以了解该产品的相关必要信息。
            </div>
          </div>
        </collapse>
      </section>
      <split :gutter="10" />

      <section class="infoBox nmb-bg-white productionDocBox">
        <collapse header-val="产品合同及相关文档"
                  :initShow="false">
          <div slot="content" class="">
            <div v-for="(e, i) in docList" :key="i">
              <u-cell :title="docNameParser(e.docName, e.fileTyp)" is-link @clickHandler="goPdfReader(e.docUrl, e.docName)"></u-cell>
            </div>
          </div>
        </collapse>
      </section>

      <section class="riskReminderBox">
        <u-reminder class="reminderComp" title="风险提示" :showTips="[riskTipInfo]"></u-reminder>
      </section>

      <!-- Dialog -->
      <!-- <u-dialog v-model="showModal" hide-on-blur :dialogStyle="{'background-color': 'initial'}">
        <check-modal :title="modalData.title"
                      :desc="modalData.desc"
                      :left-btn="modalData.leftBtn"
                      :right-btn="modalData.rightBtn"
                      @left-btn-click="modalData.leftFn()"
                      @right-btn-click="modalData.rightFn()" />
      </u-dialog> -->
    </div>

    <div class="bottomFixedBottomGroup nmb-border-t">
      <div class="collectBtn nmb-bg-white" @click="collectHandler">
        <div class="icon iconfont" :class="collectionIconClass"></div>
        <div class="text nmb-font-dark">{{ collection ? '已收藏' : '收藏' }}</div>
      </div>
      <div class="flexItem">
        <u-button :noBorderRadius="true"
                  :disabled="!buyBtnActive"
                  @clickHandler="goNext()">{{ buyBtnText }}</u-button>
      </div>
    </div>
  </div>
</m-page>
</template>

<script>
/**
 * prdCd 产品编号
 */
import { UPage, UCell, UReminder, UButton, UFlow, UFlowLine, UFlowState, UDialog } from "@engine";
// import CheckModal from "./dialog/CheckModal.vue";
import Collapse from "../../components/Collapse.vue";
import Split from "../../components/Split.vue";
import {
  errorAlert,
  // successToast,
  // hideTitleBar,
  getSafePadding,
  setTitleBarStyle,
  setStatusBar,
  confirm,
  pushWindow,
  popSomeWindow,
  setSessionStorage,
  getSessionStorage,
  getVersionInfo
  // getBankList
} from '@bridge';
import getDoc from "../../components/mixin_getDoc.js";
// import validateFn from "../../components/mixins";
import util from '../../util/index';
// import { invtDirDict } from '../../util/enum';

export default {
  name: 'foundDetail',

  components: {
    UPage,
    UCell,
    UReminder,
    UButton,
    UFlow,
    UFlowLine,
    UFlowState,
    UDialog,

    Split,
    // CheckModal,
    Collapse
  },

  mixins: [
    getDoc // 混入获取文档方法
    // validateFn // 混入合格投资者认证方法
  ],

  watch: {
    // fpVal: function (nv, ov) {
    //   alert(111);
    //   this.riskAndValidatorModalInfo();
    // },

    // validateInvestorVal: function (nv, ov) {
    //   alert(222);
    //   this.riskAndValidatorModalInfo();
    // }
  },

  computed: {
    collectionIconClass () {
      return this.collection
      ? { 'icon-collect-full': true, 'nmb-font-t13': true }
      : { 'icon-collect-empty': true, 'nmb-font-dark': true };
    },
    // 已售
    tipMountSold () {
      return this.buyBtnText === '已售';
    },
    // 无额度控制
    noLimitControl () {
      return this.lmtCtrlFlg === '' || this.lmtCtrlFlg === '0';
    }
  },

  data: function () {
    return {
      mTopPadding: 44,
      // 产品收藏
      collection: false,
      // 底部认购按钮
      // buyBtnActive: true,
      buyBtnActive: false,
      // buyBtnText: '立即认购',
      buyBtnText: '--',
      // 是否有在途订单
      hasProcessingOrder: false,
      // 是否处于产品封闭期
      isProductClosed: true,
      processingOrderNo: '',
      /*
       * '0' 预下单
       * '1' 已签证未双录
       * '2' 已签证已双录
       * '3' 已正式下单
       * '4' 审核通过
       * '5' 审核驳回
       * '6' 已撤单
       */
      processingOrderStep: '',
      // 个人情况
      // validateInvestorVal: '未完成',
      validateInvestorVal: '',
      isFirstValidate: true,
      // fpVal: '未风评',
      fpVal: '',
      isLimitControlPass: true, // 额度控制是否通过
      riskName: '',
      customerType: 'personal', // 个人 personal 或 机构 institution
      isWhiteCtr: '1',  // 是否白名单: '0' 表示是 ,其他表示否
      isSuportSDK: 0, // 判断系统是否支持双录SDK标识, 如果系统版本大于等于4.2.17为支持,小于或没有为不支持
      // 顶部提示
      // topTipType: 'riskAssess', // 顶部提示区域类型
      topTipType: '', // 顶部提示区域类型
      topTipInfo: {
        'riskAssess': {
          title: '您暂未进行风险评估，请您亲临我行柜台风评。',
          value: '',
          isLink: false
        },
        'validateInvestor': {
          title: '您暂未完成合格投资者认证',
          value: '去认证',
          isLink: true
        }
      },

      // 模态框
      showModal: false, // 显示
      modalData: {
        title: '',
        desc: '您还未在我行进行合格投资者声明。为了您的权益，请先进行声明后继续浏览产品（XX）。',
        leftBtn: '好的',
        leftFn: function () {
          this.showModal = false;
        },
        rightBtn: '',
        rightFn: function () {
          this.showModal = false;
        }
      },

      // 私募产品 render 信息
      prdName: '', // 产品名称
      prdCd: '', // 产品id
      perforCmparBase: '', // 业绩比较基准
      indvFstLowtInvtAmt: '', // 起购买金额
      indvSuppLowtInvtAmt: '', // 递增金额
      riskRankCd: '', // 风险等级编号
      riskRankName: '', // 风险等级名称
      ipoStartDt: '00000000', // 募集开始日期
      ipoEndDt: '00000000', // 募集结束日期
      prdIntStartDt: '00000000', // 产品起息日期
      prdTermDt: '', // 投资期限
      totalUsabLmt: '', // 总剩余可用金额
      prdRemaCanPurchCnt: '', // 剩余购买名额
      recomVid: '', // 视频地址
      recomVidDocCpcty: '', // 视频大小
      videoPlayFinish: false, // prdCd 对应视频是否看过
      prdInit: '', // 发行方
      openCityTm: '', // 开市时间
      closeCityTm: '', // 闭市时间
      // 私募控制
      wthrEMeltContr: '', // 是否支持电子化合同
      indiWthrAllow: '', // 是否支持个人购买
      allowChnGrp: '', // 是否支持手机银行,如果组合中不含数字7则不能认购
      lmtCtrlFlg: '', // 是否控制额度
      // 更多交易规则
      tradeRule: [
        {
          id: 0,
          title: '购买规则',
          info: '-'
        },
        {
          id: 1,
          title: '赎回规则',
          info: '-'
        }
      ],
      // 交易相关费用
      tradeFee: [
        {
          id: 0,
          title: '产品服务费率',
          info: '-'
        },
        {
          id: 1,
          title: '产品管理费率',
          info: '-'
        },
        {
          id: 2,
          title: '产品托管费率',
          info: '-'
        },
      ],
      // 交易期
      transactionInfo: [
        {
          id: 0,
          title: '认购期',
          timeStart: '-',
          timeEnd: '-'
        },
        {
          id: 1,
          title: '收益规则',
          info: '-'
        },
        {
          id: 2,
          title: '清算兑付',
          info: '-'
        }
      ],
      // 投资信息
      investmentInfo: [
        {
          id: 0,
          title: '投资方向',
          info: '-'
        },
        {
          id: 1,
          title: '投资范围',
          info: '-'
        },
        {
          id: 2,
          title: '增信措施',
          info: '-'
        }
      ],
      // 产品简介
      productionIntroduce: [
        {
          id: 0,
          title: '产品名称',
          info: '-'
        },
        {
          id: 1,
          title: '产品成立日',
          info: '-'
        },
        {
          id: 2,
          title: '产品到期日',
          info: '-'
        },
        {
          id: 3,
          title: '产品期限',
          info: '-'
        },
        {
          id: 4,
          title: '产品管理人',
          info: '-'
        },
        {
          id: 5,
          title: '托管人',
          info: '-'
        }
      ],
      docList: [],
      riskTipInfo: '-',
      fromStatement: false,
      version: 0,
      deviceVersion: 0
    };
  },

  created () {
    this.prdCd = window.App.params.proCode;
    this.fromStatement = window.App.params.fromStatement;
    // this.prdCd = 'GDSL01'; // mock 私募详情页 - prdCd
    // 钟文让加的，方便他返回到“私募列表”或者“我的私募”的处理
    this.getVersion(); // 获取设备版本信息
    window.App.on("back", e => {
      this.back();
    });
    getSafePadding().then(res => {
      this.mTopPadding += res.height * 1;
    });
  },

  resume (opt) {
    this.handleSetTitleBar(); // test
    this.NMBMPSX3354(false);
  },

  mounted () {
    this.handleSetTitleBar();
    this.init();
  },

  methods: {
    // 处理顶部样式
    handleSetTitleBar () {
      setTitleBarStyle('white');
      window.AlipayJSBridge.call('transparentTitleBar', {
        scrollDistance: 100,
        type: 'white',
        rightType: 'shell'
      });
      setTimeout(() => {
        setStatusBar('1');
      }, 500);
    },

    /* ---------- mock 类 ---------- */
    clearVideoStatus () {
      let storageKey = this.prdCd + '-videoHasPlayed';
      setSessionStorage(storageKey, '0');
    },

    /* ---------- 工具类 ---------- */
    // 转化成中文单位的金额
    money2chineseUnit (money) {
      let data = util.money2chineseUnit(Number(money));
      // 金额.00 则不显示小数位数
      if (data.num.split('.')[1] === '00') {
        return data.num.split('.')[0] + data.unit;
      } else {
        return data.num + data.unit;
      }
    },

    // 时间格式转换
    timeFlowFormat (time) {
      return util.timeExcludeSecond(time);
    },

    // 日期格式转换
    dateFlowFormat (date) {
      return util.dateFormatHideCurrentYear(date, '-');
    },

    // 文档名超长处理
    docNameParser (str, type) {
      // str = docNameDict[type]
      let _stringFilter = function (name, maxLen) {
        if (name.length > maxLen) {
          return name.slice(0, maxLen) + '...';
        } else {
          return name;
        }
      };
      if (str.lastIndexOf('.') > 0) {
        return _stringFilter(str.slice(0, str.lastIndexOf('.')), 20);
      } else {
        return str;
      }
    },
    popDocName (name = '') {
      return name.slice(0, name.lastIndexOf('.'));
    },

    showTotalUsabLmtText (totalUsabLmt) {
      if (totalUsabLmt === '') {
        return '充足';
      } else {
        return this.money2chineseUnit(totalUsabLmt);
      }
    },

    showPrdRemaCanPurchCnt (prdRemaCanPurchCnt) {
      if (prdRemaCanPurchCnt === '') {
        return '剩余名额充足';
      } else {
        return `剩余${prdRemaCanPurchCnt}个名额`;
      }
    },

    /* ---------- 逻辑类 ---------- */
    init () {
      // 查询私募详情信息
      this.$tools.rpc('NMBMPSX3399', {
        prdCd: this.prdCd
      }).then(res => {
        if (res.header.errorCode === '0') {
          // 黑白名单控制
          this.NMBMPSX3437(
            () => {
              // 加载数据到 data 上
              this.renderData(res.body);
              // 查询视频播放状态
              this.getVideoPlayeStatus();
              // 查询收藏
              this.NMBMPSX3144();
              // 获取产品合同及相关文档接口
              this.NMBMPSX3398();
              // 获取 风险评估 & 合格投资者认证 & 在途订单 状态
              this.getRiskAndValidateAndProcessingOrder();
            }
          );
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    async getRiskAndValidateAndProcessingOrder () {
      try {
        await this.NMBMPSX3354(); // 查询风险评估状态
        await this.NMBMPSX3404(); // 查询合格投资者认证状态
        await this.NMBMPSX3410(); // 查询当前用户在当前产品是否有在途订单
        // if (!this.hasProcessingOrder) { // 如果没有在途订单
        //   this.riskAndValidatorModalInfo(); // 判断是否为风险评估和合格投资者认证弹窗提示
        // }
        this.riskAndValidatorOnlyInfo();
        if (this.processingOrderStep === '5') {
          this.renderModal(
            '您提交的购买本私募产品申请审核未通过，请重新提交。',
            '取消',
            '查看详情',
            undefined,
            () => {
              this.goMaterialCheck();
            }
          );
        }
      } catch (error) {
        // errorAlert(error);
        console.log(error);
      }
    },

    // 查询视频播放状态
    getVideoPlayeStatus (hasCb, noCb) {
      let _this = this;
      let storageKey = this.prdCd + '-videoHasPlayed';
      getSessionStorage(storageKey).then(res => {
        if (res && res === '1') {
          _this.videoPlayFinish = true;
          hasCb && hasCb();
        } else {
          _this.videoPlayFinish = false;
          noCb && noCb();
        }
      });
    },

    collectHandler () {
      let _this = this;
      if (_this.collection) {
        _this.NMBMPSX2053(false); // 删除收藏
      } else {
        _this.NMBMPSX2052(true); // 添加收藏
      }
    },

    // 添加收藏
    NMBMPSX2052 (trigger) {
      let _this = this;
      _this.$tools.rpc('NMBMPSX2052', {
        productCode: this.prdCd,
        classification: '4',
        prdName: this.prdName, // 产品名称
        modelComment: this.perforCmparBase, // 利率 传 业绩比较基准
        opBgnDt: util.date82kebabCase(this.ipoStartDt), // 运作开始时间 传 募集开始日期
        opEndDt: util.date82kebabCase(this.ipoEndDt), // 运作结束时间 传 募集结束日期
        pfirstAmt: this.indvFstLowtInvtAmt, // 个人首次最低投资金额 传 起购买金额
        ifmTerm: this.prdTermDt, // 期限（传数字，不带单位）
        prdType: this.riskRankName // 用该字段传风险等级名称
      }).then(res => {
        if (res.header.errorCode === '0') {
          _this.collection = trigger;
          // successToast('收藏成功');
          _this.$toast('收藏成功', 'collect', 500);
          window.AlipayJSBridge.call("setUserReserveInfo", { type: "1" });
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 删除收藏
    NMBMPSX2053 (trigger) {
      let _this = this;
      _this.$tools.rpc('NMBMPSX2053', {
        productCode: this.prdCd
      }).then(res => {
        if (res.header.errorCode === '0') {
          _this.collection = trigger;
          // successToast('已取消收藏');
          _this.$toast('已取消收藏', 'cancleCollect', 500);
          window.AlipayJSBridge.call("setUserReserveInfo", { type: "1" });
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 查询收藏
    NMBMPSX3144 () {
      let _this = this;
      this.$tools.rpc('NMBMPSX3144', {
        prdCode: this.prdCd,
        flag: '4'
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (res.body.proVolInfoList && res.body.proVolInfoList.length > 0) {
            _this.collection = true;
          } else {
            _this.collection = false;
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 加载数据
    renderData (data) {
      // 基础信息
      this.prdName = data.prdName;
      this.perforCmparBase = data.perforCmparBase;
      this.riskRankCd = data.riskRankCd;
      this.riskRankName = data.riskRankName;
      this.ipoStartDt = data.ipoStartDt;
      this.ipoEndDt = data.ipoEndDt;
      this.prdIntStartDt = data.prdIntStartDt;
      // this.totalUsabLmt = data.totalUsabLmt || '0';
      // this.prdRemaCanPurchCnt = data.prdRemaCanPurchCnt || '0';
      this.totalUsabLmt = data.totalUsabLmt || '';
      this.prdRemaCanPurchCnt = data.prdRemaCanPurchCnt || '';
      this.prdTermDt = util.get8StringDateDiff(data.prdIntStartDt, data.prdEndDt) || '';
      if (this.customerType === 'personal') {
        this.indvFstLowtInvtAmt = data.indvFstLowtInvtAmt;
        this.indvSuppLowtInvtAmt = data.indvSuppLowtInvtAmt;
      }
      this.prdInit = data.prdInit;
      this.openCityTm = data.openCityTm; // 开市时间
      this.closeCityTm = data.closeCityTm; // 闭市时间
      // 私募控制
      this.wthrEMeltContr = data.wthrEMeltContr; // 是否支持电子化合同
      this.indiWthrAllow = data.indiWthrAllow; // 是否支持个人购买
      this.allowChnGrp = data.allowChnGrp; // 是否支持手机银行
      this.lmtCtrlFlg = data.lmtCtrlFlg; // 是否控制额度
      // 是否处于产品封闭期
      this.isProductClosed = data.prdStatus === '9' || data.prdStatus === 9;
      // 交易规则
      let openTime = `${util.timeExcludeSecond(data.openCityTm)}`;
      let closeTime = `${util.timeExcludeSecond(data.closeCityTm)}`;
      this.transactionInfo[0].timeStart = `${util.date82kebabCase(data.ipoStartDt) || '-'} ${openTime}`;
      this.transactionInfo[0].timeEnd = `${util.date82kebabCase(data.ipoEndDt) || '-'} ${closeTime}`;
      this.transactionInfo[1].info = data.incomeRule; // 收益规则
      this.transactionInfo[2].info = data.liqdtCash; // 清算兑付
      // 更多交易规则
      this.tradeRule[0].info = data.purchRule;
      this.tradeRule[1].info = data.redeRule;
      // 交易相关费用
      this.tradeFee[0].info = data.prdSrvRate;
      this.tradeFee[1].info = data.prdMgmtRate;
      this.tradeFee[2].info = data.prdTrustRate;
      // 投资信息
      // this.investmentInfo[0].info = invtDirinvtDirDict[data.invtDir];
      this.investmentInfo[0].info = data.invtDir;
      this.investmentInfo[1].info = data.invtRange;
      this.investmentInfo[2].info = data.incMeasr;
      // 产品简介
      this.productionIntroduce[0].info = data.prdName;
      this.productionIntroduce[1].info = util.date82kebabCase(data.prdEstabDt) || '';
      this.productionIntroduce[2].info = util.date82kebabCase(data.prdEndDt) || '';
      this.productionIntroduce[3].info = `${this.prdTermDt}天`;
      this.productionIntroduce[4].info = data.prdMgr;
      this.productionIntroduce[5].info = data.prdTrus;
      // 视频
      this.recomVid = data.recomVid;
      this.recomVidDocCpcty = data.recomVidDocCpcty;
      // 底部温馨提示
      let riskTipStrAfter = '广东华兴银行作为代销机构，不承担产品的投资、兑付和风险管理责任，如有业绩比较基准，不代表产品未来收益承诺。';
      this.riskTipInfo = data.prdInit !== data.prdMgr
        ? `本产品由${data.prdInit}发行，由${data.prdMgr}管理，${riskTipStrAfter}`
        : `本产品由${data.prdInit}发行和管理，${riskTipStrAfter}`;
      /* ---------- 判断额度控制 ---------- */
      let canPurchase =
        (this.wthrEMeltContr !== '' && this.wthrEMeltContr !== '0') &&  //  支持电子化合同
        (this.indiWthrAllow !== '' && this.indiWthrAllow !== '0') && // 支持个人购买
        (this.allowChnGrp.indexOf('7') >= 0); // 支持手机银行,组合中有7则表示可以购买
      if (canPurchase) {
        if (this.lmtCtrlFlg !== '' && this.lmtCtrlFlg !== '0') {
          this.NMBMPSX3381();
        }
      } else {
        this.isLimitControlPass = false;
      }
      /* ---------- 产品销售情况判断 ---------- */
      let fundStutas = util.computedFundStatus(
        data.ipoStartDt,
        data.openCityTm,
        data.ipoEndDt,
        data.closeCityTm,
        data.prdStatus,
        data.indvFstLowtInvtAmt,
        data.totalUsabLmt,
        data.prdRemaCanPurchCnt,
        data.lmtCtrlFlg
      );
      // fundStutas = 'presell'; // mock 详情 - 产品状态
      // this.isWhiteCtr = 0;
      switch (fundStutas) {
        case 'presell':
          this.buyBtnActive = false;
          let openDate = `${this.ipoStartDt.slice(0, 4)}年${this.ipoStartDt.slice(4, 6)}月${this.ipoStartDt.slice(6, 8)}日`;
          this.buyBtnText = `${openDate} ${util.timeExcludeSecond(data.openCityTm)} 开售`;
          break;
        case 'selling':
          if (this.isLimitControlPass) {
            // console.log('是否白名单:0是,非0否', this.isWhiteCtr);
            // console.log('是否支持双录SDK:1是,0否', this.isSuportSDK);
            if(this.isWhiteCtr == '0' && this.isSuportSDK) { // 是白名单客户并且支持双录SDK才能购买
              this.buyBtnActive = true;
              this.buyBtnText = '立即认购';
              // 有额度控制 && 没有剩余购买名额 = 提示临柜购买
              if (data.lmtCtrlFlg !== '' && data.lmtCtrlFlg !== '0' && data.prdRemaCanPurchCnt == '0') {
                this.buyBtnActive = false;
                this.buyBtnText = '请联系客户经理临柜认购';
              }
            } else {
              this.buyBtnActive = false;
              this.buyBtnText = '请联系客户经理临柜认购';
            }
          } else {
            this.buyBtnActive = false;
            this.buyBtnText = '请联系客户经理临柜认购';
          }
          break;
        case 'sellout':
          this.buyBtnActive = false;
          this.buyBtnText = '已售';
          break;
      }
      // this.buyBtnActive = true; // mock 私募详情页 - 放开购买按钮控制
    },

   // 黑白名单控制
    async NMBMPSX3437 (fn) {
      let _this = this;
      await this.$tools.rpc('NMBMPSX3437', {
        flag: '02'
      }).then(res => {
        if (res.header.errorCode === '0') {
          _this.isWhiteCtr = res.body.status;
        }
        _this.NMBMPSX9913(fn);
        // fn && fn();
      });
    },

     // 检测当前APP系统版本isHighVersion
    async NMBMPSX9913 (fn) {
      let _this = this;
      await this.$tools.rpc('NMBMPSX9913', {}).then(res => {
        _this.version = res.body.version || 0;
        _this.isSuportSDK = util.compareVersion(_this.deviceVersion, _this.version) >= 0 ? 1 : 0;
        fn && fn();
      });
    },

    // 查询产品额度控制信息
    async NMBMPSX3381 () {
      let _this = this;
      await this.$tools.rpc('NMBMPSX3381', {
        prdCd: this.prdCd,
        orgId: '800001'
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (Number(res.body.indvFstLowtInvtAmt) < (Number(res.body.indvUsabLmt) + Number(res.body.flxUsabLmt))) {
            _this.isLimitControlPass = true;
          } else {
            _this.isLimitControlPass = false;
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 查询风险评测
    NMBMPSX3354 (globalLoading = true) {
      let _this = this;
      let params = {
        accType: '1',
        offset: '1',
        queryNum: '10'
      };
      return _this.$tools.rpc('NMBMPSX3354', params, {biz: true, globalLoading}).then(res => {
        if (res.header.errorCode === '0') {
          if (res.body.respResuListInfo7 && (res.body.respResuListInfo7.length !== 0)) {
            let riskInfo = res.body.respResuListInfo7[0];
            _this.riskName = riskInfo.riskLevel ? util.riskCode2userType(Number(riskInfo.riskLevel)) : '未风评';
            let riskDate = (new Date(util.date82kebabCase(riskInfo.riskDate))).getTime();
            // console.log(riskDate);
            // 以下代码在ios上格式化时间存在兼容性问题
            // riskDate = new Date(`${riskInfo.riskDate.slice(0, 4)}-${riskInfo.riskDate.slice(4, 6)}-${riskInfo.riskDate.slice(6, 8)} 00:00:00`).getTime();
            // console.log(riskDate);
            let today = (new Date()).getTime();
            if (Number(riskInfo.riskLevel) === 0) {
              // 判断 riskLevel 0 未风评
              _this.fpVal = '未风评';
            } else if (today > riskDate) {
              // 判断风评过期
              _this.fpVal = '风评过期';
            } else if (Number(riskInfo.riskLevel) < Number(_this.riskRankCd)) {
              // 判断超风险
              _this.fpVal = '超风险';
            } else {
              _this.fpVal = '通过';
            }
          } else {
            _this.fpVal = '未风评';
          }
        } else {
          _this.fpVal = '未风评';
          if (res.header.errorCode !== 'FSMNFST17212') {
            errorAlert(res.header.errorMsg);
          }
        }
      });
    },

    // 查询合格投资者认证
    NMBMPSX3404 () {
      let _this = this;
      return _this.$tools.rpc('NMBMPSX3404', {}, {biz: true}).then(res => {
        if (res.header.errorCode === '0') {
          // 空串 没做
          // 0   已上传
          // 00  待审批
          // 01  驳回
          // 02  通过
          let data = res.body || {};
          if (data.astCheckStatus === '' && data.signCheckStatus === '') {
            // 首次
            _this.validateInvestorVal = '未完成';
            _this.isFirstValidate = true;
          } else {
            // 非首次
            _this.isFirstValidate = false;
            // eligInveAuthStatus: '', // 0","已完成"投资者认证，资产证明已完成, "00", "待审批", "01", "驳回", "02", "通过";
            if (data.eligInveAuthStatus === '02') {
              _this.validateInvestorVal = '已完成';
            } else {
              _this.validateInvestorVal = '未完成';
            }
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 获取行内总资产
    // async getTotalbal (cb) {
    //   // 获取卡列表
    //   await getBankList('1').then(res => {
    //     const accountInfoList = res.body.accountInfoList || [];
    //     this.$tools.rpc('NMBMPSX3133', { accounts: accountInfoList }).then(res => {
    //       if (res.header.errorCode === '0') {
    //         let totalbal = res.body.totalbal || '0';
    //         let biggerThenAimbal = +totalbal >= this.aimbal;
    //         cb && cb(biggerThenAimbal);
    //       } else {
    //         errorAlert(res.header.errorMsg);
    //       }
    //     });
    //   });
    // },

    // 为风险评估和合格投资者认证展示顶部提示，不进行弹窗报错提示
    riskAndValidatorOnlyInfo () {
      if (this.fpVal !== '未风评') {
        if (this.fpVal === '风评过期') {
        } else if (this.fpVal === '超风险') {
        } else if (this.validateInvestorVal === '未完成') {
          this.topTipType = 'validateInvestor';
        } else {
          this.topTipType = '';
        }
      } else {
        this.topTipType = 'riskAssess';
      }
    },

    // 更新弹窗为风险评估和合格投资者认证
    riskAndValidatorModalInfo () {
      let _this = this;
      if (this.fpVal !== '未风评') {
        if (this.fpVal === '风评过期') {
          this.renderModal(
            '您的风险等级已过期，请重新进行风险评估。',
            '取消',
            '重新风评',
            undefined,
            () => {
              _this.showModal = false;
              _this.$nextTick(() => {
                _this.goRiskEvaluate();
              });
            }
          );
          _this.showModal = true;
        } else if (this.fpVal === '超风险') {
          this.renderModal(
            '本产品的风险等级已超过您的风险承受能力，如需继续购买，请重新进行风险评估。',
            '取消',
            '重新风评',
            undefined,
            () => {
              _this.showModal = false;
              _this.$nextTick(() => {
                _this.goRiskEvaluate();
              });
            }
          );
          _this.showModal = true;
        } else if (this.validateInvestorVal === '未完成') {
          this.topTipType = 'validateInvestor';
          this.renderModal(
            '您暂未完成合格投资者认证，请先完成认证后再进行购买。',
            '好的',
            undefined,
            undefined,
            undefined
          );
          _this.showModal = true;
        } else {
          this.topTipType = '';
        }
      } else {
        this.topTipType = 'riskAssess';
        this.renderModal(
          '您暂未进行风险评估，请您亲临我行网点柜台进行风险评估。',
          '好的',
          undefined,
          undefined,
          undefined
        );
        _this.showModal = true;
      }
    },

    // 获取产品的相关文档信息
    NMBMPSX3398 () {
      let _this = this;
      /**
       * 产品合同 01
       * 认购风险申请书 02
       * 认购风险申请书之补充协议 03
       * 信托计划说明书 04
       * 产品发行公告 05
       * 电子签名约定书 06
       * 推介视频 07
       * 其他 99
       */
      _this.$tools.rpc('NMBMPSX3398', {
        prdCd: _this.prdCd,
        qryRowCnt: '1'
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (res.body.qryList3071 && res.body.qryList3071.length !== 0) {
            res.body.qryList3071.filter((e) => {
              return e.fileTyp !== '07';
            }).forEach((e, i) => {
              _this.$set(this.docList, i, e);
            });
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    // 查询当前用户在当前产品是否有在途订单
    NMBMPSX3410 () {
      let _this = this;
      return _this.$tools.rpc('NMBMPSX3410', {
        prdCd: _this.prdCd
      }).then(res => {
        if (res.header.errorCode === '0') {
          if (res.body.qryList3081 && res.body.qryList3081.length > 0) {
            _this.hasProcessingOrder = true;
            _this.topTipType = '';
            _this.processingOrderNo = res.body.qryList3081[0].orderNo;
            _this.processingOrderStep = res.body.qryList3081[0].orderStatus;
            // // 更新弹窗为在途订单, 并立即显示
            // _this.checkProcessingOrder();
            // _this.showModal = true;
          } else {
            _this.hasProcessingOrder = false;
            // _this.riskAndValidatorModalInfo(); // 更新弹窗为风险评估和合格投资者认证
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },
    checkProcessingOrder() {
      let _this = this;
      switch (_this.processingOrderStep) {
        case '0': // 预下单 -> 去读风险提示书
          _this.renderModal(
            '该产品订单购买未完成，是否继续？',
            '取消',
            '继续操作',
            undefined,
            () => {
              _this.showModal = false;
              _this.$nextTick(() => {
                _this.goRiskTipDoc();
              });
            }
          );
          _this.showModal = true;
          break;
        case '1': // 已签证未双录 -> 去双录
          _this.renderModal(
            '该产品订单购买未完成，是否继续？',
            '取消',
            '继续操作',
            undefined,
            () => {
              _this.showModal = false;
              _this.$nextTick(() => {
                _this.goBothWayRecordPrev();
              });
            }
          );
          _this.showModal = true;
          break;
        case '2': // 已签证已双录 -> 去正式下单
          _this.renderModal(
            '该产品订单购买未完成，是否继续？',
            '取消',
            '继续操作',
            undefined,
            () => {
              _this.showModal = false;
              _this.$nextTick(() => {
                _this.goFormalPurchase();
              });
            }
          );
          _this.showModal = true;
          break;
        case '3': // '3' 正式下单待审核 提示语待确认
          errorAlert('该产品购买订单已提交，正在审核中。');
          break;
        case '4': // '4' 正式下单审核通过 提示语待确认
          errorAlert('您已经购买该私募产品，如需追加购买，请先撤单。');
          break;
        case '5': // '5' 正式下单审核驳回 提示语待确认
          _this.renderModal(
              '您提交的购买本私募产品申请审核未通过，请重新提交。',
              '取消',
              '查看详情',
              undefined,
              () => {
                _this.showModal = false;
                _this.$nextTick(() => {
                  _this.goMaterialCheck();
                });
              }
            );
          _this.showModal = true;
          break;
      }
    },
    purchaseFn () {
      let _this = this;
      _this.getVideoPlayeStatus(() => {
        _this.goPreSubmitPurchase();
      }, () => {
        _this.renderModal(
          '为了保障您的权益，请您在认购前完整观看产品推介视频',
          '暂不观看',
          '前往观看',
          undefined,
          () => {
            _this.showModal = false;
            _this.$nextTick(() => {
              _this.goVideo('normalProcess');
            });
          }
        );
        _this.showModal = true;
      });
    },
    // 立即认购按钮
    async goNext () {
      if (!this.buyBtnActive) {
        return false;
      }
      let _this = this;
      try {
        await this.NMBMPSX3410(); // 查询在途订单
        if (
          this.fpVal === '通过' &&
          this.validateInvestorVal === '已完成' &&
          !this.hasProcessingOrder
        ) {
          _this.purchaseFn();
        } else if (  // 风险评估通过并且合格投资者认证已完成并且有在途订单
          this.fpVal === '通过' &&
          this.validateInvestorVal === '已完成' &&
          this.hasProcessingOrder) {
          _this.checkProcessingOrder();
        } else {
          // _this.showModal = true;
          _this.riskAndValidatorModalInfo();
        }
      } catch (error) {
        // errorAlert(error);
        console.log(error);
      }
    },

    // 更新弹框
    renderModal (desc, leftBtnText, rightBtnText, leftFn, rightFn) {
      // this.modalData.desc = desc;
      // this.modalData.leftBtn = leftBtnText || '好的';
      // this.modalData.rightBtn = rightBtnText || '';
      // this.modalData.leftFn = leftFn || (() => { this.showModal = false; });
      // this.modalData.rightFn = rightFn || (() => { this.showModal = false; });
      confirm("", desc, { okButton: rightBtnText || '', cancelButton: leftBtnText || '好的' }).then((res) => {
        if (res.ok) {
          rightFn();
        }
      });
    },

    /* ---------- 页面跳转 ---------- */
    // 前往重新审核页面
    goMaterialCheck () {
      pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {
        prdCd: this.prdCd,
        orderNo: this.processingOrderNo
      });
    },
    // 前往正式下单页面
    goFormalPurchase () {
      pushWindow('/ghb_trustBuy/mainProcess/fundPurchase.html', {
        prdCd: this.prdCd,
        orderNo: this.processingOrderNo,
        pageType: 'formalSubmit'
      });
    },

    // 前往预下单页面
    goPreSubmitPurchase () {
      pushWindow('/ghb_trustBuy/mainProcess/fundPurchase.html', {
        prdCd: this.prdCd,
        pageType: 'preSubmit'
      });
    },

    // 前往文档查看
    goPdfReader (url, title) {
      title = this.popDocName(title);
      pushWindow('/ghb_pdf/index/index.html', {
        pdfUrl: url,
        title: title,
        showButton: false
      }, {
        defaultTitle: title
      });
    },

    // 前往风险提示书页面
    goRiskTipDoc () {
      let _this = this;
      this.getDocUrl(this.prdCd, '02', function (url, name) {
        pushWindow('/ghb_pdf/index/index.html', {
          pdfUrl: url,
          title: '请阅读风险提示书',
          showButton: true,
          needCountdown: true,
          delay: 20,
          pushParams: {
            url: '/ghb_trustBuy/mainProcess/docCheck.html',
            options: {
              prdCd: _this.prdCd,
              orderNo: _this.processingOrderNo
            }
          },
          buttonText: '我已阅读并知晓风险内容，下一步'
        }, {
          defaultTitle: '请阅读风险提示书'
        });
      });
    },

    // 前往双录前置页面
    goBothWayRecordPrev () {
      pushWindow('/ghb_trustBuy/mainProcess/videoCheck.html', {
        prdCd: this.prdCd,
        orderNo: this.processingOrderNo
      });
    },

    // 前往风险评估页面
    goRiskEvaluate () {
      pushWindow('/ghb_assessment_questionnaire/assessment_questionnaire/trust_assessment_questionnaire.html');
    },

    // 前往合格投资者认证页面
    async goValidateInvestor () {
      await this.NMBMPSX3404(); // 查询合格投资者认证状态
      if (this.isFirstValidate) {
        pushWindow('/ghb_trustBuy/certification/index.html');
      } else {
        pushWindow('/ghb_trustBuy/certification/intermediate.html');
      }
    },

    // 去我的私募页面
    goMyPrivatePage () {
      pushWindow('/ghb_trust_fund/trust_fund/index.html', {
        defaultIndex: '1'
      });
    },

    // 前往视频观看页面
    goVideo (type) {
      let params = {
        prdCd: this.prdCd,
        prdName: this.prdName,
        prdInit: this.prdInit,
        recomVid: this.recomVid,
        recomVidDocCpcty: this.recomVidDocCpcty
      };
      pushWindow('/ghb_trustBuy/mainProcess/videoWatch.html', {
        type: type,
        ...params
      });
    },

    // 页面返回动作触发的方法
    back () {
      if(util.compareVersion(this.deviceVersion, this.version) < 0 && window.App.device.os == "ios") {
        //旧包 并且是ios
        this.fromStatement && popSomeWindow(1);
      } else {
        this.fromStatement ? popSomeWindow(2) : popSomeWindow(1);
      }
    },

    async getVersion () {
      let version = await getVersionInfo();
      this.deviceVersion = version.versionNumber.substr(1);
      console.log(' this.deviceVersion :', this.deviceVersion);
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

<style lang="scss" scoped>
@import '~@core/public/less/mixin.less';

.top-border:after {
  top: 0;
}

.fundDetailWrap {
  padding-bottom: 100px;

  .contentWrap {
    overflow: auto;
  }

  .topTipBox {
    position: relative;
    width: 100%;
    overflow: auto;

    .validateInvestorTipBox {
      width: 100%;
      height: 45px;
      background-color: rgba(9, 18, 43, 0.24);
    }

    .topFundInfomationContent {
      position: relative;
      height: 217px;
      overflow: auto;
    }

    .fundTitleBox {
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      margin-top: 12px;
      padding: 0 20px;
    }

    .annualInterestRateBox {
      position: absolute;
      top: 67px;
      width: 100%;
      text-align: center;

      .rateVal {
        height: 36px;
        line-height: 36px;
        font-size: 30px;
        font-weight: 600;

        .unit {
          font-size: 16px;
          margin-left: 2.5px;
        }
      }

      .rateTip {
        opacity: 0.7;
        height: 16px;
        line-height: 16px;
        font-size: 13px;
        margin-top: 1px;
      }
    }

    .fundAbstractBox.default-fundAbstractBg {
      background-color: rgba(122, 67, 10, 0.12);
    }

    .fundAbstractBox.advanced-fundAbstractBg {
      background-image: linear-gradient(135deg, #696B7B 0%, #3F4151 100%);
    }

    .fundAbstractBox.personal-fundAbstractBg {
      background-image: linear-gradient(135deg, #464749 0%, #464749 100%);
    }

    .fundAbstractBox {
      position: absolute;
      display: flex;
      bottom: 0;
      left: 0;
      height: 81px;
      width: 100%;

      .abstractItem {
        flex: 1;
        text-align: center;

        .title {
          height: 16px;
          line-height: 16px;
          font-size: 13px;
          margin-top: 10px;
          opacity: .7;
        }

        .val {
          height: 16px;
          line-height: 16px;
          font-size: 14px;
          margin-top: 8px;
        }

        .additional {
          height: 16px;
          line-height: 16px;
          font-size: 10px;
          margin-top: 0.3px;
          opacity: .7;
        }
      }
    }

    .customerTypeBox.default-customerTypeBox {
      background-color: rgba(122, 67, 10, 0.14);
    }

    .customerTypeBox.advanced-customerTypeBox {
      background-color: #D3BC99;
    }

    .customerTypeBox.personal-customerTypeBox {
      background-color: #D3BC99;
    }

    .customerTypeBox {
      position: absolute;
      box-sizing: border-box;
      right: 0;
      width: 86px;
      top: 72px;
      height: 26px;
      line-height: 26px;
      border-top-left-radius: 13px;
      border-bottom-left-radius: 13px;
      font-size: 12px;
      padding: 0 10px;

      .content {
        height: 26px;
        line-height: 26px;
        text-align: center;
      }
    }

    .ratingBox {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -90px;
      width: 180px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;

      .ratingInfo {
        margin-left: 20px;
      }
    }
  }

  .fundTimeInfoBox {
    position: relative;
    width: 100%;
    height: 120px;

    .time {
      font-size: 10px;
      line-height: 12px;
    }

    .timeDesc {
      font-size: 13px;
      line-height: 16px;
      margin-top: 5px;
    }

    .desc {
      position: absolute;
      bottom: 22px;
      height: 18px;
      width: 100%;
      line-height: 18px;
      font-size: 13px;
      text-align: center;
    }
  }

  .infoBox {
    .infoContent {
      margin: 0 15px;
      padding: 16px 0;

      .tradeTitle {
        font-size: 13px;
        line-height: 20px;
        margin: 10px 0;
      }

      .tradeContent {
        font-size: 13px;
        line-height: 20px;
      }

      .introduceItem + .introduceItem {
        margin-top: 8px;
      }

      .introduceItem {
        display: flex;
        line-height: 20px;
        font-size: 13px;

        .infoTitle {
          // width: 90px;
          padding-right: 20px;
          white-space: nowrap;
        }

        .infoVal {
          flex: 1;
        }
      }
    }
  }

  /deep/ .no-border-cell .app-cell-content:after {
    display: none !important;
    content: '' !important;
    border-bottom: 0 !important;
  }

  .videoPromoteBox {
    .infoContent {
      display: flex;
      align-items: center;
      justify-content: center;

      .flexItem {
        flex: 1
      }

      .videoBox {
        width: 164px;
        height: 104px;
        border-radius: 10px;

        .playMask {
          position: relative;
          top: 32px;
          left: 62px;
          width: 40px;
          height: 40px;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.4);
        }
      }

      .videoTip {
        padding-left: 20px;
        font-size: 13px;
        line-height: 20px;
      }
    }
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

  .bottomFixedBottomGroup {
    // position: fixed;
    // bottom: 0;
    .positionBottom();
    width: 100%;
    display: flex;

    .collectBtn {
      width: 82px;
      height: 45px;
      text-align: center;

      .icon {
        margin-top: 6.5px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
      }

      .text {
        margin-top: 4.5px;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
    }

    .flexItem {
      flex: 1;
    }
  }
}
</style>

<style lang="less">
@import '../../style/mixin.less';

.fundDetailWrap {
  .videoBox {
    .setBackgroundModuleImage('videoBGMin.png');
  }
  .playMask {
    .setBackgroundModuleImage('player-play.png');
    background-position: 13px 10px;
    background-size: 50% 50%;
  }
  // 顶部背景图
  .topTipBox.default-topBg {
    .setBackgroundModuleImage('default-topBg.png');
  }
  .topTipBox.advanced-topBg {
    .setBackgroundModuleImage('advanced-topBg.png');
  }
  .topTipBox.personal-topBg {
    .setBackgroundModuleImage('personal-topBg.png');
  }

  // 顶部风险评级
  .ratingBox.default-fengxdjbg {
    .setBackgroundModuleImage('default-fengxdjbg.png');
  }
  .ratingBox.advanced-fengxdjbg {
    .setBackgroundModuleImage('advanced-fengxdjbg.png');
  }
  .ratingBox.personal-fengxdjbg {
    .setBackgroundModuleImage('personal-fengxdjbg.png');
  }

  .topTipHeadIcon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    .setBackgroundModuleImage('topTipHeadIcon.png');
  }
}

.word-pl {
  padding-left: 14px !important;
}
</style>

<style lang="less">
@font-face {
  font-family: "iconfont";
  src: url('../../font/iconfont.eot?t=1585494066247');
  src: url('../../font/iconfont.eot?t=1585494066247#iefix') format('embedded-opentype'),
  url('../../font/iconfont.ttf?t=1585494066247') format('truetype'),
  url('../../font/iconfont.woff?t=1585494066247') format('woff'),
  url('../../font/iconfont.svg?t=1585494066247#iconfont') format('svg'),
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOsAAsAAAAAB4gAAANeAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCcIJCATYCJAMMCwgABCAFhG0HNhuIBlGUDUaY7GuoIjI5PYMEbJcTKAT4tHTmFMA0OMgv6GXJ1pY7xp95cMQDiQf6cf+diy+ia3c6rL5dKP2HulBonE7Hd/9z2xwp5V7HI8k0aZ/cn/jtsEQiVSqpQIgQGj0x9BfIKYdcgJkkmkDbjc5c21Fn9xs6F/CAo3Q6qsALHdDAdzTQSC5qgwKu/4FrtrVmUINE8jAbbFaFN6toHW0fbf/4+JhJB9f8x/3UvxLPt0qnyKDs83+jAU5wQNFFtgHiFtldgVjkdgLKdWuQ1882e6kiM/sFhDOBZ0mVjE1uqAxKBcUVU/N4uKNIabwa37gd/D58Nh9KiYoSc6cNx6auNHhHP0wpxJ60a+N5wM8iYZIkE/ZV+nZQo+QkVbmq05oLi2VBHCtSGIFMMxSv9I8XCcXM8kowilORd+RwCPwwJeL8AxRH6XMk96mpse+RYWqAQA7katUhG2UJqHgE9iSQxoF2v1zBw0zCmK8cNhyca9nZnWoUVCT6uqQP0wDNOUMqLlUJhFTj4N7InCBXEwcs2Kk8OV0OGIPxhbfVmN9KDru2e8YuQ/vGP2QeAHkz/cq9+Nd/4L4SXslBiZn0zeFf6aXU/xf3bbU2Qonfi18r4e3efTpNxgjpWxS/a1uoK9D/a9n9H/yrWxIJHV7fLNfeNwv/AercuTM2GhG3+ykau+X1R+my1wa4bCXIAclDMCfPt+hXHJWw2HIPLopk9ae/2fTQUhy54IIOoPCaUzodpclBiv7Mft7sl44a5XNaWs/g7TMGErgcFqD0vP2B/2DJNSCrNKVpS1mRVOvv0LBka894RLkVokBC9X79DU1aOUGppgSiEl2QlBrEZMIkFKmwCMVKLUG5CfPZFRoQVchlGPdAENR6QVTtASS1PphM+EKRZn8oVhsSlNsWWLLCcDhZk9BidMG+QeBkqbCdXAsrt+idYovSyoB4RCqDCHRbnXxmjinSGCPKs9djFiAoS2CGdsM4ziCnLESHWz5z3m+3RdWHWk6WSDXrEGRhyAVsNyDgyKSEV5/VCt/fQp6TmIUaUFXxI0RKQeOgq6UDwMx1KQh1LbeUzjw9jAlAIJkEmCEPiq1kBuTVnULIwVr8HvFcX5vUElBda35D8gClfBXmmBRiSCHLl9ki3fV2JQkAAA==') format('woff2');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-collect-empty:before {
  content: "\e672";
}

.icon-collect-full:before {
  content: "\f0d4";
}
</style>