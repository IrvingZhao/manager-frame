import { defineComponent } from 'vue'
import { ElTimelineItem } from 'element-plus'

export default defineComponent({
  name: 'PjTimelineItem',
  extends: ElTimelineItem,
  props: {
    timestamp: {
      type: String,
      default: ''
    },
    hideTimestamp: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElTimelineItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
