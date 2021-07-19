import { Base, Config } from '@plugin'
import { Module } from 'vuex'
import { MenuStoreState } from './store'

function buildBasePage(storeKey: string, store: Module<MenuStoreState, Config.StoreRootState>) {
  const pageStore: Base.BaseStoreInfo<MenuStoreState, Config.StoreRootState> = {
    key: storeKey,
    storeModule: store
  }

  return Base.defineBaseStorePage({
    props: [],
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        const { pid } = to.params
        if (pid) {
          vm.$store.commit(`${storeKey}/parentId`, to.params.pid)
        }
        vm.$store.dispatch(`${storeKey}/init`)
      })
    },
    data() {
      return { pageStore }
    }
  })
}

export default buildBasePage
