import { defineComponent, PropType } from 'vue'
import { ElTabs } from 'element-plus'

type BeforeLeave = (newTabName: string, oldTabName: string) => void | Promise<void> | boolean

export default defineComponent({
  name: 'PjTabs',
  extends: ElTabs,
  props: {
    type: {
      type: String,
      default: ''
    },
    activeName: {
      type: String,
      default: ''
    },
    closable: Boolean,
    addable: Boolean,
    modelValue: {
      type: String,
      default: ''
    },
    editable: Boolean,
    tabPosition: {
      type: String,
      default: 'top'
    },
    beforeLeave: {
      type: Function as PropType<BeforeLeave>,
      default: null
    },
    stretch: Boolean
  },
  emits: ['tab-click', 'edit', 'tab-remove', 'tab-add', 'input', 'update:modelValue'],
  setup(props, ctx) {
    const { setup } = ElTabs
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
