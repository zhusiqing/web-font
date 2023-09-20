<script setup lang="ts">
// import { ref } from 'vue'
// import FontMin from 'fontmin'
// import testFont from './assets/test.otf?raw'
import FongSvg from '../build/font1/test.svg'
</script>

<template>
  <div>
    <div>123123123123</div>
    <img :src="FongSvg" alt="">
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
