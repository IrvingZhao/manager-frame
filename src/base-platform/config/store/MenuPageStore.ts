import { Module, Store } from 'vuex'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { Config, Utils } from '@plugin'

export interface MenuPageStoreState {
  menus: any[]
  menuMap: any
  pageKeyMap: any
  operators: any
  currentPath: string
  currentPageKey: string
}

const store: Module<MenuPageStoreState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    menus: [],
    menuMap: {},
    pageKeyMap: {},
    operators: {},
    currentPath: '',
    currentPageKey: ''
  },
  mutations: {
    menus(state, data) {
      const menuMap = {}
      state.menus = Utils.TreeUtils.generateTree(data, {
        parentKey: 'parent',
        mapCache: menuMap,
        parentNodeKey: 'parentNode',
        loop(item) {
          item.activeParam = { active: false }
        }
      })
      state.menuMap = menuMap
    },
    pages(state, data) {
      const pageKeyMap = {}
      const operators = {}
      data
        .filter((item) => item.type === 'PAGE')
        .forEach((item) => {
          pageKeyMap[item.key] = item
        })
      data
        .filter((item) => item.type === 'OPERATION')
        .forEach((item) => {
          let operatorList = operators[item.pageId]
          if (!operatorList) {
            operatorList = []
            operators[item.pageId] = operatorList
          }
          operatorList.push(item)
        })
      state.pageKeyMap = pageKeyMap
      state.operators = operators
    },
    menuActive(state, { id, active }) {
      const { menuMap } = state
      Object.entries(menuMap).forEach(([, item]: [string, any]) => {
        item.activeParam.active = false
      })
      let menu = menuMap[id]
      while (menu) {
        menu.activeParam.active = active
        menu = menu.parentNode
      }
    },
    currentPath(state, path) {
      state.currentPath = path
    },
    currentPageKey(state, key) {
      state.currentPageKey = key
    }
  },
  actions: {
    initAuth({ dispatch }) {
      dispatch('loadAllResource')
    },
    loadAllResource({ commit, dispatch }) {
      Config.getAxios()
        .get('/basic/frame/resource')
        .then((res) => {
          if (res.checkSuccess()) {
            commit('menus', res.data.menus)
            commit('pages', res.data.pages)
            dispatch('updateCurrentPath')
            dispatch('currentPageKey')
          }
        })
    },
    updateCurrentPath({ state, commit }, path) {
      if (path) {
        commit('currentPath', path)
      }
      const mapPath = path || state.currentPath
      const mapMenu = Object.values<any>(state.menuMap).find((item) => item.path && mapPath.indexOf(item.path) >= 0)
      if (mapMenu) {
        const menuBread = Utils.TreeUtils.getTreePath(mapMenu, { parentNodeKey: 'parentNode' }).map((item) => {
          return {
            name: item.name,
            path: item.path
          }
        })
        commit('bread/menuDic', menuBread, { root: true })
        commit('menuActive', { id: mapMenu.id, active: true })
      } else {
        commit('bread/menuDic', [], { root: true })
        commit('menuActive', { id: '', active: true })
      }
    },
    currentPageKey({ state, commit }, pageKey) {
      if (pageKey) {
        commit('currentPageKey', pageKey)
      }
      const mapPageKey = pageKey || state.currentPageKey
      if (mapPageKey) {
        const page = state.pageKeyMap[mapPageKey]
        if (page) {
          setTimeout(() => {
            commit('frame_show/hasAuth', null, { root: true })
          }, 10)
        } else {
          commit('frame_show/noAuth', null, { root: true })
        }
      }
    }
  }
}

const authGutter = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const gutterStore: Store<any> = Config.getStore()
  const { hasAuth } = to.meta
  if (hasAuth !== false) {
    // 登录信息
    const { token } = gutterStore.state.frame_user
    if (!token) {
      next('/login')
      return
    }
    const { key } = to.meta
    gutterStore.dispatch('frame_menu/currentPageKey', key)
  }
  next()
}

const breadGutter = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const breadStore = Config.getStore()
  const { path } = to
  breadStore.dispatch('frame_menu/updateCurrentPath', path)
  next()
}

export default store

export { authGutter, breadGutter }
