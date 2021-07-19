import { defineComponent } from 'vue'
import { ElCheckboxButton } from 'element-plus'
import { UPDATE_MODEL_EVENT } from '../define'

export default defineComponent({
  name: 'PjCheckboxButton',
  extends: ElCheckboxButton,
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => undefined
    },
    label: { type: [Boolean, Number, String] },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: undefined
    },
    trueLabel: {
      type: [String, Number],
      default: undefined
    },
    falseLabel: {
      type: [String, Number],
      default: undefined
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { setup } = ElCheckboxButton
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
