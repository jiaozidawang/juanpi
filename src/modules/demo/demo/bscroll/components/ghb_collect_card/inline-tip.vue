<template>
  <span class="inline-tip">
    <slot> </slot>
  </span>
</template>


<style lang="less">
  .inline-tip{
    background-color: #f7f3ef;
    font-size: @fs18;
    display: inline-block;
    padding: .07rem .2rem;
    border-radius: .2rem;
    color: #bd9f8e
  }
</style>
