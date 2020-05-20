<template>
  <div ref="wrapper">
    <!-- <div class="scroll-before">
      <div class="rotateAni" v-if="isRefresh"></div>
      <div class="loadingImg" v-if="!isRefresh"></div>
      <p class="pullDown-text">下拉刷新</p>x
    </div> -->
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import props from "./utils/props.js";
export default {
  props,
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  data () {
    return {
      isRefresh: false
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollBar: this.scrollBar
      });

      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", pos => {
          me.$emit("scroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scroll", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 0) {
            this.$emit("scrollToEnd");
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style lang="less" scoped>
  @import '~@core/public/less/mixin.less';
  .wrapper {
    height: 98%;
  }

  // .scroll-before{
  //   margin: 10px 0;
  // }
  .loadingImg{
    width: 100%;
    height: .9rem;
    margin: 0 auto;
    .setBgIcon('~@assets/base/icon_loading_20@2x.png', 20px);
  }
  .rotateAni{
    width: 100%;
    height: .9rem;
    margin: 0 auto;
    transform: rotateX(360deg);
    animation: loading-ami .7s infinite linear;
    .setBgIcon('~@assets/base/icon_loading_20@2x.png', 20px);
  }

  .pullDown-text{
    text-align: center;
    font-size: 12px;
    color: @font-t3;
  }
  @keyframes loading-ami {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
