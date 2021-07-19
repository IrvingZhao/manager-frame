import { defineComponent } from 'vue'
import { ElDivider } from 'element-plus'

export default defineComponent({
  name: 'PjDivider',
  extends: ElDivider,
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val: string): boolean {
        return ['horizontal', 'vertical'].indexOf(val) !== -1
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val: string): boolean {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      }
    }
  },
  setup(props, ctx) {
    const { setup } = ElDivider
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
