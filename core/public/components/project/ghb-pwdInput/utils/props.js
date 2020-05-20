export default {
  title: {
    type: String,
    default: "请输入交易密码"
  },
  bottomTip: {
    type: String,
    default: ""
  },
  value: {
    type: Boolean,
    default: false
  },
  hideOnBlur: {
    type: Boolean,
    default: true
  },
  dialogClass: {
    type: String,
    default: 'weui-dialog'
  },
  maskZIndex: {
    type: Number,
    default: 1000
  },
  /**
   * 密码弹窗键盘类型 safe - 安全键盘  hke - 云证通安全键盘
   */
  inputType: {
    type: String,
    default: 'safe'
  },
  cardList: {
    type: Array
  },
  pinServerRandom: '',
  sessionKey: String,
  needForgetPwd: {
    type: Boolean,
    default: false
  }
};
