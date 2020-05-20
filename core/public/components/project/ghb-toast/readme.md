# Toast 全局提示组件

> **此组件为全局组件,不用import,可直接使用,且是以插件的形式**

| 字段名 | 类型 | 字段说明 | 备注 |
| --- | --- | --- | --- |
| message | String | 展示的文字 |  |
| type | String | 展示的图标类型 | success, fail, collect, cancleCollect |
| duration | Number, String | 展示的持续时间 | 单位为毫秒 |
||||
```
// 调用方式
this.$toast(message, type, duration);

// 普通调用
this.$toast('调用成功')

// 需要有图标的方式
this.$toast('调用成功', 'success')

// 需要修改持续显示时间
this.$toast('调用成功', 'success', 5000);
```
