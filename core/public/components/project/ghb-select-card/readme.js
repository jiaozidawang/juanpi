/**
 * Y表示必填,N表示非必填
 * @desc - 选卡组件，后续会为次组件增加滚动效果
 * @author liuyunxiao
 * @param {String} value -Y 是否显示，使用v-model绑定
 * @param {String} height -N 高度,设置为100%为整屏。当position为top或者bottom时有效
 * @param {String} width -N 高度,设置为100%宽度必须使用该属性。在position为left或者right时有效
 * @param {Object} popupStyle -N 弹窗样式，用于强制制定z-index
 * @param {Boolean} hideOnBlur -N 点击遮罩是否自动关闭
 * @param {Boolean} isTransparent -N 是否为透明背景
 * @param {Boolean} showMark -N 是否显示遮罩
 * @param {Boolean} isRerenderOnShow -N 是否在显示时重新渲染内容区域（以及滚动到顶部），适用于每次显示弹窗需要重新获取数据初始化的场景
 * @param {Boolean} isScrollTopOnShow -N 是否在显示时自动滚动到顶部，当你自定义滚动容器时需要手动为该容器加上类名vux-scrollable
 * @param {Boolean} position -N 位置，可取值['left','right','top', 'bottom']
 * @param {Boolean} hasButton -N 有按钮，默认false，没有按钮
 * @param {String} buttonText -N 按钮文字，hasButton为true时生效
 * @param {Array} dataList -N 卡片列表，下面有详细说明
 * @event on-hide -N 关闭时触发
 * @event on-show -N 显示时触发
 * @event on-firstShow -N 第一次显示时触发，可以再改时间回调里初始化数据或者界面
 * @event clickTitleLeftIcon -N 点击顶部左边按钮触发
 * @event clickTitleRightIcon -N 点击顶部右边按钮触发,并关闭弹框
 * @slot 默认插槽
 */



// dataList 具体格式如下
let dataList =  [
  {
    title: `广东华兴银行`, // 标题文字
    desc: '可用余额： ￥100,000.00', // 标题下方文字
    icon: 'ghb' // 标题左侧的logo，目前可选值 ghb-华兴银行  icbc-工商银行 cmb-招商银行
  },
]