import { defineComponent } from 'vue'
import { ElBreadcrumb } from 'element-plus'

export default defineComponent({
  name: 'PjBreadcrumb',
  extends: ElBreadcrumb,
  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElBreadcrumb
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
