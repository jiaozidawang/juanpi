
<template>
  <div>
    <ghb-input
      :title="title"
      class="ghb-phone-input"
      type="tel"
      :align="align"
      maxlength="11"
      :readonly="readonly"
      @on-focus="focusHandler"
      @on-blur="blurHandler"
      @inputWarn="warnHandler"
      :placeholder="placeholder"
      :isWarn="isWarn"
      v-model="currentValue"
    >
    </ghb-input>
  </div>

</template>

<script>

/**
 * 手机号码输入框组件
 * @param {String} title 标题
 * @param {String} align 值在左边还是右边
 * 用v-model绑定值
 */
import ghbInput from './';
import base from './base';
import {errorToast} from '@bridge';
import numberInput from '../mixins/numberInput';
export default {
  name: 'ghbPhoneInput',
  mixins: [base],
  components: {
    ghbInput
  },
  data () {
    return {
      isWarn: false,
      warnText: ''
    }
  },
  props: {
    title:{
      type: String,
      default: '手机号码'
    },
    align:{
      type: String,
      default: 'left'
    },
    placeholder: {
      type: String,
      default: '请输入'
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

      if(this.currentValue.length <= 0) {
        this.warnText = '请输入手机号码';
        this.isWarn = true;
        this.$emit('error', {errMsg: this.warnText});
        return
      }

      let isPhoneNo = this.isPhoneNumber(this.currentValue)
      if(!isPhoneNo) {
        this.warnText = '无效的手机号码';
        this.isWarn = true;
        this.$emit('error', {errMsg: this.warnText});
        return;
      }
    },
    focusHandler () {
      this.isWarn = false;
    },
    isPhoneNumber (phoneNo) {
      /**
       * 正则：手机号（精确）
       * <p>移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198</p>
       * <p>联通：130、131、132、145、155、156、175、176、185、186、166</p>
       * <p>电信：133、153、173、177、180、181、189、199</p>
       * <p>全球星：1349</p>
       * <p>虚拟运营商：170</p>
       */

      // let REGEX_MOBILE_EXACT = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      let REGEX_MOBILE_EXACT = /^1\d{10}$/ // 只校验1开头并且11位数
      return phoneNo && REGEX_MOBILE_EXACT.test(phoneNo);

    },
    clickIcon () {
      this.$emit('clickIcon');
    },
    warnHandler () {
      // errorToast(this.warnText);
      this.$toast(this.warnText, 'fail', {duration: 1000});
    }
  }
}
</script>


<style lang="less" scoped>
  .ghb-phone-input {
    background: #fff;
  }
</style>
