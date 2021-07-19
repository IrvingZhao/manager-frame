import { RouteRecordRaw } from 'vue-router'
import frame from './frame/index.vue'
import page404 from './error/404.vue'
import login from './login/index.vue'

function buildRouteConfig(routes: RouteRecordRaw[]) {
  const frameRoute: RouteRecordRaw = {
    name: 'root',
    path: '/',
    component: frame,
    meta: { savePrePath: true },
    children: [
      ...routes,
      {
        path: '/:pathMatch(.*)*',
        component: page404
      }
    ]
  }

  const route: RouteRecordRaw[] = [
    {
      name: 'login',
      path: '/login',
      component: login,
      meta: { hasAuth: false }
    },
    frameRoute,
    {
      name: 'page404',
      path: '/:pathMatch(.*)*',
      component: page404
    }
  ]

  return route
}

export default buildRouteConfig
