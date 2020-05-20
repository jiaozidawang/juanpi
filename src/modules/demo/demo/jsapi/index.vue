<template>
  <m-page>
    <m-header></m-header>
      <ghb-search v-model="searchValue" @on-input="search"></ghb-search>
      <!-- <ghb-toast></ghb-toast> -->
      <div class="main">
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="cleanUserInfo" type="primary">清除用户信息</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="checkUserInfo" type="primary">查看用户信息</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="MPS00000" type="primary">调用rpc</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="getLivess">活体检测</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="ocr('0')">扫描银行卡</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="ocr('1')">扫描身份证正面</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="ocr('2')">扫描身份证反面</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="alert">alert</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="confirm">confirm</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getParams" type="primary">获取页面跳转数据</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="showPopupMessageInput" type="primary">showPopupMessageInput</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getSafePadding" type="primary">获取刘海高度</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="showToast" type="primary">打开toast</m-button>
        </div>

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getUserInfo" type="primary">获取用户信息</m-button>
        </div>

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getBankList('1')" type="primary">获取卡列表</m-button>
        </div>

        
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getPhoto" type="primary">打开相册或拍照</m-button>
        </div>

        

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getBankList('1')" type="primary">getBankList1</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="nativeKeyboard('0')" type="primary">nativeKeyboard</m-button>
        </div>

        <m-group title="U盾">
          <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="UKey('getUKeySign')" type="primary">获取U盾签名</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('getUKeyNumber')" type="primary">获取U盾序列号</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('readUKeyCertificate')" type="primary">读取U盾证书</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('changePIN')" type="primary">修改U盾密码</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('getUKeyValidity')" type="primary">获取U盾证书有效期</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('getRepeatNumber')" type="primary">获取密码重试次数</m-button>
          </div>
          <div class="button" style="padding: .2rem .32rem">
            <m-button @clickHandler="UKey('isPinOrigin')" type="primary">验证密码是否为初始密码</m-button>
          </div>
        </m-group>
        <div class="button" style="padding: .2rem .32rem">
          <m-button @clickHandler="datePick" type="primary">打开日期选择器</m-button>
        </div>
        
       
      </div>     
  </m-page>
  
</template>
<script>
  import ghbCheckbox from '@comps/ghb-checkbox';
  import ghbSearch from '@comps/ghb-search';
  import { getUserInfo, showDatePicker, getBankList, getQueryParams, getNativePhoto, closeTo,
  getUKeySign, getUKeyNumber, readUKeyCertificate, changePIN, getUKeyValidity, getRepeatNumber, isPinOrigin,
  alert, confirm, ocrCard, ocrIDCard, getLivess, showLoading, cleanUserInfo
  } from '@bridge';
  import ghbToast from '@comps/ghb-toast';
  import {mapState} from 'vuex';
  export default {
    name: 'demo2',
    components: {
      ghbCheckbox,
      ghbSearch,
      ghbToast
    },
    created () {
      getBankList('1', true).then(res => {
        console.log('getBankList', res);
      });
    },
    computed: {
      ...mapState(['userInfo'])
    },
    data () {
      return {
        searchValue: '',
        phoneNo: '',
        msgValue: '',
        showMessage: false,
        idNo: '',
        isAgree: false,
        isShowShare: false,
        pwdInputBottomTip: '请输入华兴银行(5714)的交易密码',
        data: [
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '4月登录退出', transTime: '2019042601'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '三月交易明细查询', transTime: '2019032702'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '三月手机银行超时退出', transTime: '2019032703'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '三月余额查询', transTime: '2019032604'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '一月退出', transTime: '2019012605'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '一月登录退出', transTime: '2019012606'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '2018 12月登录', transTime: '2018122207'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '2018 10月登录', transTime: '2018102208'},
          {ecifName: "一键开户", ecifNo: '1000488704', transName: '2018 10月登录', transTime: '2018042208'},
        ]
      };
    },
    methods: {
      cleanUserInfo () {
        cleanUserInfo();
        window.App.vm.$store.dispatch("commitUserInfo");
      },
      checkUserInfo () {
        console.log('用户信息2', this.userInfo);
      },
      getLivess () {
        getLivess().then(res => {
          console.log(res);
        });
      },
      ocr (val) {
        switch (val) {
          case '0':
            ocrCard();
            break;
          case '1':
            ocrIDCard(true).then(res => {
              console.log(res);
            });
            break;
          case '2':
            ocrIDCard(false).then(res => {
              console.log(res);
            });
            break;
        }
      },
      alert() {
        alert('温馨提示', '不是这个样式啊', {button: '我知道了', errorCode: 'NMB173815'});
      },
      confirm() {
        confirm('', '不是这个样式啊', {okButton: '好的', cancelButton: '不行'});
      },
      isIPhoneX(fn) {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
          if (screen.height == 812 && screen.width == 375) {
            //是iphoneX
            return '是iphoneX';
          };
          //不是iphoneX
          return '不是iphoneX';
        };
      },
      getSafePadding() {
        window.AlipayJSBridge.call('getSafePadding', res => {
          console.log(res);
        });
      },
      showToast () {
        this.$toast("提交成功", 'fail');
      },
      datePick () {
        showDatePicker({type: '0', dateFormat: 'YYYY-MM-DD'});
      },
      // U盾api
      UKey(name) {
        switch (name) {
          case "getUKeySign":
            getUKeySign({signOri: '1231231', HashAlg: '1'}).then(res => {
              console.log(res);
            });
            break;
          case "getUKeyNumber":
            getUKeyNumber().then(res => {
              console.log(res);
            });
            break;
          case "readUKeyCertificate":
            readUKeyCertificate({certSN: '1234'}).then(res => {
              console.log(res);
            });
            break;
          case "changePIN":
            changePIN().then(res => {
              console.log(res);
            });
            break;
          case "getUKeyValidity":
            getUKeyValidity({certSN: '1234'}).then(res => {
              console.log(res);
            });
            break;
          case "getRepeatNumber":
            getRepeatNumber({pulRetryCount: '13414'}).then(res => {
              console.log(res);
            });
            break;
          case "isPinOrigin":
            isPinOrigin().then(res => {
              console.log(res);
            });
            break;
        }
      },
      showPopupMessageInput () {
        getUserInfo().then(({body}) => {
          window.AlipayJSBridge.call('showPopupMessageInput', {
            operationType: 'NMBMPSX3056',
            params: {
              OBJNO: body.MOBILE,
              ecifNo: body.ecifNo,
              SRCID: "48",
              operatetype: "535", //暂时随便送值
              busiName: "54354", //暂时随便送值
              srcSystemID: "NMB",
              systemID: "NMB",
            }
          });

          window.App.on('nativeKeyboardEvent', ({data}) => {
            console.log(data);
          });
        });
      },
      nativeKeyboard (val) {
        switch (val) {
          case '0':
            window.AlipayJSBridge.call('onNativeKeyboardShow', {type: '0', isClean: true, maxSize: '6'}, (res) => {
              console.log(res);
            });
            break;
          case '1':
            window.AlipayJSBridge.call('onNativeKeyboardHide', {isClean: true}, (res) => {
              console.log(res);
            });
            break;
        };
      },
      mapData () {
        const data = this.data;
        let map = {};
        data.forEach(item => {
          let y = item.transTime.substr(0, 4);
          if(!map[y]) {
            map[y] = {
              title: y,
              items: []
            };
          };
          map[y].items.push(item);
        });

        let arr = this.map2arr(map);

        arr.forEach(item => {
          let mMap = {};
          item.items.forEach(i => {
            let m = i.transTime.substr(4, 2);
            if(!mMap[m]) {
              mMap[m] = {
                title: m,
                items: []
              };
            };
            mMap[m].items.push(i);
          });

          let monArr = this.map2arr(mMap).reverse();
          item.items = monArr;
          // console.log(mMap);
        });
        console.log(arr);
      },
      map2arr (map) {
        let arr = [];
        for(let key in map) {
          arr.push(map[key]);
        };
        arr.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return arr.reverse();
      },
      getBankList (tp) {
        // getBankList(tp).then(res => {
        //   console.log(res);
        // })
        // showLocationSelect()
      },
      showPwdInput () {
        this.isShowPwdInput = true;
      },
      getUserInfo () {
        getUserInfo().then(res => {
          // console.log(res);
        });
      },
      MPS00000 () {
        showLoading();
        // console.log(this.$tools);
        // this.$tools.rpc('NMBMPSX1024').then(res => {
        //   console.log('第一次', res);
        // });
      },
      search () {
        console.log(this.searchValue);
      },
      back () {
        closeTo({
          index: -1,
          data: {
            hha: '你好'
          }
        });
      },
      getParams () {
        console.log('getQueryParams', getQueryParams());
        console.log('App.params', window.App.params);
      },
      messageClick () {

      },
      getPhoto () {
        // 打开相册或拍照
        getNativePhoto();
      }
    }
  };
</script>
<style lang="less" scoped>
  @import '~@core/public/less/mixin.less';
  .add{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add_icon{
    margin-right: .2rem;
    .setBgIcon('~@assets/base/cha@2x.png', .24rem);
  }
  .main{
    padding-bottom: 1rem;
  }

</style>

