<template>
  <pj-edit-page type="full">
    <template #title>标题区域</template>
    <template #secTitle>二级标题</template>
    <template #step>
      <pj-steps>
        <pj-step title="步骤1" description="步骤描述" icon="el-icon-circle-plus-outline" status="finish" />
        <pj-step title="步骤2" description="描述信息" status="process" />
        <pj-step title="结束" description="完成" />
      </pj-steps>
    </template>
    <template #default>
      <pj-form label-width="130px" v-for="i in 10" :key="i">
        <pj-form-item label="密码框：">
          <pj-password />
        </pj-form-item>
        <pj-form-item label="可选文本框：">
          <pj-check-input v-model="form.checkInput" :checkDisableInput="true" />
        </pj-form-item>
      </pj-form>
    </template>
    <template #buttons>
      <pj-button config="page.submitAndContinue">保存并继续</pj-button>
      <pj-button config="page.submit">保存</pj-button>
      <pj-button config="page.default">取消</pj-button>
    </template>
  </pj-edit-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const form = ref({
      checkInput: { text: '', check: 'false' }
    })
    return {
      form
    }
  }
})
</script>

<style scoped></style>
