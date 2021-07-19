import { defineComponent } from 'vue'
import { ElOptionGroup } from 'element-plus'

export default defineComponent({
  name: 'PjOptionGroup',
  extends: ElOptionGroup,
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { setup } = ElOptionGroup
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
