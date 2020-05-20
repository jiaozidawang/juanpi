## 具体使用文档请看vux官网的cell文档


#### 属性

名字	| 类型  |	默认值 | 说明	| 版本要求
-----|-----|-----|-----|-----
title	| string	|	 |左边标题文字	| --
value	| string	| 	| 右侧文字，复杂的样式布局请使用slot	| --
inline-desc	| string | 		| 标题下面文字，一般为说明文字	| --
is-link	| boolean	| false	| 是否可跳转，如果是，右侧将会出现指引点击的右箭头	| --
primary	| string	| title	| 可选值为 ['title', 'content']，对应的div会加上weui_cell_primary类名实现内容宽度自适应	| --
is-loading	| boolean	| false	| 是否显示加载图标，适用于异步加载数据的场景	| v2.2.0
value-align	| string	| left	| 文字值对齐方式，可选值为 left right。当设为 right 时，primary 值将会设为 content	| v2.2.0
border-intent	| boolean	| true	| 是否显示边框与左边的间隙	| v2.2.1-rc.1
arrow-direction	| string		| 右侧箭头方向，可选有 up down	| v2.2.1-rc.1
disabled	| boolean		| 对 label 和箭头(如果使用 is-link )显示不可操作样式	| v2.2.2
align-items	| string	| center	| align-items | 样式值	| v2.6.4
titleType   | Object    |           | 左侧标题样式
hasArrow   | Boolean    |     true      | 是否需要右边箭头，此属性需is-link为true时生效，通常用于需要点击cell背景变灰但不需要箭头的时候，把他置为false



#### 插槽

名字	| 说明	| 版本要求
-----|------|--------
默认插槽	| 右侧内容，相比于value的优点是可以用复杂的样式或者调用组件	| --
value	| [废弃] 同默认slot	 |--
icon	| 标题左侧的图像位置	| --
after-title	| 标题右侧位置	| --
child	| cell的直接子元素，因此可以添加一个相对于cell绝对定位的元素	| --
inline-desc	| inline-desc 内容，和 prop:inline-desc 功能一样，但是可以使用 html	| v2.2.1-rc.6
title	| title 插槽，方便自定义样式	| v2.3.3
