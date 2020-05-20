<template>
    <u-page>
        <div class="cell">
            <u-button @clickHandler="buttonClick">按钮</u-button>
            <u-button type="primary"
                      @clickHandler="buttonClick">按钮</u-button>
        </div>
        <div class="cell">
            <u-button size="M">按钮</u-button>
            <u-button size="M"
                      noBorderRadius>没有圆角</u-button>
        </div>
        <div class="cell">
            <u-button size="S">小按钮</u-button>
            <u-button size="S">小按钮</u-button>
        </div>
        <div class="cell">
            <u-button type="hollow">按钮</u-button>
        </div>
        <div class="cell">
            <u-button size="M"
                      type="hollow"
                      isLink>按钮</u-button>
            <u-button size="M"
                      type="hollow"
                      noBorderRadius>没有圆角</u-button>
        </div>
        <div class="cell">
            <u-button size="S"
                      isLink
                      type="hollow">小按钮</u-button>
            <u-button size="S"
                      type="hollow">小按钮</u-button>
            <u-button size="S"
                      isLink
                      :customStyle="{height: '35px'}"
                      type="hollow">自定义高度</u-button>
        </div>
        <div class="cell">
            <u-button disabled>按钮</u-button>
        </div>
        <div class="cell">
            <u-button type="hollow"
                      size="S"
                      disabled>按钮</u-button>
        </div>
    </u-page>
</template>
<script>
import { UPage, UButton } from "@engine";

export default {
  name: 'ButtonDemo',
  props: {},
  components: {
    UButton,
    UPage
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  destoryed() { },
  methods: {
    buttonClick() {
      console.log('button');
    }
  }
};
</script>
<style lang="scss" scoped>
    @import './style.scss';
    .cell {
        // background-color: #fff;
        // margin: 5px 0;
        padding: 0 10px;
    }
</style>
