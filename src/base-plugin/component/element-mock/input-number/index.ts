import { defineComponent, PropType } from 'vue'
import { toRawType } from '@vue/shared'
import { ElInputNumber } from 'element-plus'
import { ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjInputNumber',
  extends: ElInputNumber,
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    modelValue: {
      validator: (val) => {
        return toRawType(val) === 'Number' || val === undefined
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: ''
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10)
    }
  },
  emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
  setup(props, ctx) {
    const { setup } = ElInputNumber
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
