import { defineComponent, PropType } from 'vue'
import { ElSelect } from 'element-plus'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT, ComponentSize, isValidComponentSize } from '../define'

export default defineComponent({
  name: 'PjSelect',
  extends: ElSelect,
  props: {
    name: String,
    id: String,
    modelValue: [Array, String, Number, Boolean, Object],
    autocomplete: {
      type: String,
      default: 'off'
    },
    automaticDropdown: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: ''
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: { type: String },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    }
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'remove-tag', 'clear', 'visible-change', 'focus', 'blur'],
  setup(props, ctx) {
    const { setup } = ElSelect
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
