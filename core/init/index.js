/*
 * @Author: liuyunxiao
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-19 17:11:18
 * @Description: rpc
 */
import {initEvent, events} from './event'
import errorDictionary from './errorDictionary/index.js';
import { ready } from '../bridge/helper'
import {showLoading, hideLoading, getGlobalTheme} from '@bridge';
import style from './style';

window.App = {

  ...events,

  // 页面传递参数
  params: null,

  // 初始化样式JS变量
  style,

  // 全局页面信息
  pageInfo: PAGEINFO,

  // 用户客户端信息
  userAgent: navigator.userAgent,

  // 手机系统
	device: {
    specialSign: navigator.userAgent.indexOf("ghbMobileBank") != -1,
		os: navigator.userAgent.indexOf('iPhone') > -1 ? 'ios' : 'android'
  },
  /**
   * @dese - rpc的loading图显示、隐藏的计数器逻辑，即单例模式
   * @example App.device => {isShown: false, count: 0, timer: null, plusOne() {}, minusOne () {}}
   */
  loadingCounter: {
    isShown: false,
    count: 0,
    timer: null,
    plusOne (showLoadingCallback) {
      if(!this.isShown) {
        showLoading();
        this.isShown = true;
      }
      clearTimeout(this.timer);
      this.count ++;
      // console.log(`loading + 1 >>> loading数量:${this.count}`);
    },
    minusOne(hideLoadingCallback) {
      this.count --;
      // console.log(`loading - 1 <<< loading数量:${this.count}`);
      if(this.count <= 0) {
        this.timer = setTimeout(() => {
          this.isShown = false;
          hideLoading();
        }, 200);
      }
    }
  },
  /**
   * @desc - rpc的超时提示confirm 去登录、回首页，防止多次提示，即单例模式
   * @example App.isOvertimeConfirmed == true 表示已提示
   */
  isOvertimeConfirmed: false,

  error: errorDictionary,
  // 控制所有的弹框是否需要显示错误码
  isNeedErrorCode: true,

  theme: 'default'
}


export function init(vm){
  window.document.body.classList.add('system_' + App.device.os)
	const initState = () => {
		vm.$store.dispatch('initStore').then(() => {
			vm.$mount('#app')
			initEvent(vm)
			App.off('AlipayJSBridgeReady', initState)
		})
	}
	console.info(window.location.href)
	App.device.specialSign ? ready(initState) : initState()

	//调试入口埋点
	initDebug()
}

function initDebug () {
	//调试入口埋点
	let scriptExp = /\s*debug\s*/
	let ua = navigator.userAgent

	//注入脚本
	if(ua.match(scriptExp)){
		addScript(GLOBALPACKAGEURL + '/vconsole.dll.js')
	}
}

function addLink (href) {
	var link = document.createElement("link")
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = href
	document.getElementsByTagName("head")[0].appendChild(link)
}

function addScript (src) {
	var script = document.createElement("script")
	script.type = 'text/javascript'
	script.src = src
	document.getElementsByTagName("head")[0].appendChild(script)
}

Object.defineProperty(App, '__vm__', {
	enumerable: false,
	configurable: true,
	set(VmInstance){
		this.vm = VmInstance
		init(VmInstance)
	}
})
