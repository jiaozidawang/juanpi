<template>
  <m-page>
    <section class="page_demo_index">
        
      <br/>
        <p class="caption_title">{{title}}</p>
      <br/>

      <m-group title="字体展示">
        <div>
          <p class="fs40">字体$fs40</p>
          <p class="fs36">字体$fs36</p>
          <p class="fs30">字体$fs30</p>
          <p class="fs28">字体$fs28</p>
          <p class="fs24">字体$fs24</p>
          <p class="fs22">字体$fs22</p>
          <p class="fs18">字体$fs18</p>
        </div>
      </m-group>
      
      <div >
        <div class="lh40">行高$lh-st</div>
        <div class="lh90">行高$lh-line</div>
        <div class="lh120">行高$lh-line-muti</div>
        <div class="lh160">行高$lh-line-muti2</div>
      </div>

        
    </section>
      
  </m-page>
  
</template>
<script>
export default {
  name: 'fontex-demo',
  data () {
    return {
      title: '字体行高展示'
    };
  },
  created () {
    console.log(navigator.userAgent);
  }
};
</script>
<style lang="less" scoped>
  @import '~@core/public/less/mixin.less';
  .page_demo_index{
      padding-bottom: 2rem;
    .caption_title{
      font-size:28px;
      text-align: center;
    }
  }

  .fs40{
      font-size: @fs40;
      padding: 0 @spacing;
  }
  .fs36{
      font-size: @fs36;
      padding: 0 @spacing;
  }
  .fs30{
      font-size: @fs30;
      padding:0 @spacing;
  }
  .fs28{
      font-size: @fs28;
      padding:0 @spacing;
  }
  .fs24{
      font-size: @fs24;
      padding:0 @spacing;
  }
  .fs22{
      font-size: @fs22;
      padding:0 @spacing;
      color:@font-blue
  }
  .fs18{
      font-size: @fs18;
      padding:0 @spacing;
      color:@font-blue
  }

  .lh40{
      text-align: center;
      height: @lh-st;
      font-size: @fs18;
      background-color: #fff;
      margin-top: .2rem;
      line-height: @lh-st;
  }
  .lh90{
      text-align: center;
      height: @lh-line;
      line-height: @lh-line;
      background-color: #fff;
      margin-top: .2rem;
  }
  .lh120{
      text-align: center;
      height: @lh-line-muti;
      line-height: @lh-line-muti;
      background-color: #fff;
      margin-top: .2rem;
  }
  .lh160{
      text-align: center;
      height: @lh-line-muti2;
      line-height: @lh-line-muti2;
      background-color: #fff;
      margin-top: .2rem;
  }

</style>