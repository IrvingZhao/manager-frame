import { defineComponent, PropType } from 'vue'
import { ElColorPicker } from 'element-plus'
import { UPDATE_MODEL_EVENT, isValidComponentSize, ComponentSize } from '../define'

export default defineComponent({
  name: 'PjColorPicker',
  extends: ElColorPicker,
  props: {
    modelValue: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    popperClass: String,
    predefine: Array
  },
  emits: ['change', 'active-change', UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const { setup } = ElColorPicker
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
