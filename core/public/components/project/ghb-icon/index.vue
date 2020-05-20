<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-16 11:37:44
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-10-14 17:41:55
 * @Description:
 -->
<template>
  <div class="ghb-icon">
    <div class="ghb-icon-init" :style="__iconStyle">
      <img :src="icon">
    </div>
  </div>
</template>
<script>
import icon from "./utils/iconDictionary.js";
export default {
  name: "ghb-icon",
  props: {
    isName: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: "default"
    },
    iconSize: {
      type: String,
      default: ".64rem"
    },
    func: String
  },
  computed: {
    __iconStyle() {
      return {
        width: this.iconSize,
        height: this.iconSize
      };
    },
    icon() {
      if(this.isName) {
        return icon[this.checkBankName(this.iconType)];
      }else{
        return icon[this.switchLog(this.iconType)];
      }
    }
  },
  mounted() {
    // console.log(this.iconType, this.checkBankName(this.iconType))
  },
  data() {
    return {
      imgUrl: "defalutBank"
    };
  },
  methods: {
    switchLog(bankId) {
      let imgIcon = "default";
      switch (bankId) {
        case "306581000003": //广发
          imgIcon = "gf";
          break;
        case "307584007998": //平安
          imgIcon = "pingan";
          break;
        case "303100000006": //光大
          imgIcon = "gd";
          break;
        case "301290000007": //交通
          imgIcon = "jt";
          break;
        case "308584000013": //招商
          imgIcon = "zs";
          break;
        case "313100000013": //北京
          imgIcon = "bj";
          break;
        case "318110000014": //渤海
          imgIcon = "bohai";
          break;
        case "502290000006": //东亚
          imgIcon = "dy";
          break;
        case "102100099996": //工商
          imgIcon = "gs";
          break;
        case "315456000105": //恒丰
          imgIcon = "hengfeng";
          break;
        case "501290000012": //汇丰
          imgIcon = "huifeng";
          break;
        case "304100040000": //华夏
          imgIcon = "hx";
          break;
        case "316331000018": //浙商
          imgIcon = "zs";
          break;
        case "105100000017": //建设
          imgIcon = "js";
          break;
        case "305100000013": //民生
          imgIcon = "msyh";
          break;
        case "103100000026": //农业
          imgIcon = "nyyh";
          break;
        case "325290000012": //上海
          imgIcon = "shyh";
          break;
        case "309391000011": //兴业
          imgIcon = "xy";
          break;
        case "403100000004": //邮政储蓄
          imgIcon = "yzcx";
          break;
        case "104100000004": //中国
          imgIcon = "zgyh";
          break;
        case "302100011000": //中信
          imgIcon = "zx";
          break;
        case "671290000017": //渣打
          imgIcon = "zhada";
          break;
        case "313221030008": //盛京
          imgIcon = "sj";
          break;
        case "310290000013": //浦东发展
          imgIcon = "pf";
          break;
        case "313586000006": //华兴
          imgIcon = "ghb";
          break;
        default:
          imgIcon = "default";
          if(this.func && this.func === 'credit') {
            imgIcon = "creditDefault";
          }
          break;
      }
      return imgIcon;
    },
    //根据银行名称区分图标
    checkBankName(value) {
      let bankLog = "default";
      if(value.indexOf("广发银行") != -1) {
        bankLog = "gf";
      }else if(value.indexOf("平安银行") != -1) {
        bankLog = "pingan";
      }else if(value.indexOf("光大银行") != -1) {
        bankLog = "gd";
      }else if(value.indexOf("北京银行") != -1) {
        bankLog = "bj";
      }else if(value.indexOf("渤海银行") != -1) {
        bankLog = "bohai";
      }else if(value.indexOf("浙商银行") != -1) {
        bankLog = "zs";
      }else if(value.indexOf("东亚银行") != -1) {
        bankLog = "dy";
      }else if(value.indexOf("华兴") != -1) {
        bankLog = "ghb";
      }else if(value.indexOf("工商银行") != -1) {
        bankLog = "gs";
      }else if(value.indexOf("恒丰银行") != -1) {
        bankLog = "hengfeng";
      }else if(value.indexOf("汇丰银行") != -1) {
        bankLog = "huifeng";
      }else if(value.indexOf("华夏银行") != -1) {
        bankLog = "hx";
      }else if(value.indexOf("中国进出口银行") != -1) {
        bankLog = "jck";
      }else if(value.indexOf("建设银行") != -1) {
        bankLog = "js";
      }else if(value.indexOf("交通银行") != -1) {
        bankLog = "jt";
      }else if(value.indexOf("民生银行") != -1) {
        bankLog = "msyh";
      }else if(value.indexOf("农业发展银行") != -1) {
        bankLog = "nyfz";
      }else if(value.indexOf("农业银行") != -1) {
        bankLog = "nyyh";
      }else if(value.indexOf("浦发银行") != -1) {
        bankLog = "pf";
      }else if(value.indexOf("上海银行") != -1) {
        bankLog = "shyh";
      }else if(value.indexOf("盛京银行") != -1) {
        bankLog = "sj";
      }else if(value.indexOf("兴业银行") != -1) {
        bankLog = "xy";
      }else if(value.indexOf("邮政储蓄银行") != -1) {
        bankLog = "yzcx";
      }else if(value.indexOf("中国银行") != -1) {
        bankLog = "zgyh";
      }else if(value.indexOf("渣打银行") != -1) {
        bankLog = "zhada";
      }else if(value.indexOf("招商银行") != -1) {
        bankLog = "zs";
      }else if(value.indexOf("中信银行") != -1) {
        bankLog = "zx";
      }else if(value.indexOf("支付宝") > -1) {
        bankLog = 'zfb'
      }else if(value.indexOf("财付通") > -1) {
        bankLog = 'cft'
      }else{
        bankLog = "default";
        if(this.func && this.func === 'credit') {
          bankLog = "creditDefault";
        }
      }
      return bankLog;
    }
  }
};
</script>
<style lang="less">
@import "~@core/public/less/mixin.less";
.ghb-icon-init {
  vertical-align: middle;
  display: inline-block;
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
