export default {
  title: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: "请输入"
  },
  readonly: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: "right"
  },
  value: {
    type: [String, Number],
    default: ""
  },
  maxlength: {
    type: [Number, String],
    default: ""
  },
  isWarn: {
    type: Boolean,
    default: false
  },
  disabled: String,
  iconType: String,
  preIcon: String
};
