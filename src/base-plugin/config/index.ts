import { App } from 'vue'
import { ConfigOption } from './define'
import ApiConfig from './ApiConfig'
import RouterConfig from './RouterConfig'
import StoreConfig from './StoreConfig'
// import I18nConfig from './I18nConfig'

export default {
  install(app: App, option: ConfigOption) {
    app.use(ApiConfig, option.axiosOption)
    app.use(RouterConfig, option.routeOption)
    app.use(StoreConfig)
    // app.use(I18nConfig)
  }
}

export { ApiConfig, RouterConfig, StoreConfig }

export type {
  BreadOperator,
  ItemBread,
  StoreRootState,
  RouteOption,
  RouteOperator,
  MockAxiosInstance,
  ResponseData,
  LoadingOperator,
  HeadGetter,
  ErrorNotification,
  AxiosInstanceConfig,
  AxiosOption,
  ConfigOption
} from './define'
