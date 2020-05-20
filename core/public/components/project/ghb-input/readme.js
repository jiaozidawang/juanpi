/**
 * Y表示必填,N表示非必填
 * @desc - 输入框组件, 目前只有一个相机的icon，如需增加请告知我
 * @author liuyunxiao
 * @param {String} title -N 左侧标题
 * @param {String} type -N 输入框类型,默认text类型
 * @param {String} placeholder -N 输入框placeholder
 * @param {String} iconType -N 输入框右侧icon,可填 camera, arrow,
 * @param {Boolean} readonly -N 是否只读
 * @param {Boolean} isWarn -N 是否显示右边警告图标(感叹号图标)
 * @param {String} align -N 文字对齐方式，默认left, 可选left center right
 * @param {String, Number} maxlength -N 输入长度限制
 * @event clickIcon -N 点击图标的回调
 * @event clickHandler -N 如有需要可陪Input点击的回调，只对readonly == true的输入框有效
 * @event on-focus -N 输入框获取焦点事件
 * @event on-blur -N 输入框获取失去焦点事件
 * @slot right 在输入框icon右边
 */
