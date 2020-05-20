<template>
  <button
    :style="buttonStyle"
    class="weui-btn"
    :class="classes"
    :disabled="disabled"
    :type="actionType"
    @click="onClick">
    <i class="weui-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>

export default {
  name: 'v-button',
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    // mini: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    showLoading: Boolean,
    link: [String, Object],
    size: {
        type: String,
        default: 'L'
    },
    gradients: {
      type: Array,
      validator: function (val) {
        return val.length === 2
      }
    },
    noBtBorder: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      !this.disabled && this.$emit('clickHandler')
    }
  },
  computed: {
    noBorder () {
      return Array.isArray(this.gradients)
    },
    buttonStyle () {
      if (this.gradients) {
        return {
          background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
          color: '#FFFFFF'
        }
      }
    },
    classes () {
        let toUC = str => this[str].toUpperCase()
      return [
        {
            'weui-btn_disabled': !this.plain && this.disabled,
            'weui-btn_plain-disabled': this.plain && this.disabled,
            // 'weui-btn_mini': this.mini,
            'weui-btn_large': toUC('size') === 'L',
            'weui-btn_middle': toUC('size') === 'M',
            'weui-btn_mini': toUC('size') === 'S',
            'vux-x-button-no-border': this.noBorder || this.noBtBorder

        },

        !this.plain ? `weui-btn_${this.type}` : '',
        this.plain ? `weui-btn_plain-${this.type}` : '',
        this.showLoading ? `weui-btn_loading` : ''
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui-button/weui-button.less';
@import '../../styles/weui/widget/weui-loading/weui-loading.less';

.weui-btn.vux-x-button-no-border:after {
  display: none;
}

.weui-btn_mini {
    display: inline-block;
    // padding: 0 1.32em;
    // min-width: 3.28rem;
    // height:.9rem;
    font-size: @fs30;
    line-height: @weuiBtnMiniLineHeight;
    font-size: @weuiBtnMiniFontSize;
}
</style>
