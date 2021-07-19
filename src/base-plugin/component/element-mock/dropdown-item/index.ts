import { defineComponent } from 'vue'
import { ElDropdownItem } from 'element-plus'

export default defineComponent({
  name: 'PjDropdownItem',
  extends: ElDropdownItem,
  props: {
    command: {
      type: [Object, String, Number],
      default: () => ({})
    },
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  setup(props, ctx) {
    const { setup } = ElDropdownItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
