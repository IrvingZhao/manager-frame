import { defineComponent, PropType } from 'vue'
import { ElAlert } from 'element-plus'

export default defineComponent({
  name: 'PjAlert',
  extends: ElAlert,
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'success' | 'info' | 'error' | 'warning'>,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: (value: string): boolean => ['light', 'dark'].indexOf(value) > -1
    }
  },
  emits: ['close'],
  setup(props, ctx) {
    const { setup } = ElAlert
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
