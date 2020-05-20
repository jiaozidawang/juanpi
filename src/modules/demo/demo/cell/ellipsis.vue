<template>
  <div class="ghb-ellipsis" :style="{padding: padding}">
    <div ref="textWrap" class="ghb-ellipsis-init" :style="{ lineHeight: __lineHeight, maxHeight: isOverflow ? maxHeight + 'px' : ''}" :class="classes">
      {{contentText}}
    </div>
  </div>
</template>
<script>
export default {
  name: "ghb-ellipsis",
  props: {
    padding: {
      type: String,
      default: '0 .2rem 0 .32rem'
    },
    lineCounts: {
      type: String | Number,
      default: '3'
    },
    lineHeight: {
      type: String,
      default: '20px'
    },
    contentText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // maxHeight: '80px'
      isOverflow: false
    };
  },
  computed: {
    __lineHeight () {
      return this.lineHeight.replace('px', '') + 'px';
    },
    maxHeight () {
      let lineHeight = Number(this.lineHeight.replace('px', ''));
      let lineCounts = Number(this.lineCounts);
      return `${lineHeight * lineCounts}`;
    },
    classes () {
      return {
        'ellpsis': this.isOverflow
      };
    }
  },
  mounted () {
    if(Number(this.$refs.textWrap.offsetHeight) > Number(this.maxHeight)) {
      this.isOverflow = true;
    };
    console.log(this.isOverflow, Number(this.$refs.textWrap.offsetHeight), Number(this.maxHeight));
  }
};
</script>
<style lang="less">
.ghb-ellipsis {
  background-color: #fff;
  &-init {
    position: relative;
    overflow: hidden;
  }
  .ellpsis{
    &::after{
      content: "..."; 
      position: absolute; 
      padding-right: 5px;
      z-index: 1;
      bottom: 0; 
      right: 0; 
      padding-left: 40px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff 55%);
    }
  }
};
</style>