****## 金额输入框组件

####　属性

| 属性名 | 类型 | 属性值 | 备注 |
| --- | --- | --- | --- |
| warnText | String | 错误提示文字 | 当isWarn为true时有效 |
| title | String | 标题 |  |
| isWarn | Boolean | 是否金额输入有误 |  |
| needCash | Boolean | 是否需要在底部展示大写金额 | 默认为true |
| needBottomLine | Boolean | 是否需要在金额底部展示线条 | 默认为true |
| placeholder | String | 提示文字 |  |
| currency | String | 币种 | 具体枚举请看core/utils/filters/dictionary.js的dictionayr.CURRENCY_ICON |
| sLimit | String | 小数位数限制 | 默认2位 |


#### 事件
| 事件名 | 事件说明 | 备注 |
| --- | --- | --- |
| on-change | 输入值改变时触发 |  |
| on-input | 输入时触发 |  |
| on-focus | 聚焦时触发 |  |
| on-blur | 失焦时触发 |  |
| cleanIcon | 点击清除按钮时触发 |  |


#### 插槽
| 插槽名 | 插槽说明 | 备注 |
| --- | --- | --- |
| titleValue | 位于标题右边，右对齐| |
| input | 输入框右边 | 用于icon |
| default | 输入框下方 |  |
| warn | 组件下方 | 该位置没有背景色 |
