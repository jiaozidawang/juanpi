<template>
  <m-page>
    <m-header :rightMenu="[{text:'图标1', color: '0'}]"></m-header>

    <div class="phone">{{iphone | date}}</div>
    <p>{{amt | upper}}</p>
    <p>{{amt | amt('')}}</p>
    <p>{{myName | name}}</p>
    <p>{{bandCard | bandCard}}</p>
    <p>{{phone | phone}}</p>
    <p>{{idCard | idCard}}</p>
    <div class="input">
      <input type="text" v-model="input">
    </div>

    {{toSisteen(input)}}
    <div class="btn-box">
      <m-button @clickHandler="openCamera">打开相册</m-button>
    </div>
    <div class="btn-box">
      <m-button @clickHandler="testUtils">utils测试</m-button>
    </div>
  </m-page>
</template>

<script>
  import SortAddressBookList from '@utils/tools/sortAddressBookList';
  import Mock from 'mockjs';
  import data from './testData';
  import {getNativePhoto} from '@bridge';
  export default {
    name: 'demo2',
    data () {
      return {
        iphone: '20190318',
        amt: '12388232',
        myName: '李嘉诚',
        bandCard: '6217003320000161888',
        phone: '18826278008',
        idCard: '441482299876677865',
        input: ''
      };
    },
    created () {
      let dataList = [];

      // 自动生成数据条数
      let LEN = 100;

      for(let i = 0; i < LEN; i++) {
        let opt = {
          name: Mock.Random.cname(),
          intro: Mock.Random.cparagraph()
        };
        dataList.push(opt);
      }
      // console.log(dataList)
      let list = new SortAddressBookList('name', data, true);
      console.log(list);
    },
    methods: {
      toSisteen (num) {
        let str = '0x' + num;
        return Number(str).toString(10);
      },
      openCamera () {
        getNativePhoto().then(res => {
          console.log(res);
        });
      },
      testUtils () {
        let time = this.$tools.getTimeStamp(10, new Date(), true);
        console.log(time);

        let time2 = this.$tools.afterDays(new Date(), 10, true);
        console.log(time2);
      }
    }
  };
</script>
<style lang="less" scoped>
</style>

