<template>
    <div class="collapseWrap">
        <u-cell class="headerBox" :class="{'hideBorder': !isFinal && !collapseShow}"
                :isLink="toggle"
                :name="headerVal"
                @clickHandler="toggleContent">
            <div slot="title"
                 :class="getHeaderClasses">{{ headerVal }}</div>
            <div v-if="descVal">{{ descVal }}</div>
            <div v-if="toggle" slot="icon-after"><div :class="arrowType"></div></div>
        </u-cell>
        <transition name="collapse">
            <div v-show="collapseShow">
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
import { UCell } from "@engine";

export default {
  name: 'Collapse',
  components: {
    UCell
  },
  props: {
    isFinal: {
      type: Boolean,
      default: true
    },
    initShow: {
      type: Boolean,
      default: true
    },
    toggle: {
      type: Boolean,
      default: true
    },
    headerVal: {
      type: String
    },
    descVal: {
      type: String,
      default: ''
    },
    isSubTitle: {
      type: Boolean,
      default: false,
    }
  },
  data: function () {
    return {
      collapseShow: false
    };
  },
  computed: {
    getHeaderClasses: function () {
      if (this.isSubTitle) {
        return ['nmb-font-gray subTitle'];
      }
      return [''];
    },
    arrowType: function () {
      if (this.collapseShow) {
        return 'arrow-up';
      } else {
        return 'arrow-down';
      }
    }
  },
  mounted: function () {
    this.collapseShow = this.initShow;
  },
  methods: {
    toggleContent: function () {
      if (this.toggle) {
        this.collapseShow = !this.collapseShow;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin.less';

.collapse-enter{
    max-height: 0;
}

.collapse-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.collapse-leave-active {
    // height: 0;
    display: none;
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.headerBox {
  display: block;
  height: 45px;
}

.subTitle {
  font-size: 12px;
}
</style>

