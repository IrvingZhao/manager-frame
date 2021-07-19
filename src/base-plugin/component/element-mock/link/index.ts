import { defineComponent, PropType } from 'vue'
import { ElLink } from 'element-plus'

type ILinkType = PropType<'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'>

export default defineComponent({
  name: 'PjLink',
  extends: ElLink,
  props: {
    type: {
      type: String as ILinkType,
      default: 'default',
      validator: (val: string) => {
        return ['default', 'primary', 'success', 'warning', 'info', 'danger'].includes(val)
      }
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: '' },
    icon: { type: String, default: '' }
  },
  emits: ['click'],
  setup(props, ctx) {
    const { setup } = ElLink
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
