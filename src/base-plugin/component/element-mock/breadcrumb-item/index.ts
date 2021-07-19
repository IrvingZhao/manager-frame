import { defineComponent } from 'vue'
import { ElBreadcrumbItem } from 'element-plus'

export default defineComponent({
  name: 'PjBreadcrumbItem',
  extends: ElBreadcrumbItem,
  props: {
    to: {
      type: [String, Object],
      default: ''
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { setup } = ElBreadcrumbItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
