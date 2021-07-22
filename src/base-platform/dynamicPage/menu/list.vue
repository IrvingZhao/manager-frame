<template>
  <pj-list-page :follow-form="false">
    <template #searchForm>
      <pj-search-form @search="search" @reset="reset">
        <pj-input placeholder="功能名称" v-model="searchParams.name" />
      </pj-search-form>
    </template>
    <template #toolbar>
      <pj-auth>
        <template v-slot:add>
          <pj-button config="toolbar.default" @click="routerAppendTo('item/add')">新增</pj-button>
        </template>
      </pj-auth>
    </template>
    <template #dataTag>
      <pj-breadcrumb>
        <pj-breadcrumb-item replace to="/config/menu">根菜单</pj-breadcrumb-item>
        <pj-breadcrumb-item :key="item.id" v-for="item in menuPath" :replace="true" :to="`/config/menu/${item.id}`"
          >{{ item.name }}
        </pj-breadcrumb-item>
      </pj-breadcrumb>
    </template>
    <template v-slot:grid>
      <pj-table :data="menuList" height="100%">
        <pj-table-column label="名称" prop="name"></pj-table-column>
        <pj-table-column label="图标" prop="icon"></pj-table-column>
        <pj-table-column label="功能" prop="functionName"></pj-table-column>
        <pj-table-column label="操作">
          <template v-slot="{ row }">
            <pj-auth>
              <template #edit>
                <pj-button config="table.default" @click="routerAppendTo(`item/${row.id}`)">编辑</pj-button>
              </template>
              <template #delete>
                <pj-button config="table.delete" @click="deleteMenu(row)">删除</pj-button>
              </template>
              <pj-button config="table.default" @click="routerPushTo(`/${prePath}/menu/${row.id}`)">子菜单</pj-button>
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
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Base } from '@plugin'

export default defineComponent({
  props: ['pid', 'storeKey', 'deleteUrl', 'prePath'],
  computed: { ...mapState('', ['menuList', 'pageInfo', 'menuPath', 'functionTreeMap']) },
  data() {
    return { searchParams: { name: '' } }
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.updatePath(to.params.pid)
    })
  },
  beforeRouteUpdate(to) {
    this.updatePath(to.params.pid)
  },
  activated() {
    this.$bread.splice(0)
  },
  methods: {
    ...Base.RouterMethod,
    updatePath(pid) {
      this.$store.commit(`${this.storeKey}/parentId`, pid)
      this.loadData()
    },
    loadData() {
      this.$store.dispatch(`${this.storeKey}/loadMenuList`)
    },
    search() {
      this.$store.commit(`${this.storeKey}/query`, { ...this.searchParams })
      this.loadData()
    },
    sizeChange(size) {
      this.$store.commit(`${this.storeKey}/pageSize`, size)
      this.loadData()
    },
    currentChange(index) {
      this.$store.commit(`${this.storeKey}/pageIndex`, index)
      this.loadData()
    },
    deleteMenu(row) {
      this.$confirm(`确认删除菜单【${row.name}】？`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.delete(this.deleteUrl, { params: { id: row.id } }).then((res) => {
            if (res.checkSuccess(this.$message.success)) {
              this.loadData()
            }
          })
        })
        .catch(() => undefined)
    },
    reset() {
      this.searchParams.name = ''
      this.$store.commit(`${this.storeKey}/pageIndex`, 1)
      this.search()
    }
  }
})
</script>

<style scoped></style>
