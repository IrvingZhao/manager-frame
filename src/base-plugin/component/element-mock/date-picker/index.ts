import { defineComponent } from 'vue'
import { ElDatePicker } from 'element-plus'
import { datePickerProps } from '../define'

export default defineComponent({
  name: 'PjDatePicker',
  extends: ElDatePicker,
  props: {
    ...datePickerProps,
    type: {
      type: String,
      default: 'date'
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const { setup } = ElDatePicker
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
