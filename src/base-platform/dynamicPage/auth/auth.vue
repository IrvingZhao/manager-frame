<template>
  <pj-edit-page type="full" :content-scroll="false">
    <template #title>权限设置</template>
    <div class="auth-area">
      <div class="auth-item menu-area">
        <pj-scrollbar>
          <pj-tree
            ref="menuTree"
            :data="allMenuTree"
            node-key="id"
            :props="treeMenuProps"
            :default-expand-all="true"
            show-checkbox
            :expand-on-click-node="false"
            highlight-current
            :default-checked-keys="menuDefaultCheckKey"
            @checkChange="menuTreeCheckChange"
          ></pj-tree>
        </pj-scrollbar>
      </div>
      <div class="auth-item operator-area">
        <pj-scrollbar>
          <pj-tree
            ref="opTree"
            :data="operatorMap"
            node-key="id"
            :props="treeMenuProps"
            :default-expand-all="true"
            show-checkbox
            :expand-on-click-node="false"
            highlight-current
            :default-checked-keys="computedOpChecked"
            @checkChange="opTreeCheckChange"
            :check-strictly="true"
          ></pj-tree>
        </pj-scrollbar>
      </div>
    </div>
    <template #buttons>
      <pj-button config="page.default" @click="routerGoBack">返回</pj-button>
      <pj-button config="page.submit" @click="submit" :loading="submitLoading">提交</pj-button>
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
    authType: String,
    breadPath: String
  },
  deactivated() {
    this.reset()
  },
  computed: {
    operatorMap() {
      if (!this.menuTree) {
        return []
      }
      const key = this.menuTree.getCurrentKey()
      const menu = this.allMenuMap[key]
      if (!menu) {
        return []
      }
      const data: any[] = this.pageOperatorTree[menu.pageId]
      return data || []
    },
    computedOpChecked() {
      if (!this.menuTree) {
        return []
      }
      const key = this.menuTree.getCurrentKey()
      const menu = this.allMenuMap[key]
      if (!menu) {
        return []
      }
      const data: any[] = this.menuOpChecked[menu.pageId]
      return data || []
    }
  },
  setup(props) {
    const treeMenuProps = {
      label: 'name',
      children: 'children'
    }
    const menuTree = ref<any>(null)
    const opTree = ref<any>(null)

    const menuOpChecked = ref<{ [key: string]: any[] }>({})
    const treeStop = ref<boolean>(false)
    const submitLoading = ref<boolean>(false)
    const menuDefaultCheckKey = ref<string[]>([])

    const allMenuTree = ref<any[]>([])
    const pageOperatorTree = ref<any>({})
    const allMenuMap = ref<any>({})
    const allOperatorMap = ref<any>({})
    const hasLoadRes = ref<boolean>(false)

    return {
      allMenuTree,
      pageOperatorTree,
      allMenuMap,
      allOperatorMap,
      hasLoadRes,
      treeMenuProps,
      menuTree,
      menuOpChecked,
      menuDefaultCheckKey,
      opTree,
      treeStop,
      submitLoading,
      editBread: {
        name: '授权',
        path: props.breadPath
      },
      breadSplice: 1
    }
  },
  methods: {
    ...Base.RouterMethod,
    addLoad: () => undefined,
    editLoad() {
      // 资源加载完成后，再加载授权信息
      this.loadResources().then(() => {
        this.$axios.get(`basic/grant/${this.authType}/${this.id}`).then((res) => {
          if (res.checkSuccess()) {
            this.treeStop = true
            const { data } = res
            const menuCheckKey: any = []
            data.forEach((item) => {
              if (item.type === 'MENU') {
                const menu = this.allMenuMap[item.id]
                if (!menu.children || menu.children.length === 0) {
                  menuCheckKey.push(item.id)
                }
              } else if (item.type === 'OPERATION') {
                let pageOp = this.menuOpChecked[item.pageId]
                if (!pageOp) {
                  pageOp = []
                  this.menuOpChecked[item.pageId] = pageOp
                }
                pageOp.push(item.id)
              }
            })
            this.menuDefaultCheckKey = menuCheckKey
            setTimeout(() => {
              this.treeStop = false
            }, 1000)
          }
        })
      })
    },
    loadResources() {
      // 加载资源
      if (this.hasLoadRes) {
        return new Promise<void>((resolve) => resolve())
      }
      return new Promise<void>((resolve, reject) => {
        this.$axios
          .get('basic/grant/resource')
          .then((res) => {
            if (res.checkSuccess()) {
              this.computedMenus(res.data.menus)
              this.computedOperations(res.data.operations)
              this.hasLoadRes = true
              resolve()
            }
          })
          .catch(reject)
      })
      // return Promise.all([
      //   this.$axios.get('/basic/grant/resource/menu').then((res) => {
      //     if (res.checkSuccess()) {
      //       this.hasLoadRes = true
      //       const allMenuMap = {}
      //       this.allMenuTree = this.$tree.generateTree(res.data, {
      //         parentKey: 'parentId',
      //         mapCache: allMenuMap
      //       })
      //       this.allMenuMap = allMenuMap
      //     }
      //   }),
      //   this.$axios.get('/basic/grant/resource/operator').then((res) => {
      //     if (res.checkSuccess()) {
      //       const pageOperation = {}
      //       const allOperatorMap = {}
      //       res.data.filter((item) => item.type === 'OPERATION')
      //         .forEach((item) => {
      //           allOperatorMap[item.id] = item
      //           let ops = pageOperation[item.pageId]
      //           if (!ops) {
      //             ops = pageOperation[item.pageId] = []
      //           }
      //           ops.push(item)
      //           const refPageId = item.refPageId
      //           if (refPageId) {
      //             let children = pageOperation[refPageId]
      //             if (!children) {
      //               children = pageOperation[refPageId] = []
      //             }
      //             item.children = children
      //           }
      //         })
      //       this.pageOperatorTree = pageOperation
      //       this.allOperatorMap = allOperatorMap
      //     }
      //   })
      // ])
    },
    computedMenus(menus) {
      const allMenuMap = {}
      this.allMenuTree = this.$tree.generateTree(menus, {
        parentKey: 'parentId',
        mapCache: allMenuMap
      })
      this.allMenuMap = allMenuMap
    },
    computedOperations(operations) {
      const pageOperation = {}
      const allOperatorMap = {}
      operations
        .filter((item) => item.type === 'OPERATION')
        .forEach((item) => {
          const opItem = item
          allOperatorMap[opItem.id] = opItem
          let ops = pageOperation[opItem.pageId]
          if (!ops) {
            ops = []
            pageOperation[opItem.pageId] = ops
          }
          ops.push(opItem)
          const { refPageId } = opItem
          if (refPageId) {
            let children = pageOperation[refPageId]
            if (!children) {
              children = []
              pageOperation[refPageId] = children
            }
            opItem.children = children
          }
        })
      this.pageOperatorTree = pageOperation
      this.allOperatorMap = allOperatorMap
    },
    submit() {
      const checkMenus = this.menuTree.getCheckedNodes(false, true)
      // 菜单id
      const checkMenuData = checkMenus.map((item) => {
        return {
          resourceId: item.id,
          resourceType: 'MENU'
        }
      })
      // 操作id
      const checkOpId: any[] = []
      Object.entries(this.menuOpChecked).forEach(([, v]) => {
        checkOpId.push(...v)
      })
      // 所有页面
      const allPageMap: any = {}
      // 菜单页面
      checkMenus.forEach((item) => {
        if (item.pageId) {
          allPageMap[item.pageId] = true
        }
      })
      // 操作页面
      checkOpId.forEach((item) => {
        const operator = this.allOperatorMap[item]
        // 操作引用的页面
        if (operator.refPageId) {
          allPageMap[operator.refPageId] = true
        }
      })

      const checkPageData = Object.keys(allPageMap).map((item) => {
        return {
          resourceId: item,
          resourceType: 'PAGE'
        }
      })

      const checkOpData = checkOpId.map((item) => {
        return {
          resourceId: item,
          resourceType: 'OPERATION'
        }
      })
      const data = [...checkMenuData, ...checkPageData, ...checkOpData]
      this.$axios.put(`basic/grant/${this.authType}/${this.id}`, data).then((res) => {
        if (res.checkSuccess(this.$message.success)) {
          this.$cRoute.replacePrePath()
        }
      })
    },
    reset() {
      this.menuOpChecked = {}
      if (this.menuTree) {
        this.menuTree.setCheckedKeys([])
        this.menuTree.setCurrentKey(null)
      }
    },
    menuTreeCheckChange(data, check) {
      if (this.treeStop) {
        return
      }
      const { pageId } = data
      if (pageId) {
        if (this.opTree) {
          this.opTree.setCheckedKeys([], false)
        }
        const operators = this.pageOperatorTree[pageId]
        const opCheckId = this.$tree.getCurrentAndChildProp({ children: operators }, 'id')
        if (check) {
          this.menuOpChecked[pageId] = opCheckId
        } else {
          this.menuOpChecked[pageId] = []
        }
      }
    },
    opTreeCheckChange(data, check) {
      const key = this.menuTree.getCurrentKey()
      const menu = this.allMenuMap[key]
      if (!menu) {
        return
      }
      // 更新暂存数据
      this.menuOpChecked[menu.pageId] = this.opTree.getCheckedKeys()
      if (check) {
        const opPageId = data.pageId
        if (opPageId) {
          // 设置 menu
          this.menuTree.setChecked(menu.id, true, false)
          this.treeStop = true
          this.$nextTick(() => {
            this.treeStop = false
          })
          // 更新父节点
          const operators = this.pageOperatorTree[menu.pageId]
          if (operators) {
            const find = this.$tree.queryTreeNode(operators, {
              key: 'refPageId',
              value: opPageId
            })
            if (find && find.id) {
              this.opTree.setChecked(find.id, true, false)
            }
          }
        }
      } else if (data.children) {
        // 更新子节点
        data.children.forEach((item) => {
          this.opTree.setChecked(item.id, false, true)
        })
      }
    }
  }
})
</script>

<style scoped lang="scss">
.auth-area {
  display: flex;
  flex-direction: row;
  height: 100%;

  .auth-item {
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    flex: 1 1;
    overflow: hidden;
    padding: 10px;
  }

  .operator-area {
    margin-left: 10px;
  }
}
</style>
