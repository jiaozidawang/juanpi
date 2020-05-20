/**
 * @author liuyunxiao
 * @desc Y表示必传，N表示选传
 * @desc 单行获取验证码组件,用v-model绑定输入框的值
 * @param {String} title  N 输入框的标题
 * @param {String} headTitle  N 选择行的标题
 * @param {String} placeholder N 提示语
 * @param {String} align N value位置，可选left,center,right
 * @param {String} defaultPick N 选择默认的选中，默认选中第一条，与pickList的value绑定
 * @param {Array} pickList Y 可选列表 例：[{itemName: '短信', value: '0'},{itemName: 'U盾', value: '1'}]，  每一项必须有itemName
 * @param {Boolean} isTranstion N 是否是交易类验证(交易类有选择验证方式), 默认false
 * @param {String} msgNumber N 序号
 * @param {String} validateType N 验证类型，默认msg，目前只有msg 需要其他模板吗？ 请跟我说
 * @event getMsg 点击获取验证码后触发
 * @event on-change 参数(value) 选择列表值变化事触发
 * @event close 弹窗关闭时触发
 */
