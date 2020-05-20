<template>
    <div class="ghb-popup-header">
      <!-- 头部标题line -->
      <div class="ghb-select-card_title vux-1px-b" >
        <div class="ghb-select-card_title_left">
          <div class="ghb-select-card_title_left_icon" @click="$emit('clickLeftIcon')">
            <slot name="titleLeft">
              {{rightText}}
            </slot>
          </div>
        </div>
        <div class="ghb-select-card_title_center">
          <div class="ghb-select-card_title_center_init">
            {{titleCenterText}}
          <i class="ghb-select-card_title_center__icon" v-if="showQA"></i>
          </div>
        </div>
        <div class="ghb-select-card_title_right" @click="clickRightIcon">
          <slot name="right">
            {{rightText}}
            <div v-if="!rightText" class="ghb-select-card_title_right_icon" ></div>
          </slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      showQA: {
        type: Boolean,
        default: false
      },
      leftText: String,
      rightText: String,
      titleCenterText: {
        type: String,
        default: '选择付款账户'
      },
    },
    methods: {
      clickRightIcon () {
        this.$emit('clickRightIcon');
      },
      clickLeftIcon () {
        this.$emit('clickLeftIcon')
      }
    }
}
</script>


<style lang="less" scoped>
  @import './less/index.less';
  @import '~@comp/styles/1px.less';
  @import '~@core/public/less/mixin.less';
  .ghb-select-card_title_center__icon{
    margin-left: .12rem;
    .setBgIcon('~@comps/ghb-select-card/image/icon_wenhao_black@2x.png', .36rem);
  }
</style>
