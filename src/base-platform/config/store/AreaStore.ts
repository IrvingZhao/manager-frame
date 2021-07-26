import { Module, useStore } from 'vuex'
import { Config, Utils } from '@plugin'
import { computed } from 'vue'
import { ComputedRef } from '@vue/reactivity'
import { AreaData, AreaDataItem, AreaState } from '../define'

function areaItemLoop(this: AreaDataItem): AreaDataItem[] {
  return Utils.TreeUtils.getTreePath(this)
}

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
    },
    hasLoad: false
  },
  mutations: {
    areaData(state, data) {
      state.hasLoad = true
      const areaMap = {}
      state.areaData.areaTreeData = Utils.TreeUtils.generateTree(data, {
        parentKey: 'parentCode',
        mapCache: areaMap,
        idKey: 'code',
        loop(item: AreaDataItem) {
          item.getTreePath = areaItemLoop
        },
        parentNodeKey: 'parentNode'
      })
      state.areaData.areaMapData = areaMap
    }
  },
  actions: {
    loadAreas({ state, commit }) {
      if (!state.hasLoad) {
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
}

const getAreaData: () => ComputedRef<AreaData> = () => {
  const store = useStore()
  store.dispatch('frame_area/loadAreas')
  return computed(() => store.state.frame_area.areaData)
}

export default areaStore

export { getAreaData }
