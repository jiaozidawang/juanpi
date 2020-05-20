
import Vue from 'vue';
import tools from "../tools";
import { trans } from './dictionary';

// 日期格式化 20180201 => 2018-02-01
Vue.filter("date", tools.dateFormat);
// 金额转换大写 100 => 壹佰元整
Vue.filter("upper", tools.changeAmt);
// 金额格式化 1000 => ￥1,000.00  第一个参数改变金额前面的标志， 第二个参数改变保留的小数位数
Vue.filter("amt", tools.currencyFormat);
// 脱敏手机号
Vue.filter("phone", tools.formatPhone);
// 脱敏身份证号
Vue.filter("idCard", tools.formatIdNumber);
// 脱敏银行卡号
Vue.filter("bandCard", tools.formatBank);
// 脱敏姓名
Vue.filter("name", tools.formatName);
// 银行卡类型转换
Vue.filter('cardType', (type) => {
  return trans('CARDTYPE', type);
});
// 币种转换
Vue.filter('currency', (type) => {
  return trans('CRCYCD', type);
});
// 理财利率专属过滤器
Vue.filter("_toFixed1", tools._toFixed1);
// 我的定期--金额利率小数位数规则统一
Vue.filter("rate4Filter", tools._toFixed2);
