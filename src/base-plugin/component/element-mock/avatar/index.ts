import { defineComponent, PropType } from 'vue'
import { ElAvatar } from 'element-plus'

export default defineComponent({
  name: 'PjAvatar',
  extends: ElAvatar,
  props: {
    size: {
      type: [Number, String] as PropType<number | string>,
      validator(this: never, val: unknown) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val)
        }
        return typeof val === 'number'
      },
      default: 'large'
    },
    shape: {
      type: String,
      default: 'circle',
      validator(this: never, val: string) {
        return ['circle', 'square'].includes(val)
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    fit: {
      type: String,
      default: 'cover'
    }
  },
  emits: ['error'],
  setup(props, ctx) {
    const { setup } = ElAvatar
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
