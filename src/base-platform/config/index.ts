import { App } from 'vue'
import DicStore from './store/DicStore'
import UserStore, { tokenGetter } from './store/UserStore'
import MenuPageStore, { authGutter, breadGutter } from './store/MenuPageStore'
import FrameShowStore, { frameGutter } from './store/FrameShowStore'

export default {
  install(app: App) {
    app.config.globalProperties.$store.registerModule('frame_dic', DicStore)
    app.config.globalProperties.$store.registerModule('frame_user', UserStore)
    app.config.globalProperties.$store.registerModule('frame_menu', MenuPageStore)
    app.config.globalProperties.$store.registerModule('frame_show', FrameShowStore)
  }
}
export * from './store/DicStore'

export { authGutter, breadGutter, tokenGetter, frameGutter }
