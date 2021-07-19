import { Module, Store } from 'vuex'
import type { BreadOperator, BreadStoreState, ItemBread, StoreRootState } from '../define'

const store: Module<BreadStoreState, StoreRootState> = {
  namespaced: true,
  state: {
    pageBread: [],
    menuBread: []
  },
  mutations: {
    addBreadNav(state, breads: ItemBread[] | ItemBread) {
      if (breads instanceof Array) {
        breads.forEach((item) => {
          state.pageBread.push(item)
        })
      } else {
        state.pageBread.push(breads)
      }
    },
    set(state, breads?: ItemBread[]) {
      state.pageBread = breads || []
    },
    splice(state, index: number) {
      state.pageBread.splice(index)
    },
    menuDic(state, menuBread: any[]) {
      state.menuBread = menuBread
    }
  },
  getters: {
    breadNav(state) {
      return [...state.menuBread, ...state.pageBread]
    }
  }
}

const operator = (str: Store<StoreRootState>): BreadOperator => {
  return {
    set(breads: ItemBread[]) {
      str.commit('bread/set', breads)
      return this
    },
    append(breads: ItemBread | ItemBread[]) {
      str.commit('bread/addBreadNav', breads)
      return this
    },
    clear() {
      str.commit('bread/set', [])
      return this
    },
    splice(index: number) {
      str.commit('bread/splice', index)
    },
    getBread() {
      return str.getters['bread/breadNav']
    }
  }
}

export default {
  store,
  operator
}
