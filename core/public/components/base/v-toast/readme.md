#### 弹窗提示
extra: 该组件支持以`plugin`形式调用：

 > warning
  以插件形式调用时，和`template`中使用不同，属性名请使用`小驼峰式`，比如`isShowMask`而不是`is-show-mask`。


 ``` js
 import  { ToastPlugin } from 'vux'
 Vue.use(ToastPlugin)

 // 或者umd方式
 // 引入构建的js文件
 Vue.use(vuxToastPlugin)

 // 默认参数
 Vue.use(ToastPlugin, {position: 'top'})
 ```

 ``` js
 // 显示
 this.$vux.toast.show({
  text: 'Loading'
 })

 // 显示文字
 this.$vux.toast.text('hello', 'top')

 // 隐藏
 this.$vux.toast.hide()

 // 获取显示状态
 this.$vux.toast.isVisible() // v2.9.1 开始支持
 ```

## 属性: 见vux官网，这个组件基本用不到
