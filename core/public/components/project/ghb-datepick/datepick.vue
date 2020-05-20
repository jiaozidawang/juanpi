<!--
 * @Author: liuyunxiao
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-02 10:57:08
 * @Description: 两个日期选择器
 -->
<template>
  <div class="ghb-datepick ghbline">
    <div class="ghb-datepick_init flexLine">
      <div class="ghb-datepick_pick flexLine">
        <div class="ghb-datepick_start" @click="showDatetime('start')">
          <div class="ghb-datepick_start_pick" :style="{color: startDate == '' ? '#888' : '#09122B'}">
            {{startDate == '' ? startDateInit : startDate}}
            <div class="tip" :class="['tip_' + startArrow, {'lowOpacity': startDate == ''}]"></div>
          </div>
        </div>
        <span>-</span>
        <div class="ghb-datepick_end" @click="showDatetime('end')">
          <div class="ghb-datepick_end_pick" :style="{color: endDate == '' ? '#888' : '#09122B'}">
            {{endDate == '' ? endDateInit : endDate}}
            <div class="tip" :class="['tip_' + endArrow, {'lowOpacity': endDate == ''}]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 时间选择组件
 * @param {String} startDefault 默认的开始时间, 格式为 xxxx-xx-xx
 * @param {String} endDefault 默认的结束时间, 格式为 xxxx-xx-xx
 * @param {String} defaultSelect 点开时间选择picker默认在中间的值, 格式为 xxxx-xx-xx
 * @event confirm 选择了时间的时候触发，返回选择的日期对象，包括开始和结束日期
 * @method reset 重置时间选择 通过$refs.xxx.reset()调用
 *
 */
import { chooseValue } from './utils';
import {showMask, hideMask, showDatePicker, alert} from '@bridge';
export default {
  name: 'ghb-datepick',
  props: {
    maximumDate: {
      type: String,
      default: ''
    },
    minimumDate: {
      type: String,
      default: ''
    },
    startDefault: {
      type: String,
      default: ''
    },
    endDefault: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
  },
  data () {
    return {
      startDate: '',
      endDate: '',
      startArrow: 'down',
      endArrow: 'down',
      isShowDefault: true
    }
  },
  // created () {
  //   if(this.startDefault > this.endDefault) {
  //     alert('时间选择框设置的结束时间小于开始时间，请重新设置!', '', {button: '我知道了'})
  //   }
  // },
  computed: {
    startDateInit () {
      if(this.startDefault) {
        return this.startDefault;
      };
      return this.$tools.getCurrentMonthDate().monthStartDate
    },
    endDateInit () {
      if(this.endDefault) {
        return this.endDefault;
      };
      return this.$tools.getCurrentMonthDate().monthEndDate;
    }
  },
  watch: {
    startDate (newVal) {
      if(this.startDefault == '' && this.startDefault.length < 8) {
        return;
      };
      if(newVal) {
        return;
      }
      this.startDate = this.startDefault;
    },
    endDefault (newVal) {
      if(this.endDefault == '' && this.endDefault.length < 8) {
        return;
      };
      if(newVal) {
        return;
      }
      this.endDate = this.endDefault;
    }
  },
  methods: {
    reset () {
      this.startDate = '';
      this.endDate = '';
      this.$emit('reset');
    },

    startDatePick () {
      // 没有默认值选择今天
      let currDate;
      currDate = this.startDefault ? this.startDefault : this.$tools.date2Str(new Date, 'YYYY-MM-DD')
      this.showDatetime(currDate);
    },
    endDatePick () {
      // 没有默认值选择今天
      let currDate;
      currDate = this.endDefault ? this.endDefault : this.$tools.date2Str(new Date, 'YYYY-MM-DD')
      this.showDatetime(currDate);
    },
    showDatetime (type) {
      const _self = this;
      // 区分开始与结束日期
      let isStart = type === 'start';

      // 修改三角箭头
      if(isStart) {
        _self.startArrow = 'up';
      } else {
        _self.endArrow = 'up';
      }

      // 设置datepick当前选择日期，没有默认值则选择今天
      let currDate;
      currDate = isStart
      ? chooseValue(_self.startDate, _self.startDefault, _self.$tools.date2Str(new Date, 'YYYY-MM-DD'))
      : chooseValue(_self.endDate, _self.endDefault, _self.$tools.date2Str(new Date, 'YYYY-MM-DD'));

      // 设置最小日期, 开始日期的最小值为传参的最小值，结束日期的最小值为开始日期
      // let minimumDate = isStart ? _self.minimumDate : _self.startDate ? _self.startDate : _self.startDefault ? _self.startDefault : '';
      let minimumDate = _self.minimumDate
      // 设置最大日期
      // let maximumDate = !isStart ? _self.maximumDate : _self.endDate ? _self.endDate : _self.endDefault ? _self.endDefault : '';
      let maximumDate = _self.maximumDate

      showDatePicker({
        title: _self.title,
        currentDate: currDate,
        dateFormat: _self.format,
        minimumDate: minimumDate,
        maximumDate: maximumDate
      }).then(res => {
        // 设置日期及修改三角箭头
        if(isStart) {
          _self.startArrow = 'down';
          _self.startDate = res.currentDate ? res.currentDate : _self.startDate ? _self.startDate : _self.startDefault ? _self.startDefault : '';
        } else {
          _self.endArrow = 'down';
          _self.endDate = res.currentDate ? res.currentDate : _self.endDate ? _self.endDate : _self.endDefault ? _self.endDefault : '';
        }

        let opt = {
          startDate: _self.startDate ? _self.startDate : _self.startDefault,
          endDate: _self.endDate ? _self.endDate : _self.endDefault
        };

        _self.$emit('confirm', opt);
      });
    }
  }
};
</script>

<style lang="less">
@import '~@core/public/less/mixin.less';
.dp-header .dp-item.dp-right{
  color: @color-main !important;
}

.ghb-datepick {
  font-size: @fs30;
  background: @bg;
  padding: 0 @spacing;
}
.ghb-datepick_init {
  justify-content: space-between;
  .ghb-datepick_title {
    width: 2rem;
  }
  .ghb-datepick_pick {
    flex: 1;
    // height:100%;
    justify-content: space-between;
    span {
      color: #c1c1c1;
      padding: 0.2rem;
    }
  }
}
.ghb-datepick_start_pick,
.ghb-datepick_end_pick {
  width: 2.96rem;
  height: 0.7rem;
  background-color:#F2F4F7;
  // padding: 0 .5rem;
  box-sizing: border-box;
  border-radius: .04rem;
  color: @font-t1;
  font-size: @fs28;
  line-height: .7rem;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span{
    padding: 0;
  }
  .tip{
    .setBgIcon('~@assets/base/arrowSanjiao@2x.png', .15rem);
    margin-left: 4px;
    transform: translateY(-50%);
    transition: transform .3s;
  }
}

.lowOpacity {
  opacity: .5;
}

.tip_up{
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-45deg) !important;
}
.tip_down{
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(135deg) !important;
}
</style>
