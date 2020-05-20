<template>
  
  <m-page>
    
    
    <section class="page_demo_index">

      
      <m-group >
        <cell title="卡号" :value="'1231214214124214'|bandCard"></cell>
        <cell title="卡号" :value="'123121*********4214'|bandCard"></cell>
      </m-group>
      <m-group title="超出多行省略">
        <ellpsis lineHeight="32" contentText="多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行多行超出省略号多行超出省略号多行超出省略号多行超出省略号多行" />
      </m-group>
      <m-group>
        <cell title="购买时间" inline-desc="标准五个字" value="￥90,000.23" :isLink="false"></cell>

        <cell title="产品名称" value="很棒的产品"  isLink></cell>

        
        
        <cell title="查看更多" :border-intent="false" isLink :arrow-direction="isShowMore? 'up':'down'" @clickHandler="isShowMore = !isShowMore"></cell>
        <div class="slide" :class="isShowMore? 'animate' : ''">
          <cell title="更多的东西"></cell>
          <cell title="更多的东西"></cell>
          <cell title="更多的东西"></cell> 
        </div>
        <cell title="可用金额：" value="￥100,000.00" ></cell>
        <cell title="附言" value="￥100,000.00" >
          <div class="fuyan">
            <span>转账</span>
            <div class="icon">
              <img src="~@assets/base/protect.svg" alt="">
            </div>
            
          </div>
        </cell>
        <cell title="罗峰(3389) 预约转账" inline-desc="中国建设银行"  isLink>
            <div class="bank-cell-value">
              <p>-￥2180.98</p>
              <p>成功</p>
            </div>
        </cell>    
          <div class="bank-icon" slot="icon"><img src="~@assets/bank-logo/bank13.png" ></div>
        <cell title="中国招商银行股份有限公司广州分行营业部" inline-desc="31583054188282"  >
          <div class="bank-icon" slot="icon"><img src="~@assets/bank-logo/bank17.png" ></div>
        </cell> 

        <cell title="中国招商银行股份有限公司广州分行营业部" inline-desc="31583054188282"  >
          <div slot="icon" style="margin-right: .2rem"><ghb-icon></ghb-icon></div>
        </cell>
      </m-group>
        
    </section>
      
  </m-page>
  
</template>
<script>
import cell from '@core/public/components/base/v-cell';
import ghbIcon from '@comps/ghb-icon';
import ellpsis from '@comps/ghb-text-ellipsis';
export default {
  name: 'cell-demo',
  components: {
    cell,
    ghbIcon,
    ellpsis
  },
  data () {
    return {
      title: 'cell组件示例',
      isShowMore: false
    };
  },
  mounted () {

  },
  created() {
  }
};
</script>
<style lang="less" scoped>
  @import url('./less/index.less');
</style>