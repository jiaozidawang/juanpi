export default {
  data () {
    return {
      pulldown: true, // 打开派发下拉事件
      pullup: true, // 打开派发到底部事件
      pageSize: 10, // 页面条数
      count: 0,
      currentPage: 1, // 当前页数
    }
  },
  computed: {
    pullUpLoadObj () {
      return this.pullup ? {
        threshold: -50,
        txt: {more: '上拉加载更多', noMore: '…… 嗨，您已经拉到底了哦 ……'}
      } : false;
    },
    pullDownRefreshObj () {
      return this.pulldown ? {
        threshold: 90,
        stop: 40,
        txt: '刷新成功'
      } : false;
    }
  }
}
