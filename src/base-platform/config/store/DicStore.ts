import { ref, computed } from 'vue'
import { useStore, Module } from 'vuex'
import { Config } from '@plugin'
import { DicItem, DicItemMap, DicState } from '../define'

const allDicMap = ref({}).value
const allDicArray = ref({}).value

const dicStore: Module<DicState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    allDicMap,
    allDicArray
  },
  mutations: {
    addDicByType(state, { type, data }) {
      const dicMap = {}
      data.forEach((item) => {
        dicMap[item.key] = item.label
      })
      state.allDicMap[type] = dicMap
      state.allDicArray[type] = data
    }
  },
  actions: {
    loadDicByType({ commit, state }, type) {
      if (state.allDicMap[type]) {
        return
      }
      commit('addDicByType', { type, data: [] })

      Config.ApiConfig.getAxios()
        .get(`/basic/frame/dic/${type}`)
        .then((res) => {
          if (res.checkSuccess()) {
            commit('addDicByType', { type, data: res.data })
          }
        })
    }
  },
  getters: {
    dicTypeMap(state) {
      return (typeKey) => {
        return state.allDicMap[typeKey]
      }
    }
  }
}

const getDicMap: (typeKey: string) => DicItemMap = (typeKey) => {
  const store = useStore()
  store.dispatch('frame_dic/loadDicByType', typeKey)
  return computed(() => store.state.frame_dic.allDicMap[typeKey])
}

const getDicArray: (typeKey: string) => DicItem[] = (typeKey) => {
  const store = useStore()
  store.dispatch('frame_dic/loadDicByType', typeKey)
  return computed(() => store.state.frame_dic.allDicArray[typeKey])
}

export default dicStore

export { getDicMap, getDicArray }
