<template>
    <div class="ghb-select-card" v-transfer-dom>
        <Popup
            v-model="private_value"
            :height="height"
            :hide-on-blur="hideOnBlur"
            :is-transparent="isTransparent"
            :width="width"
            :position="position"
            :show-mark="showMark"
            :popup-style="{popupStyle}"
            :shoule-rerender-on-show="isRerenderOnShow"
            :shoule-scroll-top-on-show="isScrollTopOnShow"
            @on-hide="hide"
            @on-show="show"
            @on-first-show="firstShow"
        >
          <div class="slot">
            <!-- 头部标题line -->
            <div class="ghb-select-card_title vux-1px-b" >
              <div class="ghb-select-card_title_left">
                <div class="ghb-select-card_title_left_icon" @click="$emit('clickTitleLeftIcon')">
                  <slot name="titleLeft"></slot>
                </div>
              </div>
              <div class="ghb-select-card_title_center">
                <div class="ghb-select-card_title_center_init">
                  {{titleCenterText}}
                <!-- <i  class="ghb-select-card_title_center__icon"></i> -->
                </div>
              </div>
              <div class="ghb-select-card_title_right">
                <div class="ghb-select-card_title_right_icon" @click="clickRightIcon"></div>
              </div>
            </div>
            <m-group gutter="0">
              <cell
                v-for="(item, index) in dataList"
                :key="index"
                :title="item.title"
                :inline-desc="item.desc"
                @clickHandler="clickCellItem(item)"
                :hasArrow="false"
              >
                <div class="bank-icon" :class="'ghb'" slot="icon"></div>
              </cell>

              <div class="ghb-select-card_button" v-if="hasButton">
                <m-button type="primary">{{buttonText}}</m-button>
              </div>

            </m-group>
            <slot></slot>
          </div>
        </Popup>
    </div>
</template>

<script>
import { Popup, TransferDom } from 'vux';
import cell from '@comp/base/v-cell';

export default {
    directives: {
      TransferDom
    },
    components: {
        Popup,
        cell
    },
    props: {
      hasButton: {
        type: Boolean,
        default: false
      },
      buttonText: {
        type: String,
        default: '确认'
      },
      dataList: Array,
      titleCenterText: {
        type: String,
        default: '选择付款账户'
      },
      value: {
        type: Boolean,
        default: ''
      },
      height: String,
      hideOnBlur:{
        type: Boolean,
        default: true
      },
      isTransparent: {
        type: Boolean,
        default: false
      },
      showMark: {
        type: Boolean,
        default: true
      },
      isRerenderOnShow: {
        type: Boolean,
        default: false
      },
      isScrollTopOnShow: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'bottom'
      },
      width: String,
      popupStyle: Object


    },
    watch: {
      private_value(newVal) {
        this.$emit('input', newVal);
      }
    },
    computed: {
      private_value: {
        get() {return this.value},
        set(v) { this.$emit('input', v)}
      }
    },
    methods: {
      hide () {
        this.$emit('on-hide')
      },
      show () {
        this.$emit('on-show')
      },
      firstShow () {
        this.$emit('on-firstShow')
      },
      clickCellItem (itemVal) {
        this.$emit('selectCard', itemVal);
        this.private_value = false
      },
      clickRightIcon () {
        this.$emit('clickTitleLeftIcon')
        this.private_value = false
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
