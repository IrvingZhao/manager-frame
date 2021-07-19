import { defineComponent } from 'vue'
import { ElDropdownMenu } from 'element-plus'

export default defineComponent({
  name: 'PjDropdownMenu',
  extends: ElDropdownMenu,
  setup(props, ctx) {
    const { setup } = ElDropdownMenu
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
