import { defineComponent } from 'vue'
import { ElDropdown } from 'element-plus'

export default defineComponent({
  name: 'PjDropdown',
  extends: ElDropdown,
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    type: String,
    size: {
      type: String,
      default: ''
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    showTimeout: {
      type: Number,
      default: 150
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    },
    effect: {
      type: String,
      default: 'light'
    },
    maxHeight: {
      type: [Number, String],
      default: ''
    }
  },
  emits: ['visible-change', 'click', 'command'],
  setup(props, ctx) {
    const { setup } = ElDropdown
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
