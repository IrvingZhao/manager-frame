import { defineComponent, PropType } from 'vue'
import { ElCheckbox } from 'element-plus'
import { isValidComponentSize, UPDATE_MODEL_EVENT, ComponentSize } from '../define'

export default defineComponent({
  name: 'PjCheckbox',
  extends: ElCheckbox,
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
    },
    id: {
      type: String,
      default: undefined
    },
    controls: {
      type: String,
      default: undefined
    },
    border: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { setup } = ElCheckbox
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
