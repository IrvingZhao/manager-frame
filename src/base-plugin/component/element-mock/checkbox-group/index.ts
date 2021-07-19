import { defineComponent, PropType } from 'vue'
import { ElCheckboxGroup } from 'element-plus'
import { isValidComponentSize, UPDATE_MODEL_EVENT, ComponentSize } from '../define'

export default defineComponent({
  name: 'PjCheckboxGroup',
  extends: ElCheckboxGroup,
  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      default: () => undefined
    },
    disabled: Boolean,
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    fill: {
      type: String,
      default: undefined
    },
    textColor: {
      type: String,
      default: undefined
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { setup } = ElCheckboxGroup
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
