/**
 * 私有云的sit的配置项
 * 可用process.env访问各项配置
 */
var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  config: {
    // virtualHost: "https://mpaas-mcube-mcube-lb-0.ghbankmpaas.com",
    virtualHost: "https://mpaas.ghbank.com.cn/mcube",
    workspace: "161BC41101438_default"
  },
  envConfig: {
    NODE_ENV: '"production"',
    MGS_WORK_SPACE: '"default"'
  }
});
