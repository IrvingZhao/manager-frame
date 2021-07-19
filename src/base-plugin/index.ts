import { App } from 'vue'
import ComponentInstall, * as Component from './component'
import ConfigInstall, * as Config from './config'
import Directive from './directives'
import UtilInstall, * as Utils from './utils'
import * as Base from './base'

interface PlatformOption {
  config: Config.ConfigOption
}

export default {
  install(app: App, config: PlatformOption) {
    app.use(ComponentInstall)
    app.use(ConfigInstall, config.config)
    app.use(Directive)
    app.use(UtilInstall)
  }
}

export { PlatformOption, Base, Config, Component, Utils }
