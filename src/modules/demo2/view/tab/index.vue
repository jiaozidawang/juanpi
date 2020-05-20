<template>
    <div>
        <span>{{showtext}}</span>
        <div style="width:80%;height:36px">
            <u-button-tab v-model="btnTab"
                          btnFontSize='14px'></u-button-tab>
        </div>
        <div style="font-size:14px">{{btnTab}}</div>
        <div class="tab"
             style="width: 100%">
            <tab custom-bar-width="60px">
                <tab-item selected
                          @on-item-click="onItemClick">已发货</tab-item>
                <tab-item @on-item-click="onItemClick">未发货</tab-item>
                <tab-item @on-item-click="onItemClick">全部订单</tab-item>
            </tab>
        </div>

    </div>
</template>
<script>
import UButtonTab from '@/components/UButtonTab';
import Tab from '@/components/UTab/tab';
import TabItem from '@/components/UTab/tab-item';
export default {
  name: 'test',
  props: {},
  components: {
    UButtonTab,
    Tab,
    TabItem
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
    onItemClick() {

    },
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