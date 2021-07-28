import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import ElLocale from 'element-plus/lib/locale'
import ZhCn from 'element-plus/lib/locale/lang/zh-cn'
import En from 'element-plus/lib/locale/lang/en'
import { Util } from '../utils'

const messages = {
  'zh-cn': ZhCn,
  en: En
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'zh-cn',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages
})

function registerLocale(lang, message) {
  Util.merge(messages[lang], true, message)
}

export default {
  install(Vue: App) {
    const app = Vue
    app.use(i18n)
    app.config.globalProperties.$t = i18n.global.t
    ElLocale.i18n(i18n.global.t)
  }
}

export { registerLocale }
