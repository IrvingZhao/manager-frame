import { defineComponent } from 'vue'
import { ElTimePicker } from 'element-plus'
import { datePickerProps } from '../define'

export default defineComponent({
  name: 'PjTimePicker',
  extends: ElTimePicker,
  props: {
    ...datePickerProps,
    isRange: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const { setup } = ElTimePicker
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
