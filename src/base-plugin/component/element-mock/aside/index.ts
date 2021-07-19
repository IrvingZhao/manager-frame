import { defineComponent } from 'vue'
import { ElAside } from 'element-plus'

export default defineComponent({
  name: 'PjAside',
  extends: ElAside,
  props: {
    width: {
      type: String,
      default: '300px'
    }
  },
  setup(props, ctx) {
    const { setup } = ElAside
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
