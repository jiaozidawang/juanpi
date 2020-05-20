<template>
    <u-page style="position: relative;">
        <u-group class="content-box">
            <u-cell title="目标资产" :value="currencyFormat(aimbal)" />
            <u-cell title="在我行已有资产" :value="currencyFormat(totalbal) || '¥0.00'" />
        </u-group>
        <u-group>
            <u-cell title="需补充" :value="currencyFormat(aimbal - totalbal)" />
        </u-group>

        <div class="nmb-font-dark tip-box">
            您可以提供以下资产证明材料
        </div>
        <div class="nmb-bg-white meterial-box">
            <p>1. 您在广东华兴银行内的证明材料</p>
            <a href="javascript:;" class="nmb-font-t30" @click="showShot">· 广东华兴银行资产证明截图</a>
            <p class="mt20">2. 您在广东华兴银行外的证明材料</p>
            <a href="javascript:;" class="nmb-font-t2">· 银行存款证明</a>
            <a href="javascript:;" class="nmb-font-t2">· 理财产品/信托计划持有证明</a>
            <a href="javascript:;" class="nmb-font-t2">· 股票/债券/基金市值证明</a>
            <a href="javascript:;" class="nmb-font-t2">· 任职公司提供的近3年年均收入证明</a>
            <a href="javascript:;" class="nmb-font-t2">· 近3年个人纳税证明</a>
        </div>
        <div class="nmb-bg-white upload-box">
            <u-upload title="最多支持上传6张照片" style="border-top: 1px solid #EDEDED;" @update="updateImgs" />
        </div>
        <div class="btn-box">
            <u-button :disabled="imgList.length <= 0" @clickHandler="handleUpload">确认上传</u-button>
        </div>
    </u-page>
</template>
<script>
  import { UPage, UButton, UGroup, UCell, UUpload } from "@engine";
  import mixins from "../../components/mixins";
  import {
    alert,
    successToast,
    errorToast,
    getBankList,
    // closePage,
    pushWindow,
    closeTo
  } from "@core/bridge";
  import tools from "@utils/tools";

  export default {
    name: 'certification-meterial-page',
    components: {
      UPage,
      UButton,
      UGroup,
      UCell,
      UUpload
    },
    mixins: [mixins], // aimbal
    data () {
      return {
        totalbal: '',
        imgList: [],
        loading: false // 防抖flag
      };
    },
    computed: {
      // text () {
      //   return tools.formatPhone(this.phoneNo);
      // }
      currencyFormat () {
        return tools.currencyFormat;
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        // 获取卡列表
        getBankList('1').then(res => {
          const accountInfoList = res.body.accountInfoList || [];
          // TODO 提取参数
          // let accounts = accountInfoList.map(item => {
          //   console.log('item: ', item);
          //   return { accNo: item.accNo };
          // });
          // 获取持仓资产
          this.$tools.rpc('NMBMPSX3133', { accounts: accountInfoList }).then(res => {
            if (res.body.errorCode === '0') {
              this.totalbal = res.body.totalbal || '0';
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      // 跳转至示例图展示页面
      showShot () {
        pushWindow('/ghb_trustBuy/certification/shot.html');
      },
      // 图片更新
      updateImgs (imgList) {
        this.imgList = imgList || [];
      },
      handleUpload () {
        if (this.imgList.length <= 0) {
          return false;
        }
        if (this.loading) {
          return false;
        }
        this.loading = true;
        // 上传到影像平台
        const params = {
          base64StrList: []
        };
        this.imgList.forEach(item => {
          params.base64StrList.push({
            base64StrFile: item.imgData[0] // 64位文件字符串字段名 'data:image/jpeg;base64,' +
          });
        });
        this.$tools.rpc('NMBMPSX7018', params).then(res => {
          if (res.body.errorCode === '0') {
            const pathValueList = res.body.pathValueList || [];
            const assetFileInfo = [];
            pathValueList.forEach((item, index) => {
              if (item.returnCode === '0') { // '0'为成功，'1'为失败
                assetFileInfo.push({
                  astProofDocName: `资产证明${index + 1}`, // 资产证明材料名称
                  blipDocId: item.pathValue // 影像文件ID
                });
              }
            });
            if (assetFileInfo.length >= this.imgList.length) {
              this.uploadSuccess(assetFileInfo);
            } else if (assetFileInfo.length === 0) {
              alert('图片上传失败，请重新上传', '');
            } else {
              alert('部分图片上传失败，请重新上传', '');
            }
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
      },
      // 上传成功后同步壹账通后台
      uploadSuccess (assetFileInfo) {
        const params = {
          prestTyp: '0', // 资料证明  2：总提交 0:资料证明 1:签署
          assetFileInfo: assetFileInfo
        };
        this.$tools.rpc('NMBMPSX3407', params).then(res => {
          if (res.body.errorCode === '0') {
            // 成功后提示，再返回
            successToast('上传成功').then(res => {
              // closePage(['/ghb_trustBuy/certification/intermediate.html']);
              // pushWindow('/ghb_trustBuy/certification/intermediate.html');
              closeTo({index: -1});
            });
          } else {
            errorToast('上传失败');
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .content-box {
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .tip-box {
    padding: 12px 15px;
    font-size: 12px;
    line-height: 16px;
  }

  .meterial-box {
    padding: 10px 15px;
    font-size: 14px;
    line-height: 32px;

    > a {
      display: block;
    }
  }

  .mt20 {
    margin-top: 20px;
  }
</style>

