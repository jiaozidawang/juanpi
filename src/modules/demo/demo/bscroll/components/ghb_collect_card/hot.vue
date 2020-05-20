<template>
  <span class="ghb-hot">
    <div class="ghb-hot-content_mask"></div>
    <div class="ghb-hot-content">
      <div class="text">热销</div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'ghb-hot'
};
</script>

<style lang="less">
  .ghb-hot{
    display: inline-block;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    border-radius: .05rem;
    position: relative;
    overflow: hidden;
    .text{
      color: @font-t0;
      transform: rotate(45deg);
      font-size: @fs24;
      text-align: center;
      padding-left: .4rem;
      padding-block-end: .1rem;
    }
  }



  .ghb-hot-content_mask{
    background: @color-main;
    position: absolute;
    width: 2rem;
    height: 1rem;
    top: -.24rem;
    left: 0rem;
    transform: rotate(45deg);
  }
</style>