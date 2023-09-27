<script setup lang="ts">
import { ref } from 'vue'
import UploadComponent from './components/Upload.vue'
import SelectFontComponent from './components/SelectFont.vue';
import { ElMessage, ElButton } from 'element-plus'
import type { UploadRequestOptions } from 'element-plus'
import FontBlock from './components/FontBlock.vue'
import FontBlockList from './components/FontBlockList.vue'
// import { resFont } from './mock'
interface FontType {
  text: string;
  unicode: number;
}

const defaultFonts = ref<FontType[]>([])
const fonts = ref<FontType[]>([])
const selectedFonts = ref<FontType[]>([])


const handleHttpRequest = async (options: UploadRequestOptions) => {
  const formData = new FormData()
  formData.append('file', options.file)
  const res = await fetch('/api/font', {
    method: 'post',
    body: formData
  }).then(res => res.json())
  if (+res.code !== 0) {
    ElMessage.error('上传失败')
    return
  }
  console.log(res);
  // 目前测试本地只支持woff/otf格式的字体加载，其他加载失败可能要在服务端转下
  const fontUrl = URL.createObjectURL(options.file)
  const font = new FontFace('lmParse', `url('${fontUrl}')`)
  document.fonts.add(font)
  font.load()
  document.fonts.ready.then(() => {
    if (font.status === 'loaded') {
      console.log('字体库加载完毕：', font);
    } else {
      console.log('字体库加载失败：', font);
    }
  })
}
const handleSearch = (text: string) => {
  const textArr = text.split('')
  if (!defaultFonts.value?.length) {
    ElMessage.warning('请先上传文件再操作')
    return
  }
  if (textArr?.length) {
    fonts.value = defaultFonts.value.filter(font => textArr.includes(font.text))
  } else {
    fonts.value = []
  }
}
const handleReset = () => {
  fonts.value = [...defaultFonts.value]
}
const handleSelect = (font: FontType) => {
  const index = selectedFonts.value.findIndex(el => el.unicode === font.unicode)
  if (index === -1) {
    selectedFonts.value.push(font)
  } else {
    selectedFonts.value.splice(index, 1)
  }
}
const handleRemove = (font: FontType) => {
  const index = selectedFonts.value.findIndex(el => el.unicode === font.unicode)
  selectedFonts.value.splice(index, 1)
}
const findFont = (font: FontType) => {
  return selectedFonts.value.find(el => el.unicode === font.unicode)
}
const isActive = (font: FontType) => !!findFont(font)
const handleExport = () => {
  if (!selectedFonts.value.length) {
    ElMessage.error('当前导出和原字体文件一致，无需处理')
    return
  }
  console.log(selectedFonts);
}
</script>

<template>
  <div class="app">
    <UploadComponent :http-request="handleHttpRequest"></UploadComponent>
    <SelectFontComponent @search="handleSearch" @reset="handleReset" />
    <FontBlockList>
      <FontBlock v-for="font in fonts" :key="font.unicode" :active="isActive(font)" @click="() => handleSelect(font)">{{ font.text }}</FontBlock>
    </FontBlockList>
    <div>
      <div>已选择：</div>
      <FontBlockList>
        <FontBlock v-for="font in selectedFonts" :key="font.unicode" @click="() => handleRemove(font)">{{ font.text }}</FontBlock>
      </FontBlockList>
    </div>
    <ElButton type="primary" @click="handleExport">导出</ElButton>
  </div>
</template>
<style>
.app {
  padding: 20px;
}
</style>
