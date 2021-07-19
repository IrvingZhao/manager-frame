import { defineComponent, PropType } from 'vue'
import { ElImageViewer } from 'element-plus'

export default defineComponent({
  name: 'PjImageViewer',
  extends: ElImageViewer,
  props: {
    urlList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    infinite: {
      type: Boolean,
      default: true
    },
    hideOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'switch'],
  setup(props, ctx) {
    const { setup } = ElImageViewer
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
