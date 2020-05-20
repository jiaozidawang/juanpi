export default {
	value: {
		type: Boolean,
		default: false
	},
	horizontal: {
		type: String,
		default: 'left'
	},
	vertical: {
		type: String,
		default: 'top'
	},
	checkboxClass: {
		type: Object,
		default () {
			return {}
		}
	}
}