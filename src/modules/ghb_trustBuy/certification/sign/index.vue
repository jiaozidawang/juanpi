<template>
    <u-page>
        <u-signature :visible="true"
            @on-cancel="handleCancel" @on-complete="createSign" />
        <!-- <div v-show="loading" class="myLoading">加载中...</div> -->
    </u-page>
</template>

<script>
import { UPage, USignature } from "@engine";
import { closeTo, pushWindow, closePage, screenToLandscape, screenToPortrait, alert, toast } from "@bridge";

export default {
  name: 'certification-sign-page',
  components: {
    UPage,
    USignature
  },
  data () {
    return {
      visible: false,
      authTyp: '0', // '0'他证，'1'自证
      loading: false // 防抖
      // pathValue: ''
      // readTime: 20
    };
  },
  beforeCreate () {
    screenToLandscape();
  },
  created () {
    this.authTyp = window.App.params.authTyp || '0';
  },
  methods: {
    // 生成签字信息
    createSign (res) {
      if (res.status === 'empty') {
        toast('请先签名');
        return false;
      }
      if (this.loading) {
        return false;
      }
      this.loading = true;
      // 上传到影像平台
      const params = {
        base64StrList: [
          {
            base64StrFile: (res.png || '').replace('data:image/png;base64,', '') // 64位文件字符串字段名
          }
        ]
      };
      this.$tools.rpc('NMBMPSX7018', params).then(res => {
        const resData = res.body || {};
        if (resData.errorCode === '0') {
          const pathRes = resData.pathValueList[0] || {};
          if (pathRes.returnCode === '0') { // '0'为成功，'1'为失败
            this.handleSubmit(pathRes.pathValue); // 影像文件路径名
          } else {
            alert('签字上传失败', '');
            this.loading = false;
          }
        } else {
          this.loading = false;
          alert(resData.errorMsg);
        }
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    // 合格投资者认证提交
    handleSubmit (pathValue) {
      const params = {
        prestTyp: '1', // 签署  2：总提交 0:资料证明 1:签署
        assetFileInfo: [{
          astProofDocName: '承诺函签字', // 资产证明材料名称
          blipDocId: pathValue // 影像文件ID
        }]
      };
      this.$tools.rpc('NMBMPSX3407', params).then(res => {
        if (res.body.errorCode === '0') {
          if (this.authTyp === '1') {
            this.handleSubmitAudit();
          } else {
            this.handleComplete();
          }
        }
      }).catch(err => {
        this.loading = false;
        console.log(err);
      });
    },
    // 提交审核
    handleSubmitAudit () {
      const params = {
        prestTyp: '2' // 签署  2：总提交 0:资料证明 1:签署
      };
      // , {
      //   globalLoading: false
      // }
      this.$tools.rpc('NMBMPSX3407', params).then(res => {
        this.loading = false;
        if (res.body.errorCode === '0') {
          screenToPortrait();
          closePage(['/ghb_trustBuy/certification/index.html', '/ghb_pdf/index/index.html']);
          setTimeout(() => {
            pushWindow('/ghb_trustBuy/certification/result.html');
          }, 0);
        }
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    // 取消签字的跳转
    handleCancel () {
      screenToPortrait();
      closeTo({
        index: -1
      });
    },
    // 签字成功并同步后台后的跳转
    handleComplete () {
      this.loading = false;
      screenToPortrait();
      // closePage(['/ghb_trustBuy/certification/intermediate.html']);
      // pushWindow('/ghb_trustBuy/certification/intermediate.html');
      closeTo({index: -2});
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
