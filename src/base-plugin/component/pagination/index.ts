import { defineComponent, ref, h } from 'vue'
import { ElPagination } from 'element-plus'

export default defineComponent({
  name: 'PjPagination',
  props: {
    pageInfo: { type: Object },
    pageSize: {
      type: Number,
      default: 10
    },
    small: Boolean,
    total: { type: Number },
    pageCount: { type: Number },
    pagerCount: {
      type: Number,
      validator: (value: number) => {
        return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1
      },
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes'
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50]
      }
    },
    popperClass: {
      type: String,
      default: ''
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    background: Boolean,
    disabled: Boolean,
    hideOnSinglePage: Boolean
  },
  emits: ['size-change', 'current-change', 'prev-click', 'next-click', 'update:currentPage', 'update:pageSize'],
  setup(props, ctx) {
    const wrapEvent = (key) => {
      return (val) => {
        ctx.emit(key, val)
      }
    }

    return { wrapEvent }
  },
  render(ctx, cache, props) {
    const pageInfo = ref(props.pageInfo).value
    const newProps = {
      ...props,
      pageSize: pageInfo?.pageSize || props.pageSize,
      currentPage: pageInfo?.pageIndex || props.currentPage,
      total: pageInfo?.total || props.total || 0,
      'onSize-change': ctx.wrapEvent('size-change'),
      'onCurrent-change': ctx.wrapEvent('current-change'),
      'onPrev-click': ctx.wrapEvent('prev-click'),
      'onNext-click': ctx.wrapEvent('next-click'),
      'onUpdate:currentPage': ctx.wrapEvent('update:currentPage'),
      'onUpdate:pageSize': ctx.wrapEvent('update:pageSize')
    }
    const component = ElPagination
    return h(component, { ...newProps })
  }
})
