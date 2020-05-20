


<template>
  <div class="ghb-warn">
    <div class="ghb-warn_content">
      <span>{{warnText}}</span>
      <span class="ghb-warn_content_handler" @click="$emit('clickHandler')">{{handlerText}}</span>
    </div>

    <div class="ghb-warn_arrow"></div>
  </div>
</template>

<script>
export default {
  props: {
    handlerText: {
      type: String,
      default: ''
    },
    warnText: {
      type: String,
      default: ''
    }
  }
}
</script>



<style lang="less">
  .ghb-warn{
    background-color: @bg-warn;
    color: @font-t0;
    height: .5rem;
    line-height: .5rem;
    position: relative;
  }
  .ghb-warn_content{
    font-size: @fs24;
    padding: 0 @spacing;
    .ghb-warn_content_handler{
      text-decoration: underline;
    }
  }
  .ghb-warn_arrow{
    position: absolute;
    top: -.4rem;
    left: .1rem;
    z-index: -1;
    width: 0;
    height: 0;
    border-width: .3rem;
    border-style: solid;
    border-color:transparent  transparent @bg-warn transparent;
  }
</style>

