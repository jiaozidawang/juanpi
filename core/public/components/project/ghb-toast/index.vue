<template>
  <transition :name="position" >
    <div class="ghb-toast" v-show="show">
      <div v-if="type" class="ghb-toast_icon" :class="iconClass"></div>
      <div class="ghb-toast_text">
        {{message}}
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    type: "",
    message: "",
    position: 'bottom'
  },
  computed: {
    iconClass () {
      return [
        {
          'icon_collect': this.type == 'collect',
          'icon_collect_cancle': this.type == 'cancleCollect',
          'icon_success': this.type == 'success',
          'icon_fail': this.type == 'fail',
          'icon_loading': this.type == 'loading'
        }
      ]
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@core/public/less/mixin.less';
.ghb-toast {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: .2rem;
  min-width: 1.6rem;
  max-width: 6.28rem;
  font-size: .3rem;
  color: #fff;
  text-align: center;
  border-radius: .04rem;
  z-index: 999;
  background-color:rgba(9, 18, 43, .8);
}

.ghb-toast_icon{
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: .2rem;
}

.ghb-toast_text{
  padding: 0 .4rem;
}


.icon_collect{
  .setBgIcon('~@assets/base/toast_collect@2x.png', .48rem);
}

.icon_collect_cancle{
  .setBgIcon('~@assets/base/collect_cancle@2x.png', .48rem);
}

.icon_success{
  .setBgIcon('~@assets/base/toast_success@2x.png', .48rem);
}
.icon_fail{
  .setBgIcon('~@assets/base/warn@2x.png', .48rem);
}

.icon_loading{
  transform: rotateX(360deg);
  animation: loading-ami .7s infinite linear;
  .setBgIcon('~@assets/base/icon_loading@2x.png', .72rem);
}

.ghb-toast-mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 501;
  background: rgba(0, 0, 0, .5);
}

@keyframes loading-ami {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.bottom-enter-active {
  transform-origin: center center;
  animation: enter-ani .3s
}
.bottom-leave-active {
  animation: leave-ani .3s
}
@keyframes enter-ani {
  0% {
    opacity: 0;
    // transform: translateX(-50%) scale(1.2);
    bottom: 0;
  }
  90% {
    opacity: 1;
    bottom: 10.5%;
    transform: translateX(-50%) scale(1) ;
  }
  100% {
    opacity: 1;
    bottom: 10%;
    transform: translateX(-50%) scale(1) ;
  }
}
@keyframes leave-ani {
  0% {
    opacity: 1;
    transform: scale(1) translateX(-50%);
  }
  100% {
    opacity: 0;
    transform: scale(.8) translateX(-60%);
  }
}

.middle-enter-active {
  transform-origin: center center;
  animation: enter-mid-ani .3s
}
.middle-leave-active {
  animation: leave-mid-ani .3s
}

@keyframes enter-mid-ani {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}
@keyframes leave-mid-ani {
  0% {
    opacity: 1;
    transform: scale(1) translateX(-50%);
  }
  100% {
    opacity: 0;
    transform: scale(.8) translateX(-60%);
  }
}
</style>
