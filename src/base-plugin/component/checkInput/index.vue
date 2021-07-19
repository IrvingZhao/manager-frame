<template>
  <div class="pj-check-input">
    <div class="input-area">
      <pj-input v-model="value.text" :disable="formItemDisable || inputDisable" />
    </div>
    <div class="checkbox-area">
      <pj-checkbox v-model="value.check" :true-label="trueLabel" :false-label="falseLabel">{{ checkLabel }} </pj-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject, InjectionKey, ref, watch } from 'vue'
import { ElFormContext, ElFormItemContext } from 'element-plus/lib/el-form/src/token'

const elFormKey: InjectionKey<ElFormContext> = 'elForm' as any

const elFormItemKey: InjectionKey<ElFormItemContext> = 'elFormItem' as any

interface CheckInputValue {
  text: string
  check: string
}

export default defineComponent({
  name: 'PjCheckInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Object as PropType<CheckInputValue>,
      required: true
    },
    checkLabel: {
      type: String,
      default: ''
    },
    trueLabel: {
      type: String,
      default: 'true'
    },
    falseLabel: {
      type: String,
      default: 'false'
    },
    checkDisableInput: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [''],
  setup(props) {
    const elForm = inject(elFormKey, {} as ElFormContext)
    const elFormItem = inject(elFormItemKey, {} as ElFormItemContext)

    const formItemDisable = computed(() => {
      return props.disabled || elForm.disabled
    })

    const { value } = ref(props.modelValue)

    const inputDisable = computed(() => {
      return props.checkDisableInput && props.modelValue.check === props.trueLabel
    })

    watch(value, (val) => {
      if (elFormItem && elFormItem.formItemMitt) {
        elFormItem.formItemMitt.emit('el.form.change', val)
      }
    })

    return {
      formItemDisable,
      inputDisable,
      value
    }
  }
})
</script>

<style lang="scss">
.pj-check-input {
  display: flex;
  flex-direction: row;
  align-items: center;

  .input-area {
    flex: 1;
  }

  .checkbox-area {
    margin-left: 16px;
    flex: 0 0 auto;
  }
}
</style>
