import { Module, useStore } from 'vuex'
import { Config, Utils } from '@plugin'
import { computed } from 'vue'
import { AreaData, AreaState } from '../define'

const areaStore: Module<AreaState, Config.StoreRootState> = {
  namespaced: true,
  state: {
    areaData: {
      areaTreeData: [],
      areaCascaderProp: {
        expandTrigger: 'hover',
        value: 'code',
        label: 'name'
      },
      areaMapData: {}
    }
  },
  mutations: {
    areaData(state, data) {
      const areaMap = {}
      state.areaData.areaTreeData = Utils.TreeUtils.generateTree(data, { parentKey: 'parentCode', mapCache: areaMap, idKey: 'code' })
      state.areaData.areaMapData = areaMap
    }
  },
  actions: {
    loadAreas({ commit }) {
      Config.ApiConfig.getAxios()
        .get('/basic/frame/area')
        .then((res) => {
          if (res.checkSuccess()) {
            commit('areaData', res.data)
          }
        })
    }
  }
}

const getAreaData: () => AreaData = () => {
  const store = useStore()
  store.dispatch('frame_area/loadAreas')
  return computed(() => store.state.frame_area.areaData)
}

export default areaStore

export { getAreaData }
