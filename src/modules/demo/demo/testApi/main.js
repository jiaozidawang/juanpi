import Vue from 'vue';
import '@/main';
import Entry from './index.vue';
import mixins from '@core/init/mixins';

App.__vm__ = new Vue({
  mixins,
  render: h => h(Entry)
})
