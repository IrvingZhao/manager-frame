import { defineComponent, PropType } from 'vue'
import { ElTag } from 'element-plus'
import { ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjTag',
  extends: ElTag,
  props: {
    closable: Boolean,
    type: {
      type: String,
      default: ''
    },
    hit: Boolean,
    disableTransitions: Boolean,
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    effect: {
      type: String,
      default: 'light',
      validator: (val: string): boolean => {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      }
    }
  },
  emits: ['close', 'click'],
  setup(props, ctx) {
    const { setup } = ElTag
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
