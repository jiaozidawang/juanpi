/**
 * @author
 * @date 2019-03-09
 * @param {String} placeholder input的placeholder
 * @param {String} title 金额输入框的标题
 * @param {String} value 输入框的值，用v-model绑定
 * @param {Boolean} isWarn 输入的值是否有问题
 * @param {String} warnText 提示文字
 * @param {String} handlerText 可以点击并返回回调的文字
 * @param {String} currency 币种符号， 字典枚举可看 core/utils/filters/dictionary.js文件里面的CURRENCY_ICON对象
 * @param {String} sLimit 限制的小数位数，默认2位
 * @param {String} max 限制最大输入位数
 * @param {Boolean} readonly 是否只读
 * @event clickHandlerText 点击handlerText触发的回调, 当handlerText有值时有效
 * @event on-input 输入时触发
 * @event on-focus 获得聚焦时触发
 * @event on-blur 失去焦点时触发
 * @event cleanIcon 点击clean图标时触发
 * @event inputError 输入的内容不符合金额规范时触发
 * @slot input 位于输入框右侧
 * @slot default 位于输入框下方
 * @slot titleValue 位于 标题栏右边
 */


 // 调用模板
 // template里
 // <sumInputFormat v-model="amount"></sumInputFormat>


 // js
 import sumInputFormat from '@comps/ghb-sumInputFormat';

 export default {
     data () {
         return {
             amount: ''
         }
     }
 }
