import { defineComponent, PropType } from 'vue'
import { ElAffix } from 'element-plus'

type Position = 'top' | 'bottom'

export default defineComponent({
  name: 'PjAffix',
  extends: ElAffix,
  props: {
    zIndex: {
      type: Number,
      default: 100
    },
    target: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String as PropType<Position>,
      default: 'top'
    }
  },
  emits: ['scroll', 'change'],
  setup(props, ctx) {
    const { setup } = ElAffix
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
