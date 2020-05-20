<template>
  <m-page>
    <section class="page_demo_index">
      <m-group title="按钮展示">
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('isSupportHCEBank')">手机是否支持云闪付功能</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_init')">初始化注册HCE功能</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_getPaymentCards')">获取所有云卡信息</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_getDefaultPaymentCard')">获取默认云卡信息</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_setDefaultPaymentCard')">设置默认云卡</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_revokeCard')">注销云卡</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_applyCard')">申请云卡</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_applyActivationCode')">云卡激活码申请</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_activateCard')">云卡激活</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_checkIsDefaultApp')">检测手机是否已设置本应用为默认HCE支付应用</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_setDefaultApp')">调起是否设置本应用程序为默认HCE支付应用的弹窗</m-button>
        </div>
        <div class="btn-box" >
          <m-button type="primary" @clickHandler="cloud_pay('hce_cleanStorageCache')">清空云卡</m-button>
        </div>
      </m-group>      
    </section>
  </m-page>
  
</template>
<script>
import {
  alert,
  isSupportHCEBank, //手机是否支持云闪付功能，返回true或者false
  hceInit, //初始化注册HCE功能，返回code和msg
  hceGetPaymentCards, //获取所有云卡信息
  hceGetDefaultPaymentCard, //获取默认云卡信息
  hceSetDefaultPaymentCard, //设置默认云卡
  hceRevokeCard, //注销云卡
  hceApplyCard, //申请云卡
  hceApplyActivationCode, //云卡激活码申请
  hceActivateCard, //云卡激活
  hceCheckIsDefaultApp, //检测手机是否已设置本应用为默认HCE支付应用
  hceSetDefaultApp, //调起是否设置本应用程序为默认HCE支付应用的弹窗
  hceCleanStorageCache //清空云卡
} from "@bridge";
// import { resolve } from "q";
export default {
  methods: {
    cloud_pay(key) {
      console.log("cloud_pay", key);
      // if (key == "isSupportHCEBank") {
      //   isSupportHCEBank().then(res => {
      //     console.log(res);
      //     alert(JSON.stringify(res));
      //   });
      // }
      switch (key) {
        case "isSupportHCEBank":
          isSupportHCEBank().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_init":
          hceInit({ userId: "13828477871" }).then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_getPaymentCards":
          hceGetPaymentCards().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_getDefaultPaymentCard":
          hceGetDefaultPaymentCard().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_setDefaultPaymentCard":
          hceSetDefaultPaymentCard({ index: 0 }).then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_revokeCard":
          hceRevokeCard({ tokenPan: 0 }).then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_applyCard":
          let dataObj = {
            productCode: "1005785800010000",
            pan: "6236272201000116086",
            cardHolderName: "林捷明",
            expiryDate: "1908",
            verificationNumber: "582",
            verificationPin: "",
            cardHolderID: "440111199212170333",
            cardHolderIDType: "1010",
            mailBox: "",
            phoneNo: "13660164961"
          };
          let applyCard = JSON.stringify(dataObj);
          hceApplyCard({ applyCard: applyCard }).then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_applyActivationCode":
          hceApplyActivationCode({ tokenPan: "113213" }).then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_activateCard":
          hceActivateCard({ tokenPan: "01123123123", code: "123123" }).then(
            res => {
              console.log(res);
              alert(key + ":" + JSON.stringify(res));
            }
          );
          break;
        case "hce_checkIsDefaultApp":
          hceCheckIsDefaultApp().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_setDefaultApp":
          hceSetDefaultApp().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
        case "hce_cleanStorageCache":
          hceCleanStorageCache().then(res => {
            console.log(res);
            alert(key + ":" + JSON.stringify(res));
          });
          break;
      }
    }
  }
};
</script>
