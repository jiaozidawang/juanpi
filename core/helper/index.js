import {parseParams} from '../bridge/helper'


/**
 * 检查是否为空对象
 * @param {Object} obj 要检查的对象
 * @returns {Boolean} 对象字符串
 */

export function __isEmptyObject(obj){
	for(let key in obj){
		return false
	}
	return true
}

export const parseParamsHandler = parseParams;