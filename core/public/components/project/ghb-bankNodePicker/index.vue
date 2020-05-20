<!--
 * @Author: 
 * @Date: 2019-08-26 09:30:03
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-06 17:12:52
 * @Description: 
 -->
<template>
  <div class="ghb-bank-node-picker">
    <div class="ghb-bank-node-picker-cell vux-tap-active">
      <div class="left">
        <p>开户网点</p>
      </div>
      <div class="right">
        <p v-if="!currentBanknode.label" style="color: #c1c1c1">请选择</p>
        <p v-if="currentBanknode.label">{{`${currentProvince.label} ${currentCity.label}`}}</p>
        <p v-if="currentBanknode.label" style="fontSize:12px">{{currentBanknode.label}}</p>
      </div>
      <div class="arraw ghb_arrow"></div>
    </div>
    <div class="ghb-bank-node-picker-popup" v-transfer-dom>
      <popup v-model="currentValue" height="80%" @on-hide="hidePopupHandler">
        <div class="popup-content">
          <div class="popup-content-title">
            <div class="texr">选择网点</div>
            <div class="icon" @click="closePopup">
              <img src="./images/close@2x.png" alt>
            </div>
          </div>
          <!-- <m-group>
            <search v-model="searchValue" needCancleButton @cancle="cancleSearch" @on-blur="searchInputBlurHandler"></search>
          </m-group>-->
          <div class="popup-content-tab" :style="{width: tabWidth}" v-if="!searchModel">
            <div class="popup-content-tab-wrap">
              <tab
                :line-width="3"
                :custom-bar-width="'20px'"
                ref="tab"
                :costumBarStyle="costumTabBarStyle"
              >
                <tab-item
                  :selected="tabSelected === '0'"
                  @on-item-click="tabItemHandler('0')"
                >{{currentProvince.label ? currentProvince.label : placeholder}}</tab-item>
                <tab-item
                  v-if="currentProvince.label"
                  :selected="tabSelected === '1'"
                  @on-item-click="tabItemHandler('1')"
                >{{currentCity.label ? currentCity.label : placeholder}}</tab-item>
                <tab-item
                  v-if="currentCity.label"
                  :selected="tabSelected === '2'"
                  @on-item-click="tabItemHandler('2')"
                >{{currentBanknode.label ? currentBanknode.label : '\&nbsp;\&nbsp;\&nbsp;请选择'}}</tab-item>
              </tab>
            </div>
          </div>
          <div class="popup-content-content" v-if="!searchModel" :style="{height: getHeight}">
            <swiper
              height="100%"
              :threshold="200"
              :show-dot="false"
              v-model="swiperIndex"
              @on-index-change="swiperChange"
            >
              <swiper-item>
                <scroll :data="provinceList">
                  <ul>
                    <li
                      v-for="(item, index) in provinceList"
                      :key="index"
                      @click="provinceClickHandler(item)"
                    >
                      <img
                        v-if="item.label === currentProvince.label"
                        src="./images/yes@2x.png"
                        alt
                      >
                      <span>{{item.label}}</span>
                    </li>
                  </ul>
                </scroll>
              </swiper-item>
              <swiper-item>
                <no-data text="暂无城市" v-if="cityList.length <= 0"></no-data>
                <scroll v-else :data="cityList">
                  <ul>
                    <li
                      v-for="(item, index) in cityList"
                      :key="index"
                      @click="cityClickHandler(item)"
                    >
                      <img v-if="item.label === currentCity.label" src="./images/yes@2x.png" alt>
                      {{item.label}}
                    </li>
                  </ul>
                </scroll>
              </swiper-item>
              <swiper-item>
                <no-data text="暂无网点" v-if="banknodeList.length <= 0"></no-data>
                <scroll 
                  v-else
                  class="wrapper"
                  :data="banknodeList"
                  ref="scroll"
                  :pullUpLoad="pullUpLoadObj"
                  :pullDownRefresh="pullDownRefreshObj"
                  @pullingDown="refreshData"
                  @pullingUp="loadMore"
                  >
                  <ul>
                    <li
                      v-for="(item, index) in banknodeList"
                      :key="index"
                      @click="banknodeClickHandler(item)"
                    >
                      <img
                        v-if="item.label === currentBanknode.label"
                        src="./images/yes@2x.png"
                        alt
                      >
                      {{item.label}}
                    </li>
                  </ul>
                </scroll>
              </swiper-item>
            </swiper>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { Swiper, SwiperItem, Popup, TransferDom } from "vux";
import { PROVINCE, CITY } from "./utils/areaData";
import scroll from "@comps/BScroll/newScroll";
import cell from "@base/v-cell";
import Tab from "@base/v-tab/tab";
import TabItem from "@base/v-tab/tab-item";
import noData from "./components/noDataTip";
import { apiList } from "./utils/api";
import search from "@comps/ghb-search";
import {getSessionStorage} from '@bridge';
export default {
  name: "ghb-bank-node-picker",
  directives: {
    TransferDom
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    searchInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
    Popup,
    cell,
    Tab,
    scroll,
    TabItem,
    noData,
    search
  },
  data() {
    return {
      swiperIndex: 0, // 当前swiper
      tabSelected: "0", // 当前tab
      currentValue: false, // 控制popup的显示隐藏
      provinceList: [],
      cityList: [],
      banknodeList: [],
      placeholder: "请选择",
      currentProvince: {},
      currentCity: {},
      currentBanknode: {},
      areaSelectList: [],
      searchValue: "", // 搜索框输入内容
      searchModel: false,
      pullup: true,
      bankNodePageNo: 1,
      bankNodePageSize: 20,
      totalSize: 0,
      phoneVersion: '99'
      // costumTabBarStyle: {}
    };
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
      this.$emit("input", newVal);
    },
    currentValue(newVal) {
      this.$emit("input", newVal);
      this.provinceList = PROVINCE;
    },
    searchInfo: {
      handler(newVal) {
        if (newVal && !_.isEmpty(newVal)) {
          this.initBankNode();
        }
      },
      immediate: true,
      deep: true
    }
  },
  async created () {
    let res = await getSessionStorage('headerInfo');
    const {headerInfo = {}} = res;
    this.phoneVersion = headerInfo.phonesysVersion.split('.')[0];
  },
  mounted() {
    console.log("选择网点传入的收款人信息", this.searchInfo);
  },
  computed: {
    /**
     * 获取面板高度
     * 解决ios9一下版本popup设置为flex1会没有高度问题
     */
    getHeight () {
      if(window.App.device.os === 'ios' && Number(this.phoneVersion) <= 10) {
        return "405px"
      }
      return ''
    },
    costumTabBarStyle() {
      if (this.currentProvince.label) {
        if (this.currentCity.label) {
          return { left: "-20%" };
        }
        return {};
      } else {
        return {};
      }
    },
    tabWidth() {
      if (this.currentProvince.label) {
        if (this.currentCity.label) {
          return "7.5rem";
        }
        return "2.4rem";
      } else {
        return "1.2rem";
      }
    },
    pullUpLoadObj () {
      return this.pullup ? {
        threshold: -20,
        txt: {more: '上拉加载更多', noMore: '—— 嗨，您已经拉到底了哦 ——'}
      } : false;
    },
    pullDownRefreshObj () {
      return this.pulldown ? {
        threshold: 30,
        stop: 50,
        txt: '刷新成功'
      } : false;
    }
  },
  methods: {
    // 初始化
    initBankNode(opt) {
      this.currentProvince = {
        code: this.searchInfo.provinceCode,
        label: this.searchInfo.provinceName
      };
      this.currentCity = {
        code: this.searchInfo.cityCode,
        label: this.searchInfo.cityName,
        parent: this.searchInfo.provinceCode
      };
      this.currentBanknode = {
        bankId: this.searchInfo.bankId,
        label: this.searchInfo.branchName
      };
    },
    // 下拉刷新方法
    refreshData () {
      /**
       * 模仿真实请求
       */
      // 延迟获取数据
      setTimeout(() => {
        // 把获取到的数据添加到数组里面
        this.dataList = []; // 清空数据
        this.loadData(10);
        if(this.dataList.length < this.count) {
          this.hasMore = true;
          this.$refs.scroll.pullUpDirty = true;
          console.log('是否还有更多', this.hasMore);
        };
      }, 5000);
    },
    // 上拉加载更多方法
    loadMore () {
      console.log('上拉加载更多');
      if(this.banknodeList.length >= this.totalSize) {
        this.$refs.scroll.forceUpdate(false);
        return;
      }
      this.searchBanknode("", this.currentCity.code).then(res => {
        res.body.BankNoList.forEach(item => {
          let opt = {
            label: item.rcvBankBranchName,
            bankId: item.rcvBankBranch
          };
          this.banknodeList.push(opt);
        });
        console.log('目前的网点数量', this.banknodeList.length);
        if(this.banknodeList.length >= this.totalSize) {
          this.$refs.scroll.forceUpdate(false);
        } else {
          this.$refs.scroll.forceUpdate(true);
        }
        this.bankNodePageNo ++;
      });
    },
    /**
     * @description 取消搜索
     */
    cancleSearch() {
      this.searchValue = "";
    },
    /**
     * @description 搜索框失焦事件
     */
    searchInputBlurHandler() {
      if (!this.searchValue) {
        return;
      }
      let parms = {
        provinceCode: "",
        cityCode: "",
        rcvBankName: this.searchValue,
        pathId: "HVPS",
        // pathId: this.data.pathId,
        bankCode: "",
        pageNo: 1,
        pageSize: 20
      };
      this.$tools.rpc(apiList.queryBankNode, parms).then(res => {
        const banknodeList = res.body.BankNoList.map(item => {
          return {
            label: item.rcvBankBranchName,
            bankId: item.rcvBankBranch
          };
        });
        this.searchDataList = banknodeList;
        console.log("搜索的网点列表", banknodeList);
        this.searchModel = true;
      });
    },
    closePopup() {
      this.currentValue = false;
      this.$emit("close");
    },
    /**
     * @description swiper改变时触发
     */
    swiperChange(index) {
      console.log("选择", index);
      this.tabSelected = index + "";
      if (index === 0) {
        return;
      }
      if (index === 1) {
        return;
      }
      if (index === 2) {
      }
    },
    /**
     * @description 点击tab时触发
     */
    tabItemHandler(val) {
      if (val === "0") {
        this.swiperIndex = 0;
        return;
      }
      if (val === "1") {
        this.swiperIndex = 1;
        return;
      }
      if (val === "2") {
        this.swiperIndex = 2;
      }
    },
    /**
     * @description 选择了省份时触发
     */
    provinceClickHandler(item) {
      // 先清空城市，网点数据
      this.currentCity = {};
      this.currentBanknode = {};

      this.areaSelectList = [];
      this.areaSelectList.push(item);

      // 赋值
      this.currentProvince = item;

      this.queryCity().then(res => {
        const { cityList } = res.body
        this.cityList = cityList.map(item => {
          return {
            code: item.cityCode,
            label: item.cityName
          }
        })
        console.log("城市列表", item, this.cityList);
        this.tabSelected = "1";
        this.swiperIndex = 1;
      })
      
    },
    /**
     * @description 选择了城市时触发
     */
    cityClickHandler(item) {
      // 先清空网点数据
      this.bankNodePageNo = 1;
      this.currentBanknode = {};
      // 请求网店数据
      this.searchBanknode("", item.code).then(res => {
        const banknodeList = res.body.BankNoList.map(item => {
          return {
            label: item.rcvBankBranchName,
            bankId: item.rcvBankBranch
          };
        });
        console.log("看看银行数据", banknodeList);
        this.totalSize = res.body.totalSize;
        console.log(this.totalSize);
        this.bankNodePageNo ++; // 翻页
        this.banknodeList = banknodeList;
        this.currentCity = item;
        this.areaSelectList.push(item);
        this.tabSelected = "2";
        this.swiperIndex = 2;
      });
    },
    /**
     * @description 选择了网点时触发
     */
    banknodeClickHandler(item) {
      this.areaSelectList.push(item);
      this.currentBanknode = item;
      const opt = {
        province: this.currentProvince,
        city: this.currentCity,
        banknode: this.currentBanknode
      };
      // console.log(''opt);
      this.$emit("on-change", opt, this.areaSelectList);
      this.$emit("input", false);
    },
    /**
     * @description 关闭Popup时触发，如果没有选择网点，则使用初始时候的值
     */
    hidePopupHandler() {
      if(this.$tools.isEmptyObject(this.currentBanknode)) {
        this.initBankNode();
      }
    },
    queryCity () {
      let params = {
        provinceCode: this.currentProvince.code
      }
      return this.$tools.rpc(apiList.queryCity, params);
    },
    //查询网点
    searchBanknode(nodeName, code) {
      let params = {
        provinceCode: this.currentProvince.code,
        cityCode: code,
        rcvBankName: nodeName || this.searchInfo.bankName,
        pathId: "HVPS",
        // pathId: this.data.pathId,
        bankCode: this.searchInfo.bankId,
        pageNo: this.bankNodePageNo,
        pageSize: this.bankNodePageSize
      };
      return this.$tools.rpc(apiList.queryBankNode, params);
    },
    areaClickHandler(val) {
      if (val === "p") {
        this.tabSelected = "1";
      } else if (val === "c") {
        this.tabSelected = "2";
      } else if (val === "b") {
        this.tabSelected = "0";
      }
    }
  }
};
</script>
<style lang="less">
@import "~@core/public/less/mixin.less";
.ghb-bank-node-picker {
  min-height: @lh-line;
  &-cell {
    padding: 12px @spacing;
    justify-content: space-between;
    display: flex;
    font-size: @fs30;
    .left {
    }
    .right {
      flex: 1;
      text-align: right;
      color: @font-t1;
    }
    .arraw {
      width: 0.2rem;
    }
  }
  &-popup {
    .vux-popup-dialog {
      border-radius: 0.4rem 0.4rem 0 0;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0.32rem 0;
    }
    .popup-content {
      height: 100%;
      background-color: #fff;

      .flex;
      flex-direction: column;
      &-tab {
        overflow: hidden;
        padding: 0 @spacing;
        .vux-tab .vux-tab-item {
          font-size: 12px;
          background: none;
          width: 1.2rem;
          flex: none;
          &:nth-child(3) {
            // flex:1;
            width: 4.2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
          }
        }
      }
      &-title {
        .flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 @spacing;
        .icon {
          .setIconSize(0.4rem, 0.4rem);
        }
      }
      &-content {
        flex: 1;
        padding: 0 @spacing;
        .vux-slider {
          height: 100%;
          overflow: auto;
        }
        .vux-indicator {
          display: none;
        }
        .wrapper{
          position: relative;
        }
        ul {
          height: 100%;
          overflow: auto;
          li {
            font-size: @fs24;
            padding: 0.2rem;
            .flex;
            align-items: center;
            // justify-content: space-between;
            img {
              display: block;
              width: 12px;
              height: 8.3px;
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
}
.ghb_arrow {
  position: relative;
  &::after {
    content: " ";
    display: inline-block;
    height: 0.12rem;
    width: 0.12rem;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    position: absolute;
    top: 50%;
    margin-top: -0.12rem;
    right: 0;
    transition: transform 0.3s;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(0deg);
  }
}
.vux-tap-active {
  tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
}
.vux-tap-active:active {
  background-color: #ececec;
}

.area-active {
}
</style>