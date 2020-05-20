<template>
    <div class="validateInvestorWrap nmb-bg-white">
        <div class="contentBlock">
            <div class="contentTitle">{{ title }}</div>
            <div class="contentInfo">{{ desc }}</div>
        </div>
        <div v-if="leftBtn && rightBtn" class="btnBlock nmb-border-t">
            <div class="leftBtnBox cancelBtnBox">
                <u-button extendClass="cancelBtn"
                          type="hollow"
                          @clickHandler="$emit('left-btn-click')">
                          <span style="color: #888888!important;">{{ leftBtn }}</span>
                </u-button>
            </div>
            <div class="rightBtnBox nmb-border-l">
                <u-button extendClass="confirmBtn"
                          type="hollow"
                          @clickHandler="$emit('right-btn-click')">{{ rightBtn }}</u-button>
            </div>
        </div>
        <div v-if="leftBtn && !rightBtn" class="btnBlock nmb-border-t">
            <div class="leftBtnBox">
                <u-button extendClass="cancelBtn"
                          type="hollow"
                          @clickHandler="$emit('left-btn-click')">{{ leftBtn }}</u-button>
            </div>
        </div>
    </div>
</template>

<script>
import { UButton } from "@engine";

export default {
  name: 'CheckModal',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    desc: {
      type: String,
      default: '说明'
    },
    leftBtn: {
      type: String,
      default: '好的'
    },
    rightBtn: {
      type: String,
      default: ''
    }
  },
  components: {
    UButton
  }
};
</script>

<style lang="scss" scoped>
.validateInvestorWrap {
    border-radius: 12px;

    .contentBlock {
        box-sizing: border-box;
        min-height: 114px;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .contentInfo {
            padding: 0 20px;
        }
    }

    .btnBlock {
        height: 45px;
        display: flex;

        .leftBtnBox,
        .rightBtnBox {
            flex: 1;
            overflow: hidden;
        }

        .leftBtnBox {
            border-bottom-left-radius: 12px;
        }

        .rightBtnBox {
            border-bottom-right-radius: 12px;
        }

        .cancelBtn,
        .confirmBtn {
            border: 0;
        }
    }
}
</style>

