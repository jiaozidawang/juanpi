<template>
    <div>
        <u-search v-model="search"
                  @on-input='onInput'></u-search>
        <div style="font-size:12px">{{search}}</div>
        <!-- <div style="background:rgb(199,57,54);height:60px;padding:10px 0">
            <u-notice theme='light'
                      showTips="提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容"></u-notice>
        </div> -->
        <div>

            <u-notice theme='dark'
                      showTips="提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容"></u-notice>
        </div>
        <u-group>
            <e-collapse title="折叠面板">
                <div>
                    <p style="font-size:16px">123</p>
                    <p style="font-size:16px">14323</p>
                    <p style="font-size:16px">4143</p>
                    <p style="font-size:16px">745645</p>
                    <p style="font-size:16px">745645</p>
                </div>
            </e-collapse>
        </u-group>
        <u-group>
            <u-button-group @clickHandler='btnGroupHandler'
                            :btnContent="['同意','购买']"
                            :secBtnDisabled='false'></u-button-group>
        </u-group>

        <u-group>
            <u-button-group showExtendBtn
                            extendState
                            @clickHandler='btnGroupHandler'
                            :btnContent="['同意','购买']"></u-button-group>
        </u-group>
        <u-group>
            <u-button-group showExtendBtn
                            :extendState="isCollect"
                            @clickHandler='btnGroupHandler'
                            :btnContent="['同意']"></u-button-group>
        </u-group>

    </div>
</template>
<script>

import USearch from '@/components/USearch';
import Group from '@/components/UGroup';
import ECollapse from '@/components/ECollapse';
import UButtonGroup from '@/components/UButtonGroup';
import UNotice from '@/components/UNotice';

export default {
  name: 'test',
  props: {},
  components: {
    USearch,
    ECollapse,
    [Group.name]: Group,
    UButtonGroup,
    UNotice
  },
  data() {
    return {
      isCollect: false,
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
  created() {
    setTimeout(() => {
      this.isCollect = true;
    }, 1000);
  },
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
      this.isCollect = !this.isCollect;
            // console.log('btnGroupClick', index);
    }
  }
};
</script>
<style lang="scss" scoped>
    @import './style.scss';
</style>