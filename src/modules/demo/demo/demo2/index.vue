<template>
  <m-page>
      <ghb-search v-model="searchValue" @on-input="search"></ghb-search>
      <div class="main">
        <m-group title="同意组件">
          <ghb-checkbox v-model="isAgree">请阅读并同意<span class="linkText">《产品协议书》</span></ghb-checkbox>
        </m-group>

        <pwdInput v-model="isShowPwdInput" :bottomTip="pwdInputBottomTip"></pwdInput>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="back">带参回到上个页面</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="showPwdInput">调起交易密码输入框</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="isShowShare = true" type="primary">分享</m-button>
        </div>
        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getParams" type="primary">获取页面跳转数据</m-button>
        </div>
        
        <div class="button" style="padding: .2rem .32rem">
           <m-button >
             <div class="add">
               <div class="add_icon"></div>
               <span>添加</span>
             </div>
           </m-button>
        </div>

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getUserInfo" type="primary">获取用户信息</m-button>
        </div>

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="getPhoto" type="primary">打开相册或拍照</m-button>
        </div>

        <div class="button" style="padding: .2rem .32rem">
           <m-button @clickHandler="MPS00000" type="primary">调用rpc</m-button>
        </div>

        
        <div class="button" style="padding: .2rem .32rem">
          <m-button type="primary" @clickHandler="showMessage = !showMessage">弹出message组件</m-button>
        </div>

        <m-group>
          <ghb-line-message
          :isTransition="true" 
          v-model="msgValue"
          align="left"
          title=""
          :pickList="[
            {name: '短信', value: '0'},
            {name: 'U盾', value: '1'},
            {name: '云盾', value: '2'}
          ]"></ghb-line-message>
        </m-group>
        
        <m-group>
          <ghb-phone-input v-model="phoneNo"></ghb-phone-input>
          <ghb-id-input v-model="idNo"></ghb-id-input>
        </m-group>

       
      </div>
      <ghb-globalMutiButton isExtend></ghb-globalMutiButton>
      <ghb-share v-model="isShowShare"></ghb-share>
      
  </m-page>
  
</template>
<script>
  import ghbCheckbox from '@comps/ghb-checkbox';
  import ghbGlobalMutiButton from '@comps/ghb-globalMutiButton';
  import pwdInput from '@core/public/components/project/ghb-pwdInput';
  import ghbPhoneInput from '@comps/ghb-input/ghb-phone-input';
  import ghbIdInput from '@comps/ghb-input/ghb-id-input';
  import ghbShare from '@comps/ghb-share';
  import ghbLineMessage from '@comps/ghb-line-message';
  import ghbSearch from '@comps/ghb-search';
  import { getUserInfo, getQueryParams, getSessionStorage, getNativePhoto, closeTo } from '@bridge';
  export default {
    name: 'demo2',
    components: {
      ghbCheckbox,
      ghbGlobalMutiButton,
      pwdInput,
      ghbPhoneInput,
      ghbIdInput,
      ghbShare,
      ghbSearch,
      ghbLineMessage
    },
    created () {
      console.log('App.params', window.App.params);
      console.log(window.location);
      getSessionStorage('demo').then(res => {
        console.log('getSessionStorage', res);
      });
    },
    data () {
      return {
        searchValue: '',
        phoneNo: '',
        showMessage: false,
        idNo: '',
        isAgree: false,
        isShowPwdInput: false,
        isShowShare: false,
      };
    },
    methods: {
      getUserInfo () {
        getUserInfo().then(res => {
          console.log(res);
        });
      },
      MPS00000 () {
        console.log(this.$tools);
        this.$tools.rpc('NMBMPSX3013').then(res => {
          console.log(res);
        });
      },
      search () {
        console.log(this.searchValue);
      },
      back () {
        // popWindow({data: '123455'});
        closeTo({
          index: -1,
          data: {
            hha: '你好'
          }
        });
      },
      msgHandler (val) {
        console.log(val);
      },
      getParams () {
        console.log('getQueryParams', getQueryParams());
        console.log('App.params', window.App.params);
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

