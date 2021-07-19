<template>
  <transition name="fade">
    <div :class="classes" :style="outerStyles" v-show="show">
      <div :class="innerClasses" :style="styles"></div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

const prefixCls = 'ivu-loading-bar'

export default defineComponent({
  name: 'pj-loading-bar',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    failedColor: {
      type: String,
      default: 'error'
    },
    height: {
      type: Number,
      default: 2
    },
    percent: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'success'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() => prefixCls)
    const innerClasses = computed(() => {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: props.color === 'primary' && props.status === 'success',
          [`${prefixCls}-inner-failed-color-error`]: props.failedColor === 'error' && props.status === 'error'
        }
      ]
    })
    const outerStyles = computed(() => {
      return { height: `${props.height}px` }
    })
    const styles = computed(() => {
      const style = {
        width: `${props.percent}%`,
        height: `${props.height}px`,
        backgroundColor: ''
      }

      if (props.color !== 'primary' && props.status === 'success') {
        style.backgroundColor = props.color
      }

      if (props.failedColor !== 'error' && props.status === 'error') {
        style.backgroundColor = props.failedColor
      }

      return style
    })

    return {
      classes,
      innerClasses,
      outerStyles,
      styles
    }
  }
})
</script>
<style lang="scss">
@import '../var';

.#{$loading-bar-prefix-cls} {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $zindex-loading-bar;

  &-inner {
    transition: width $transition-time linear;

    &-color-primary {
      background-color: $primary-color;
    }

    &-failed-color-error {
      background-color: $error-color;
    }
  }
}
</style>
