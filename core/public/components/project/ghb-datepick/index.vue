<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->
<!-- 此组件废弃，请使用上面那个datepick -->


<template>
  <div class="ghb-datepick ghbline">
    <!-- <m-button @clickHandler="showDatetime">nihao </m-button> -->
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
import Vue from 'vue';
import {DatetimePlugin} from "vux";
import { isString } from 'util';
import {showMask, hideMask} from '@bridge';
Vue.use(DatetimePlugin);
export default {
  name: 'ghb-datepick',
  props: {
    startDefault: {
      type: String,
      default: ''
    },
    endDefault: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
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
  created () {
  },
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
    showDatetime(val) {

      let isStart = val === 'start';
      const _self = this;
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: _self.format,
        onConfirm(val) {
          if(isStart) {
            _self.startDate = val;
          } else {
            _self.endDate = val;
          }
          _self.$emit('confirm', {
            startDate: _self.startDate ? _self.startDate : _self.startDefault,
            endDate: _self.endDate ? _self.endDate : _self.endDefault,
          });
        },
        onShow () {
          showMask();
          if(isStart) {
            _self.startArrow = 'up';
          } else {
            _self.endArrow = 'up';
          }
        },
        onHide () {
          hideMask();
          if(isStart) {
            _self.startArrow = 'down';
          } else {
            _self.endArrow = 'down';
          }
        }
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
  padding: 0 .5rem;
  box-sizing: border-box;
  color: @font-t1;
  font-size: @fs28;
  line-height: .7rem;
  text-align: left;
  position: relative;
  span{
    padding: 0;
    width: 100%;
  }
  .tip{
    .setBgIcon('~@assets/base/arrowSanjiao@2x.png', .15rem);
    position: absolute;
    right: .56rem;
    top: 38%;
    transform: translateY(-50%);
    transition: transform .3s;
  }
}

.lowOpacity {
  opacity: .5;
}

.tip_down{
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-45deg) !important;
}
.tip_up{
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(135deg) !important;
}
</style>
