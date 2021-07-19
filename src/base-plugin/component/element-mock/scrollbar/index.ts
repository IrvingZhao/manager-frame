import { defineComponent } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { ElScrollbar } from 'element-plus'

export default defineComponent({
  name: 'PjScrollbar',
  extends: ElScrollbar,
  props: {
    height: {
      type: [String, Number],
      default: ''
    },
    maxHeight: {
      type: [String, Number],
      default: ''
    },
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [String, Array] as PropType<string | CSSProperties[]>,
      default: ''
    },
    wrapClass: {
      type: [String, Array],
      default: ''
    },
    viewClass: {
      type: [String, Array],
      default: ''
    },
    viewStyle: {
      type: [String, Array],
      default: ''
    },
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    },
    always: {
      type: Boolean,
      default: false
    }
  },
  emits: ['scroll'],
  setup(props, ctx) {
    const { setup } = ElScrollbar
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
