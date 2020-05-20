import Vue from 'vue';
import Vuex from 'vuex';
import comps from '@core/public/components/index.js';
import { logger, client } from "@core/lib/engineUI";

//页面处理化内容
import '@core/init';

//页面公共样式内容
import '@core/public/less/index.less';

Vue.prototype.$logger = logger;
Vue.prototype.$client = client;

//页面公共组件
Vue.use(comps);
Vue.use(Vuex);
