import { defineComponent } from 'vue'
import { ElSteps } from 'element-plus'

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
      validator(val: string) {
        return ['horizontal', 'vertical'].includes(val)
      }
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
      validator(val: string) {
        return ['wait', 'process', 'finish', 'error', 'success'].includes(val)
      }
    },
    processStatus: {
      type: String,
      default: 'process',
      validator(val: string) {
        return ['wait', 'process', 'finish', 'error', 'success'].includes(val)
      }
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const { setup } = ElSteps
    if (setup) {
      return setup(props, ctx)
    }
    throw new Error('cannot find steps setup')
  }
})
