<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-26 10:19:50
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-02 15:40:20
 * @Description: 搜索框组件
 -->
<template>
  <div class="ghb-search">
    <div class="ghb-search_init">
      <div class="ghb-search_init_input" @click.stop="clickHandler">
        <div class="ghb-search_init_input_icon" :class="{'search-active' : isFocus}" >
          <img src="~@assets/base/search.svg" alt="">
        </div>
        <input
          ref="searchLineInput"
          type="text"
          :placeholder="placeholder"
          v-model="currentValue"
          @focus="focusHandler"
          @blur="blurHandler"
          @input="inputHandler(currentValue)"
        >
        <div class="ghb-search_init_input_clean" v-if="currentValue != '' " @click="currentValue = ''"></div>
      </div>
      <div class="complete" @click.stop="cancle" v-if="needCancleButton && (isFocus || currentValue != '')">
        取消
      </div>
    </div>
  </div>
</template>

<script>
import bind from '../mixins/bind.js';
import _ from 'lodash';
import { setInterval, clearTimeout, setTimeout } from 'timers';
export default {
  mixins: [bind],
  props: {
    value: {
      type:　String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    needCancleButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocus: false,
      inputed: false
    }
  },
  methods: {
    clickHandler () {
      this.isFocus = true;
      this.$refs.searchLineInput.focus();
    },
    focusHandler () {
      this.$emit('on-focus', this.currentValue)
    },
    blurHandler () {
      this.isFocus = false;
      this.$emit('on-blur', this.currentValue)
    },
    cancle () {
      this.currentValue = '';
      this.$emit('cancle', this.currentValue);
    },
    inputHandler (val) {
      let _this = this;

      if (_this.timer) {
        clearTimeout(_this.timer);
      }

      _this.timer = setTimeout(function(val) {
          _this.$emit('on-input');
          clearTimeout(_this.timer);
      }, 500, val);
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@core/public/less/mixin.less';
  .ghb-search_init{
    height: @lh-line;
    padding: 0 @spacing;
    background: @bg;
    display: flex;
    align-items: center;
    font-size: 14px;
    .ghb-search_init_input{
      height: 80%;
      width: 100%;
      padding: 0 @spacing;
      border-radius: .36rem;
      background-color: @bg-color;
      display: flex;
      align-items: center;
      input{
        width: 100%;
        height: 100%;
      }
    }
    .complete{
      width: 1.2rem;
      height: 100%;
      line-height: .9rem;
      text-align: center;
    }
    .ghb-search_init_input_icon{
      width: .54rem;
      display: flex;
      justify-content: flex-end;
      transition: width .2s;
      img{
        width: .54rem;
        height: .54rem;
      }
      // .setBgIcon('~@assets/base/search.svg', .54rem);
    }
    .search-active{
      width: .54rem;
    }
    .ghb-search_init_input_clean{
      .setBgIcon('~@assets/base/clean.svg', .44rem);
    }
  }
</style>

