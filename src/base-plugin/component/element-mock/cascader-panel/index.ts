import { defineComponent, PropType } from 'vue'
import { ElCascaderPanel } from 'element-plus'
import { CascaderValue, CascaderProps, CascaderOption, RenderLabel } from '../cascader/config'

export declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export default defineComponent({
  name: 'PjCascaderPanel',
  extends: ElCascaderPanel,
  props: {
    modelValue: [Number, String, Array] as PropType<CascaderValue>,
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => [] as CascaderOption[]
    },
    props: {
      type: Object as PropType<CascaderProps>,
      default: () => ({} as CascaderProps)
    },
    border: {
      type: Boolean,
      default: true
    },
    renderLabel: Function as PropType<RenderLabel>
  },
  emits: ['update:modelValue', 'change', 'close', 'expand-change'],
  setup(props, ctx) {
    const { setup } = ElCascaderPanel
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
