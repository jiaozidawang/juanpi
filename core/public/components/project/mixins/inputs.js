import bind from './bind';

const inputsOpt = {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    align: {
      type: String,
      default: "left"
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  }
};

export default Object.assign({}, inputsOpt, bind);
