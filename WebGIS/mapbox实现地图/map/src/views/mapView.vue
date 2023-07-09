<template>
  <toggle></toggle>
  <div id="map"></div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import Toggle from "../components/Toggle.vue";
import { useStore } from "../store/index.js";
const store = ref(useStore());
onMounted(() => {
  store.value.initMap();
});
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>