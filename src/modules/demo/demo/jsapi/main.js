import Vue from 'vue';
import '@/main';
import Entry from './index.vue';
import mixins from '@core/init/mixins';

// import toast from '@comps/ghb-toast/toast.js';
// Vue.use(toast);

App.__vm__ = new Vue({
	mixins,
	render: h => h(Entry)
})
