import Vue from "vue";
import FastClick from "fastclick";
import "babel-polyfill";
import "@core";
import tools from "@core/utils/tools";
import "@core/utils/filters";
import AsyncValidator from "async-validator";

window.AsyncValidator = AsyncValidator;
import toast from "@comps/ghb-toast/toast.js";
Vue.use(toast);

if (ENVCONF.NODE_ENV === "development") {
  require("../mock");
}

FastClick.attach(document.body);
Vue.config.productionTip = false;



// 变更主题，只实现了 H5 的主题变更
let changeTheme = theme => {
  document.body.classList.forEach(name => {
    if (name.startsWith("app-theme")) {
      document.body.classList.remove(name);
    }
  });
  document.body.classList.add(`app-theme-${theme}`);
};

/**
 * 获取客户端主题并赋值
 */
if (window.AlipayJSBridge) {
  window.AlipayJSBridge.call("getGlobalTheme", res => {
    console.log("res", res);

    changeTheme(res.theme);
    Vue.prototype.$assets = {
        icon: ASSETS.icon + res.theme || 'default',
        image: ASSETS.image + res.theme || 'default'
    };
    Vue.prototype.$theme = res.theme || "default";
  });
} else if (process.env.NODE_ENV !== "production") {
  changeTheme(window.App.theme);
  console.error(
    "\n\n ========== 本工程运行依赖于配套的安卓或iOS环境，PC端运行功能会有所缺失! ============ \n\n"
  );
}


Vue.prototype.$tools = tools;
