import { defineComponent, PropType, isVNode, VNodeChild, CSSProperties } from 'vue'
import { ElSpace } from 'element-plus'
import { isString, isArray } from '@vue/shared'
import { ComponentSize, isValidComponentSize } from '../define'

const isNumber = (val: unknown) => typeof val === 'number'

export default defineComponent({
  name: 'PjSpace',
  extends: ElSpace,
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },

    class: {
      type: [String, Object, Array],
      default: ''
    },

    style: { type: [String, Array, Object] as PropType<string | Array<any> | CSSProperties> },

    alignment: {
      type: String as PropType<''>,
      default: 'center'
    },

    prefixCls: { type: String },

    spacer: {
      type: [Object, String, Number] as PropType<VNodeChild>,
      default: null,
      validator: (val: unknown) => {
        return isVNode(val) || isNumber(val) || isString(val)
      }
    },

    wrap: {
      type: Boolean,
      default: false
    },

    size: {
      type: [String, Array, Number] as PropType<ComponentSize | [number, number] | number>,
      validator: (val: unknown) => {
        return isValidComponentSize(val as string) || isNumber(val) || isArray(val)
      }
    }
  },
  setup(props, ctx) {
    const { setup } = ElSpace
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
