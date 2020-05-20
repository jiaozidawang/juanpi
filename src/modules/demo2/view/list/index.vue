<template>
    <u-page class='list'>
        LIST
        <e-list :listData="listData"></e-list>
    </u-page>
</template>


<script>
import Page from '@/components/UPage';
import List from '@/components/EList';
export default {
  components: {
    [Page.name]: Page,
    [List.name]: List
  },
  data() {
    return {
      listData: [
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true },
                { prdName: '全碳纤维支架', prdCode: 'cod0001', saleTime: '2019-01-09', isOpen: true }
      ]
    };
  }
};
</script>


<style lang='scss' scoped>
</style>