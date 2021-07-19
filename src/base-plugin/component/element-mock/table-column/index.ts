import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'

export default defineComponent({
  name: 'PjTableColumn',
  extends: ElTableColumn,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {
      type: [Object, Number, String],
      default: () => {
        return {}
      }
    },
    minWidth: {
      type: [Object, Number, String],
      default: () => {
        return {}
      }
    },
    renderHeader: Function,
    sortable: {
      type: [Boolean, String],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default() {
        return ['ascending', 'descending', null]
      },
      validator(val: Array<string | null>) {
        return val.every((order: string | null) => ['ascending', 'descending', null].indexOf(order) > -1)
      }
    }
  },
  setup(props, ctx) {
    const { setup } = ElTableColumn
    if (setup) {
      return setup(props, ctx)
    }
    return undefined
  }
})
