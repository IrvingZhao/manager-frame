<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, InjectionKey, provide } from 'vue'
import { LocaleContext } from 'element-plus'
import { Config } from '@plugin'

const LocaleInjectionKey = 'ElLocaleInjection' as unknown as InjectionKey<LocaleContext>

export default defineComponent({
  setup() {
    const i18n = Config.getI18n()
    const i18nData = {
      t: i18n.global.t
    } as LocaleContext
    provide(LocaleInjectionKey, i18nData)
  }
})
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;

  #app {
    width: 100%;
    height: 100%;
  }
}
</style>
