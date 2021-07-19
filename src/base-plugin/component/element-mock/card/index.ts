import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'

export default defineComponent({
  name: 'PjCard',
  extends: ElCard,
  props: {
    header: {
      type: String,
      default: ''
    },
    bodyStyle: {
      type: [String, Object, Array],
      default: ''
    },
    shadow: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElCard
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
