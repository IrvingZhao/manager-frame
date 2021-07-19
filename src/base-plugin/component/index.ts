import { App } from 'vue'
import { ElMessage, ElMessageBox, ElInfiniteScroll, ElLoading, ElNotification } from 'element-plus'
import ElLocale from 'element-plus/lib/locale'
import ElementMock from './element-mock'
import Button, { ButtonConfig } from './button'
import CheckInput from './checkInput/index.vue'
import Dialog from './dialog/index.vue'
import EditPage from './editPage/index'
import ListPage from './listPage'
import LoadingBar from './loadingBar'
import type { LoadingBarOperator, LoadingBarOptions } from './loadingBar'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'
import Password from './password'
import SearchForm from './searchForm'
import I18n from '../config/I18nConfig'

ElLocale.i18n(I18n.global.t)

export default {
  install(app: App) {
    const Vue = app
    Vue.use(ElementMock)
    Vue.component('pj-button', Button)
    Vue.component('pj-check-input', CheckInput)
    Vue.component('pj-dialog', Dialog)
    Vue.component('pj-edit-page', EditPage)
    Vue.component('pj-list-page', ListPage)
    Vue.component('pj-multiple-select', MultipleSelect)
    Vue.component('pj-pagination', Pagination)
    Vue.component('pj-password', Password)
    Vue.component('pj-search-form', SearchForm)

    Vue.directive('InfiniteScroll', ElInfiniteScroll)
    Vue.directive('loading', ElLoading.directive)

    Vue.config.globalProperties.$message = ElMessage
    Vue.config.globalProperties.$msgbox = ElMessageBox
    Vue.config.globalProperties.$alert = ElMessageBox.alert
    Vue.config.globalProperties.$confirm = ElMessageBox.confirm
    Vue.config.globalProperties.$prompt = ElMessageBox.prompt
    Vue.config.globalProperties.$notify = ElNotification
    Vue.config.globalProperties.$loading = LoadingBar
  }
}

const message = ElMessage

export { ButtonConfig, message, LoadingBar, LoadingBarOperator, LoadingBarOptions }
