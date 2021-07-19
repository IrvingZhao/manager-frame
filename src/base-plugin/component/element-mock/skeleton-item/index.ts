import { defineComponent, PropType } from 'vue'
import { ElSkeletonItem } from 'element-plus'

export type Variants = 'circle' | 'rect' | 'h1' | 'h3' | 'text' | 'caption' | 'p' | 'image' | 'button'

export default defineComponent({
  name: 'PjSkeletonItem',
  extends: ElSkeletonItem,
  props: {
    variant: {
      type: String as PropType<Variants>,
      default: 'text'
    }
  },
  setup(props, ctx) {
    const { setup } = ElSkeletonItem
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
