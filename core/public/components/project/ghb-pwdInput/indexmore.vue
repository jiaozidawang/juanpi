    <!--
    @desc 爱加密键盘输弹出框
    @param {String} title 弹窗标题
    @param {String} bottomTip 密码框底部提示
    @param {Boolean} hideOnBlur 是否失焦隐藏
    @param {Boolean} needForgetPwd 是否显示忘记密码字样
    @param {String} dialogClass 是否失焦隐藏
    @param {String} maskZIndex 遮罩层级
    @param {String} sessionKey 随机数，通过7012接口获得
    @param {Array} cardList 卡列表
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
		<div class="ghb-pwdInput_head vux-1px-b" >
      <div class="ghb-pwdInput_title">
        {{title}}
      </div>
      <div class="ghb-pwdInput_close" @click="private_value = false"></div>
    </div>
		<slot></slot>
		<slot name="tips"></slot>

    <div class="ghb-pwdInput_cell" @click="showCardSelect">
      <div class="ghb-pwdInput_cell_init vux-1px-b">
        <div class="title">银行卡</div>
        <div class="value">{{selectedItem.itemName}}</div>
      </div>
    </div>

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
  import {showKeyboard, hideKeyboard, clearNKeyboard, getDeviceInfo, alert, errorAlertH5, showSelectView} from '@bridge';
  import cell from '@base/v-cell';
  import commonMixin from './utils/common.js';
  import sessionKey from './utils/addSessionKey.js';
  import { setInterval, clearInterval } from 'timers';
	export default {
		name: 'ghb-pwdInput',
		components: {
      cell
    },
    mixins: [commonMixin, sessionKey],
		data(){
			return {
        isFirstChangeCard: true,
        selectedItem: {}
			}
    },
		watch: {
      cardList (newVal) {
        this.cardList.forEach((item, index) => {
          item.itemName = item.accNo_format;
          item.value = index;
        });
        if(this.isFirstChangeCard) {
          this.selectedItem = this.cardList[0];
          this.isFirstChangeCard = false;
        }
      },
      'placeholdPwd.length'(val){
        if(val >= 6) {
          setTimeout(()=>{
            this.$emit('input', false);
          }, 50)
        }
      },
    },
		methods: {
			setPwd(len = 0){
        this.placeholdPwd = Object.freeze(_.fill(Array(len), '●'))
				return ''
			},
      keyboardEvent ({data}) {
        const {len, pwdKey, InputState} = data;
        if (InputState == 'close') {
          console.log(InputState)
          if(len >= 6) {
            this.$emit('handler', {pwd: pwdKey, sessionKey: this.sessionKey, isAuto: true});
          }
          App.off('keyboardInputMsg', this.keyboardEvent);
        };
        this.pwd = pwdKey;
        this.setPwd(len && len >0 ? Number(len) : 0);
      },
		  onShow(){
        if(!this.sessionKey) {
          // alert('调起交易密码键盘失败,请传入sessionKey', '', {button: '好的'});
          errorAlertH5('调起交易密码键盘失败,请传入sessionKey')
          return;
        }
        showKeyboard({type: '0', maxSize: '6', isClean: true, sessionKey: this.sessionKey}).then(res=> {
          if(res.height && res.height != '') this.setDialogPosition(res.height);
        })
        this.pwd = this.setPwd();
        App.on('keyboardInputMsg', this.keyboardEvent);
        this.$emit('on-show');
      },
			onHide(){
        hideKeyboard();
      },
      showCardSelect () {
        hideKeyboard();
        showSelectView('', this.cardList, String(this.selectedItem['value']), '4').then(res => {
          if(res && res.errorCode && res.errorCode == '0') {
            if(res.result.actionType != '1') {
              this.onShow();
              return;
            }
            this.selectedItem = res.result.resultObject;
          }
          this.$emit('select-card', this.selectedItem);
          this.onShow();
        })
      }
		}
	}
</script>

<style lang="less" >
  @import './less/index.less';
</style>
