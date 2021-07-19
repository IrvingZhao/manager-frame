import { defineComponent, PropType } from 'vue'
import { ElInput } from 'element-plus'
import { isValidComponentSize, ComponentSize, UPDATE_MODEL_EVENT } from '../define'

type AutosizeProp =
  | {
      minRows?: number
      maxRows?: number
    }
  | boolean

export default defineComponent({
  name: 'PjInput',
  extends: ElInput,
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    resize: {
      type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
      validator: (val: string) => ['none', 'both', 'horizontal', 'vertical'].includes(val)
    },
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    placeholder: { type: String },
    form: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    label: { type: String },
    tabindex: { type: String },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  emits: [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear', 'mouseleave', 'mouseenter', 'keydown'],
  setup(props, ctx) {
    const { setup } = ElInput
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
