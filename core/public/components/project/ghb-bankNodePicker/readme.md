# 银行网点选择组件

使用v-model绑定显示隐藏


### 属性
| 属性名 | 属性类型 | 作用 | 备注 |
| --- | --- | --- | --- |
| searchInfo | object | 需要查询的银行的信息 | 里面需要包含银行名称 bankName，标准联行号 bankId 例：{bankName: '广东华兴银行', bankId: '308812738727'} |


### 事件
| 事件名 | 触发时机 | 备注 |
| --- | --- | --- |
| on-change | 选择了银行网点之后触发 |  |
| close | 银行popup时触发 |

### API
api在utils/api.js里面配置