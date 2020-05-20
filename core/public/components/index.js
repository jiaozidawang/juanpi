/*
 * @Author:
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-05 21:21:16
 * @Description: 全局组件
 */
import mPage from './base/page'
import mHeader from './base/header'
import mButton from './base/button'
import mGroup from './base/group'

export default {
  install (Vue){
    Vue.component('mPage', mPage)
    Vue.component('mHeader', mHeader)
    Vue.component('mButton', mButton)
    Vue.component('mGroup', mGroup)
  }
}
