<template>
  <div class="no-data-comp" @click="$emit('clickHandler', {flag: 'noData'})">
    <div v-if="!connectFailed" class="no-data-comp-content" :style="{paddingTop: paddingTop}">
      <div class="no-data-img">
        <img :src="require('./images/img_kongyemian@2x.png')" alt="暂无数据" />
      </div>
      <div class="text-content">
        <span>{{text}}</span>
        <span v-if="link.text">，</span>
        <span class="text-link" v-if="link.text" @click="$tools.pushWindow(link.url)">{{link.text}}</span>
      </div>
    </div>
    <div v-else class="no-data-comp-content" :style="{paddingTop: paddingTop}">
      <div class="no-data-img">
        <img :src="require('./images/offline@2x.png')" alt="暂无数据" />
      </div>
      <div class="text-content">
        <span>网络连接失败，请稍后重试</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    paddingTop: {
      type: String,
      default: '40%'
    },
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    connectFailed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.no-data-comp {
  height: 100%;
  .no-data-comp-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
  // // align-items: center;
  }
  .no-data-img {
    text-align: center;
    img {
      display: inline-block;
      height: 120px;
      width: 120px;
    }
  }
  .text-content {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: inline-block;
      height: 1px;
      width: 20px;
    }
    span {
      // padding: 0 10px;
      color: @font-t2;
      font-size: 14px;
    }
    .text-link{
      color: @linkUrl
    }
  }
}
</style>

