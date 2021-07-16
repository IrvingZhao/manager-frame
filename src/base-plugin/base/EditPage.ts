import {
  defineComponent,
  ComputedOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  DefineComponent,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComponentPublicInstance
} from 'vue'
import { BaseEditPageData, BaseEditPageMethod } from './define'

declare type ComponentInstance<
  PropsOptions extends Readonly<ComponentPropsOptions> = {},
  RawBindings = {},
  D extends BaseEditPageData = BaseEditPageData,
  M extends BaseEditPageMethod = BaseEditPageMethod,
  C extends ComputedOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string
> = ComponentPublicInstance<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E>

function updateData(this: ComponentInstance) {
  if (this.breadSplice || this.breadSplice === 0) {
    this.$bread.splice(this.breadSplice)
  }
  if (this.id) {
    if (this.editLoad) {
      this.editLoad(this)
    }
    if (this.editBread) {
      this.$bread.append(this.editBread)
    }
  } else {
    if (this.addLoad) {
      this.addLoad(this)
    }
    if (this.addBread) {
      this.$bread.append(this.addBread)
    }
  }
}

function defineEditPage<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D extends BaseEditPageData,
  M extends BaseEditPageMethod,
  C extends ComputedOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string
>(
  options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> {
  return defineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>({
    ...options,
    props: {
      ...options.props,
      id: String
    },
    watch: {
      ...options.watch,
      id() {
        if (this.hasDeactivated) {
          return
        }
        this.hasWatch = true
        updateData.call(this)
      }
    },
    data(vm) {
      const optionData: any = options.data?.call(this, vm) || {}
      return {
        ...optionData,
        hasWatch: false,
        hasDeactivated: false
      }
    },
    activated() {
      this.hasDeactivated = false
      if (!this.hasWatch) {
        updateData.call(this)
      }
    },
    deactivated() {
      this.hasDeactivated = true
      this.reset()
      this.hasWatch = false
    }
  })
}

export default defineEditPage
