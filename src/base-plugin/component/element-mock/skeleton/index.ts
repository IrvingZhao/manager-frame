import { defineComponent } from 'vue'
import { ElSkeleton } from 'element-plus'

export default defineComponent({
  name: 'PjSkeleton',
  extends: ElSkeleton,
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 3
    },
    loading: {
      type: Boolean,
      default: true
    },
    throttle: { type: Number }
  },
  setup(props, ctx) {
    const { setup } = ElSkeleton
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
