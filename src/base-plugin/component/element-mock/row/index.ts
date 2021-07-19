import { defineComponent } from 'vue'
import { ElRow } from 'element-plus'

export default defineComponent({
  name: 'PjRow',
  extends: ElRow,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },
  setup(props, ctx) {
    const { setup } = ElRow
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
