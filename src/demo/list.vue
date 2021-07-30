<template>
  <pj-list-page :follow-form="false">
    <template #searchForm>
      <pj-search-form @search="search" @reset="reset" :more="true" :tags="tags" :params="searchParam" @remove="removeTag">
        <pj-input v-model="searchParam.param1" placeholder="参数1" />
        <pj-input v-model="searchParam.param2" placeholder="参数2" />
        <pj-input v-model="searchParam.param3" placeholder="参数3" />
        <pj-input v-model="searchParam.param4" placeholder="参数4" />
        <pj-input v-model="searchParam.param5" placeholder="参数5" />
        <pj-input v-model="searchParam.param6" placeholder="参数6" />
        <pj-input v-model="searchParam.param7" placeholder="参数7" />
        <pj-input v-model="searchParam.param8" placeholder="参数8" />
        <pj-input v-model="searchParam.param9" placeholder="参数9" />
        <pj-input v-model="searchParam.param10" placeholder="参数10" />
      </pj-search-form>
    </template>
    <template #toolbar>
      <pj-auth>
        <template #add>
          <pj-button config="toolbar.default">新增</pj-button>
        </template>
      </pj-auth>
    </template>
    <template #dataTag>
      <pj-radio-group v-model="searchParam.tag">
        <pj-radio-button label="dataA">数据A</pj-radio-button>
        <pj-radio-button label="dataB">数据B</pj-radio-button>
      </pj-radio-group>
    </template>
    <template #grid>
      <pj-table :data="rows" height="100%">
        <pj-table-column label="id" prop="id" />
        <pj-table-column label="name" prop="name" />
        <pj-table-column label="操作" width="200px">
          <template v-slot="{ row }">
            <pj-auth>
              <pj-button config="table.default" @click="routerAppendTo(row.id)">编辑</pj-button>
              <pj-button config="table.delete">删除</pj-button>
            </pj-auth>
          </template>
        </pj-table-column>
      </pj-table>
    </template>
    <template v-slot:pagination>
      <pj-pagination :pageInfo="pageInfo" @size-change="sizeChange" @current-change="currentChange"></pj-pagination>
    </template>
  </pj-list-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Base, Config } from '@plugin'

export default defineComponent({
  setup() {
    const searchParam: any = ref<any>({ tag: 'dataA' })
    const tags = []
    for (let i = 1; i <= 10; i += 1) {
      searchParam[`param${i}`] = ''
      tags.push({
        label: `参数${i}`,
        name: `param${i}`
      })
    }
    const state = Config.mapState('demo', ['pageInfo', 'rows'])

    return {
      searchParam,
      ...state,
      tags
    }
  },
  methods: {
    ...Base.RouterMethod,
    removeTag(tag) {
      this.searchParam[tag.name] = ''
    },
    loadData() {
      this.$store.dispatch('demo/loadData')
    },
    search() {
      this.$store.commit('demo/query', { ...this.searchParams })
      this.loadData()
    },
    sizeChange(size) {
      this.$store.commit('demo/pageSize', size)
      this.loadData()
    },
    currentChange(index) {
      this.$store.commit('demo/pageIndex', index)
      this.loadData()
    },
    reset() {
      this.searchParam = {
        param1: '',
        param2: '',
        param3: '',
        param4: '',
        param5: '',
        param6: '',
        param7: '',
        param8: '',
        param9: '',
        param10: ''
      }
      this.$store.commit('demo/pageIndex', 1)
      this.search()
    }
  }
})
</script>

<style scoped></style>
