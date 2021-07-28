import { createRouter, Router, createWebHistory, createWebHashHistory, createMemoryHistory, RouteLocationNormalized } from 'vue-router'
import { App, nextTick } from 'vue'
import { RouteOption } from './define'

import { getStore } from './StoreConfig'

let router: Router
const methodMap = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory
}

function scrollBehaviorFunc(to, from, scroll) {
  if (scroll) {
    nextTick().then(() => {
      window.scroll(scroll)
    })
  }
}

function getRouter() {
  return router
}

function initRouter(option: RouteOption): Router {
  const scrollBehavior = option.autoScroll ? scrollBehaviorFunc : undefined
  const history = methodMap[option.history || 'history'](option.base)
  return createRouter({
    routes: option.routes,
    history,
    scrollBehavior
  })
}

function prePathGutter(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  if (from.meta.savePrePath === undefined || from.meta.savePrePath) {
    getStore().commit('route/prePath', from.fullPath)
  }
}

export default {
  install(app: App, option: RouteOption) {
    router = initRouter(option)
    router.afterEach(prePathGutter)
    app.use(router)
  }
}

export { getRouter }
