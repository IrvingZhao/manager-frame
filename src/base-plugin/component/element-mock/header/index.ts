import { defineComponent } from 'vue'
import { ElHeader } from 'element-plus'

export default defineComponent({
  name: 'PjHeader',
  extends: ElHeader,
  props: {
    height: {
      type: String,
      default: '60px'
    }
  },
  setup(props, ctx) {
    const { setup } = ElHeader
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
