import Platform, { PlatformOption, Component, Config as PlatformConfig } from '@plugin'
import Base, { BaseConfig, SUCCESS_CODE, axiosStateOperators } from '@platform'
import routes from './routes'

const platformOption: PlatformOption = {
  config: {
    axiosOption: {
      loadOperator: Component.LoadingBar,
      errorNotification(msg) {
        Component.message.error(msg)
      },
      headGetter: [BaseConfig.tokenGetter],
      successCode: SUCCESS_CODE,
      stateOperator: axiosStateOperators
    },
    routeOption: {
      routes,
      base: '',
      history: 'history'
    }
  }
}

const app = Base.createApp()
app.use(Platform, platformOption).use(Base)

// 路由配置
const router = PlatformConfig.getRouter()
router.beforeEach(BaseConfig.breadGutter)
router.afterEach(BaseConfig.frameGutter)

if (import.meta.env.VITE_PROFILE !== 'development') {
  // 非开发模式，开启页面授权
  router.beforeEach(BaseConfig.authGutter)
} else {
  // 开发模式，关闭按钮权限
  const store = PlatformConfig.getStore()
  store.commit('frame_show/operatorAuth', false)
}

const config: PlatformConfig.AxiosInstanceConfig = { basePath: '/api' }
PlatformConfig.createAxios(config)

app.mount('#app')
