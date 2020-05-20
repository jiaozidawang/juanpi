<template>
  <m-page>
    <div class="main">
      <scroll 
        class="wrapper"
        ref="scroll"
        :pullUpLoad="pullUpLoadObj"
        :data="dataList"
        :pulldown="pulldown"
        @pulldown="refreshData"
        @scrollToEnd="loadMore"
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
import ghbCollectCard from "../../../ghb_collect/collect/components/ghb_collect_card";
import scroll from '@comps/BScroll/newScroll';
import { showLoading, hideLoading } from "@bridge";
import { setTimeout } from 'timers';
export default {
  name: "better-demo",
  components: {
    ghbCollectCard,
    scroll
  },
  data () {
    return {
      isRefresh: false,
      pulldown: true, // 打开派发下拉事件
      pullup: true, // 打开派发到底部事件
      count: 12, // 数据总数量
      isLoading: false, // 是否显示正在加载中
      dataList: [] // 数据数组
    };
  },
  created () {
    this.loadData(10);
  },
  computed: {
    pullUpLoadObj () {
      return this.pullup ? {
        threshold: 0,
        txt: {more: '加载更多', noMore: '没有更多了'}
      } : false
    }
  },
  methods: {
    // 上拉加载更多方法
    loadMore () {
      // 当数组长度大于数据库数据总条数，关闭上拉监听
      if(this.dataList.length >= this.count) {
        this.pullup = false;
        return;
      }
      this.isLoading = true; // 显示正在加载中提示
      /**
       * 模仿真实请求
       */
      // showLoading(); // 打开菊花
      // 延迟获取数据
      setTimeout(() => {
        // 把获取到的数据添加到数组里面
        this.loadData(3)
        
        // hideLoading(); // 关闭菊花
      
        // this.isLoading = false; // 隐藏正在加载中提示
      }, 2000);
    },
    // 下拉刷新方法
    refreshData () {
      this.dataList = []; // 清空数据
      /**
       * 模仿真实请求
       */
      this.isRefresh = true;  // 打开菊花
      // 延迟获取数据
      setTimeout(() => {
        // 把获取到的数据添加到数组里面
        this.loadData(10)
        this.isRefresh = false; // 关闭菊花
      }, 1000);

    },
    // 模拟的请求的方法
    loadData (len) {
      for(let i=0; i< len; i++){
        this.dataList.push({index: i})
      }
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