<template>
  <div class="mf-loading-container">
    <img src="./icon_loading_20@2x.png">
  </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="scss">
  .mf-loading-container{
    img{
      width: 20px;
      height: 20px;
      display: block;
      animation: loading-ami .7s infinite linear;
    }
  }

@keyframes loading-ami {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
