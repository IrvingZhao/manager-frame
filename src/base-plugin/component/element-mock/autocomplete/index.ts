import { defineComponent, PropType } from 'vue'
import { ElAutocomplete } from 'element-plus'
import { NOOP } from '@vue/shared'

export default defineComponent({
  name: 'PjAutocomplete',
  extends: ElAutocomplete,
  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      validator: (val: string): boolean => {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(val)
      },
      default: 'bottom-start'
    },
    fetchSuggestions: {
      type: Function as PropType<(queryString: string, cb: (data: any[]) => void) => void>,
      default: NOOP
    },
    popperClass: {
      type: String,
      default: ''
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear', 'select'],
  setup(props, ctx) {
    const { setup } = ElAutocomplete
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
