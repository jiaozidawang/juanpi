/**
 * @author liuyunxiao
 * @desc 多个按钮
 * @param {Boolean} isExtend 是否需要拓展按钮（在最左边）
 * @param {Object} buttons 设置按钮文字/类型 例： {leftText: '赎回', leftType: 'reset', rightText: '购买', rightType: 'primary'} 具体类型见button组件readme
 * @param {String} extendType 设置拓展按钮类型，当isExtend为true时生效  collect 空心收藏 collected 实心收藏
 * @param {String} debounceTime 防抖时间，单位为毫秒
 * @param {Boolean} buyButtonDisabled 是否禁用购买按钮
 * @event clickHandler 点击按钮触发，返回一个参数，点击extend按钮返回'extend', 点击左侧按钮返回'left' 点击右侧返回'right'
 */
