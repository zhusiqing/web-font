<template>
  <div class="font-block-list">
    <slot>
      <div class="font-block-list-empty">暂无</div>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.font-block-list {
  display: flex;
  flex-wrap: wrap;
  font-family: lmParse, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  justify-content: space-around;
  max-height: 200px;
  min-height: 40px;
  padding: 20px;
  overflow: auto;
  &-empty {
    width: 100%;
  }
}
</style>
