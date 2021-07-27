import { RouteLocationRaw, LocationAsPath, RouteQueryAndHash, RouteLocationOptions } from 'vue-router'

export default {
  routerAppendTo(this: any, to: string | (LocationAsPath & RouteQueryAndHash & RouteLocationOptions)) {
    const current = this.$route
    let target: RouteLocationRaw
    if (typeof to === 'object') {
      const toPath = to.path
      const targetPath = current.path + (toPath.startsWith('/') ? '' : '/') + toPath
      target = {
        ...to,
        path: targetPath
      }
    } else {
      target = current.path + (to.startsWith('/') ? '' : '/') + to
    }
    this.$router.push(target)
  },
  routerPushTo(this: any, to: string | (LocationAsPath & RouteQueryAndHash & RouteLocationOptions)) {
    this.$router.push(to)
  },
  replaceTo(this: any, to: string | (LocationAsPath & RouteQueryAndHash & RouteLocationOptions)) {
    let target: RouteLocationRaw
    if (typeof to === 'object') {
      target = to
    } else {
      target = {
        path: to,
        replace: true
      }
    }
    this.$router.push(target)
  },
  routerGoBack(this: any) {
    this.$router.go(-1)
  }
}
