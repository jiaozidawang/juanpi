/*
 * @Author:
 * @Date: 2019-09-05 09:17:36
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-09-06 18:20:00
 * @Description: jsapi
 */
/**
 * @author liuyunxiao
 * @date 2019-03-09
 */

import { setTimeout, clearTimeout } from "timers";
import { getSafePadding } from '@bridge';

// const NICKNAME_REG = /^(a-zA-Z)+[a-zA-Z0-9_]{8,16}/;

export default {
  /**
   * 数字金额格式化，常用场景在过滤器中
   * @param {String|Number} 金额数字，字符串或者数字类型
   *
   * @param {String}        货币符号，默认¥
   * @param {Number}        小数点后精确的位数，默认2
   * @return {String}       加上了,逗号分隔符和小数点.后的字符串
   */
  currencyFormat(value = "", currencySign = "¥", decimals = 2) {
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return "";
    const stringified = Math.abs(value).toFixed(decimals);
    const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    const i = _int.length % 3;
    const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
    const _float = decimals ? stringified.slice(-1 - decimals) : '';
    const sign = value < 0 ? "-" : "";
    const digitsRE = /(\d{3})(?=\d)/g;
    return (
      sign +
      currencySign +
      head +
      _int.slice(i).replace(digitsRE, "$1,") +
      _float
    );
  },
  // 分割手机号码344
  phoneSeparated(phoneNumber) {
    let tel = phoneNumber;
    if (tel) {
      tel =
        tel.substring(0, 3) +
        " " +
        tel.substring(3, 7) +
        " " +
        tel.substring(7, 11);
    }
    return tel;
  },
  // 分割卡号
  bankCardSeparated(accountNo) {
    let account = accountNo.replace(/\s/g, "");
    // let bankCard = account.replace(/(^\d{4}|\d{4}\B)/g, "$1 ");
    let bankCard = account.replace(/(\d{4})(?=\d)/g, "$1 ");
    return bankCard;
  },
  /**
   * 把Number四舍五入为指定小数位数的数字字符串（解决原toFixed四舍五入问题）
   * @param {number} [len=0] 保留小数位数
   * @param {boolean} [round=true] 是否四舍五入（默认进行四舍五入）
   * @param {boolean} [padding=true] 有效数字不足预设小数位数时是否后补0（默认后补）如：_toFixed(1.1,3,true,true) = "1.100"  ;   _toFixed(1.1,3,true,false) = "1.1"
   * @returns {string}
   * @example _toFixed(1.335,2);
   */
  _toFixed(num, len = 2, round = true, padding = true) {
    num = Number(num);
    if (len < 0) {
      throw new RangeError("digits argument must be between 0 and 100");
    }
    let numStr = String(num), //数字转字符串
      pointIndex = numStr.indexOf("."), //小数点下标
      preNumIndex = pointIndex + len + 1; //保留位后一位数字下标
    if (numStr.includes("e") || pointIndex === -1) {
      //遇到科学表示法或整数，直接返回原生toFixed处理结果
      return num.toFixed(len);
    }
    let addZeroCount = len - (numStr.length - pointIndex - 1); //需补0的个数
    if (addZeroCount > 0) {
      numStr += "0".repeat(addZeroCount); //小数位不足后补0
    }
    let numCut = Math.abs(numStr.substring(0, preNumIndex)); //截取保留位（含）前的所有字符
    let res =
      (num < 0 ? "-" : "") +
      (round && numStr[preNumIndex] >= 5
        ? numCut + 1 / Math.pow(10, len)
        : numCut
      ).toFixed(len); //判断预期小数位后一位是否大于等于5，是则进位
    return padding ? res : String(Number(res));
  },
  /**
   * 理财利率专属过滤器
   * @param {number} [len=4] 保留小数位数
   */
  _toFixed1(num, len = 4) {
    if (len < 0) {
      throw new RangeError("digits argument must be between 0 and 100");
    }
    let numStr = String(num), //数字转字符串
      pointIndex = numStr.indexOf("."), //小数点下标
      preNumIndex = pointIndex + len + 1; //保留位后一位数字下标
    if (numStr.includes("e") || pointIndex === -1) {
      //遇到科学表示法或整数，直接返回原生toFixed处理结果
      return num.toFixed(len);
    }
    return numStr.substring(0, preNumIndex);
  },
  /**
   * 脱敏银行账号
   * 自动判断有没有*号，若有*号 返回 6666 **** **** 6666 若无，返回 6666 6666 6666 666
   * 用法 a|formatBank
   * @param {*} bankcard
   * @param {Boolean} space
   */
  formatBank(bankcard, addSpace = true) {
    if (typeof bankcard !== "string") {
      return "";
    }
    // 当卡号不脱敏时
    if (bankcard.indexOf('*') == '-1') {
      // return this.bankCardSeparated(bankcard);
      let account = bankcard.replace(/\s/g, "");
      // let bankCard = account.replace(/(^\d{4}|\d{4}\B)/g, "$1 ");
      let finBankCard = account.replace(/(\d{4})(?=\d)/g, "$1 ");
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
  },
  /**
   * 脱敏身份证号，前四后三，中间有多少位就有多少个*
   */
  formatIdNumber(idNum) {
    if (typeof idNum !== "string") {
      return "";
    }

    if (idNum.length < 7) {
      return idNum;
    }

    let star = "*".repeat(idNum.length - 7);
    let value = idNum.slice(0, 4) + star + idNum.slice(idNum.length - 3);
    return value;
  },
  /**
   * @desc 脱敏手机号码 前四后三 中间四个*
   * @param {string} phone
   * @returns {string}
   * @example this.$tools.formatPhone('13760061408') -- '137****1408'
   */
  formatPhone(phone) {
    if (typeof phone !== "string") {
      return "";
    }
    if (phone.length < 7) {
      return phone;
    }
    let reg = /^(\d{3})[\s\S]+(\d{4})$/;
    let value = phone.toString().replace(reg, "$1 **** $2");
    return value;
  },
  /**
   * 脱敏姓名，默认脱敏姓名的最后一位
   * @params val [string] 姓名
   * @params num [int] 脱敏的位数
   * @params type [string] 开头或结尾开始脱敏和中间脱敏
   */
  formatName(val, num, type) {
    if (!num) {
      //没有指定则脱敏1位
      num = 1;
    }
    //如果要隐藏的位数大于字符串本身，则取字符串-1
    if (val.length <= num) {
      num = val.length - 1;
    }
    //若是中间脱敏则隐藏字符串中间所有的字符只保留头尾
    if (type === "center") {
      num = val.length - 2;
    }
    let valStr = "";
    //脱敏多少位,显示多少个*号
    for (let i = 0; i < num; i++) {
      valStr += "*";
    }
    //默认从结尾开始脱敏
    if (!type) {
      type = "right";
    }
    //根据脱敏类型进行脱敏
    if (type === "right") {
      val = val.substring(0, val.length - num);
      val += valStr;
    } else if (type === "left") {
      val = val.substring(num, val.length);
      val = valStr + val;
    } else if (type === "center") {
      let start = val.substring(0, 1);
      let end = val.substring(val.length - 1, val.length);
      val = start + valStr + end;
    }
    return val;
  },
  /**
   * 获取当前页面的[包名,模块名,页面名]
   * @return {Array} [包名,模块名,页面名]
   */
  getPath() {
    let arr = location.pathname.split(/\/+/).slice(-3);
    arr[2] = arr[2].substr(0, arr[2].length - 5);
    return arr;
  },
  // 处理头部的文字字符控制,大于amount位自动省略，默认14位
  ellipsis(value, amount = 14) {
    if (value) {
      if (value.length > amount) {
        value = value.substr(0, amount) + "...";
      }
    }
    return value;
  },

  /**
   * @desc 金额转换成大写
   * @param {Number} n 需要转换成大写的金额
   * @return {String} 转换后的大写中文金额
   * @example changeAmt('123') =>'壹百贰拾叁元整'
   */
  changeAmt(money) {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money === '') { //不能用==
      return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  },
  changeAmt1(n) {
    let fraction = ["角", "分"];
    let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    let unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];

    n = Math.abs(n);

    let s = "";

    for (let i = 0; i < fraction.length; i++) {
      s += (
        digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
      ).replace(/零./, "");
    }

    s = s || "整";

    n = Math.floor(n);

    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = "";
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整");
  },

  /**
   * @desc 十六进制转十进制
   * @param {String} 需要被转换的十六进制字符串
   * @return {String} 转换后的十进制字符串
   * @example toTen('b6423c') => '11944508'
   */
  toTen(num) {
    let str = "0x" + num;
    return new Number(str).toString(10);
  },
  /**
   * @desc 日期转汉字方法
   * @param {String} 需要被转换日期
   */
  CNDateString(date) {
    var today = date;
    var chinese = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var y = today.getFullYear().toString();
    var m = (today.getMonth() + 1).toString();
    var d = today.getDate().toString();
    var result = "";
    for (var i = 0; i < y.length; i++) {
      result += chinese[y.charAt(i)];
    }
    result += "年";
    if (m.length == 2) {
      if (m.charAt(0) == "1") {
        result += "十";
        if (m.charAt(1) != "0") {
          result += chinese[m.charAt(1)];
        }
        result += "月";
      }
    } else {
      result += chinese[m.charAt(0)] + "月";
    }
    if (d.length == 2) {
      result += chinese[d.charAt(0)] + "十";
      if (d.charAt(1) != "0") {
        result += chinese[d.charAt(1)];
      }
      result += "日";
    } else {
      result += chinese[d.charAt(0)] + "日";
    }
    return result.replace("月一十", "月十");
  },
  /**
   * @desc 是否是iphoneX
   */
  isIPhoneX() {
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
  },
  getAccountType(type) {
    if (type == "A016") {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 位数不足，左边自动补位 如padLeft(6, 3, '0'); 输出'006'， padLeft(600, 2, '0'); 输出'600'
   * @param val 需要补位的值
   * @param len 需要的长度
   * @param charStr 需要补位的字符
   * @returns {string}
   */
  padLeft(val, len, charStr = "0") {
    let s = val + "";
    if (s.length >= len) {
      return s;
    } else {
      return new Array(len - s.length + 1).join(charStr, "") + s;
    }
  },
  /**
   * @desc 定期产品-利率小数位数最多保留4位，接口返回的利率超过4位小数时，截取前4位显示；接口返回利率不足4位小数时候，通过补0方式凑足4位小数
   */
  // _toFixed2(str) {
  _toFixed2(str, len = 4, round = false, padding = true) {
    if (str == "" || str == null) {
      return "";
    } else {
      let rate = str * 1;
      if (isNaN(rate)) {
        return str;
      } else {
        //利率小数位数规则统一BEGIN
        let num = str;
        num = Number(num);
        let numStr = String(num); //数字转字符串
        let pointIndex = numStr.indexOf("."); //小数点下标
        let preNumIndex = pointIndex + len + 1; //保留位后一位数字下标
        if (numStr.includes("e") || pointIndex === -1) {
          //遇到科学表示法或整数，直接返回原生toFixed处理结果
          return num.toFixed(len);
        }
        let addZeroCount = len - (numStr.length - pointIndex - 1); //需补0的个数
        if (addZeroCount > 0) {
          numStr += "0".repeat(addZeroCount); //小数位不足后补0
        }
        let numCut = Math.abs(numStr.substring(0, preNumIndex)); //截取保留位（含）前的所有字符
        let res =
          (num < 0 ? "-" : "") +
          (round && numStr[preNumIndex] >= 5
            ? numCut + 1 / Math.pow(10, len)
            : numCut
          ).toFixed(len); //判断预期小数位后一位是否大于等于5，是则进位
        return padding ? res : String(Number(res));
        //利率小数位数规则统一END
      }
    }
  }
};
