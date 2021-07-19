import { defineComponent } from 'vue'
import { ElTimeline } from 'element-plus'

export default defineComponent({
  name: 'PjTimeline',
  extends: ElTimeline,
  setup(props, ctx) {
    const { setup } = ElTimeline
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
