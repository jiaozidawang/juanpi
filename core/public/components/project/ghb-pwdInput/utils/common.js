import props from './props';
import XDialog from '@base/x-dialog';
import { TransferDom  } from 'vux';
export default {
  props,
  data(){
    return {
      placeholdPwd: [],
      pwd: '',
      keyboardHeight: '266px',
      // 弹窗样式
      dialogStyle: {
        'position': 'fixed',
        'z-index': '5000',
        'background': '#fff',
        'width': '100%',
        'bottom': '0'
      }
    }
  },
  methods: {
    setDialogPosition (height) {
      let isIphoneX = this.$tools.isIPhoneX();
      const sHeight = isIphoneX ? 34 : 0;
      let endHeight = parseInt(height) - sHeight;
      this.dialogStyle.bottom = endHeight + 'px'
    },
    // 点击忘记密码触发
    forgetPwdHandler() {
      this.$emit('forget');
    }
  },
  directives: {
    TransferDom
  },
  components: {
    XDialog,
  },
  computed: {
    private_value: {
      get(){ return this.value },
      set(v){ !v && this.$emit('input', v)}
    }
  }
}
