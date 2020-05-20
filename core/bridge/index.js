/*
 * @Author:
 * @Date: 2019-09-04 20:17:54
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-10-23 19:30:08
 * @Description:
 */
import _ from "lodash";
import { rpc } from "./rpc";
import {
  __commonWrap,
  pushWindowParam,
  buildParams,
  parseParams,
  uuid,
  formatBank
} from "./helper";
import { __isEmptyObject } from "../helper";

import { setTimeout, clearTimeout } from "timers";

import errorDictionary from "../init/errorDictionary/index.js";

// 温馨提示
const SWEET_PROMPT = errorDictionary.SWEET_PROMPT;

/**
 * ====================================base====================================
 */

/**
 * 打开新窗口跳转
 * @param {String} url 路由url信息, 必须以/开头
 * @param {Object} data 页面参数传递
 * @param {Object} param 具体可参考 https://www.cloud.alipay.com/docs/2/85055
 * @returns underfined
 * @example pushWindow('demo/jsapi/test.html', data, param)
 */

//  export const pushWindow = (url, data= {}) => {
//    AlipayJSBridge.call("pushWindow", {url, url});
//  }
export const pushWindow = _.debounce(
  (url, data = {}, param = {}, options = {}) => {
    if (url && /^http(s)?:\/\//.test(url)) {
      pushWindowOnline(url, data, param);
      return;
    }

    //确保url以绝对路径访问 且 在分析跳包时分析准确
    url = url.charAt(0) == "/" ? url : "/" + url;

    //PAGEINFO url需要去头去尾
    let pageInfoUrl = url.replace(/(\/)([^\.]+)(\..*)?/, "$2");

    //是否要登录的标记
    const pageConfig = PAGEINFO[pageInfoUrl] || {};
    let { needLogin, pushParam = {} } = pageConfig;

    //允许外部强制控制登录
    needLogin = needLogin === false ? options.needLogin || false : needLogin;

    //当前实例登录态
    const { loginStatus } = App.vm.$store.getters;

    //目标url 和 当前url比较，不同包的时候返回目标页的appId
    const findPackageNameByUrl = ((
      targetUrl,
      originUrl = window.location.pathname
    ) => {
      const tu = targetUrl.split("/")[1];
      const ou = originUrl.split("/")[1];
      return tu === ou ? false : PACKAGEID[tu];
    })(url);

    //生成pushWindow所需要的所有参数
    const { method, obj } = pushWindowParam(
      findPackageNameByUrl,
      param,
      pageConfig
    );

    //利用sessionstorage传递数据
    let uuidstr = uuid();
    setSessionStorage(uuidstr, JSON.stringify(data));
    let paramstr = buildParams({ _PARAMSKEY: uuidstr });
    let lastUrl = /\?/.test(url) ? url + "&" + paramstr : url + "?" + paramstr;

    const next = () => {
      console.info(
        `--${method}--${JSON.stringify(Object.assign(obj, { url: lastUrl }))}`
      );
      AlipayJSBridge.call(method, Object.assign(obj, { url: lastUrl }));
      setTimeout(() => App.trigger("H5_leave"), 120);
    };

    loginStatus === true || needLogin === false ? next() : login({ pageUrl: lastUrl, state: "callBack" });
      // : login({ pageUrl: lastUrl, state: "pushNoLogin" });
  },
  800,
  {
    leading: true,
    trailing: false
  }
);


export function getGlobalTheme () {
  return __commonWrap("GetGlobalTheme");
}

/**
 * @method closeTo
 * @desc 回退页面
 * @param{Object} opt -
 * {
 *    index: -1  表示回退N步, 必须传number类型
 *    url: '/home/cdbank_index/index.html?a=1&b=2'  回退到的页面的路径，需要带上参数
 *    urlPattern: '/home/cdbank_index/index.html'  回退到的页面的路径
 *    data: {}   返回时要带到上个页面的参数
 * }
 * @returns {Promise} 返回回调Promise
 * @example App.Native.closeTo()
 * 优化级： urlPattern,url,index,
 *  urlPattern,url,index, 只需要使用其个一个即可
 */
export function closeTo(opt = {}) {
  return new Promise((reslove) => {
    if(opt.index) {
      opt.index = Number(opt.index);
    }
    // 安卓会出现关闭页面还有loading的情况，这里处理一下
    hideLoading()
    AlipayJSBridge.call("closeTo", opt, (res) => {
      reslove(res);
    });
  });
}

/**
 * 打开第三方在线地址
 * @param {String} url 路由url信息
 * @param {Object} data 参数对象：支持简单key-value (待设计)
 * @param {Object} options 路由选项
 * @returns {Promise} Promise对象
 * @example
 *     pushWindowOnline('https://www.baidu.com/', {test1:'1',test2:'2'})
 */
export const pushWindowOnline = _.debounce(
  function(url, data = {}, options = {}) {
    //构建url参数
    let defaultParams = {
      titleBarColor: 16777215,
      showOptionMenu: false,
      showTitleBar: true
    };

    let params = buildParams(data);
    let lasturl =
      url.indexOf("?") > -1 ? url + "&" + params : url + "?" + params;

    let routeParams = {
      url: lasturl,
      param: _.extend(defaultParams, options || {})
    };

    return __commonWrap("pushWindow", routeParams);
  },
  800,
  {
    leading: true,
    trailing: false
  }
);

/**
 * 关闭当前页面, 并传递数据到旧页面
 * @param data
 * @returns {Promise}
 */
export function popWindow(data) {
  return __commonWrap("popWindow", {
    data
  });
}

/**
 * 回退至某个webview
 * @param {Number} index 回退索引
 */
export function popTo(index, urlPattern = "", data = {}) {
  let options;
  if (_.isObject(index)) {
    options = index;
  } else if (index === "") {
    options = { urlPattern, data };
  } else {
    options = { index, data };
  }
  return __commonWrap("popTo", options);
}

/**
 * 在当前窗口跳转
 * @param {String} url 路由url
 * @param {Object} data 数据对象
 */
export function locationTo(url, data = {}) {
  //利用sessionstorage传递数据
  let uuidstr = uuid();
  setSessionStorage(uuidstr, JSON.stringify(data));
  let paramstr = buildParams({ _PARAMSKEY: uuidstr });
  let lasturl = /\?/.test(url) ? url + "&" + paramstr : url + "?" + paramstr;

  lasturl.charAt(0) != "/" && (lasturl = "/" + lasturl);

  window.location.href = lasturl;
}

/**
 * 历史回退
 * @param {Number} index 历史回退索引
 */
export function locationBack(index = -1) {
  window.history.go(index);
}

export function redirect(url, data = {}) {
  //利用sessionstorage传递数据
  let uuidstr = uuid();
  setSessionStorage(uuidstr, JSON.stringify(data));
  let paramstr = buildParams({ _PARAMSKEY: uuidstr });
  let lasturl = /\?/.test(url) ? url + "&" + paramstr : url + "?" + paramstr;

  //数据构建
  // let context = {url, data}

  // //构建url参数
  // let originData = context.data
  // context.data = {_PARAMS: JSON.stringify(originData)}

  // let params = buildParams(context.data)
  // let lasturl = context.url.indexOf('?') > -1 ? (context.url + '&' + params)
  //     : (context.url + '?' + params)

  lasturl.charAt(0) != "/" && (lasturl = "/" + lasturl);

  location.replace(lasturl);
}

/**
 * 获取页面上送参数
 * @returns {Object} 参数对象
 */
export function getQueryParams() {
  let search = window.location.search || "";
  let params = parseParams(search.substring(1));
  return params;
}

/**
 * @description 获取app版本号
 */
export function getVersionInfo() {
  return __commonWrap('getMemoryCache', {key: 'versionNumber'});
}

/**
 * 获取数据存储缓存
 * @param {String} key
 */
export function getSessionStorage(key, keep = true) {
  return __commonWrap("getMemoryCache", { key }).then((result) => {
    keep === false && setSessionStorage(key, "");
    return new Promise((resolve, reject) => {
      try {
        resolve(result.data || "");
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * @param {String} data
 */
// 调起电话
export function callPhoneNumber(phoneNumber) {
  return __commonWrap("callPhoneNumber", { phoneNumber: phoneNumber });
}

/**
 * 设置数据缓存
 * @param {String} key 缓存键值
 * @param {Object} data 数据对象
 */
export function setSessionStorage(key, data) {
  return __commonWrap("setMemoryCache", { key, data });
}

/**
 * 获取磁盘数据存储缓存
 * @param {String} key
 */
export function getLocalStorage(key, keep = true) {
  return __commonWrap("getStorageCache", { key }).then((result) => {
    keep === false && setLocalStorage(key, "");
    return new Promise((resolve, reject) => {
      try {
        resolve((result || {}).data || "");
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * 设置磁盘数据缓存
 * @param {String} key 缓存键值
 * @param {Object} data 数据对象
 */
export function setLocalStorage(key, data) {
  return __commonWrap("setStorageCache", { key, data });
}

/**
 * 显示一个弱提示
 * @param {String} content 显示内容
 * @param {String} type 显示类型  success、fail、exception、none（默认）
 * @param {Integer} duration 显示持久时间
 */
export function toast(message, showIcon = "0", result = "1") {
  return __commonWrap("showToast", {
    message,
    showIcon,
    result
  });
}

/**
 * @desc 成功的toast
 * @param {String} message
 */
export function successToast(message) {
  return toast(message, "1", "1");
}
/**
 * @desc 失败的toast
 * @param {String} message
 */
export function errorToast(message) {
  return toast(message, "1", "0");
}

/**
 * 提示框
 * @param {String} message 提示文字内容
 * @param {String} title 标题
 * @returns {Promise} promise对象
 */
export function alert(
  title = "温馨提示",
  message,
  { button = "好的", canDismiss = false, errorCode } = {}
) {
  if (!_.isString(title)) {
    try {
      title = typeof title;
    } catch (e) {}
  }

  return __commonWrap("ghbAlert", {
    title,
    message,
    okButton: button,
    clickBgToHide: canDismiss ? "1" : "0"
  });
}

/**
 * 用以处理后端返回的需要弹窗的信息
 * @param {string} title 错误信息
 */
export function errorAlert(title) {
  if (!title) {
    throw new Error("errorAlert没有传值");
  }
  // 单例模式
  if (window.singleFlag) {
    return;
  }
  window.singleFlag = true;

  return new Promise((resolve, reject) => {
    let opt = {
      title: "温馨提示",
      message: title,
      okButton: "好的",
      clickBgToHide: "0"
    };
    AlipayJSBridge.call("ghbAlert", opt, (res) => {
      if (res && res.errorCode && res.errorCode != "0") {
        reject(res);
      } else {
        if (res.ok) {
          window.singleFlag = false;
        }
        resolve(res);
      }
    });
  });
}

/**
 * 用以处理前端自己需要弹窗的信息
 * @param {string} title 错误信息
 */
export function errorAlertH5(title) {
  if (!title) {
    throw new Error("你用errorAlertH5函数的时候没有传值啊");
  }
  return __commonWrap("ghbAlert", {
    title,
    message: "",
    okButton: "好的",
    clickBgToHide: "0"
  });
}

/**
 * 确认框
 * @param {String} message 确认文字内容
 * @param {String} title 标题
 * @returns {Promise} promise对象
 */
export function confirm(
  title,
  message,
  { align = "center", okButton = "确定", cancelButton = "取消" } = {}
) {
  return __commonWrap("ghbAlert", { title, message, okButton, cancelButton });
}

/**
 * 显示加载中
 * @param {Object} options 加载中配置可选项  {text, delay, autoHide: false, cancelable: false}
 */
export function showLoading(statusText) {
  return __commonWrap("showGHBLoading", { statusText });
}

/**
 * 隐藏加载中
 */
export function hideLoading() {
  return __commonWrap("hideGHBLoading");
}

/**
 * 打开登录对话框
 * @param {Object} options
 * @return {Promise} 异步对象
 */
export function login(options) {
  return __commonWrap("pushLoginVC", options);
}

/**
 * 获取用户信息
 * @returns {Promise} promise对象
 */
export function getUserInfo() {
  return __commonWrap("getUserInfo");
}

/**
 * 清除用户信息
 * @returns {Promise} promise对象
 */
export function cleanUserInfo() {
  return __commonWrap("cleanUserInfo");
}

/**
 * @description 更新用户信息
 * 需要前置出一个专门查登录信息的
 */
export function updateUserInfo() {
  return __commonWrap("updateUserInfo");
}

// 非常用设备登录验证码校验结果返回给原生
export function H5Notification(res) {
  return __commonWrap("H5Notification", { state: res ? "0" : "1" });
}

// 获取通知设置状态
export function notificationStatus(params) {
  return __commonWrap("notificationStatus", params);
}

// 打开通知设置
export function goToSysSetting() {
  return AlipayJSBridge.call("goToSysSetting");
}

// 打开定位设置页面
export function openLocationSettings() {
  return __commonWrap("openLocationSettings");
}

/**
 *
 * @description 调起短信输入弹窗
 * @param {String} operationType 请求的接口名
 * @param {Object} params 请求的参数
 *
 * 调起短信输入弹窗要监听
 */
export function showPopupMessageInput({ operationType, params }) {
  AlipayJSBridge.call("showPopupMessageInput", { operationType, params });
}

// U盾相关

/**
 * @desc 获取U盾签名
 * @param {String} signOri 待签名数据
 * @param {String} HashAlg 签名模式 1为RSA，2为SM2
 */
export function getUKeySign({ signOri, HashAlg = "1" }) {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      "getUKeySign",
      { signOri: signOri, HashAlg: HashAlg },
      (res) => {
        if (res && res.errorCode && res.errorCode != "1") {
          resolve(res);
          return;
        }
        reject(res);
        alert(COZY_PROMPT, "获取U盾签名失败!");
      }
    );
  });
}

/**
 * @description 获取U盾序列号
 */
export function getUKeyNumber() {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call("getUKeyNumber", (res) => {
      // iphone的特殊处理
      if (navigator.userAgent.indexOf("iPhone") != "-1") {
        res != "1" ? resolve(res) : reject(res);
        return;
      }
      // 不是iphone的处理
      if (res && res.errorCode && res.errorCode != "1") {
        resolve(res);
        return;
      }
      reject(res);
      alert(COZY_PROMPT, "获取U盾序列号失败!");
    });
  });
}

/**
 * @description 读取U盾证书
 * @param {String} certSN 证书的SN
 */
export function readUKeyCertificate(opt) {
  return __commonWrap("readUKeyCertificate", opt);
}

// 修改U盾密码
export function changePIN() {
  return __commonWrap("changePIN");
}

/**
 * @desc 获取U盾证书有效期
 * @param {String} certSN
 */
export function getUKeyValidity(opt) {
  return __commonWrap("getUKeyValidity", opt);
}

/**
 * @desc 获取密码重试次数
 * @param {Object} pulRetryCount 输入缓冲区，输出重试次数
 */
export function getRepeatNumber(opt) {
  return __commonWrap("getRepeatNumber", opt);
}

/**
 * @desc 验证密码是否为初始密码
 */
export function isPinOrigin() {
  return __commonWrap("isPinOrigin");
}

// 云盾相关

/**
 * @description 获取云盾随机数
 *
 */
export async function getCloudRandomNumber() {
  let userInfo = await rpc("NMBMPSX6023", {}, {globalLoading: false});
  let params = {
    name: userInfo.body.ecifName,
    identityType: "0",
    identityNumber: userInfo.body.certNo
  };
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call("getCloudRandomNumber", params, (res) => {
      res && res.code && res.code != 0 ? reject(res) : resolve(res);
    });
  });
}

/**
 * @desc 客户端云盾身份认证
 * @param {Boolean} isTransfer 是否转账交易
 * @param {Object} serverSignatre 签名 (使用机构证书对获取到的服务 端随机数以用户的认证信息 OrgAuthinfo做的签名)
 */
export async function getCloudIdentitySign(isTransfer, serverSignatre = "") {
  
  if (isTransfer) {
    __commonWrap("getCloudIdentitySign", { serverSignatre });
    return;
  }
  let info = await getUserInfo();
  let userInfo = info.body;
  let { random } = await getCloudRandomNumber();
  let rpcParams = {
    randomNo: random, // 随机数
    certType: "0", // 证件类型
    // certNo: userInfo.CTFNO, // 证件号
    flag: "0" // 标识
  };
  return rpc("NMBMPSX7003", rpcParams, {globalLoading: false}).then((res) => {
    return new Promise((resolve, reject) => {
      AlipayJSBridge.call("getCloudIdentitySign", { serverSignatre: res.body.result }, (response) => {
          res && res.errorCode && res.errorCode != "0" ? reject({ ...response, res }) : resolve({ ...response, res });
        }
      );
    });
  });
}

/**
 * @desc 下载云盾证书
 */
export function downloadCloudCertificate() {
  __commonWrap("downloadCloudCertificate");
}

/**
 * @desc 业务签名
 * @param {String} businessMessage 待签名业务报文
 * @param {String} businessMessageOrgSignature 使用机构证书对业务报文的签名
 * @param {String} encryptedSignPassword 使用云证通安全控件加密的加密密码(Base64格式)
 * @param {String} encryptedClientRandom 使用云证通安全控件的加密客户端随机数(Base64格式)
 *
 */
export function signCloudKey(opt) {
 
  const promise = new Promise((resolve, reject) => {
    AlipayJSBridge.call("signCloudKey", opt, (res) => {
      res && res.errorCode && res.errorCode != 0 ? reject(res) : resolve(res);
    });
  });
  return promise;
}

/**
 * @desc 调起云证通键盘
 * @param {Boolean} isClean
 * @param {String} pinServerRandom 随机数
 * @param {String} passwordType 密码类型 newPsw 新密码 confirmPsw 确认密码
 * 调起键盘后原生会派发keyboardInputMsg事件，使用App.on去监听这个事件获取输入长度，输入状态以及秘钥，随机数签名
 */
export function showCloudKeyboard(
  isClean = true,
  pinServerRandom = "",
  passwordType = ""
) {
  __commonWrap("showCloudKeyboard", {
    isClean,
    pinServerRandom,
    passwordType
  });
}

export function hideCloudKeyboard(isClean) {
  __commonWrap("hideCloudKeyboard", { isClean });
}

/**
 * @description 获取银行卡列表
 * @param {String} type 是否要最新的卡列表 0 - 请求 1 - 不请求
 * @param {Boolean} isTrue 是否过滤非实体卡 true - 只返回实体卡列表  false - 返回所有卡列表
 * @param {Boolean} needSort 是否需要排序 true - 只返回实体卡列表  false - 返回所有卡列表
 */
export function getBankList(type = "1", isTrue = false, needSort = false) {
  const promise = new Promise((resolve, reject) => {
    AlipayJSBridge.call("getBankList", { type: type }, (res) => {
      // JSAPI报错处理
      if (res && res.errorCode && res.errorCode != "0") {
        if (res.errorCode == -1) {
          reject({ errorCode: "-1", errorMsg: "获取用户卡列表失败" });
          console.error({ errorCode: "-1", errorMsg: "获取用户卡列表失败" });
          return;
        }
        reject(res);
        return;
      }

      // 超时处理
      if (res && res.header && res.header.errorCode !== "0") {
        const { body, header } = res;
        let errorCode = header.errorCode;
        if (errorCode === "MP100009" || errorCode === "MP100010") {
          window.App.vm.$store.dispatch("commitUserInfo");
          cleanUserInfo();
          // 判断是否多次弹窗，如果弹了一次之后，isOvertimeConfirmed变为true， 不会再弹窗
          if (App.isOvertimeConfirmed) {
            reject({ header, body });
            return;
          }
          App.isOvertimeConfirmed = true;
          confirm(header.errorMsg, "", { okButton: "去登录" }).then(
            ({ ok }) => {
              // 用户点击之后再次变为false
              App.isOvertimeConfirmed = false;
              if (ok) {
                login({ state: "timeout" });
              }
            }
          );
          return;
        }
      }

      res.body.accountInfoList.forEach(item => {
        item.accNo_format = formatBank(item.accNo_mask);
        item.accNo_format2 = formatBank(item.accNo_mask, false);
      })

      // 卡片排序，根据accType从小到大排序
      if (needSort) {
        let cardList = res.body.accountInfoList;
        cardList.sort((a, b) => {
          return a.accType.substr(1, 3) - b.accType.substr(1, 3);
        });
        res.body.accountInfoList = cardList;
      }

      if (isTrue) {
        let acctList = res.body.accountInfoList;
        let trueList = [];
        acctList.forEach((item) => {
          if (item.accType !== "A016") {
            trueList.push(item);
          }
        });
        res.body.trueCardList = trueList;
        resolve({
          accountInfoList: trueList,
          accountProtectFlag: res.body.accountProtectFlag
        });
        return;
      }
      resolve(res);
    });
  });
  return promise;
}

// 日期选择器
// 入参
//    type 0 日期选择 1 时间选择
//    title 标题
//    minimumDate 最小选择日期
//    maximumDate 最大选择日期
//    currentDate 当前选中日期
//    dateFormat
//    times 时间选项数组
//    currentTime 当前选中时间

// 出参
//    currentDate 选中日期
//    currentTime 选中时间
//    actionType 0 返回 1 选择
export function showDatePicker({
  title,
  minimumDate,
  maximumDate,
  currentDate,
  dateFormat
}) {
  return __commonWrap("showDatePicker", {
    title,
    type: 0,
    minimumDate,
    maximumDate,
    currentDate,
    dateFormat
  });
}

// 时间选择器
export function showTimePicker({ title, times, currentTime }) {
  return __commonWrap("showDatePicker", {
    title,
    type: 1,
    times,
    currentTime
  });
}

/**
 * @desc 分享到
 * @param {*} param0
 */
export function shareTo({ type, contentType, content, title, desc }) {
  return __commonWrap("shareTo", {
    type,
    contentType,
    content,
    title,
    desc
  });
}
// 打开相册
export function getNativePhoto(maxImagesCount, type = '2') {
  return __commonWrap("getNativePhoto", {
    maxImagesCount,
    type
  });
}

/**
 * maxSize 最大输入长度
 * ps 加密模式 例如: A0/A1/E0/E1/AE0/AE1 默认AE0
 * curText 当前输入的文本（用于非加密键盘拼接字符串）
 * type 键盘类型
 */
export function showKeyboard({ type, maxSize, isClean, pgeNumY, sessionKey }) {
  return __commonWrap("showKeyboard", {
    maxSize,
    type,
    isClean,
    pgeNumY,
    sessionKey
  });
}

export function clearNKeyboard() {
  AlipayJSBridge.call("clearNKeyboard");
}

export function hideKeyboard(isClean) {
  return __commonWrap("hideKeyboard", { isClean });
}

/**
 * @desc 禁止侧滑返回
 * @param {String} isOpenPopGesture 0 - 禁止 其他都为可以
 */
export function stopPopGesture() {
  return __commonWrap("isPopGestureRecognizer", {
    isOpenPopGesture: "0"
  });
}

/**
 * @description 是否IPhoneX
 */
function isIPhoneX() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isIOS) {
    if (screen.height == 812 && screen.width == 375) {
      //是iphoneX
      return true;
    } else {
      //不是iphoneX
      return false;
    }
  }
}

/**
 * @description 埋点上报
 * @param {String} spmId 事件id
 * @param {String} props 自定义属性 单属性例子 “money=100” 多属性例子 “money=100^count=5”
 * @example remoteLog('go_tf_common_account', 'money=100^page=myAccount', {logLevel: 1})
 */
export function remoteLog(spmId, props, { type = 'behavior', logLevel = 1, actionId = 'event' } = {}) {
  let params = {
    type: type,
    spmId: spmId, // 事件id
    logLevel: logLevel, // 1 - high, 2 - medium, 3 - low
    actionId: actionId,
    param1: "",
    param2: "",
    param3: "",
    param4: props, // 自定义属性
  }
  return __commonWrap('remoteLog', params)
}

/**
 * 获取顶部状态栏高度
 * 只有安卓才有，iOS的iphoneX高度为44，普通为20
 */
export function getSafePadding() {
  let system =
    navigator.userAgent.indexOf("Android") !== -1 ? "Android" : "iOS";
  return new Promise((resolve, reject) => {
    if (system == "Android") {
      AlipayJSBridge.call("getSafePadding", (res) => {
        res && res.height
          ? resolve({ height: res.height, os: "Android" })
          : resolve("获取状态栏高度失败");
      });
      return;
    }
    if (isIPhoneX()) {
      resolve({ height: "44", os: "iOS" });
      return;
    }
    resolve({ height: "20", os: "iOS" });
  });
}

/**
 * 活体检测
 */
export function getLivess() {
  return __commonWrap("getLivess");
}

/**
 * @description 手势密码开关
 */
export function setGestureSwitch(opt) {
  return __commonWrap("setGestureSwitch", opt);
}

// 保存用户预留信息
export function setUserReserveInfo() {}

/**
 * @description 保存图片到相册
 * @param {String} picture 需要保存的图片（base64格式）
 */

export function savePicture(picture) {
  return __commonWrap("savePicture", { picture: picture });
}

/**
 * ====================================extend=========================================================================================================
 */

/**
* 兴e贷2.0 提醒客户端更新状态
* {type:string} avatar 头像、balance 余额、repayment 还款、credit 授信
*/
export function updateRootViewData(opt) {
  return __commonWrap('updateRootViewData', opt);
}

/**
 * 扫描银行卡
 * 扫描不成功不返回结果；成功则返回结果，数据格式如下：
 * {"isSuccessful" : "CardNumber:12312312312"}
 */
export function ocrCard() {
  return __commonWrap("ocrCard").then((res) => {
    if (res && res.isSuccessful !== "1") {
      let cardNumber = res.isSuccessful + "";
      res.cardNo = cardNumber.replace(/[^0-9]*([0-9]+)[^0-9]*/, "$1");
    }
    return res;
  });
}

/**
 * 扫描身份证
 * 扫描不成功不返回结果；成功则返回结果，数据格式如下：
{
    "isSuccessful" : '{
        "IDCardBackImage" : "xxxxx"
        "certNo" : "xxxxx"
        "validity" : "xxxxxx"
        "certName" : "xxxxxx"
        "IDCardFrontImage" : "xxxxxx"
    }'
}
    */

// true 正面 false 反面
export function ocrIDCard(singleFace) {
  let scanType = singleFace ? "0" : "1";
  return __commonWrap("ocrIDCard", {
    scanType
  });
}

export function setNavigationBar(param) {
  return __commonWrap("setNavigationBar", param);
}

export function showTitleBar() {
  return __commonWrap("showTitlebar");
}

export function hideTitleBar() {
  return __commonWrap("hideTitlebar");
}

/**
 * 关闭页面
 */
//closeType:
//0(关闭所有页面，只保留栈底的首页VC)
//1(关闭当前页面，从堆栈中移除栈顶VC)
//2(关闭其他页面，即只保留堆栈中的栈顶和栈底VC)
//3(从当前页面开始，关闭指定个数的页面)
//4(根据URL清除指定页面)

// 关闭所有webview
export function popAllWindow() {
  return __commonWrap("closeVC", { closeType: "0" });
}
// 关闭其他webview
export function popOtherWindow() {
  return __commonWrap("closeVC", { closeType: "2" });
}
// 关闭其他页面，即只保留堆栈中的栈顶和栈底VC
export function popSomeWindow(count) {
  return __commonWrap("closeVC", { closeType: "3", count });
}
// 关闭当前页面
export function popCurrentWindow() {
  return __commonWrap("closeVC", { closeType: "1" });
}

export function closeToPage(count, url) {
  return __commonWrap("closeToPage", {
    count,
    url
  });
}

/**
 * 获取设备与APP信息
 *  {
 *  "appVersionNo" : "xxxx",        //APP版本号
 *  "deviceVersionNo" : "xxxx",   //设备系统版本号
 *  "UUID" : "xxxx"     //设备uuid
 *  "phoneType": "xxx" // 手机类型
 *  }
 */

export function getDeviceAndAppInfo() {
  return __commonWrap("getDeviceAndAppInfo");
}

/**
 *  获取手机通讯录
 * @param {string} maxSeletedNum 联系人最大选择数，必传，最低传1
 */
export function showAddressList({ maxSeletedNum = 1, contactList } = {}) {
  return __commonWrap("showAddressList", {
    maxSeletedNum,
    contactList
  });
}

/**
 * @description 截屏
 * @param {*} param0
 */
export function screenShots({
  el,
  successMsg = "截图保存成功",
  errorMsg = "截图失败"
} = {}) {
  let range = "screen",
    originY,
    height;
  if (el) {
    range = "custom";
    originY = el.offsetTop;
    height = el.offsetHeight;
  }
  return __commonWrap("screenShots", {
    range,
    originY,
    height
  }).then((result) => {
    if (result.success === true) {
      successMsg && alert(successMsg);
    } else {
      errorMsg && alert(errorMsg);
    }
    return result;
  });
}

/**
 * @description 中文转大写拼音
 * @param {string} chineseString //待转换的中文字符串
 */
export function chinese2MandarinLatin(chineseString) {
  return __commonWrap("chinese2MandarinLatin", {
    chineseString
  });
}

/**
 * @description 选择器
 * @param {string} title 标题
 * @param {Array} items 选项列表
 * @param {String} selectedIndex 选中的索引
 * @param {String} minScrollCount 超过这个数量会变成滚动picker
 */
export function showSelectView(
  title,
  items,
  selectedIndex = "3",
  minScrollCount = "6"
) {
  return __commonWrap("showBottomUpSelectView", {
    title,
    items,
    selectedIndex,
    minScrollCount
  });
}

// 获取定位地址
export function getLocationInfo() {
  return __commonWrap("getLocationInfo");
}

// 复制到剪贴板
export function copyToClipboard(copyString) {
  return __commonWrap("copyToClipboard", { copyString });
}

export function connectKeyDevice({ lyKeyFlag, lyKeySeqNo, lykeyRuleType }) {
  return __commonWrap("connectKeyDevice", {
    lyKeyFlag,
    lyKeySeqNo,
    lykeyRuleType
  });
}

// 获取key盾设备信息
export function getDeviceInfo() {
  return __commonWrap("getDeviceInfo");
}

export function sign({ signMessage, keyPin, lykeyRuleType }) {
  return __commonWrap("sign", {
    signMessage,
    keyPin,
    lykeyRuleType
  });
}

/**
 * 获取sim卡信息
 */
export function getSimCardInfo() {
  return __commonWrap("getSimCardInfo");
}

export function canOpenURL({ scheme }) {
  return __commonWrap("canOpenURL", {
    scheme
  });
}

/**
 * 所在地省份城市联动选择
 * @param {*} param0
 */
export function showLocationSelect({ provinceName, cityName }) {
  return __commonWrap("showLocationSelect", {
    provinceName,
    cityName
  });
}

/**
 * 打开第三方H5页
 * @param {*} param0
 */
export function pushThirdWindow({
  loadURL,
  listenData,
  listenURL,
  isIntercept,
  compareType,
  titleParams,
  otherParams
}) {
  return __commonWrap("pushThirdWindow", {
    loadURL,
    listenData,
    listenURL,
    isIntercept,
    compareType,
    titleParams,
    otherParams
  });
}

// 打开遮罩
export function showMask(maskColor, maskColorAlpha, canInteraction) {
  return __commonWrap("showMask", {
    maskColor,
    maskColorAlpha,
    canInteraction
  });
}

// 关闭遮罩
export function hideMask() {
  return __commonWrap("hideMask");
}

/**
 * @description 获取虚拟卡号 Apple pay
 * @param {string} accountno
 */
export function getAccountDPan({ accountno }) {
  return openApplePay({
    action: "getAccountDPan",
    accountno
  });
}

/**
 * 是否支持 Apple pay
 */
export function isSupportApplePay() {
  return __commonWrap("isSupportApplePay");
}

/**
 * @description 添加native通知的监听
 * @param {string} evt 通知名称
 * @param {*} fn 回调
 */
export function addNotifyListener(evt, fn) {
  __commonWrap("addNotifyListener", { name: evt }, fn);
}

/**
 * @description 打开扫码登录页面
 * @param {*} param0
 */
export function openQRCodeScanner({ action }) {
  return __commonWrap("openQRCodeScanner", {
    action
  });
}

/**
 * @description 显示升级弹窗
 * @param {*} params
 */
export function updateVersionAlert(params) {
  return __commonWrap("updateVersionAlert", params);
}

export function openApplePay(params) {
  return __commonWrap("openApplePay", params);
}

/**
 * @description 监测截屏通知
 */
export function startScreenShotListen() {
  return __commonWrap("startScreenShotListen");
}

/**
 * @description 停止监测截屏通知
 */
export function stopScreenShotListen() {
  return __commonWrap("stopScreenShotListen");
}

/**
 * @description 是否开启定位
 */
export function locationServicesEnabled() {
  return __commonWrap("locationServicesEnabled");
}

/**
 * @description 打开App外的浏览器
 * @param {string} url  需要打开的URL
 */
export function openNativeWebBrowser({ url }) {
  return __commonWrap("openNativeWebBrowser", {
    url
  });
}

/**
 * @description 关闭页面
 * @param {array} urls 需要关闭的url数组
 * @param {} controls // 未知作用
 */
export function closePage(urls, controls) {
  return __commonWrap("closePage", {
    urls,
    controls
  });
}

/**
 * @description 跳转到指定的首页
 * @param {string} index 对应首页的下标
 */
export function popToHomePage(index) {
  return __commonWrap("popToHomePage", {
    index
  });
}

/**
 * @description 下载pdf，base64
 * @param {string} url
 */
export function downloadPdf(url) {
  return __commonWrap("downloadPdf", {
    url
  });
}

/**
 * @description 设置导航栏底部细线颜色
 * @param {int} color 色值，十进制
 */
export function setBarBottomLineColor(color) {
  return __commonWrap("setBarBottomLineColor", {
    color
  });
}

/**
 * @description 设置顶部状态栏字体颜色
 * @param {string} isHighLight 是否亮色 0 - 黑色 1 - 白色
 */
export function setStatusBar(isHighLight) {
  return __commonWrap("setStatusBar", {
    isHighLight
  });
}

export function showBackButton() {
  return __commonWrap("showBackButton");
}

export function hideBackButton() {
  return __commonWrap("hideBackButton");
}

export function setOptionMenu(menus, params = {}) {
  return __commonWrap("setOptionMenu", {
    menus,
    override: true,
    preventDefault: true,
    ...params
  });
}

/**
 * @description 显示客户端头部菜单
 */
export function showOptionMenu() {
  return __commonWrap("showOptionMenu");
}

/**
 * @description 隐藏客户端头部菜单
 */
export function hideOptionMenu() {
  return __commonWrap("hideOptionMenu");
}

/**
 * @description 显示客户端头部菜单
 */
export function getStatusBarHeight() {
  return __commonWrap("getStatusBarHeight");
}

/**
 * @description 打开其他app
 * @param {object} appInfo app的信息
 */
export function startOtherApp(appInfo) {
  return __commonWrap("startOtherApp", {
    appInfo
  });
}

/**
 * @description 设置客户端顶部栏左边按钮
 * @param {object} param0
 */
export function changeNavLeftBtn({ text, reset }) {
  return __commonWrap("changeNavLeftBtn", {
    text,
    reset
  });
}

/**
 * @description 给客户端发送通知
 * 前端可以通过此接口给客户端发送通知，
 * H5 会统一给传入的 name 标记加一个前缀 NEBULANOTIFY_，
 * 然后作为通知名称进行发送，如果您对这个通知感兴趣，
 * 监听的时候需要加前缀 NEBULANOTIFY_
 * @param {string} name 通知名称
 * @param {any} data 通知携带给客户端的内容
 */
export function postNotification(name, data) {
  return __commonWrap("postNotification", {
    name,
    data
  });
}

// 记账本模块特殊的遮罩输入的东西

/**
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
    @return
    inputContent   用户输入的内容
    ok  true 第一个按钮  false 第二个按钮
    dismissByClickBg: String ’1‘代表用户点击弹框外围关闭回收了弹框
*/
export function inputAlert(
  title = "",
  placeholder = "",
  {
    message = "",
    presetInputContent = "",
    okButton = "确定",
    cancelButton = "取消",
    wordsNumLimit = "",
    keyboardType = "0",
    canDismiss = false,
    inputLimitType
  }
) {
  return __commonWrap("ghbInputAlert", {
    title,
    placeholder,
    message,
    presetInputContent,
    okButton,
    cancelButton,
    wordsNumLimit,
    keyboardType,
    inputLimitType,
    clickBgToHide: canDismiss ? "1" : "0"
  });
}

/**
 * 设置标题头相关
 */
export function setTitle({ title, subtitle }) {
  return __commonWrap("setTitle", { title, subtitle });
}

export function setImageTitle({ image }) {
  return __commonWrap("setTitle", { image });
}

export function setTitleBarStyle(theme = "black") {
  return __commonWrap("setTitleBarStyle", { theme });
}

export function setTitleBar(
  {
    title = document.title,
    titleColor = "255,255,255,1",
    backgroundColor = "57,58,62,1",
    left1Img = "title_back",
    left1Text = "",
    right1Img = "",
    right2Img = "",
    right1Color = "255,255,255,1",
    right2Color = "255,255,255,1",
    right1Text,
    right1TextImg = "",
    right2Text,
    right2TextImg = "",
    leftCallback,
    rightCallback,
    right2Callback
  } = {},
  loadCache = false
) {
  let titleBarConfig = {};
  if (loadCache) {
    titleBarConfig = window.titleBarConfig;
  } else {
    titleBarConfig = {
      title,
      titleColor,
      backgroundColor,
      left1Img,
      left1Text,
      right1Img,
      right2Img,
      right1Text,
      right2Text,
      right1TextImg,
      right2TextImg,
      right1Color,
      right2Color,
      leftCallback,
      rightCallback,
      right2Callback
    };
    window.titleBarConfig = titleBarConfig;
  }
  document.title = titleBarConfig.title;

  let rgbaTo16Int = function(rgba, prefix = "#") {
    rgba = rgba.split(",");
    // 先转成16进制，再转成10进制
    let to16Int = (item) => {
      let num = parseInt(item).toString(16);
      return num.length < 2 ? "0" + num : num;
    };
    return prefix + to16Int(rgba[0]) + to16Int(rgba[1]) + to16Int(rgba[2]);
  };

  let rgbaToInt = function(rgba) {
    return parseInt(rgbaTo16Int(rgba, ""), 16);
  };

  setTitle({ title: titleBarConfig.title });
  // 背景颜色
  setTitleColor(rgbaToInt(titleBarConfig.backgroundColor));
  let theme = "black";

  if (titleBarConfig.titleColor.replace(/ /, "") === "255,255,255,1") {
    theme = "white";
    setStatusBar("1");
    setBarBottomLineColor(rgbaTo16Int(titleBarConfig.backgroundColor));
  } else {
    setStatusBar("0");
    setBarBottomLineColor("#eeeeee");
  }

  // 字体颜色
  setTitleBarStyle(theme);

  let menus = [];
  let hasLeft = 0;
  let os = navigator.userAgent.indexOf("iPhone") > -1 ? "ios" : "android";
  let icon = os === "ios" ? "icon" : "icontype";

  if (titleBarConfig.right1Text) {
    menus.push({
      leftImg: titleBarConfig.right1TextImg,
      title: titleBarConfig.right1Text,
      color: rgbaTo16Int(titleBarConfig.titleColor)
    });
  }

  if (titleBarConfig.right1Img) {
    menus.push({
      [icon]: titleBarConfig.right1Img
    });
  }

  if (titleBarConfig.right2Text) {
    menus.push({
      title: titleBarConfig.right2Text,
      color: rgbaTo16Int(titleBarConfig.titleColor)
    });
  }

  if (titleBarConfig.right2Img) {
    menus.push({
      [icon]: titleBarConfig.right2Img
    });
  }

  if (menus.length === 0) {
    hideOptionMenu();
  }

  if (titleBarConfig.left1Text) {
    if (os === "android") {
      hasLeft = 1;
      menus = [
        {
          title: titleBarConfig.left1Text,
          color: titleBarConfig.titleColor,
          postion: "left"
        },
        ...menus
      ];
      hideBackButton();
    } else {
      changeNavLeftBtn({ text: titleBarConfig.left1Text });
    }
  } else if (titleBarConfig.left1Img.length === 0) {
    hideBackButton();
  } else {
    if (os === "android") {
      // mpaas.showBackButton();
    } else {
      changeNavLeftBtn({ reset: "true" });
    }

    showBackButton();
  }

  if (menus.length > 0) {
    setOptionMenu(menus);
    showOptionMenu();

    document.removeEventListener("optionMenu", window.optionMenuCallback);
    window.optionMenuCallback = (e) => {
      switch (e.data.index) {
        case 0:
          if (hasLeft) {
            titleBarConfig.leftCallback
              ? titleBarConfig.leftCallback()
              : popWindow();
          } else {
            titleBarConfig.rightCallback && titleBarConfig.rightCallback();
          }
          break;
        case 0 + hasLeft:
          titleBarConfig.rightCallback && titleBarConfig.rightCallback();
          break;
        case 1 + hasLeft:
        case 2 + hasLeft:
          titleBarConfig.right2Callback && titleBarConfig.right2Callback();
          break;
      }
    };

    document.addEventListener("optionMenu", window.optionMenuCallback);
  }

  document.removeEventListener("back", window.backCallback);
  window.backCallback = (e) => {
    e.preventDefault();
    titleBarConfig.leftCallback ? titleBarConfig.leftCallback() : popWindow();
  };
  document.addEventListener("back", window.backCallback);
}

export function setTitleColor(color = 10) {
  return __commonWrap("setTitleColor", {
    color
  });
}
/**
 *  描述  isSupportHCEBank 手机是否支持云闪付功能，返回true或者false
 *  上送参数 无
 *  返回参数 isHceSuppor 返回true或者false
 *  zyf
 */
export function isSupportHCEBank() {
  return __commonWrap("hce_isHceSupport");
}

/**
 *  描述 hce_init 初始化注册HCE功能，返回code和msg
 *  上送参数 userId 3.0上送为用户的手机号码
 *  返回参数 code code为0则表示注册成功，否则则表示注册不成功，
 *          msg 对应的错误提示（msg）
 *  zyf
 */
export function hceInit(opt) {
  return __commonWrap("hce_init", opt)
}

/**
 *  描述 hce_getPaymentCards 获取所有云卡信息
 *  上送参数 无
 *  返回参数 paymentCards
 *  zyf
 */
export function hceGetPaymentCards() {
  return __commonWrap("hce_getPaymentCards");
}

/**
 *  描述 hce_getDefaultPaymentCard 获取默认云卡信息
 *  上送参数 无
 *  返回参数 defaultPaymentCard
 *  zyf
 */
export function hceGetDefaultPaymentCard() {
  return __commonWrap("hce_getDefaultPaymentCard");
}

/**
 *  描述 hce_setDefaultPaymentCard 设置默认云卡
 *  上送参数 index：对应的云卡列表下标，
 *  返回参数 result（返回true或者false）
 *          msg：设置失败时的提示信息
 *  zyf
 */
export function hceSetDefaultPaymentCard(opt) {
  return __commonWrap("hce_setDefaultPaymentCard", opt)
}

/**
 *  描述 hce_revokeCard 注销云卡 返回code和msg，
 *  上送参数 tokenPan（云卡标记）
 *  返回参数 code 为0则表示成功，否则则表示不成功，
 *          msg 对应的错误提示（msg）
 *  zyf
 */
export function hceRevokeCard(opt) {
  return __commonWrap("hce_revokeCard", opt)
}

/**
 *  描述 hce_applyCard 申请云卡  返回code和msg，
 *  上送参数 入参是String 字符串
 *          applyCard（入参字段名），内容格式如下
              "{
                "productCode": "1005785800010000",
                "pan": "6236272201000116086",
                "cardHolderName": "林捷明",
                "expiryDate": "1908",
                "verificationNumber": "582",
                "verificationPin": "",
                "cardHolderID": "440111199212170333",
                "cardHolderIDType": "1010",
                "mailBox": "",
                "phoneNo": "13660164963"
              }"
 *  返回参数 code 为0则表示成功，否则则表示不成功，
 *          msg 并返回对应的错误提示
 *  zyf
 */
export function hceApplyCard(opt) {
  return __commonWrap("hce_applyCard", opt)
}

/**
 *  描述 hce_applyActivationCode 云卡激活码申请
 *  上送参数 tokenPan（云卡标记）
 *  返回参数 code 为0则表示成功，否则则表示不成功，
 *          msg 对应的错误提示（msg）
 *  zyf
 */
export function hceApplyActivationCode(opt) {
  return __commonWrap("hce_applyActivationCode", opt)
}
/**
 *  描述 hce_activateCard 云卡激活
 *  上送参数 tokenPan（云卡标记）
 *          code（激活码）
 *  返回参数 code 为0则表示成功，否则则表示不成功，
 *          msg 对应的错误提示（msg）
 *  zyf
 */
export function hceActivateCard(opt) {
  return __commonWrap("hce_activateCard", opt)
}

/**
 *  描述 hce_checkIsDefaultApp 检测手机是否已设置本应用为默认HCE支付应用
 *  上送参数 无
 *  返回参数 result（返回true或者false）
 *          true为已经为默认； false为不是默认）
 *  zyf
 */
export function hceCheckIsDefaultApp() {
  return __commonWrap("hce_checkIsDefaultApp")
}

/**
 *  描述 hce_setDefaultApp 调起是否设置本应用程序为默认HCE支付应用的弹窗
 *  上送参数 无
 *  返回参数 result（返回true或者false）
 *          true为调起弹窗，false为没有调起弹窗
 *  zyf
 */
export function hceSetDefaultApp() {
  return __commonWrap("hce_setDefaultApp")
}

/**
 *  描述 hce_cleanStorageCache 清空云卡
 *  上送参数 无
 *  返回参数 result（返回true或者false）
 *  zyf
 */
export function hceCleanStorageCache() {
  return __commonWrap("hce_cleanStorageCache")
}

/**
 *  横屏
 */
export function screenToLandscape () {
  return __commonWrap("screenToLandscape");
}

/**
 *  竖屏
 */
export function screenToPortrait () {
  return __commonWrap("screenToPortrait");
}

/**
 *  获取设备状态信息
 */
export function getClientInfo () {
  return __commonWrap("getClientInfo");
}
