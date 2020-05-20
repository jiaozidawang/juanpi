
export default {
  data() {
    return {
      box: document.createElement("div"),
      scrollEl: document.querySelector('#scroll')
    };
  },
  methods: {
    scrollWindow(type = 'input') {
      let boxes = document.querySelectorAll('.bottomAppendBox');
      if(boxes.length > 0) {
        return
      }
      let scrollElement = document.querySelector('#scroll');
      let box = document.createElement("div");
      box.className = 'bottomAppendBox'
      box.style.height = '300px'
      box.style.width = '100%'
      scrollElement.appendChild(box);
      let diff = scrollElement.offsetHeight;
      console.log('这里的DIFF', diff);
      // if(type !== 'input') {
      //   diff = diff - 300
      // }
      this.$parent.$parent.$refs.scroll.scrollTo(0, -diff);
      // console.log('这里的DIFF', diff);
    },
    remoteBox () {
      let scrollElement = document.querySelector('#scroll');
      let boxes = document.querySelectorAll('.bottomAppendBox');
      boxes.forEach(item => {
        scrollElement.removeChild(item)
      });
    }
  }
};
