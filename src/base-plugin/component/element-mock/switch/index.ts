import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { ElSwitch } from 'element-plus'

export default defineComponent({
  name: 'PjSwitch',
  extends: ElSwitch,
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: {
      type: String,
      default: ''
    },
    inactiveText: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    loading: {
      type: Boolean,
      default: false
    },
    beforeChange: Function as PropType<() => Promise<boolean> | boolean>
  },
  emits: ['update:modelValue', 'change', 'input'],
  setup(props, ctx) {
    const { setup } = ElSwitch
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
