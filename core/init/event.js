import {addNotifyListener, hideLoading} from '../bridge'

export const events = {
	on (event, fn, useCapture = false) {
		window.document.addEventListener(event, fn, useCapture)
	},

	off (event, fn, useCapture = false) {
		window.document.removeEventListener(event, fn, useCapture)
	},

	trigger(eventName, data = {}){
		let event = document.createEvent('Events')
		event.initEvent(eventName, false, true)
		event.data = data
		document.dispatchEvent(event)
		return event;
	},

	listen (eventName, fn) {
    return addNotifyListener(eventName, fn);
  }
}


export function initEvent(vm){
	const emitHook = function(vm, eventName, data = {}) {
		const _emit = _vm => {
			const child = _vm.$children
			const handlers = _vm.$options[eventName]
			if(handlers){
				if(handlers.apply){
					handlers.call(_vm, ...[...arguments].slice(2))
				}else{
					for(let i = 0, j = handlers.length; i < j; i++){
						handlers[i].call(_vm, ...[...arguments].slice(2))
					}
				}
			}
			if(_vm._hasHookEvent){ _vm.$emit('hook:' + hook) }
			if(child.length){
				for(let i = 0, j = child.length; i < j; i++){
					_emit(child[i])
				}
			}
		}
		_emit(vm)
	}
	//重新回到页面时
	events.on('resume', event => {
		emitHook(vm, 'resume', event.data || {})
	})
	//当APP被压到后台时，或者被遮盖时触发
	events.on('pause', event => {
		emitHook(vm, 'pause')
	})
	//当APP被压到后台时，或者被遮盖时触发
	events.on('H5_leave', event => {
		emitHook(vm, 'deactivated')
	})

	//关闭webview时mpaas触发
	events.on('trackPageLintener', (event) => {
		let status = event.data.status;
		let action = event.data.action;

		if ((status == 'disappear' && action == 'client') ||
			(status == 'page.destroy' && action == 'h5')) {
			emitHook(vm, 'leave')
		}
	})

	AlipayJSBridge.call('addNotifyListener', {
		name: 'NEBULANOTIFY_loginSuccess'
	}, res => {
		vm.$store.dispatch('commitUserInfo')
	})
}
