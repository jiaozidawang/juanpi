export default {
	namespace: {
		type: String,
		default: ''
	},
	/**
	 * 页面类型 input、list、confirm、success、fail、info
	 */
	type: {
		type: String,
		default: 'info'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
}
