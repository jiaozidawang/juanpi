<!--
 * @Author: liuyunxiao
 * @Date: 2019-08-16 11:37:44
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-05 09:37:00
 * @Description:爱加密键盘输弹出框
 -->
  <!--
    @desc 爱加密键盘输弹出框
    @param {String} title 弹窗标题
    @param {String} bottomTip 密码框底部提示
    @param {Boolean} hideOnBlur 是否失焦隐藏
    @param {Boolean} needForgetPwd 是否显示忘记密码字样
    @param {String} dialogClass 是否失焦隐藏
    @param {String} maskZIndex 遮罩层级
    @param {String} sessionKey 随机数，通过7012接口获得
  -->

  <template>
  <x-dialog v-transfer-dom
    class="ghb-pwdInput"
    :show.sync="private_value"
    :hide-on-blur="hideOnBlur"
    :dialogStyle="dialogStyle"
    :mask-z-index="maskZIndex"
    dialogClass="pwdInputDialog"
    @on-show="onShow"
    @on-hide="onHide"
  >
	<div class="ghb-pwdInput_body">
		<div class="ghb-pwdInput_head">
      <div class="ghb-pwdInput_title">
        {{title}}
      </div>
      <div class="ghb-pwdInput_close" @click="private_value = false"></div>
    </div>
		<slot></slot>
    <div class="lines2"></div>
		<slot name="tips"></slot>
		<dl>
			<dd>{{placeholdPwd[0]}}</dd>
			<dd>{{placeholdPwd[1]}}</dd>
			<dd>{{placeholdPwd[2]}}</dd>
			<dd>{{placeholdPwd[3]}}</dd>
			<dd>{{placeholdPwd[4]}}</dd>
			<dd>{{placeholdPwd[5]}}</dd>
		</dl>
    <div class="ghb-pwdInput_bottomText">
      <span>{{bottomTip}}</span>
      <span @click="forgetPwdHandler" v-if="needForgetPwd">忘记密码？</span>
    </div>
	</div>
</x-dialog>
</template>

<script>
	import _ from 'lodash'
  import {showKeyboard, hideKeyboard, clearNKeyboard, getDeviceInfo, hideLoading, alert} from '@bridge';
  import sessionKey from './utils/addSessionKey.js';
  import commonMixin from './utils/common.js';
  import { setInterval, clearInterval } from 'timers';
	export default {
		name: 'ghb-pwdInput',
    mixins: [sessionKey, commonMixin],
		methods: {
			setPwd(len = 0){
        this.placeholdPwd = Object.freeze(_.fill(Array(len), '●'))
				return ''
			},
      keyboardEvent ({data}) {
        const {len, pwdKey, InputState} = data;
        if (InputState == 'close') {
          this.onHide();
          if(len >= 6){
            console.log('输入完密码返回的内容', {pwd: pwdKey, sessionKey: this.sessionKey, isAuto: true});
            this.$emit('handler', {pwd: pwdKey, sessionKey: this.sessionKey, isAuto: true});
          };
          App.off('keyboardInputMsg', this.keyboardEvent);
          return this.$emit('input', false);
        };
        this.pwd = pwdKey;
        this.setPwd(len && len >0 ? Number(len) : 0);
      },
			onShow(){
        if(!this.sessionKey) {
          alert('调起交易密码键盘失败,请传入sessionKey', '', {button: '好的'});
          return;
        }
        let params = {type: '0', maxSize: '6', isClean: true, sessionKey: this.sessionKey}
        showKeyboard(params).then(res=> {
          if(res.height && res.height != '') this.setDialogPosition(res.height);
        })
        this.pwd = this.setPwd();
        App.on('keyboardInputMsg', this.keyboardEvent);
        this.$emit('on-show');
        hideLoading();
        // if(window.App.loadingCounter.count > 0) {
        //   window.App.loadingCounter.count --;
        //   hideLoading();
        // }
      },
			onHide(){
        // App.off('keyboardInputMsg', this.keyboardEvent);
        hideKeyboard();
			}
    },
    watch: {
      sessionKey (newVal) {
        this.sessionKey = newVal;
      },
      'placeholdPwd.length'(val){
        if(val >= 6) {
          setTimeout(()=>{
            this.$emit('input', false);
          }, 50)
        }
      },
    }
	}
</script>

<style lang="less" >
  @import './less/index.less';
</style>
