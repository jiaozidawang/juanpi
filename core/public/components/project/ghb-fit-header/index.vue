 <template>
  <m-page class="fit-page">
    <div class="fit-header" id="fitHeader">
      <div class="fit-titleBar" v-if="needTitleBar">
        <div class="fit-titleBar_left">
          <div class="fit-titleBar_arrow ghb_arrow" :class="arrowClass" @click="backHandler"></div>
          <slot name="left"></slot>
        </div>
        <div class="fit-titleBar_center" :style="{color: titleTheme === 'white' ? '#fff' : '#000'}">
          {{title}}
        </div>
        <div class="fit-titleBar_right">
          <slot name="right"></slot>
        </div>
      </div>
      <div class="fit-header-content" :style="{height: headerHeight + 'px'}">
        <slot name="head"></slot>
      </div>
    </div>
    <div class="fit-content" :class="{'main': isFixed}" :style="mainStyle" >
      <slot class="fit-main"></slot>
    </div>
  </m-page>
</template>
<script>
import { setTimeout } from 'timers';
import { Promise, reject } from 'q';
import { getSafePadding, popWindow } from '@bridge';
export default {
  props: {
    mainStyle: {
      type: Object
    },
    title: {
      type: String,
      default: '标题'
    },
    headerHeight: {
      type: String,
      default: '116'
    },
    titleTheme: {
      type: String,
      default: 'white'
    },
    backgroundImageUrl: {
      type: String,
      default: ''
    },
    needTitleBar: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      backgroundImage: null,
      // 是否把头部固定在顶部
      // isFixed: false
    }
  },
  computed: {
    arrowClass () {
      return {
        "ghb_arrow_black" : this.titleTheme !== 'white',
        "ghb_arrow_white" : this.titleTheme == 'white'
      }
    }
  },
  created () {
     if(this.backgroundImageUrl !='' && typeof this.backgroundImageUrl == 'string') {
        // /transfer/zhuanz_img_toubbg@2x
        this.backgroundImage = require(`@assets/headerBackground/${this.backgroundImageUrl}`);
      }
  },
  mounted () {
    // 获取顶部状态栏高度
    getSafePadding().then(res => {

      // /**
      //  * 在pageInfo配置hasTitle为false时，iphoneX没有了原生的titlebar，但是会出现安全距离，这个时候不需要适配安全距离
      //  */
      // // if(this.$tools.isIPhoneX()) {
      // if(res.os && res.os == 'iOS') {
      //   res.height = 0;
      // }
      this.fitHeader(res.height)
    });
    // 设置是否需要头部fixed定位
    // const main = this.$slots.default[0].elm
    // if(main.className.indexOf('main') !== -1) {
    //   this.isFixed = true;
    // };
  },
  methods: {
    // 适配
    fitHeader (pd) {
      const model = navigator.userAgent
      let el = document.querySelector('#fitHeader');
      el.style.paddingTop = pd + 'px';

      let content = document.querySelector('.fit-content');
      content.style.top = Number(pd) + 50 + 'px';
      if(this.backgroundImage ) {
        // console.log(Number(pd), 50, Number(this.headerHeight));
        el.style.background = `url(${this.backgroundImage}) 0% 0% / 100% ${Number(pd) + 50 + Number(this.headerHeight)}px no-repeat`;
      }
    },
    backHandler () {
      popWindow();
      this.$emit('back');
    }
  },
}
</script>
<style lang="less">
// @import "./less/index.less";
.fit-page{
  position: relative;
}

.fit-main{
  position: absolute;

}

.fit-content{
  position: absolute;
  width: 7.5rem;
  top: 0;

}

.fit-header{
  position: absolute;
  top: 0;
  width: 7.5rem;
  background: linear-gradient(to right, hsla(5, 63%, 45%, 1), hsla(357, 72%, 34%, 1));
}

.fit-titleBar{
  height: 1rem;
  // background-color: #fff;
  position: relative;
  font-size: @fs36;
  padding: 0 @spacing;
  &_left, &_right {
    position: absolute;
  }
  &_left{
    padding-left: @spacing;
    left: 0;
  }
  &_right {
    padding-right: @spacing;
    right: 0;
  }
  &_center{
    width: 100%;
    text-align: center;
    line-height: 1rem;
  }
}

.fit-titleBar_arrow{
  width: .4rem;
  height: 1rem;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -.2rem;
    right: -.2rem;
    top: 0;
    bottom: 0;
  }
}

.ghb_arrow_black{
  &::after {
    border-color: #000;
  }
}
.ghb_arrow_white{
  &::after {
    border-color: #fff;
  }
}

.ghb_arrow{
  &::after {
    right: none;
    left: .2rem;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-180deg);
  }
}
.fit-header-content{
  // height: 2.38rem;
  width: 7.5rem;
  // position: absolute;
}
</style>
