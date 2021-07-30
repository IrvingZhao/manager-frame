import { RouteRecordRaw } from 'vue-router'
import page from './page'
import edit from './edit.vue'
import fullEdit from './fullEdit.vue'
import list from './list.vue'

const route: RouteRecordRaw[] = [
  {
    path: 'multi',
    component: list,
    meta: {
      key: 'demo-list'
    }
  },
  {
    path: 'multi/add',
    component: edit,
    meta: {
      key: 'demo-add'
    }
  },
  {
    path: 'multi/full',
    component: fullEdit,
    meta: {
      key: 'demo-full'
    }
  },
  {
    path: 'multi/:id',
    component: edit,
    props: true,
    meta: {
      key: 'demo-edit'
    }
  }
]

export default {
  route,
  page
}
