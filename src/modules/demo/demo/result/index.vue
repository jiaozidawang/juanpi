<template >
  <pageFit backgroundImageUrl="zhuanz_img_toubbg@2x.png" >
      <div class="main">
        <ghb-operate-result ResultType="success" title="购买成功" describe="您的理财产品已经购买成功!"></ghb-operate-result>
        <div class="div" style="height: .6rem;background: #fff"></div>
        <ghb-operate-result-item title="产品名称">稳定1号2019044期</ghb-operate-result-item>
        <ghb-operate-result-item title="购买金额">￥30,000.00</ghb-operate-result-item>

        <div class="divider"></div>
        <ghb-operate-result
          ResultType="success"
          title="修改登录密码成功"
          describe="您的登录密码已经修改成功!"
          btnText="确认"
        ></ghb-operate-result>
        <div class="divider"></div>
        <ghb-operate-result
          ResultType="success"
          title="修改登录密码成功"
          describe="您的登录密码已经修改成功!"
          btnText="确认"
        ></ghb-operate-result>
        <div class="divider"></div>
        <ghb-operate-result
          ResultType="success"
          title="修改登录密码成功"
          describe="您的登录密码已经修改成功!"
          btnText="确认"
        ></ghb-operate-result>
        <div class="divider"></div>
        <ghb-operate-result
          ResultType="success"
          title="修改登录密码成功"
          describe="您的登录密码已经修改成功!"
          btnText="确认"
        ></ghb-operate-result>
      </div>
  </pageFit>
</template>

<script>
import ghbOperateResult from "@comps/ghb-operate-result";
import ghbOperateResultItem from "@comps/ghb-operate-result-item";
import pageFit from "@comps/ghb-fit-header";
import { hideTitleBar } from '@bridge';
export default {
  components: {
    ghbOperateResult,
    ghbOperateResultItem,
    pageFit
  },
  created () {
    hideTitleBar();
  }
};
</script>

<style lang="less">
.divider {
  height: 0.2rem;
  background-color: @bg-color;
}
</style>
