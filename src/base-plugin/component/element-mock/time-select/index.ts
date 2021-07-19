import { defineComponent } from 'vue'
import { ElTimeSelect } from 'element-plus'

export default defineComponent({
  name: 'PjTimeSelect',
  extends: ElTimeSelect,
  props: {
    modelValue: String,
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '',
      validator: (value: string) => !value || ['medium', 'small', 'mini'].indexOf(value) !== -1
    },
    placeholder: {
      type: String,
      default: ''
    },
    start: {
      type: String,
      default: '09:00'
    },
    end: {
      type: String,
      default: '18:00'
    },
    step: {
      type: String,
      default: '00:30'
    },
    minTime: {
      type: String,
      default: ''
    },
    maxTime: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: 'el-icon-time'
    },
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    }
  },
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup(props, ctx) {
    const { setup } = ElTimeSelect
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
