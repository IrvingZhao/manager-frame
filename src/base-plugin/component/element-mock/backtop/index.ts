import { defineComponent } from 'vue'
import { ElBacktop } from 'element-plus'

export default defineComponent({
  name: 'PjBacktop',
  extends: ElBacktop,
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  emits: ['click'],
  setup(props, ctx) {
    const { setup } = ElBacktop
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
