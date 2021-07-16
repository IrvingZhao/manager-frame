import { PageInfo, PageMutationInterface, PageStateInterface } from './define'

const PageInfoData: PageInfo = {
  pageIndex: 1,
  pageSize: 10,
  total: 0
}

const PageMutations: PageMutationInterface<PageStateInterface> = {
  pageIndex(state: PageStateInterface, pageIndex: number): void {
    state.pageInfo.pageIndex = pageIndex
  },
  pageSize(state: PageStateInterface, pageSize: number): void {
    state.pageInfo.pageSize = pageSize
  },
  query(state: PageStateInterface, query: { [k: string]: any }): void {
    state.query = query
  }
}

export { PageInfoData, PageMutations }
