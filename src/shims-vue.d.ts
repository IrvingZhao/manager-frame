import { Store } from 'vuex'
import { ComponentPublicInstance, DefineComponent } from 'vue'
import { ElMessageBoxShortcutMethod, ElMessageBox } from 'element-plus/lib/el-message-box/src/message-box.type'
import { IMessage } from 'element-plus/lib/el-message/src/types'
import { INotification } from 'element-plus/lib/el-notification/src/notification.type'
import { Config, Component, Utils } from '@plugin'

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties extends ComponentPublicInstance {
    $store: Store<Config.StoreRootState>
    $bread: Config.BreadOperator
    $cRoute: Config.RouteOperator
    $axios: Config.MockAxiosInstance
    $http: { [key: string]: Config.MockAxiosInstance }
    $loading: Component.LoadingBarOperator
    $dateFormatter: typeof Utils.DateFormatter
    $download: Utils.DownloadUtil
    $tree: Utils.TreeUtil
    $url: Utils.UrlTemplateInterface
    $ws: Utils.WebSocket
    $message: IMessage
    $msgbox: ElMessageBox
    $alert: ElMessageBoxShortcutMethod
    $confirm: ElMessageBoxShortcutMethod
    $prompt: ElMessageBoxShortcutMethod
    $notify: INotification
  }
}
