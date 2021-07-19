import { defineComponent } from 'vue'
import { ElContainer } from 'element-plus'

export default defineComponent({
  name: 'PjContainer',
  extends: ElContainer,
  props: {
    direction: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElContainer
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
