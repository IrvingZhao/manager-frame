import {
  defineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  DefineComponent,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  Transition,
  KeepAlive
} from 'vue'
import { BaseStorePageConfig } from './define'
import { StoreRootState } from '../config'

const CREATED_KEY = {}

function defineBaseStorePage<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D extends BaseStorePageConfig<any, StoreRootState>,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string
>(
  options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> {
  return defineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>({
    ...options,
    render() {
      const routerSlot = ({ Component }) => {
        return (
          <Transition>
            <KeepAlive>{Component}</KeepAlive>
          </Transition>
        )
      }
      return <router-view v-slots={{ default: routerSlot }} />
    },
    created() {
      const storeConfig = this.pageStore
      if (storeConfig) {
        let configs
        if (storeConfig instanceof Array) {
          configs = storeConfig
        } else {
          configs = [storeConfig]
        }
        configs.forEach((item) => {
          CREATED_KEY[item.key] = true
          if (!this.$store.state[item.key]) {
            this.$store.registerModule(item.key, item.storeModule)
          }
          if (item.init) {
            this.$store.dispatch(item.init)
          }
        })
      }
      const { breadSplice } = this
      if (breadSplice || breadSplice === 0) {
        this.$bread.splice(breadSplice)
      }
      const breads = this.baseBread
      if (breads) {
        this.$bread.set(breads)
      }
      if (options.created) {
        options.created()
      }
    },
    unmounted() {
      const storeConfig = this.pageStore
      if (storeConfig) {
        let configs
        if (storeConfig instanceof Array) {
          configs = storeConfig
        } else {
          configs = [storeConfig]
        }
        configs.forEach((item) => {
          if (CREATED_KEY[item.key]) {
            return
          }
          if (item.reset) {
            this.$store.commit(item.reset)
          }
          this.$store.unregisterModule(item.key)
        })
      }
      if (options.unmounted) {
        options.unmounted()
      }
    }
  })
}

export default defineBaseStorePage
