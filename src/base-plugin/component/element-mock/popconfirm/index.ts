import { defineComponent } from 'vue'
import { ElPopconfirm } from 'element-plus'

export default defineComponent({
  name: 'PjPopconfirm',
  extends: ElPopconfirm,
  props: {
    title: { type: String },
    confirmButtonText: { type: String },
    cancelButtonText: { type: String },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'el-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, ctx) {
    const { setup } = ElPopconfirm
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
