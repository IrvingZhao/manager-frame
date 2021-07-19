import { defineComponent, PropType, VNode } from 'vue'
import { ElTransfer } from 'element-plus'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../define'

type Key = string | number

type DataItem = {
  key: Key
  label: string
  disabled: boolean
}
type Format = {
  noChecked: string
  hasChecked: string
}

type Props = {
  label: string
  key: string
  disabled: string
}
type TargetOrder = 'original' | 'push' | 'unshift'

export default defineComponent({
  name: 'PjTransfer',
  extends: ElTransfer,
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
      default: () => []
    },
    titles: {
      type: Array as PropType<any> as PropType<[string, string]>,
      default: () => []
    },
    buttonTexts: {
      type: Array as PropType<any> as PropType<[string, string]>,
      default: () => []
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function as PropType<(query: string, item: DataItem) => boolean>,
    leftDefaultChecked: {
      type: Array as PropType<Key[]>,
      default: () => []
    },
    rightDefaultChecked: {
      type: Array as PropType<Key[]>,
      default: () => []
    },
    renderContent: Function as PropType<(h, option) => VNode>,
    modelValue: {
      type: Array as PropType<Key[]>,
      default: () => []
    },
    format: {
      type: Object as PropType<Format>,
      default: () => ({})
    },
    filterable: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object as PropType<Props>,
      default: () => ({
        label: 'label',
        key: 'key',
        disabled: 'disabled'
      })
    },
    targetOrder: {
      type: String as PropType<TargetOrder>,
      default: 'original',
      validator: (val: string) => {
        return ['original', 'push', 'unshift'].includes(val)
      }
    }
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'left-check-change', 'right-check-change'],
  setup(props, ctx) {
    const { setup } = ElTransfer
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
