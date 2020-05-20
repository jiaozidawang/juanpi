<template>
  <m-page>
    <!-- <ghb-toast></ghb-toast> -->
    <div class="main">
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="alert">alert</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="errorAlert">errorAlert</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="errorAlertH5">errorAlertH5</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="confirm">confirm</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="toast('1')">系统successToast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button type="primary" @clickHandler="toast('2')">系统errorToast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('调用成功啦', 'success')" type="primary">底部成功Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('调用失败啦', 'fail')" type="primary">底部失败Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('收藏成功', 'collect', 500)" type="primary">收藏Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('已取消收藏', 'cancleCollect', 500)" type="primary">取消收藏Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button
          @clickHandler="showToast('调用成功啦', 'success', 1000, 'middle')"
          type="primary"
        >中部成功Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('调用成功啦', '', 1000, 'middle')" type="primary">中部纯文字Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button
          @clickHandler="showToast('调用成功啦调用成功啦调用成功啦调用成功啦调用成功啦调用成功啦调用成功啦', '', 1000)"
          type="primary"
        >中部很长的纯文字Toast</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button
          @clickHandler="showToast('正在加载中', 'loading', 2000, 'middle')"
          type="primary"
        >loading</m-button>
      </div>
      <div class="button" style="padding: .2rem .32rem">
        <m-button @clickHandler="showToast('hideLoading')" type="primary">隐藏loading</m-button>
      </div>
    </div>
  </m-page>
</template>
<script>
import { alert, errorAlert, confirm, successToast, errorToast, errorAlertH5 } from "@bridge";
import { setTimeout } from "timers";
export default {
  name: "demo2",
  components: {},
  data() {
    return {};
  },
  methods: {
    alert() {
      alert("温馨提示", "不是这个样式啊", { button: "我知道了" });
    },
    errorAlertH5 () {
      errorAlertH5();
    },
    errorAlert () {
      errorAlert('错误处理').then(res => {
        alert('来了来了，她真的来了');
      });
    },
    confirm() {
      confirm("", "不是这个样式啊", { okButton: "好的", cancelButton: "不行" });
    },
    showToast(message, type, duration = 2000, position = "bottom") {
      if (message == "hideLoading") {
        this.$hideToast();
        return;
      }
      this.$toast(message, type, { duration, position });
      setTimeout(() => {
        this.$hideToast();
      }, 2000);
    },
    toast(val) {
      if (val == "1") {
        successToast("成功了");
      } else {
        errorToast("失败了");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  padding-bottom: 1rem;
}
</style>

