import { defineComponent } from 'vue'
import { ElMain } from 'element-plus'

export default defineComponent({
  name: 'PjMain',
  extends: ElMain,
  setup(props, ctx) {
    const { setup } = ElMain
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
