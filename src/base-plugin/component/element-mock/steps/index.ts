import { defineComponent } from 'vue'
import { ElSteps } from 'element-plus'
import { CHANGE_EVENT } from '../define'

export default defineComponent({
  name: 'PjSteps',
  extends: ElSteps,
  props: {
    space: {
      type: [Number, String],
      default: ''
    },
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string): boolean => ['horizontal', 'vertical'].includes(val)
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: 'finish',
      validator: (val: string): boolean => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
    },
    processStatus: {
      type: String,
      default: 'process',
      validator: (val: string): boolean => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
    }
  },
  emits: [CHANGE_EVENT],
  setup(props, ctx) {
    const { setup } = ElSteps
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
