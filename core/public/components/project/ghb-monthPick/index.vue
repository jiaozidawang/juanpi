<!--
 * @Author: liuyunxiao
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-02 10:51:26
 * @Description:
 -->
<template>
  <div class="ghb-month-picker">
    <div class="ghb-month-picker-init">
      <div class="by-month" @click="clickMonthSelect">
        <span v-if="!isSelected" class="default">请选择</span>
        <span v-else>{{`${currentYear} - ${currentMonth}`}}</span>
        <div class="tip lowOpacity" :class="['tip_' + byMonthArrow]"></div>
      </div>
    </div>
    <picker
      v-transfer-dom
      ref="monthPicker"
      :data="byMonthData"
      @selectHandler="handleSelect"
      :selectedIndex="byMonthSelectIndex"
    ></picker>
  </div>
</template>
<script>
import picker from "@comps/ghb-picker";
import {TransferDom} from 'vux';
import { showDatePicker } from '@bridge';
import { yearList, monthList, getYearIndex } from "./utils/dateData";
export default {
  name: "ghb-month-picker",
  directives: {
    TransferDom
  },
  props: {
    /**
     * @desc 是否选择过
     */
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    picker,
    showDatePicker
  },
  data() {
    return {
      byMonthData: [yearList, monthList],
      byMonthSelectIndex: [0, 0], // 按月份查询选择器默认选择
      byMonthArrow: 'down'
    };
  },
  created() {
    const _self = this;
    let currentDateInfo = _self.$tools.getCurrentDate();
    _self.currentYear = currentDateInfo.yy
    _self.currentMonth = currentDateInfo.MM;
    // 获取按月查询默认年份
    const defaultSelectYear = getYearIndex(currentDateInfo.yy);
    // 设置按月查询选择器默认值
    _self.byMonthSelectIndex = [[defaultSelectYear], [currentDateInfo.MM]];
  },
  methods: {
    reset() {
      let currentDateInfo = this.$tools.getCurrentDate();
      this.currentYear = currentDateInfo.yy
      this.currentMonth = currentDateInfo.MM;
      this.$forceUpdate();
    },
    handleSelect(opt) {
      let _self = this;
      if (opt.action == "hide") {
        _self.byMonthArrow = "down";
        return;
      }

      if (opt.action == "confirm") {
        _self.currentYear = opt.text[0];
        _self.currentMonth = opt.text[1];
        _self.$emit('confirm', {year: _self.currentYear, month: _self.currentMonth});
      }
    },
    // 点击按月份搜索的时间框
    clickMonthSelect () {
      if(this.byMonthArrow == 'up') {
        this.byMonthArrow = 'down';
        return;
      };
      let picker = this.$refs.monthPicker;
      picker.show();
      this.byMonthArrow = 'up';
    }
  }
};
</script>
<style lang="less">
@import '~@core/public/less/mixin.less';
.ghb-month-picker {
  .by-month {
    margin: .1rem 0 .1rem .32rem;
    width: 2.96rem;
    height: .7rem;
    background-color: #f2f4f7;
    /* padding: 0 .5rem; */
    box-sizing: border-box;
    border-radius: .04rem;
    color: #888;
    font-size: .28rem;
    line-height: .7rem;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    span {
      padding: 0;
      // width: 100%;
      margin-right: 4px;
    }
    .tip {
      .setBgIcon("~@assets/base/arrowSanjiao@2x.png", 0.15rem);
      // position: absolute;
      // right: 0.56rem;
      // top: 38%;
      transform: translateY(-50%);
      transition: transform 0.3s;
    }
  }
  .default{
    text-align: center;
    color: @font-t2;
  }

  .lowOpacity {
    opacity: 0.5;
  }
}
</style>
