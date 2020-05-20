<template>
  <m-page>
    <section class="page_demo_index">
      
      <m-group title="按钮展示">
          
        <div class="btn-box" >
          <m-button type="primary">大按钮 primary</m-button>
        </div>
        <div class="btn-box" >
          <m-button>大按钮 default</m-button>
        </div>
        <!-- <div class="btn-box" >
          <m-button type="warn">大按钮</m-button>
        </div> -->
        <div class="btn-box" >
          <m-button type="primary" disabled>不可点击</m-button>
        </div>
        <!-- <div class="btn-box" >
          <m-button type="extend">大按钮 extend</m-button>
        </div> -->
        
        <div class="btn-box">
          <m-button size="M" type="primary">中按钮 primary</m-button>
          <m-button size="M" >中按钮 warn</m-button>
        </div>
        
        <div class="btn-box">
            <m-button size="S" >小按钮 primary</m-button>
            <m-button size="S" >小按钮 disabled</m-button>
            <m-button size="S" >小按钮 warn</m-button>
        </div>
      </m-group>

      <m-group title="普通多按钮组合">
        <ghb-globalMutiButton
          :isExtend="true"
          :buttons="{
            leftText: '赎回',
            leftType: 'reset',
            rightText: '购买',
            rightType: 'primary'
          }"
          :extendType="extendType"
          @clickHandler="clickMutiButton"
        ></ghb-globalMutiButton>
      </m-group>

      <m-group title="多按钮组合">
        <ghb-globalMutiButton
          :buttons="{
            leftText: '赎回',
            leftType: 'reset',
            rightText: '购买',
            rightType: 'primary'
          }"
          @clickHandler="clickMutiButton"
        ></ghb-globalMutiButton>
      </m-group>

      <m-group title="拓展按钮+单按钮组合">
        <ghb-globalMutiButton
          :isExtend="true"
          isSingle
          :buttons="{
            rightText: '购买',
            rightType: 'primary'
          }"
          :extendType="extendType"
          @clickHandler="clickMutiButton"
        ></ghb-globalMutiButton>
      </m-group>

      <m-group title="拓展按钮+单按钮禁用组合">
        <ghb-globalMutiButton
          :isExtend="true"
          isSingle
          :buttons="{
            rightText: '购买',
            rightType: 'primary'
          }"
          :buyButtonDisabled="true"
          :extendType="extendType"
          @clickHandler="clickMutiButton"
        ></ghb-globalMutiButton>
      </m-group>

        
    </section>
      
  </m-page>
  
</template>
<script>
import ghbGlobalMutiButton from '@comps/ghb-globalMutiButton';
import {successToast} from '@bridge';
export default {
  name: 'buttons-demo',
  components: {
    ghbGlobalMutiButton
  },
  created () {
    console.log(navigator.userAgent);
  },
  data () {
    return {
      extendType: 'collect',
      isClickCollect: true
    };
  },
  methods: {
    clickMutiButton (id) {
      switch (id) {
        case 'extend':
          if(this.isClickCollect) {
            this.$toast('收藏成功', 'collect', 500);
            this.extendType = 'collected';
          } else {
            this.$toast('已取消收藏', 'cancleCollect', 500);
            this.extendType = 'collect';
          }
          this.isClickCollect = !this.isClickCollect;
          break;
        case 'left':
          successToast('点击左边按钮');
          break;
        case 'right':
          successToast('点击右边按钮');
          break;
      }
    }
  }
};
</script>
