<template>
  <!-- <canvas ref="bubble" :width="width" :height="height" :style="style"></canvas> -->
  <div class="main">
    <div class="ghb-loading" :class="loadingClass"></div>
  </div>
</template>

<script>
  export default {
    props: {
      y: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        picNumber: 1
      }
    },
    computed: {
      loadingClass () {
        return 'sprite-rice-' + this.picNumber
      }
    },
    watch: {
      y (newVal, oldVal) {
        console.log(parseInt(newVal), (parseInt(newVal)-7)/3);
        if(parseInt((parseInt(newVal))/3) > 23){
          this.picNumber = 23;
          return;
        }
        this.picNumber = parseInt((parseInt(newVal)-3)/3);
      }
    }
  }
</script>

<style lang="less" scoped>
  @loadingImageSize: 30px;
  .main{
    // background-color: blue;
  }
  .ghb-loading{
    width: @loadingImageSize;
    height: @loadingImageSize;
    background:url('./images/sprite.png') no-repeat;
    background-size: @loadingImageSize*23  @loadingImageSize;
  }

  .sprite-rice-1{background-position: 0 0};
  .sprite-rice-2{background-position: -@loadingImageSize 0};
  .sprite-rice-3{background-position: -@loadingImageSize*2 0};
  .sprite-rice-4{background-position: -@loadingImageSize*3 0};
  .sprite-rice-5{background-position: -@loadingImageSize*4 0};
  .sprite-rice-6{background-position: -@loadingImageSize*5 0};
  .sprite-rice-7{background-position: -@loadingImageSize*6 0};
  .sprite-rice-8{background-position: -@loadingImageSize*7 0};
  .sprite-rice-9{background-position: -@loadingImageSize*8 0};
  .sprite-rice-10{background-position: -@loadingImageSize*9 0};
  .sprite-rice-11{background-position: -@loadingImageSize*10 0};
  .sprite-rice-12{background-position: -@loadingImageSize*11 0};
  .sprite-rice-13{background-position: -@loadingImageSize*12 0};
  .sprite-rice-14{background-position: -@loadingImageSize*13 0};
  .sprite-rice-15{background-position: -@loadingImageSize*14 0};
  .sprite-rice-16{background-position: -@loadingImageSize*15 0};
  .sprite-rice-17{background-position: -@loadingImageSize*16 0};
  .sprite-rice-18{background-position: -@loadingImageSize*17 0};
  .sprite-rice-19{background-position: -@loadingImageSize*18 0};
  .sprite-rice-20{background-position: -@loadingImageSize*19 0};
  .sprite-rice-21{background-position: -@loadingImageSize*20 0};
  .sprite-rice-22{background-position: -@loadingImageSize*21 0};
  .sprite-rice-23{background-position: -@loadingImageSize*22 0};

</style>
