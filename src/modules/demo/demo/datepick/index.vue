<template>
  <m-page>
    <!-- <date-pick startDefault="2019-05-22" endDefault="2018-06-22" newStartDate="2018-09-22" @confirm="selectDate"></date-pick> -->
    <date-pick2 startDefault="2019-05-22" endDefault="2019-06-22" @confirm="selectDate"></date-pick2>
    <div class="btn-box">
      <m-button @clickHandler="showPicker" type="primary">打开picker</m-button>
    </div>
    <ghb-picker ref="picker" confirmTxt="确定" cancleTxt="取消" @select="handleSelect" :selectedIndex="selectedIndex"></ghb-picker>
    <div class="btn-box">
      <m-button @clickHandler="showDatePick" type="primary">打开时间选择器</m-button>
    </div>
    {{selectDate2}}
    
    <div class="btn-box" >
      <m-button @clickHandler="isShowShare = true" type="primary">分享</m-button>
    </div>
    <div class="btn-box" >
      <m-button type="primary" @clickHandler="showSelectCard">弹出选卡组件</m-button>
    </div>
    <selectCard v-model="isShowSelectCard" :dataList="cardList" showMark  @selectCard="selectCard"/>
    <ghb-share v-model="isShowShare" @clickIcon="shareClick" :shareTypeList="['wechat']"></ghb-share>
    <ghb-circle-picker @confirm="selectCircleDate"></ghb-circle-picker>
  </m-page>
</template>

<script>
// import ghbScreening from '@comps/ghb-screening';
// import datePick from '@comps/ghb-datepick';
import datePick2 from '@comps/ghb-datepick/datepick';
import ghbPicker from '@comps/ghb-picker';
import ghbPopupPick from '@comps/ghb-popup-picker';
import ghbCirclePicker from '@comps/ghb-circlePicker';
import { showDatePicker, showSelectView } from '@bridge';

import ghbShare from '@comps/ghb-share';
import selectCard from '@comps/ghb-select-card';
export default {
  components: {
    // ghbScreening
    // datePick,
    datePick2,
    ghbPicker,
    ghbPopupPick,
    selectCard,
    ghbShare,
    ghbCirclePicker
    // PopupPicker
  },
  data () {
    return {
      isShow: false,
      selectedIndex: [[0]],
      selectDate2: '',
      isShowSelectCard: false,
      cardList: [
        {title: `广东华兴银行 6251 3755 5965 8441`, desc: '可用余额：￥100,000.00   灵活盈余额：0.00元', icon: 'ghb'},
        {title: `广东华兴银行 6251 3755 5965 8441`, desc: '可用余额：￥100,000.00   灵活盈余额：0.00元', icon: 'icbc'},
        {title: `广东华兴银行 6251 3755 5965 8441`, desc: '可用余额：￥100,000.00   灵活盈余额：0.00元', icon: 'cmb'},
        {title: `广东华兴银行 6251 3755 5965 8441`, desc: '可用余额：￥100,000.00   灵活盈余额：0.00元', icon: 'ghb'},
        {title: `广东华兴银行 6251 3755 5965 8441`, desc: '可用余额：￥100,000.00   灵活盈余额：0.00元', icon: 'cmb'},
      ],
      isShowShare: false,
      pickData: [
          {itemName: '苹果', value: 0},
          {itemName: '雪梨', value: 1},
          {itemName: '橘子', value: 2},
          {itemName: '香蕉', value: 3},
          {itemName: '菠萝', value: 4},
          {itemName: '蓝洞', value: 6},
          {itemName: '黑风车', value: 7},
          {itemName: '西瓜', value: 8},
          {itemName: '火龙果', value: 9},
          {itemName: '大木瓜', value: 10},
          {itemName: '芝士', value: 11},
          {itemName: '鲁滨逊', value: 12},
          {itemName: '莉娜', value: 13},
          {itemName: '蓝胖子', value: 14}
      ]
    };
  },
  mounted () {
    // this.$refs.picker.setData([this.pickData]);
  },
  methods: {
    selectCard () {
    },
    shareClick (val) {
      console.log('分享点击', val);
    },
    showSelectCard () {
      this.isShowSelectCard = !this.isShowSelectCard;
    },
    selectDate (val) {
      console.log(val);
    },
    selectCircleDate (val) {
      console.log(val);
    },
    shai () {
      this.isShow = true;
    },
    showPicker () {
      showSelectView('', this.pickData, '3', '6');
    },
    handleSelect (val) {
      // this.selectedText.splice
      console.log(val);
    },
    showDatePick () {
      showDatePicker({
        title: '',
        currentDate: '2019-05-08',
        dateFormat: 'yyyy-MM-dd',
        minimumDate: '2000-01-01',
        maximumDate: '2030-01-01'
      }).then(res => {
        console.log(res);
        this.selectDate2 = res.currentDate;
      });
    }
  }
};
</script>
<style lang="less" scoped>
// 选卡组件下面的样式
  .transReport{
    background-color: @bg;
    padding: .2rem @spacing;
    .transReport_tite{
      color: @font-t1;
      margin-bottom: .2rem;
    }
    > p{
      color: @font-t3
    }
  }
</style>
