import { defineComponent } from 'vue'
import { ElOption } from 'element-plus'

export default defineComponent({
  name: 'PjOption',
  extends: ElOption,
  props: {
    value: {
      required: true,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { setup } = ElOption
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
