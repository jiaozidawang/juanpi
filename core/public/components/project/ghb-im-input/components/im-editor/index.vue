<template>
  <div class="ghb-editor needsclick">
    <div class="ghb-editor-content" contenteditable="true" v-focus></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted () {
    let doc = document.querySelector('.ghb-editor-content');
    doc.addEventListener('input', (v) => {
      console.log(v);
    })
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>


<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-user-select: auto;
}
.ghb-editor-content {
  text-align: left; 
  padding: 8px 0; 
  vertical-align: middle;
  // box-sizing: border-box; 
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  overflow:auto;
  img{
    vertical-align: middle;
    height: 24px;
    width: 24px;
    margin: 0;
    padding: 0;
  }
}
</style>