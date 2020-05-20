## 开启关闭

#### 属性
名字	| 类型	| 默认值	| 说明
----|----|----|----|----
title	| string	| 	| label文字	|
disabled	| boolean	| false	| 是否不可点击
value	| boolean	| false	| 表单值, 使用v-model绑定
inline-desc	| string	|	| 标签下文字
prevent-default	| boolean	| false	| 阻止点击时自动设定值
value-map	| array	| [false, true]	| 用于自定义 false 和 true 映射的实际值，用于方便处理比如接口返回了 0 1 这类非 boolean 值的情况


####  事件
名字	| 参数	| 说明
----|----|----|----
@on-change	| (value)	| 值变化时触发，参数为 (currentValue)
@on-click	| (newVal, oldVal)	| 点击组件时触发	
