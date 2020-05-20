import * as bridge from '@core/bridge'
import axios from 'axios'
import Vconsole from 'vconsole'
new Vconsole()

Object.assign(window.App, bridge)

/**
 * mock环境配置信息
 */
const MockConfig = {
    bMock: false,
    mockPath: '/api'
}

let localFn = {

    rpc(opts, cb) {
        let mockName = opts.operationType.split('.').pop()
        let method = MockConfig.bMock ? 'GET' : 'POST'
        let url = `${MockConfig.mockPath}/${mockName}` + (MockConfig.bMock ? '.json' : '.do')

        axios({
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: method,
            data: (opts.requestData[0] || {})._requestBody || '',
            url: url
        }).then(res => {
            cb({resData:res.data})
        })
    },
    getUserInfo(cb){
        cb({ errorCode: 0 })
    },
    noop (cb) {}
}

if(window.App && !window.App.device.specialSign) {
    window.AlipayJSBridge = {
        call (fnName, options = {}, callback){
            let handler = localFn[fnName] || localFn['noop']
            let args = [callback]
            if(fnName == 'rpc') args.unshift(options)
            return handler.apply(localFn, args)
        },
        startupParams: {
            passData: '{}'
        }
    }
}else if(false && window.AlipayJSBridge){

    let _call = window.AlipayJSBridge.call || function(){}
    window.AlipayJSBridge.call = function(fnName, options = {}, callback){
        if(fnName == 'rpc') {
            let handler = localFn[fnName] || localFn['noop']
            options._isApp = true
            return handler.apply(localFn, [options, callback])
        }else{
            _call.call(window.AlipayJSBridge, fnName, options, callback)
        }
    }
}
