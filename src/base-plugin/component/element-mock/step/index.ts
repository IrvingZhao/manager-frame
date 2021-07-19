import { defineComponent } from 'vue'
import { ElStep } from 'element-plus'

export default defineComponent({
  name: 'PjStep',
  extends: ElStep,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: '',
      validator: (val: string): boolean => ['', 'wait', 'process', 'finish', 'error', 'success'].includes(val)
    }
  },
  setup(props, ctx) {
    const { setup } = ElStep
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
