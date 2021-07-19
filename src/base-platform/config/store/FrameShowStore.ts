import { Module } from 'vuex'
import { Config } from '@/platform'

interface FrameShowStoreState {
  noAuth: boolean
  noData: boolean
  operatorAuth: boolean
}

const store: Module<FrameShowStoreState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    noAuth: false,
    noData: false,
    operatorAuth: true
  },
  mutations: {
    noAuth(state) {
      state.noAuth = true
    },
    noData(state) {
      state.noData = true
    },
    hasAuth(state) {
      state.noAuth = false
    },
    hasData(state) {
      state.noData = false
    },
    operatorAuth(state, auth) {
      state.operatorAuth = auth
    },
    success(state) {
      state.noAuth = false
      state.noData = false
    }
  }
}

export default store
