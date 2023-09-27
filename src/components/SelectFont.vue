<template>
  <div class="select-font">
    <ElRadioGroup v-model="mode">
      <ElRadioButton v-for="item in modeOption" :key="item.value" :label="item.value">{{ item.label }}</ElRadioButton>
    </ElRadioGroup>
    <ElInput class="select-font-input" v-model="text" type="textarea" :row="6" />
    <ElButton type="primary" @click="handleSearch">查询</ElButton>
    <ElButton @click="handleReset">重置</ElButton>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElInput, ElRadioGroup, ElRadioButton } from 'element-plus'

const emits = defineEmits<{
  search: [query: string]
  reset: []
}>()

enum modeEnum {
  INCLUDE = 1,
  EXCLUED
}

const modeOption = [
  {
    value: modeEnum.INCLUDE,
    label: '选中'
  },
  {
    value: modeEnum.EXCLUED,
    label: '排除'
  }
]

const mode = ref(modeEnum.INCLUDE)
const text = ref('')

const handleSearch = () => {
  emits('search', text.value)
}
const handleReset = () => {
  text.value = ''
  emits('reset')
}

</script>
<style lang="scss" scoped>
.select-font {
  &-input {
    margin: 20px 0;
  }
}
</style>
