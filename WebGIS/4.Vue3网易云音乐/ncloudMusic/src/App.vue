<template>
<HearBar />
<router-view></router-view>
</template>

<script setup>
import HearBar from "./components/HearBar.vue";
import MusicList from "./components/MusicList.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  const router = useRouter();
  router.push("/");
});
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body {
  background-color: #f5f5f5;
}
</style>