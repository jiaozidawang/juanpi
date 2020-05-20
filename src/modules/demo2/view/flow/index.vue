<template>
    <div>
        <u-flow>
            <u-flow-state state="1"
                          :title="'Paid'"
                          is-done></u-flow-state>
            <u-flow-line is-done></u-flow-line>

            <u-flow-state state="2"
                          is-done>
                <span slot="title">Shipped</span>
            </u-flow-state>
            <u-flow-line :tip="'In progress'"></u-flow-line>

            <u-flow-state state="3"
                          :title="'Delivered'"></u-flow-state>
            <u-flow-line></u-flow-line>

            <u-flow-state state="4"
                          :title="'Done'"></u-flow-state>
        </u-flow>
    </div>
</template>
<script>
import { UFlow, UFlowLine, UFlowState } from '@engine';

export default {
  name: 'test2',
  props: {},
  components: {
    UFlow,
    UFlowLine,
    UFlowState
  },
  data() {
    return {

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