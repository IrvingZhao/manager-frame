import buildMenuConf from './menu'

const Auth = () => import(/* webpackChunkName:'base/dynamicPage/auth' */ './auth/auth.vue')

const Menu = { build: buildMenuConf }

export { Menu, Auth }

export * from './menu/define'
