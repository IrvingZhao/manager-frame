import { Module, Store } from 'vuex'
import { RouteState, StoreRootState } from '../define'
import RouterConfig from '../RouterConfig'

const store: Module<RouteState, StoreRootState> = {
  namespaced: true,
  state: { prePath: '' },
  mutations: {
    prePath(state, prePath: string) {
      if (state.prePath === undefined) {
        state.prePath = ''
      } else {
        state.prePath = prePath
      }
    }
  }
}
const operator = (str: Store<StoreRootState>) => {
  return {
    replacePrePath() {
      const router = RouterConfig.getRouter()
      const { prePath } = str.state.route
      if (router && prePath && prePath !== '/') {
        router.replace(prePath).catch(() => undefined)
      } else {
        const { state } = window.history
        if (state) {
          const { back } = state
          if (back) {
            router.replace(back)
          } else {
            router.push('/')
          }
        } else {
          router.go(-1)
        }
      }
    }
  }
}
export default {
  store,
  operator
}
