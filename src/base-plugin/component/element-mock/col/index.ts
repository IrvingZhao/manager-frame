import { defineComponent, PropType } from 'vue'
import { ElCol } from 'element-plus'

type SizeObject = {
  span: number
  offset: number
}

export default defineComponent({
  name: 'PjCol',
  extends: ElCol,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
    xs: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject)
    },
    sm: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject)
    },
    md: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject)
    },
    lg: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject)
    },
    xl: {
      type: [Number, Object] as PropType<number | SizeObject>,
      default: () => ({} as SizeObject)
    }
  },
  setup(props, ctx) {
    const { setup } = ElCol
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
