import { defineComponent, PropType, ref, watch } from 'vue'
import { ComponentSize, isValidComponentSize, UPDATE_MODEL_EVENT } from '../element-mock/define'

const PASS_REG = [/[a-z]+/, /[0-9]+/, /[A-Z]+/, /[~!@#$%^&*()_+]+/]
const STATUS = ['exception', 'exception', 'warning', 'success']
const EMITS = [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear', 'mouseleave', 'mouseenter', 'keydown']

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
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
  emits: EMITS,
  render(ctx, cache, props) {
    const { $slots } = this
    const events: any = {}
    EMITS.forEach((type) => {
      const key = `on${type[0].toUpperCase()}${type.substring(1)}`
      events[key] = ctx.mockEvent(type)
    })

    const $input = <pj-input {...props} {...events} type={'password'} v-slots={$slots} />
    const $propcess = <pj-progress {...ctx.progressProp} style={{ marginTop: '10px' }} />
    return (
      <div>
        {$input}
        {$propcess}
      </div>
    )
  },
  setup(props, ctx) {
    const progressProp = ref<any>({
      status: '',
      percentage: 0,
      showText: false
    })

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          const matchSize = PASS_REG.filter((item) => item.test(newVal)).length
          progressProp.value.percentage = Math.floor((100 / PASS_REG.length) * matchSize)
          progressProp.value.status = STATUS[matchSize] || 'success'
        } else {
          progressProp.value.percentage = 0
          progressProp.value.status = ''
        }
      }
    )

    const mockEvent = (type) => {
      return (val) => {
        ctx.emit(type, val)
      }
    }

    return { progressProp, mockEvent }
  }
})
