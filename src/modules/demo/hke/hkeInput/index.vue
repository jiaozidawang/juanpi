<template>
  <m-page>
    <div class="main">
      <m-group>
        <hke-input v-model="hkeKeyword" :pinServerRandom="pinServerRandom"></hke-input>
        <hke-input v-model="hkeKeyword2" :pinServerRandom="pinServerRandom"></hke-input>
        <!-- <cell :value="hkeKeyword"></cell> -->

        <span style="font-size: 8px;">{{hkeKeyword}}</span>
      </m-group>

      <m-group title="云盾">
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('showPopupInput')" type="primary">调起云证通弹窗键盘</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('hideCloudKeyboard')" type="primary">隐藏云证通键盘</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('getCloudRandomNumber')" type="primary">获取云盾随机数</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('getCloudIdentitySign')" type="primary">获取客户端云盾身份认证</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('downloadCloudCertificate')" type="primary">下载云盾证书</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('signCloudKey')" type="primary">业务签名</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('setCloudKey')" type="primary">设置云证通密码</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('updateCloudKey')" type="primary">修改云证通密码</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('verifyPassword')" type="primary">验证云证通密码</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="cloudKey('showCloudKeyboard')" type="primary">调起云证通键盘</m-button>
        </div>
      </m-group>
    </div>
    <hkePopupInput
      title="请输入云盾密码"
      @sure="sure"
      v-model="showHkePopupInput"
      :pinServerRandom="pinServerRandom"
    ></hkePopupInput>
  </m-page>
</template>
<script>
import hkePopupInput from "@comps/ghb-pwdInput/hkePopupInput";
import hkeInput from "@comps/ghb-changePwdInput/hkeInput";
import cell from "@base/v-cell";
import {
  getCloudRandomNumber,
  signCloudKey,
  showCloudKeyboard,
  hideCloudKeyboard,
  getCloudIdentitySign,
  downloadCloudCertificate
} from "@bridge";
export default {
  components: {
    hkeInput,
    cell,
    hkePopupInput
  },
  data() {
    return {
      hkeKeyword: "",
      hkeKeyword2: "",
      pwdpopup: "",
      pinServerRandom: "",
      showHkePopupInput: false
    };
  },
  created() {
    console.log("12345");
    getCloudIdentitySign().then(res => {
      this.pinServerRandom = res.pinServerRandom || "";
      console.log("sh东东", this.pinServerRandom);
    });
  },
  methods: {
    sure(data) {
      console.log("发起业务请求", data);
    },
    cloudKey(keyName) {
      switch (keyName) {
        case "getCloudRandomNumber":
          getCloudRandomNumber().then(res => {
            console.log(res);
          });
          break;
        case "getCloudIdentitySign":
          getCloudIdentitySign().then(res => {
            console.log("测试撒啊啊啊啊", res);
          });
          break;
        case "downloadCloudCertificate":
          downloadCloudCertificate();
          break;
        case "signCloudKey":
          signCloudKey()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.error(err);
            });
          break;
        case "setCloudKey":
          break;
        case "updateCloudKey":
          break;
        case "verifyPassword":
          break;
        case "showCloudKeyboard":
          showCloudKeyboard().then(res => {
            console.log(res);
          });
          window.App.on("keyboardInputMsg", res => {
            console.log(res);
          });
          break;
        case "hideCloudKeyboard":
          hideCloudKeyboard({ isClean: true });
          break;
        case "showPopupInput":
          this.showHkePopupInput = true;
          break;
      }
      // AlipayJSBridge.call(keyName, params, res => {
      //   console.log(res);
      // })
    }
  }
};
</script>
<style lang="less">
</style>