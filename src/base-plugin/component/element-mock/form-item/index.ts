import { defineComponent, PropType } from 'vue'
import { ElFormItem } from 'element-plus'
import { RuleItem } from 'async-validator'
import { ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjFormItem',
  extends: ElFormItem,
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array] as PropType<RuleItem | RuleItem[]>,
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: {
      types: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    }
  },
  setup(props, ctx) {
    const { setup } = ElFormItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
