/*
 * @Author:
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-10-29 18:57:15
 * @Description:
 */
import DateTools from "./dateTools";
import { alert } from "@bridge";

// 正则
const REG_NUMBER = /^[0-9]*$/; // 纯数字
const REG_EN = /^[a-zA-Z]*$/; // 纯字母
const REG_USER_NAME = /^[a-zA-Z\d\u4e00-\u9fa5\s\(\（\)\）)]*$/; // 用户名
const REG_NICK_NAME = /^[a-zA-Z0-9_]*$/; // 昵称

/**
 * 判断是否为数字
 * 案例: { validator: ValidateTools.isNum, message: "手机号码必须为纯数字", trigger: "blur" }
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isNum = (rule, value, callback) => {
  if (value != "") {
    let reg = REG_NUMBER;
    if (!reg.test(value)) {
      let errorMsg = rule.message == undefined ? "必须填写数字" : rule.message;
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 判断是否为字母
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isEn = (rule, value, callback) => {
  if (value != "") {
    let reg = REG_EN;
    if (!reg.test(value)) {
      let errorMsg = rule.message == undefined ? "必须填写字母" : rule.message;
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 判断是否为昵称
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isNickname = (rule, value, callback) => {
  if (value != "") {
    let reg = REG_NICK_NAME;
    if (!reg.test(value)) {
      let errorMsg = rule.message == undefined ? "昵称只能包含下划线、字母和数字" : rule.message;
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 判断是否为用户名
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isUserName = (rule, value, callback) => {
  if (value != "") {
    const reg = REG_USER_NAME;
    if (!reg.test(value)) {
      let errorMsg = rule.message == undefined ? "用户名只能包含汉字、字母空格，括号和数字" : rule.message;
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 判断身份证
 * 案例: { validator: ValidateTools.isIdCard, message: "身份证无效", trigger: "blur" }
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isIdCard = (rule, value, callback) => {
  if (value != "") {
    // 普通验证
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let errorMsg = rule.message == undefined ? "身份证号码无效" : rule.message;
    if (!reg.test(value)) {
      callback(new Error(errorMsg));
    }

    // 验证身份证有效性
    let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    let arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    let sum = 0;
    for (var i = 0; i < value.length - 1; i++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
    }
    if (arrValid[sum % 11] != value.substr(17, 1).toUpperCase()) {
      callback(new Error(errorMsg));
    }

    // 验证出生时间有效性
    let vYear = value.substr(6, 4) * 1;
    let vMonth = value.substr(10, 2) * 1;
    let vDay = value.substr(12, 2) * 1;
    let maxDays = 0;
    if ("|1|3|5|7|8|10|12|".indexOf("|" + vMonth + "|") > -1) {
      maxDays = 31;
    } else if (vMonth == 2) {
      if ((vYear % 4 == 0 && vYear % 100 != 0) || vYear % 400 == 0) {
        maxDays = 29;
      } else {
        maxDays = 28;
      }
    } else {
      maxDays = 30;
    }

    let nowStr = DateTools.date2Str(new Date(), "YYYYMMDD") * 1;
    if (value.substr(6, 8) * 1 <= nowStr && vDay <= maxDays) {
      callback();
    } else {
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 必传字段
 * @param {*} label 表单名
 * @param {*} required 是否必填
 * @param {*} trigger 触发方法
 */
const requiredRule = function(label = "", required = true, trigger = "blur") {
  return required
    ? [{ required: true, message: label + "不能为空", trigger: trigger }]
    : [];
};

/**
 * 判断是否为1开头，用于手机号判断
 * 案例: { validator: ValidateTools.isNum, message: "手机号码必须为纯数字", trigger: "blur" }
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isOneBegin = (rule, value, callback) => {
  if (value != "" && value.substring(0, 1) != "1") {
    let errorMsg = rule.message == undefined ? "必须以1开头" : rule.message;
    callback(new Error(errorMsg));
  }
  callback();
};

/**
 * 判断是否安全密码
 * 案例: { validator: ValidateTools.isSafePassword, message: "长度为8-16位，包含数字、字母、符号中任意两种", trigger: "blur" }
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isSafePassword = (rule, value, callback) => {
  if (value != "") {
    if (value.length < 8 || value.length > 16) {
      let lenErrorMsg =
        rule.message == undefined ? "长度为8-16位" : rule.message;
      callback(new Error(lenErrorMsg));
    } else {
      let grade = 0;
      let numTest = /[0-9]/;
      if (numTest.test(value)) {
        console.log("numTest");
        grade++;
      }
      let enTest = /[A-Za-z]/;
      if (enTest.test(value)) {
        console.log("enTest");
        grade++;
      }
      let signTest = /[^\w]|_/;
      if (signTest.test(value)) {
        console.log("signTest");
        grade++;
      }
      if (grade < 2) {
        let errorMsg =
          rule.message == undefined
            ? "包含数字、字母、符号中任意两种"
            : rule.message;
        callback(new Error(errorMsg));
      }
    }
  }
  callback();
};
/**
 * 组织机构代码
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} callback 回调
 */
const isOrganization = (rule, value, callback) => {
  if (value != "") {
    let reg = /[A-z0-9]{0,18}/;
    if (!reg.test(value)) {
      let errorMsg =
        rule.message == undefined ? "统一社会信用代码不符合规范" : rule.message;
      callback(new Error(errorMsg));
    }
  }
  callback();
};

/**
 * 手机号码验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 * @param {*} trigger 触发方法
 */
const mobileRules = function(
  label = "手机号码",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    { len: 11, message: label + "长度必须为11位", trigger: trigger },
    { validator: isNum, message: label + "必须为纯数字", trigger: trigger },
    { validator: isOneBegin, message: label + "不符合规范", trigger: trigger }
  ];
};

/**
 * 电子邮件验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 */
const eMailRules = function(
  label = "电子邮箱",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    {
      type: "email",
      message: label + "不符合电子邮件地址规范",
      trigger: trigger
    }
  ];
};

/**
 * 身份证验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 */
const idCardRules = function(
  label = "身份证号码",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    { validator: isIdCard, message: label + "不符合规范", trigger: trigger }
  ];
};

/**
 * 密码验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 */
const passwordRules = function(
  label = "密码",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    {
      validator: isSafePassword,
      message: label + "长度为8-16位，包含数字、字母、符号中任意两种",
      trigger: trigger
    }
  ];
};

/**
 * 昵称验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 */
const nickNameRules = function(
  label = "昵称",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    {
      validator: isNickname,
      message: label + "只能包含下划线、英文和数字",
      trigger: trigger
    },
    { min: 6, max: 14, message: label + "长度为6~14位" }
  ];
};

/**
 * 用户名验证组合
 * @param {*} label 表单名
 * @param {*} required 是否必填
 */
const userNameRules = function(
  label = "用户名",
  required = true,
  trigger = "blur"
) {
  return [
    ...requiredRule(label, required, trigger),
    {
      validator: isNickname,
      message: label + "只能包含下划线、英文和数字",
      trigger: trigger
    },
    { min: 6, max: 30, message: label + "长度为6~14位" }
  ];
};


/**
 * @description: 用户名校验组合
 * @param {type}
 * @return:
 */
const validUserNameGroup = function () {
  return [
    { required: true, message: "姓名不能为空，请输入。" },
    { pattern: REG_USER_NAME, message: '姓名只能包含汉字、字母空格，括号和数字' },
    { min: 2, max: 10, message: '姓名长度为2-10位' }
  ]
}

/**
 * @description: 卡号校验组合
 * @param {String} valueType 值类型
 * @return:
 */
const validCreditCardNo = function (valueType = '卡号') {
  return [
    { required: true, message: `${valueType}不能为空，请输入。` },
    { validator: isNum, message: `${valueType}只能是数字`},
    { min: 13, max: 19, message: `${valueType}长度为13-19位` }
  ]
}

/**
 * @description: 银行名称校验组合
 * @param {type}
 * @return:
 */
const validBankName = function (valueType = '银行名称') {
  return [
    {
      validator: (rule, value, callback) => {
        if(value == '') {
          callback(new Error(`${valueType}不能为空，请输入。`));
          return
        }
        if (value == '请选择发卡银行') {
          callback(new Error(`${valueType}不能为空，请输入。`));
          return;
        }
        callback();
      }},
    { min: 4, max: 19, message: `${valueType}长度为13-19位` }
  ]
}

const handlerErrors = function(errors, buttonText = "好的") {
  alert(errors[0].message, "", { button: buttonText });
};

export default {
  // 单项校验器
  isNum,
  isEn,
  isIdCard,
  isOneBegin,
  isSafePassword,
  isOrganization,
  isUserName,
  // 验证规则组合
  mobileRules,
  eMailRules,
  idCardRules,
  passwordRules,
  nickNameRules,
  validUserNameGroup, // 用户名组合校验
  validCreditCardNo, // 信用卡组合校验
  validBankName, // 银行名称
  // 错误回调函数
  handlerErrors
};
