import { defineComponent } from 'vue'
import { ElBadge } from 'element-plus'

export default defineComponent({
  name: 'PjBadge',
  extends: ElBadge,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: Number,
      default: 99
    },
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      default: 'primary',
      validator: (val: string) => {
        return ['primary', 'success', 'warning', 'info', 'danger'].includes(val)
      }
    }
  },
  setup(props, ctx) {
    const { setup } = ElBadge
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
