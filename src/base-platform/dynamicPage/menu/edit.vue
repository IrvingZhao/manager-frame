<template>
  <pj-edit-page>
    <template #title>菜单管理</template>
    <pj-form ref="formEl" :model="form" :rules="formRules" label-width="130px">
      <pj-form-item label="菜单名称：" prop="name">
        <pj-input v-model="form.name" />
      </pj-form-item>
      <pj-form-item label="菜单key：" prop="keyword">
        <pj-input v-model="form.keyword" />
      </pj-form-item>
      <pj-form-item label="菜单功能：" prop="functionId">
        <pj-cascader :options="functionTreeList" v-model="form.functionId" :props="cascaderConfig" clearable />
      </pj-form-item>
      <pj-form-item label="图标：" prop="icon">
        <pj-input v-model="form.icon" />
      </pj-form-item>
      <pj-form-item label="排序：" prop="sort">
        <pj-input-number :controls="false" v-model="form.sort" class="align-left" />
      </pj-form-item>
    </pj-form>
    <template #buttons>
      <pj-button config="page.default" @click="routerGoBack">返回</pj-button>
      <pj-button config="page.submit" @click="submit">提交</pj-button>
    </template>
  </pj-edit-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Base } from '@plugin'

const defineComponent = Base.defineEditPage

export default defineComponent({
  props: {
    id: String,
    pid: String,
    storeKey: String,
    saveUrl: String,
    getOneUrl: String,
    prePath: String
  },
  computed: {
    functionTreeList() {
      return []
    },
    functionTreeMap() {
      return {}
    }
  },
  watch: {
    functionTreeMap(newVal) {
      const data: any = this.currentData
      if (data) {
        const { functionId } = data
        const func = newVal[functionId]
        if (func) {
          this.form.functionId = this.$tree.getTreePath(func, { dataGetter: (item) => item.id })
        }
      }
    }
  },
  setup(props) {
    const form = ref<any>({
      name: '',
      keyword: '',
      functionId: [],
      icon: '',
      sort: 0
    })

    const formRules = {
      name: {
        required: true,
        message: '请输入菜单名称'
      },
      keyword: {
        required: true,
        message: '请输入菜单key'
      }
    }

    const formEl = ref<any>(null)
    const currentData = ref<any>(null)

    return {
      form,
      formRules,
      breadSplice: 1,
      editBread: {
        name: '修改',
        path: `/${props.prePath}/menu/${props.pid ? `${props.pid}/` : ''}item/${props.id}`
      },
      addBread: {
        name: '新增',
        path: `/${props.prePath}/menu/${props.id ? `${props.id}/` : ''}item/add`
      },
      formEl,
      currentData,
      cascaderConfig: {
        label: 'name',
        value: 'id'
      }
    }
  },
  methods: {
    ...Base.RouterMethod,
    addLoad: () => undefined,
    editLoad() {
      this.$axios.get(this.getOneUrl || '', { params: { id: this.id } }).then((res) => {
        if (res.checkSuccess()) {
          const { data } = res
          const funcId = data.functionId
          const func = this.functionTreeMap[funcId]
          let funcIds: any[] = []
          if (func) {
            funcIds = this.$tree.getTreePath(func, { dataGetter: (item) => item.id })
          }
          this.form = {
            ...data,
            functionId: funcIds
          }
          this.currentData = data
        }
      })
    },
    reset() {
      if (this.formEl) {
        this.formEl.resetFields()
      }
    },
    submit() {
      this.formEl
        .validate()
        .then(() => {
          const { form } = this
          const data = {
            ...form,
            id: this.id,
            parentId: this.pid
          }
          if (form.functionId) {
            data.functionId = form.functionId[form.functionId.length - 1]
          } else {
            data.functionId = ''
          }
          const axios = this.$axios
          let method
          if (this.id) {
            method = axios.put
          } else {
            method = axios.post
          }
          method.call(axios, this.saveUrl, data).then((res) => {
            if (res.checkSuccess(this.$message.success)) {
              this.$store.dispatch(`${this.storeKey}/loadMenuList`)
              this.$store.dispatch(`${this.storeKey}/loadAllMenu`)
              this.$cRoute.replacePrePath()
            }
          })
        })
        .catch(() => undefined)
    }
  }
})
</script>

<style scoped></style>
