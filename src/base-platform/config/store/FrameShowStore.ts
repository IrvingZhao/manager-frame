import { Module } from 'vuex'
import { RouteLocationNormalized } from 'vue-router'
import { Config } from '@plugin'

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

const frameGutter = (to: RouteLocationNormalized) => {
  const breadStore = Config.StoreConfig.getStore()
  const { path } = to
  breadStore.commit('frame_show/success', path)
}

export default store

export { frameGutter }
