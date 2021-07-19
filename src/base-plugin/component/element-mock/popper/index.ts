import { defineComponent } from 'vue'
import { ElPopper } from 'element-plus'
import { popOverProps } from '../define'

export default defineComponent({
  name: 'PjPopper',
  extends: ElPopper,
  props: popOverProps,
  emits: ['update:visible', 'after-enter', 'after-leave', 'before-enter', 'before-leave'],
  setup(props, ctx) {
    const { setup } = ElPopper
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
