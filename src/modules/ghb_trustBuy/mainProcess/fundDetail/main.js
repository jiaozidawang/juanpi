import Vue from 'vue';
import '@/main';
import Entry from './index.vue';
import mixins from '@core/init/mixins';

if (process.env.NODE_ENV === 'development') {
	Vue.prototype.$theme = window.App.theme || "default";
}

App.__vm__ = new Vue({
	mixins,
	render: h => h(Entry)
})
