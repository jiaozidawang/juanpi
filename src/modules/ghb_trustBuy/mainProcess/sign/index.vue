<template>
  <u-page>
    <u-signature :visible="true"
                 @on-cancel="handleCancel"
                 @on-complete="createSign" />
    <div v-show="myLoading" class="myLoading">加载中...</div>
  </u-page>
</template>

<script>
/**
 * prdCd 产品代码
 * orderNo 订单编号
 * pageType 页面类型 'reSign' 重新签名 || '' 正常流程往下走
 */
import { UPage, USignature } from "@engine";
import {
  closeTo,
  screenToPortrait,
  alert,
  // closePage,
  // popOtherWindow,
  pushWindow,
  hideBackButton,
  errorAlert,
  toast,
  screenToLandscape
} from "@bridge";

export default {
  name: 'signPage',

  components: {
    UPage,
    USignature
  },

  beforeCreate () {
    screenToLandscape();
  },

  created () {
    this.prdCd = window.App.params.prdCd;
    this.orderNo = window.App.params.orderNo;
    this.pageType = window.App.params.pageType || '';
    // popOtherWindow();
  },

  data () {
    return {
      myLoading: false,
      prdCd: '',
      orderNo: '',
      pageType: ''
    };
  },

  mounted () {
    // this.$client.hideTitleBar(); // 隐藏titleBar
    hideBackButton();
  },

  methods: {
    // 生成签字信息
    createSign (res) {
      if (res.status === 'empty') {
        toast('请先签名');
        return false;
      }
      // 上传到影像平台
      const params = {
        base64StrList: [
          {
            base64StrFile: (res.png || '').replace('data:image/png;base64,', '') // 64位文件字符串字段名
          }
        ]
      };
      this.myLoading = true;
      this.$tools.rpc('NMBMPSX7018', params, {
        globalLoading: false
      }).then(res => {
        const resData = res.body || {};
        if (resData.errorCode === '0') {
          const pathRes = resData.pathValueList[0] || {};
          if (pathRes.returnCode === '0') { // 0为成功，1为失败 TODO 数字还是字符串？
            this.handleSubmit(pathRes.pathValue); // 影像文件路径名
          } else {
            this.myLoading = false;
            alert('签字上传失败', '');
          }
        } else {
          this.myLoading = false;
          errorAlert(res.header.errorMsg);
        }
      }).catch(err => {
        console.log(err);
        this.myLoading = false;
      });
    },

    // 单证签署上传
    handleSubmit (pathValue) {
      let _this = this;
      screenToPortrait();
      // _this.$client.showTitleBar();
      const params = {
        orderNo: _this.orderNo,
        acceDocInfo: [
          {
            docId: pathValue,
            fileName: '单证签名',
          }
        ]
      };
      // 3402 单证签署上传
      _this.$tools.rpc('NMBMPSX3402', params).then(res => {
        console.log('单证签署上传', res);
        if (res.header.errorCode === '0') {
          this.myLoading = false;
          if (_this.pageType === 'reSign') {
            // 重新签名
            closeTo({
              index: -1,
              data: {
                pageType: 'reSign'
              }
            });
            // closePage(['/ghb_trustBuy/mainProcess/materialCheck.html']);
            // pushWindow('/ghb_trustBuy/mainProcess/materialCheck.html', {
            //   prdCd: _this.prdCd,
            //   orderNo: _this.orderNo,
            //   pageType: 'reSign'
            // });
          } else {
            // 正常流程往下走
            pushWindow('/ghb_trustBuy/mainProcess/videoCheck.html', {
              prdCd: _this.prdCd,
              orderNo: _this.orderNo
            });
          }
        } else {
          errorAlert(res.header.errorMsg);
        }
      });
    },

    handleCancel () {
      screenToPortrait();
      closeTo({
        index: -1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.myLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
