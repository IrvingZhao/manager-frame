import { Base, Config } from '@plugin'
import Store, { DemoState } from './store'

const pageStore: Base.BaseStoreInfo<DemoState, Config.StoreRootState> = {
  key: 'demo',
  storeModule: Store,
  init: 'demo/init'
}

export default Base.defineBaseStorePage({
  props: [],
  data() {
    return { pageStore }
  }
})
