import { createStore, Store } from 'vuex'
import { App } from 'vue'
import { StoreRootState } from './define'
import RouteStore from './stores/RouteStore'
import BreadStore from './stores/BreadStore'

let store: Store<StoreRootState>

function initStore(): Store<StoreRootState> {
  return createStore<StoreRootState>({
    strict: process.env.NODE_ENV === 'development',
    devtools: process.env.NODE_ENV === 'development',
    modules: {
      route: RouteStore.store,
      bread: BreadStore.store
    }
  })
}

function getStore() {
  return store
}

export default {
  install(app: App) {
    const vueApp = app
    store = initStore()
    vueApp.use(store)
    vueApp.config.globalProperties.$cRoute = RouteStore.operator(store)
    vueApp.config.globalProperties.$bread = BreadStore.operator(store)
  },
  getStore
}
