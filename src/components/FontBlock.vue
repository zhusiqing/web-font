<template>
  <div :class="['font-block', active && 'active']"><slot></slot></div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{ active: boolean }>(), {
  active: false
})
</script>
<style lang="scss" scoped>
.font-block {
  display: inline-block;
  vertical-align: middle;
  padding: 4px 12px;
  margin: 4px;
  border: 1px solid #D4D7DE;
  cursor: pointer;
  &:hover {
    transform: scale(1.1) translateY(-2px);
  }
  &.active {
    border-color: #409EFF;
    background: #409EFF;
    color: #ffffff;
  }
}
</style>
