import { Module } from 'vuex'
import { Base, Config, Utils } from '@plugin'
import { MenuPageConfig } from './define'

export interface MenuStoreState extends Base.PageStateInterface {
  menuList: any[] // 菜单列表
  functionTreeList: any[] // 功能树
  functionTreeMap: any // 功能树 map
  menuPath: any[] // 菜单面包屑
  allMenuMap: any // 所有菜单 map
  parentId: string // 父节点id
}

function buildStore(config: MenuPageConfig): Module<MenuStoreState, Config.StoreRootState> {
  return {
    namespaced: true,
    state: {
      pageInfo: { ...Base.PageInfoData },
      query: {},
      menuList: [],
      functionTreeList: [],
      functionTreeMap: {},
      menuPath: [],
      allMenuMap: {},
      parentId: ''
    },
    mutations: {
      ...Base.PageMutations,
      updateMenuFunc(state) {
        if (state.menuList) {
          state.menuList.forEach((item) => {
            const menuItem = item
            if (menuItem.functionId) {
              const func = state.functionTreeMap[menuItem.functionId]
              if (func) {
                menuItem.functionName = Utils.TreeUtils.getTreePath(func, { dataKey: 'name' }).join('/')
              }
            }
          })
        }
      },
      menuList(state, { total, list }) {
        state.pageInfo.total = total
        state.menuList = list
      },
      functionList(state, data) {
        const functionMap = {}
        const functionTree = Utils.TreeUtils.generateTree(data, {
          mapCache: functionMap,
          parentKey: 'parentId',
          parentNodeKey: 'parentNode'
        })
        state.functionTreeMap = functionMap
        state.functionTreeList = functionTree
      },
      allMenu(state, data) {
        const allMenuMap: any = {}
        Utils.TreeUtils.generateTree(data, {
          mapCache: allMenuMap,
          parentKey: 'parentId',
          parentNodeKey: 'parentNode'
        })
        state.allMenuMap = allMenuMap
        if (state.parentId) {
          const menu = allMenuMap[state.parentId]
          if (menu) {
            const parentPath = Utils.TreeUtils.getTreePath(menu)
            state.menuPath.splice(0)
            state.menuPath.push(...parentPath)
          }
        } else {
          state.menuPath.splice(0)
        }
      },
      parentId(state, parentId) {
        state.parentId = parentId
        if (parentId) {
          const { allMenuMap } = state
          const func = allMenuMap[parentId]
          if (func) {
            const parentPath = Utils.TreeUtils.getTreePath(func)
            state.menuPath.splice(0)
            state.menuPath.push(...parentPath)
          }
        } else {
          state.menuPath.splice(0)
        }
      }
    },
    actions: {
      init({ dispatch }) {
        dispatch('loadMenuList')
        dispatch('loadAllMenu')
        dispatch('loadAllFunctions')
      },
      loadMenuList({ commit, state }) {
        const params = {
          pageIndex: state.pageInfo.pageIndex,
          pageSize: state.pageInfo.pageSize,
          ...state.query,
          parentId: state.parentId
        }
        Config.getAxios()
          .get(config.listUrl, { params })
          .then((res) => {
            if (res.checkSuccess()) {
              commit('menuList', res.data)
              commit('updateMenuFunc')
            }
          })
          .catch(() => undefined)
      },
      loadAllMenu({ commit }) {
        Config.getAxios()
          .get(config.allUrl)
          .then((res) => {
            if (res.checkSuccess()) {
              commit('allMenu', res.data)
            }
          })
      },
      loadAllFunctions({ commit }) {
        Config.getAxios()
          .get(config.allFuncUrl)
          .then((res) => {
            if (res.checkSuccess()) {
              commit('functionList', res.data)
              commit('updateMenuFunc')
            }
          })
      }
    }
  }
}

export default buildStore
