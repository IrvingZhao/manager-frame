import { defineComponent, PropType } from 'vue'
import { ElPopover } from 'element-plus'
import { popOverProps, TriggerType } from '../define'

const emits = ['update:visible', 'after-enter', 'after-leave', 'show', 'hide']

export default defineComponent({
  name: 'PjPopover',
  extends: ElPopover,
  props: {
    ...popOverProps,
    content: { type: String },
    trigger: {
      type: String as PropType<TriggerType>,
      default: 'click'
    },
    title: { type: String },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    width: {
      type: [String, Number],
      default: 150
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  emits,
  setup(props, ctx) {
    const { setup } = ElPopover
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
