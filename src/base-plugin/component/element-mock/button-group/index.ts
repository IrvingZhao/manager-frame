import { defineComponent } from 'vue'
import { ElButtonGroup } from 'element-plus'

export default defineComponent({
  name: 'PjButtonGroup',
  extends: ElButtonGroup,
  setup(props, ctx) {
    const { setup } = ElButtonGroup
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
