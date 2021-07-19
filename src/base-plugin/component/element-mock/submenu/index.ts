import { defineComponent } from 'vue'
import { ElSubmenu } from 'element-plus'

export default defineComponent({
  name: 'PjSubmenu',
  extends: ElSubmenu,
  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    }
  },
  setup(props, ctx) {
    const { setup } = ElSubmenu
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
