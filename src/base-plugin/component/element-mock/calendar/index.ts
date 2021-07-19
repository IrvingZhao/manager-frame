import { defineComponent, PropType } from 'vue'
import { ElCalendar } from 'element-plus'

export default defineComponent({
  name: 'PjCalendar',
  extends: ElCalendar,
  props: {
    modelValue: { type: Date },
    range: {
      type: Array as PropType<Array<Date>>,
      validator: (range: Date): boolean => {
        if (Array.isArray(range)) {
          return range.length === 2 && range.every((item) => item instanceof Date)
        }
        return false
      }
    }
  },
  emits: ['input', 'update:modelValue'],
  setup(props, ctx) {
    const { setup } = ElCalendar
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
