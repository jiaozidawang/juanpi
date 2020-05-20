<template>
  <m-page>
    <div class="main" style="height:100%">
      <scroll 
        class="wrapper"
        ref="scroll"
        :pullUpLoad="pullUpLoadObj"
        :data="dataList"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingDown="refreshData"
        @pullingUp="loadMore"
      > 
      <ul>
        <!-- <div class="rotateAni" v-if="isRefresh"></div> -->
        <ghb-collect-card v-for="(item, index) in dataList" :key="index"></ghb-collect-card>
        <!-- <div v-if="dataList.length <= count && isLoading" class="btn-box">正在加载中...</div>
        <div v-if="dataList.length >= count" class="btn-box">没有更多了</div> -->
      </ul>
      </scroll>
    </div>
  </m-page>
</template>

<script>
import ghbCollectCard from "./components/ghb_collect_card";
import scroll from '@comps/BScroll/newScroll';
import { setTimeout } from 'timers';
export default {
  name: "better-demo",
  components: {
    ghbCollectCard,
    scroll
  },
  data () {
    return {
      pulldown: true, // 打开派发下拉事件
      pullup: true, // 打开派发到底部事件
      count: 13, // 数据总数量
      hasMore: true, // 是否还有更多
      dataList: [] // 数据数组
    };
  },
  created () {
    this.loadData(10);
  },
  computed: {
    pullUpLoadObj () {
      return this.pullup ? {
        threshold: -50,
        txt: {more: '上拉加载更多', noMore: '—— 嗨，您已经拉到底了哦 ——'}
      } : false;
    },
    pullDownRefreshObj () {
      return this.pulldown ? {
        threshold: 90,
        stop: 50,
        txt: '刷新成功'
      } : false;
    }
  },
  methods: {
    // 上拉加载更多方法
    loadMore () {
      console.log('上拉加载更多');
      // 当数组长度大于数据库数据总条数，关闭上拉监听
      if(this.dataList.length >= this.count) {
        this.hasMore = false;
      };
      /**
       * 模仿真实请求
       */
      // 延迟获取数据
      setTimeout(() => {
        if(this.hasMore) {
          this.$refs.scroll.forceUpdate(true);
          this.loadData(5);
        } else {
          this.$refs.scroll.forceUpdate(false);
        };
      }, 300);
    },
    // 下拉刷新方法
    refreshData () {
      /**
       * 模仿真实请求
       */
      // 延迟获取数据
      setTimeout(() => {
        // 把获取到的数据添加到数组里面
        this.dataList = []; // 清空数据
        this.loadData(10);
        if(this.dataList.length < this.count) {
          this.hasMore = true;
          this.$refs.scroll.pullUpDirty = true;
          console.log('是否还有更多', this.hasMore);
        };
      }, 5000);
    },
    // 模拟的请求的方法
    loadData (len) {
      for(let i = 0; i < len; i++) {
        this.dataList.push({index: i});
      };
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@core/public/less/mixin.less';
.btn-box{
  text-align: center;
}

.rotateAni{
  margin: 0 auto;
  transform: rotateX(360deg);
  animation: loading-ami .7s infinite linear;
  .setBgIcon('~@assets/base/icon_loading_20@2x.png', .72rem);
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