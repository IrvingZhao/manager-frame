import { MethodOptions } from 'vue'
import { Module, MutationTree } from 'vuex'
import { ItemBread, StoreRootState } from '../config'

export interface BaseStoreInfo<S, R> {
  key: string
  storeModule: Module<S, R>
  init?: string
  reset?: string
}

export interface BaseStorePageConfig<S, R extends StoreRootState> {
  pageStore: BaseStoreInfo<S, R>[] | BaseStoreInfo<S, R>
  baseBread?: ItemBread[]
  breadSplice?: number
}

export interface BaseEditPageData {
  editBread?: ItemBread | ItemBread[]
  addBread?: ItemBread | ItemBread[]
  breadSplice?: number
  hasDeactivated?: boolean
  hasWatch?: boolean
}

export interface BaseEditPageMethod extends MethodOptions {
  addLoad: Function
  editLoad: Function
  reset: Function
}

export interface PageInfo {
  pageIndex: number
  pageSize: number
  total: number
}

export interface PageStateInterface {
  pageInfo: PageInfo
  query: { [key: string]: any }
}

export interface PageMutationInterface<S extends PageStateInterface> extends MutationTree<S> {
  pageIndex(state: S, pageIndex: number): void

  pageSize(state: S, pageSize: number): void

  query(state: S, query: { [key: string]: any }): void
}
