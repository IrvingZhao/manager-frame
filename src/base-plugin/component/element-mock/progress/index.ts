import { defineComponent } from 'vue'
import { ElProgress } from 'element-plus'

export default defineComponent({
  name: 'PjProgress',
  extends: ElProgress,
  props: {
    type: {
      type: String,
      default: 'line',
      validator: (val: string): boolean => ['line', 'circle', 'dashboard'].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val: number): boolean => val >= 0 && val <= 100
    },
    status: {
      type: String,
      default: '',
      validator: (val: string): boolean => ['', 'success', 'exception', 'warning'].indexOf(val) > -1
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    },
    color: {
      type: [String, Array, Function],
      default: ''
    },
    format: {
      type: Function,
      default: (percentage: number): string => `${percentage}%`
    }
  },
  setup(props, ctx) {
    const { setup } = ElProgress
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
