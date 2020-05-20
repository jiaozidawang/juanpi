<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-26 09:26:03
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-18 09:40:17
 * @Description: 金额输入框
 -->
<template>
  <div class="ghb-sumInputFormat" @click="clickAllHandler" ref="sumInputFormat">

    <div class="ghb-sumInputFormat_content" :class="hasText">
      <div class="ghb-sumInputFormat_title" >
        <div class="ghb-sumInputFormat_title_l">
          <span>{{title}}</span>
        </div>
        <div class="ghb-sumInputFormat_title_r">
          <slot name="titleValue"></slot>
        </div>
      </div>

      <div class="ghb-sumInputFormat_input" :class="{'ghb-sumInputFormat_input_active': (currentValue && needBottomLine)}">
        <div class="ghb-sumInputFormat_input_icon" >
          <div class="ghb-sumInputFormat_input_icon_init" v-if="hasCurrencySign" :style="inputStyle">
            {{currencyIcon}}
          </div>
        </div>

        <div class="ghb-sumInputFormat_input_icon__input">
          <div v-show="!focus" class="input_mask"  :style="inputStyle">
            <div class="content">
              <p class="placeholder" v-if="formatValue.length <= 0">{{placeholder}}</p>
              {{formatValue}}
            </div>
          </div>
          <input
            :readonly="readonly"
            :style="inputStyle"
            type="number"
            class="sumInputFormat_input__input"
            ref="input"
            v-model="currentValue"
            @click="inputClick"
            @focus="focusHandler"
            @blur="blurHandler"
            @input="inputHandler"
            @propertychange="propertychangeHandler"
            @keydown="keydownHandler"
          >
        </div>

        <div class="ghb-sumInputFormat_input_clean iconfont" v-show="isShowCleanIcon && !readonly" @click.stop="cleanValue"></div>

        <slot name="input" v-if="!isWarn"></slot>
        <!-- <div class="ghb-sumInputFormat_input_warn_icon" @click="toastWarn" v-show="inputError"></div> -->
      </div>

      <div class="ghb-sumInputFormat_extend">
        <div class="toChineseCash" v-show="needCash &&　chineseCash" >
          <p>大写：<span>{{chineseCash}}</span></p>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="ghb-sumInputFormat-warn" v-if="isWarn">
      <p v-if="isWarn || inputError">{{warnText}}</p>
      <slot name="warn"></slot>
    </div>
    <!-- <ghbWarn v-if="isWarn || inputError" :handlerText="handlerText" :warnText="warnText" @clickHandler="$emit('clickHandlerText')"></ghbWarn> -->
  </div>
</template>


<script>
import { toast } from '@bridge';
import androidScroll from '../mixins/focusScroll.js';
import ghbWarn from '@comps/ghb-warn';
export default {
  components: {
    ghbWarn
  },
  mixins: [androidScroll],
  data () {
    return {
      // isShowCleanIcon: false,
      // currentValue: '',
      chineseCash: '',
      validationMessage: '',
      focus: false,
      currValue: ''
    }
  },
  props:{
    handlerText: {
      type: String,
      default: ''
    },
    warnText: {
      type: String,
      default: '请输入正确的金额类型!'
    },
    title: {
      type: String,
      default: '交易金额'
    },
    value: {
      type: String,
      default: ''
    },
    isWarn: {
      type: Boolean,
      default: false
    },
    needCash: {
      type: Boolean,
      default: true
    },
    needBottomLine: {
      type: Boolean,
      default: true
    },
    needToFixed: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    currency: {
      type: String,
      default: '01'
    },
    sLimit: {
      type: String,
      default: '2'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentValue(newVal) {
      this.chineseCash = newVal ? this.$tools.changeAmt(newVal) : '';
      this.$emit('input', newVal);
    },
  },
  computed: {
    hasCurrencySign () {
      return this.currency !== '';
    },
    currentValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
        this.$emit('on-change', v);
      }
    },
    formatValue () {
      return this.$tools.currencyFormat(this.currentValue, '');
    },
    inputStyle () {
      return {
        color: this.readonly ? '#888888' : '#09122B',
        // left: this.hasCurrencySign ? '35px' : '16px'
      };
    },
    inputError () {
      return this.validationMessage &&　this.validationMessage.indexOf('数字') != -1
    },
    hasText() {
      return {
        'ghb-sumInputFormat_content_pd': this.currentValue == '' || this.currentValue == null || this.currentValue == 'undefined'
      }
    },
    currencyIcon () {
      return this.$tools.trans('CURRENCY_ICON', this.currency);
    },
    isShowCleanIcon: {
      get () {
        return this.currentValue !== '';
      },
      set (val) {

      }
    }

  },
  methods: {
    propertychangeHandler(e) {
      // console.log('propertychangeHandler', e)
    },
    // 点击输入框时
    inputClick () {
      this.$refs.input.focus();
      this.focus = true;
    },
    // 点击整个输入框组件
    clickAllHandler () {
      if(this.focus || this.readonly) {
        return;
      };
      this.$refs.input.focus();
      this.focus = true;
    },
    keydownHandler (e) {


      if(this.readonly) {
        e.preventDefault();
      };

      if(e.target.value.length>15 && e.keyCode != 8) {
        e.preventDefault();
      };

      // 限制小数位数
      // let sn = e.target.value.split('.')[1]
      // console.log('当前值', sn, e);
      // if(sn && sn.length >= Number(this.sLimit) && e.keyCode != 8) {
      //   e.preventDefault();
      // };

      let bn = e.target.value.split('.')[0];
      if(bn && bn.length >12  && e.keyCode != 8) {
        e.preventDefault();
      };

      // 第一位数字是0的的话第二位字符只能是小数点
      // let firstChar = e.target.value.substr(0,1);
      // if(!e.target.value && e.key == '0') {
      //   e.preventDefault();
      // }
      // if(firstChar == '0') {
      //   e.preventDefault();
      //   // if(e.target.value.length >= 2 && e.target.value.substr(1,1) != '.') {
      //   //   e.preventDefault();
      //   // };
      // };

      if(e.target.value.indexOf('.') !== -1 && e.key === '.' ) {
        e.preventDefault();
      }

      // 限制非数字和小数点的输入
      let reg = /\d|\./;
      if(e.key !== 'Backspace' && e.key.match(reg) === null) {
        e.preventDefault();
      }
    },
    inputHandler (e) {
      if(e.target.value === '') {
        this.currentValue = '';
      }
    },
    onInput ({target}) {
      this.$emit('on-input', value);
    },
    focusHandler () {
      this.scrollWindow(this.$refs.input);
      this.$emit('on-focus');
      this.focus = true;
    },
    blurHandler () {
      if(this.needToFixed) {
        this.currentValue = this.$tools._toFixed(this.currentValue, 2);
        this.$emit('on-blur', this.currentValue);
      } else {
        this.currValue = (parseInt(this.currentValue * 100) / 100).toFixed(2);
        this.$emit('on-blur', this.currValue);
      }
      this.focus = false;
      this.cancleScroll();
    },
    cleanValue () {
      this.currValue = '';
      this.chineseCash = '';
      this.currentValue = '';
      this.$refs.input.value = '';
      this.isShowCleanIcon = false;
      this.$emit('cleanIcon');
      this.$refs.input.focus();
    },
    toastWarn () {
      alert('请输入正确的金额')
    }
  },
}
</script>

<style lang="less" scoped>
  @import '../../../less/mixin.less';

  .sumInputFormat_input__input, .input_mask {
    font-family: @fontF-money
  }
  .sumInputFormat_input__input{
    &::placeholder {
      font-family:"PingFang SC", "Microsoft YaHei", Helvetica, sans-serif, Arial;
    }
  }
  .placeholder{
    font-family:"PingFang SC", "Microsoft YaHei", Helvetica, sans-serif, Arial;
  }



  .ghb-sumInputFormat{
    // position: relative;
    min-height: 2rem;
    // padding-top: 1.6rem;
    box-sizing: border-box;
    // background: @bg;
    &_title{
      padding: 0 @spacing;
      height: @lh-line;
      font-size: @fs30;
      line-height: @lh-line;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &_title_r{
      color: @color-main;
    }
    &_title_warn{
      color: @color-main;
    }
    &_input_active{
       &::after{
        .setBottomLine(@spacing)
      }
    }
    &_input{
      width: 100%;
      position: relative;
      height: @lh-line;
      padding: 0 @spacing;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
      .input_mask{
        display: flex;
        justify-content: flex-start;
        position: absolute;
        top: 0;
        .currencyIcon{
          // opacity: 0
          opacity: 0;
          // padding-left: .2rem;
          // padding-right: 3px;
        }
        .content{
          flex: 1;
          padding-left: .2rem;
          background-color: #fff;
          .placeholder{
            font-size: @fs30;
            color: @font-t3;
            line-height: .9rem;
            font-weight: 300;
          }
        }

      }
      input{
        padding: 0 .2rem;
      }
      input, .input_mask {
        font-size: .6rem;
        line-height: .9rem;
        font-weight: bold;
        width: 100%;
        height: 100%;
        &::placeholder {
          font-size: @fs30;
          font-weight: 400;
          color: @font-t3;
        }
      }
      &_icon{
        // width: .36rem;
        height: .9rem;
        .ghb-sumInputFormat_input_icon_init{
          letter-spacing: .01rem;
          font-size: .6rem;
          font-weight: bold;
        }

      }
      &_clean{
        .setBgIcon('~@assets/base/clean.svg', .44rem);
        // background-position: 0 .1rem;
      }

    }

    .ghb-sumInputFormat_input_warn_icon{
      .setBgIcon('~@assets/base/protect.svg', .74rem);
      background-position: 0 .1rem;
    }


    .ghb-sumInputFormat_extend {

      .toChineseCash {
        padding: .2rem @spacing;
        font-size: @fs24;
        p{
          span{
            color: @color-main;
          }
        }

      }
    }


  }

  .ghb-sumInputFormat_content{
    background-color: @bg !important;
  }

  .ghb-sumInputFormat_content_pd{
    padding-bottom: .2rem
  }

  .ghb-sumInputFormat-warn{
    padding: .2rem @spacing .2rem @spacing;
    font-size: @fs24;
    color: @color-main;
  }

  .ghb-warn{
    margin-top: .1rem;
    // position: absolute;
    // left: 0;
    // right: 0;
    // z-index: 1000;
    // bottom: -.2rem;
  }
</style>


