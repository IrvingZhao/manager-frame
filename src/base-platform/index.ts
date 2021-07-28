import { createApp, App } from 'vue'
import { debounce } from 'throttle-debounce'
import { Config, Component as PlatformComponent } from '@plugin'
import app from './app.vue'
import ConfigInstall, * as BaseConfig from './config'
import Component from './component'
import * as DynamicPage from './dynamicPage'
import BuildRouteConfig from './views'

export default {
  createApp() {
    return createApp(app)
  },
  install(Vue: App) {
    Vue.use(ConfigInstall).use(Component)
  }
}

const SUCCESS_CODE = 'SUCCESS'

const axiosStateOperators = {
  401: debounce(500, () => {
    PlatformComponent.message.error('登录信息异常，请重新登录')
    Config.getStore().commit('frame_user/clearUserInfo')
    Config.getRouter().push('/login')
  }),
  403: debounce(500, () => {
    PlatformComponent.message.error('您无权限访问此信息')
    Config.getStore().commit('frame_show/noAuth')
  }),
  404: debounce(500, () => {
    Config.getStore().commit('frame_show/noData')
  })
}

export { BuildRouteConfig, BaseConfig, SUCCESS_CODE, axiosStateOperators, DynamicPage }
