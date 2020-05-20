## v-button使用说明


#### 属性
名字         |	类型   |	默认值     |	说明
------------|---------|-------------|------
type        | string  | default     | 按钮类型，可选值为 default,primary,warn|
disabled    | boolean | false       | 是否不可点击
text        | string  |		        | 按钮文字,同默认slot
size        | string  | default     | 按钮尺寸，可选L,M,S
plain       | boolean | false       | 是否是plain样式，没有背景色
action-type | string  |	            | button的type属性，默认为浏览器默认(submit)，可选为 submit button reset
show-loading| boolean |false        | 显示加载图标
gradients   | array   |		        | 按钮背景渐变，长度必须为2

#### 事件


```
/**
* @event {clickHandler} 点击按钮的回调
*/

```

#### 插槽
默认插槽   按钮文字


#### 例子
```
<m-button size="L" @clickHandler="clickButton">确定</m-button>
```
