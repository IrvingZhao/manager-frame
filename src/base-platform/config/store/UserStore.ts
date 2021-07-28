import { Module, Store } from 'vuex'
import { Config, Utils } from '@plugin'

const token = Utils.Util.getItem('ACCESS_TOKEN') || ''

export interface UserStoreState {
  userInfo: any
  token: string
}

const store: Module<UserStoreState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    userInfo: {},
    token
  },
  mutations: {
    userInfo(state, data) {
      state.userInfo = data
    },
    accessToken(state, stateToken) {
      Utils.Util.setItem('ACCESS_TOKEN', stateToken)
      state.token = stateToken
    },
    clearUserInfo(state) {
      state.userInfo = {}
      state.token = ''
      Utils.Util.clearStorage()
    }
  },
  actions: {
    loadUserInfo({ commit }) {
      Config.getAxios()
        .get('basic/frame/profile')
        .then((res) => {
          if (res.checkSuccess()) {
            commit('userInfo', res.data)
          }
        })
    }
  }
}

const tokenGetter = () => {
  const tokenStore: Store<any> = Config.getStore()
  return { ACCESS_TOKEN: tokenStore.state.frame_user.token }
}

export default store

export { tokenGetter }
