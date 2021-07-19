import { defineComponent, PropType } from 'vue'
import { ElSlider } from 'element-plus'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../define'

export default defineComponent({
  name: 'PjSlider',
  extends: ElSlider,
  props: {
    modelValue: {
      type: [Number, Array] as PropType<number | number[]>,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showInputControls: {
      type: Boolean,
      default: true
    },
    inputSize: {
      type: String,
      default: 'small'
    },
    showStops: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    formatTooltip: {
      type: Function as PropType<(val: number) => number | string>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    debounce: {
      type: Number,
      default: 300
    },
    label: {
      type: String,
      default: undefined
    },
    tooltipClass: {
      type: String,
      default: undefined
    },
    marks: Object
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'input'],
  setup(props, ctx) {
    const { setup } = ElSlider
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
