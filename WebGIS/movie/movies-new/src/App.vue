<template>
<!-- 设置exclude="组件名"，让组件不受缓存影响 -->
  <router-view v-slot="{ Component }">
    <keep-alive exclude="DetailView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>