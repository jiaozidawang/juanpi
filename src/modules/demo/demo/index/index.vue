<template>
  <m-page :isLoading="isLoading">
    <section class="page_demo_index">
      <br>
      <p class="caption_title">{{title}}</p>
      <br>
      <m-group>
        <cell is-link @clickHandler="goDemo2('form')" title="进入表单组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('reminder')" title="进入温馨提示组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('datepick')" title="进入picker展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('address')" title="进入地址选择展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('globalTip')" title="进入全局提示组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('absort')" title="进入收款人名册排序展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('result')" title="进入结果组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('bscroll')" title="进入BScroll示例展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('button')" title="进入button组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('cell')" title="进入cell组件展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('fontex')" title="进入字号展示页面"></cell>
        <cell is-link @clickHandler="goDemo2('jsapi')" title="进入jsapi示例页面"></cell>
        <cell is-link @clickHandler="goDemo2('/hke/hkeInput')" title="进入云盾页面"></cell>
      </m-group>
    </section>
  </m-page>
</template>
<script>
import { toast } from "@bridge";
import cell from "@core/public/components/base/v-cell";
import search from "@core/public/components/base/v-search";
import vSwitch from "@core/public/components/base/v-switch";
import {
  pushWindow,
  successToast,
  errorToast,
  getDeviceAndAppInfo,
  setSessionStorage
} from "@core/bridge";
import { setTimeout } from "timers";

export default {
  name: "demo",
  components: {
    cell,
    search,
    vSwitch,
  },
  data() {
    return {
      title: "欢迎使用demo示例",
      isShowMore: false,
      isFingerOpen: false,
      isShowSelectCard: false,
      amt: "", // 总金额
      amt2: "",
      isLoading: true,
    };
  },
  created() {
    let setSessParams = {
      accNo_sequence: "998",
      transFlow: "886"
    };
    setSessionStorage("fundSignFlow", setSessParams);
    console.log(navigator.userAgent);
    const _self = this;
    setTimeout(() => {
      _self.isLoading = false;
    }, 1000);
    getDeviceAndAppInfo().then(res => {
      console.log(res);
    });
  },
  resume(opt) {
    console.log("opt", opt);
    if (this.$tools.isEmptyObject(opt)) {

    }
  },
  methods: {
    cleanInput() {
      this.amt = "";
    },
    messageClick() {
      console.log("哈哈");
    },
    goDemo2(url) {
      if (url == "absort") {
        pushWindow(
          `/demo/demo/${url}.html`,
          { channel: "demo" },
          {
            titleBarColor: 11944508
          }
        );
      } else if (url.indexOf("hke") != -1) {
        pushWindow(`/demo${url}.html`, { channel: "demo" });
      } else if (url.indexOf("cell") != -1) {
        pushWindow(`/demo/demo/cell.html`, { channel: "demo" });
      }
      pushWindow(
        `/demo/demo/${url}.html`,
        { channel: "demo" },
        {
          defaultBack: "title_back_black"
        }
      );
    },
    toastSucc() {
      successToast("成功啊");
    },
    errorToast() {
      errorToast("失败啊");
    },
    copy() {
      toast("复制东西啦");
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@core/public/less/mixin.less";
.page_demo_index {
  padding-bottom: 2rem;
  .caption_title {
    font-size: 28px;
    text-align: center;
  }
}
.button {
  margin: 0.2rem 0;
  padding: 0 0.32rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bank-icon {
  .setIconSize;
}
.icon {
  .setIconSize(0.4rem, 0.4rem);
}

.bank-cell-value {
  p:nth-child(1) {
    font-weight: bold;
    color: @font-t1;
  }
  p:last-child {
    color: @font-t2;
  }
}

.sumInputFormat_all {
  width: 2rem;
  padding-left: 0.2rem;
  font-size: @fs30;
  color: @color-main;
}
</style>