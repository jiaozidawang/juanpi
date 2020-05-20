<template>
    <div>
        <u-calendar></u-calendar>
    </div>
</template>
<script>
import { UCalendar } from '@engine';

export default {
  name: 'test',
  props: {},
  components: {
    UCalendar
  },
  data() {
    return {
      tabItems: ['tab121', 'tab2', 'tab3', 'tab4', 'tab5'],
      showtext: 0,
      conditions: [
        {
          name: '收益率',
          value: 'MODEL_COMMENT',
          clear: true
        },
        {
          name: '起息快',
          value: 'OPBGNDT'
        },
        {
          name: '起购金额',
          value: 'PFIRST_AMT'
        },
        {
          name: '投资期限',
          value: 'IFM_TERM'
        }
      ],
      sortResult: {},
      search: '',
      changeVal2: 1.2,
      changeVal: 2,
      btnTab: 1,
      showReminder: ['1、请填写提示内容...请填写提示内容...请填写提示内容...请填写提示内容...请填写提示内容...请填写提示内容...', '2、第二条提示']
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  destoryed() { },
  methods: {
    handleClick(index) {
      this.showtext = index;
    },
    newHandlerTabClick(e) {
            // console.log('newHandlerTabClick', e);
      this.sortResult = e;
    },
    onInput() {
      console.log('on-input...');
    },
    handleChange(val) {
            // console.log('handleChange', val);
      setTimeout(() => {
        alert('异步调用');
        this.changeVal = val;
      }, 5);
    },
    btnGroupHandler(index) {
            // console.log('btnGroupClick', index);
    }
  }
};
</script>
<style lang="scss" scoped>
    @import './style.scss';
</style>