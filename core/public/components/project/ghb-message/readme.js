/**
 * @author liuyunxiao
 * @desc 弹出的短信输入框组件 Y表示必传 N表示不一定要传
 * @desc 用v-model绑定一个布尔值以控制组件的显示隐藏
 * @param {String} phoneNumber Y 发送的手机号码
 * @param {String} maskZIndex N 遮罩的z-index
 * @param {Boolean} hideOnBlur N 是否点击这招隐藏组件
 * @event getMsg 点击获取验证码按钮触发
 * @event handler 输入短信验证码到达6位时触发，返回短信验证码信息
 * @event voice 点击语音播报文字触发
 */
