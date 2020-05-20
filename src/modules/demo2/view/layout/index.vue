<template>
    <u-page>
        <div class="top" slot="top">
            <u-navbar title="导航" :rightMenu="navRightMenu"> </u-navbar>
            <u-eye-tips></u-eye-tips>
        </div>
        <!-- <div class="top" slot="top">顶部</div> -->
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
export default {
  name: 'Layout',
  props: {},
  components: {
    [Page.name]: Page,
    [Navbar.name]: Navbar,
    [Content.name]: Content,
    [Footer.name]: Footer,
    [Eyetips.name]: Eyetips
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
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  destoryed() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import './style.scss';
.textBox {
    height: 300px;
}
</style>
