import { defineComponent, PropType } from 'vue'
import { ElRadio } from 'element-plus'
import { UPDATE_MODEL_EVENT, ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjRadio',
  extends: ElRadio,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ''
    },
    border: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { setup } = ElRadio
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
