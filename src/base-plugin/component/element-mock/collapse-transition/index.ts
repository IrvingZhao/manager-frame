import { defineComponent } from 'vue'
import { ElCollapseTransition } from 'element-plus'

export default defineComponent({
  name: 'PjCollapseTransition',
  extends: ElCollapseTransition,
  setup(props, ctx) {
    const { setup } = ElCollapseTransition
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
