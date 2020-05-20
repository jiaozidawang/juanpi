<template>
    <div>
        <!-- <u-tab :tabItems='tabItems'
               @click="handleClick"></u-tab> -->
        <span>{{showtext}}</span>
        <div style="width:80%;height:36px">
            <u-button-tab v-model="btnTab"
                          btnFontSize='14px'></u-button-tab>
        </div>
        <div style="font-size:14px">{{btnTab}}</div>
        <div style="background:rgb(199,57,54);height:60px;padding:10px 0">
            <u-notice theme='light'
                      showTips="提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容"></u-notice>
        </div>
        <div>

            <u-notice theme='dark'
                      showTips="提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容"></u-notice>
        </div>
        <u-sort @tabClick='newHandlerTabClick'
                :tabs="conditions">
            <template slot-scope="props">
                <span class="tab-text">{{props.item.name}}</span>
            </template>
        </u-sort>

        <div style="font-size:12px">{{sortResult}}</div>
        <u-result showText='恭喜您，操作成功!'></u-result>
        <u-result status='fail'
                  showText='恭喜您，操作成功!'></u-result>
        <u-empty></u-empty>
        <e-collapse title="折叠面板">
            <div>
                <p style="font-size:16px">123</p>
                <p style="font-size:16px">14323</p>
                <p style="font-size:16px">4143</p>
                <p style="font-size:16px">745645</p>
                <p style="font-size:16px">745645</p>
            </div>
        </e-collapse>
        <u-search v-model="search"
                  @on-input='onInput'></u-search>
        <div style="font-size:12px">{{search}}</div>
        <u-reminder style='margin-top:30px;'
                    :showTips="showReminder"></u-reminder>
        <p style="font-size:14px">步长0.3 -4~10 只能输入整数 可禁用 自定义长度50px</p>
        <u-steper v-model="changeVal2"
                  :max='10'
                  :min='-4'
                  :onlyInteger='false'
                  :disabled='false'
                  inputWidth='50px'
                  :asyncChange='false'
                  @on-change=handleChange
                  :step='0.3'></u-steper>
        <p style="font-size:14px">步长3 -4~10 可禁用 异步调用</p>
        <u-steper v-model="changeVal"
                  :max='10'
                  :min='-4'
                  :onlyInteger='true'
                  :disabled='false'
                  :asyncChange='true'
                  @on-change=handleChange
                  :step='3'></u-steper>
        <div style="font-size:13px">{{changeVal}}</div>
        <u-button-group @clickHandler='btnGroupHandler'
                        :btnContent="['同意','再同意']"
                        :secBtnDisabled='true'></u-button-group>
        <u-icon iconSize='26px'
                color='red'
                type='info'></u-icon>
        <u-ellpsis :lineCount='2'
                   fontSize='13px'
                   content='提示内容提内容提内容提容提内示内容提内容提内容提内容提内示内容提内内容示内内容内容内内容示内内容容示内内容内内容'></u-ellpsis>
        <u-calendar></u-calendar>
    </div>
</template>
<script>
// import UTab from '@/components/UTab';
import UNotice from '@/components/UNotice';
import USort from '@/components/USort';
import UResult from '@/components/UResult';
import UEmpty from '@/components/UEmpty';
import USearch from '@/components/USearch';
import UReminder from '@/components/UReminder';
import USteper from '@/components/USteper';
import UButtonTab from '@/components/UButtonTab';
import ECollapse from '@/components/ECollapse';
import UButtonGroup from '@/components/UButtonGroup';
import UIcon from '@/components/UIcon';
import UEllpsis from '@/components/UEllpsis';
import UCalendar from '@/components/UCalendar';

export default {
  name: 'test',
  props: {},
  components: {
    UNotice,
    USort,
    UResult,
    UEmpty,
    USearch,
    UReminder,
    USteper,
    UButtonTab,
    ECollapse,
    UButtonGroup,
    UIcon,
    UEllpsis,
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