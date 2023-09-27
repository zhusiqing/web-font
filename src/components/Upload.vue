<template>
  <div class="upload">
    <ElUpload drag :before-upload="handleBeforeUpload" :http-request="httpRequest" :on-exceed="handleOnExceed" :limit="1">
      <div class="upload-desc">点击上传字体文件，也支持拖拽到此处上传</div>
      <template #tip>
        <div class="el-upload__tip">
          支持字体格式woff,otf,ttf
        </div>
      </template>
    </ElUpload>
  </div>
</template>
<script lang="ts" setup>
import { ElUpload, ElMessage } from 'element-plus'
import type { UploadRawFile, UploadRequestOptions } from 'element-plus'

interface httpRequest {
  (options: UploadRequestOptions): Promise<void>
}

withDefaults(defineProps<{
  httpRequest: httpRequest
}>(), {
  httpRequest: async () => {}
})

const fontTypes = ['font/otf', 'font/ttf', 'application/font-woff']
const fileMaxSizeMb = 100
const fileMaxSize = fileMaxSizeMb * 1024 * 1024 //100mb

const handleBeforeUpload = (file: UploadRawFile) => {
  if (!fontTypes.includes(file.type)) {
    ElMessage.error('仅支持字体格式woff,otf,ttf')
    return false
  }

  if (file.size > fileMaxSize) {
    ElMessage.error(`文件最大${fileMaxSizeMb}MB`)
    return false
  }
  return true
}
const handleOnExceed = () => {
  ElMessage.error('只能上传一个文件')
}

</script>
<style lang="scss" scoped>
.upload {
  width: 360px;
  &-desc {
    user-select: none;
  }
}
</style>
