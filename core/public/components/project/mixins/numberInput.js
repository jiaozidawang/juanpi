export default {
  methods: {
    //e.preventDefault在安卓系统不起作用,在这个方法里兼容安卓系统的数字控制
    keyupHandler(e) {
      if (this.readonly) {
        e.target.value = this.currentValue;
      }

      // 限制非数字的输入
      let reg = /\d/;
      if (
        !reg.test(e.target.value.substr(e.target.value.length - 1, 1)) &&
        e.keyCode != 8
      ) {
        e.target.value = this.currentValue;
        return;
      }

      this.currentValue = e.target.value;
    }
  }
};
