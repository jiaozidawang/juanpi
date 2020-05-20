<template>
    <u-page>
        <div class="top"
             slot="top">
            <u-navbar title="导航"
                      :rightMenu="navRightMenu"> </u-navbar>
            <e-filter :filterGroup="filterGroup"
                      @click-button-handler="clickFilterButtons"
                      :needButtons="needFilterButton"
                      @on-tab-click="tabClick">
                <div v-if="board === 'card'"
                     class="board1">
                    面板card
                </div>
                <div v-if="board === 'date'"
                     class="board2">
                    面板date
                </div>
                <div v-if="board === 'filter'"
                     class="board3">
                    面板filter
                </div>
            </e-filter>
        </div>
        <u-content>
            <div class="textBox">Content</div>
            <div class="textBox">Content</div>
            <div class="textBox">Content</div>
            <div class="textBox">Content</div>
            <div class="textBox">Content</div>
        </u-content>
        <u-footer slot="bottom">Footer</u-footer>
    </u-page>
</template>
<script>
import Page from '@/components/UPage';
import Navbar from '@/components/UNavbar';
import Content from '@/components/Ucontent';
import Footer from '@/components/UFooter';
import Eyetips from '@/components/UEyeTips';
import Filter from '@/components/EFilter';
export default {
  name: 'Layout',
  props: {},
  components: {
    [Page.name]: Page,
    [Navbar.name]: Navbar,
    [Content.name]: Content,
    [Footer.name]: Footer,
    [Eyetips.name]: Eyetips,
    [Filter.name]: Filter
  },
  data() {
    return {
      navRightMenu: [
                { label: '客服', value: 'im', icon: '', disabled: 'disabled' },
        {
          label: '哈哈',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        },
        {
          label: '哈哈1',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        }
      ],
      filterGroup: [
                { label: '借记卡6234****7650', name: 'card', align: 'left' },
                { label: '一个月', name: 'date', align: 'right' },
                { label: '筛选', name: 'filter', align: 'right' }
      ],
      board: 'card',
    };
  },
  watch: {},
  computed: {
    needFilterButton() {
      return this.board !== 'card';
    }
  },
  created() { },
  mounted() { },
  destoryed() { },
  methods: {
    clickFilterButtons(val) {
      console.log('val', val);
    },
    tabClick(item) {
      this.board = item.name;
    }
  }
};
</script>
<style lang="scss" scoped>
    @import './style.scss';
    .textBox {
        height: 300px;
        background: #fff;
    }
    .board1 {
        height: 200px;
    }
    .board2 {
        height: 400px;
    }
    .board3 {
        height: 700px;
    }
</style>
