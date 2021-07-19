import { App } from 'vue'
import { ElMessage, ElMessageBox, ElInfiniteScroll, ElLoading, ElNotification } from 'element-plus'
import ElLocale from 'element-plus/lib/locale'
import ElementMock from './element-mock'
import Button, { ButtonConfig } from './button'
import CheckInput from './checkInput/index.vue'
import Dialog from './dialog/index.vue'
import EditPage from './editPage/index'
import ListPage from './listPage'
import LoadingBar, { LoadingBarOperator, LoadingBarOptions } from './loadingBar'
import MultipleSelect from './multiple-select'
import Pagination from './pagination'
import Password from './password'
import SearchForm from './searchForm'
import I18n from '../config/I18nConfig'

ElLocale.i18n(I18n.global.t)

export default {
  install(app: App) {
    const vueApp = app
    vueApp.use(ElementMock)
    vueApp.component('pj-button', Button)
    vueApp.component('pj-check-input', CheckInput)
    vueApp.component('pj-dialog', Dialog)
    vueApp.component('pj-edit-page', EditPage)
    vueApp.component('pj-list-page', ListPage)
    vueApp.component('pj-multiple-select', MultipleSelect)
    vueApp.component('pj-pagination', Pagination)
    vueApp.component('pj-password', Password)
    vueApp.component('pj-search-form', SearchForm)

    vueApp.directive('InfiniteScroll', ElInfiniteScroll)
    vueApp.directive('loading', ElLoading.directive)

    vueApp.config.globalProperties.$message = ElMessage
    vueApp.config.globalProperties.$msgbox = ElMessageBox
    vueApp.config.globalProperties.$alert = ElMessageBox.alert
    vueApp.config.globalProperties.$confirm = ElMessageBox.confirm
    vueApp.config.globalProperties.$prompt = ElMessageBox.prompt
    vueApp.config.globalProperties.$notify = ElNotification
    vueApp.config.globalProperties.$loading = LoadingBar
  }
}

const message = ElMessage

export { ButtonConfig, message, LoadingBar, LoadingBarOperator, LoadingBarOptions }
