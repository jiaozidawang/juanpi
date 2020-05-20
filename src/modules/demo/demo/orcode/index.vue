<template>
  <div>
    <label>云闪付首页</label>
    <qrcode value="http://192.168.1.183:8082/ghb_cloud_pay/mycloudcard/index.html" type="img"></qrcode>    
 
    <label>云闪付激活</label>
    <qrcode value="http://192.168.1.183:8082/ghb_cloud_pay/activat/activating.html" type="img"></qrcode>    

    <label>云闪付demo</label>
    <qrcode value="http://192.168.1.183:8082/demo/demo/cloud_pay.html" type="img"></qrcode>    

  </div>
</template>
<script>
import { Qrcode } from 'vux';

export default {
  components: {
    Qrcode
  }
};
</script>
<style lang="less">

</style>
