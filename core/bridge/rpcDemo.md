# rpc使用方法

```js
// 接口 xxxxxx
// 参数
const params = {
  abc: '123'
}

// 普通请求, 默认统一处理错误信息，alert弹出错误信息
this.$tools.rpc('xxxxx', params).then(({ header, body }) => {

})

// 普通请求, 默认统一处理错误信息，需要toast提示错误信息
this.$tools.rpc('xxxxx', params, {
  bizMsgType: 'toast'
}).then(({ header, body }) => {

})

// 需要自己处理错误信息
this.$tools.rpc('xxxxx', params, {
  biz: true
}).then(({ header, body }) => {

})

// 不需要菊花的rpc
this.$tools.rpc('xxxxx', params, {
  globalLoading: false
}).then(({ header, body }) => {

})

```
