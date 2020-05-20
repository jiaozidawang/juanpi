<template>
  <div class="ghb-month-picker">
    <m-group>
      <cell :title="title" :value="finallyValue || placeholder" isLink @clickHandler="clickMonthSelect"></cell>
    </m-group>
    <picker
      v-transfer-dom
      ref="circlePicker"
      :data="linkageData"
      @selectHandler="handleSelect"
      @change="handleChange"
      :selectedIndex="byMonthSelectIndex"
    ></picker>
  </div>
</template>
<script>
import picker from "@comps/ghb-picker";
import cell from '@base/v-cell';
import {TransferDom} from 'vux';
import { showDatePicker } from '@bridge';
import { firstColumn, secondColumn } from "./utils/dateData";
export default {
  name: "ghb-month-picker",
  directives: {
    TransferDom
  },
  props: {
    title: {
      type: String,
      default: '周期选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  components: {
    picker,
    cell,
    showDatePicker
  },
  data() {
    return {
      byMonthSelectIndex: [0, 0], // 按月份查询选择器默认选择
      byMonthArrow: 'down',
      tempIndex: [0, 0],
      finallyValue: '' // 选择的值
    };
  },
  computed: {
    linkageData() {
      let secondColumnMap = secondColumn[firstColumn[this.tempIndex[0]].value]
      return [firstColumn, secondColumnMap];
    }
  },
  watch: {
    linkageData() {
      this.$refs.circlePicker.refresh()
    }
  },
  methods: {
    reset() {
      this.finallyValue = '';
      _self.$emit('confirm', {text: '', value: ''});
      this.$forceUpdate();
    },
    handleChange(i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
      }
    },
    handleSelect(opt) {
      let _self = this;
      if (opt.action == "hide") {
        _self.byMonthArrow = "down";
        return;
      };

      if (opt.action == "confirm") {
        const confirmValue = this.linkageData[1][opt.index[1]];
        this.finallyValue = confirmValue.first + confirmValue.text;
        _self.$emit('confirm', {text: this.finallyValue, value: confirmValue.value});
      }
    },
    // 点击按月份搜索的时间框
    clickMonthSelect () {
      if(this.byMonthArrow == 'up') {
        this.byMonthArrow = 'down';
        return;
      };
      let picker = this.$refs.circlePicker;
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
    margin: 5px 0 5px @spacing;
    width: 2.96rem;
    height: 0.7rem;
    background-color: #f2f4f7;
    padding: 0 0.5rem;
    box-sizing: border-box;
    border-radius: 0.04rem;
    color: @font-t2;
    font-size: @fs28;
    line-height: 0.7rem;
    text-align: left;
    position: relative;
    span {
      padding: 0;
      width: 100%;
    }
    .tip {
      .setBgIcon("~@assets/base/arrowSanjiao@2x.png", 0.15rem);
      position: absolute;
      right: 0.56rem;
      top: 38%;
      transform: translateY(-50%);
      transition: transform 0.3s;
    }
  }
  .default{
    width: 100%;
    text-align: center;
    color: @font-t2;
  }

  .lowOpacity {
    opacity: 0.5;
  }
}
</style>
