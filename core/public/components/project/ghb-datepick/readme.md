

## 时间选择组件

#### 此readme针对datepick.vue文件

#### 属性
| 属性名 | 类型 | 属性说明 | 备注 |
| --- | --- | --- | --- |
| title | String | 标题 |  |
| startDefault | String | 默认的第一个时间 |  |
| endDefault | String | 默认的第二个时间 |  |
| format | String | 默认的第二个时间 | 默认YYYY-MM-DD |
| maximumDate | String | 可选最大时间 | 默认YYYY-MM-DD |
| minimumDate | String | 可选最小时间 | 默认YYYY-MM-DD |

#### 事件
| 事件名 | 事件说明 | 备注 |
| --- | --- | --- |
| confirm | 选择了时间的时候触发，返回选择的日期对象，包括开始和结束日期 |  |

#### 方法
| 方法名 | 方法说明 | 备注 |
| --- | --- | --- |
| reset | 重置时间选择 | 通过$refs.xxx.reset()调用 |



#### 示例
```html
  <date-pick startDefault="2019-05-22" endDefault="2018-06-22" @confirm="selectDate"></date-pick>
```

```js
// 外部修改datepick的选中值
this.$refs.xxx.startDate = xxx;
this.$refs.xxx.endDate = xxx;
```
