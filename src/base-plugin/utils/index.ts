import { App } from 'vue'
import DateFormatter from './DateFormatter'
import DownLoad from './DownLoad'
import TreeUtils from './TreeUtils'
import UrlTemplate from './UrlTemplate'
import Util from './Util'
import WebSocketUtil from './WebSocketUtil'

export default {
  install(app: App) {
    const vueApp = app
    vueApp.config.globalProperties.$dateFormatter = DateFormatter
    vueApp.config.globalProperties.$download = DownLoad
    vueApp.config.globalProperties.$tree = TreeUtils
    vueApp.config.globalProperties.$url = UrlTemplate
    vueApp.config.globalProperties.$utils = Util
    vueApp.config.globalProperties.$ws = WebSocketUtil
  }
}

export * from './define'
export { DateFormatter, DownLoad, TreeUtils, UrlTemplate, Util, WebSocketUtil }
