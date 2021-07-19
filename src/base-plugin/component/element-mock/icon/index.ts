import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'

export default defineComponent({
  name: 'PjIcon',
  extends: ElIcon,
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElIcon
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
