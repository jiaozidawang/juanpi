/*
 * @Author: liuyunxiao
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-03 08:50:05
 * @Description:
 */


import { __isEmptyObject } from '../../helper'

/**
 * 通用JSAPI包装
 * @param {String} api jsapi名称
 * @param {Object || Function} options 配置选项或者回调函数
 */
export function __commonWrap(api, options = {}){

    return new Promise((resolve, reject) => {
        AlipayJSBridge.call(api, options, res => {
          if (typeof res == 'Object' && __isEmptyObject(res)){
            console.error('获取'+ api + '数据失败, 调用jsapi返回为空对象');
          }
            (res && res.errorCode && res.errorCode != 0) ? reject(res) : resolve(res)
        })
    })
}

/**
 * 监听jsbridge ready事件
 * @param {Function} callback 回调函数
 */
export function ready (callback) {
    if (window.AlipayJSBridge) {
        callback && callback()
    } else {
        document.addEventListener('AlipayJSBridgeReady', callback, false)
    }
}

/**
 * 生成pushWindow所需要的参数
 * @param {number} appId 目标页的appId
 * @param {Object} param 对客户端的设置
 * @param {Object} passData 需传递的页面参数
 */
export function pushWindowParam(appId, param, pageConfig){
    const { os } = App.device  // true => ios  false => android
    const dev = ENVCONF.NODE_ENV === 'development'

    // 基础页面配置
    const defaultParam = {
      showOptionMenu: false,
      showTitleBar: true,
      titleColor: 0
    };

    const method = dev ? 'pushWindow' :
        appId ? 'startH5App' : 'pushWindow'

    let startparams = Object.assign(defaultParam, pageConfig.pushParam, param)

    return {
        method,
        obj: Object.assign(
            (dev || !appId) ? {} : { appId: String(appId) },
            //合并 默认配置 conf配置 传参配置
            method == 'startH5App' ? startparams : {param: startparams}
        )
    }
}

/**
 * 构建参数字符串
 * @param {Object} data 数据对象
 * @returns {String} 对象字符串
 */
export function buildParams (data) {
    let paramsArr = []
    data = data || {}
    for(let key in data){
        paramsArr.push(encodeURIComponent(key || '')
            + '=' + encodeURIComponent(data[key] || ''))
    }
    return paramsArr.join('&')
}

/**
 * 解构查询字符串参数
 * @param {String} querystring 查询字符串
 * @returns {Object} 数据对象
 */
export function parseParams (querystring) {
    let searchArr = (querystring || '').split('&') || []
    let params = {}

    searchArr.forEach(keyvalue => {
        let keyPair = keyvalue.split('=') || []
        if(keyPair[0]){
            params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
        }
    });

    return params
}

/**
 * 全局唯一标示生成
 */
export function uuid() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    var len = 8, radix = 16;
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    return uuid.join('');
}

/**
   * 脱敏银行账号
   * 自动判断有没有*号，若有*号 返回 6666 **** **** 6666 若无，返回 6666 6666 6666 666
   * 用法 a|formatBank
   * @param {*} bankcard
   * @param {Boolean} space
   */
export function formatBank(bankcard, addSpace = true) {
  if (typeof bankcard !== "string") {
    return "";
  }
  // 当卡号不脱敏时
  if (bankcard.indexOf('*') == '-1') {
    let account = bankcard.replace(/\s/g, "");
    let finBankCard = addSpace ? account.replace(/(\d{4})(?=\d)/g, "$1 ") : account.replace(/(\d{4})(?=\d)/g, "$1");
    return finBankCard;
  }

  if (bankcard.length < 8) {
    return bankcard;
  }
  let reg = /^(\d{4})[\s\S]+(\w{4})$/;
  let value;

  if (!addSpace) {
    value = bankcard.toString().replace(reg, "$1********$2");
  } else {
    value = bankcard.toString().replace(reg, "$1 **** **** $2");
  }
  return value;
}
