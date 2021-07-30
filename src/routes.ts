import { RouteRecordRaw } from 'vue-router'
import { BuildRouteConfig } from '@platform'
import Demo from './demo'

const routes: RouteRecordRaw[] = [
  {
    path: 'demo',
    component: Demo.page,
    children: Demo.route
  }
]

export default BuildRouteConfig(routes)
