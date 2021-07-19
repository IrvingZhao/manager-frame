import { defineComponent, PropType } from 'vue'
import { ElCollapseItem } from 'element-plus'
import { generateId } from '../define'

export default defineComponent({
  name: 'PjCollapseItem',
  extends: ElCollapseItem,
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number] as PropType<string | number>,
      default: () => {
        return generateId()
      }
    },
    disabled: Boolean
  },
  setup(props, ctx) {
    const { setup } = ElCollapseItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
