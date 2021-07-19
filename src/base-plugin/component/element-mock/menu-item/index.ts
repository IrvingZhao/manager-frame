import { defineComponent } from 'vue'
import { ElMenuItem } from 'element-plus'

export default defineComponent({
  name: 'PjMenuItem',
  extends: ElMenuItem,
  props: {
    index: {
      default: null,
      validator: (val) => typeof val === 'string' || val === null
    },
    route: [String, Object],
    disabled: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    const { setup } = ElMenuItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
