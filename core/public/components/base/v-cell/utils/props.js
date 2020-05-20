export default function () {
  return {
    title: [String, Number],
    value: [String, Number, Array],
    isLink: Boolean,
    isLoading: Boolean,
    titleType: Object,
    inlineDesc: [String, Number],
    primary: {
      type: String,
      default: 'title'
    },
    link: [String, Object],
    valueAlign: [String, Boolean, Number],
    borderIntent: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    arrowDirection: String, // down or up
    alignItems: String,
    hasArrow: {
      type: Boolean,
      default: true
    },
    valueStyle: Object
  }
}
