
<template>
  <div>
    <ghb-input
      :title="title"
      class="ghb-phone-input"
      type="tel"
      :align="align"
      :maxlength="max"
      iconType="bank"
      :readonly="readonly"
      :placeholder="placeholder"
      @on-focus="focusHandler"
      @on-blur="blurHandler"
      @inputWarn="warnHandler"
      :isWarn="isWarn"
      @clickIcon="clickIconHandler"
      v-model="currentValue"
    >
    </ghb-input>
  </div>

</template>

<script>

/**
 * 卡号码输入框组件
 * @param {String} title 标题
 * @param {String} align 值在左边还是右边
 * @param {Boolean} isWarn 是否显示右边警告图标
 * @event warnHandler 点击警告图标后触发
 *
 * 用v-model绑定值
 */
import ghbInput from './';
import base from './base';
import {errorToast} from '@bridge';
import numberInput from '../mixins/numberInput';
export default {
  name: 'ghbCardInput',
  mixins: [base],
  components: {
    ghbInput
  },
  data () {
    return {
      warnText: ''
    }
  },
  props: {
    isWarn: Boolean,
    title:{
      type: String,
      default: '银行卡号'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    align:{
      type: String,
      default: 'left'
    },
    max: {
      type: Number,
      default: 32
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: String
  },
  methods: {
    blurHandler () {
      this.$emit('on-blur', this.currentValue);
    },
    focusHandler () {
    },
    clickIcon () {
      this.$emit('clickIcon');
    },
    warnHandler () {
      this.$emit('warnHandler', this.currentValue)
    },
    clickIconHandler () {
      // 这里调ocr扫描
      this.$emit('clickIcon');
    }
  }
}
</script>


<style lang="less" scoped>
  .ghb-phone-input {
    background: #fff;
  }
</style>
