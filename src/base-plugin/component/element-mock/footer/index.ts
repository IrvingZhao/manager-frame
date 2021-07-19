import { defineComponent } from 'vue'
import { ElFooter } from 'element-plus'

export default defineComponent({
  name: 'PjFooter',
  extends: ElFooter,
  props: {
    height: {
      type: String,
      default: '60px'
    }
  },
  setup(props, ctx) {
    const { setup } = ElFooter
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
