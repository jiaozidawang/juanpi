/**
 * uat2模式的配置项
 * 可用process.env访问各项配置
 */
var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  config: {
    virtualHost: "https://mcube-prod.oss-cn-hangzhou.aliyuncs.com",
    workspace: "161BC41311505_uat2"
  },
  envConfig: {
    NODE_ENV: '"production"',
    MGS_WORK_SPACE: '"UAT2"',
  }
});
