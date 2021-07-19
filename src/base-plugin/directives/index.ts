import { App } from 'vue'
import ActiveHeight from './activeHeight'
import type { ActiveHeightParam } from './activeHeight'
import Resize from './resize'

export default {
  install(app: App) {
    app.directive('active-height', ActiveHeight)
    app.directive('resize', Resize)
  }
}

export { ActiveHeightParam }
