import { RouteRecordRaw } from 'vue-router'
import page from './page'
import edit from './edit.vue'
import list from './list.vue'

const route: RouteRecordRaw[] = [
  {
    path: '',
    component: list,
    meta: {
      key: 'demo-list'
    }
  },
  {
    path: 'add',
    component: edit,
    meta: {
      key: 'demo-add'
    }
  },
  {
    path: ':id',
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
