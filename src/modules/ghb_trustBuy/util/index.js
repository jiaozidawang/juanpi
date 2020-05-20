// 金额转换成数字金额加中文单位
function money2chineseUnit (num) {
  let moneyUnits = ["元", "万元", "亿元", "万亿"];
  let dividend = 10000;
  let currentNum = num;
  //转换数字
  let currentUnit = moneyUnits[0];
  //转换单位
  for (let i = 0; i < 4; i++) {
    currentUnit = moneyUnits[i];
    if (strNumSize(currentNum) < 5) {
      break;
    }
    currentNum = currentNum / dividend;
  }
  let m = {
    num: 0,
    unit: ""
  };
  m.num = currentNum.toFixed(2);
  m.unit = currentUnit;
  return m;
}
// 获取整数位
function strNumSize (tempNum) {
  let stringNum = tempNum.toString();
  let index = stringNum.indexOf(".");
  let newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

// 8位字符串日期转为 yyyy-mm-dd
function date82kebabCase (date, character = '-') {
  if (date.length !== 8 || typeof date !== 'string') {
    return false;
  } else {
    return `${date.slice(0, 4)}${character}${date.slice(4, 6)}${character}${date.slice(6, 8)}`;
  }
}

// 8位字符串日期转为 yyyy.mm.dd
// 今年则转为 mm.dd
function dateFormatHideCurrentYear (date, character = '.') {
  if (date.length !== 8 || typeof date !== 'string') {
    return '--.--';
  } else {
    let year = date.slice(0, 4);
    let moon = date.slice(4, 6);
    let day = date.slice(6, 8);
    let today = new Date();
    if (year === today.getFullYear().toString()) {
      return `${moon}${character}${day}`;
    } else {
      return `${year}${character}${moon}${character}${day}`;
    }
  }
}

// 计算两个日期差多少天
// 入参 8位 String 类型日期 yyyymmdd
function get8StringDateDiff (start, end) {
  let startDate = date82kebabCase(start, '/') && Date.parse(date82kebabCase(start, '/') + ' 00:00:00');
  let endDate = date82kebabCase(end, '/') && Date.parse(date82kebabCase(end, '/') + ' 00:00:00');
  if (startDate && endDate) {
    let days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    return `${days}`;
  } else {
    return false;
  }
}

function formatNumber (num, precision, separator) {
  let parts;
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    num = Number(num);
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
    parts = num.split('.');
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
    return parts.join('.');
  }
  return NaN;
}

function desensitizeBankCard (src) {
  return src.replace(/^(\d{4}).*(\d{4})$/g, '$1 **** *** $2');
}

function riskCode2userType (code) {
  if (code && typeof code === 'number' && [0, 1, 2, 3, 4, 5].includes(code)) {
    return [
      '未风评',
      '保守型',
      '谨慎型',
      '稳健型',
      '进取型',
      '激进型'
    ][code];
  } else {
    return '未风评';
  }
}

/**
 * 计算产品销售情况
 * @param {string} start 募集开始日期 yyyymmdd
 * @param {string} openTime 开市时间 hhss
 * @param {string} end 募集结束日期 yyyymmdd
 * @param {string} endTime 闭市时间 hhss
 * @param {string} prdStatus 产品状态
 * @param {string} indvFstLowtInvtAmt 起购金额
 * @param {string} totalUsabLmt 总剩余可用金额
 * @param {string} prdRemaCanPurchCnt 剩余购买名额
 * @parma {string} lmtCtrlFlg 是否额度控制标识
 */
function computedFundStatus (
  start, openTime,
  end, endTime,
  prdStatus, indvFstLowtInvtAmt, totalUsabLmt, prdRemaCanPurchCnt, lmtCtrlFlg
) {
  let raiseStartTime = Date.parse(date82kebabCase(start, '/') + ` ${timeParser(openTime)}`);
  let raiseEndTime = Date.parse(date82kebabCase(end, '/') + ` ${timeParser(endTime)}`);
  let current = new Date().getTime();
  console.log('raiseStartTime', raiseStartTime);
  console.log('raiseEndTime', raiseEndTime);
  console.log('current', current);
  if (prdStatus === '1' && current < raiseStartTime) {
    return 'presell';
  } else if (
    prdStatus === '1' && // 产品状态为在售
    current >= raiseStartTime &&
    current < raiseEndTime
  ) {
      // 有额度控制
    if (lmtCtrlFlg !== '' && lmtCtrlFlg !== '0') {
      // 剩余购买额度大于等于个人最低购买金额 && 剩余购买名额大于0
      if(
        (totalUsabLmt === '' && (+prdRemaCanPurchCnt > 0 || prdRemaCanPurchCnt === '')) ||
        (+totalUsabLmt >= +indvFstLowtInvtAmt && (+prdRemaCanPurchCnt > 0 || prdRemaCanPurchCnt === ''))
      ) {
        return 'selling';
      }
      return 'sellout';
    }
    return 'selling';
  } else {
    return 'sellout';
  }
}

/**
 * 返回时:分:秒
 * @param {string} time 时间 HHMMSS
 */
function timeParser (time) {
  let timeStr = time;
  if ([6, 5].includes(time.length)) {
    if (time.length === 5) {
      timeStr = '0'.concat(time);
    }
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2, 4) + ':' + timeStr.slice(4, 6);
  } else {
    return '-';
  }
}

/**
 * 返回时:分
 * @param {string} time 时间 HHMMSS
 */
function timeExcludeSecond (time) {
  let timeStr = time;
  if ([6, 5].includes(time.length)) {
    if (time.length === 5) {
      timeStr = '0'.concat(time);
    }
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2, 4);
  } else {
    return '-';
  }
}

/**
 * 比较APP版本
 * @param {*} a
 * @param {*} b
 * Return 1 if a > b
 * Return -1 if a < b
 * Return 0 if a == b
 */
function compareVersion(a, b) {
  if (a === b) {
    return 0;
  }

  var aComponents = a.split(".");
  var bComponents = b.split(".");

  var len = Math.min(aComponents.length, bComponents.length);

  // loop while the components are equal
  for (var i = 0; i < len; i++) {
    // A bigger than B
    if (parseInt(aComponents[i]) > parseInt(bComponents[i])) {
      return 1;
    }
    // B bigger than A
    if (parseInt(aComponents[i]) < parseInt(bComponents[i])) {
      return -1;
    }
  }

  // If one's a prefix of the other, the longer one is greater.
  if (aComponents.length > bComponents.length) {
    return 1;
  }

  if (aComponents.length < bComponents.length) {
    return -1;
  }
  // Otherwise they are the same.
  return 0;
}

export default {
  money2chineseUnit, // 金额转换成金额加中文单位
  date82kebabCase, // 8位字符串日期转换为yyyy-mm-dd
  dateFormatHideCurrentYear, // 8位字符串日期转为 yyyy.mm.dd, 今年则为 mm.dd
  get8StringDateDiff, // 获得8位字符串日期的差值天数
  formatNumber, // 金额千分位
  desensitizeBankCard, // 卡号脱敏
  riskCode2userType, // 通过风险等级 Number 获取用户风险类型
  computedFundStatus, // 计算产品销售情况
  timeParser, // 返回时:分:秒
  timeExcludeSecond, // 返回时:分
  compareVersion // 比较APP版本
};
