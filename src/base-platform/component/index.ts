import { App } from 'vue'
import Auth from './auth'

export default {
  install(Vue: App) {
    Vue.component('pj-auth', Auth)
  }
}
