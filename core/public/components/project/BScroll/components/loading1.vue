<template>
  <div class="main">
    <div class="ghb-loading sprite-rice"></div>
  </div>
</template>


<style lang="less" scoped>
  @loadingImageSize: 30px;
  .ghb-loading{
    width: @loadingImageSize;
    height: @loadingImageSize;
    background:url('./images/sprite.png') no-repeat;
    background-size: @loadingImageSize*23  @loadingImageSize;
  }

  .sprite-rice{
    animation: p8 steps(22,end) 2s infinite;
  };

  @keyframes p8 {
    100% {background-position: -@loadingImageSize*22px 0;}
  }

</style>
