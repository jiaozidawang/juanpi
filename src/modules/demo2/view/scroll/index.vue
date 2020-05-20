<template>
    <u-page>
        <div class="top" slot="top">
            <u-navbar title="导航" :rightMenu="navRightMenu"> </u-navbar>
        </div>
        <div class="content">
            <e-scroll
                class="wrapper"
                ref="scroll"
                :pullUpOption="pullUpLoadObj"
                :data="dataList"
                :pullDownOption="pullDownRefreshObj"
                @pullingDown="refreshData"
                @pullingUp="loadMore"
            >
                <ul>
                    <li v-for="(item, index) in dataList" :key="index">
                        <card></card>
                    </li>
                </ul>
            </e-scroll>
        </div>
    </u-page>
</template>
<script>
import Page from '@/components/UPage';
import Navbar from '@/components/UNavbar';
import Content from '@/components/Ucontent';
import Scroll from '@/components/EScroll';
import Card from './components/card';
export default {
  name: 'Layout',
  props: {},
  components: {
    [Page.name]: Page,
    [Navbar.name]: Navbar,
    [Content.name]: Content,
    [Scroll.name]: Scroll,
    Card
  },
  data() {
    return {
      pullup: true,
      pulldown: true,
      hasMore: true,
      count: 23,
      dataList: [], // 数据数组
      navRightMenu: [
                { label: '客服', value: 'im', icon: '', disabled: 'disabled' },
        {
          label: '哈哈',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        },
        {
          label: '哈哈1',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        }
      ]
    };
  },
  watch: {},
  computed: {
    pullUpLoadObj() {
      return this.pullup
                ? {
                  threshold: -50,
                  txt: {
                    more: '上拉加载更多',
                    noMore: '—— 嗨，您已经拉到底了哦 ——'
                  }
                }
                : false;
    },
    pullDownRefreshObj() {
      return this.pulldown
                ? {
                  threshold: 90,
                  stop: 50,
                  txt: '刷新成功'
                }
                : false;
    }
  },
  created() {
    this.loadData(10);
  },
  methods: {
        // 上拉加载更多方法
    loadMore() {
      console.log('上拉加载更多');
            // 当数组长度大于数据库数据总条数，关闭上拉监听
      if (this.dataList.length >= this.count) {
        this.hasMore = false;
      }
            /**
             * 模仿真实请求
             */
            // 延迟获取数据
      setTimeout(() => {
        if (this.hasMore) {
          this.$refs.scroll.forceUpdate(true);
          this.loadData(5);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      }, 300);
    },
        // 下拉刷新方法
    refreshData() {
            /**
             * 模仿真实请求
             */
            // 延迟获取数据
      setTimeout(() => {
                // 把获取到的数据添加到数组里面
        this.dataList = []; // 清空数据
        this.loadData(10);
        if (this.dataList.length < this.count) {
          this.hasMore = true;
          this.$refs.scroll.pullUpDirty = true;
          console.log('是否还有更多', this.hasMore);
        }
      }, 5000);
    },
        // 模拟的请求的方法
    loadData(len) {
      for (let i = 0; i < len; i++) {
        this.dataList.push({ index: i });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
.textBox {
    height: 300px;
}
.content {
    height: 100%;
}
</style>
