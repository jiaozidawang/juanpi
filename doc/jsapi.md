  ## JavaScript API （JSAPI）是为 H5 应用提供原生能力的接口，您可以利用这些接口使用更多的原生能力和操控能力，提高 H5 应用的用户体验。H5 容器组件提供以下能力：
  丰富的内置 JSAPI，实现例如页面 push、pop、标题设置等功能。更多信息，查看 参考：内置 JSAPI。支持用户自定义 JSAPI 和插件功能，扩展业务需求。
本文介绍如何实现自定义 JSAPI 和插件功能。
  ## jsApi
### pushWindow    <a>打开新窗口跳转</a>
  <!-- * @param {String} url 路由url信息, 必须以/开头
  * @param {Object} data 页面参数传递
  * @param {Object} param 具体可参考 https://www.cloud.alipay.com/docs/2/85055
  * @returns underfined
  * @example pushWindow('demo/jsapi/test.html', data, param) -->
```
 pushWindow('demo/jsapi/test.html', data, param)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| url| 路由url信息, 必须以/开头  | String  |
| data     | 页面参数传递 | Object |
| param     | 具体可参考 | https://www.cloud.alipay.com/docs/2/85055 |
||||

### setTitleBar   <a>设置顶部栏</a>
<!-- * @param data
* @returns {Promise} -->
```
setTitleBar(title).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| title     | 标题文字 | String |
| titleColor| 标题颜色| String|,
| backgroundColor | 标题背景颜色 |String|
||||

### pushWindowOnline   <a>打开第三方在线地址</a>
```
pushWindowOnline(url,data).then(callBack)

Example:
  pushWindowOnline('https://www.baidu.com/',{test1:'1',test2:'2'})
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| url     | 路由url信息 | String |
| data| 参数对象：支持简单key-value| Object|
||||

### locationTo   <a>在当前窗口跳转</a>
```
locationTo(url,data).then(callBack)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| url     | 路由url信息 | String |
| data| 参数对象：支持简单key-value| Object|
||||

### locationBack   <a>历史回退</a>
```
locationBack(index)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| index     | 历史回退索引 | Number |
||||

### redirect   <a>重定向地址</a>
```
redirect(url,data)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| url     | 路由url信息 | String |
| data| 参数对象：支持简单key-value| Object|
||||

### getQueryParams   <a>获取页面上送参数</a>
```
  getQueryParams().then(res => {})
```
返回一个传递值的参数对象

### popWindow   <a>关闭当前页面, 并传递数据到旧页面</a>
  <!-- * @param data
  * @returns {Promise} -->
```
  popWindow().then(() => {
    data:{}
  })
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| data     | 页面参数传递 | Object |
||||

### popTo   <a>回退至某个webview</a>
  <!-- * @param {Number} index 回退索引 -->
```js
 popTo(index)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| index     | 回退索引 | Number |
||||

### getSessionStorage   <a>获取数据存储缓存</a>
  <!-- * @param {String} key -->
```js
  getSessionStorage(key).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| key     | 获取数据存储缓存key | String |
||||

### setSessionStorage   <a>设置数据缓存</a>
  <!-- * @param {String} key 缓存键值
  * @param {Object} data 数据对象 -->
```js
  setSessionStorage(key, data).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| key     | 缓存键值 | String |
| data     | 数据对象 | Object |
||||
### getLocalStorage   <a>获取磁盘数据存储缓存</a>
  <!-- * @param {String} key -->
```js
  getLocalStorage(key).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| key     | 获取数据存储缓存key | String |
||||

### setLocalStorage   <a>设置磁盘数据缓存</a>
  <!-- * @param {String} key 缓存键值
  * @param {Object} data 数据对象 -->
```js
  setLocalStorage(key, data).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| key     | 缓存键值 | String |
| data     | 数据对象 | Object |
||||

### rpc   <a>远程过程调用</a>
  <!-- * @param {String} operationType 远程请求名称
  * @param {Object} requestData 远程请求参数 key:value
  * @param {Object} options 远程调用选项 -->
```js
  rpc(operationType, requestData, options).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| operationType     | 远程请求名称 | String |
| requestData     | 远程请求参数(key:value) | Object |
| options     | 远程调用选项 | Object |
||||

### alert   <a>提示框</a>
  <!-- * @param {String} message 提示文字内容
  * @param {String} title 标题
  * @returns {Promise} promise对象 -->
```js
  alert(message, title).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| title     | 标题 | String |
| message     | 提示文字内容 | String |
||||

### confirm   <a>确认框</a>
  <!-- * @param {String} message 确认文字内容
  * @param {String} title 标题
  * @returns {Promise} promise对象 -->
```js
  confirm(message, title).then(callback)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| title     | 标题 | String |
| message     | 提示文字内容 | String |
||||

### showLoading  <a>显示加载中</a>
  <!-- * @param {Object} options 加载中配置可选项  {text, delay, autoHide: false, cancelable: false} -->
```js
  showLoading(text, delay, autoHide: false, cancelable: false)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| text     | 加载文字 | String |
| delay     | 延迟时间 | Number |
||||

### hideLoading   <a>隐藏加载中</a>
```js
  hideLoading()
```

### login   <a>打开登录对话框</a>
  <!-- * @param {Object} options
  * @return {Promise} 异步对象 -->
```js
  login().then(callback)
```

### getUserInfo   <a>获取用户信息</a>
  <!-- * @returns {Promise} promise对象 -->
```js
  getUserInfo().then(callback, resolve)
```

### cleanUserInfo   <a>清除用户信息</a>
  <!-- * @returns {Promise} promise对象 -->
```js
  cleanUserInfo().then(callback)
```

### updateUserInfo   <a>更新用户信息缓存</a>
```js
  updateUserInfo()
```

### getImageBaseUrl   <a>获取服务器图片基础地址</a>
  <!-- * @param {String} message 提示文字内容
  * @param {String} title 标题
  * @returns {Promise} promise对象 -->
```js
  getImageBaseUrl().then(callback)
```
返回一个服务器地址

### showTitleBar   <a>显示头部</a>
  <!-- * @param {String} message 提示文字内容
  * @param {String} title 标题
  * @returns {Promise} promise对象 -->
```
  showTitleBar()
```

### hideTitleBar   <a>隐藏头部</a>
  <!-- * @param {String} message 提示文字内容
  * @param {String} title 标题
  * @returns {Promise} promise对象 -->
```
  hideTitleBar()
```


### getDeviceAndAppInfo   <a>获取设备与APP信息</a>
```js
  getDeviceAndAppInfo().then(callBack)

  return
  {
    "appVersionNo" : "xxxx",        //APP版本号
    "deviceVersionNo" : "xxxx",   //设备系统版本号
    "UUID" : "xxxx"     //设备uuid
    "phoneType": "xxx" // 手机类型
  }
```

### showSharePad <a>客户端的分享面板进行分享</a>
```js
  showSharePad({showShareType:'1|2|3|4'}).then(callBack)
```

### shareTo <a>设置分享面板</a>
```js
  shareTo({
    type,
    contentType,
    content,
    title,
    desc}).then(callBack)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| type     | 面板类型 | Object |
| contentType     |  | String |
| content     | 分享到链接 | String |
| title     | 面板标题 | String |
| desc     | 描述 | String |
||||

### showAddressList <a>打开通讯录</a>
  入参：

  ```js
  {
    "maxSeletedNum":"1"   //联系人最大选择数，必传，最低传1
  }
  ```

  返参:

  选择联系人后点击完成，返回的格式如下：

  ```js
  //data字段对应返回的是一个集合
  {
  "data" : [
    {
      "name":"xxx",
      "phoneNums":[
        "1234567891"
      ]
    },
    {
      "name":"xxx",
      "phoneNums":[
        "1234567891",
        "1234567891",
        ...
      ]
    },
      ...
    ]
  }
  ```
  如果用户点击取消的话会返回空，如下：

  ```
  {
  "data" : [ ]
  }
  ```

### sendSMS <a>发送短信</a>
入参：

```
{
"content":"xxxxxxx"  //短信内容
}
```
返参：

```
{
"errorCode":"0"   //0代表发送成功，1代表发送失败
}
```

### showPaymentPad <a>调起取款密码键盘(六格的那个)</a>
入参：

```
{
"money":"xxxx",   //支付金额
"cardNum":"xxxx"   //支付卡号
}
```
返参：

```
{
"apin":"xxxxxx",    //apin密文
"epin":"xxxxxx"    //epin密文
}
```

### chinese2MandarinLatin <a>中文转大写拼音</a>
  入参:

  ```
  {
  "chineseString":""  //待转换的中文字符串
  }
  ```

  返参:

  ```
  {
  "success":"",    //布尔值,转换是否成功  true表示成功
  "resultString":""  //转换结果大写拼音（仅当success成功时，才有该字段）
  }
  ```

### notifyThirdMerchant <a>通知第三方商户支付结果</a>
入参：

```
{
"isNotifyResult":"0"  //0代表通知商户支付结果，1代表重新加载第三方商户首页
//这三个参数是MP5251接口返回的，当isNotifyResult为1时，下面这三个参数传空
"keyRSA":"xxx",
"ivRSA":"xxx",
"cipher":"xxx",
}
```
返参：

```
{
//暂无
}
```

### getThirdMerchantOrderInfo <a>获取第三方订单信息</a>
入参：

```
//暂无
```

返参：

```
//请求成功
{
"errorCode":"0",  //0代表请求成功
"data":{...}      //透传MP5249接口的返回参数
"currentMenuId":""   //当前商户的ID
}
//请求失败
{
"errorCode":"1"  //1代表请求失败
"data":""        //请求失败，这个字段值为空
"currentMenuId":""   //当前商户的ID
}
```

### bluetoothServicesEnable<a>key盾-判断手机是否已开启蓝牙</a>
入参：

```
//暂无
```

返参：

```
{
"errorCode":"0"   //参考key盾errorCode表
"result": {
	"isBluetoothServicesEnable":""  //布尔值，是否可以使用蓝牙 布尔值，true代表已开启
}
}
```

### connectKeyDevice <a>key盾-连接key盾</a>
入参：

```
//暂无
```

返参：

```
{
"errorCode":""  //参考key盾errorCode表
}
```

### disconnectKeyDevice <a>key盾-断开key盾</a>
入参：

```
//暂无
```

返参：

```
{
"errorCode":""  //参考key盾errorCode表
}
```

### getDeviceInfo <a>key盾-获取key盾信息</a>
入参：

```
//暂无
```

返参：

```
{
"errorCode":""  //参考key盾errorCode表
"result": {
	"retry":"",   //剩余尝试次数
	"maxRetry":"",   //最大尝试次数
	"isDefault":""   //是否初始Pin 布尔值
}
}
```

### getBatteryStatus <a>key盾-获取key盾电量信息</a>
入参：

```
{
"isShowBatteryStatusAlert":""  //是否显示低电量弹窗 布尔值 默认false(不显示)
}
```

返参：

```
{
"errorCode":""  //参考key盾errorCode表
"result": {
	"batteryStatus":"",   //设备电量
	//0: 频临没电状态，此时急需充电，此状态设备不能正常工作
	//1: 低电状态，此时设备还可以工作
	//2: 电量中等状态
	//3: 电量充足状态
	"isContinue":""   //低电量弹窗按钮结果 布尔值 false取消 true继续
}
}
```

### readCertificate <a>key盾-读取key盾证书</a>

入参：

```
//暂无
```

返参：

```
{
"errorCode":""  //参考key盾errorCode表
"result": {
	"certificates":[
						{
							"serialNumber":"",  //证书序列号
							"issuerDN":"",
							"subjectDN":"",
							"notBefore":"",  //证书生效日期
							"notAfter":"",  //证书失效日期
							"data":""  //证书数据
						}
					]
			}
}
```

###changeKeyPin <a>key盾-改变key盾密码</a>
入参：

```
{
"oldKeyPin":"",   //旧pin 字符串
"newKeyPin":""   //新pin 字符串
}
```

返参：

```js
{
  "errorCode":""  //参考key盾errorCode表
}
```

### showDatePicker <a>时间选择控件</a>
入参：

```js
{
  "type":0, //控件类型 0 日期选择 1 时间选择
  "title":"请选择日期" //标题

  "minimumDate":"2018-01-01", //最小选择日期
  "maximumDate":"2018-12-31", //最大选择日期
  "currentDate":"2018-05-09", //当前选中日期
  "dateFormat":"yyyy-MM-dd", //日期格式 默认 yyyy-MM-dd

  "times":["11:00", "12:00", "13:00"], //时间选项数组
  "currentTime":"12:00" //当前选中时间
}
```

返参：

```js
{
  "currentDate":"2018-05-09", //选中日期
  "currentTime":"12:00", //选中时间
  "actionType":"1" //操作类型 0 返回 1 选择
}
```

### getLocationInfo<a>获取定位信息</a>
入参:

```
//暂无
```

返参:

```js
{
  "error":"1", //error 1 没有定位权限或定位失败
  //以下字段如果解析失败，即不存在
  "latitude":"", //纬度
  "longitude":"", //经度
  "country":"", //国家
  "administrativeArea":"",  //省份
  "locality":"", //城市
  "subLocality":"", //区
  "thoroughfare":"", //街
  "fullAddress":"", //详细地址
}
```

### copyToClipboard <a>复制字符串到剪切板</a>
入参:

```
{
"copyString":""  //待复制内容 字符串
}
```

返参:

```
{
"errorCode":"0" //0代表成功
}
```

### popAllWindow   <a>返回首页</a>
```
  popAllWindow()
```

### ocrCard   <a>扫描银行卡</a>
  * 扫描不成功不返回结果；成功则返回结果，数据格式如下：
  * 返回以下字段:
  ```
  {"isSuccessful" : "CardNumber:12312312312"}
  ```

### ocrIDCard   <a>扫描身份证</a>
  * 扫描不成功不返回结果；成功则返回结果，数据格式如下：
  ```{
      "isSuccessful" : '{
          "IDCardBackImage" : "xxxxx"
          "certNo" : "xxxxx"
          "validity" : "xxxxxx"
          "certName" : "xxxxxx"
          "IDCardFrontImage" : "xxxxxx"
          }'
      }
  ```

### toast   <a>显示一个弱提示</a>
  <!-- * @param {String} content 显示内容
  * @param {String} type 显示类型  success、fail、exception、none（默认）
  * @param {Integer} duration 显示持久时间 -->
```
  toast(content,type,duration)
```
| 参数 | 说明 | 类型 | 默认值  |
|-----------|-------------|----------|---|
| content     | 显示内容 | String | |
| type     | 显示类型 | String |  success、fail、exception、none（默认）|
| duration     | 显示持久时间 | Number | |
||||

### getSimCardInfo   <a>获取sim卡信息</a>
  <!-- * @param {String} content 显示内容
  * @param {String} type 显示类型  success、fail、exception、none（默认）
  * @param {Integer} duration 显示持久时间 -->
```
  getSimCardInfo().then(callBack)
```

### openBaiduFace <a>人脸识别</a>
入参：

```
{
"overtime":"10",   //人脸识别超时时间，不传默认10秒
"collectActionType":"0,1,2",   //字符串类型，动作用数字表示，英文逗号分隔
"timemark":"",  //时间戳
//------水印内容------
"cardNo":"",
"certNo":"",
"time":"",
"item":"",
}
```

返参：

```
{
"identification_reslut":"0",   //识别结果，0代表成功，
//-----identification_reslut为0时才有以下数据-----
"aeye_data":"",  //人脸识别图片的base64字符串
"random":"",  //一个随机整数, 范围：100000 - 999999
"token":"",  //时间戳，与入参时的timemark保持一致
"version":"",  //当前人脸识别SDK版本号
"system":"iOS",  //当前操作系统，iOS代表苹果系统，Android代表安卓系统
"water_img":""  //水印图片的base64字符串
}
```

###getNativePhoto <a>获取相机照片</a>


入参：

```
//暂无
```

返参：

```
{
"errorCode":"0",    //结果，0代表成功（用户选择了相册照片或者拍照），1代表失败（没有相机权限，请提醒用户），2代表失败（没有相册功能）,其他代表失败（用户未选择）
"describe":"成功",  //结果描述
"picDataStr":@[]   //选择的图片的二进制数据转成的string的数组（已压缩）
}
```

###getBankList <a >银行列表功能</a>
入参：

```
{
"flag":"1"
}
```

返参：

```
{
"unionBankNo":"",    //银行唯一标识
"bankType":"",      //银行代号
"bankName":"",       //银行名称
"flag":"",          //是否集合银行标识
"bankChannel":"",    //支持通道
"firstHead":"",      //银行名称首字母
"firstAllHead":"",    //银行名称首字母全拼
"pinyin":"",          //银行名称全拼名称
"detailUrl":""        //小图标的url地址
}
```

### pushThirdWindow <a>打开第三方H5页</a>

入参：

```
{
"listenURL":"xxxx",  //需要native监听或拦截的URL或者字段
"isIntercept":"0",   //0代表只监听不拦截，1代表监听并拦截
"loadURL":"xxxx",    //需要加载的第三方H5页面URL
"titleParams":{
				"title":"银联签约",
				"left1Img":"backimage",
				...
				},   //设置标题栏的参数，参数参照setNavigationBar这个jsapi，iOS会根据参数设置第三方H5页的标题栏
"otherParams":{
				"allowsBounceVertical":false,
				"showProgress":false,
				...
				},   //原pushwindow这个jsapi调用时会加入的参数，iOS会在打开第三方H5页面时带上参数
}
```

返参：

```
//页面正常运行，触发监听条件时
{
"isListened":"1"  //1代表监听和拦截成功
"resultURL":"xxx"  //拦截到的URL
}

//当点击页面标题栏按钮时
{
"buttonKey":"xxxxx"   //跟之前监听标题栏按钮点击的返回参数一致
}
```

### showMask <a name="显示遮罩">显示遮罩</a>
入参：

```
{
"maskColor":"000000", //遮罩颜色 默认黑色
"maskColorAlpha":0.4 //遮罩颜色透明度 默认0.4
}
```

返参：

```
//暂无
```

### getGestureState <a>判断手势密码开启状态</a>


入参：

```
//暂无
```

返参：

```
{
"result":"1" //1代表已开启，其他代表未开启
}
```

### setGesturePWD<a>手势密码相关操作</a>


入参：

```
{
"type":"1" //1代表设置手势密码，2代表修改手势密码，3代表删除手势密码(入参若返回其他本地容错默认为1)
}
```

返参：

```
{
"result":"1" //1代表操作成功，无返回或其他代表失败
}
```

### mpSessionID <a>获取sessionID</a>
入参：

```
{
"operationType":"0",   //0代表获取sessionID，1代表设置sessionID，2代表删除sessionID
"sessionID":"xxx"     //当operationType为1时，必传。
}
```

返参：

```
//无论入参传哪一种operationType，都按照以下格式返回：
{
"sessionID":""    //返回sessionID，无值时返回空
}
```

### getDeviceFingerprint <a>获取设备指纹信息</a>
```
  getDeviceFingerprint()
```

### setBarBottomLineColor <a>可通过该接口自定义导航栏底部细线的颜色</a>
```
  setBarBottomLineColor(color)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| color     | 色值，十进制 | int |
||||

### addNotifyListener <a>添加native通知的监听</a>
```
  addNotifyListener(name).then(callBack)
```
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| name     | 通知名称 | String |
||||

### showLocationSelect <a>所在地省份城市联动选择</a>
入参：

```
{
"provinceName":"广东省", //要选中的省份名
"provinceCode":"44000", //要选中的省份代码
"cityName":"广州市", //要选中的城市名
"cityCode":"00001" //要选中的城市代码
}
ps:省份城市选中仅在有数据时才生效
```

返参：

```
{
"provinceName":"广东省", //选中的省份名
"provinceCode":"44000", //选中的省份代码
"cityName":"广州市", //选中的城市名
"cityCode":"00001", //选中的城市代码
"actionType":"0" //操作类型 (0 隐藏 1 选择)
}
```

### showKeyboard    <a>调用原生键盘</a>
  <!-- * maxSize 最大输入长度
  * ps 加密模式 例如: A0/A1/E0/E1/AE0/AE1 默认AE0
  * curText 当前输入的文本（用于非加密键盘拼接字符串）
  * type 键盘类型
    * 0 加密可切换数字键盘
    * 1 加密不可切换数字键盘
    * 2 加密英文键盘 小写
    * 3 加密英文键盘 大写
    * 4 加密符号键盘
    * 5 普通数字键盘
    * 6 金额数字键盘 带点号
    * 7 身份证数字键盘 带X @return
      * apin apin密文
      * epin epin密文
      * len   长度
      * curText 当前输入的文本（用于非加密键盘）
      * action 动作类型 input 输入、hide 隐藏键盘、finish 完成 -->
| 参数 | 说明 | 类型 |
|-----------|-------------|----------|
| maxSize     | 最大输入长度 | Number |
| ps     | ps 加密模式 例如: A0/A1/E0/E1/AE0/AE1 默认AE0 | String |
| type     | 键盘类型 | Number |
|||
* type 键盘类型
  * 0 加密可切换数字键盘
  * 1 加密不可切换数字键盘
  * 2 加密英文键盘 小写
  * 3 加密英文键盘 大写
  * 4 加密符号键盘
  * 5 普通数字键盘
  * 6 金额数字键盘 带点号
  * 7 身份证数字键盘 带X @return
    * apin apin密文
    * epin epin密文
    * len   长度
    * curText 当前输入的文本（用于非加密键盘）
    * action 动作类型 input 输入、hide 隐藏键盘、finish 完成
||||

### screenShots <a>保存截图</a>
```
  screenShots().then(callback)
```
入参:

```
{
"range":"", //"screen" 截取当前webview可视区域(默认),"document" 截取整个webview区域, "custom" 截取自定义webview区域
"originY":"" //起始Y坐标（仅当range为custom）
"height":""  //截取的高度（仅当range为custom）
}

//ps:custom模式缺少任意一个参数，即变为screen模式
```

返参:

```
{
"success" : "true"  //截图是否保存相册成功
}
```

### getGestureState  <a>判断手势密码开启状态</a>
  ```{
    "result":"1" //1代表已开启，其他代表未开启
    }
  ```

### getDeviceFingerprint    <a>获取设备指纹信息</a>
```
  getDeviceFingerprint().then(callback)
```
### pushNetworkCityWindow   <a>新增:安全锁地区选择</a>
  ```
   pushNetworkCityWindow(data).then(callback)
    data={
     areaType : 查询类型，”1”：境内，”0”：境外,
     areaMax  : 允许可选择地区上限
     selectedAreaList : [{ //已选择的地区列表
     areaName:''//国内省名称/国家名称
     areaCode:''//国内省代码/国家代码
    }
  ```

### pushSoundWindow <a>打开语音记账或在线客服录音界面</a>
  * 入参： 1为语音记账，2为语音记账
```
  pushSoundWindow()
```
### inputAlert    <a>记账本模块特殊的遮罩输入的东西</a>
  ```
    inputAlert(data).then(callback)

    data:{
        title 弹窗标题 （必传）
        message  弹窗详情
        presetInputContent  预先在输入框，给用户输入的内容
        placeholder  占位符提示
        okButton  第一个按钮的文字（必传，若有第二个按钮，则第一个按钮在右）
        cancelButton  第二个按钮的文字
        canDismiss 点击弹框之外的区域是否回收关闭弹框，默认值是0 [true：点击外围可关闭 false:点击外围不可关闭]
        wordsNumLimit  字数限制  默认无限制
        keyboardType  键盘类型  0或者不传为默认键盘，1为纯数字
        inputLimitType  输入限制类型 可选——1限制为汉字 2限制为字母 3限制为数字 用法 传字符串'1|2|3', 则限制为汉字字母数字
    }
  ```
  * callback

    inputContent   用户输入的内容

    ok  true 第一个按钮

    false 第二个按钮

    dismissByClickBg: String ’1‘代表用户点击弹框外围关闭回收了弹框

### showOCRIDCard   <a>OCR扫描</a>
  ```
    showOCRIDCard(data).then(callback)

    data:{
      'pageUrl':'',OCR扫描要跳转到的页面
      'accountNo_sequence':'卡序列号',
      'type':'reAuthentication'  //reAuthentication  说明要补全影像
    }
 ```

### getVersionInfo <a>获取版本号</a>
H5可以通过JSApi获取版本号。

```objc
AlipayJSBridge.call('getVersionInfo', {
	// 菜单总版本 - menuGroupVersion
	// 菜单版本集合 - menuVersionLis
	// 楼层版本集合 - pageFloorVersionList
	// APP版本- newAppVersion
	versionKey: menuGroupVersion
   }, function(result) {
   		 result: // 集合或者字符串
	     errorCode: -1   或 -11  错误代码自己定义
		 errorMessage: '错误对应的话术'

  });

```

### getSysDate <a name="获取服务端时间">获取服务端时间</a>
H5可以通过JSApi获取服务端时间。

```objc
AlipayJSBridge.call('getSysDate', {

   }, function(result) {
   		 result: // yyyyMMddHHmmss
	     errorCode: -1   或 -11  错误代码自己定义
		 errorMessage: '错误对应的话术'

  });
```

### getCurrentStyle <a name="获取当前风格">获取当前风格</a>
H5可以通过JSApi获取当前风格。

```objc
AlipayJSBridge.call('getCurrentStyle', {

   }, function(result) {
   		 result: // A/B
	     errorCode: -1   或 -11  错误代码自己定义
		 errorMessage: '错误对应的话术'

  });
```

### getImgServerUrl <a name="获取图片服务器地址">获取图片服务器地址</a>
H5可以通过JSApi获取图片服务器地址。

```objc
AlipayJSBridge.call('getImgServerUrl', {

   }, function(result) {
   		 result: // 字符串
	     errorCode: -1   或 -11  错误代码自己定义
		 errorMessage: '错误对应的话术'

  });
```
