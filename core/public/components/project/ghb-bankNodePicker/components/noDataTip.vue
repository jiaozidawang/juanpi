<template>
  <div class="no-data-comp">
    <div class="no-data-img">
      <img src="../images/img_kongyemian@2x.png" alt="暂无数据">
    </div>
    <div class="text-content">
      <img :src="require('../images/icon_zanwusj_left@2x.png')">
      <span>暂无数据</span>
      <img :src="require('../images/icon_zanwusj_right@2x.png')">
    </div>
  </div>
</template>
<style lang="less" scoped>
.no-data-comp {
  padding-top: 110px;
  .no-data-img {
    text-align: center;
    img {
      display: inline-block;
      height: 130px;
      width: 130px;
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
      padding: 0 10px;
      color: #d3dbe4;
      font-size: 12px;
    }
  }
}
</style>

