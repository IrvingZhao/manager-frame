import { defineComponent, ref, computed, PropType } from 'vue'
import { ElButton } from 'element-plus'
import { Util } from '../../utils'
import ButtonConfig from './ButtonConfig'

const EL_BUTTON_PROP_KEY = ['type', 'size', 'icon', 'nativeType', 'loading', 'disabled', 'plain', 'autofocus', 'round', 'circle']
type IButtonType = PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'>
type IButtonNativeType = PropType<'button' | 'submit' | 'reset'>
declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export default defineComponent({
  name: 'PjButton',
  extends: ElButton,
  props: {
    type: {
      type: String as IButtonType,
      default: 'default',
      validator: (val: string) => {
        return ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text'].includes(val)
      }
    },
    size: { type: String as PropType<ComponentSize> },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String as IButtonNativeType,
      default: 'button',
      validator: (val: string) => {
        return ['button', 'submit', 'reset'].includes(val)
      }
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    config: {},
    tooltip: String
  },
  render(ctx, cache, prop, setup, data, option) {
    const { render } = ElButton
    const config = ctx.ctxConfig
    let $btn
    if (render) {
      $btn = render(ctx, cache, prop, setup, data, option)
      if (config && config.minWidth) {
        $btn = (
          <div style={ctx.computedStyle} class={'el-button-width'}>
            {$btn}
          </div>
        )
      }
      if (prop.tooltip) {
        $btn = (
          <pj-tool-tip placement={'top'} content={prop.toolTip} effect={'dark'}>
            {$btn}
          </pj-tool-tip>
        )
      }
    } else {
      throw new Error('cannot find render of ElButton')
    }
    return $btn
  },
  setup(props, ctx: any) {
    const { setup } = ElButton
    if (!setup) {
      throw new Error('cannot found setup of ElButton')
    }
    let config: any
    if (typeof props.config === 'string') {
      config = Util.getValueByPath(ButtonConfig, props.config)
    } else {
      config = ref(props.config).value
    }
    const resultCtx: any = ref({}).value
    if (config) {
      EL_BUTTON_PROP_KEY.forEach((key) => {
        const data = config[key]
        if (data) {
          resultCtx[key] = data
        }
      })
    }
    const btnProp = {
      ...props,
      ...resultCtx
    }
    const result = setup(btnProp, ctx) || {}

    const computedStyle = computed(() => {
      const styleResult: any = {}
      if (config && config.minWidth) {
        styleResult.minWidth = config.minWidth
      }
      return styleResult
    })

    return {
      ...result,
      ...resultCtx,
      ctxConfig: config,
      computedStyle
    }
  }
})
