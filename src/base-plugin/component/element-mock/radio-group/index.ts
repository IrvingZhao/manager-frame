import { defineComponent, PropType } from 'vue'
import { ElRadioGroup } from 'element-plus'
import { UPDATE_MODEL_EVENT, ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjRadioGroup',
  extends: ElRadioGroup,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    fill: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { setup } = ElRadioGroup
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
