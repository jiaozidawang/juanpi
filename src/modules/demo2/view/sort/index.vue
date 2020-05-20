<template>
    <div>

        <u-sort @tabClick='newHandlerTabClick'
                :tabs="conditions">
            <template slot-scope="props">
                <span class="tab-text">{{props.item.name}}</span>
            </template>
        </u-sort>
        <div style="font-size:12px">{{sortResult}}</div>
        <div style="background:#fff;">
            <p style="font-size:14px">步长0.3 -4~10 可禁用 自定义长度50px</p>
            <u-steper v-model="changeVal2"
                      :max='10'
                      :min='-4'
                      :onlyInteger='false'
                      :disabled='false'
                      inputWidth='50px'
                      :asyncChange='false'
                      @on-change=handleChange
                      :step='0.3'></u-steper>
            <p style="font-size:14px">步长3 -4~10 只能输入整数 可禁用 异步调用</p>
            <u-steper v-model="changeVal"
                      :max='10'
                      :min='-4'
                      :onlyInteger='true'
                      :disabled='false'
                      :asyncChange='true'
                      @on-change=handleChange
                      :step='3'></u-steper>
            <div style="font-size:13px">{{changeVal}}</div>

        </div>
        <!-- <u-ellpsis :lineCount='2'
                   fontSize='13px'
                   content='提示内容提内容提内容提容提内示内容提内容提内容提内容提内示内容提内内容示内内容内容内内容示内内容容示内内容内内容'></u-ellpsis> -->
        <p style="font-size:16px;margin-top:20px">通过参数可控制icon类型、大小、颜色</p>
        <u-icon iconSize='26px'
                color='red'
                type='info'></u-icon>
        <u-icon iconSize='26px'
                color='red'
                type='circle'></u-icon>
        <u-icon iconSize='26px'
                color='red'
                type='download'></u-icon>
        <u-icon iconSize='26px'
                color='red'
                type='safe-success'></u-icon>
        <br>
        <u-icon iconSize='30px'
                color='green'
                type='safe-warn'></u-icon>
        <u-icon iconSize='30px'
                color='green'
                type='success'></u-icon>
        <u-icon iconSize='30px'
                color='green'
                type='success-circle'></u-icon>
        <u-icon iconSize='30px'
                color='green'
                type='success-no-circle'></u-icon>
        <br>
        <u-icon iconSize='35px'
                color='yellow'
                type='waiting'></u-icon>
        <u-icon iconSize='35px'
                color='yellow'
                type='cancel'></u-icon>
        <u-icon iconSize='35px'
                color='yellow'
                type='back'></u-icon>
        <u-icon iconSize='35px'
                color='yellow'
                type='success-no-circle'></u-icon>
        <br>
        <u-icon iconSize='40px'
                color='gray'
                type='delete'></u-icon>
        <u-icon iconSize='40px'
                color='gray'
                type='clear'></u-icon>
        <u-icon iconSize='40px'
                color='gray'
                type='waiting-circle'></u-icon>
        <u-icon iconSize='40px'
                color='gray'
                type='info-circle'></u-icon>
    </div>
</template>
<script>

import USort from '@/components/USort';
import USteper from '@/components/USteper';
import UIcon from '@/components/UIcon';
// import UEllpsis from '@/components/UEllpsis';

export default {
  name: 'test',
  props: {},
  components: {
    USort,
    USteper,
    UIcon,
        // UEllpsis
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