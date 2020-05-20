const TYPE = {
  LENGTH_ILLEGAL: 10100,
  // 整体是重复时满足为此type   121212 或者 111111
  REPEAT: 10200,
  // 字母连续有规律。
  SEQUENCE: 10300,
  // 全是数字
  ALL_DIGHTER: 10400,
  // 全是特殊符号
  ALL_SPECITALSYMBOL: 10500,
  // 全是大写字母
  ALL_UPPER_LETTER: 10600,
  // 全是小写字母
  ALL_LOWER_LETTER: 10700,
  // 数字小写字母 与数字混合或数字小写与数字混合。
  MIX_TWO_LETTER_AND_DIGHT: 10800,
  // 字母大小写 两种 混合
  MIX_TWO_UPPER_LOWER_LETTER: 10900,
  // 小写& 特殊 | 大写 & 特殊 | 数字 & 特殊
  MIX_TWO_OTHER_WITH_SPECIALSYMBOL: 11000,
  // 小写 & 大写 & 数字 数字与大小写字母的三种混合混合\
  MIX_THREE_DIGHT_LETTER: 11100,
  // 大写 & 小写 & 特殊 | 大写 & 特殊 & 数字 | 特殊 & 小写 & 数字 三种混合
  MIX_THREE_OTHER: 11200,
  // 大写 & 小写 & 数字 & 特殊 最复杂的一种混合
  MIX_ALL_DIGHT_LETTER_SEPICAL: 11300
};

const TYPE_TRANSLATE = {
  LENGTH_ILLEGAL: "输入长度不符合要求",
  // 整体是重复时满足为此type   121212 或者 111111
  REPEAT: "密码整体重复",
  // 字母连续有规律。
  SEQUENCE: "字母连续有规律",
  // 全是数字
  ALL_DIGHTER: "全是数字",
  // 全是特殊符号
  ALL_SPECITALSYMBOL: "全是特殊符号",
  // 全是大写字母
  ALL_UPPER_LETTER: "全是大写字母",
  // 全是小写字母
  ALL_LOWER_LETTER: "全是小写字母",
  // 数字小写字母 与数字混合或数字小写与数字混合。
  MIX_TWO_LETTER_AND_DIGHT: "数字小写字母 与数字混合或数字小写与数字混合",
  // 字母大小写 两种 混合
  MIX_TWO_UPPER_LOWER_LETTER: "字母大小写 两种 混合",
  // 小写& 特殊 | 大写 & 特殊 | 数字 & 特殊
  MIX_TWO_OTHER_WITH_SPECIALSYMBOL: "小写& 特殊 | 大写 & 特殊 | 数字 & 特殊",
  // 小写 & 大写 & 数字 数字与大小写字母的三种混合混合\
  MIX_THREE_DIGHT_LETTER: "小写 & 大写 & 数字 数字与大小写字母的三种混合混合",
  // 大写 & 小写 & 特殊 | 大写 & 特殊 & 数字 | 特殊 & 小写 & 数字 三种混合
  MIX_THREE_OTHER:
    "大写 & 小写 & 特殊 | 大写 & 特殊 & 数字 | 特殊 & 小写 & 数字 三种混合",
  // 大写 & 小写 & 数字 & 特殊 最复杂的一种混合
  MIX_ALL_DIGHT_LETTER_SEPICAL: "大写 & 小写 & 数字 & 特殊 "
};

const ILLEGAL =
  "LENGTH_ILLEGAL,REPEAT,SEQUENCE,ALL_DIGHTER,ALL_SPECITALSYMBOL,ALL_UPPER_LETTER,ALL_LOWER_LETTER";
const TRADING_ILLEGAL = "LENGTH_ILLEGAL,REPEAT,SEQUENCE";

function excludeRule(name, isTrading = false) {
  if (isTrading) {
    return TRADING_ILLEGAL.indexOf(name) != -1;
  } else {
    return ILLEGAL.indexOf(name) != -1;
  }

}

export function pwdStrength(regNo, isTrading = false) {
  for (let key in TYPE) {
    if (regNo == TYPE[key]) {
      if (excludeRule(key, isTrading)) {
        return TYPE_TRANSLATE[key];
      }
    }
  }
}
