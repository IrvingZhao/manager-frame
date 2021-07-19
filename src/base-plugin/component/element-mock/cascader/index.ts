import { defineComponent, PropType } from 'vue'
import { ElCascader } from 'element-plus'
import { t } from 'element-plus/lib/locale'
import { CascaderValue, CascaderOption, CascaderProps, CascaderNode } from './config'

export declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export default defineComponent({
  name: 'PjCascader',
  extends: ElCascader,
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
    size: {
      type: String as PropType<ComponentSize>,
      validator: (val: string) => ['', 'large', 'medium', 'small', 'mini'].includes(val)
    },
    placeholder: {
      type: String,
      default: () => t('el.cascader.placeholder')
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function as PropType<(node: CascaderNode, keyword: string) => boolean>,
      default: (node: CascaderNode, keyword: string) => node.text.includes(keyword)
    },
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function as PropType<(value: string) => boolean | Promise<any>>,
      default: () => true
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'visible-change', 'expand-change', 'remove-tag'],
  setup(props, ctx) {
    const { setup } = ElCascader
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
