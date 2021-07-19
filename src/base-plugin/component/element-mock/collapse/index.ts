import { defineComponent, PropType } from 'vue'
import { ElCollapse } from 'element-plus'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../define'

export default defineComponent({
  name: 'PjCollapse',
  extends: ElCollapse,
  props: {
    accordion: Boolean,
    modelValue: {
      type: [Array, String, Number] as PropType<string | number | Array<string | number>>,
      default: () => []
    }
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props, ctx) {
    const { setup } = ElCollapse
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
