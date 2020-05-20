export default {
  data() {
    return {
      keyBoardHolder: document.createElement("div")
    };
  },
  methods: {
    scrollWindow(element) {
      // 如果是ios系统，完全不需要
      if (window.App.device.os == "ios") {
        return;
      };
      let mainDiv = document.querySelector(".main");
      // 元素距离浏览器窗口顶部的高度 =  元素底部距离body顶部的高度 - 浏览器卷上去的高度
      let eleHeight = element.offsetHeight + this.getElementTop(element);
      let eleOffsetWindowScreenTop = eleHeight - window.pageYOffset;
      // 如果 元素距离浏览器窗口顶部的高度 > 浏览器可视的高度 * 30%，
      let scrollHeight =
        eleOffsetWindowScreenTop - window.screen.availHeight * 0.4;
      if (scrollHeight > 0) {
        // 如果 页面的总高度 - (浏览器卷上去的高度 + 浏览器可视的高度)
        // 即底部可滚动的距离 < 需要滚动的距离
        // 则需要在底部添加区域块
        let canScrollHeight =
          document.body.scrollHeight -
          (window.pageYOffset + window.screen.availHeight);
        let holderBlockHeiht = scrollHeight - canScrollHeight;
        let isDOM = document.getElementsByClassName("holderBlockHeiht").length;
        if (holderBlockHeiht > 0 && !isDOM) {
          // this.keyBoardHolder = document.createElement('div');
          this.keyBoardHolder.classList.add("holderBlockHeiht");
          this.keyBoardHolder.style.height =
            window.screen.availHeight * 0.4 + "px";

          mainDiv.appendChild(this.keyBoardHolder);
          // document.body.appendChild(this.keyBoardHolder);
        }
        // 则滚动到 浏览器可视的高度 * 50% 的位置
        // window.scrollTo(0, eleHeight - scrollHeight);

        // 目标高度
        let targetHeight = window.pageYOffset + scrollHeight;
        let currentHeight = window.pageYOffset;
        // 每次偏移高度
        let scrollPiece = scrollHeight / (200 / 16.7);

        // 循环滚动，实现动画效果
        let timer = setInterval(function() {
          currentHeight = currentHeight + scrollPiece;
          window.scrollTo(0, currentHeight);

          // 如果已经超过目标高度，则停止循环
          if (currentHeight > targetHeight) {
            clearInterval(timer);
          }
        }, 0);
      }
    },
    cancleScroll() {
      // 如果是ios系统，完全不需要
      if (window.App.device.os == "ios") return;
      let holderBlockHeightDom = document.getElementsByClassName(
        "holderBlockHeiht"
      );
      let isDOM = holderBlockHeightDom.length;
      console.log(holderBlockHeightDom[0]);
      if (isDOM)
        document.querySelector(".main").removeChild(holderBlockHeightDom[0]);
    },
    getElementTop(element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
  }
};
