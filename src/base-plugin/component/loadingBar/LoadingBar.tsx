import { createApp, ref } from 'vue'
import LoadingBar from './loading-bar.vue'
import { LoadingBarInstance, LoadingBarProps, LoadingBarUpdate } from './define'

export function newInstance(properties?: LoadingBarProps): LoadingBarInstance {
  const props = properties || {}
  const refProps: any = ref(props).value
  const instance = createApp({
    render() {
      return <LoadingBar {...refProps} />
    }
  })

  const $root = document.createElement('div')

  const component = instance.mount($root)
  const loadingBarEl = component.$el
  document.body.appendChild(loadingBarEl)

  return {
    update(options: LoadingBarUpdate) {
      if (options.percent || options.percent === 0) {
        refProps.percent = options.percent
      }
      if (options.status) {
        refProps.status = options.status
      }
      if (options.show !== undefined) {
        refProps.show = options.show
      }
    },
    destroy() {
      document.body.removeChild(loadingBarEl)
    }
  }
}

export default LoadingBar
