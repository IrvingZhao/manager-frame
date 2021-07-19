import { defineComponent } from 'vue'
import { ElRadioButton } from 'element-plus'

export default defineComponent({
  name: 'PjRadioButton',
  extends: ElRadioButton,
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { setup } = ElRadioButton
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
