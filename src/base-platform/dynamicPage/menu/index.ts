import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { mapState } from 'vuex'
import { MenuPageConfig } from './define'
import buildStore from './store'

const base = () => import(/* webpackChunkName:'base/dynamicPage/menu' */ './page')
const list = () => import(/* webpackChunkName:'base/dynamicPage/menu' */ './list.vue')
const edit = () => import(/* webpackChunkName:'base/dynamicPage/menu' */ './edit.vue')

function buildMenuConf(config: MenuPageConfig) {
  const pageKeyPrefix = config.keyPrefix || config.prePath
  const listPage = () => {
    return new Promise((resolve, reject) => {
      list()
        .then((module) => {
          const refModule = module
          refModule.default.computed = { ...mapState(config.storeKey, ['menuList', 'pageInfo', 'menuPath', 'functionTreeMap']) }
          resolve(refModule)
        })
        .catch(reject)
    })
  }

  const editPage = () => {
    return new Promise((resolve, reject) => {
      edit()
        .then((module) => {
          const refModule = module
          refModule.default.computed = { ...mapState(config.storeKey, ['functionTreeList', 'functionTreeMap']) }
          resolve(refModule)
        })
        .catch(reject)
    })
  }

  const route: RouteRecordRaw[] = [
    {
      path: '',
      component: listPage,
      meta: { key: `${pageKeyPrefix}-menu-list` },
      props() {
        return { ...config }
      }
    },
    {
      path: ':pid',
      component: listPage,
      meta: { key: `${pageKeyPrefix}-menu-list` },
      props(to: RouteLocationNormalized) {
        return { ...config, ...to.params }
      }
    },
    {
      path: 'item/add',
      component: editPage,
      meta: { key: `${pageKeyPrefix}-menu-add` },
      props(to: RouteLocationNormalized) {
        return { ...config, ...to.params }
      }
    },
    {
      path: 'item/:id',
      component: editPage,
      meta: { key: `${pageKeyPrefix}-menu-edit` },
      props(to: RouteLocationNormalized) {
        return { ...config, ...to.params }
      }
    },
    {
      path: ':pid/item/add',
      component: editPage,
      meta: { key: `${pageKeyPrefix}-menu-add` },
      props(to: RouteLocationNormalized) {
        return { ...config, ...to.params }
      }
    },
    {
      path: ':pid/item/:id',
      component: editPage,
      meta: { key: `${pageKeyPrefix}-menu-edit` },
      props(to: RouteLocationNormalized) {
        return { ...config, ...to.params }
      }
    }
  ]

  const store = buildStore(config)
  const page = () => {
    return new Promise((resolve, reject) => {
      base()
        .then((module) => {
          const basePage = module.default(config.storeKey, store)
          resolve(basePage)
        })
        .catch(reject)
    })
  }
  return {
    route,
    page
  }
}

export default buildMenuConf
