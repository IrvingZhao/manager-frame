import { PropType } from 'vue'
import { Placement, Options, PositioningStrategy } from '@popperjs/core'

export const UPDATE_MODEL_EVENT = 'update:modelValue'
export const CHANGE_EVENT = 'change'
export const isValidComponentSize = (val: string) => ['', 'large', 'medium', 'small', 'mini'].includes(val)
export declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
export const generateId = (): number => Math.floor(Math.random() * 10000)
export const datePickerProps = {
  name: {
    type: [Array, String],
    default: ''
  },
  popperClass: {
    type: String,
    default: ''
  },
  format: { type: String },
  type: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  clearIcon: {
    type: String,
    default: 'el-icon-circle-close'
  },
  editable: {
    type: Boolean,
    default: true
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [Date, Array, String] as PropType<string | Date | Date[]>,
    default: ''
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  startPlaceholder: String,
  endPlaceholder: String,
  defaultValue: { type: [Date, Array] as PropType<Date | Date[]> },
  defaultTime: { type: [Date, Array] as PropType<Date | Date[]> },
  isRange: {
    type: Boolean,
    default: false
  },
  disabledHours: { type: Function },
  disabledMinutes: { type: Function },
  disabledSeconds: { type: Function },
  disabledDate: { type: Function },
  cellClassName: { type: Function },
  shortcuts: {
    type: Array,
    default: () => []
  },
  arrowControl: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  unlinkPanels: Boolean
}

export type Effect = 'dark' | 'light'

export type TriggerType = 'click' | 'hover' | 'focus' | 'manual'

export type Trigger = TriggerType | TriggerType[]

export const popOverProps = {
  // the arrow size is an equailateral triangle with 10px side length, the 3rd side length ~ 14.1px
  // adding a offset to the ceil of 4.1 should be 5 this resolves the problem of arrow overflowing out of popper.
  arrowOffset: {
    type: Number,
    default: 5
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  },
  boundariesPadding: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  style: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  cutoff: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  effect: {
    type: String as PropType<Effect>,
    default: 'dark'
  },
  enterable: {
    type: Boolean,
    default: true
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  showAfter: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom' as Placement
  },
  popperClass: {
    type: String,
    default: ''
  },
  pure: {
    type: Boolean,
    default: false
  },
  // Once this option were given, the entire popper is under the users' control, top priority
  popperOptions: {
    type: Object as PropType<Options>,
    default: () => null
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  strategy: {
    type: String as PropType<PositioningStrategy>,
    default: 'fixed' as PositioningStrategy
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  trigger: {
    type: [String, Array] as PropType<Trigger>,
    default: 'hover'
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  }
}
