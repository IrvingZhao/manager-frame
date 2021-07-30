import { Module } from 'vuex'
import { Base, Config } from '@plugin'

export interface DemoState extends Base.PageStateInterface {
  rows: any[]
}

const store: Module<DemoState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    pageInfo: {
      ...Base.PageInfoData
    },
    query: {},
    rows: []
  },
  mutations: {
    ...Base.PageMutations,
    rows(state, { list, total }) {
      state.rows = list
      state.pageInfo.total = total
    }
  },
  actions: {
    init({ dispatch }) {
      dispatch('loadData')
    },
    loadData({ commit }) {
      const rows = [
        { id: '1', name: '测试1' },
        { id: '2', name: '测试2' },
        { id: '3', name: '测试3' },
        { id: '4', name: '测试4' }
      ]
      commit('rows', { list: rows, total: 4 })
    }
  }
}

export default store
