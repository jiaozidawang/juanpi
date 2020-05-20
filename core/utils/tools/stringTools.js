// import MD5 from "crypto-js/md5";

export default {
  /**
   * 去掉空格
   * @param {any} str 需要格式化的字符串
   * @param {boolean} [isGlobal=true] 是否全部格式化，默认是
   * @returns 字符串
   */
  trim(str, isGlobal = true) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (isGlobal) {
      result = result.replace(/\s/g, "");
    }
    return result;
  },

  /**
   * html反转义
   * @param {any} htmlText 转义后的html文本
   * @returns html
   */
  toHtml(htmlText) {
    try {
      htmlText = htmlText.replace(/&lt;/g, "<");
      htmlText = htmlText.replace(/&gt;/g, ">");
      htmlText = htmlText.replace(/&amp;/g, "&");
      htmlText = htmlText.replace(/&quot;/g, '\"');
      htmlText = htmlText.replace(/&#39;/g, "'");
    } catch (error) {
    }
    return htmlText;
  },

  /**
   * 获取密码密文
   * @param {any} text 明文
   * @returns 密文
   */
  // getPasswdString(text) {
  //   return MD5(text + 'openapi').toString();
  // }
};
