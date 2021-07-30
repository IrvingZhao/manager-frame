import { createStore, Store } from 'vuex'
import { computed, App, ComputedRef } from 'vue'
import { StoreRootState } from './define'
import RouteStore from './stores/RouteStore'
import BreadStore from './stores/BreadStore'

let store: Store<StoreRootState>

function initStore(): Store<StoreRootState> {
  return createStore<StoreRootState>({
    strict: import.meta.env.VITE_PROFILE === 'development',
    devtools: import.meta.env.VITE_PROFILE === 'development',
    modules: {
      route: RouteStore.store,
      bread: BreadStore.store
    }
  })
}

function getStore() {
  return store
}

function mapState<Key extends string>(namespace: string, map: Key[]): { [k in Key]?: ComputedRef } {
  const result: { [key in Key]?: ComputedRef } = {}
  return map.reduce((item, cur) => {
    item[cur] = computed(() => store.state[namespace][cur])
    return item
  }, result)
}

export default {
  install(app: App) {
    const vueApp = app
    store = initStore()
    vueApp.use(store)
    vueApp.config.globalProperties.$cRoute = RouteStore.operator(store)
    vueApp.config.globalProperties.$bread = BreadStore.operator(store)
  }
}

export { mapState, getStore }
