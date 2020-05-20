import typeTools from './typeTools';

export default {
  /**
   * 对象拷贝
   * @param {any} source 源对象
   * @returns 对象
   */
  copy(source) {
    let result = {};
    for (let key in source) {
      // 时间对象, null 不做深拷贝
      if (typeTools.isDate(source[key]) || typeTools.isNull(source[key])) {
        result[key] = source[key];
      } else {
        result[key] = typeof source[key] === 'object' ? this.copy(source[key]) : source[key];
      }
    }
    return result;
  },
  /**
   * 简单对象合并
   * @param {any} source 源对象
   * @param {any} target 目标对象
   * @param {any} isCover 是否覆盖
   * @returns 对象
   */
  merge(source, target, isCover = false) {
    for (let item in source) {
      if (isCover || !target.hasOwnProperty(item)) {
        target[item] = source[item];
      }
    }
    return target;
  },
  /**
   * 检查是否为空对象
   * @param {Object} obj 要检查的对象
   * @returns {Boolean} 对象字符串
   */

  isEmptyObject (obj) {
    for (let key in obj) {
      return false
    }
    return true
  }

};
