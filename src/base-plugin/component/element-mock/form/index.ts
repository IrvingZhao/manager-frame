import { defineComponent, PropType } from 'vue'
import { ElForm } from 'element-plus'
import { ComponentSize } from '../define'

export default defineComponent({
  name: 'PjForm',
  extends: ElForm,
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: {
      type: String,
      default: '130px'
    },
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String as PropType<ComponentSize>,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    }
  },
  emits: ['validate'],
  setup(props, ctx) {
    const { setup } = ElForm
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
