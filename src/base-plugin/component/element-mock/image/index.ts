import { defineComponent, PropType } from 'vue'
import { ElImage } from 'element-plus'

export default defineComponent({
  name: 'PjImage',
  extends: ElImage,
  props: {
    hideOnClickModal: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    scrollContainer: {
      type: [String, Object],
      default: null
    },
    previewSrcList: {
      type: Array as PropType<string[]>,
      default: () => [] as string[]
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  emits: ['error'],
  setup(props, ctx) {
    const { setup } = ElImage
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
