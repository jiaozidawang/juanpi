<template>
<div class="ghb-topSecTip">
 
<div class="ghb-topSecTip-init">
  <div class="img"><img src="./image/zhuanz_icon_tianyssfkxt_dunpai@2x.png" alt=""></div>
  <span>华兴天眼实时风控系统为您资金安全保驾护航</span>
</div>
</div>
</template>
<script>
export default {
  name: "ghb-topSecTip"
};
</script>
<style lang="less">
@import '~@core/public/less/mixin.less';
.ghb-topSecTip {
  height: 24px;
  background-color: #fff;
  .ghb-topSecTip-init{
    height: 24px;
    .flex;
    align-items: center;
    justify-content: center;
    // background: radial-gradient(circle, #cbf1e7 .2px, #ffffff);
    // background-size: 9rem .5rem;
    background: url('./image/zhuanz_img_tianyssfkxt_bg@2x.png') no-repeat;
    background-size: contain;
    background-position: 0 0;
    .img{
      .setIconSize(12px, 13px);
      margin-right: 4px;
    }
  }
}
</style>