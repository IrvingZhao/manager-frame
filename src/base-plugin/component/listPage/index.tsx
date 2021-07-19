import { defineComponent, provide, ref } from 'vue'
import './style.scss'

export interface ListPageContext {
  dialogSearch: boolean
}

export default defineComponent({
  name: 'PjListPage',
  props: {
    followForm: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    provide('listPage', this)
    const dialogSearch = ref(false)
    return {
      dialogSearch
    }
  },
  render() {
    const { searchForm, dataTag, toolbar, grid, pagination } = this.$slots
    const renderFollowForm = !dataTag && this.followForm && !this.dialogSearch
    const $searchForm =
      renderFollowForm || searchForm ? (
        <div class={'search-form-area'}>
          <div class={'search-form-content'}>{searchForm && searchForm()}</div>
          {renderFollowForm ? <div class={'form-tool-bar'}>{toolbar && toolbar()}</div> : null}
        </div>
      ) : null
    let $toolbar
    if (!renderFollowForm) {
      const $dataTag = dataTag ? <div class={'data-tag-area'}>{dataTag()}</div> : null
      $toolbar = (
        <div class={'tool-bar'}>
          {$dataTag}
          <div class={'pjButton-area'}>{toolbar && toolbar()}</div>
        </div>
      )
    }

    return (
      <div class={['pj-list-page', { 'follow-form': renderFollowForm }]}>
        {$searchForm}
        {$toolbar}
        <div class={'grid'}>{grid && grid()}</div>
        <div class={'pagination'}>{pagination && pagination()}</div>
      </div>
    )
  }
})
