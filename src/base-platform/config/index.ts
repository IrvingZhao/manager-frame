import { App } from 'vue'
import DicStore, { getDicMap, getDicArray } from './store/DicStore'
import UserStore, { tokenGetter } from './store/UserStore'
import MenuPageStore, { authGutter, breadGutter } from './store/MenuPageStore'
import FrameShowStore, { frameGutter } from './store/FrameShowStore'
import AreaStore, { getAreaData } from './store/AreaStore'

export default {
  install(app: App) {
    app.config.globalProperties.$store.registerModule('frame_dic', DicStore)
    app.config.globalProperties.$store.registerModule('frame_user', UserStore)
    app.config.globalProperties.$store.registerModule('frame_menu', MenuPageStore)
    app.config.globalProperties.$store.registerModule('frame_show', FrameShowStore)
    app.config.globalProperties.$store.registerModule('frame_area', AreaStore)
  }
}
export * from './store/DicStore'

export { authGutter, breadGutter, tokenGetter, frameGutter, getAreaData, getDicMap, getDicArray }
