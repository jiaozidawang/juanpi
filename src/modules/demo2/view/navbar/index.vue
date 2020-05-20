<template>
    <div>
        <div class="test-group">
            <u-navbar slot="top" title="导航" :rightMenu="navRightMenu">
            </u-navbar>
        </div>
        <div class="test-group">
            <u-navbar slot="top" title="导航2" :rightMenu="navRightMenu2">
            </u-navbar>
        </div>
        <div class="test-group">
            <u-navbar
                slot="top"
                title="自定义背景字体颜色"
                :customStyle="{ bgColor: 'red', color: '#fff' }"
                :rightMenu="navRightMenu3"
            >
            </u-navbar>
        </div>

        <div class="test-group">
            <u-navbar
                slot="top"
                disabled
                title="无返回按钮"
                :rightMenu="navRightMenu4"
            >
            </u-navbar>
        </div>
    </div>
</template>

<script>
import Page from '@/components/UPage';
import Navbar from '@/components/UNavbar';
export default {
  components: {
    [Page.name]: Page,
    [Navbar.name]: Navbar
  },
  data() {
    return {
      navRightMenu: [
        {
          label: '客服',
          value: 'im',
          icon: require('./images/lianxiren2.png'),
          disabled: 'disabled'
        },
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
      navRightMenu2: [
        {
          label: '客服',
          value: 'im',
          icon: require('./images/lianxiren2.png'),
          disabled: 'disabled'
        },
        {
          label: '哈哈',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        }
      ],
      navRightMenu3: [
                { label: '客服', value: 'im', icon: '', disabled: 'disabled' },
                { label: '消息', value: 'haha', icon: '' }
      ],
      navRightMenu4: [
        {
          label: '客服',
          value: 'im',
          icon: require('./images/lianxiren2.png'),
          disabled: 'disabled'
        },
        {
          label: '哈哈',
          value: 'haha',
          icon: require('./images/service@2x.jpg')
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.test-group {
    margin-bottom: 20px;
}
</style>
