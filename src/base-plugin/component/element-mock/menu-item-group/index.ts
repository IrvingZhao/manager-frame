import { defineComponent } from 'vue'
import { ElMenuItemGroup } from 'element-plus'

export default defineComponent({
  name: 'PjMenuItemGroup',
  extends: ElMenuItemGroup,
  props: { title: { type: String } },
  setup(props, ctx) {
    const { setup } = ElMenuItemGroup
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
