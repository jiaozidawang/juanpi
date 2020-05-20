<template>
  <div class="ghb-globalMutiButton">
    <m-button type="extend" v-show="isExtend" @clickHandler="clickHandler('extend')">
      <div class="ghb-globalMutiButton_extend" v-if="extendType !== ''">
        <div class="ghb-globalMutiButton_icon">
          <!-- <i :class="extendIcon"></i> -->
          <img v-if="extendType == 'collect'" src="./image/wendlc_icon_weisc@2x.png" alt="">
          <img v-if="extendType == 'collected'" src="./image/wendlcxq_icon_yisc@2x.png" alt="">
        </div>
        <span v-if="extendType == 'collect'">收藏</span>
        <span v-if="extendType == 'collected'">已收藏</span>
      </div>
    </m-button>
    <m-button v-if="!isExtend" :type="buttons.leftType" noBtBorder @clickHandler="clickHandler('left')">{{buttons.leftText}}</m-button>
    <m-button v-show="!isSingle && isExtend" :type="buttons.leftType" noBtBorder @clickHandler="clickHandler('left')">{{buttons.leftText}}</m-button>
    <m-button :disabled="buyButtonDisabled" :type="buttons.rightType" noBtBorder @clickHandler="clickHandler('right')">{{buttons.rightText}}</m-button>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    isExtend: {
      type: Boolean,
      default: false
    },
    isSingle: {
      type: Boolean,
      default: false
    },
    // 拓展按钮的类型,默认收藏
    extendType: {
      type: String,
      default: 'collect'
    },
    // 是否禁用购买按钮
    buyButtonDisabled: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Object,
      default: () => {
        return {
          leftText: '重置',
          leftType: 'reset',
          rightText: '确定',
          rightType: 'primary'
        }
      }
    },
    debounceTime: {
      type: String,
      default: '300'
    }
  },
  data () {
    return {
      isClick: false // 防抖
    }
  },
  computed: {
    extendIcon () {
      return {
        'icon_collect': this.extendType == 'collect',
        'icon_collected': this.extendType == 'collected'
      }
    }
  },
  methods: {
    clickHandler (val) {


      if(this.isClick) {
        return;
      }

      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      }, this.debounceTime);

      if(val == 'extend') {
        this.$emit('clickHandler', val);
        return;
      }
      if(val == 'left') {
        this.$emit('clickHandler', val);
        return;
      }
      if(val == 'right') {
        this.$emit('clickHandler', val);
        return;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@core/public/less/mixin.less';

  .ghb-globalMutiButton{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    .weui-btn{
      padding: 0;
      .ghb-globalMutiButton_extend{
        width: 1.6rem;
        height: 100%;
        background: @bg;
        color: @font-t1 !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
          font-size: @fs24;
          line-height: 1.8;
        }
      }
      &:nth-child(2){
        flex: 1;
      }
      &:last-child{
        flex: 1;
      }
    }
    .weui-btn_large{
      min-width: 0;
      border-radius: 0 !important;
    }
    .ghb-globalMutiButton_icon{
      .setIconSize(18px, 18px);
      img{
        width: 18px;
        height: 18px;
      }
    }
  }
  .icon_collect{
    background: url('./image/wendlc_icon_weisc@2x.png') no-repeat;
  }
  .icon_collected{
    background: url('./image/wendlcxq_icon_yisc@2x.png') no-repeat;
  }
</style>
