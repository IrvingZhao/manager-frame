import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { UPDATE_MODEL_EVENT, popOverProps } from '../define'

export default defineComponent({
  name: 'PjBreadcrumbItem',
  extends: ElTooltip,
  props: {
    ...popOverProps,
    manual: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      validator: (val: unknown) => {
        return typeof val === 'boolean'
      },
      default: undefined
    },
    // This API should be decaprecate since it's confusing with close-delay
    openDelay: {
      type: Number,
      default: 0
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const { setup } = ElTooltip
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
