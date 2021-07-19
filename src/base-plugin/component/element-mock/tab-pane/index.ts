import { defineComponent } from 'vue'
import { ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'PjTabPane',
  extends: ElTabPane,
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean
  },
  setup(props, ctx) {
    const { setup } = ElTabPane
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
