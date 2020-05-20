import uuidMixin from './mixin_uuid'

export default {
  mixins: [uuidMixin],
  props: {
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dirty: {
      get: function () {
        return !this.pristine
      },
      set: function (newValue) {
        this.pristine = !newValue
      }
    },
    invalid () {
      return !this.valid
    }
  },
  methods: {
    focusHandler () {
      this.$emit('on-focus');
    },
    blurHandler () {
      thsi.$emit('on-blur', this.currentValue);
    }
  },
  watch: {
    value (newVal) {
      if (this.pristine === true) {
        this.pristine = false
      }
      if (!this.handleChangeEvent) {
        this.$emit('on-change', newVal)
        this.$emit('input', newVal)
      }
    }
  },
}

