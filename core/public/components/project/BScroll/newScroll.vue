<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
          <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span style="color: #dddddd">{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else style="color: #C1C1C1">
            <span>{{refreshTxt}}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll'
import BScroll from "./bs-source";
import Loading from "./components/loading.vue";
import Bubble from "./components/bubble.vue";
import { getRect } from "./utils/dom.js";

const COMPONENT_NAME = "scroll";
const DIRECTION_H = "horizontal";
const DIRECTION_V = "vertical";

export default {
  name: COMPONENT_NAME,
  props: {
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: "",
      bubbleY: 0
    };
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        "上拉加载更多";

      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        "…… 嗨，您已经拉到底了哦 ……";

      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || "下拉刷新";
    }
  },
  created() {
    this.pullDownInitTop = -50;
  },
  mounted() {
    // 保证dom更新完成
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    // 初始化BS
    initScroll() {
      // 如果没有wrapper
      if (!this.$refs.wrapper) {
        return;
      }

      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
          .height + 1}px`;
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      };

      this.scroll = new BScroll(this.$refs.wrapper, options);

      // 是否监听滚动事件
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }

      // 是否监听滚动到底部事件
      if (this.listenScrollEnd) {
        this.scroll.on("scrollEnd", pos => {
          this.$emit("scroll-end", pos);
        });
      }

      // 是否监听滚动开始之前事件
      if (this.listenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });

        this.scroll.on("scrollStart", () => {
          this.$emit("scroll-start");
        });
      }

      // 是否需要下拉刷新
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }

      // 是否需要上拉加载
      if (this.pullUpLoad) {
        // 初始化上拉加载
        this._initPullUpLoad();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      this.$emit("click", item);
    },
    destroy() {
      this.scroll.destroy();
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit("pullingDown");
      });

      this.scroll.on("scroll", pos => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        // 显示loading组件
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    }
  },
  components: {
    Loading,
    Bubble
  }
};
</script>

<style lang="less" >
.list-wrapper {
  position: relative;
  height: 100%;
  /*position: absolute*/
  /*left: 0*/
  /*top: 0*/
  /*right: 0*/
  /*bottom: 0*/
  overflow: hidden;
  // background: #fff;
  .scroll-content {
    position: relative;
    z-index: 1;
  }

  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
    .list-item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .after-trigger {
    margin-bottom: 10px;
  }
}
.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  // padding-bottom: 46px;
}
</style>
