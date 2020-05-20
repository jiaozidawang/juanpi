<template>
  <m-page>
    <m-group>
      <ghb-bank-node-picker v-model="isShowAddress" :searchInfo="{bankName: '广东农业银行', bankId: '103100000026'}" @click.native="showAddress"></ghb-bank-node-picker>
    </m-group>
    
    
  </m-page>
</template>

<script>
  import ghbBankNodePicker from '@comps/ghb-bankNodePicker';
  export default {
    components: {
      ghbBankNodePicker
    },
    data () {
      return {
        isShowAddress: false
      };
    },
    methods: {
      showAddress () {
        this.isShowAddress = true;
      }
    }
  };
</script>
<style lang="less" scoped>
</style>

