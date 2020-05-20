import Vue from 'vue';
import '@/main';
import Entry from './index.vue';
import mixins from '@core/init/mixins';

// import DatetimePlugin from "@comps/ghb-datetime/plugin";

// Vue.use(DatetimePlugin);

import DatetimePlugin from "@comps/ghb-datetime/plugin";
Vue.use(DatetimePlugin);

App.__vm__ = new Vue({
	mixins,
	render: h => h(Entry)
})
