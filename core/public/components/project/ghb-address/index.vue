<template>
<div class="ghb-address" v-transfer-dom>
  <popup height="80%" v-model="currentValue">
    <div class="ghb-address-init">


      <div class="ghb-address-init-header-wrap">
         <!-- 头部 -->
        <div class="ghb-address-init-header">
          <div class="ghb-address-init-header-title">
            <span>{{title}}</span>
          </div>
          <div class="ghb-address-init-header-icon">
            <i class="ghb-address-init-header-icon__icon"></i>
          </div>
        </div>
        <!-- 面包屑 -->
        <div class="ghb-address-init-breadcrumbs">
          <div class="pro " :class="{'breadcrumbs-active': tapSelect == '0'}" @click="tap('0')">{{selectedPro.provinceName}}</div>
          <div class="pro " :class="{'breadcrumbs-active': tapSelect == '1'}" @click="tap('1')">{{selectedCity.cityName}}</div>
          <!-- <div class="pro " :class="{'breadcrumbs-active': tapSelect == '2'}" @click="tap('2')">{{selectedCon.conName}}</div> -->
        </div>
      </div>



      <div class="ghb-address-init-content">
        <!-- <div class="ghb-address-init-content-wrap"> -->
          <ul class="ghb-address-wrap" ref="proBlock" v-if="tapSelect == '0'">
          <li
            class="ghb-address-item pro-ul"
            v-for="item in proList"
            :key="item.provinceCode"
            :class="{'checked': selectedPro.provinceCode == item.provinceCode}"
            @click="proClick(item)"
            >
            <span>{{item.provinceName}}</span>
            <i class="ghb-address-item-icon"></i>
          </li>
        </ul>

        <ul class="ghb-address-wrap city-ul" ref="cityBlock" v-if="tapSelect == '1'">
          <li
            class="ghb-address-item"
            v-for="item in cityList"
            :key="item.cityCode"
            :class="{'checked': selectedCity.cityCode == item.cityCode}"
            @click="cityClick(item)"
            >
            <span>{{item.cityName}}</span>
            <i class="ghb-address-item-icon"></i>
          </li>
        </ul>
        </div>

      <!-- </div> -->
    </div>
  </popup>

</div>
</template>
<script>
import { Popup, TransferDom } from 'vux';
import bind from '../mixins/bind.js'
export default {
  name: "ghb-address",
  directives: {
    TransferDom
  },
  props: {
    value: false,
    title: {
      type: String,
      default: '请选择所在地区'
    }
  },
  components: {
    Popup
  },
  data () {
    return {
      proList: [
        {provinceCode: '0', provinceName: '广东省'},
        {provinceCode: '1', provinceName: '广东省'},
        {provinceCode: '2', provinceName: '广东省'},
        {provinceCode: '3', provinceName: '广东省'},
        {provinceCode: '4', provinceName: '广东省'},
        {provinceCode: '5', provinceName: '广东省'},
        {provinceCode: '6', provinceName: '广东省'},
        {provinceCode: '7', provinceName: '广东省'},
        {provinceCode: '8', provinceName: '广东省'},
        {provinceCode: '9', provinceName: '广东省'},
        {provinceCode: '10', provinceName: '广东省'},
        {provinceCode: '11', provinceName: '广东省'},
        {provinceCode: '12', provinceName: '广东省'},
        {provinceCode: '13', provinceName: '广东省'},
        {provinceCode: '14', provinceName: '广东省'},
        {provinceCode: '15', provinceName: '广东省'},
        {provinceCode: '16', provinceName: '广东省'},
        {provinceCode: '17', provinceName: '广东省'},
        {provinceCode: '18', provinceName: '广东省'},
        {provinceCode: '19', provinceName: '广东省'},
        {provinceCode: '20', provinceName: '广东省'},
        {provinceCode: '21', provinceName: '广东省'},
        {provinceCode: '22', provinceName: '广东省'},
        {provinceCode: '23', provinceName: '广东省'},
        {provinceCode: '24', provinceName: '广东省'},
        {provinceCode: '25', provinceName: '广东省'},
        {provinceCode: '26', provinceName: '广东省'},
        {provinceCode: '27', provinceName: '广东省'},
        {provinceCode: '28', provinceName: '广东省'},
        {provinceCode: '29', provinceName: '广东省'},
        {provinceCode: '30', provinceName: '广东省'}
      ],
      cityList: [],
      proSelect: '0',
      tapSelect: '0',
      selectedPro: {provinceCode:'', provinceName: '选择省'},
      selectedCity: {cityCode:'', cityName: '选择市'},
      // selectedCon: {conCode:'', conName: '选择区县'}
    }
  },
  mixins: [bind],
  created () {
    // this._addressInit();
  },
  methods: {
    _addressInit () {
      this.$tools.rpc('NMBMPSX3031').then(res => {
        const {provinceList} = res.body;
        this.proList = provinceList;
      })
    },
    proClick(val) {
      this.selectedPro = val;
      this.NMBMPSX3032().then(res => {
        this.cityList = res.body.cityList;
        this.tapSelect = '1';
      })
    },
    cityClick (val) {
      this.selectedCity = val;
      // this.tapSelect = '1'
    },
    tap (val) {
      this.tapSelect = val;
    },
    NMBMPSX3032 () {
      let params = {
        provinceCode: this.selectedPro.provinceCode
      };
      return this.$tools.rpc('NMBMPSX3032', params);
    }
  }
}
</script>

<style lang="less">
@import '~@core/public/less/mixin.less';

.ghbAddressFlexLine () {
  display: flex;
  height: @lh-line;
  justify-content: space-between;
  align-items: center;
  padding: 0 @spacing;
}

.ghb-address-init{
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  &-header-wrap{
    position: relative;
    &::before {
      .setBottomLine
    }
  }
  &-header{
    font-size: @fs36;
    font-weight: bold;
    .ghbAddressFlexLine
  }
  &-breadcrumbs{
    .ghbAddressFlexLine;
    justify-content: flex-start;

    .pro{
      &:not(:first-child){
        margin-left: .2rem;
      }
    }
  }
  &-content{
    flex: 1;
    overflow: auto;

  }
  .ghb-address-init-header-icon__icon{
    .setBgIcon('~@assets/base/cha@2x.png', .25rem);
  }
}

// .city-ul{
//   transform: translateX(100%);
// }

// .ghb-address-init-content-wrap{
//   display: flex;
//   // width: 200%;
// }

.ghb-address-wrap{
  width: 7.5rem;
  box-sizing: border-box;
  transition: transform .5s ease-in-out;
  .ghb-address-item {
    line-height: .7rem;
    padding: 0 @spacing;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    height: .7rem;
    &:active {
      background: rgba(0, 0, 0, .1);
    }
  }
}

.breadcrumbs-active {
  color: @color-main;
}

.checked{
  color: @color-main;
  .ghb-address-item-icon{
    .setBgIcon2('~@assets/base/suozdq_icon_gou_selected@2x.png', .3rem, .2rem);
  }
}
</style>
