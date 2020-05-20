  <template>
  <x-dialog
    v-transfer-dom
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
      <div class="hke-header">
        <div class="ghb-pwdInput_title" style="font-size: .36rem">{{title}}</div>
        <div class="ghb-pwdInput_close" @click="clickClose"></div>
      </div>
      <slot></slot>
      <slot name="tips"></slot>
      <div class="hke_line">
        <div class="hke_line_init vux-1px">
          <div class="hke_line_init_input">
            <div
              class="hke_line_init_input_point"
              v-for="(item,index) in placeholdPwd"
              :key="index"
            >{{item}}</div>
          </div>
          <div class="hke_line_init_flash flashLine"></div>
          <div class="hke_line_init_placeholder"></div>
        </div>
        <!-- <div class="hke_line_button" @click.stop="sure">确定</div> -->
      </div>
    </div>
  </x-dialog>
</template>

<script>
	import _ from 'lodash'
  import { TransferDom  } from 'vux';
  import XDialog from '@base/x-dialog';
  import {showCloudKeyboard, hideCloudKeyboard, getCloudIdentitySign, errorAlertH5} from '@bridge';
  import commonMixin from './utils/common.js';
  import { setInterval, clearInterval, setTimeout } from 'timers';
	export default {
		name: 'ghb-hkePopupInput',
		directives: {
			TransferDom
		},
    mixins: [commonMixin],
		data(){
			return {
        __placeholder: '请输入',
        isFocus: true,
        pwdInfo: {}
			}
    },
		methods: {
      clickClose () {
        this.$emit('input', false);
      },
      // 点击确定之后触发
      sure () {
        // 结束监听
        App.off('keyboardInputMsg', this.keyboardEvent);
        this.$emit('input', false);
        this.$emit('sure', this.pwdInfo);
      },
      // 设置输入框点的个数
			setPwd(len = 0){
        this.placeholdPwd = Object.freeze(_.fill(Array(len), '●'))
				return ''
      },
      // 监听的事件
      keyboardEvent ({data}) {
        const {len, pwdKey, InputState} = data;
        this.pwdInfo = data;
        console.log('密文信息', this.pwdInfo);
        this.$emit('onInput', data);
        if (InputState == 'close') {
          this.onHide();
          return this.$emit('input', false);
        };
        if(InputState == 'done') {
          if(this.pwdInfo.len <= 0 ){
            errorAlertH5('云盾密码不能为空');
            return
          }
          this.sure();
        }
        this.pwd = pwdKey;
        this.setPwd(len && len >0 ? Number(len) : 0);
      },
			onShow(){
        this.showCloudKeyboard();
        this.$emit('on-show');
			},
			onHide(){
        this.hideKeyboard();
      },
      // 设置弹出的输入框的高度
      setDialogBottom (height) {
        let isIphoneX = this.$tools.isIPhoneX();
        let isiOS = navigator.userAgent.indexOf('Android') == -1;
        const sHeight = isIphoneX ? 72 : isiOS ? 38 : 0;
        let endHeight = parseInt(height) - sHeight;
        this.dialogStyle.bottom = endHeight + 'px'
      },
      // 弹出云盾键盘
      showCloudKeyboard () {
        console.log({isClean: true, pinServerRandom: this.pinServerRandom});
        AlipayJSBridge.call('showCloudKeyboard', {isClean: true, pinServerRandom: this.pinServerRandom}, res => {
          if(res && res.height && res.height != ''){
            this.setDialogBottom(res.height);
          }
        });
        this.pwd = this.setPwd();
        App.on('keyboardInputMsg', this.keyboardEvent);
      },
      // 隐藏云盾键盘
      hideKeyboard () {
        hideCloudKeyboard();
        // 延迟100毫秒结束监听。---系统触发输入状态done在 close之后，不做延迟处理在close结束了监听获取不到done
        setTimeout(() => {
          App.off('keyboardInputMsg', this.keyboardEvent);
        }, 100)
      },
      set(v) {
        !v && this.$emit("input", v);
      }
    }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
  .flashLine{
    height: .4rem;
    &::after {
      content: " ";
      display: block;
      width: .04rem;
      height: .4rem;
      background-color: @color-main;
      animation: flashLine 1s infinite;
    }
  }

@keyframes flashLine {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
