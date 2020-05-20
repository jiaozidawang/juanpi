<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-26 09:26:03
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-19 17:37:31
 * @Description: demo
 -->
<template>

  <m-page>
    
    <div class="main">
      <m-group>
        <ghb-input title="附言" iconType="input" v-model="ps" @on-blur="psBlurHandler"></ghb-input>
        <ghb-input title="通讯录" iconType="book" v-model="address"></ghb-input>
        <ghb-input title="扫描银行卡" iconType="camera" v-model="scan"></ghb-input>
        <ghb-input title="人" iconType="user" v-model="user"></ghb-input>
      </m-group>
      <m-group>
        <money-input title="输入金额" v-model="moneyInput" :readonly="sumInputFormatReadonly"></money-input>
        <cell title="绑定的金额" :value="moneyInput"></cell>
      </m-group>
      
       <m-group  :title="`金额输入框2.0${amt2}`">
        <sumInputFormatT v-model="amt2" currency='27'  placeholder="认购金额" :readonly="sumInputFormatReadonly">
          <div class="suminputformat" slot="titleValue">这里显示一行字</div>
        </sumInputFormatT>
        <cell title="绑定的金额" :value="amt"></cell>
        <v-switch title="是否只读" v-model="xSwitch" @on-click="switchReadonlyHandler"></v-switch>
      </m-group>
       <m-group  :title="`金额输入框${amt}`">
        <sumInputFormat v-model="amt" currency='01'  placeholder="认购金额" :readonly="sumInputFormatReadonly">
          <div class="suminputformat" slot="titleValue">哈哈</div>
        </sumInputFormat>
        <cell title="绑定的金额" :value="amt"></cell>
        <v-switch title="是否只读" v-model="xSwitch" @on-click="switchReadonlyHandler"></v-switch>
      </m-group>
      
      <m-group :title="`短信验证码输入框${msggggg}`">
        <ghbMessage  v-model="msggggg" preCheck @preCheck="preCheckPhoneNum" ref="msgInline"></ghbMessage>
      </m-group>

      <div class="btn-box">
        <m-button type="primary" @clickHandler="$refs.msgInline.cleanTimer()">点击获取短信就会失败</m-button>
      </div>

      <checkBox v-model="isAgree">请阅读并同意<span class="linkText2"><a href="void;">《产品协议书》</a></span></checkBox>
      <!-- <checkBox v-model="isAgree">请阅读并同意<span class="linkText2"><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a><a href="">《产品协议书》</a></span></checkBox> -->


      <div class="btn-box" >
        <m-button type="primary" @clickHandler="showPwdInput" >调起交易密码输入框</m-button>
      </div>

    </div>
    <!-- <ghb-PwdInput ref="pwdInput" :sessionKey="sessionKey" v-model="isShowPwdInput" :cardList="cardList" @select-card="selectCard" @handler="submit" :bottomTip="pwdInputBottomTip"></ghb-PwdInput> -->
    <ghb-PwdInput-more ref="pwdInput" :sessionKey="sessionKey" v-model="isShowPwdInput" :cardList="cardList" @select-card="selectCard" @handler="submit" :bottomTip="pwdInputBottomTip"></ghb-PwdInput-more>

    <message v-model="showMessage"  @clickHandler="messageClick"></message>
   

  </m-page>
  
</template>

<script>
  import checkBox from '@comps/ghb-checkbox';
  import Base64 from './utils/base64';
  import cell from '@base/v-cell';
  import ghbPhoneInput from '@comps/ghb-input/ghb-phone-input';
  import ghbIdInput from '@comps/ghb-input/ghb-id-input';
  import ghbCardInput from '@comps/ghb-input/ghb-card-input';
  import moneyInput from '@comps/ghb-input/index';
  import ghbInput from '@core/public/components/project/ghb-input';
  import sumInputFormat from '@comps/ghb-sumInputFormat';
  import sumInputFormatT from '@comps/ghb-sumInputFormat/sumInput_2.0';
  import message from '@comps/ghb-message';
  import ghbLineMessage from '@comps/ghb-line-message';
  import ghbPwdInput from '@comps/ghb-pwdInput';
  import ghbPwdInputMore from '@comps/ghb-pwdInput/indexmore';
  import ghbChangePwdInput from '@comps/ghb-changePwdInput';
  import ghbPicker from '@comps/ghb-picker';
  import vSwitch from '@base/v-switch';
  import {alert, ocrCard, getBankList, getDeviceAndAppInfo, errorAlertH5, getSessionStorage} from '@bridge';
  import { setTimeout } from 'timers';
  import AsyncValidator from 'async-validator';
  import ghbMessage from '@comps/ghb-msg-inline';
  import ninput from '@comps/ghb-inputs';
  export default {
    name: 'demo2',
    components: {
      cell,
      ninput,
      ghbIdInput,
      ghbPhoneInput,
      ghbCardInput,
      vSwitch,
      moneyInput,
      ghbInput,
      ghbPicker,
      sumInputFormat,
      sumInputFormatT,
      ghbLineMessage,
      message,
      ghbPwdInput,
      ghbPwdInputMore,
      ghbMessage,
      ghbChangePwdInput,
      checkBox
    },
    created () {
      getSessionStorage("fundSignFlow", false).then(res => {
        console.log("=================", res);
      });
      getBankList().then(res => {
        let cardList = res.body.accountInfoList;
        this.cardList = cardList;
        console.log('卡列表', cardList);
      });
      getDeviceAndAppInfo().then(res => {
        console.log('getDeviceAndAppInfo', res);
      });
      const base64 = new Base64();
      const str = "测试base64工具测试base64工具测试base64工具测试base64工具测试base64工具";
      console.log(base64.encode(str));
      console.log('获取年', this.$tools.getYear(new Date()));
      this.$tools.getCurrentMonthDate();
      setTimeout(() => {
        this.pickList = [
          {itemName: '短信', value: '2'},
          {itemName: 'U盾', value: '1'},
          {itemName: '云盾', value: '7'}
        ];
      }, 300);
    },
    data () {
      return {
        ps: '',
        amt2: '',
        address: '',
        user: '',
        scan: '',
        spacialInputtext: '',
        spacialInputid: '',
        spacialInputmoney: '',
        spacialInputnumber: '',
        msggggg: '',
        sessionKey: '', // 随机数
        isFormFull: false, // 是否表单每一项都不为空
        idNo: '',
        pwd: '', // 密文
        isAgree: false,
        nickName: '999999999999998',
        nickName1: '999999999999998',
        nickName2: '999999999999998',
        nickName3: '999999999999998',
        nickName4: '999999999999998',
        nickName5: '999999999999998',
        nickName6: '999999999999998',
        nickName7: '999999999999998',
        nickName8: '999999999999998',
        nickName9: '999999999999998',
        userName: '',
        pwd11: '',
        phone: '',
        cardNo: '',
        pwd22: '',
        moneyInput: '',
        xSwitch: false,
        value1: '',
        isShowShare: false,
        isShowPwdInput: false,
        showMessage: false,
        amt: '',
        msgValue: '',
        validateType1: 'msg',
        cardList: [],
        pwdInputBottomTip: '请输入华兴银行(5714)的交易密码',
        pickList: [],
        form: {
          nickName: '',
          userName: '',
          phone: ''
        },
        sumInputFormatReadonly: false
      };
    },
    watch: {
      form: {
        handler (newVal) {
          let flag = true;
          for(let key in newVal) {
            if(!newVal[key]) {
              flag = false;
            };
          };
          console.log(flag);
          this.isFormFull = flag;
        },
        deep: true
      }
    },
    methods: {
      psBlurHandler (val) {
        console.log('失焦', val);
      },
      preCheckPhoneNum () {
        errorAlertH5('现在校验手机号是否正确').then(res => {
          setTimeout(() => {
            this.$refs.msgInline.getMsg();
          }, 1000);
        });
      },
      switchReadonlyHandler (val) {
        this.sumInputFormatReadonly = val;
      },
      changeCheckMethod (val) {
        console.log(val);
        if(val[0] !== '0') {
          this.validateType1 = 'abc';
        } else {
          this.validateType1 = 'msg';
        };
      },
      handlerErrors (errors) {
        alert(errors[0].message);
      },
      switchHandler (val) {
      },
      // 表单校验demo
      // 点击校验表单，并调起交易密码输入框
      showPwdInput () {
        const _self = this;

        let descriptor = {
          // userName: [
          //   {required: true, message: "用户名不能为空"},
          //   {validator: _self.$tools.isUserName}
          // ],
          // phone: _self.$tools.mobileRules(),
          // name: _self.$tools.nickNameRules(),
          // address: [{required: true, message: '地址不能为空'}, {min: 10, max: 20, message: '地址长度为10~20位'}]
        };

        const validator = new AsyncValidator(descriptor);

        // 你的参数
        const form = {
          name: _self.form.nickName,
          userName: _self.form.userName,
          phone: _self.form.phone
        };

        // 执行校验器, firstFields: true表示 callback当指定字段的第一个验证规则生成错误时调用，不再处理相同字段的验证规则
        validator.validate(form, { firstFields: true }, errors => {
          if(errors) {
            console.log(errors);
            // 错误回调
            _self.$tools.handlerErrors(errors);
            return;
          };
        }).then(res => {
          // 如果全部校验通过，在这里执行你的逻辑

          this.$tools.rpc('NMBMPSX7012').then(res => {
            this.sessionKey = res.body.sessionKey;
            this.isShowPwdInput = true;
          });
        });
      },
      clickIcon () {
        console.log('123');
        alert('你好', '你是谁');
      },
      clickIconHandler () {
        ocrCard().then(res => {
          console.log(res);
        });
      },
      messageClick () {
      },
      submit ({pwd, InputState}) {
        console.log(InputState);
      },
      getHeight () {
        window.AlipayJSBridge.call('getInputHeight', (res) => {
          console.log(res);
        });
      },
      selectCard (val) {
        console.log(val);
        // alert('温馨提示', val.accNo_format);
      },
    }
  };
</script>
<style lang="less" scoped>
  .button{
    padding: .2rem;
  }

  .pwdInput-dialog{
    display: table;
    position: absolute;
    z-index: 5000;
    width: 100% !important;
    bottom: 0;
    background-color: #fff;
    text-align: center;
    overflow: hidden;
  }
  // 选卡组件下面的样式
  .transReport{
    background-color: @bg;
    padding: .2rem @spacing;
    .transReport_tite{
      color: @font-t1;
      margin-bottom: .2rem;
    }
    > p{
      color: @font-t3
    }
  }

</style>

