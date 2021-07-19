import { defineComponent } from 'vue'
import { ElEmpty } from 'element-plus'

export default defineComponent({
  name: 'PjEmpty',
  extends: ElEmpty,
  props: {
    image: {
      type: String,
      default: ''
    },
    imageSize: Number,
    description: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElEmpty
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
