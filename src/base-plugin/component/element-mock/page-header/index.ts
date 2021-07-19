import { defineComponent } from 'vue'
import { ElPageHeader } from 'element-plus'
import { t } from 'element-plus/lib/locale'

export default defineComponent({
  name: 'PjPageHeader',
  extends: ElPageHeader,
  props: {
    title: {
      type: String,
      default: () => t('el.pageHeader.title')
    },
    content: {
      type: String,
      default: ''
    }
  },
  emits: ['back'],
  setup(props, ctx) {
    const { setup } = ElPageHeader
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
