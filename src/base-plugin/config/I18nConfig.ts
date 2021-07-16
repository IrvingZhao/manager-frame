import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'
import ZhCn from 'element-plus/lib/locale/lang/zh-cn'
import { Util } from '../utils'

function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  // const locales = import.meta.globEager('.*locale/[A-Za-z0-9-_,s]+.json')
  // TODO 执行 加载 locales
  // const locales = require.context('@', true, /.*locale\/[A-Za-z0-9-_,\s]+\.json/)
  const dataMap: { [key: string]: any[] } = {}
  // locales.keys().forEach((key) => {
  //   const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  //   if (matched && matched.length > 1) {
  //     const locale = matched[1]
  //     const data = locales(key)
  //     if (!dataMap[locale]) {
  //       dataMap[locale] = []
  //     }
  //     dataMap[locale].push(data)
  //   }
  // })
  const messages: LocaleMessages<VueMessageType> = {}
  Object.entries(dataMap).forEach(([k, v]) => {
    messages[k] = Util.merge({}, ...v)
  })
  if (!messages['zh-cn']) {
    messages['zh-cn'] = {}
  }
  messages['zh-cn'].el = ZhCn.el
  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'zh-cn',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

export default i18n
