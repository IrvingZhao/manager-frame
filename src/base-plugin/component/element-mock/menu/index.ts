import { defineComponent } from 'vue'
import { ElMenu } from 'element-plus'

export default defineComponent({
  name: 'PjMenu',
  extends: ElMenu,
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: {
      type: String,
      default: 'hover'
    },
    collapse: Boolean,
    backgroundColor: { type: String },
    textColor: { type: String },
    activeTextColor: { type: String },
    collapseTransition: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const { setup } = ElMenu
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
